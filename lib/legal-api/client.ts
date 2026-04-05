// ============================================================
// 법제처 국가법령정보 Open API 클라이언트
// https://open.law.go.kr/LSO/openApi/guideList.do
// ============================================================

/**
 * 법제처 Open API 연동
 * - 사용 전 open.law.go.kr 에서 회원가입 + API 신청 필요 (무료, 1~2일 승인)
 * - .env.local에 LEGAL_API_OC 설정 필요
 */

const BASE_URL = 'https://www.law.go.kr/DRF'

export interface LawSearchResult {
  법령명한글: string
  법령명약칭: string
  법령ID: string
  공포일자: string
  공포번호: string
  시행일자: string
  소관부처명: string
  법령구분명: string // 법률, 대통령령, 총리령, 부령
  법령상세링크: string
}

export interface LawArticle {
  조문번호: string
  조문제목: string
  조문내용: string
  항?: { 항번호: string; 항내용: string }[]
  호?: { 호번호: string; 호내용: string }[]
}

export interface LawDetail {
  법령명한글: string
  법령ID: string
  시행일자: string
  제개정구분: string
  조문: LawArticle[]
}

/**
 * 법령 검색 — 법령명으로 검색
 */
export async function searchLaw(query: string): Promise<LawSearchResult[] | null> {
  const oc = process.env.LEGAL_API_OC
  if (!oc) {
    console.warn('[법제처 API] LEGAL_API_OC 환경변수가 설정되지 않았습니다.')
    return null
  }

  try {
    const url = `${BASE_URL}/lawSearch.do?OC=${oc}&target=law&type=JSON&query=${encodeURIComponent(query)}&display=10`
    const res = await fetch(url, { next: { revalidate: 86400 } }) // 24시간 캐시
    if (!res.ok) return null

    const data = await res.json()
    if (data.result) return null // 오류 응답

    return data.LawSearch?.law || []
  } catch (error) {
    console.error('[법제처 API] 검색 오류:', error)
    return null
  }
}

/**
 * 법령 상세 조회 — 법령ID로 조문 전체 조회
 */
export async function getLawDetail(lawId: string): Promise<LawDetail | null> {
  const oc = process.env.LEGAL_API_OC
  if (!oc) return null

  try {
    const url = `${BASE_URL}/lawService.do?OC=${oc}&target=law&type=JSON&ID=${lawId}`
    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return null

    const data = await res.json()
    if (data.result) return null

    return data as LawDetail
  } catch (error) {
    console.error('[법제처 API] 상세 조회 오류:', error)
    return null
  }
}

/**
 * 특정 조문 조회 — 법령명 + 조문번호로 조문 내용 가져오기
 */
export async function getArticle(
  lawName: string,
  articleNumber: string
): Promise<{ content: string; effectiveDate: string } | null> {
  const results = await searchLaw(lawName)
  if (!results || results.length === 0) return null

  // 가장 최신 시행일 기준 법령 선택
  const law = results
    .filter(r => r.법령구분명 === '법률' || r.법령구분명 === '대통령령')
    .sort((a, b) => b.시행일자.localeCompare(a.시행일자))[0]

  if (!law) return null

  const detail = await getLawDetail(law.법령ID)
  if (!detail?.조문) return null

  // 조문번호 매칭 (예: "제55조" → "55")
  const num = articleNumber.replace(/[^0-9의]/g, '')
  const article = detail.조문.find(a =>
    a.조문번호?.replace(/[^0-9의]/g, '') === num
  )

  if (!article) return null

  let content = article.조문내용 || ''
  if (article.항) {
    content += '\n' + article.항.map(h => `${h.항번호} ${h.항내용}`).join('\n')
  }

  return {
    content: content.trim(),
    effectiveDate: law.시행일자,
  }
}

// ============================================================
// 오프라인 검증 (API 없이 사용 가능)
// ============================================================

/**
 * 앱 내 세법 데이터와 법령 원문을 대조 검증
 * API 키 없이도 수동 입력된 법령 원문으로 검증 가능
 */
export interface VerificationResult {
  itemId: string
  itemName: string
  status: 'verified' | 'mismatch' | 'unverified' | 'api_unavailable'
  checks: {
    field: string         // 검증 대상 (예: "세율", "한도금액", "사후관리기간")
    appValue: string      // 앱에 저장된 값
    legalValue?: string   // 법령 원문 값 (API에서 가져온)
    match: boolean
    note?: string
  }[]
  verifiedAt: string
}

/**
 * 내장 법령 데이터 기반 자체 검증
 * (API 없이도 legalTexts 필드가 있는 항목은 교차 검증 가능)
 */
export function selfVerifyItem(item: {
  id: string
  name: string
  applicableRate?: string
  maxDeductionAmount?: number
  legalTexts?: { keyProvisions: string[] }[]
  postManagement?: { period: number }
}): VerificationResult {
  const checks: VerificationResult['checks'] = []

  // 1. 법령 원문(legalTexts)이 있는지 확인
  if (!item.legalTexts || item.legalTexts.length === 0) {
    return {
      itemId: item.id,
      itemName: item.name,
      status: 'unverified',
      checks: [{ field: '법령원문', appValue: '없음', match: false, note: 'legalTexts 미등록' }],
      verifiedAt: new Date().toISOString(),
    }
  }

  // 2. 핵심 조항(keyProvisions)에서 숫자 추출하여 앱 데이터와 대조
  const allProvisions = item.legalTexts.flatMap(lt => lt.keyProvisions)

  // 사후관리 기간 검증 (가업승계 등)
  if (item.postManagement) {
    const periodMatch = allProvisions.some(p =>
      p.includes(`${item.postManagement!.period}년`)
    )
    checks.push({
      field: '사후관리기간',
      appValue: `${item.postManagement.period}년`,
      legalValue: periodMatch ? `${item.postManagement.period}년 (조항 확인)` : '미확인',
      match: periodMatch,
    })
  }

  // 3. 종합 판정
  const allMatch = checks.length === 0 || checks.every(c => c.match)

  return {
    itemId: item.id,
    itemName: item.name,
    status: allMatch ? 'verified' : 'mismatch',
    checks,
    verifiedAt: new Date().toISOString(),
  }
}
