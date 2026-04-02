// ============================================================
// 08. 상속세·증여세 절세 항목 (가업승계 포함)
// ============================================================

import type { TaxSavingItem } from "@/types/tax-database"

export const inheritanceGift: TaxSavingItem[] = [
  // ── 가업상속공제 ──────────────────────────────────────────
  {
    id: "inheritance_business_deduction",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "inheritance",
    subcategory: "가업승계",
    savingType: "deduction",
    targetAudience: ["heir", "business_owner"],
    name: "가업상속공제",
    shortDescription: "10년↑ 경영 중소·중견기업 최대 600억 상속공제",
    fullDescription: "피상속인이 10년 이상 경영한 중소기업 또는 매출 5,000억 미만 중견기업을 상속인에게 승계할 때, 가업 영위 기간에 따라 최대 600억원까지 상속재산에서 공제합니다. 사후관리 5년간 업종·지분·고용·자산 유지 필수.",
    tags: ["가업승계", "상속공제", "중소기업", "중견기업", "사후관리"],
    impactLevel: "very_high",
    maxDeductionAmount: 60_000_000_000, // 600억
    applicableRate: "10년 300억 / 20년 400억 / 30년 600억",
    requirements: [
      { id: "req_1", description: "피상속인 10년 이상 계속 경영", type: "period", value: "10년 이상", critical: true },
      { id: "req_2", description: "중소기업 또는 매출 5천억 미만 중견기업", type: "business_type", value: "중소기업 또는 중견기업(매출 5천억 미만)", critical: true },
      { id: "req_3", description: "상속인 2년 이상 가업 종사", type: "period", value: "상속개시 전 2년 이상", critical: true },
      { id: "req_4", description: "피상속인 대표이사 재직", type: "employment", critical: true },
      { id: "req_5", description: "상속인 상속세 신고기한 내 임원 취임, 상속개시 후 2년 내 대표이사 취임", type: "employment", critical: true },
    ],
    exclusions: [
      "상속개시일 속하는 사업연도 직전 3년 평균 매출 5천억 이상 중견기업",
      "탈세·회계부정으로 형사처벌받은 경우",
    ],
    conflicts: ["gift_business_succession_special"], // 증여세 과세특례와 일부 중복 제한
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제18조의2", url: "https://www.law.go.kr", effectiveDate: "2026-01-01" },
    ],
    postManagement: {
      period: 5,
      requirements: [
        { item: "업종 유지", standard: "표준산업분류 중분류 내 동일 업종, 1년 이상 휴·폐업 금지", penalty: "공제 전액 추징" },
        { item: "지분 유지", standard: "상속받은 지분 유지", penalty: "처분 비율만큼 추징" },
        { item: "고용 유지", standard: "5년 통산 정규직 수·총급여액 90% 이상 유지", penalty: "미달 비율만큼 추징" },
        { item: "자산 유지", standard: "가업용 자산 40% 이상 처분 금지", penalty: "처분 비율만큼 추징" },
        { item: "대표이사 유지", standard: "상속인이 대표이사 유지", penalty: "공제 전액 추징" },
      ],
    },
    calculationParams: [
      { id: "business_years", label: "피상속인 경영 기간", type: "number", unit: "년", min: 10, required: true },
      { id: "business_value", label: "가업 자산 가치", type: "number", unit: "원", required: true },
      { id: "company_type", label: "기업 유형", type: "select", options: [
        { label: "중소기업", value: "sme" },
        { label: "중견기업 (매출 5천억 미만)", value: "mid" },
      ], required: true },
    ],
    calculationFormula: "공제한도: 10년↑ 300억, 20년↑ 400억, 30년↑ 600억. 공제액 = min(가업자산가치, 한도)",
    schedule: { name: "상속세 신고", deadline: "상속개시일로부터 6개월", singoType: "상속세 신고", singoMethod: "홈택스 또는 세무서 방문" },
    urgency: "event_based",
    difficulty: "expert",
    steps: [
      "가업 영위 기간 확인 (사업자등록증 기준)",
      "피상속인 대표이사 재직 기간 확인",
      "상속인 가업 종사 기간 확인 (2년 이상)",
      "가업 자산 가치 평가 (감정평가)",
      "상속세 신고 시 가업상속공제 신청",
      "사후관리 5년 계획 수립",
    ],
    requiredDocuments: [
      "사업자등록증 사본", "법인등기부등본", "주주명부",
      "재무제표 (최근 10년)", "근로자 명부", "감정평가서",
      "상속인 재직증명서", "가업상속공제 신청서",
    ],
    contentHook: {
      title: "가업승계, 세금 600억 아끼는 법 (2026 최신)",
      hook: "30년 경영한 회사, 상속세 0원 가능합니다!",
      targetKeyword: "가업상속공제 2026",
      estimatedViews: "high",
    },
    warnings: [
      "사후관리 5년 중 요건 위반 시 공제 전액 추징 가능",
      "상속인이 대표이사직을 사임하면 즉시 추징",
      "부동산 임대업은 가업에 해당하지 않을 수 있음",
    ],
    commonMistakes: [
      "상속인의 가업 종사 기간(2년)을 미리 준비하지 않음",
      "사후관리 기간 중 업종 변경하여 추징당함",
      "가업용 자산과 비가업용 자산 구분을 잘못함",
      "구법(7년) 기준으로 사후관리 계획을 수립함 — 현행 5년 기준 적용 필요",
    ],
    relatedItems: ["gift_business_succession_special", "gift_startup_fund"],
  },

  // ── 가업승계 증여세 과세특례 ──────────────────────────────
  {
    id: "gift_business_succession_special",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "gift",
    subcategory: "가업승계",
    savingType: "special_rate",
    targetAudience: ["heir", "business_owner"],
    name: "가업승계 증여세 과세특례",
    shortDescription: "생전 가업주식 증여 시 10억 공제 후 10~20% 특례세율",
    fullDescription: "18세 이상 거주자가 60세 이상 부모로부터 10년 이상 경영한 가업의 주식을 증여받을 때, 10억원 공제 후 120억까지 10%, 120억 초과분 20%의 특례세율을 적용합니다. 일반 증여세율(10~50%)보다 크게 유리. 한도는 경영기간에 따라 최대 600억원.",
    tags: ["가업승계", "증여세", "과세특례", "생전승계", "주식증여"],
    impactLevel: "very_high",
    maxDeductionAmount: 60_000_000_000,
    applicableRate: "120억 이하 10% / 120억 초과 20%",
    requirements: [
      { id: "req_1", description: "증여자(부모) 60세 이상", type: "age", value: "60세 이상", critical: true },
      { id: "req_2", description: "증여자 10년 이상 계속 경영", type: "period", value: "10년 이상", critical: true },
      { id: "req_3", description: "수증자 18세 이상 거주자", type: "age", value: "18세 이상", critical: true },
      { id: "req_4", description: "증여세 신고기한까지 가업 종사", type: "employment", critical: true },
      { id: "req_5", description: "증여일부터 3년 내 대표이사 취임", type: "period", value: "3년 이내", critical: true },
      { id: "req_6", description: "대표이사 취임 후 5년간 유지", type: "period", value: "5년", critical: true },
    ],
    conflicts: ["gift_startup_fund"], // 창업자금 특례와 중복 불가
    legalBasis: [
      { law: "조세특례제한법", article: "제30조의6", url: "https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=1001023551&lsId=001584&chrClsCd=010202", effectiveDate: "2026-01-01" },
    ],
    postManagement: {
      period: 5,
      requirements: [
        { item: "가업 유지", standard: "증여받은 가업 계속 영위, 1년 이상 휴·폐업 금지", penalty: "특례세율 취소, 일반세율로 재계산 추징" },
        { item: "지분 유지", standard: "증여받은 지분 유지", penalty: "처분 비율만큼 추징" },
        { item: "고용 유지", standard: "5년 통산 정규직 수·총급여액 90% 이상", penalty: "미달 비율만큼 추징" },
        { item: "대표이사", standard: "3년 내 취임, 취임 후 5년 유지", penalty: "특례 전액 취소" },
      ],
    },
    calculationParams: [
      { id: "gift_value", label: "증여 주식 가치", type: "number", unit: "원", required: true },
      { id: "parent_business_years", label: "부모 경영 기간", type: "number", unit: "년", min: 10, required: true },
      { id: "parent_age", label: "증여자(부모) 나이", type: "number", unit: "세", min: 60, required: true },
    ],
    calculationFormula: "과세표준 = 증여가액 - 10억. 120억 이하: 10%, 120억 초과: 20%. 일반 증여세와 비교하여 절세액 산출.",
    urgency: "long_term",
    difficulty: "expert",
    steps: [
      "부모 경영기간·나이 요건 확인",
      "가업 주식 가치 평가",
      "일반 증여 vs 과세특례 세액 비교 시뮬레이션",
      "증여세 과세특례 신청서 작성",
      "증여세 신고기한 내 신청",
      "3년 내 대표이사 취임 계획 수립",
      "5년 사후관리 체크리스트 수립",
    ],
    contentHook: {
      title: "생전 증여 vs 사후 상속, 100억 회사의 최적 선택은?",
      hook: "상속 대기하면 50%세율, 생전 증여하면 10%! 사후관리도 5년으로 단축!",
      targetKeyword: "가업승계 증여세 과세특례",
      estimatedViews: "high",
    },
    warnings: [
      "창업자금 증여세 과세특례와 중복 적용 불가",
      "증여세 신고기한까지 특례 신청하지 않으면 혜택 소멸",
      "사후관리(5년) 위반 시 일반세율로 재계산되어 가산세까지 부담",
    ],
    relatedItems: ["inheritance_business_deduction", "gift_startup_fund", "gift_family_exemption"],
  },

  // ── 창업자금 증여세 과세특례 ──────────────────────────────
  {
    id: "gift_startup_fund",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "gift",
    subcategory: "창업자금",
    savingType: "special_rate",
    targetAudience: ["youth", "heir"],
    name: "창업자금 증여세 과세특례",
    shortDescription: "창업 목적 증여 시 5억 공제 후 10% 특례세율 (한도 50~100억)",
    fullDescription: "18세 이상 거주자가 60세 이상 부모로부터 중소기업 창업 목적으로 토지·건물 외 재산을 증여받을 때, 5억원 공제 후 10% 특례세율 적용. 한도 50억원 (10명 이상 신규고용 시 100억원).",
    tags: ["창업자금", "증여세", "과세특례", "중소기업", "스타트업"],
    impactLevel: "high",
    maxDeductionAmount: 10_000_000_000,
    applicableRate: "10% (5억 공제 후)",
    requirements: [
      { id: "req_1", description: "수증자 18세 이상", type: "age", value: "18세 이상", critical: true },
      { id: "req_2", description: "증여자(부모) 60세 이상", type: "age", value: "60세 이상", critical: true },
      { id: "req_3", description: "중소기업 창업 목적", type: "business_type", critical: true },
      { id: "req_4", description: "4년 내 창업자금 전액 사용", type: "period", value: "4년", critical: true },
      { id: "req_5", description: "토지·건물 제외한 재산", type: "asset", critical: true },
    ],
    conflicts: ["gift_business_succession_special"],
    legalBasis: [
      { law: "조세특례제한법", article: "제30조의5", url: "https://www.law.go.kr/LSW//lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900035485&lsId=001584", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "gift_amount", label: "증여 금액", type: "number", unit: "원", required: true },
      { id: "new_employees", label: "신규 고용 예정 인원", type: "number", unit: "명", required: false },
    ],
    calculationFormula: "세액 = (min(증여액, 한도) - 5억) × 10%. 한도: 기본 50억, 10명↑ 고용 시 100억",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "창업 업종 확인 (중소기업 해당 업종)",
      "부모로부터 현금/금융자산 증여",
      "증여세 과세특례 신청 (신고기한 내)",
      "4년 내 전액 창업자금으로 사용",
      "사용 내역 증빙 보관",
    ],
    contentHook: {
      title: "부모 돈으로 창업하면 세금 10%만! 100억까지 가능",
      hook: "부모님께 50억 받아 창업하면 세금 4.5억이면 끝!",
      targetKeyword: "창업자금 증여세 과세특례",
      estimatedViews: "medium",
    },
    relatedItems: ["gift_business_succession_special"],
  },

  // ── 증여 기본공제 ─────────────────────────────────────────
  {
    id: "gift_family_exemption",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "gift",
    subcategory: "증여공제",
    savingType: "deduction",
    targetAudience: ["all"],
    name: "증여재산공제 (10년 합산)",
    shortDescription: "배우자 6억, 직계존비속 5천만원 (미성년 2천만원) 공제",
    fullDescription: "10년간 합산하여 배우자 6억원, 직계존비속 5천만원(수증자 미성년 시 2천만원), 기타 친족 1천만원 공제. 혼인·출산 시 추가 1.5억 공제 (2024년~).",
    tags: ["증여공제", "배우자", "자녀", "증여세", "10년합산"],
    impactLevel: "high",
    maxDeductionAmount: 600_000_000,
    applicableRate: "배우자 6억 / 성년자녀 5천만 / 미성년자녀 2천만",
    requirements: [
      { id: "req_1", description: "10년 내 증여 합산", type: "period", value: "10년 단위", critical: true },
    ],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제53조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "relationship", label: "증여자와의 관계", type: "select", options: [
        { label: "배우자", value: "spouse" },
        { label: "직계존비속 (성년)", value: "lineal_adult" },
        { label: "직계존비속 (미성년)", value: "lineal_minor" },
        { label: "기타 친족", value: "other_relative" },
      ], required: true },
      { id: "gift_amount", label: "증여 금액", type: "number", unit: "원", required: true },
      { id: "prior_gifts_10yr", label: "최근 10년 내 동일인 증여 합계", type: "number", unit: "원", defaultValue: 0, required: false },
    ],
    calculationFormula: "과세표준 = 증여가액 - 공제(배우자6억/성년5천만/미성년2천만) - 기공제분",
    urgency: "long_term",
    difficulty: "medium",
    steps: [
      "10년 내 기존 증여 이력 확인",
      "공제 한도 내 증여 계획 수립",
      "증여 후 3개월 내 증여세 신고",
    ],
    contentHook: {
      title: "증여세 0원으로 자녀에게 재산 물려주는 타임라인",
      hook: "10년 단위 5천만원씩, 30년이면 1.5억 무세!",
      targetKeyword: "증여세 면제 한도 2026",
      estimatedViews: "high",
    },
  },

  // ── 혼인·출산 증여공제 ────────────────────────────────────
  {
    id: "gift_marriage_birth",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "gift",
    subcategory: "혼인/출산",
    savingType: "deduction",
    targetAudience: ["newlywed", "parent"],
    name: "혼인·출산 증여재산공제",
    shortDescription: "혼인·출산 시 직계존속으로부터 추가 1.5억 공제",
    fullDescription: "2024년 1월 1일 이후 혼인신고 또는 자녀 출산(입양 포함) 시 직계존속으로부터 증여받는 재산에 대해 기존 5천만원과 별도로 추가 1억원 공제. 양가 합산 최대 1.5억원 추가 공제 가능 (총 2억원).",
    tags: ["혼인", "출산", "증여공제", "결혼자금"],
    impactLevel: "medium",
    maxDeductionAmount: 150_000_000,
    applicableRate: "추가 1억 (양가 합산 1.5억)",
    requirements: [
      { id: "req_1", description: "혼인신고 전후 2년 이내 증여", type: "period", value: "혼인신고 전후 2년", critical: true },
      { id: "req_2", description: "직계존속(부모, 조부모)으로부터 증여", type: "family", critical: true },
    ],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제53조의2", effectiveDate: "2024-01-01" }],
    calculationParams: [
      { id: "gift_amount", label: "증여 금액", type: "number", unit: "원", required: true },
      { id: "event_type", label: "사유", type: "select", options: [
        { label: "혼인", value: "marriage" },
        { label: "출산", value: "birth" },
      ], required: true },
    ],
    calculationFormula: "추가 공제 1억 (기본 5천만 별도). 과세표준 = 증여액 - 5천만 - 1억",
    urgency: "event_based",
    difficulty: "easy",
    steps: [
      "혼인신고 또는 출산 시점 확인",
      "전후 2년 이내에 부모로부터 증여 실행",
      "증여세 신고 시 추가 공제 적용",
    ],
    contentHook: {
      title: "결혼하면 부모님께 2억까지 무세 증여 받을 수 있다!",
      hook: "양가 합산 최대 3억까지 세금 없이 결혼자금 마련!",
      targetKeyword: "혼인 증여공제 2026",
      estimatedViews: "high",
    },
  },

  // ── 상속세 자녀공제 확대 ──────────────────────────────────
  {
    id: "inheritance_child_deduction",
    version: "2026.1",
    lastUpdated: "2026-01-01",
    category: "inheritance",
    subcategory: "인적공제",
    savingType: "deduction",
    targetAudience: ["heir"],
    name: "상속세 자녀공제 확대 (2026)",
    shortDescription: "자녀 1인당 5억원 공제 (종전 5천만원의 10배)",
    fullDescription: "2025년 세법 개정으로 상속세 자녀공제가 1인당 5천만원에서 5억원으로 10배 확대. 자녀 3명이면 15억원 공제 가능. 일괄공제(5억)와 비교하여 유리한 쪽 선택.",
    tags: ["상속세", "자녀공제", "인적공제", "상속공제"],
    impactLevel: "very_high",
    maxDeductionAmount: 500_000_000, // 1인당
    applicableRate: "자녀 1인당 5억원",
    requirements: [
      { id: "req_1", description: "상속인인 자녀 존재", type: "family", critical: true },
    ],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제20조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "children_count", label: "상속인 자녀 수", type: "number", unit: "명", min: 1, required: true },
      { id: "estate_value", label: "총 상속재산 가액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "자녀공제 = 자녀수 × 5억. 기초공제(2억)+자녀공제 vs 일괄공제(5억) 중 큰 것 선택.",
    urgency: "event_based",
    difficulty: "medium",
    steps: [
      "상속인 구성 확인",
      "기초공제+인적공제 vs 일괄공제 비교",
      "유리한 공제 방식 선택",
    ],
    contentHook: {
      title: "2026 상속세 혁명! 자녀공제 10배 확대, 우리 집은?",
      hook: "자녀 3명이면 15억까지 상속세 0원!",
      targetKeyword: "상속세 자녀공제 5억 2026",
      estimatedViews: "high",
    },
  },
]
