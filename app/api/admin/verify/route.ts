import { NextRequest, NextResponse } from 'next/server'
import { getAllItems } from '@/lib/tax-data/utils'
import { selfVerifyItem, getArticle, type VerificationResult } from '@/lib/legal-api/client'

/**
 * GET /api/admin/verify — 전체 항목 자체 검증 (API 키 불필요)
 * POST /api/admin/verify — 특정 항목 법제처 API 검증 (API 키 필요)
 */

export async function GET() {
  const items = getAllItems()
  const results: VerificationResult[] = items.map(item => selfVerifyItem(item))

  const summary = {
    total: results.length,
    verified: results.filter(r => r.status === 'verified').length,
    mismatch: results.filter(r => r.status === 'mismatch').length,
    unverified: results.filter(r => r.status === 'unverified').length,
    verifiedRate: 0,
  }
  summary.verifiedRate = Math.round((summary.verified / summary.total) * 100)

  return NextResponse.json({
    summary,
    results,
    hasApiKey: !!process.env.LEGAL_API_OC,
    note: summary.unverified > 0
      ? `${summary.unverified}개 항목에 법령 원문(legalTexts)이 없어 검증 불가. 데이터 보강이 필요합니다.`
      : '전체 항목 자체 검증 완료',
  })
}

export async function POST(request: NextRequest) {
  const { itemId, lawName, articleNumber } = await request.json()

  if (!process.env.LEGAL_API_OC) {
    return NextResponse.json({
      error: '법제처 API 키가 설정되지 않았습니다.',
      guide: '1. open.law.go.kr 회원가입 → 2. Open API 활용신청 → 3. OC 인증키 발급 → 4. .env.local에 LEGAL_API_OC=발급받은키 추가',
    }, { status: 400 })
  }

  const items = getAllItems()
  const item = items.find(i => i.id === itemId)

  if (!item) {
    return NextResponse.json({ error: '항목을 찾을 수 없습니다.' }, { status: 404 })
  }

  // 법제처 API로 조문 원문 가져오기
  const article = await getArticle(
    lawName || item.legalBasis[0]?.law || '',
    articleNumber || item.legalBasis[0]?.article || ''
  )

  if (!article) {
    return NextResponse.json({
      itemId,
      status: 'api_unavailable',
      message: '법제처 API에서 조문을 가져올 수 없습니다. 법령명/조문번호를 확인하세요.',
    })
  }

  return NextResponse.json({
    itemId,
    itemName: item.name,
    legalArticle: {
      content: article.content,
      effectiveDate: article.effectiveDate,
    },
    appData: {
      fullDescription: item.fullDescription,
      applicableRate: item.applicableRate,
      requirements: item.requirements.map(r => r.description),
    },
    message: '법령 원문과 앱 데이터를 비교하여 검증하세요.',
    note: '자동 대조는 법령 원문 구조 분석 후 다음 단계에서 구현 예정',
  })
}
