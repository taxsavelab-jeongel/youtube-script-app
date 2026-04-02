// ============================================================
// 06. 양도소득세 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const capitalGains: TaxSavingItem[] = [
  {
    id: "cg_1house_exemption",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "capital_gains", subcategory: "1세대1주택",
    savingType: "exemption", targetAudience: ["all"],
    name: "1세대 1주택 비과세",
    shortDescription: "실거래가 12억 이하 1주택 양도 시 비과세",
    fullDescription: "1세대가 1주택을 2년 이상 보유(조정대상지역은 2년 거주 포함) 후 양도 시, 실거래가 12억원 이하분은 양도소득세 비과세. 12억 초과 고가주택은 초과분에만 과세.",
    tags: ["1세대1주택", "비과세", "양도소득세", "2년보유"],
    impactLevel: "very_high", applicableRate: "12억 이하 전액 비과세",
    requirements: [
      { id: "req_1", description: "1세대 1주택", type: "asset", critical: true },
      { id: "req_2", description: "2년 이상 보유", type: "period", value: "2년 이상", critical: true },
      { id: "req_3", description: "조정대상지역: 2년 이상 거주", type: "period", value: "2년 이상 거주", critical: false },
    ],
    legalBasis: [{ law: "소득세법", article: "제89조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "sale_price", label: "양도가액", type: "number", unit: "원", required: true },
      { id: "purchase_price", label: "취득가액", type: "number", unit: "원", required: true },
      { id: "holding_period", label: "보유기간", type: "number", unit: "년", required: true },
    ],
    calculationFormula: "12억 이하: 세금 0원. 12억 초과: (양도차익 × 12억초과분/양도가액) × 세율",
    urgency: "event_based", difficulty: "medium",
    steps: ["1세대 1주택 해당 여부 확인", "보유기간 및 거주기간 확인", "양도가액 12억 초과 여부 확인"],
    contentHook: { title: "내 집 팔 때 세금 0원? 1주택 비과세 완벽 가이드", hook: "12억 이하 주택, 2년만 보유하면 양도세 0원!", targetKeyword: "1세대1주택 비과세 조건 2026", estimatedViews: "high" },
  },
  {
    id: "cg_long_term_holding",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "capital_gains", subcategory: "장기보유특별공제",
    savingType: "deduction", targetAudience: ["all", "investor"],
    name: "장기보유특별공제",
    shortDescription: "3년↑ 보유 부동산 양도차익 최대 80% 공제",
    fullDescription: "3년 이상 보유한 부동산 양도 시 보유기간에 따라 양도차익의 최대 30%(일반) 공제. 1세대 1주택(12억 초과)은 보유기간 최대 40% + 거주기간 최대 40% = 합산 80% 공제 가능.",
    tags: ["장기보유특별공제", "양도소득세", "보유기간", "거주기간"],
    impactLevel: "high", applicableRate: "일반 최대 30% / 1주택 최대 80%",
    requirements: [
      { id: "req_1", description: "3년 이상 보유", type: "period", value: "3년 이상", critical: true },
      { id: "req_2", description: "1세대1주택 80% 적용: 2년 이상 거주", type: "period", critical: false },
    ],
    legalBasis: [{ law: "소득세법", article: "제95조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "gain", label: "양도차익", type: "number", unit: "원", required: true },
      { id: "holding_years", label: "보유기간", type: "number", unit: "년", required: true },
      { id: "living_years", label: "거주기간 (1주택 시)", type: "number", unit: "년", required: false },
      { id: "is_single_home", label: "1세대1주택 여부", type: "boolean", required: true },
    ],
    calculationFormula: "일반: 연 2%씩 최대 30%. 1주택: 보유 연4%×10년(40%) + 거주 연4%×10년(40%) = 80%",
    urgency: "event_based", difficulty: "medium",
    steps: ["보유기간·거주기간 정확히 계산", "1세대1주택 해당 여부 확인", "양도소득세 신고 시 공제 적용"],
  },
  {
    id: "cg_multi_home_deferral",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "capital_gains", subcategory: "다주택 전략",
    savingType: "deferral", targetAudience: ["multi_home_owner", "investor"],
    name: "다주택자 중과 유예 활용 (2026.5.9까지)",
    shortDescription: "조정대상지역 다주택 중과세율 한시 유예 활용",
    fullDescription: "2022.5.10~2026.5.9 양도분에 대해 조정대상지역 다주택자 양도세 중과(+20~30%p) 적용 배제 및 장기보유특별공제 적용. 유예 기간 내 매도 전략 필요.",
    tags: ["다주택자", "양도세", "중과유예", "조정대상지역"],
    impactLevel: "very_high", applicableRate: "중과세율(+20~30%p) 배제",
    requirements: [
      { id: "req_1", description: "2026년 5월 9일까지 양도", type: "period", value: "~2026.5.9", critical: true },
    ],
    legalBasis: [{ law: "소득세법 시행령", article: "부칙", effectiveDate: "2022-05-10", expiryDate: "2026-05-09" }],
    calculationParams: [
      { id: "gain", label: "양도차익", type: "number", unit: "원", required: true },
      { id: "home_count", label: "보유 주택 수", type: "number", unit: "채", required: true },
    ],
    calculationFormula: "중과 시: 기본세율 + 20~30%p. 유예 시: 기본세율만 적용. 차이가 절세액.",
    urgency: "year_end", difficulty: "hard",
    steps: ["보유 주택 현황 정리", "유예 기간 내 매도 계획 수립", "중과 vs 일반 세액 비교 시뮬레이션", "2026.5.9 전 양도 완료"],
    contentHook: { title: "다주택자 마지막 기회! 2026년 5월까지 팔아야 하는 이유", hook: "5월 넘기면 양도세 20%p 추가, 수억 차이!", targetKeyword: "다주택자 양도세 중과 유예 2026", estimatedViews: "high" },
    warnings: ["2026.5.10 이후 중과 부활 가능성 — 정부 정책 주시 필요"],
  },
]
