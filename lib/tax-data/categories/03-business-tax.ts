// ============================================================
// 03. 사업소득세 절세 (개인사업자/프리랜서)
// ============================================================

import type { TaxSavingItem } from "@/types/tax-database"

export const businessTax: TaxSavingItem[] = [
  {
    id: "biz_expense_optimization",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "경비처리",
    savingType: "deduction", targetAudience: ["sole_proprietor", "freelancer"],
    name: "필요경비 최적화",
    shortDescription: "사업 관련 지출을 경비로 처리하여 과세소득 감소",
    fullDescription: "사업과 직접 관련된 지출(임차료, 인건비, 소모품비, 차량유지비, 통신비, 접대비 등)을 필요경비로 인정받아 종합소득 과세표준을 낮춥니다. 사업용 신용카드/현금영수증 사용이 핵심.",
    tags: ["경비처리", "필요경비", "사업자", "종합소득세"],
    impactLevel: "high", applicableRate: "소득세율 6~45%만큼 절세",
    requirements: [{ id: "req_1", description: "사업자등록 필수", type: "business_type", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제27조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "revenue", label: "연간 매출", type: "number", unit: "원", required: true },
      { id: "expenses", label: "필요경비 합계", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "과세소득 = 매출 - 필요경비. 경비 증가 → 과세소득 감소 → 세율구간 하락",
    urgency: "year_round", difficulty: "medium",
    steps: ["사업용 카드 등록", "모든 사업 지출 영수증 수집", "접대비 한도 확인", "종합소득세 신고 시 경비 반영"],
    contentHook: { title: "프리랜서 경비처리 A to Z, 세금 절반으로!", hook: "카페 커피도 경비? 되는 것 안 되는 것 총정리", targetKeyword: "프리랜서 경비처리", estimatedViews: "high" },
  },
  {
    id: "biz_simplified_bookkeeping",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "장부/기장",
    savingType: "deduction", targetAudience: ["sole_proprietor", "freelancer"],
    name: "간편장부 vs 복식부기 선택 전략",
    shortDescription: "기장 방식에 따라 세액공제 20% 추가 가능",
    fullDescription: "복식부기 의무자가 아닌 사업자가 자발적으로 복식부기로 기장하면 기장세액공제 20%(100만원 한도)를 추가로 받을 수 있습니다. 반대로 기장 의무 불이행 시 20% 가산세.",
    tags: ["간편장부", "복식부기", "기장세액공제", "무기장가산세"],
    impactLevel: "medium", applicableRate: "기장세액공제 20% (100만원 한도)",
    requirements: [{ id: "req_1", description: "간편장부 대상자가 복식부기 자발 선택", type: "other", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제56조의2", effectiveDate: "2026-01-01" }],
    calculationParams: [{ id: "tax_amount", label: "산출세액", type: "number", unit: "원", required: true }],
    calculationFormula: "기장세액공제 = min(산출세액 × 20%, 100만원)",
    urgency: "quarterly", difficulty: "medium",
    steps: ["기장 의무 구분 확인 (전년도 수입 기준)", "복식부기 기장 또는 세무사 위임", "종합소득세 신고 시 기장세액공제 신청"],
  },
  {
    id: "biz_to_corp_conversion",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "법인전환",
    savingType: "structure", targetAudience: ["sole_proprietor"],
    name: "개인사업자 → 법인 전환 절세",
    shortDescription: "소득 일정 수준 이상 시 법인 전환으로 세율 차이 활용",
    fullDescription: "개인사업자의 종합소득세 최고세율은 45%인 반면 법인세는 최고 25%(2026). 연 소득이 약 8,800만원을 넘으면 법인 전환이 유리할 수 있습니다. 대표이사 급여 설계, 배당소득 분리과세와 결합하면 절세 극대화.",
    tags: ["법인전환", "개인사업자", "법인세", "소득세", "세율비교"],
    impactLevel: "very_high", applicableRate: "소득세 최고 45% → 법인세 10/20/22/25%",
    requirements: [
      { id: "req_1", description: "연 과세소득 8,800만원 이상 권장", type: "income_limit", value: "8,800만원 이상", critical: false },
    ],
    legalBasis: [
      { law: "소득세법", article: "제55조", effectiveDate: "2026-01-01" },
      { law: "법인세법", article: "제55조", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "annual_income", label: "연간 사업소득", type: "number", unit: "원", required: true },
      { id: "desired_salary", label: "대표이사 희망 급여 (법인 전환 시)", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "개인세금 vs (법인세 + 대표급여 소득세 + 배당세) 비교",
    urgency: "long_term", difficulty: "hard",
    steps: ["개인 vs 법인 세부담 시뮬레이션", "법인 설립 (자본금, 정관)", "사업 포괄양수도 또는 현물출자", "대표이사 급여 최적 설계", "배당 시점/금액 계획"],
    contentHook: { title: "연매출 1억 넘으면 법인 전환? 시뮬레이션 결과 공개", hook: "같은 매출, 세금 1천만원 차이나는 이유!", targetKeyword: "개인사업자 법인전환 절세", estimatedViews: "high" },
  },
]
