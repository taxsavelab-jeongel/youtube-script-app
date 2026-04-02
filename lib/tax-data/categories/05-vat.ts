// ============================================================
// 05. 부가가치세 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const vatStrategies: TaxSavingItem[] = [
  {
    id: "vat_input_credit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "vat", subcategory: "매입세액공제",
    savingType: "credit", targetAudience: ["sole_proprietor", "corporation"],
    name: "매입세액 공제 최적화",
    shortDescription: "사업 관련 매입 부가세 전액 공제",
    fullDescription: "사업과 직접 관련된 재화·용역의 매입 시 부담한 부가가치세(매입세액)를 매출세액에서 공제. 세금계산서·신용카드·현금영수증 등 적격증빙 필수. 비영업용 소형승용차, 접대비 관련 매입세액은 불공제.",
    tags: ["매입세액", "부가세", "세금계산서", "적격증빙"],
    impactLevel: "high", applicableRate: "매입세액 전액 공제",
    requirements: [{ id: "req_1", description: "적격증빙 보유 (세금계산서, 카드, 현금영수증)", type: "other", critical: true }],
    legalBasis: [{ law: "부가가치세법", article: "제38조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "output_tax", label: "매출세액", type: "number", unit: "원", required: true },
      { id: "input_tax", label: "매입세액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "납부세액 = 매출세액 - 매입세액",
    urgency: "quarterly", difficulty: "easy",
    steps: ["모든 사업 관련 지출에 세금계산서/카드 수취", "불공제 항목 확인 (비영업용 차량 등)", "부가세 신고 시 매입세액 공제 반영"],
  },
  {
    id: "vat_simplified_vs_general",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "vat", subcategory: "사업자 유형",
    savingType: "structure", targetAudience: ["sole_proprietor"],
    name: "간이과세자 ↔ 일반과세자 전환 전략",
    shortDescription: "매출 규모에 따라 유리한 과세 유형 선택",
    fullDescription: "연 매출 1억 400만원 미만은 간이과세자로 부가세 부담 경감 (업종별 부가가치율 적용). 8,000만원 미만은 부가세 납부 면제. 반면 매입이 큰 업종은 일반과세자가 유리할 수 있음.",
    tags: ["간이과세자", "일반과세자", "부가세", "사업자전환"],
    impactLevel: "medium", applicableRate: "간이: 업종별 1.5~4% vs 일반: 10%",
    requirements: [{ id: "req_1", description: "연 매출 1억 400만원 미만 (간이과세 기준)", type: "income_limit", critical: false }],
    legalBasis: [{ law: "부가가치세법", article: "제61조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "annual_revenue", label: "연 매출", type: "number", unit: "원", required: true },
      { id: "annual_purchase", label: "연 매입 (공급가액)", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "간이: 매출 × 업종별 부가가치율 × 10% vs 일반: 매출×10% - 매입세액",
    urgency: "year_round", difficulty: "medium",
    steps: ["연 매출 규모 확인", "매입 비율 계산", "간이 vs 일반 세액 비교", "유리한 유형으로 전환 신청 (7월 1일 기준)"],
    contentHook: { title: "간이과세자 vs 일반과세자, 당신에게 유리한 것은?", hook: "매출 1억인데 간이과세면 부가세 거의 0원!", targetKeyword: "간이과세자 일반과세자 비교", estimatedViews: "high" },
  },
]
