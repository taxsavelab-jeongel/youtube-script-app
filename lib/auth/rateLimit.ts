// Design Ref: §7.3 Rate Limiting — bkend.ai daily_usage 테이블 기반 (persistent)
const DAILY_LIMIT = 10

const BASE = process.env.BKEND_BASE_URL
const PROJECT_ID = process.env.NEXT_PUBLIC_BKEND_PROJECT_ID
const API_KEY = process.env.BKEND_API_KEY

function bkendHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY ?? '',
  }
}

function todayKST(): string {
  return new Date().toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).replace(/\. /g, '-').replace('.', '')
}

/** 일일 사용량 조회 */
async function getDailyUsage(
  userId: string,
  date: string
): Promise<{ id: string; count: number } | null> {
  const res = await fetch(
    `${BASE}/tables/daily_usage/rows?filter=user_id:eq:${userId},date:eq:${date}&limit=1`,
    { headers: bkendHeaders(), cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  const row = data.rows?.[0]
  return row ? { id: row.id, count: row.count ?? 0 } : null
}

/**
 * 사용 한도 확인 (10회/일)
 * Plan SC: API 비용 관리
 */
export async function checkRateLimit(userId: string): Promise<{
  allowed: boolean
  remaining: number
  resetAt: string
}> {
  const today = todayKST()
  const resetAt = new Date()
  resetAt.setDate(resetAt.getDate() + 1)
  resetAt.setHours(0, 0, 0, 0)

  try {
    const usage = await getDailyUsage(userId, today)
    const count = usage?.count ?? 0
    return {
      allowed: count < DAILY_LIMIT,
      remaining: Math.max(0, DAILY_LIMIT - count),
      resetAt: resetAt.toISOString(),
    }
  } catch {
    // bkend.ai 연결 실패 시 허용 (가용성 우선)
    return { allowed: true, remaining: DAILY_LIMIT, resetAt: resetAt.toISOString() }
  }
}

/**
 * 생성 성공 후 사용량 증가 (upsert)
 */
export async function incrementUsage(userId: string): Promise<void> {
  const today = todayKST()

  try {
    const existing = await getDailyUsage(userId, today)

    if (existing) {
      // 기존 레코드 업데이트
      await fetch(`${BASE}/tables/daily_usage/rows/${existing.id}`, {
        method: 'PATCH',
        headers: bkendHeaders(),
        body: JSON.stringify({ count: existing.count + 1 }),
      })
    } else {
      // 신규 레코드 생성
      await fetch(`${BASE}/tables/daily_usage/rows`, {
        method: 'POST',
        headers: bkendHeaders(),
        body: JSON.stringify({ user_id: userId, date: today, count: 1 }),
      })
    }
  } catch {
    // 사용량 기록 실패는 무시 (생성 흐름 방해 안 함)
    console.error('Failed to increment usage for', userId)
  }
}
