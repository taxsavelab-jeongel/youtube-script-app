// ============================================================
// 절세 데이터베이스 - 검색/필터 유틸리티
// ============================================================

import type { TaxSavingItem, TaxCategory, TargetAudience, ImpactLevel } from "@/types/tax-database"
import { incomeDeductions } from "./categories/01-income-deductions"
import { incomeDeductionsExtra } from "./categories/01-income-deductions-extra"
import { incomeCredits } from "./categories/02-income-credits"
import { businessTax } from "./categories/03-business-tax"
import { businessTaxExtra } from "./categories/03-business-tax-extra"
import { corporateTax } from "./categories/04-corporate-tax"
import { corporateTaxExtra } from "./categories/04-corporate-tax-extra"
import { vatStrategies } from "./categories/05-vat"
import { capitalGains } from "./categories/06-capital-gains"
import { capitalGainsExtra } from "./categories/06-capital-gains-extra"
import { propertyTax } from "./categories/07-property-tax"
import { propertyTaxExtra } from "./categories/07-property-tax-extra"
import { inheritanceGift } from "./categories/08-inheritance-gift"
import { inheritanceGiftExtra } from "./categories/08-inheritance-gift-extra"
import { financialInvestment } from "./categories/09-financial-investment"
import { financialInvestmentExtra } from "./categories/09-financial-investment-extra"
import { specialCases } from "./categories/10-special-cases"
import { specialCasesExtra } from "./categories/10-special-cases-extra"

/** 전체 절세 항목 목록 */
export function getAllItems(): TaxSavingItem[] {
  return [
    ...incomeDeductions,
    ...incomeDeductionsExtra,
    ...incomeCredits,
    ...businessTax,
    ...businessTaxExtra,
    ...corporateTax,
    ...corporateTaxExtra,
    ...vatStrategies,
    ...capitalGains,
    ...capitalGainsExtra,
    ...propertyTax,
    ...propertyTaxExtra,
    ...inheritanceGift,
    ...inheritanceGiftExtra,
    ...financialInvestment,
    ...financialInvestmentExtra,
    ...specialCases,
    ...specialCasesExtra,
  ]
}

/** 대상자 유형으로 필터 */
export function getItemsByTarget(target: TargetAudience): TaxSavingItem[] {
  return getAllItems().filter(
    (item) => item.targetAudience.includes(target) || item.targetAudience.includes("all")
  )
}

/** 세금 카테고리로 필터 */
export function getItemsByCategory(category: TaxCategory): TaxSavingItem[] {
  return getAllItems().filter((item) => item.category === category)
}

/** 효과 규모로 필터 */
export function getItemsByImpact(minImpact: ImpactLevel): TaxSavingItem[] {
  const levels: ImpactLevel[] = ["low", "medium", "high", "very_high"]
  const minIndex = levels.indexOf(minImpact)
  return getAllItems().filter((item) => levels.indexOf(item.impactLevel) >= minIndex)
}

/** 키워드 검색 (이름, 설명, 태그) */
export function searchItems(query: string): TaxSavingItem[] {
  const q = query.toLowerCase()
  return getAllItems().filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q) ||
      item.fullDescription.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

/** 유튜브 콘텐츠 추천 (콘텐츠 훅이 있는 항목만, 인기순) */
export function getContentIdeas(): TaxSavingItem[] {
  const viewsOrder = { high: 3, medium: 2, low: 1 }
  return getAllItems()
    .filter((item) => item.contentHook)
    .sort((a, b) =>
      (viewsOrder[b.contentHook!.estimatedViews] || 0) -
      (viewsOrder[a.contentHook!.estimatedViews] || 0)
    )
}

/** 사용자 프로필 기반 맞춤 추천 (간단 버전) */
export function getRecommendations(targets: TargetAudience[]): TaxSavingItem[] {
  const items = getAllItems().filter(
    (item) =>
      item.targetAudience.some((t) => targets.includes(t)) ||
      item.targetAudience.includes("all")
  )
  // 효과 높은 순으로 정렬
  const impactOrder = { very_high: 4, high: 3, medium: 2, low: 1 }
  return items.sort((a, b) => (impactOrder[b.impactLevel] || 0) - (impactOrder[a.impactLevel] || 0))
}

/** 데이터베이스 통계 */
export function getStats() {
  const items = getAllItems()
  const categories = new Set(items.map((i) => i.category))
  const targets = new Set(items.flatMap((i) => i.targetAudience))
  const withContent = items.filter((i) => i.contentHook).length

  return {
    totalItems: items.length,
    categories: categories.size,
    targets: targets.size,
    contentIdeas: withContent,
    byImpact: {
      very_high: items.filter((i) => i.impactLevel === "very_high").length,
      high: items.filter((i) => i.impactLevel === "high").length,
      medium: items.filter((i) => i.impactLevel === "medium").length,
      low: items.filter((i) => i.impactLevel === "low").length,
    },
  }
}
