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
    warnings: [
      "세금계산서 미수취 시 매입세액 공제 불가 — 반드시 적격증빙 수취 필수",
      "비영업용 소형승용차(1,000cc 초과 비업무용) 관련 매입세액은 불공제",
      "접대비 관련 지출 매입세액은 전액 불공제",
      "면세사업자는 매입세액 공제 자체가 불가 — 과세·면세 겸업 시 안분계산 적용",
    ],
    practicalCases: [
      {
        title: "식당 사장님 식재료비 매입세액 공제",
        situation: "월 매출 2,000만원(부가세 포함 2,200만원), 식재료·용품 매입 800만원(부가세 포함 880만원)인 일반과세 식당",
        calculation: "매출세액 200만원 - 매입세액 80만원 = 납부세액 120만원",
        result: "세금계산서를 빠짐없이 수취해 매입세액 80만원 공제. 미수취 시 납부세액 200만원으로 증가",
        taxSaved: 800000,
      },
      {
        title: "IT 프리랜서 장비 구입 매입세액 공제",
        situation: "연 매출 6,000만원인 프리랜서가 노트북·모니터 등 업무 장비 330만원(VAT 30만원 포함) 구입",
        calculation: "매입세액 30만원 전액 공제 적용",
        result: "카드 결제 또는 세금계산서 수취 시 30만원 공제, 현금 영수증 없이 결제 시 공제 불가",
        taxSaved: 300000,
      },
    ],
  },
  {
    id: "vat_simplified_vs_general",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "vat", subcategory: "사업자 유형",
    savingType: "structure", targetAudience: ["sole_proprietor"],
    name: "간이과세자 ↔ 일반과세자 전환 전략",
    shortDescription: "매출 규모에 따라 유리한 과세 유형 선택",
    fullDescription: "연 매출 1억 400만원 미만은 간이과세자로 부가세 부담 경감 (업종별 부가가치율 적용). 4,800만원 미만은 부가세 납부 면제. 반면 매입이 큰 업종은 일반과세자가 유리할 수 있음.",
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
    warnings: [
      "간이과세자는 세금계산서 발급 불가(일부 예외) — B2B 거래처 요청 시 일반과세자 전환 검토 필요",
      "연 매출 1억 400만원 초과 시 다음 해 7월 1일 자동으로 일반과세자 전환",
      "간이과세자는 매입세액 전액 공제 불가 — 의제매입세액 공제율(음식점 6/106 등)만 적용",
      "의제매입세액 공제는 업종별 공제율이 다르므로 반드시 해당 업종 기준 확인 필요",
    ],
    practicalCases: [
      {
        title: "카페 창업자, 간이과세 vs 일반과세 비교",
        situation: "연 매출 8,000만원, 원두·재료비 등 연 매입 3,000만원인 카페 (음식업 간이과세 부가가치율 15%)",
        calculation: "간이: 8,000만원 × 15% × 10% = 120만원 / 일반: 800만원 - 300만원 = 500만원",
        result: "간이과세 선택 시 부가세 120만원으로 일반과세 대비 380만원 절감",
        taxSaved: 3800000,
      },
      {
        title: "소규모 컨설턴트, 연 매출 4,500만원 납부 면제",
        situation: "연 매출 4,500만원인 1인 컨설팅 사업자 (간이과세 납부 면제 기준 4,800만원 미만)",
        calculation: "연 매출 4,500만원 < 4,800만원 → 부가세 납부 면제",
        result: "일반과세 적용 시 부가세 약 450만원 납부 필요하나, 간이과세로 납부 면제 혜택",
        taxSaved: 4500000,
      },
    ],
  },
]
