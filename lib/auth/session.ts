// Design Ref: §7.2 Session Utility — bkend.ai JWT 검증
import type { NextRequest } from 'next/server'

export interface SessionUser {
  id: string
  email: string
}

/**
 * Request 쿠키에서 JWT를 추출하고 사용자 정보를 반환합니다.
 * bkend.ai JWT payload: { sub: userId, email, iat, exp }
 */
export async function getSessionUser(
  request: NextRequest | Request
): Promise<SessionUser | null> {
  const token = extractToken(request)
  if (!token) return null
  return await verifyToken(token)
}

function extractToken(request: NextRequest | Request): string | null {
  // 쿠키에서 추출 (미들웨어 / API Route 공용)
  if ('cookies' in request && typeof (request as NextRequest).cookies?.get === 'function') {
    return (request as NextRequest).cookies.get('auth_token')?.value ?? null
  }
  // 헤더에서 추출 (Bearer 토큰)
  const auth = request.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return null
}

/**
 * bkend.ai /auth/verify 엔드포인트로 서버사이드 토큰 검증.
 * 서명 검증을 bkend.ai 서버에 위임하여 위조 토큰을 방지.
 */
async function verifyToken(token: string): Promise<SessionUser | null> {
  // 1차: 만료 시간 빠른 확인 (불필요한 네트워크 절약)
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'))
    if (payload.exp && Date.now() / 1000 > payload.exp) return null
  } catch {
    return null
  }

  // 2차: bkend.ai 서버에서 서명 검증
  try {
    const baseUrl = process.env.BKEND_BASE_URL
    const projectId = process.env.NEXT_PUBLIC_BKEND_PROJECT_ID
    const res = await fetch(`${baseUrl}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Project-Id': projectId ?? '',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) return null
    const data = await res.json()
    const id = data.user?.id || data.sub
    const email = data.user?.email || data.email
    if (!id || !email) return null
    return { id, email }
  } catch {
    // bkend.ai 연결 불가 시 서비스 불가 처리 (보안 우선)
    return null
  }
}

/**
 * bkend.ai 로그인 API 호출
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ token: string; user: SessionUser } | { error: string }> {
  const baseUrl = process.env.BKEND_BASE_URL
  const projectId = process.env.NEXT_PUBLIC_BKEND_PROJECT_ID

  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Project-Id': projectId ?? '',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) return { error: data.message || '로그인에 실패했습니다.' }

    return {
      token: data.token,
      user: { id: data.user.id, email: data.user.email },
    }
  } catch {
    return { error: '서버에 연결할 수 없습니다.' }
  }
}

/**
 * bkend.ai 회원가입 API 호출
 */
export async function signUp(
  email: string,
  password: string
): Promise<{ token: string; user: SessionUser } | { error: string }> {
  const baseUrl = process.env.BKEND_BASE_URL
  const projectId = process.env.NEXT_PUBLIC_BKEND_PROJECT_ID

  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Project-Id': projectId ?? '',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) return { error: data.message || '회원가입에 실패했습니다.' }

    return {
      token: data.token,
      user: { id: data.user.id, email: data.user.email },
    }
  } catch {
    return { error: '서버에 연결할 수 없습니다.' }
  }
}
