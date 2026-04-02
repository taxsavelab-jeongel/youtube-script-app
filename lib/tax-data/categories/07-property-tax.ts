// ============================================================
// 07. 부동산 보유세 (종부세, 재산세, 취득세) 절세
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const propertyTax: TaxSavingItem[] = [
  {
    id: "prop_joint_ownership",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "comprehensive_property", subcategory: "종부세",
    savingType: "split", targetAudience: ["investor", "multi_home_owner"],
    name: "부부 공동명의 종부세 절세",
    shortDescription: "공동명의 시 각각 6억 공제 (합산 12억 vs 단독 11억)",
    fullDescription: "1세대 1주택 단독명의는 11억 공제, 부부 공동명의는 각각 6억씩 총 12억 공제. 고가 주택일수록 공동명의가 유리. 단, 단독명의는 고령자·장기보유 세액공제(최대 80%) 적용 가능하므로 비교 필요.",
    tags: ["종부세", "공동명의", "부부", "세액공제"],
    impactLevel: "high", applicableRate: "공동 12억 vs 단독 11억 공제",
    requirements: [{ id: "req_1", description: "부부 공동 소유 주택", type: "family", critical: true }],
    legalBasis: [{ law: "종합부동산세법", article: "제8조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "home_value", label: "주택 공시가격", type: "number", unit: "원", required: true },
      { id: "owner_age", label: "소유자 나이", type: "number", unit: "세", required: false },
      { id: "holding_years", label: "보유기간", type: "number", unit: "년", required: false },
    ],
    calculationFormula: "단독: (공시가-11억)×공정시장가액비율×세율 - 세액공제. 공동: 각각 (공시가/2-6억)×비율×세율",
    urgency: "long_term", difficulty: "medium",
    steps: ["단독 vs 공동 세액 비교", "고령자/장기보유 세액공제 적용 가능 여부 확인", "유리한 방식 선택 후 소유권 이전"],
  },
  {
    id: "prop_acquisition_tax_first_home",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "acquisition", subcategory: "생애최초",
    savingType: "reduction", targetAudience: ["youth", "newlywed"],
    name: "생애최초 주택 취득세 감면",
    shortDescription: "생애최초 주택 구입 시 취득세 감면 (200만원 한도)",
    fullDescription: "생애최초로 주택을 구입하는 경우 취득세를 감면받을 수 있습니다. 인구감소지역 내 생애최초 주택 구입 시 2026년부터 감면 한도가 200만원에서 300만원으로 확대.",
    tags: ["취득세", "생애최초", "주택구입", "감면"],
    impactLevel: "medium", maxSavingAmount: 3_000_000,
    requirements: [
      { id: "req_1", description: "생애최초 주택 구입", type: "asset", critical: true },
    ],
    legalBasis: [{ law: "지방세특례제한법", article: "제36조의3", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "home_price", label: "주택 취득가액", type: "number", unit: "원", required: true },
      { id: "is_depopulation_area", label: "인구감소지역 여부", type: "boolean", required: false },
    ],
    calculationFormula: "취득세 감면 (200만원 한도, 인구감소지역 300만원)",
    urgency: "event_based", difficulty: "easy",
    steps: ["생애최초 주택 구입 여부 확인", "취득세 신고 시 감면 신청", "인구감소지역 해당 여부 확인"],
  },
  {
    id: "prop_acquisition_birth",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "acquisition", subcategory: "출산/양육",
    savingType: "reduction", targetAudience: ["parent"],
    name: "출산·양육 주택 취득세 감면",
    shortDescription: "출산·양육 목적 주택 구입 시 취득세 100% 감면 (500만원 한도)",
    fullDescription: "출산 또는 양육을 위해 주택을 구입하는 경우 취득세를 100% 감면 (500만원 한도). 2026년까지 연장 적용.",
    tags: ["취득세", "출산", "양육", "주택구입", "감면"],
    impactLevel: "medium", maxSavingAmount: 5_000_000, applicableRate: "100% (500만원 한도)",
    requirements: [{ id: "req_1", description: "출산·양육 목적 주택 구입", type: "family", critical: true }],
    legalBasis: [{ law: "지방세특례제한법", article: "제36조의4", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "acquisition_tax", label: "취득세 산출액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "감면액 = min(취득세, 500만원)",
    urgency: "event_based", difficulty: "easy",
    steps: ["출산·양육 증빙 서류 준비", "주택 취득 시 감면 신청"],
  },
]
