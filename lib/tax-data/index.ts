// ============================================================
// 절세 데이터베이스 - 메인 인덱스
// 2026년 대한민국 세법 기준 | 총 80+ 절세 항목
// ============================================================

export { incomeDeductions } from "./categories/01-income-deductions"
export { incomeDeductionsExtra } from "./categories/01-income-deductions-extra"
export { incomeCredits } from "./categories/02-income-credits"
export { businessTax } from "./categories/03-business-tax"
export { businessTaxExtra } from "./categories/03-business-tax-extra"
export { corporateTax } from "./categories/04-corporate-tax"
export { corporateTaxExtra } from "./categories/04-corporate-tax-extra"
export { vatStrategies } from "./categories/05-vat"
export { capitalGains } from "./categories/06-capital-gains"
export { capitalGainsExtra } from "./categories/06-capital-gains-extra"
export { propertyTax } from "./categories/07-property-tax"
export { propertyTaxExtra } from "./categories/07-property-tax-extra"
export { inheritanceGift } from "./categories/08-inheritance-gift"
export { inheritanceGiftExtra } from "./categories/08-inheritance-gift-extra"
export { financialInvestment } from "./categories/09-financial-investment"
export { financialInvestmentExtra } from "./categories/09-financial-investment-extra"
export { specialCases } from "./categories/10-special-cases"
export { specialCasesExtra } from "./categories/10-special-cases-extra"

export { TAX_CATEGORY_MAP } from "./constants"
export { getAllItems, getItemsByTarget, getItemsByCategory, searchItems, getContentIdeas, getRecommendations, getStats } from "./utils"
