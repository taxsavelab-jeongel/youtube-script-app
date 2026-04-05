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
    warnings: [
      "부양가족 소득이 100만원을 초과하면 공제 불가 - 연중 소득 변동 확인 필수",
      "동일 부양가족을 다른 근로자가 이미 공제받는 경우 중복 공제 불가",
      "형제자매 공제: 20세 이하 또는 60세 이상 요건 별도 확인 필요",
    ],
    practicalCases: [
      {
        title: "부양가족 3명 직장인 공제",
        situation: "배우자(무소득) + 부모님 65세·70세 모두 부양, 총급여 6,000만원",
        calculation: "본인(기본) + 배우자 + 부모 2명 = 4인 × 150만원 = 600만원 소득공제",
        result: "세율 24% 기준 약 144만원 세금 절감",
        taxSaved: 1_440_000,
      },
    ],
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
    verification: {
      status: "self_checked",
      verifiedBy: "시스템 (법제처 법령 대조)",
      verifiedDate: "2026-04-03",
      notes: "소득세법 제59조의3, 2023년 세법개정 반영 (한도 900만원 확대). 현행법 기준 확인 완료.",
      nextReviewDate: "2026-07-01",
    },
    legalTexts: [
      {
        lawName: "소득세법",
        articleNumber: "제59조의3",
        articleTitle: "연금계좌세액공제",
        fullText: "① 종합소득이 있는 거주자가 연금계좌에 납입한 금액 중 다음 각 호의 구분에 따른 금액을 해당 과세기간의 종합소득산출세액에서 공제한다.",
        keyProvisions: [
          "연금저축 납입한도: 연 600만원 (제1항 제1호)",
          "연금저축+IRP 합산한도: 연 900만원 (제1항 제2호, 2023년 개정)",
          "총급여 5,500만원(종합소득 4,500만원) 이하: 16.5% 공제 (제1항 후단)",
          "총급여 5,500만원 초과: 13.2% 공제 (제1항 후단)",
          "50세 이상 추가한도 규정 삭제 (2023년 개정으로 일괄 900만원)",
        ],
        effectiveDate: "2023-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의3",
      },
    ],
    practicalCases: [
      {
        title: "직장인 연금저축+IRP 최대 활용",
        situation: "총급여 5,000만원 직장인이 연금저축 600만원 + IRP 300만원 = 900만원 납입",
        calculation: "900만원 × 16.5% = 1,485,000원 세액공제",
        result: "연 148만 5천원 환급 (월 약 12만원 실질 수익)",
        taxSaved: 1_485_000,
      },
      {
        title: "고소득 직장인 활용",
        situation: "총급여 8,000만원 직장인이 연금저축 600만원 + IRP 300만원 = 900만원 납입",
        calculation: "900만원 × 13.2% = 1,188,000원 세액공제",
        result: "연 118만 8천원 환급",
        taxSaved: 1_188_000,
      },
    ],
    faqs: [
      { question: "연금저축만 900만원 넣어도 되나요?", answer: "아닙니다. 연금저축 단독 한도는 600만원입니다. 900만원 한도를 채우려면 IRP에 추가 300만원을 납입해야 합니다.", legalBasis: "소득세법 제59조의3 제1항" },
      { question: "55세 이전에 해지하면 어떻게 되나요?", answer: "기타소득세 16.5%를 납부해야 합니다. 세액공제 받은 금액을 사실상 반환하는 셈이므로 장기 유지가 핵심입니다.", legalBasis: "소득세법 제22조의3" },
    ],
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
    fullDescription: "근로소득자의 신용카드·체크카드·현금영수증 사용금액이 총급여의 25%를 초과하는 경우, 초과분에 대해 소득공제를 받을 수 있습니다. 공제율은 신용카드 15%, 체크카드/현금영수증 30%, 전통시장/대중교통 40%. 2026년부터 기본한도에 자녀당 50만원(총급여 7천만원 초과 시 25만원) 추가, 최대 100만원까지 상향.",
    tags: ["신용카드", "체크카드", "현금영수증", "소득공제", "연말정산"],
    impactLevel: "medium",
    maxDeductionAmount: 3_000_000, // 총급여 7천만 이하 기본한도 (2026년부터 자녀당 추가)
    applicableRate: "신용카드 15%, 체크카드 30%, 전통시장/대중교통 40% (한도: 250만~300만+자녀당50만)",
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
    calculationFormula: "총사용액 - (총급여×25%) = 초과분 → 결제수단별 공제율 적용. 한도: 기본 250만(7천만↓ 300만) + 자녀당 50만(7천만↑ 25만), 최대 추가 100만",
    urgency: "year_end",
    difficulty: "easy",
    steps: ["연간 카드 사용 내역 확인", "체크카드/현금영수증 비율 조정", "전통시장·대중교통 적극 활용", "연말정산 간소화 자료 확인"],
    contentHook: {
      title: "카드 공제의 함정! 신용카드 vs 체크카드 황금비율",
      hook: "총급여 25%까지는 신용카드, 이후는 체크카드가 유리!",
      targetKeyword: "신용카드 소득공제 2026",
      estimatedViews: "high",
    },
    warnings: [
      "총급여의 25%까지는 어떤 카드를 써도 공제 불가 — 이 구간은 신용카드로 포인트 적립이 유리",
      "상품권·자동차 구입·보험료·교육비 등 일부 지출은 공제 대상 제외",
      "가족 카드 합산 여부 확인 필요 — 배우자 카드 사용액은 배우자 연말정산에 귀속",
    ],
    practicalCases: [
      {
        title: "총급여 5,000만원 직장인 카드 공제 최적화",
        situation: "총급여 5,000만원, 연간 카드 사용 3,000만원(신용카드 2,000만원 + 체크카드 1,000만원)",
        calculation: "공제기준액: 5,000만×25%=1,250만원. 초과분: 신용카드 750만×15%=112.5만 + 체크카드 1,000만×30%=300만. 합계 412.5만원(한도 250만)",
        result: "한도 적용 후 250만원 소득공제, 세율 24% 시 약 60만원 절감",
        taxSaved: 600_000,
      },
    ],
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
    calculationFormula: "대출기간·금리유형별 한도: 거치식 300만원 / 비거치 기타 600만원 / 비거치 고정금리(15~29년) 1,000만원 / 비거치 고정금리(30년↑) 1,800만원",
    urgency: "year_end",
    difficulty: "medium",
    steps: ["대출 조건 확인 (기간, 금리 유형)", "은행에서 이자상환증명서 발급", "연말정산 시 제출"],
    contentHook: {
      title: "주택대출 이자, 연 1,800만원까지 세금에서 빠진다고?",
      hook: "30년 고정금리 대출이면 공제 한도가 2배!",
      targetKeyword: "주택담보대출 이자 소득공제",
      estimatedViews: "high",
    },
    warnings: [
      "대출 취득 당시 기준시가 5억원 이하 요건 — 취득 이후 가격 상승은 무관",
      "변동금리 대출은 공제 한도가 300~600만원으로 고정금리보다 낮음",
      "2주택 이상 보유 시 공제 불가, 주택 추가 취득 시 즉시 요건 탈락",
    ],
    practicalCases: [
      {
        title: "30년 고정금리 대출 보유 직장인",
        situation: "기준시가 4억 주택 취득, 30년 비거치 고정금리 대출, 연 이자상환액 2,000만원",
        calculation: "한도 1,800만원 × (세율 15~24%) = 최대 270만~432만원 세금 절감",
        result: "소득공제 1,800만원 적용, 세율 24% 기준 432만원 절감",
        taxSaved: 4_320_000,
      },
    ],
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
    warnings: [
      "임대차계약서상 세입자 명의와 주민등록 세대주가 일치해야 공제 가능",
      "현금 지급 시 계좌이체 증빙 없으면 공제 불가 — 반드시 계좌이체로 납부",
      "확정일자 미신청 시도 공제는 가능하나, 전입신고는 필수",
    ],
    practicalCases: [
      {
        title: "월세 70만원 납부 직장인",
        situation: "총급여 4,500만원, 무주택 세대주, 전용 60㎡ 주택 월세 70만원 납부",
        calculation: "연간 월세 840만원 × 17% = 142만 8천원 세액공제",
        result: "연말정산 시 142만 8천원 환급",
        taxSaved: 1_428_000,
      },
    ],
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
    contentHook: {
      title: "청약통장 그냥 넣으면 손해! 세금 18만원 돌려받는 법",
      hook: "월 25만원씩 넣으면 청약 당첨 기회 + 연 18만원 세금 환급 두 마리 토끼!",
      targetKeyword: "주택청약종합저축 소득공제 2026",
      estimatedViews: "medium",
    },
    warnings: [
      "주택 취득 시 소득공제 이력이 있으면 추징 가능 — 해지·주택 당첨 시 소득공제 반환",
      "세대주 요건 필수 — 세대원(자녀·배우자)은 공제 불가",
      "총급여 7,000만원 초과자는 공제 불가",
    ],
    practicalCases: [
      {
        title: "무주택 직장인 청약저축 최대 활용",
        situation: "총급여 5,000만원, 월 25만원 × 12개월 = 연 300만원 납입",
        calculation: "300만원 × 40% = 120만원 소득공제. 세율 15% 기준 18만원 절감",
        result: "소득공제 120만원, 세금 약 18만원 절감",
        taxSaved: 180_000,
      },
    ],
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
    warnings: [
      "생애 1회 한정 — 이미 2024~2025년에 혼인신고한 경우 한 번만 적용",
      "2026년 12월 31일까지 혼인신고 완료해야 함 — 내년으로 미루면 혜택 소멸",
      "부부 각각 별도로 신청 필요 — 자동 반영되지 않으므로 연말정산 시 직접 체크",
    ],
    practicalCases: [
      {
        title: "2026년 결혼 신혼부부",
        situation: "2026년 5월 혼인신고, 부부 모두 근로소득자",
        calculation: "남편 50만원 + 아내 50만원 = 100만원 세액공제",
        result: "부부 합산 100만원 세금 환급",
        taxSaved: 1_000_000,
      },
    ],
  },
]
