// ============================================================
// 03-extra. 사업소득세 추가 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const businessTaxExtra: TaxSavingItem[] = [
  {
    id: "biz_home_office_expense",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "홈오피스",
    savingType: "deduction", targetAudience: ["freelancer", "sole_proprietor"],
    name: "자택 사무실(홈오피스) 경비 처리",
    shortDescription: "자택을 사업장으로 사용 시 임차료·공과금 일부 경비 인정",
    fullDescription: "프리랜서·개인사업자가 자택 일부를 사업장으로 사용하는 경우, 사업 사용 면적 비율만큼 임차료, 관리비, 전기료, 인터넷비 등을 필요경비로 인정. 사업자등록 시 자택 주소 등록 필요.",
    tags: ["홈오피스", "재택근무", "경비", "프리랜서"],
    impactLevel: "medium", applicableRate: "사업 사용 면적 비율만큼",
    requirements: [
      { id: "r1", description: "사업자등록 (자택 주소)", type: "business_type", critical: true },
      { id: "r2", description: "사업 사용 면적 구분 가능", type: "other", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제27조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "total_rent", label: "월 임차료/관리비", type: "number", unit: "원", required: true },
      { id: "biz_ratio", label: "사업 사용 비율 (%)", type: "number", unit: "%", min: 1, max: 100, required: true },
    ],
    calculationFormula: "경비 = (임차료+관리비+공과금) × 사업사용비율 × 12개월",
    urgency: "year_round", difficulty: "medium",
    steps: ["사업장 주소를 자택으로 등록", "사업 사용 면적 비율 산정", "관련 지출 증빙 보관", "종합소득세 신고 시 경비 반영"],
    contentHook: { title: "집에서 일하면 월세도 세금에서 빠진다?!", hook: "방 하나를 사무실로 쓰면 월세 30% 경비 처리!", targetKeyword: "프리랜서 홈오피스 경비", estimatedViews: "high" },
  },
  {
    id: "biz_vehicle_expense",
    version: "2026.2", lastUpdated: "2026-01-01",
    category: "income", subcategory: "차량경비",
    savingType: "deduction", targetAudience: ["sole_proprietor", "corporation"],
    name: "업무용 승용차 경비 한도 (2026 부분기간 보험 가입 개정)",
    shortDescription: "업무용 차량 연 1,500만원 한도 — 1대 초과분은 가입기간 비율만큼 경비 인정",
    fullDescription: `업무 전용 보험에 가입한 차량의 감가상각비, 유류비, 보험료, 수리비 등을 연간 1,500만원 한도로 경비 처리.

■ 기본 원칙
  - 업무전용 자동차보험 가입이 경비 처리의 전제 조건
  - 운행일지 작성 시 업무사용비율만큼 경비 인정 (미작성 시 100만원 이하만 인정)

■ 2026년 개정 — 1대 초과 차량 부분기간 보험 가입 시 (신설)
  업무용 승용차를 2대 이상 운용하는 경우, 2번째 차량부터:
  - 연중 일부 기간만 업무전용 보험에 가입한 경우
  - 가입 기간 비율에 따라 경비를 안분하여 인정
  예) 7월부터 12월까지 가입(6개월) → 해당 차량 비용의 6/12(50%)만 경비 인정

■ 기존 규정 (1대까지)
  - 연간 1,500만원 한도 (감가상각비 포함)
  - 업무전용 보험 미가입 시 전액 비용 불인정`,
    tags: ["업무용차량", "감가상각", "차량경비", "운행일지", "부분기간보험"],
    impactLevel: "high", maxDeductionAmount: 15_000_000, applicableRate: "연 1,500만원 한도 (1대 초과분: 보험가입기간 비율 적용)",
    requirements: [
      { id: "r1", description: "업무전용 자동차보험 가입 (필수)", type: "other", critical: true },
      { id: "r2", description: "운행일지 작성 (경비 한도 초과 시)", type: "other", critical: false },
      { id: "r3", description: "1대 초과 차량: 가입기간 비율로 경비 안분 (2026년 신설)", type: "other", critical: false },
    ],
    legalBasis: [
      { law: "소득세법 시행령", article: "제78조의3", effectiveDate: "2026-01-01" },
      { law: "법인세법 시행령", article: "제50조의2", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "vehicle_count", label: "업무용 차량 대수", type: "number", unit: "대", required: true },
      { id: "vehicle_cost", label: "차량 관련 연간 총비용", type: "number", unit: "원", required: true },
      { id: "biz_usage", label: "업무 사용 비율 (%)", type: "number", unit: "%", required: true },
      { id: "insurance_months", label: "1대 초과 차량 업무전용 보험 가입 개월 수", type: "number", unit: "개월", min: 1, max: 12, required: false },
    ],
    calculationFormula: "1대: 경비 = min(차량비용 × 업무비율, 1,500만). 2대↑: 경비 = 차량비용 × (가입개월/12) × 업무비율, 한도 1,500만",
    urgency: "year_round", difficulty: "medium",
    steps: [
      "① 업무전용 보험 가입 (전 차량 필수)",
      "② 2대 이상인 경우: 각 차량 보험 가입 기간 확인",
      "③ 운행일지 작성 (앱 활용 — 한도 초과 차량)",
      "④ 연간 차량비용 집계 및 가입기간 비율 계산",
      "⑤ 한도 내 경비 처리 (신고 시 차량 목록 첨부)",
    ],
    contentHook: { title: "차 2대 있는 사장님 주목! 2026년 차량경비 규정 바뀌었습니다", hook: "보험 중간에 가입해도 경비 인정! 단, 기간 비율만큼만", targetKeyword: "업무용차량 경비 한도 2026 부분기간", estimatedViews: "high" },
  },
  {
    id: "biz_estimated_expense",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "추계신고",
    savingType: "deduction", targetAudience: ["freelancer"],
    name: "단순경비율/기준경비율 활용",
    shortDescription: "장부 없이 업종별 경비율로 간편 신고",
    fullDescription: "장부를 작성하지 않은 소규모 사업자는 국세청이 정한 단순경비율 또는 기준경비율을 적용하여 소득을 추계할 수 있습니다. 단순경비율 적용 시 경비를 높게 잡아주므로 유리할 수 있으나, 실제 경비가 더 많다면 장부 기장이 유리.",
    tags: ["단순경비율", "기준경비율", "추계신고", "프리랜서"],
    impactLevel: "medium", applicableRate: "업종별 경비율 적용 (60~90%)",
    requirements: [{ id: "r1", description: "직전연도 수입금액이 단순경비율 기준 이하", type: "income_limit", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제80조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "revenue", label: "연 매출", type: "number", unit: "원", required: true },
      { id: "expense_rate", label: "단순경비율 (%)", type: "number", unit: "%", required: true },
    ],
    calculationFormula: "소득 = 매출 × (1 - 단순경비율). 실제경비 vs 추계 비교 후 유리한 쪽 선택.",
    urgency: "year_end", difficulty: "easy",
    steps: ["업종별 단순/기준경비율 확인 (국세청)", "실제 경비와 추계 경비 비교", "유리한 방식으로 종합소득세 신고"],
    contentHook: { title: "영수증 없어도 세금 신고 가능! 경비율 신고 총정리", hook: "프리랜서 매출 2천만원, 경비율 적용하면 소득 600만원만 인정!", targetKeyword: "단순경비율 프리랜서", estimatedViews: "medium" },
  },
  {
    id: "biz_tax_agent_deduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "세무대리",
    savingType: "deduction", targetAudience: ["sole_proprietor", "freelancer"],
    name: "성실신고 확인비용 세액공제",
    shortDescription: "성실신고 확인 대상자 세무사 비용 60% 세액공제 (120만원 한도)",
    fullDescription: "성실신고 확인 대상 사업자가 세무사에게 지급한 성실신고 확인 비용의 60%를 세액공제 (120만원 한도). 성실신고 확인 대상: 업종별 수입금액 기준 충족 시.",
    tags: ["성실신고", "세무사", "세액공제", "확인비용"],
    impactLevel: "low", maxSavingAmount: 1_200_000, applicableRate: "확인비용의 60% (120만원 한도)",
    requirements: [{ id: "r1", description: "성실신고 확인 대상 사업자", type: "income_limit", critical: true }],
    legalBasis: [{ law: "조세특례제한법", article: "제126조의6", effectiveDate: "2026-01-01" }],
    calculationParams: [{ id: "cost", label: "성실신고 확인 비용", type: "number", unit: "원", required: true }],
    calculationFormula: "공제 = min(비용 × 60%, 120만원)", urgency: "year_end", difficulty: "easy",
    steps: ["성실신고 확인 대상 여부 확인", "세무사에게 성실신고 확인 의뢰", "확인비용 영수증 수취", "종합소득세 신고 시 공제 적용"],
  },
  {
    id: "biz_mixed_income_split",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "소득분산",
    savingType: "split", targetAudience: ["sole_proprietor", "business_owner"],
    name: "가족 급여 지급을 통한 소득 분산",
    shortDescription: "배우자·가족에게 적정 급여 지급하여 세율구간 분산",
    fullDescription: "개인사업자가 실제 근무하는 배우자나 가족에게 적정 수준의 급여를 지급하면, 사업소득이 분산되어 종합소득세 누진세율 구간이 낮아짐. 단, 실제 근무 사실이 있어야 하며, 과도한 급여는 부인될 수 있음.",
    tags: ["소득분산", "가족급여", "누진세율", "사업자"],
    impactLevel: "high", applicableRate: "누진세율 구간 차이만큼 절세",
    requirements: [
      { id: "r1", description: "가족의 실제 근무 사실", type: "employment", critical: true },
      { id: "r2", description: "적정 수준의 급여 (시장가격 기준)", type: "income_limit", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제27조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "biz_income", label: "사업소득", type: "number", unit: "원", required: true },
      { id: "family_salary", label: "가족 급여 (월)", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "사업소득 세금(전체) vs 사업소득세금(급여차감) + 가족 소득세 합계 비교",
    urgency: "year_round", difficulty: "medium",
    steps: ["가족의 실제 업무 내용 정의", "적정 급여 수준 결정 (유사 직종 참고)", "근로계약서 작성, 4대보험 가입", "급여 지급 및 원천징수"],
    contentHook: { title: "부부 사업, 급여 나누면 세금 수백만원 절약!", hook: "연소득 1억 → 5천만원씩 나누면 세금 700만원 차이!", targetKeyword: "가족급여 소득분산 절세", estimatedViews: "high" },
    warnings: ["실제 근무 없는 허위 급여 지급 시 세무조사 대상", "과도한 급여는 부당행위 부인 가능"],
  },
]
