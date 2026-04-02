// ============================================================
// 01. 소득세 - 소득공제 항목 (연말정산 포함)
// ============================================================

import type { TaxSavingItem } from "@/types/tax-database"

export const incomeDeductions: TaxSavingItem[] = [
  // ── 인적공제 ──────────────────────────────────────────────
  {
    id: "income_basic_personal",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "인적공제",
    savingType: "deduction",
    targetAudience: ["employee", "freelancer", "sole_proprietor"],
    name: "기본공제 (인적공제)",
    shortDescription: "본인·배우자·부양가족 1인당 150만원 소득공제",
    fullDescription: "근로자 본인을 포함하여 배우자, 직계존비속, 형제자매 등 부양가족 1인당 연간 150만원을 종합소득금액에서 공제합니다. 부양가족의 연간 소득금액이 100만원 이하(근로소득만 있는 경우 총급여 500만원 이하)여야 합니다.",
    tags: ["인적공제", "부양가족", "기본공제", "연말정산"],
    impactLevel: "medium",
    maxDeductionAmount: 1_500_000, // 1인당
    applicableRate: "1인당 150만원",
    requirements: [
      { id: "req_1", description: "부양가족 연소득 100만원 이하", type: "income_limit", value: "연소득 100만원 이하 (근로소득만 시 총급여 500만원 이하)", critical: true },
      { id: "req_2", description: "직계존속 60세 이상, 직계비속 20세 이하", type: "age", value: "존속 60세↑, 비속 20세↓", critical: true },
    ],
    exclusions: ["다른 근로자의 부양가족으로 이미 공제받은 경우"],
    legalBasis: [{ law: "소득세법", article: "제50조", url: "https://www.law.go.kr", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "dependents", label: "부양가족 수", type: "number", unit: "명", min: 0, max: 20, required: true },
    ],
    calculationFormula: "공제액 = 부양가족 수 × 1,500,000원",
    urgency: "year_end",
    difficulty: "easy",
    steps: ["부양가족 소득 확인", "주민등록등본 준비", "연말정산 간소화에서 자료 수집", "공제 신청서 제출"],
    contentHook: {
      title: "부양가족 공제, 이거 모르면 매년 손해봅니다",
      hook: "부모님 소득이 100만원 넘으면 공제 안 되는 거 아셨나요?",
      targetKeyword: "부양가족 공제 조건",
      estimatedViews: "high",
    },
  },

  // ── 연금/저축 공제 ────────────────────────────────────────
  {
    id: "income_pension_savings",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "연금저축",
    savingType: "credit", // 세액공제이지만 구조상 여기 포함
    targetAudience: ["employee", "freelancer", "sole_proprietor", "all"],
    name: "연금계좌 세액공제 (연금저축 + IRP)",
    shortDescription: "연간 최대 900만원 납입, 세액공제 13.2~16.5%",
    fullDescription: "연금저축(최대 600만원)과 IRP(합산 최대 900만원)에 납입한 금액에 대해 세액공제를 받을 수 있습니다. 총급여 5,500만원 이하(종합소득 4,500만원 이하)는 16.5%, 초과 시 13.2% 공제됩니다. 과세이연 효과도 있어 복리 운용에 유리합니다.",
    tags: ["연금저축", "IRP", "세액공제", "노후준비", "과세이연"],
    impactLevel: "high",
    maxSavingAmount: 1_485_000, // 900만 × 16.5%
    maxDeductionAmount: 9_000_000,
    applicableRate: "13.2% 또는 16.5%",
    requirements: [
      { id: "req_1", description: "연금저축 또는 IRP 가입", type: "other", critical: true },
      { id: "req_2", description: "연간 납입 한도 900만원", type: "income_limit", value: "연금저축 600만 + IRP 합산 900만", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제59조의3", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "pension_amount", label: "연금저축 연 납입액", type: "number", unit: "원", max: 6_000_000, required: true },
      { id: "irp_amount", label: "IRP 연 납입액", type: "number", unit: "원", max: 9_000_000, required: true },
      { id: "total_salary", label: "총급여", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "공제액 = min(연금저축+IRP, 900만) × 공제율(13.2% 또는 16.5%)",
    urgency: "year_round",
    difficulty: "easy",
    steps: ["연금저축/IRP 계좌 개설", "매월 또는 연말에 납입", "연말정산 시 자동 반영"],
    contentHook: {
      title: "연금저축 vs IRP, 매년 148만원 돌려받는 방법",
      hook: "월 75만원만 넣으면 연 148만원 세금 환급!",
      targetKeyword: "연금저축 세액공제 2026",
      estimatedViews: "high",
    },
  },

  // ── 신용카드 공제 ─────────────────────────────────────────
  {
    id: "income_card_spending",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "신용카드 등 사용금액",
    savingType: "deduction",
    targetAudience: ["employee"],
    name: "신용카드 등 사용금액 소득공제",
    shortDescription: "총급여 25% 초과 사용분 15~40% 소득공제",
    fullDescription: "근로소득자의 신용카드·체크카드·현금영수증 사용금액이 총급여의 25%를 초과하는 경우, 초과분에 대해 소득공제를 받을 수 있습니다. 공제율은 신용카드 15%, 체크카드/현금영수증 30%, 전통시장/대중교통 40%입니다.",
    tags: ["신용카드", "체크카드", "현금영수증", "소득공제", "연말정산"],
    impactLevel: "medium",
    maxDeductionAmount: 3_000_000, // 총급여 7천만 이하 기준
    applicableRate: "신용카드 15%, 체크카드 30%, 전통시장/대중교통 40%",
    requirements: [
      { id: "req_1", description: "총급여 25% 초과 사용", type: "income_limit", value: "총급여의 25% 초과분", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제126조의2", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "total_salary", label: "총급여", type: "number", unit: "원", required: true },
      { id: "credit_card", label: "신용카드 사용액", type: "number", unit: "원", required: true },
      { id: "debit_card", label: "체크카드/현금영수증 사용액", type: "number", unit: "원", required: true },
      { id: "traditional_market", label: "전통시장 사용액", type: "number", unit: "원", required: false },
      { id: "public_transport", label: "대중교통 사용액", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "총사용액 - (총급여×25%) = 초과분 → 결제수단별 공제율 적용 (한도 300만원)",
    urgency: "year_end",
    difficulty: "easy",
    steps: ["연간 카드 사용 내역 확인", "체크카드/현금영수증 비율 조정", "전통시장·대중교통 적극 활용", "연말정산 간소화 자료 확인"],
    contentHook: {
      title: "카드 공제의 함정! 신용카드 vs 체크카드 황금비율",
      hook: "총급여 25%까지는 신용카드, 이후는 체크카드가 유리!",
      targetKeyword: "신용카드 소득공제 2026",
      estimatedViews: "high",
    },
  },

  // ── 주택자금 공제 ─────────────────────────────────────────
  {
    id: "income_housing_loan",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "주택자금",
    savingType: "deduction",
    targetAudience: ["employee"],
    name: "주택담보대출 이자 소득공제",
    shortDescription: "장기주택저당차입금 이자 최대 1,800만원 공제",
    fullDescription: "무주택 또는 1주택 세대주가 취득 당시 기준시가 5억원 이하 주택에 대한 장기주택저당차입금 이자상환액을 소득공제 받을 수 있습니다. 상환기간·방식에 따라 300만~1,800만원 한도.",
    tags: ["주택담보대출", "이자공제", "주택자금", "장기주택저당차입금"],
    impactLevel: "high",
    maxDeductionAmount: 18_000_000,
    requirements: [
      { id: "req_1", description: "무주택 또는 1주택 세대주", type: "asset", critical: true },
      { id: "req_2", description: "취득 당시 기준시가 5억원 이하", type: "asset", value: "기준시가 5억 이하", critical: true },
      { id: "req_3", description: "상환기간 15년 이상", type: "period", value: "15년 이상", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제52조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "annual_interest", label: "연간 이자 상환액", type: "number", unit: "원", required: true },
      { id: "loan_period", label: "대출 기간", type: "number", unit: "년", required: true },
      { id: "repayment_type", label: "상환 방식", type: "select", options: [
        { label: "비거치 고정금리 원리금균등", value: "fixed_equal" },
        { label: "비거치 기타", value: "non_grace" },
        { label: "거치식", value: "grace" },
      ], required: true },
    ],
    urgency: "year_end",
    difficulty: "medium",
    steps: ["대출 조건 확인 (기간, 금리 유형)", "은행에서 이자상환증명서 발급", "연말정산 시 제출"],
    contentHook: {
      title: "주택대출 이자, 연 1,800만원까지 세금에서 빠진다고?",
      hook: "30년 고정금리 대출이면 공제 한도가 2배!",
      targetKeyword: "주택담보대출 이자 소득공제",
      estimatedViews: "high",
    },
  },

  // ── 월세 세액공제 ─────────────────────────────────────────
  {
    id: "income_monthly_rent",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "월세",
    savingType: "credit",
    targetAudience: ["employee", "freelancer"],
    name: "월세 세액공제",
    shortDescription: "연 월세 1,000만원 한도, 15~17% 세액공제",
    fullDescription: "총급여 8,000만원(종합소득 7,000만원) 이하 무주택 세대주가 국민주택규모(85㎡) 이하 또는 기준시가 4억원 이하 주택의 월세를 납부한 경우 세액공제를 받을 수 있습니다. 총급여 5,500만원 이하 17%, 초과 15% 공제.",
    tags: ["월세", "세액공제", "무주택", "임차인"],
    impactLevel: "medium",
    maxSavingAmount: 1_700_000, // 1,000만 × 17%
    maxDeductionAmount: 10_000_000,
    applicableRate: "15% 또는 17%",
    requirements: [
      { id: "req_1", description: "총급여 8,000만원 이하", type: "income_limit", value: "총급여 8,000만원 이하", critical: true },
      { id: "req_2", description: "무주택 세대주(세대원 포함)", type: "asset", critical: true },
      { id: "req_3", description: "국민주택규모 이하 또는 기준시가 4억 이하", type: "asset", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제95조의2", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "monthly_rent", label: "월 임차료", type: "number", unit: "원", required: true },
      { id: "total_salary", label: "총급여", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "공제액 = min(연간 월세합계, 1,000만원) × 공제율(15% 또는 17%)",
    urgency: "year_end",
    difficulty: "easy",
    steps: ["임대차계약서 준비", "월세 이체 내역 (계좌이체 증빙)", "주민등록등본 준비", "연말정산 또는 종합소득세 신고 시 제출"],
    contentHook: {
      title: "월세 살고 있다면 무조건 170만원 돌려받으세요",
      hook: "월세 83만원 내는 분, 연말에 170만원 환급 가능!",
      targetKeyword: "월세 세액공제 2026",
      estimatedViews: "high",
    },
  },

  // ── 주택청약 공제 ─────────────────────────────────────────
  {
    id: "income_housing_subscription",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "주택청약",
    savingType: "deduction",
    targetAudience: ["employee"],
    name: "주택청약종합저축 소득공제",
    shortDescription: "납입액의 40%, 연 300만원 한도 소득공제",
    fullDescription: "총급여 7,000만원 이하 무주택 세대주가 주택청약종합저축에 납입한 금액의 40%를 소득공제 받을 수 있습니다. 2026년부터 연간 납입 한도가 300만원으로 확대되어 최대 120만원 소득공제 가능.",
    tags: ["주택청약", "소득공제", "청약저축", "무주택"],
    impactLevel: "low",
    maxDeductionAmount: 1_200_000, // 300만 × 40%
    applicableRate: "납입액의 40%",
    requirements: [
      { id: "req_1", description: "총급여 7,000만원 이하 무주택 세대주", type: "income_limit", value: "총급여 7,000만원 이하", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제87조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "annual_deposit", label: "연간 납입액", type: "number", unit: "원", max: 3_000_000, required: true },
    ],
    calculationFormula: "공제액 = min(납입액, 300만원) × 40%",
    urgency: "year_round",
    difficulty: "easy",
    steps: ["주택청약종합저축 가입", "월 납입 (월 25만원 × 12개월 = 300만원)", "연말정산 간소화 자동 반영"],
  },

  // ── 혼인세액공제 (신설) ───────────────────────────────────
  {
    id: "income_marriage_credit",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "income",
    subcategory: "혼인/출산",
    savingType: "credit",
    targetAudience: ["newlywed"],
    name: "혼인 세액공제",
    shortDescription: "혼인신고 시 1인당 50만원, 부부 합산 100만원 공제",
    fullDescription: "2024~2026년 혼인신고를 한 부부에게 1인당 50만원, 부부 합산 최대 100만원의 세액공제를 제공합니다. 생애 1회 한정.",
    tags: ["혼인", "결혼", "세액공제", "신혼부부"],
    impactLevel: "low",
    maxSavingAmount: 1_000_000,
    applicableRate: "1인당 50만원",
    requirements: [
      { id: "req_1", description: "2024~2026년 혼인신고", type: "period", value: "2024.1.1~2026.12.31", critical: true },
      { id: "req_2", description: "생애 1회 한정", type: "other", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제95조의3", effectiveDate: "2024-01-01", expiryDate: "2026-12-31" }],
    calculationParams: [],
    calculationFormula: "부부 각각 50만원씩 세액공제",
    urgency: "event_based",
    difficulty: "easy",
    steps: ["혼인신고 완료", "연말정산 시 혼인신고 확인서 제출"],
    contentHook: {
      title: "결혼하면 100만원 돌려준다! 2026년 마지막 기회",
      hook: "2026년 12월 31일까지 혼인신고해야 받을 수 있는 혜택!",
      targetKeyword: "혼인 세액공제 2026",
      estimatedViews: "medium",
    },
  },
]
