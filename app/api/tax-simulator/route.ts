import { NextRequest, NextResponse } from 'next/server'
import { getRecommendations, getAllItems } from '@/lib/tax-data/utils'
import { INCOME_TAX_BRACKETS_2026, CORPORATE_TAX_BRACKETS_2026, INHERITANCE_TAX_BRACKETS_2026 } from '@/lib/tax-data/constants'
import type { TargetAudience } from '@/types/tax-database'

export async function POST(request: NextRequest) {
  try {
    const profile = await request.json()
    const {
      type, age, annualIncome, homeCount, children,
      isNewlywed, hasRecentBirth, monthlyRent,
      pensionSavings, irpContribution,
      businessYears, corporateValue,
      hasSuccessionPlan, parentBusinessYears, parentAge,
    } = profile

    // 대상자 타입 매핑
    const targets: TargetAudience[] = [type as TargetAudience]
    if (age >= 15 && age <= 34) targets.push('youth')
    if (isNewlywed) targets.push('newlywed')
    if (hasRecentBirth || children > 0) targets.push('parent')
    if (age >= 60) targets.push('senior')
    if (homeCount >= 2) targets.push('multi_home_owner')
    if (hasSuccessionPlan) targets.push('heir')

    // 절세 항목 필터링
    const items = getRecommendations(targets)

    // 절세 금액 추정 로직
    const recommendations = items.slice(0, 15).map((item, idx) => {
      let estimatedSaving = 0

      switch (item.id) {
        // 연금저축 세액공제
        case 'income_pension_savings': {
          const currentTotal = (pensionSavings || 0) + (irpContribution || 0)
          const maxContrib = 9_000_000
          const gap = Math.max(0, maxContrib - currentTotal)
          const rate = annualIncome <= 55_000_000 ? 0.165 : 0.132
          estimatedSaving = Math.round(gap * rate)
          break
        }
        // 월세 세액공제
        case 'income_monthly_rent': {
          if (monthlyRent > 0 && homeCount === 0 && annualIncome <= 80_000_000) {
            const annualRent = Math.min(monthlyRent * 12, 10_000_000)
            const rate = annualIncome <= 55_000_000 ? 0.17 : 0.15
            estimatedSaving = Math.round(annualRent * rate)
          }
          break
        }
        // 자녀 세액공제
        case 'credit_child': {
          if (children >= 1) {
            estimatedSaving = children === 1 ? 250_000 :
              children === 2 ? 550_000 : 550_000 + (children - 2) * 400_000
          }
          break
        }
        // 혼인 세액공제
        case 'income_marriage_credit': {
          estimatedSaving = isNewlywed ? 1_000_000 : 0
          break
        }
        // 출산보육수당 비과세
        case 'credit_childcare_benefit': {
          if (hasRecentBirth && children > 0) {
            const bracket = INCOME_TAX_BRACKETS_2026.find(b => annualIncome <= b.max)
            estimatedSaving = Math.round(children * 200_000 * 12 * (bracket?.rate || 0.15))
          }
          break
        }
        // 법인전환 — 법인세법 제55조 기준 (2023년 개정 세율: 2억 이하 9%)
        case 'biz_to_corp_conversion': {
          if (annualIncome > 88_000_000 && type === 'sole_proprietor') {
            const personalTax = calculateIncomeTax(annualIncome)
            const corpTax = calculateCorporateTax(annualIncome)
            estimatedSaving = Math.max(0, Math.round((personalTax - corpTax) * 0.4))
          }
          break
        }
        // 가업상속공제
        case 'inheritance_business_deduction': {
          if (hasSuccessionPlan && parentBusinessYears >= 10) {
            const limit = parentBusinessYears >= 30 ? 60_000_000_000 :
              parentBusinessYears >= 20 ? 40_000_000_000 : 30_000_000_000
            const deduction = Math.min(corporateValue || 0, limit)
            estimatedSaving = Math.round(deduction * 0.4) // 40% 세율 기준 추정
          }
          break
        }
        // 가업승계 증여세 과세특례
        case 'gift_business_succession_special': {
          if (hasSuccessionPlan && parentAge >= 60 && parentBusinessYears >= 10) {
            const normalGiftTax = calculateInheritanceTax(corporateValue || 0)
            const specialTax = Math.max(0, (corporateValue || 0) - 1_000_000_000) * 0.1
            estimatedSaving = Math.max(0, Math.round(normalGiftTax - specialTax))
          }
          break
        }
        // 창업감면
        case 'corp_startup_reduction': {
          if (type === 'corporation' && businessYears <= 5) {
            estimatedSaving = Math.round(annualIncome * 0.10 * 0.75)
          }
          break
        }
        // 상속세 자녀공제
        case 'inheritance_child_deduction': {
          if (children > 0) {
            estimatedSaving = Math.round(children * 500_000_000 * 0.3)
          }
          break
        }
        // 증여 기본공제
        case 'gift_family_exemption': {
          estimatedSaving = children > 0 ? children * 50_000_000 * 0.1 : 0
          break
        }
        // 혼인출산 증여공제
        case 'gift_marriage_birth': {
          estimatedSaving = (isNewlywed || hasRecentBirth) ? 150_000_000 * 0.1 : 0
          break
        }
        default: {
          // 기본 추정: 최대 절세 금액의 30%
          estimatedSaving = Math.round((item.maxSavingAmount || item.maxDeductionAmount || 500_000) * 0.3)
        }
      }

      return {
        id: item.id,
        name: item.name,
        shortDescription: item.shortDescription,
        impactLevel: item.impactLevel,
        estimatedSaving,
        applicableRate: item.applicableRate || '',
        steps: item.steps,
        contentHook: item.contentHook,
        warnings: item.warnings,
        category: item.category,
        subcategory: item.subcategory,
      }
    })
    .filter(r => r.estimatedSaving > 0)
    .sort((a, b) => b.estimatedSaving - a.estimatedSaving)

    const totalEstimatedSaving = recommendations.reduce((sum, r) => sum + r.estimatedSaving, 0)

    return NextResponse.json({
      recommendations,
      totalEstimatedSaving,
      profileSummary: { type, annualIncome, targets },
      disclaimer: "본 시뮬레이션은 2026년 현행 세법 기준 추정치이며, 개인별 상황에 따라 실제 절세 금액은 다를 수 있습니다. 정확한 세액 계산은 반드시 세무사 상담을 받으세요.",
      dataVersion: "2026.1",
      lastVerified: "2026-04-03",
    })
  } catch (error) {
    console.error('Tax simulator error:', error)
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

function calculateIncomeTax(income: number): number {
  let tax = 0
  for (const bracket of INCOME_TAX_BRACKETS_2026) {
    if (income <= bracket.min) break
    const taxable = Math.min(income, bracket.max) - bracket.min
    tax += taxable * bracket.rate
  }
  return tax
}

/** 법인세 계산 — 법인세법 제55조 (2023년 개정: 각 구간 1%p 인하) */
function calculateCorporateTax(income: number): number {
  let tax = 0
  for (const bracket of CORPORATE_TAX_BRACKETS_2026) {
    if (income <= bracket.min) break
    const taxable = Math.min(income, bracket.max) - bracket.min
    tax += taxable * bracket.rate
  }
  return tax
}

/** 상속세·증여세 계산 — 상속세 및 증여세법 제26조 */
function calculateInheritanceTax(value: number): number {
  let tax = 0
  for (const b of INHERITANCE_TAX_BRACKETS_2026) {
    if (value <= b.min) break
    tax += (Math.min(value, b.max) - b.min) * b.rate
  }
  return tax
}
