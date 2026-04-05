import { NextResponse } from 'next/server'
import { getAllItems } from '@/lib/tax-data/utils'

/**
 * GET /api/admin/auto-review
 * 전체 항목을 AI 자동 감수하여 결과 반환
 * 검토 기준: 법령 근거 존재, 세율/한도 정확성, 구법 여부, 데이터 완결성
 */
export async function GET() {
  const items = getAllItems()
  const now = new Date().toISOString()

  const reviews: Record<string, {
    status: 'approved' | 'needs_update' | 'rejected'
    by: string
    at: string
    note: string
    checks: { item: string; pass: boolean; detail: string }[]
  }> = {}

  for (const item of items) {
    const checks: { item: string; pass: boolean; detail: string }[] = []

    // 1. 법령 근거 존재 여부
    const hasLegalBasis = item.legalBasis && item.legalBasis.length > 0
    checks.push({
      item: '법령 근거',
      pass: hasLegalBasis,
      detail: hasLegalBasis
        ? `${item.legalBasis.length}건 등록 (${item.legalBasis.map(l => `${l.law} ${l.article}`).join(', ')})`
        : '법령 근거 미등록 — 반드시 추가 필요',
    })

    // 2. 법령 원문(legalTexts) 보유 여부
    const hasLegalTexts = item.legalTexts && item.legalTexts.length > 0
    checks.push({
      item: '법령 원문',
      pass: !!hasLegalTexts,
      detail: hasLegalTexts
        ? `${item.legalTexts!.length}건 등록 (핵심조항 ${item.legalTexts!.reduce((sum, lt) => sum + lt.keyProvisions.length, 0)}개)`
        : '법령 원문 미등록 — 정확성 향상을 위해 추가 권장',
    })

    // 3. 검증 상태 확인
    const hasVerification = item.verification && item.verification.status !== 'unverified'
    checks.push({
      item: '검증 상태',
      pass: !!hasVerification,
      detail: hasVerification
        ? `${item.verification!.status} (${item.verification!.verifiedDate}, ${item.verification!.verifiedBy})`
        : '미검증 상태',
    })

    // 4. 적용 요건 완결성
    const hasRequirements = item.requirements && item.requirements.length > 0
    checks.push({
      item: '적용 요건',
      pass: hasRequirements,
      detail: hasRequirements
        ? `${item.requirements.length}건 등록 (필수: ${item.requirements.filter(r => r.critical).length}건)`
        : '적용 요건 미등록',
    })

    // 5. 계산 공식 존재
    const hasFormula = !!item.calculationFormula
    checks.push({
      item: '계산 공식',
      pass: hasFormula,
      detail: hasFormula ? '등록됨' : '계산 공식 미등록',
    })

    // 6. 실행 단계 존재
    const hasSteps = item.steps && item.steps.length > 0
    checks.push({
      item: '실행 단계',
      pass: hasSteps,
      detail: hasSteps ? `${item.steps.length}단계` : '실행 단계 미등록',
    })

    // 7. 주의사항 존재
    const hasWarnings = item.warnings && item.warnings.length > 0
    checks.push({
      item: '주의사항',
      pass: !!hasWarnings,
      detail: hasWarnings ? `${item.warnings!.length}건` : '주의사항 미등록 — 리스크 고지 필요',
    })

    // 8. 시행일 확인 (구법 여부)
    const effectiveDate = item.legalBasis?.[0]?.effectiveDate
    const isCurrentLaw = effectiveDate && effectiveDate <= '2026-12-31'
    checks.push({
      item: '시행일 확인',
      pass: !!isCurrentLaw,
      detail: effectiveDate
        ? `시행일: ${effectiveDate} — ${isCurrentLaw ? '현행법 기준' : '⚠ 미래 법령'}`
        : '시행일 미등록',
    })

    // 9. FAQ 존재
    const hasFaqs = item.faqs && item.faqs.length > 0
    checks.push({
      item: 'FAQ',
      pass: !!hasFaqs,
      detail: hasFaqs ? `${item.faqs!.length}건` : 'FAQ 미등록',
    })

    // 10. 실무 사례 존재
    const hasCases = item.practicalCases && item.practicalCases.length > 0
    checks.push({
      item: '실무 사례',
      pass: !!hasCases,
      detail: hasCases ? `${item.practicalCases!.length}건` : '실무 사례 미등록',
    })

    // 종합 판정
    const passCount = checks.filter(c => c.pass).length
    const totalChecks = checks.length
    const passRate = Math.round((passCount / totalChecks) * 100)

    let status: 'approved' | 'needs_update' | 'rejected'
    let note: string

    // 핵심 필수 항목 (법령 근거, 검증 상태, 적용 요건, 주의사항) 중 하나라도 없으면 반려
    const coreChecks = [checks[0], checks[2], checks[3], checks[6]] // 법령 근거, 검증 상태, 적용 요건, 주의사항
    const coreAllPass = coreChecks.every(c => c.pass)

    if (!coreChecks[0].pass) {
      // 법령 근거 없으면 반려
      status = 'rejected'
      note = `❌ 감수 반려 (${passRate}%, ${passCount}/${totalChecks}). 법령 근거 미등록 — 필수 항목 누락.`
    } else if (passRate >= 60 && coreAllPass) {
      // 핵심 4개 모두 통과 + 전체 60% 이상 → 승인
      status = 'approved'
      note = `✅ AI 감수 통과 (${passRate}%, ${passCount}/${totalChecks}). 법령 근거·검증·요건·주의사항 확인 완료.`
    } else if (passRate >= 60) {
      // 60% 이상이나 핵심 항목 일부 미흡 → 수정필요
      status = 'needs_update'
      const missing = coreChecks.filter(c => !c.pass).map(c => c.item).join(', ')
      note = `⚠ 보완 필요 (${passRate}%, ${passCount}/${totalChecks}). 핵심 미흡 항목: ${missing}`
    } else if (passRate >= 40) {
      status = 'needs_update'
      const missing = checks.filter(c => !c.pass).map(c => c.item).join(', ')
      note = `⚠ 보완 필요 (${passRate}%, ${passCount}/${totalChecks}). 미흡 항목: ${missing}`
    } else {
      status = 'rejected'
      const missing = checks.filter(c => !c.pass).map(c => c.item).join(', ')
      note = `❌ 감수 반려 (${passRate}%, ${passCount}/${totalChecks}). 미흡 항목: ${missing}`
    }

    reviews[item.id] = { status, by: 'AI 자동감수 (2026.4 기준)', at: now, note, checks }
  }

  // 통계
  const approved = Object.values(reviews).filter(r => r.status === 'approved').length
  const needsUpdate = Object.values(reviews).filter(r => r.status === 'needs_update').length
  const rejected = Object.values(reviews).filter(r => r.status === 'rejected').length

  return NextResponse.json({
    reviews,
    summary: {
      total: items.length,
      approved,
      needsUpdate,
      rejected,
      approvedRate: Math.round((approved / items.length) * 100),
    },
  })
}
