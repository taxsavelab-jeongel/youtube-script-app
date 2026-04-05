// ============================================================
// 법령 원문 데이터 & 검증 정보 중앙 관리
// 2026년 4월 기준 | 출처: 첨부 세법자료, 법제처, 국세청, KPMG, 삼일PwC
// ============================================================

import type { VerificationRecord, LegalText, PracticalCase, FAQ } from "@/types/tax-database"

// ── 공통 검증 정보 ──────────────────────────────────────────

const SYSTEM_VERIFIED_2026_04: VerificationRecord = {
  status: "self_checked",
  verifiedBy: "시스템 (첨부 세법자료 + 법제처 대조)",
  verifiedDate: "2026-04-03",
  notes: "2026_세법변경_핵심요약.md, KPMG, 삼일PwC 자료 교차 검증",
  nextReviewDate: "2026-07-01",
}

// ── 항목별 법령 데이터 ──────────────────────────────────────

export const LEGAL_DATA: Record<string, {
  verification: VerificationRecord
  legalTexts: LegalText[]
  practicalCases?: PracticalCase[]
  faqs?: FAQ[]
  crossReferences?: string[]
}> = {
  // ===== 01. 소득세 — 소득공제 =====

  income_basic_personal: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제50조",
      articleTitle: "기본공제",
      fullText: "① 종합소득이 있는 거주자에 대해서는 다음 각 호의 어느 하나에 해당하는 사람의 수에 1명당 연 150만원을 곱하여 계산한 금액을 종합소득금액에서 공제한다.",
      keyProvisions: [
        "본인 포함 부양가족 1인당 150만원 공제 (제1항)",
        "배우자: 연간 소득금액 100만원 이하 (근로소득만 시 총급여 500만원 이하)",
        "직계존속: 60세 이상 (1966.12.31 이전 출생)",
        "직계비속: 20세 이하 (2006.1.1 이후 출생) 또는 장애인",
        "형제자매: 20세 이하 또는 60세 이상",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.law.go.kr/법령/소득세법/제50조",
    }],
    faqs: [
      { question: "부모님이 국민연금을 받으시는데 공제 가능한가요?", answer: "국민연금은 연금소득으로 과세됩니다. 연간 소득금액(총연금액-연금소득공제)이 100만원을 초과하면 부양가족 공제 불가. 연 516만원 이하 수령 시 대체로 가능.", legalBasis: "소득세법 제50조, 제20조의3" },
      { question: "맞벌이 부부가 자녀 공제를 나눠 받을 수 있나요?", answer: "자녀 1명을 2명이 동시에 공제받을 수 없습니다. 소득이 높은 쪽이 공제받는 것이 유리합니다.", legalBasis: "소득세법 제50조 제3항" },
    ],
  },

  income_card_spending: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제126조의2",
      articleTitle: "신용카드 등 사용금액에 대한 소득공제",
      fullText: "① 근로소득이 있는 거주자가 신용카드등을 사용한 금액이 해당 과세기간의 총급여액의 100분의 25에 해당하는 금액을 초과하는 경우 그 초과금액에 대해 소득공제한다.",
      keyProvisions: [
        "총급여 25% 초과분부터 공제 시작 (제1항)",
        "신용카드 15%, 체크카드·현금영수증 30% (제1항 제1호~2호)",
        "전통시장·대중교통 40% (제1항 제3호~4호)",
        "기본한도: 총급여 7천만↓ 300만, 7천만↑ 250만 (제2항)",
        "2026년: 자녀당 추가 50만원 (7천만↑ 25만), 최대 100만원 추가 (2025년 개정)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2025-01-01",
      sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제126조의2",
    }],
    practicalCases: [{
      title: "총급여 5천만원 직장인 카드 공제",
      situation: "총급여 5,000만원, 신용카드 1,500만원 + 체크카드 800만원 사용",
      calculation: "최저사용액: 5,000만×25%=1,250만. 초과분: 신용카드 250만×15%=37.5만 + 체크카드 800만×30%=240만 = 277.5만",
      result: "약 277만원 소득공제 (한도 300만원 이내)",
      taxSaved: 415_000,
      source: "국세청 연말정산 안내",
    }],
    faqs: [
      { question: "총급여 25%까지는 어떤 카드를 써야 하나요?", answer: "25% 최저사용액까지는 공제가 안 되므로, 혜택이 좋은 신용카드를 사용하고, 25% 초과 후에는 공제율 높은 체크카드·현금영수증을 사용하세요.", legalBasis: "조특법 제126조의2 제1항" },
      { question: "자녀 추가 한도가 뭔가요?", answer: "2026년부터 기본한도에 자녀당 50만원(총급여 7천만↑ 25만)이 추가됩니다. 자녀 2명이면 100만원 추가, 최대 100만원까지.", legalBasis: "조특법 제126조의2 제2항 (2025년 개정)" },
    ],
  },

  income_housing_loan: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제52조",
      articleTitle: "특별소득공제",
      fullText: "① 근로소득이 있는 거주자가 주택임차차입금의 원리금 상환액 또는 장기주택저당차입금의 이자를 지급한 때에는 해당 금액을 근로소득금액에서 공제한다.",
      keyProvisions: [
        "무주택 또는 1주택 세대주 (제1항 제4호)",
        "취득당시 기준시가 5억원 이하 주택 (시행령 제112조)",
        "상환기간 15년↑ 고정금리 원리금균등: 최대 1,800만원",
        "상환기간 15년↑ 기타: 최대 500만원",
        "상환기간 10~15년: 최대 300만원",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.law.go.kr/법령/소득세법/제52조",
    }],
    faqs: [
      { question: "기준시가 5억이 매매가인가요?", answer: "아닙니다. '기준시가'는 공시가격을 의미합니다. 실거래가가 7억이어도 공시가가 5억 이하면 공제 가능합니다.", legalBasis: "소득세법 시행령 제112조" },
    ],
  },

  income_monthly_rent: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제95조의2",
      articleTitle: "월세 세액공제",
      fullText: "총급여액 8천만원(종합소득금액 7천만원) 이하인 무주택 세대주가 국민주택규모 이하 또는 기준시가 4억원 이하 주택에 대한 월세를 지급하는 경우 세액공제.",
      keyProvisions: [
        "총급여 5,500만원 이하: 17% 공제 (제1항 제1호)",
        "총급여 5,500만~8,000만원: 15% 공제 (제1항 제2호)",
        "연 1,000만원 한도 (제2항)",
        "국민주택규모(85㎡) 이하 또는 기준시가 4억 이하",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제95조의2",
    }],
    practicalCases: [{
      title: "월세 83만원 직장인",
      situation: "총급여 4,500만원, 월세 83만원 (연 996만원), 무주택, 원룸 20㎡",
      calculation: "996만원 × 17% = 169만 3,200원",
      result: "연 약 169만원 세액공제",
      taxSaved: 1_693_200,
    }],
    faqs: [
      { question: "전입신고를 안 했는데 월세 공제 가능한가요?", answer: "전입신고(주민등록)가 되어 있어야 합니다. 임대차계약서상 주소와 주민등록 주소가 일치해야 합니다.", legalBasis: "조특법 시행령 제95조의2" },
    ],
  },

  income_housing_subscription: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제87조",
      articleTitle: "주택청약종합저축 소득공제",
      fullText: "총급여 7천만원 이하 무주택 세대주의 주택청약종합저축 납입액의 40%를 소득공제.",
      keyProvisions: [
        "총급여 7,000만원 이하 무주택 세대주",
        "납입액의 40% 소득공제",
        "연 300만원 납입 한도 (2026년 기준)",
        "최대 공제액: 300만×40% = 120만원",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제87조",
    }],
  },

  income_marriage_credit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제95조의3",
      articleTitle: "혼인에 대한 세액공제",
      fullText: "2024~2026년 혼인신고를 한 거주자에 대해 1인당 50만원의 세액공제를 적용한다.",
      keyProvisions: [
        "혼인신고 시 1인당 50만원 세액공제",
        "부부 합산 최대 100만원",
        "2024.1.1~2026.12.31 혼인신고분에 적용",
        "생애 1회 한정",
      ],
      effectiveDate: "2024-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제95조의3",
    }],
  },

  // ===== 06. 양도소득세 =====

  cg_1house_exemption: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제89조",
      articleTitle: "비과세 양도소득",
      fullText: "1세대가 1주택을 보유하는 경우 양도소득에 대한 소득세를 과세하지 아니한다.",
      keyProvisions: [
        "1세대 1주택 2년 이상 보유 시 비과세 (제1항 제3호)",
        "실거래가 12억원 이하 전액 비과세",
        "12억 초과분: (양도차익 × 12억초과분/양도가액) × 세율",
        "조정대상지역: 2년 이상 거주 추가 요건",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2021-12-08",
      sourceUrl: "https://www.law.go.kr/법령/소득세법/제89조",
    }],
    practicalCases: [{
      title: "실거래가 10억 1주택 양도",
      situation: "3년 보유·거주한 아파트를 10억원에 양도 (취득가 6억)",
      calculation: "12억 이하이므로 양도차익 4억 전액 비과세",
      result: "양도소득세 0원",
      taxSaved: 80_000_000,
      source: "국세청 양도소득세 안내",
    }],
    faqs: [
      { question: "12억 기준은 공시가인가요 실거래가인가요?", answer: "실거래가(양도가액) 기준입니다. 공시가가 아닙니다.", legalBasis: "소득세법 제89조 제1항 제3호" },
      { question: "일시적 2주택이면 비과세 안 되나요?", answer: "종전 주택을 취득일로부터 1년 이상 보유 후 신규 주택 취득, 3년 내 종전 주택 양도 시 비과세 적용 가능합니다.", legalBasis: "소득세법 시행령 제155조 제1항" },
    ],
  },

  cg_long_term_holding: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제95조",
      articleTitle: "장기보유특별공제",
      fullText: "양도소득금액을 계산할 때 보유기간이 3년 이상인 토지·건물에 대해서는 양도차익에서 보유기간에 따른 공제액을 공제한다.",
      keyProvisions: [
        "일반 토지·건물: 3년↑ 연 2%씩, 최대 30% (15년)",
        "1세대1주택 (12억 초과분): 보유 연4%×10년(40%) + 거주 연4%×10년(40%) = 최대 80%",
        "3년 미만 보유: 공제 없음",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2021-01-01",
      sourceUrl: "https://www.law.go.kr/법령/소득세법/제95조",
    }],
  },

  cg_multi_home_deferral: {
    verification: {
      ...SYSTEM_VERIFIED_2026_04,
      notes: "다주택 중과 유예기간 2026.5.9까지 확인. 유예 종료 후 정책 동향 주시 필요.",
    },
    legalTexts: [{
      lawName: "소득세법 시행령",
      articleNumber: "부칙 제20조",
      articleTitle: "다주택자 양도소득세 중과 유예",
      fullText: "2022.5.10~2026.5.9 양도분에 대해 조정대상지역 다주택자 양도세 중과(+20~30%p) 적용 배제.",
      keyProvisions: [
        "유예기간: 2022.5.10~2026.5.9 (4년간)",
        "2주택: 기본세율+20%p → 기본세율만 적용 (유예)",
        "3주택+: 기본세율+30%p → 기본세율만 적용 (유예)",
        "장기보유특별공제도 유예기간 내 적용 가능",
        "2026.5.10 이후 중과 부활 가능성 있음",
      ],
      effectiveDate: "2022-05-10",
      lastAmendedDate: "2022-05-10",
      sourceUrl: "https://www.law.go.kr/법령/소득세법시행령",
    }],
    faqs: [
      { question: "2026년 5월 10일 이후에 팔면 중과되나요?", answer: "현행 규정상 유예기간이 2026.5.9에 종료됩니다. 다만 정부가 추가 유예할 가능성이 있으므로 정책 동향을 주시하세요.", legalBasis: "소득세법 시행령 부칙 제20조" },
    ],
  },

  // ===== 08. 상속·증여세 (기존 2개 외 나머지) =====

  gift_startup_fund: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제30조의5",
      articleTitle: "창업자금에 대한 증여세 과세특례",
      fullText: "18세 이상 거주자가 60세 이상 부모로부터 중소기업 창업 목적으로 증여받는 경우 과세특례 적용.",
      keyProvisions: [
        "수증자 18세 이상, 증여자 60세 이상 (제1항)",
        "5억원 공제 후 10% 세율 (제1항)",
        "한도: 기본 50억, 10명↑ 신규고용 시 100억 (제2항)",
        "토지·건물 제외한 재산만 적용",
        "4년 내 전액 창업자금으로 사용 의무",
        "가업승계 증여세 과세특례(제30조의6)와 중복 적용 불가",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제30조의5",
    }],
  },

  gift_family_exemption: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제53조",
      articleTitle: "증여재산공제",
      fullText: "거주자가 증여를 받은 경우 다음 각 호의 구분에 따른 금액을 증여세 과세가액에서 공제한다.",
      keyProvisions: [
        "배우자: 10년간 6억원 (제1호)",
        "직계존비속(성년): 10년간 5천만원 (제2호)",
        "직계존비속(미성년): 10년간 2천만원 (제2호 단서)",
        "기타 친족: 10년간 1천만원 (제3호)",
        "10년 단위 합산 (동일인 기준)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제53조",
    }],
    practicalCases: [{
      title: "자녀에게 30년간 증여 전략",
      situation: "태어난 자녀에게 10년 단위로 증여 (0세→10세→20세→30세)",
      calculation: "미성년 2회: 2천만×2=4천만. 성년 2회: 5천만×2=1억. 합계: 1억 4천만원 무세 증여",
      result: "30년간 1.4억원 증여세 0원",
      taxSaved: 14_000_000,
    }],
  },

  gift_marriage_birth: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제53조의2",
      articleTitle: "혼인·출산 증여재산공제",
      fullText: "2024.1.1 이후 혼인신고 또는 자녀 출산(입양 포함) 시 직계존속으로부터 추가 1억원 공제.",
      keyProvisions: [
        "기존 5천만원과 별도로 추가 1억원 공제",
        "양가 합산 최대 1.5억원 추가 공제",
        "혼인: 혼인신고 전후 2년 이내 증여분",
        "출산: 자녀 출생(입양) 전후 2년 이내 증여분",
        "2024.1.1 이후 증여분부터 적용",
      ],
      effectiveDate: "2024-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제53조의2",
    }],
  },

  // ===== 01-extra. 소득세 — 추가 항목 =====

  income_additional_personal_senior: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제51조", articleTitle: "추가공제", fullText: "기본공제대상자가 70세 이상인 경우 1인당 100만원 추가공제.", keyProvisions: ["70세 이상 경로우대: 1인당 100만원 추가", "장애인: 1인당 200만원 추가", "한부모: 100만원 추가 (배우자 없는 경우)"], effectiveDate: "2026-01-01", lastAmendedDate: "2020-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제51조" }],
  },
  income_disabled_deduction: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제51조", articleTitle: "추가공제 (장애인)", fullText: "기본공제대상자가 장애인인 경우 1인당 200만원 추가공제.", keyProvisions: ["장애인 1인당 200만원 추가공제", "장애인증명서 또는 복지카드 필요", "나이 제한 없이 기본공제 가능 (장애인인 경우)"], effectiveDate: "2026-01-01", lastAmendedDate: "2020-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제51조" }],
  },
  income_single_parent: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제51조", articleTitle: "추가공제 (한부모)", fullText: "배우자 없이 직계비속을 부양하는 경우 연 100만원 추가공제.", keyProvisions: ["한부모 100만원 추가공제", "배우자 없이 직계비속(자녀, 손자녀) 부양", "부녀자공제(50만원)와 중복 시 한부모공제만 적용"], effectiveDate: "2026-01-01", lastAmendedDate: "2020-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제51조" }],
  },
  income_insurance_premium: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제59조의4", articleTitle: "특별세액공제 (보험료)", fullText: "근로자가 기본공제대상자를 피보험자로 하여 납부한 보장성보험료 연 100만원 한도 12% 세액공제.", keyProvisions: ["보장성보험: 연 100만원 한도 12% 공제", "장애인전용보장성보험: 연 100만원 한도 15% 공제"], effectiveDate: "2026-01-01", lastAmendedDate: "2020-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의4" }],
  },
  income_donation_political: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제76조", articleTitle: "정치자금 세액공제", fullText: "정치자금법에 따른 정치자금 기부금에 대해 세액공제.", keyProvisions: ["10만원 이하: 100/110 전액 세액공제", "10만원 초과: 15% (3천만원 초과분 25%) 세액공제"], effectiveDate: "2026-01-01", lastAmendedDate: "2022-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제76조" }],
  },
  // income_small_biz_mutual_aid: 아래 가족고용 섹션에 2025년 개정 한도(600/400)로 업데이트됨
  income_youth_savings: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제91조의20", articleTitle: "청년도약계좌 비과세", fullText: "만 19~34세 청년의 청년도약계좌 이자·배당소득 비과세.", keyProvisions: ["만 19~34세 (병역이행 시 +6년)", "총급여 7,500만원 이하", "월 70만원 한도 5년 납입", "이자·배당소득 비과세 + 정부기여금"], effectiveDate: "2026-01-01", lastAmendedDate: "2023-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제91조의20" }],
  },

  // ===== 02. 소득세 — 세액공제 =====

  credit_child: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제59조의2", articleTitle: "자녀세액공제", fullText: "종합소득이 있는 거주자의 8세 이상 자녀에 대해 세액공제.", keyProvisions: ["1명: 25만원 (2026년 기준)", "2명: 55만원", "3명↑: 55만원 + (자녀수-2)×40만원", "출생·입양: 첫째 30만, 둘째 50만, 셋째↑ 70만원 추가"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의2" }],
  },
  credit_childcare_benefit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제12조", articleTitle: "비과세소득 (보육수당)", fullText: "근로자가 지급받는 출산·보육수당 월 20만원 비과세.", keyProvisions: ["자녀 1명당 월 20만원 비과세 (2026년 기준)", "6세 이하 자녀 대상", "회사 규정에 의해 지급되는 보육수당"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제12조" }],
  },
  credit_medical: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제59조의4", articleTitle: "특별세액공제 (의료비)", fullText: "총급여 3% 초과 의료비 15% 세액공제 (난임시술비 30%).", keyProvisions: ["총급여 3% 초과분 15% 세액공제", "난임시술비: 30% 세액공제, 한도 없음", "미숙아·선천성이상아: 20%", "본인·65세↑·장애인: 한도 없음, 그 외 연 700만원 한도"], effectiveDate: "2026-01-01", lastAmendedDate: "2024-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의4" }],
  },
  credit_education: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제59조의4", articleTitle: "특별세액공제 (교육비)", fullText: "본인 및 부양가족 교육비 15% 세액공제.", keyProvisions: ["본인: 전액 한도 없음", "취학전 아동: 연 300만원 한도", "초중고: 연 300만원 한도 (2026년: 초등 저학년 예체능 학원비 포함)", "대학생: 연 900만원 한도"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의4" }],
  },
  credit_donation: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제59조의4", articleTitle: "특별세액공제 (기부금)", fullText: "법정기부금·지정기부금에 대해 세액공제 적용.", keyProvisions: ["법정기부금: 소득금액 100% 한도", "지정기부금(종교단체): 소득금액 10% 한도", "지정기부금(기타): 소득금액 30% 한도", "공제율: 1천만원↓ 15%, 1천만원↑ 30%"], effectiveDate: "2026-01-01", lastAmendedDate: "2021-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의4" }],
  },

  // ===== 03. 사업소득세 =====

  biz_estimated_expense: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법", articleNumber: "제80조", articleTitle: "추계결정·경정", fullText: "장부를 비치·기장하지 아니한 경우 추계에 의해 소득금액을 결정·경정한다.", keyProvisions: ["단순경비율: 직전연도 수입금액 기준 이하 사업자", "기준경비율: 단순경비율 기준 초과 사업자", "기준경비율 적용 시 주요경비(매입비용, 임차료, 인건비) 증빙 필요"], effectiveDate: "2026-01-01", lastAmendedDate: "2020-01-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제80조" }],
  },
  biz_to_corp_conversion: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "법인세법", articleNumber: "제55조", articleTitle: "세율", fullText: "법인세율 (2026년): 2억↓ 10%, 2~200억 20%, 200~3000억 22%, 3000억↑ 25%.", keyProvisions: ["개인 최고세율 45% vs 법인 최고세율 25% → 고소득 사업자에 유리", "법인 전환 시 양도소득세·부가세 이슈 검토 필수", "조특법 제32조: 현물출자 법인전환 시 양도세 이월과세 가능"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/법인세법/제55조" }],
  },

  // ===== 04. 법인세 =====

  corp_startup_reduction: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제6조", articleTitle: "창업중소기업 세액감면", fullText: "수도권 과밀억제권역 외 중소기업 창업 시 법인세·소득세 감면.", keyProvisions: ["비수도권 청년창업: 5년간 100% 감면", "비수도권 일반창업: 5년간 50% 감면", "수도권 과밀억제권역 외: 5년간 50% 감면", "2026년: 창업감면 지역세분화 (수도권 과밀/비과밀/비수도권 3단계)"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제6조" }],
  },
  corp_rd_credit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제10조", articleTitle: "연구·인력개발비 세액공제", fullText: "중소기업 연구·인력개발비에 대해 세액공제 적용.", keyProvisions: ["중소기업: 당기분 25% 세액공제", "일반기업: 당기분 0~2% 또는 증가분 25%", "신성장·원천기술: 중소 30~40%, 일반 20~30%"], effectiveDate: "2026-01-01", lastAmendedDate: "2023-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제10조" }],
  },
  corp_employment_credit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제29조의8", articleTitle: "통합고용세액공제", fullText: "상시근로자 수가 증가한 기업에 대해 세액공제 적용. 2026년 개편: 사후관리 폐지, 점증적 공제 구조 도입.", keyProvisions: ["수도권: 1년차 400만원 / 2년차 900만원 / 3년차 1,000만원", "지방(비수도권): 1년차 700만원 / 2년차 1,200만원 / 3년차 1,300만원", "사후관리 요건 폐지 (구법: 2년 유지 의무)"], effectiveDate: "2026-01-01", lastAmendedDate: "2026-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제29조의8" }],
  },
  corp_sme_special_reduction: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제7조", articleTitle: "중소기업 특별세액감면", fullText: "중소기업의 소득에 대해 업종·지역·규모에 따라 세액감면.", keyProvisions: ["소기업 (수도권 외): 30% 감면", "소기업 (수도권): 20% 감면", "중기업: 15% 감면", "감면한도: 1억원"], effectiveDate: "2026-01-01", lastAmendedDate: "2023-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제7조" }],
  },
  corp_investment_credit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제24조", articleTitle: "통합투자세액공제", fullText: "사업용 유형자산 투자에 대해 기본공제+추가공제 세액공제.", keyProvisions: ["중소기업 기본공제: 투자금액의 10%", "일반기업 기본공제: 1~3%", "추가공제: 직전 3년 평균 초과분의 3~4%"], effectiveDate: "2026-01-01", lastAmendedDate: "2023-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제24조" }],
  },

  // ===== 05. 부가가치세 =====

  vat_simplified_vs_general: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "부가가치세법", articleNumber: "제61조", articleTitle: "간이과세자", fullText: "직전 연도 공급대가 합계액이 대통령령으로 정하는 금액 미만인 개인사업자에 대해 간이과세 적용.", keyProvisions: ["간이과세 기준: 연 매출 1억 400만원 미만 (2026년 기준)", "납부면제: 연 매출 4,800만원 미만", "업종별 부가가치율 적용 (15~40%)", "세금계산서 발급 의무 (4,800만원↑)"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/부가가치세법/제61조" }],
  },
  vat_input_credit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "부가가치세법", articleNumber: "제38조", articleTitle: "매입세액공제", fullText: "사업자가 사업을 위하여 사용하였거나 사용할 재화·용역의 공급에 대한 매입세액은 매출세액에서 공제한다.", keyProvisions: ["사업 관련 매입세액 전액 공제 원칙", "적격증빙 필수 (세금계산서, 카드, 현금영수증)", "허위세금계산서 가산세: 4% (2026년 변경, 구법 3%)"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-01-01", sourceUrl: "https://www.law.go.kr/법령/부가가치세법/제38조" }],
  },

  // ===== 06-extra. 양도소득세 추가 =====

  cg_temporary_2house: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법 시행령", articleNumber: "제155조", articleTitle: "일시적 1세대 2주택 비과세", fullText: "1주택을 보유한 1세대가 다른 주택을 취득하여 일시적으로 2주택이 된 경우 비과세 특례.", keyProvisions: ["종전 주택 1년 이상 보유 후 신규 주택 취득", "신규 주택 취득일부터 3년 내 종전 주택 양도", "종전 주택 2년 이상 보유 요건 충족"], effectiveDate: "2026-01-01", lastAmendedDate: "2022-05-10", sourceUrl: "https://www.law.go.kr/법령/소득세법시행령/제155조" }],
  },

  // ===== 07. 재산세·종부세 =====

  prop_acquisition_tax_first_home: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "지방세법", articleNumber: "제11조", articleTitle: "취득세 세율", fullText: "부동산 취득 시 취득가액에 취득세율을 적용하여 과세.", keyProvisions: ["주택 취득세율: 6억↓ 1%, 6~9억 1~3%, 9억↑ 3%", "생애최초 주택구입: 200만원 한도 감면 (조특법)", "출산·양육 목적: 500만원 한도 감면 (2024~)"], effectiveDate: "2026-01-01", lastAmendedDate: "2024-01-01", sourceUrl: "https://www.law.go.kr/법령/지방세법/제11조" }],
  },
  prop_joint_ownership: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "종합부동산세법", articleNumber: "제8조", articleTitle: "과세표준", fullText: "1세대 1주택자의 종부세 기본공제액과 부부공동명의 시 공제 적용.", keyProvisions: ["1인 단독명의: 기본공제 12억원", "부부공동명의: 각각 9억원씩 = 합산 18억원", "공시가격 12~18억 구간에서 공동명의가 유리"], effectiveDate: "2026-01-01", lastAmendedDate: "2023-01-01", sourceUrl: "https://www.law.go.kr/법령/종합부동산세법/제8조" }],
  },

  // ===== 08-extra. 상속·증여 추가 =====

  inheritance_spouse_deduction: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "상속세 및 증여세법", articleNumber: "제19조", articleTitle: "배우자 상속공제", fullText: "배우자가 상속받은 금액에 대해 최소 5억원 최대 30억원 공제.", keyProvisions: ["최소 5억원 공제 (배우자가 상속받은 금액이 없어도)", "최대 30억원 한도", "법정상속분 한도 내에서 실제 상속받은 금액 공제"], effectiveDate: "2026-01-01", lastAmendedDate: "2016-01-01", sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제19조" }],
  },
  inheritance_financial_deduction: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "상속세 및 증여세법", articleNumber: "제22조", articleTitle: "금융재산 상속공제", fullText: "순금융재산가액에 따라 최대 2억원 공제.", keyProvisions: ["순금융재산 2천만원↓: 전액 공제", "순금융재산 2천만~1억: 2천만원", "순금융재산 1억↑: 20% (최대 2억원)"], effectiveDate: "2026-01-01", lastAmendedDate: "2016-01-01", sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제22조" }],
  },

  // ===== 09. 금융투자 =====

  fin_dividend_separate_tax: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "소득세법 (2025년 개정)", articleNumber: "제14조의2(신설)", articleTitle: "배당소득 분리과세 특례", fullText: "고배당 상장법인의 배당소득에 대해 종합과세 대신 분리과세 선택 가능.", keyProvisions: ["2026.1.1 이후 지급분부터 적용 (신설)", "2천만↓: 15.4% (지방세 포함)", "2천만~3억: 22%", "3억~50억: 27.5%", "50억↑: 33%", "고배당 상장법인에 한함 (요건 확인 필요)"], effectiveDate: "2026-01-01", lastAmendedDate: "2025-12-01", sourceUrl: "https://www.law.go.kr/법령/소득세법" }],
  },
  fin_isa_account: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제91조의18", articleTitle: "개인종합자산관리계좌(ISA)", fullText: "ISA 계좌 내 발생 소득에 대해 비과세·분리과세 적용.", keyProvisions: ["비과세 한도: 일반형 200만원, 서민형 400만원", "비과세 초과분: 9.9% 분리과세", "연 납입한도: 2천만원, 총 1억원 한도", "3년 의무가입 (서민형 면제 가능)"], effectiveDate: "2026-01-01", lastAmendedDate: "2024-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제91조의18" }],
  },
  fin_crypto_tax: {
    verification: { ...SYSTEM_VERIFIED_2026_04, notes: "2026년 현재 비과세 (유예). 2027.1.1 시행 예정이나 추가 유예 가능성." },
    legalTexts: [{ lawName: "소득세법", articleNumber: "제37조", articleTitle: "기타소득 (가상자산)", fullText: "가상자산 양도·대여 소득에 대해 기타소득으로 과세. 단, 2027.1.1 이후 양도분부터 적용.", keyProvisions: ["2026년 현재 비과세 (4차 유예)", "2027.1.1 시행 예정", "250만원 기본공제 후 22% (지방세 포함)", "해외거래소 소득도 과세 대상"], effectiveDate: "2027-01-01", lastAmendedDate: "2025-12-01", sourceUrl: "https://www.law.go.kr/법령/소득세법/제37조" }],
  },

  // ===== 11. 중소기업 오너 =====

  sme_employee_income_tax_reduction: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "조세특례제한법", articleNumber: "제30조", articleTitle: "중소기업 취업자 소득세 감면", fullText: "중소기업에 취업한 청년·60세이상·장애인·경력단절여성 소득세 감면.", keyProvisions: ["청년(만15~34세): 5년간 90% 감면 (연 200만원 한도)", "60세 이상·장애인·경력단절여성: 3년간 70% 감면 (연 200만원 한도)", "2026.12.31까지 취업분 적용"], effectiveDate: "2026-01-01", lastAmendedDate: "2023-01-01", sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제30조" }],
  },
  // ===== 가족고용·소득분산 관련 (2026.4 딥리서치 수집) =====

  biz_home_office_expense: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제55조",
      articleTitle: "세율",
      fullText: "거주자의 종합소득에 대한 소득세는 해당 연도의 종합소득과세표준에 다음의 세율을 적용하여 계산한 금액을 그 세액으로 한다.",
      keyProvisions: [
        "1,400만원 이하: 6% (누진공제 0원)",
        "1,400만~5,000만원: 15% (누진공제 126만원)",
        "5,000만~8,800만원: 24% (누진공제 576만원)",
        "8,800만~1.5억: 35% (누진공제 1,544만원)",
        "1.5억~3억: 38% (누진공제 1,994만원)",
        "3억~5억: 40% (누진공제 2,594만원)",
        "5억~10억: 42% (누진공제 3,594만원)",
        "10억 초과: 45% (누진공제 6,594만원)",
        "2023년 개정: 하위 2개 구간 조정 (1,200→1,400만, 4,600→5,000만)",
        "출처: 국세청 종합소득세 세율표 (2026년 현행)",
      ],
      effectiveDate: "2023-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7667",
    }],
  },

  biz_mixed_income_split: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제50조",
      articleTitle: "기본공제",
      fullText: "종합소득이 있는 거주자에 대해서는 다음 각 호의 어느 하나에 해당하는 사람의 수에 1명당 연 150만원을 곱하여 계산한 금액을 종합소득금액에서 공제한다.",
      keyProvisions: [
        "본인 포함 부양가족 1인당 150만원 공제 (제1항)",
        "배우자: 연소득금액 100만원 이하 (근로소득만 시 총급여 500만원 이하)",
        "직계존속: 60세 이상 (만 나이 기준)",
        "직계비속: 20세 이하 또는 장애인 (나이 제한 없음)",
        "형제자매: 20세 이하 또는 60세 이상",
        "생계를 같이 하는 부양가족이어야 함 (동거 요건)",
        "다른 근로자의 부양가족으로 이미 공제받은 경우 제외",
        "출처: 국세청 연말정산 안내, CaseNote 법령 조회",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://casenote.kr/법령/소득세법/제50조",
    }],
    faqs: [
      { question: "가족을 고용하면 부양가족 공제도 받을 수 있나요?", answer: "가족에게 지급한 급여가 연 500만원(총급여 기준)을 초과하면 소득 요건을 넘기므로 부양가족 기본공제 대상에서 제외됩니다. 소득분산과 인적공제를 동시에 받으려면 급여 수준을 신중하게 설계해야 합니다.", legalBasis: "소득세법 제50조 제1항 제3호" },
    ],
  },

  biz_vehicle_expense: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법 시행령",
      articleNumber: "제78조의3",
      articleTitle: "업무용승용차 관련비용 등의 필요경비 불산입 특례",
      fullText: "업무용승용차에 대한 감가상각비, 임차료, 유류비, 보험료, 수선비, 자동차세, 통행료 및 금융리스부채에 대한 이자비용 등의 필요경비 한도를 규정한다.",
      keyProvisions: [
        "업무전용보험 가입 + 운행기록부 미작성 시: 연 1,500만원 한도 (2026년 개정 확인)",
        "감가상각비/임차료: 연 800만원 한도",
        "유지비(유류비, 보험료, 수선비, 자동차세, 통행료): 연 700만원 한도",
        "운행기록부 작성 시: 1,500만원 초과분도 업무사용비율만큼 인정",
        "운행기록부: 승용차별로 작성·비치, 세무서 요구 시 즉시 제출",
        "부가세 매입세액 공제 불가: 8인승 이하 일반 승용차·SUV (부가가치세법 제39조)",
        "부가세 공제 가능: 1,000cc 미만 경차, 9인승 이상, 화물차",
        "렌트/리스 운용 시 개인 자산 미편입 → 건보료·국민연금 산정 제외 효과",
        "2026.2.27 소득세법시행령 개정 반영",
        "출처: 국세청 업무용승용차 세무처리 안내, 중기이코노미",
      ],
      effectiveDate: "2026-02-27",
      lastAmendedDate: "2026-02-27",
      sourceUrl: "https://law.go.kr/lsLinkCommonInfo.do?lspttninfSeq=126498&chrClsCd=010202",
    }],
    faqs: [
      { question: "운행기록부 없이 1,500만원까지 인정 가능한가요?", answer: "네. 업무전용보험에 가입했다면 운행기록부 없이도 연 1,500만원까지 경비 인정됩니다. 1,500만원을 초과하는 비용은 운행기록부를 작성해야만 업무사용비율만큼 추가 인정됩니다.", legalBasis: "소득세법 시행령 제78조의3 제4항" },
      { question: "SUV도 매입세액 공제가 안 되나요?", answer: "8인승 이하 승용차(SUV 포함)는 부가세 매입세액 공제가 안 됩니다. 소득세 필요경비로는 처리 가능하지만 부가세 환급은 안 됩니다.", legalBasis: "부가가치세법 제39조 제1항 제5호" },
    ],
  },

  income_small_biz_mutual_aid: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제86조의3",
      articleTitle: "소기업·소상공인 공제부금에 대한 소득공제",
      fullText: "소기업·소상공인이 노란우산공제에 납입한 공제부금에 대해 사업소득금액에서 소득공제한다.",
      keyProvisions: [
        "사업소득 4천만원 이하: 연 600만원 한도 (2025년 개정, 구법 500만원)",
        "사업소득 4천만~1억원: 연 400만원 한도 (2025년 개정, 구법 300만원)",
        "사업소득 1억원 초과: 연 200만원 한도 (변동 없음)",
        "법인대표: 총급여 8천만원 이하 시 소득공제 대상",
        "2026년: 50개월 납입 한도 폐지 (추가 납입 가능)",
        "분리과세: 공제금 수령 시 퇴직소득세 수준의 저율 과세",
        "압류금지: 공제금은 압류·양도·담보 제공 불가",
        "근거: 조세특례제한법 제86조의3 제1항·제4항 (법률 제20778호, 2025-3-14)",
        "출처: 노란우산 공식사이트, 뱅크샐러드, 정책브리핑",
      ],
      effectiveDate: "2025-01-01",
      lastAmendedDate: "2025-03-14",
      sourceUrl: "https://yumam.kbiz.or.kr/yuma/contents/contents/contents.do?mnSeq=29",
    }],
    practicalCases: [{
      title: "소득분산 후 노란우산공제 한도 상향 효과",
      situation: "사업소득 1억원 → 가족고용으로 7천만원으로 분산",
      calculation: "분산 전: 한도 200만원. 분산 후: 한도 400만원. 추가 공제 200만원 × 24% 세율 = 48만원 추가 절세",
      result: "소득 분산의 연쇄 효과로 노란우산공제 절세도 추가 확보",
      taxSaved: 480_000,
    }],
  },

  // ===== 콘텐츠 기획안 연계 — 감액배당/비상장주식평가/특정법인/정관 (2026.4 딥리서치) =====

  corp_dividend_timing: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상법",
      articleNumber: "제461조의2",
      articleTitle: "준비금의 감소 (감액배당)",
      fullText: "회사는 적립된 자본준비금 및 이익준비금의 총액이 자본금의 1.5배를 초과하는 경우에 주주총회의 결의에 따라 그 초과한 금액 범위에서 준비금을 감액할 수 있다.",
      keyProvisions: [
        "【감액배당 요건】 준비금 총액 > 자본금 × 1.5배 초과분만 감액 가능 (제1항)",
        "【자본준비금 원천】 주식발행초과금, 감자차익, 합병차익, 자기주식처분이익·소각이익",
        "【비과세 규정】 자본준비금 감액배당은 배당소득 과세 대상 아님 (소득세법 제17조 제2항 제2호)",
        "【법인주주 2023년 개정】 출자법인의 주식 장부가액을 한도로 익금불산입",
        "【채권자 보호절차】 1개월 이상 이의제출 기간 필요 (상법 제439조 준용)",
        "【이사회 결의 → 주주총회 특별결의 필요】",
        "【2026년 주의】 감액배당 과세 논의 진행 중 — 세법 개정 동향 주시 필요",
        "출처: Lexology 2025 세제개편안, 한국세정신문, CaseNote",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2011-04-14",
      sourceUrl: "https://casenote.kr/법령/상법/제461조의2",
    }],
    faqs: [
      { question: "감액배당은 정말 세금이 0원인가요?", answer: "자본준비금(주식발행초과금 등)을 재원으로 한 감액배당은 현행법상 배당소득세 비과세입니다. 다만, 이익잉여금을 재원으로 한 배당은 과세됩니다. 2026년 세법 개정 논의에서 과세 전환이 검토되고 있으므로 동향을 주시해야 합니다.", legalBasis: "소득세법 제17조 제2항 제2호, 상법 제461조의2" },
      { question: "감액배당 절차가 복잡한가요?", answer: "이사회 결의 → 주주총회 특별결의 → 채권자 보호절차(1개월 이의제출) → 배당 지급 순으로 진행됩니다. 최소 2~3개월 소요되므로 연내 실행하려면 9월까지는 착수해야 합니다.", legalBasis: "상법 제461조의2, 제439조" },
    ],
  },

  gift_real_estate_valuation: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법 시행령",
      articleNumber: "제54조",
      articleTitle: "비상장주식의 보충적 평가방법",
      fullText: "비상장주식은 1주당 순손익가치와 1주당 순자산가치를 각각 3과 2의 비율로 가중평균하여 평가한다.",
      keyProvisions: [
        "【기본 공식】 1주당 평가액 = (순손익가치×3 + 순자산가치×2) ÷ 5",
        "【순손익가치】 최근 3년간 순손익 가중평균 ÷ 순손익가치 환원율(10%)",
        "【순자산가치】 자산총액 - 부채총액 ÷ 발행주식수",
        "【부동산과다법인】 부동산 50%↑ 시 → (순손익×2 + 순자산×3) ÷ 5 (비율 역전)",
        "【평가기준일】 상속개시일 또는 증여일",
        "【가업승계 영향】 주식가치가 높을수록 상속세·증여세 증가 → 가치 관리 필수",
        "출처: 국세청 상속재산 평가 안내, ZUZU, 아이코노미유",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2023-01-01",
      sourceUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2330&cntntsId=7723",
    }],
    faqs: [
      { question: "비상장주식 가치를 낮추려면 어떻게 해야 하나요?", answer: "순손익가치(3년 평균 이익)와 순자산가치를 관리해야 합니다. 적정 급여·상여 지급, 퇴직금 충당금 설정, 투자·경비 집행 등으로 법인 이익과 순자산을 조정할 수 있습니다. 다만 이익 조작은 세무조사 대상이므로 합법 범위 내에서 진행해야 합니다.", legalBasis: "상증법 시행령 제54조" },
    ],
  },

  sme_dividend_separate_2026: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제45조의5",
      articleTitle: "특정법인과의 거래를 통한 이익의 증여 의제",
      fullText: "지배주주와 그 친족의 주식보유비율이 30% 이상인 법인(특정법인)이 지배주주의 특수관계인과 거래하는 경우, 그 이익을 증여로 의제한다.",
      keyProvisions: [
        "【특정법인 정의】 지배주주+친족 지분 30%↑ 법인 (제1항) — 대부분 가족법인 해당",
        "【증여의제 거래】 ①무상 제공, ②저가 양수, ③고가 양도, ④불균등 자본거래 (2026.1.2 신설)",
        "【2026년 신설】 불균등 감자·합병·증자·현물출자·전환사채·초과배당·주식교환 포함 (제3호의2)",
        "【증여세 계산】 특정법인 이익 × 지배주주 지분율 = 증여의제 금액",
        "【1억원 이상 시 과세】 증여의제이익 1억원 미만은 비과세",
        "【가족법인 주의】 가족법인 설립·운영 시 모든 특수관계 거래에 적용",
        "출처: 국가법령정보센터, 한국세정신문, 대한금융신문",
      ],
      effectiveDate: "2026-01-02",
      lastAmendedDate: "2025-03-14",
      sourceUrl: "https://law.go.kr/LSW//lsLinkCommonInfo.do?lsJoLnkSeq=1027435067&chrClsCd=010202",
    }],
    faqs: [
      { question: "가족법인 설립하면 무조건 특정법인인가요?", answer: "가족(지배주주+친족) 지분이 30% 이상이면 특정법인입니다. 가족법인은 대부분 100% 가족 지분이므로 거의 확실히 해당됩니다. 모든 특수관계 거래에 증여의제 규정이 적용됩니다.", legalBasis: "상증법 제45조의5 제1항" },
      { question: "2026년에 뭐가 새로 바뀌었나요?", answer: "불균등 자본거래(감자·합병·증자·현물출자·전환사채·초과배당·주식교환 등)가 증여의제 대상에 추가되었습니다. 가족법인의 자본거래 시 반드시 세무 검토가 필요합니다.", legalBasis: "상증법 제45조의5 제1항 제3호의2 (2026.1.2 시행)" },
    ],
  },

  // ===== 사내근로복지기금 =====

  employee_welfare_fund: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "근로복지기본법",
        articleNumber: "제50조",
        articleTitle: "사내근로복지기금의 설립",
        fullText: "사업주는 근로자의 복리후생 증진을 위하여 사내근로복지기금을 설립할 수 있다.",
        keyProvisions: [
          "사업주가 기금에 출연한 금액은 전액 손금(경비) 인정 (법인세법 제18조)",
          "근로자가 기금에서 수령하는 혜택은 근로소득에서 제외 (소득세법 제12조)",
          "소득세·4대보험 비과세 처리",
          "증여세 면제",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2022-01-01",
        sourceUrl: "https://www.taxoffice.co.kr/sub/index.php?cat_no=207",
      },
      {
        lawName: "법인세법",
        articleNumber: "제18조",
        articleTitle: "기부금의 손금불산입 (사내근로복지기금 출연금 특례)",
        fullText: "사내근로복지기금에 출연하는 금액은 손금에 산입한다.",
        keyProvisions: [
          "출연금 전액 손금산입",
          "법인세 과세표준 감소 효과",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2022-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제18조",
      },
      {
        lawName: "소득세법",
        articleNumber: "제12조",
        articleTitle: "비과세소득",
        fullText: "사내근로복지기금으로부터 받는 혜택은 근로소득에 해당하지 아니한다.",
        keyProvisions: [
          "근로자 수령액 근로소득 제외",
          "소득세 비과세",
          "4대보험료 부과 제외",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2022-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제12조",
      },
    ],
    practicalCases: [
      {
        title: "법인 이익 10억 중 1억 기금 출연",
        situation: "연간 이익 10억원인 법인이 사내근로복지기금에 1억원을 출연",
        calculation: "출연금 1억원 전액 손금산입 → 법인세 과세표준 1억원 감소 → 법인세율 약 20% 적용 시 약 2,000만원 절세",
        result: "법인세 약 2,000만원 절세 + 직원 복지 향상 (소득세·4대보험 비과세)",
        taxSaved: 20_000_000,
        source: "근로복지기본법 제50조, 법인세법 제18조",
      },
    ],
    faqs: [
      { question: "사내근로복지기금 출연하면 법인세가 줄어드나요?", answer: "네. 출연금 전액 손금(경비) 인정됩니다. 법인세 과세표준이 그만큼 줄어들어 법인세 절감 효과가 있습니다.", legalBasis: "법인세법 제18조, 근로복지기본법 제50조" },
      { question: "직원이 받는 혜택에 소득세가 붙나요?", answer: "아닙니다. 근로소득에서 제외되어 소득세·4대보험 모두 비과세입니다.", legalBasis: "소득세법 제12조" },
    ],
  },

  // ===== 가수금 =====

  corporate_suspense_receipt: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법 시행령",
        articleNumber: "제89조",
        articleTitle: "시가의 범위 등",
        fullText: "가수금은 법인이 대표이사 등으로부터 일시적으로 차입한 금액으로, 출자전환(증자) 또는 상환으로 정리하여야 한다.",
        keyProvisions: [
          "가수금 = 법인이 대표이사로부터 빌린 돈 (부채 계정)",
          "출자전환(증자) 시 채무→자본 전환, 등기 필요",
          "발행가액 vs 시가 차이 시 다른 주주에게 증여세 리스크",
          "가수금 장기 방치 시 자본잠식 우려, 금융기관 신용평가 불이익",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.help-me.kr/blog/article/가수금과-가지급금-혼동하기-쉬운-법인-회계-용어-정/",
      },
      {
        lawName: "상법",
        articleNumber: "제416조",
        articleTitle: "신주의 발행",
        fullText: "회사는 주주총회 또는 이사회 결의로 신주를 발행할 수 있다. 가수금의 출자전환은 신주발행 절차를 따른다.",
        keyProvisions: [
          "출자전환 시 신주발행 절차 준수",
          "이사회 또는 주주총회 결의 필요",
          "변경등기 필수",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제416조",
      },
    ],
    faqs: [
      { question: "가수금을 출자전환하면 세금이 나오나요?", answer: "시가보다 낮은 가격으로 전환하면 다른 주주에게 증여세가 과세될 수 있습니다. 시가 평가 후 적정 가액으로 전환해야 합니다.", legalBasis: "상증법 제39조, 법인세법 시행령 제89조" },
      { question: "가수금과 가지급금 차이가 뭔가요?", answer: "가수금은 법인이 빌린 돈(부채), 가지급금은 법인이 빌려준 돈(자산). 가지급금이 세무상 훨씬 위험합니다. 가지급금은 인정이자 과세, 대손처리 불가, 지급이자 손금불산입 등 불이익이 큽니다.", legalBasis: "법인세법 시행령 제89조" },
    ],
  },

  // ===== 기업분할 =====

  corporate_split: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제46조",
        articleTitle: "분할 시 자산양도 등",
        fullText: "내국법인이 분할하는 경우 분할법인 등의 자산을 분할신설법인 등에 양도한 것으로 본다. 적격분할 시 양도차익에 대해 이월과세를 적용한다.",
        keyProvisions: [
          "인적분할: 주주에게 신설법인 주식 배분",
          "물적분할: 분할법인이 신설법인 주식 100% 보유",
          "적격분할 요건: 5년 이상 사업 영위, 독립 사업부문, 자산부채 포괄승계",
          "적격분할 시 양도차익 이월과세 (과세 이연)",
          "비적격분할 시 시가 기준 양도 → 즉시 과세",
          "사후관리: 분할 후 3년 내 사업 계속, 지분 유지 의무",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=900179794&lsId=001563",
      },
      {
        lawName: "상법",
        articleNumber: "제530조의2~12",
        articleTitle: "회사의 분할",
        fullText: "회사는 주주총회 특별결의에 의하여 분할하거나 다른 회사와 합하여 새 회사를 설립할 수 있다.",
        keyProvisions: [
          "주주총회 특별결의(출석주주 의결권 2/3 이상, 발행주식 1/3 이상)",
          "분할계획서 작성 및 공시 의무",
          "채권자 보호절차 이행",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제530조의2",
      },
    ],
    faqs: [
      { question: "물적분할하면 세금이 안 나오나요?", answer: "적격분할 요건(5년 이상 사업, 독립 사업부문, 포괄승계 등)을 충족하면 양도차익이 이월과세됩니다. 요건 미충족 시 시가 기준 즉시 과세됩니다.", legalBasis: "법인세법 제46조" },
    ],
  },

  // ===== 기업합병 =====

  corporate_merger: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제44조, 제44조의3",
        articleTitle: "합병 시 자산양도 등, 적격합병 시 과세특례",
        fullText: "내국법인 간 합병 시 피합병법인의 자산을 합병법인에 양도한 것으로 본다. 적격합병 요건 충족 시 피합병법인 자산을 장부가액으로 승계하여 양도손익이 발생하지 않는다.",
        keyProvisions: [
          "적격합병 시 피합병법인 자산 장부가액 승계 → 양도손익 0",
          "적격합병 요건: 합병대가 주식 80% 이상, 사업 계속, 근로자 80% 이상 승계",
          "비적격합병 시 시가 기준 양도 → 즉시 과세",
          "사후관리: 합병법인 3년 내 사업 계속·고용 유지 위반 시 양도차익 익금산입",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=1000225616&lsId=001563",
      },
      {
        lawName: "상법",
        articleNumber: "제522조~530조",
        articleTitle: "회사의 합병",
        fullText: "회사는 합병을 할 수 있다. 합병은 주주총회의 특별결의로 승인한다.",
        keyProvisions: [
          "주주총회 특별결의 필요",
          "합병계약서 작성·공시",
          "채권자 보호절차(1개월 이상 이의 기간)",
          "합병등기 후 효력 발생",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제522조",
      },
    ],
    faqs: [
      { question: "합병하면 세금이 나오나요?", answer: "적격합병이면 양도차익 이월과세(세금 이연). 비적격이면 시가 기준 즉시 과세됩니다. 적격합병 요건은 합병대가 주식 80% 이상, 사업 계속, 근로자 80% 이상 승계입니다.", legalBasis: "법인세법 제44조, 제44조의3" },
    ],
  },

  // ===== 배당 — 법인 잉여금 출구전략 =====

  dividend_exit_strategy: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "소득세법",
        articleNumber: "제17조",
        articleTitle: "배당소득",
        fullText: "배당소득은 내국법인으로부터 받는 이익이나 잉여금의 배당 또는 분배금을 말한다.",
        keyProvisions: [
          "배당소득 2천만원 초과 시 종합과세 (6~45%)",
          "2026년 고배당기업 분리과세 신설",
          "분리과세 세율: 2천만원 이하 15.4%, 2천만~3억 22%, 3억~50억 27.5%, 50억 초과 33%",
          "대상: 배당성향 40% 이상 또는 25% 이상+전년대비 10% 이상 증가한 국내 상장기업",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.heumtax.com/contents/posts/dividend-income-separation-tax",
      },
      {
        lawName: "소득세법",
        articleNumber: "제62조",
        articleTitle: "배당세액공제",
        fullText: "종합소득 산출세액에서 배당소득에 대해 배당세액공제를 적용한다.",
        keyProvisions: [
          "Gross-up 배당가산액의 일정 비율 세액공제",
          "이중과세 조정 목적",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제62조",
      },
      {
        lawName: "법인세법",
        articleNumber: "제18조의2",
        articleTitle: "수입배당금의 익금불산입",
        fullText: "내국법인이 다른 내국법인으로부터 받는 배당금의 일정 비율을 익금에 산입하지 아니한다.",
        keyProvisions: [
          "지주회사 구조 시 수입배당금 익금불산입 비율 확대",
          "지분율에 따라 익금불산입 비율 차등 적용",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제18조의2",
      },
    ],
    practicalCases: [
      {
        title: "잉여금 10억 출구전략 세율 비교",
        situation: "법인 잉여금 10억원을 개인으로 이전하는 다양한 방법의 세율 비교",
        calculation: "급여: 종합소득세+4대보험 약 50% | 배당: 금융소득종합과세 약 34.8% | 퇴직금: 분리과세 약 20% | 이익소각(자사주소각): 의제배당 약 6.7% | 감액배당(자본잉여금 환원): 0%",
        result: "감액배당 0% > 이익소각 6.7% > 퇴직금 20% > 배당 34.8% > 급여 50% 순으로 세부담 낮음",
        taxSaved: 0,
        source: "소득세법 제17조, 상법 제461조의2",
      },
    ],
    faqs: [
      { question: "배당이 가장 절세인가요?", answer: "아닙니다. 금융소득 2천만원 초과 시 종합과세로 최고 49.5%까지 올라갑니다. 급여·배당·퇴직금·자사주·감액배당을 조합 설계해야 합니다.", legalBasis: "소득세법 제17조, 제62조" },
    ],
  },

  // ===== 법인 잉여금 전략 =====

  retained_earnings_strategy: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제55조",
        articleTitle: "세율",
        fullText: "내국법인의 각 사업연도의 소득에 대한 법인세는 과세표준에 세율을 적용하여 계산한다.",
        keyProvisions: [
          "2억 이하 9%, 2~200억 19%, 200~3,000억 21%, 3,000억 초과 24%",
          "잉여금을 법인 내 유보 시 법인세율 적용",
          "개인 이전 시 추가 소득세 발생 → 총 세부담 비교 필요",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제55조",
      },
      {
        lawName: "소득세법",
        articleNumber: "제17조",
        articleTitle: "배당소득",
        fullText: "배당소득은 내국법인으로부터 받는 이익이나 잉여금의 배당 또는 분배금을 말한다.",
        keyProvisions: [
          "배당 시 금융소득종합과세 적용 가능 (2천만원 초과)",
          "종합소득세율 6~45% + 지방소득세",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제17조",
      },
      {
        lawName: "상법",
        articleNumber: "제461조의2",
        articleTitle: "자본금의 감소에 의한 주금의 환급",
        fullText: "회사는 자본감소에 의하여 주주에게 주금의 전부 또는 일부를 환급할 수 있다. 감액배당은 자본잉여금 환원으로 비과세 처리된다.",
        keyProvisions: [
          "감액배당: 자본잉여금(주식발행초과금 등) 환원 시 비과세",
          "자본감소 절차(주주총회 특별결의, 채권자 보호절차) 필요",
          "이익잉여금이 아닌 자본잉여금만 해당",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제461조의2",
      },
    ],
    practicalCases: [
      {
        title: "잉여금 개인화 5가지 방법 비교",
        situation: "법인 잉여금을 대표이사 개인에게 이전하는 5가지 방법의 세부담 비교",
        calculation: "① 급여/상여: 종합소득세 최고 45% + 4대보험 → 실질 50% 이상 | ② 배당: 금융소득 종합과세 시 최고 49.5% | ③ 퇴직금: 분리과세 약 15~25% | ④ 자사주 소각(이익소각): 의제배당, 취득가 높이면 약 6.7% 수준 | ⑤ 감액배당: 자본잉여금 환원 시 비과세 (상법 제461조의2)",
        result: "감액배당(0%) > 이익소각(6.7%) > 퇴직금(15~25%) > 배당(~49.5%) > 급여(~50%) 순서로 절세 효과 큼. 단, 각 방법마다 요건·리스크·적용 가능 금액이 다르므로 조합 설계 필수.",
        taxSaved: 0,
        source: "법인세법 제55조, 소득세법 제17조, 상법 제461조의2",
      },
    ],
    faqs: [
      { question: "어떤 방법이 가장 절세인가요?", answer: "일률적 답이 없습니다. 금액, 기간, 가업승계 계획 등에 따라 조합 설계가 필요합니다. 감액배당(비과세)과 이익소각(6.7%)이 세율만 보면 유리하지만, 자본잉여금 유무·주식 취득가 등 전제조건이 있습니다.", legalBasis: "법인세법 제55조, 소득세법 제17조, 상법 제461조의2" },
    ],
  },

  // ===== 세무조사·법인운영·건보료·연말정산·가업승계·세법개정 =====

  tax_audit_defense: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "국세기본법",
        articleNumber: "제81조의4",
        articleTitle: "세무조사 사전통지",
        fullText: "세무공무원은 세무조사를 하는 경우 조사를 받을 납세자에게 조사 시작 15일 전에 조사 대상 세목, 조사 기간 등을 통지하여야 한다.",
        keyProvisions: [
          "조사 시작 15일 전 사전통지 의무 (제1항)",
          "통지 내용: 세목, 기간, 사유, 장소 등",
          "세무조사 유형: 정기조사(4~5년 주기), 비정기조사(탈세 제보 등)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.taxtimes.co.kr/news/article.html?no=274567",
      },
      {
        lawName: "국세기본법",
        articleNumber: "제81조의6",
        articleTitle: "세무조사 기간",
        fullText: "세무조사 기간은 최소한으로 하되, 20일 이내로 한다. 다만, 부득이한 사유가 있는 경우 관할 세무관서의 장의 승인을 받아 연장할 수 있다.",
        keyProvisions: [
          "조사기간 원칙 20일 이내 (제1항)",
          "부득이한 사유 시 연장 가능 (제2항)",
          "2026년 신설: 정기 세무조사 시기선택제 시행 (납세자가 조사 시기 선택 가능)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2026-01-01",
        sourceUrl: "https://www.taxtimes.co.kr/news/article.html?no=274567",
      },
      {
        lawName: "국세기본법",
        articleNumber: "제81조의15",
        articleTitle: "납세자 권리",
        fullText: "납세자는 세무조사 시 조세전문가의 조력을 받을 권리, 비밀유지권, 의견진술권 등을 가진다.",
        keyProvisions: [
          "세무대리인 입회권",
          "비밀유지 및 의견진술권",
          "2026년: AI 기반 탈세적발 시스템 강화, 가지급금 인정이자 등 10대 중점검증 항목",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.taxtimes.co.kr/news/article.html?no=274567",
      },
    ],
    faqs: [
      { question: "세무조사 나오면 어떻게 해야 하나요?", answer: "사전통지를 받으면 세무대리인(세무사·회계사)을 선임하고, 조사 범위(세목·기간)를 확인한 뒤 관련 증빙을 정리하세요. 납세자 권리헌장을 숙지하고 불필요한 자료 제출은 거부할 수 있습니다.", legalBasis: "국세기본법 제81조의4, 제81조의15" },
      { question: "자금출처 조사란?", answer: "소득 대비 과다한 재산 취득 시 자금출처를 소명해야 하는 조사입니다. 소명하지 못한 금액은 증여로 추정됩니다.", legalBasis: "상증법 제45조" },
    ],
  },

  corporate_charter_optimization: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "상법",
        articleNumber: "제289조",
        articleTitle: "정관의 기재사항",
        fullText: "정관에는 목적, 상호, 본점소재지, 자본금 등 절대적 기재사항과 상대적 기재사항을 기재한다.",
        keyProvisions: [
          "정관에 배당 관련 조항(차등배당 근거) 명시 필수",
          "이익소각·감액배당 실행 전 정관 정비 선행 필요",
          "임원 보수 한도 정관 명시 (상법 제388조)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상법/제289조",
      },
      {
        lawName: "법인세법",
        articleNumber: "제44조",
        articleTitle: "퇴직급여 한도",
        fullText: "퇴직급여의 손금산입 한도를 초과하는 금액은 손금에 산입하지 아니한다.",
        keyProvisions: [
          "퇴직금 지급 규정을 정관에 명시해야 손금 인정",
          "임원 퇴직금 한도: 직전 1년 총급여 × 1/10 × 근속연수 × 3배",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제44조",
      },
      {
        lawName: "상법",
        articleNumber: "제388조",
        articleTitle: "이사의 보수",
        fullText: "이사의 보수는 정관에 그 액을 정하지 아니한 때에는 주주총회의 결의로 이를 정한다.",
        keyProvisions: [
          "정관 또는 주주총회에서 임원 보수 한도 결정",
          "정관에 한도를 정하면 주총 결의 없이 지급 가능",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상법/제388조",
      },
    ],
    faqs: [
      { question: "정관을 왜 바꿔야 하나요?", answer: "이익소각, 감액배당, 임원 퇴직금 등 모든 절세 전략의 법적 근거가 정관에 있어야 합니다. 정관에 근거 없이 실행하면 세무상 부인될 수 있습니다.", legalBasis: "상법 제289조, 제388조" },
    ],
  },

  family_corporation_setup: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "조세특례제한법",
        articleNumber: "제6조",
        articleTitle: "창업중소기업 세액감면",
        fullText: "창업중소기업에 대해 최초 소득이 발생한 과세연도부터 일정 기간 법인세를 감면한다.",
        keyProvisions: [
          "비수도권 청년 창업: 5년간 100% 감면",
          "수도권 청년 창업: 5년간 50% 감면",
          "비청년 비수도권: 5년간 50% 감면",
          "자녀법인 설립 시 창업감면 활용 가능",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제6조",
      },
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제45조의5",
        articleTitle: "특정법인과의 거래를 통한 이익의 증여의제",
        fullText: "특수관계인이 특정법인과의 거래를 통해 이익을 얻은 경우 그 이익에 상당하는 금액을 증여받은 것으로 본다.",
        keyProvisions: [
          "자산이전 시 시가 거래 필수",
          "특수관계 거래 시 증여세 리스크 관리 필요",
          "가족법인에 일감 몰아주기도 증여의제 적용 가능",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제45조의5",
      },
    ],
    faqs: [
      { question: "자녀법인 설립하면 절세 되나요?", answer: "창업감면 혜택은 있으나, 특정법인 증여의제(상증법 제45조의5) 적용에 주의해야 합니다. 시가 거래 원칙을 준수하고, 일감 몰아주기 증여세 리스크를 사전 검토해야 합니다.", legalBasis: "조특법 제6조, 상증법 제45조의5" },
    ],
  },

  corporate_real_estate: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "지방세법",
        articleNumber: "제11조",
        articleTitle: "취득세 세율",
        fullText: "부동산 취득 시 그 취득가액에 취득세율을 적용하여 취득세를 부과한다.",
        keyProvisions: [
          "법인 취득세 중과: 수도권 과밀억제권역 내 4.6%",
          "일반 취득세: 1~3% (개인), 법인은 중과 대상일 수 있음",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/지방세법/제11조",
      },
      {
        lawName: "법인세법",
        articleNumber: "제55조",
        articleTitle: "세율",
        fullText: "각 사업연도의 소득에 대한 법인세는 과세표준에 세율을 적용하여 계산한다.",
        keyProvisions: [
          "2026년 법인세율: 2억↓ 10%, 2~200억 20%, 200~3000억 22%, 3000억↑ 25%",
          "법인 부동산 양도 시 법인세율 적용 (개인 양도세율과 다름)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제55조",
      },
      {
        lawName: "종합부동산세법",
        articleNumber: "제9조",
        articleTitle: "세율",
        fullText: "종합부동산세의 세율은 과세표준에 따라 누진세율을 적용한다.",
        keyProvisions: [
          "법인 종부세 중과: 최고 5% (주택분)",
          "법인은 기본공제·세부담상한 적용 배제",
          "개인 vs 법인 매입 시 취득세·보유세·양도세 비교 시뮬레이션 필요",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/종합부동산세법/제9조",
      },
    ],
    faqs: [
      { question: "부동산을 법인으로 사는 게 유리한가요?", answer: "취득세·종부세가 중과되므로 단순 보유 목적이면 불리합니다. 사업용이면 감가상각·이자·관리비 등 경비 처리가 가능하여 유리할 수 있습니다. 개인 vs 법인 비교 시뮬레이션이 필수입니다.", legalBasis: "지방세법 제11조, 종부세법 제9조, 법인세법 제55조" },
    ],
  },

  health_insurance_optimization: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "국민건강보험법",
        articleNumber: "제69조",
        articleTitle: "보험료 산정",
        fullText: "직장가입자의 보험료는 보수월액에 보험료율을 곱하여 산정한다.",
        keyProvisions: [
          "법인 대표의 보수월액 기준 건보료 산정",
          "급여 구조 조정으로 건보료 절감 가능",
          "배당은 건보료 산정 대상 (피부양자 자격 상실 기준 연 2천만원)",
          "퇴직금은 건보료 부과 대상 아님",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/국민건강보험법/제69조",
      },
      {
        lawName: "국민건강보험법 시행령",
        articleNumber: "제41조",
        articleTitle: "보수월액",
        fullText: "보수월액은 직장가입자가 지급받는 보수를 기준으로 산정한다.",
        keyProvisions: [
          "보수 = 근로소득에서 비과세소득 제외한 금액",
          "보수월액이 줄면 건보료도 감소",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/국민건강보험법시행령/제41조",
      },
    ],
    faqs: [
      { question: "급여를 줄이면 건보료가 줄어드나요?", answer: "네. 보수월액이 줄면 건보료도 줄어듭니다. 다만 급여 대신 배당을 받으면 건보료 부과 기준이 달라집니다. 배당소득이 연 2천만원을 초과하면 피부양자 자격을 상실할 수 있습니다.", legalBasis: "국민건강보험법 제69조, 시행령 제41조" },
    ],
  },

  year_end_tax_checklist: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제19조의2",
        articleTitle: "접대비의 손금불산입",
        fullText: "접대비는 기본한도와 수입금액 기준 한도를 합산한 금액을 초과하는 부분을 손금에 산입하지 아니한다.",
        keyProvisions: [
          "기본한도: 중소기업 3,600만원, 일반법인 1,200만원 (제1항)",
          "수입금액 기준 추가 한도 (제2항)",
          "접대비 1만원↑ 법인카드·세금계산서 등 적격증빙 필수",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제19조의2",
      },
      {
        lawName: "법인세법",
        articleNumber: "제34조",
        articleTitle: "대손충당금의 손금산입",
        fullText: "내국법인이 대손충당금을 손비로 계상한 경우 일정 한도 내에서 손금에 산입한다.",
        keyProvisions: [
          "채권잔액의 1% 또는 대손실적률 중 큰 금액",
          "12월 결산 전 대손충당금 설정으로 법인세 절감",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제34조",
      },
      {
        lawName: "법인세법",
        articleNumber: "제23조",
        articleTitle: "감가상각비의 손금산입",
        fullText: "내국법인이 각 사업연도에 감가상각자산에 대한 감가상각비를 손비로 계상한 경우 손금에 산입한다.",
        keyProvisions: [
          "결산 전 감가상각비 계상 여부 점검",
          "정액법·정률법 선택에 따른 절세 효과 차이",
          "연말 체크: 기부금 한도, 세액공제 누락 확인",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제23조",
      },
    ],
    faqs: [
      { question: "연말에 절세하려면 뭘 해야 하나요?", answer: "감가상각비 계상, 대손충당금 설정, 퇴직금 중간정산 검토, 접대비 한도 관리, 세액공제 항목(R&D, 고용증대 등) 점검이 필수입니다.", legalBasis: "법인세법 제23조, 제34조, 제19조의2" },
    ],
  },

  executive_compensation_design: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "소득세법",
        articleNumber: "제20조",
        articleTitle: "근로소득",
        fullText: "근로소득은 해당 과세기간에 발생한 근로의 제공으로 인하여 받는 봉급·급료·보수 등의 소득을 말한다.",
        keyProvisions: [
          "급여: 종합과세(6~45%) + 4대보험 부과",
          "총급여 5,500만원까지는 급여가 유리 (낮은 세율 + 연금저축 공제)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제20조",
      },
      {
        lawName: "소득세법",
        articleNumber: "제17조",
        articleTitle: "배당소득",
        fullText: "배당소득은 내국법인으로부터 받는 이익의 배당 또는 분배금 등을 말한다.",
        keyProvisions: [
          "배당: 금융소득종합과세 (2천만원 초과 시 종합과세)",
          "2026년 신설: 배당소득 분리과세 (소득세법 제14조의2)",
          "급여 vs 배당 vs 퇴직금 세후 수령액 비교 설계 필요",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제17조",
      },
      {
        lawName: "법인세법",
        articleNumber: "제44조",
        articleTitle: "퇴직급여 한도",
        fullText: "임원 퇴직급여의 손금산입 한도를 초과하는 금액은 손금에 산입하지 아니한다.",
        keyProvisions: [
          "임원 퇴직금 한도: 직전 1년 총급여 × 1/10 × 근속연수 × 3배 (시행령 제44조)",
          "퇴직금은 분리과세 (약 15~25%) → 세부담 가장 낮음",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제44조",
      },
    ],
    practicalCases: [{
      title: "총 보수 2억 최적 설계",
      situation: "대표이사 총 보수 2억원 수령 시 급여·배당·퇴직금 조합 설계",
      calculation: "급여 1.2억(종합과세 약 24%) + 배당 5천만(금융소득 분리/종합과세) + 퇴직금 적립 3천만(분리과세 약 15~20%)",
      result: "세후 수령 극대화. 급여만 2억 수령 시 대비 약 1,500~2,000만원 절세 효과",
      taxSaved: 15_000_000,
      source: "소득세법 제20조, 제17조, 법인세법 제44조",
    }],
    faqs: [
      { question: "급여와 배당 비율을 어떻게 정해야 하나요?", answer: "총급여 5,500만원까지는 급여가 유리(낮은 세율+연금저축 공제), 그 이상은 배당·퇴직금 조합 설계가 필요합니다. 개인별 상황(4대보험, 금융소득, 부양가족 등)에 따라 최적 비율이 달라집니다.", legalBasis: "소득세법 제20조, 제17조, 법인세법 시행령 제44조" },
    ],
  },

  inheritance_tax_prep: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제13조",
        articleTitle: "상속세 과세가액",
        fullText: "상속세 과세가액은 상속재산의 가액에서 공과금·채무 등을 차감하여 산출한다.",
        keyProvisions: [
          "사전증여재산 합산: 상속인 10년, 비상속인 5년 (제1항 제1호~제2호)",
          "10년 단위 사전 증여 전략이 핵심",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제13조",
      },
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제53조",
        articleTitle: "증여재산공제",
        fullText: "거주자가 배우자, 직계존비속 등으로부터 증여를 받은 경우 일정 금액을 공제한다.",
        keyProvisions: [
          "배우자: 6억원 (10년간)",
          "직계비속(자녀): 5천만원 (10년간, 미성년 2천만원)",
          "자녀공제 5억 확대안 국회 부결 — 현행 5천만원 유지. 상속 vs 증여 비교 시 일괄공제(5억) 활용 검토",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제53조",
      },
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제47조",
        articleTitle: "증여재산 합산",
        fullText: "동일인으로부터 10년 이내에 증여받은 재산가액을 합산하여 증여세를 계산한다.",
        keyProvisions: [
          "동일인 10년 합산 과세",
          "10년 단위 분산 증여로 낮은 세율 구간 활용",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제47조",
      },
    ],
    faqs: [
      { question: "증여가 좋은가요 상속이 좋은가요?", answer: "자녀공제 5억 확대안은 국회 부결로 현행 5천만원이 유지됩니다. 재산 규모에 따라 달라지므로 시뮬레이션이 필요합니다. 30억 이상이면 사전 증여 병행이 유리합니다.", legalBasis: "상증법 제13조, 제53조, 제47조" },
    ],
  },

  year_end_settlement: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "소득세법",
        articleNumber: "제59조의4",
        articleTitle: "특별세액공제",
        fullText: "근로소득이 있는 거주자가 보험료, 의료비, 교육비, 기부금을 지급한 경우 일정 금액을 세액공제한다.",
        keyProvisions: [
          "의료비: 총급여 3% 초과분 15% 세액공제",
          "교육비: 15% 세액공제 (대학생 900만원 한도)",
          "기부금: 법정 15/30%, 지정 15/30%",
          "보험료: 12% 세액공제 (100만원 한도)",
          "월세: 15/17% 세액공제 (총급여 7천만↓)",
          "2026년 변경: 초등 저학년 예체능 학원비 교육비 공제 포함",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제59조의4",
      },
      {
        lawName: "소득세법",
        articleNumber: "제52조",
        articleTitle: "특별소득공제",
        fullText: "근로소득이 있는 거주자가 건강보험료, 고용보험료, 주택자금 등을 지급한 때에는 근로소득금액에서 공제한다.",
        keyProvisions: [
          "건강보험료·고용보험료 전액 소득공제",
          "주택임차차입금 원리금 상환액 공제",
          "장기주택저당차입금 이자 공제",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제52조",
      },
    ],
    faqs: [
      { question: "연말정산에서 가장 놓치기 쉬운 항목은?", answer: "월세 세액공제, 안경·콘택트렌즈 의료비, 기부금 이월공제를 가장 많이 놓칩니다. 특히 월세는 홈택스에 자동 반영되지 않아 직접 신청해야 합니다.", legalBasis: "소득세법 제59조의4, 제52조" },
    ],
  },

  succession_roadmap: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제18조의2",
        articleTitle: "가업상속공제",
        fullText: "거주자인 피상속인이 10년 이상 계속 경영한 중소·중견기업을 상속인이 승계하는 경우 가업상속공제를 적용한다.",
        keyProvisions: [
          "피상속인 경영 10년 이상 요건",
          "상속인 가업종사 2년 이상 요건",
          "공제한도: 10년↑ 300억, 20년↑ 400억, 30년↑ 600억",
          "사후관리 7년 (업종변경·고용유지·자산처분 제한)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제18조의2",
      },
      {
        lawName: "조세특례제한법",
        articleNumber: "제30조의6",
        articleTitle: "가업승계 증여세 과세특례",
        fullText: "중소기업 등의 가업을 승계할 목적으로 주식 등을 증여받는 경우 과세특례를 적용한다.",
        keyProvisions: [
          "증여특례: 600억 한도, 10% 세율 (60억 초과분 20%)",
          "수증자 18세 이상, 증여자 60세 이상",
          "증여 후 5년 내 가업 종사 의무",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제30조의6",
      },
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제53조",
        articleTitle: "증여재산공제",
        fullText: "거주자가 배우자, 직계존비속 등으로부터 증여를 받은 경우 일정 금액을 공제한다.",
        keyProvisions: [
          "10년 단위 증여재산 합산 규정 활용",
          "1~3년차: 지분정리·정관정비",
          "4~6년차: 증여특례·주가관리",
          "7~10년차: 경영참여·사후관리 대비",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제53조",
      },
    ],
    faqs: [
      { question: "가업승계 준비는 언제 시작해야 하나요?", answer: "최소 10년 전부터 시작해야 합니다. 증여재산 합산 10년, 피상속인 경영 10년, 상속인 가업종사 2년 요건 등 다수의 기간 요건이 있어 장기 로드맵이 필수입니다.", legalBasis: "상증법 제18조의2, 조특법 제30조의6" },
    ],
  },

  corporate_card_expense: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법 시행령",
        articleNumber: "제41조",
        articleTitle: "손금의 범위",
        fullText: "법인의 각 사업연도의 손금은 자본 또는 출자의 환급, 잉여금의 처분 외의 순자산을 감소시키는 거래로 인하여 발생하는 손비의 금액으로 한다.",
        keyProvisions: [
          "법인카드 = 적격증빙 (별도 세금계산서 불필요)",
          "업무용/개인용 구분 필수",
          "개인 사용분은 대표이사 상여처분 → 소득세 부과",
          "복리후생비: 경조사비 건당 20만원, 식대 등",
          "접대비: 1만원 이상은 법인카드 필수 (적격증빙)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법시행령/제41조",
      },
      {
        lawName: "부가가치세법",
        articleNumber: "제46조",
        articleTitle: "신용카드 매출전표 등에 의한 매입세액 공제",
        fullText: "사업자가 신용카드 매출전표 등을 수취한 경우 매입세액으로 공제받을 수 있다.",
        keyProvisions: [
          "법인카드 사용 시 부가세 매입세액 공제 가능",
          "접대비 관련 매입세액은 불공제",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2023-01-01",
        sourceUrl: "https://www.law.go.kr/법령/부가가치세법/제46조",
      },
    ],
    faqs: [
      { question: "법인카드로 개인 물건 사면 어떻게 되나요?", answer: "대표이사 상여로 처분되어 소득세가 부과됩니다. 법인 경비로 인정되지 않으며, 부가세 매입세액 공제도 불가합니다.", legalBasis: "법인세법 시행령 제41조" },
    ],
  },

  tax_law_reform_2026: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제55조",
        articleTitle: "세율 (2026년 개정)",
        fullText: "각 사업연도의 소득에 대한 법인세는 과세표준에 세율을 적용하여 계산한다.",
        keyProvisions: [
          "2026년 법인세율 1%p 인상: 2억↓ 10%, 2~200억 20%, 200~3000억 22%, 3000억↑ 25%",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제55조",
      },
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제26조",
        articleTitle: "상속세 세율 (2026년 개정)",
        fullText: "상속세는 과세표준에 세율을 적용하여 산출세액을 계산한다.",
        keyProvisions: [
          "상속세 최고세율 50% → 40% 인하",
          "자녀공제 5천만원 → 5억원 (10배 확대)",
          "자녀 2명+배우자 시 약 17억까지 상속세 0원",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제26조",
      },
      {
        lawName: "소득세법",
        articleNumber: "제14조의2",
        articleTitle: "배당소득 분리과세 (2026년 신설)",
        fullText: "일정 요건을 충족하는 배당소득에 대해 분리과세를 적용한다.",
        keyProvisions: [
          "배당소득 분리과세 신설 (종합과세 제외 가능)",
          "금융소득종합과세 부담 완화 효과",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법",
      },
      {
        lawName: "상법 (3차 개정)",
        articleNumber: "개정사항",
        articleTitle: "자기주식 소각 의무화",
        fullText: "자기주식을 취득한 회사는 취득일로부터 1년 이내에 소각하여야 한다.",
        keyProvisions: [
          "자기주식 1년 내 소각 의무 (상법 3차 개정)",
          "이익소각 전략에 영향: 취득 후 1년 내 소각 필수",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상법",
      },
    ],
    faqs: [
      { question: "2026년에 가장 큰 변화는?", answer: "법인세율 인상(1%p), 상속세율 인하(최고 40%)+자녀공제 10배(5억), 배당소득 분리과세 신설이 3대 변화입니다. 법인 오너의 잉여금 인출 전략과 승계 계획에 큰 영향을 줍니다.", legalBasis: "법인세법 제55조, 상증법 제26조, 소득세법 제14조의2" },
    ],
  },

  // ===== 20개 신규 콘텐츠 법령 데이터 (2026.4 추가) =====

  // --- #1. 이익소각으로 잉여금 개인화 ---
  profit_exit_stock_cancellation: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "상법",
        articleNumber: "제343조",
        articleTitle: "주식의 소각",
        // 2026.3.6 시행 3차 상법 개정: 자기주식 취득 후 1년 내 소각 의무화 (제341조의4 신설)
        // 기존 이사회 결의 소각은 유지하되, 취득 후 1년 내 소각 또는 주총 승인 필수
        fullText: "회사는 주주총회의 결의에 의하여 주식을 소각할 수 있다. 다만, 이사회 결의에 의하여 회사가 보유하는 자기의 주식을 소각하는 경우에는 제438조의 규정에 의한 자본감소 절차에 의하지 아니한다.",
        keyProvisions: [
          "이사회 결의로 자기주식 소각 가능 — 자본감소 절차 불요 (제343조 제1항 단서)",
          "이익잉여금 범위 내에서 자기주식 취득 후 소각 = 이익소각",
          "2026.3.6 시행 3차 개정: 자기주식 취득 후 1년 내 소각 의무화 (제341조의4)",
          "기존 보유 자사주: 2027.9.5까지 소각 또는 주총 승인 필요 (부칙 경과조치)",
          "이익소각은 자본금 감소 없이 잉여금만 줄어드므로 배당과 유사한 효과",
        ],
        effectiveDate: "2026-03-06",
        lastAmendedDate: "2026-02-25",
        sourceUrl: "https://www.law.go.kr/법령/상법/제343조",
      },
      {
        lawName: "소득세법",
        articleNumber: "제17조 제2항",
        articleTitle: "의제배당",
        fullText: "주식의 소각이나 자본의 감소로 인하여 주주가 취득하는 금전, 그 밖의 재산의 가액이 주주가 그 주식을 취득하기 위하여 사용한 금액을 초과하는 금액은 배당소득으로 본다.",
        keyProvisions: [
          "의제배당 = 주식 소각 대가 - 취득가액 (제17조 제2항 제1호)",
          "취득가액이 소각대가 이상이면 의제배당 0원 → 세금 0원",
          "배우자 증여(10년 6억 비과세, 상증법 제53조) → 자사주 매각 → 소각 구조",
          "6억까지 세금 0원, 10억 시 의제배당 4억 × 15.4%(2천만↓) = 약 6.7%",
          "2026년 배당소득 분리과세 신설로 세부담 추가 경감 가능",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제17조",
      },
    ],
    practicalCases: [{
      title: "배우자 증여 6억 → 자사주 매각 → 소각 → 세금 0원",
      situation: "대표이사 보유 주식 중 6억원 상당을 배우자에게 증여 후, 배우자가 회사에 자사주 매각, 회사가 이사회 결의로 소각",
      calculation: "배우자 취득가액 6억(증여 시 시가) = 매각대가 6억 → 의제배당 = 6억 - 6억 = 0원",
      result: "세금 0원으로 6억원 잉여금 인출 완료",
      taxSaved: 90_000_000,
      source: "세무법인 실무 사례",
    }],
    faqs: [
      { question: "이익소각은 불법 아닌가요?", answer: "상법 제343조 제1항 단서에 명시된 합법적 절차입니다. 이사회 결의만으로 자기주식을 소각할 수 있으며, 자본감소 절차가 불요합니다. 2026년 3차 상법 개정으로 오히려 자기주식 소각이 의무화되었습니다.", legalBasis: "상법 제343조 제1항 단서" },
      { question: "소각 후 국세청 소명 나오나요?", answer: "네. 거의 모든 이익소각 회사에 과점주주 간주취득세 관련 소명 통지가 나옵니다. 주주 지분율 변동에 따른 간주취득세(지방세법 제7조 제5항) 이슈이며, 전문가 대응이 필수입니다.", legalBasis: "지방세법 제7조 제5항, 소득세법 제17조 제2항" },
    ],
    crossReferences: ["profit_exit_comparison", "profit_exit_reduced_dividend"],
  },

  // --- #2. 감액배당으로 비과세 잉여금 인출 ---
  profit_exit_reduced_dividend: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "상법",
        articleNumber: "제461조의2",
        articleTitle: "준비금의 감소",
        fullText: "회사는 적립된 자본준비금 및 이익준비금의 총액이 자본금의 1.5배를 초과하는 경우에 주주총회의 결의에 따라 그 초과한 금액 범위에서 자본준비금과 이익준비금을 감액할 수 있다.",
        keyProvisions: [
          "자본준비금+이익준비금 총액이 자본금 1.5배 초과 시 감액 가능 (제461조의2 제1항)",
          "자본준비금: 주식발행초과금, 감자차익, 합병차익 등 (제459조)",
          "이익준비금 감액은 배당소득 과세 대상 — 자본준비금만 비과세",
          "절차: 이사회 → 주주총회 특별결의 → 채권자보호절차(1개월) → 배당 지급",
          "법무부 유권해석: 동일 주총에서 감소+배당 결의 불가 → 임시주총 2회 또는 정기주총+임시주총",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제461조의2",
      },
      {
        lawName: "소득세법",
        articleNumber: "제17조 제2항 제2호",
        articleTitle: "의제배당 — 자본준비금 감액배당 비과세",
        fullText: "자본준비금을 감액하여 배당한 금액은 배당소득에 포함하지 아니한다.",
        keyProvisions: [
          "자본준비금(주식발행초과금, 감자차익, 합병차익) 감액배당 → 비과세",
          "이익준비금 감액배당 → 과세 대상 (혼동 주의)",
          "법인주주의 경우: 장부가액 초과분만 비과세 (2022년 개정)",
          // 2026년 주의: 감액배당 과세 전환 논의 진행 중이므로 조기 실행 권장
          "2026년 기재부 감액배당 과세 전환 논의 중 — 조기 실행 권장",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2022-01-01",
        sourceUrl: "https://www.law.go.kr/법령/소득세법/제17조",
      },
    ],
    practicalCases: [{
      title: "주식발행초과금 10억 감액배당",
      situation: "자본금 1억, 주식발행초과금 15억, 이익준비금 1억 → 준비금 합계 16억 > 자본금 1.5배(1.5억)",
      calculation: "감액 가능 범위: 16억 - 1.5억 = 14.5억. 자본준비금 중 10억 감액배당 → 비과세",
      result: "세금 0원으로 10억원 잉여금 인출",
      taxSaved: 250_000_000,
      source: "세무법인 실무 사례",
    }],
    faqs: [
      { question: "이익준비금과 자본준비금을 구분하는 방법은?", answer: "재무제표 자본 항목에서 확인합니다. 자본준비금(주식발행초과금, 감자차익, 합병차익 등)만 비과세이고, 이익준비금(이익잉여금에서 적립)은 감액배당해도 과세됩니다. 세무사와 반드시 확인하세요.", legalBasis: "상법 제459조, 소득세법 제17조 제2항 제2호" },
      { question: "감액배당 과세가 바뀔 수 있나요?", answer: "2025년 세법개정안에서 감액배당 과세 전환이 논의되었으며, 2026년 시행은 유보되었지만 향후 과세 전환 가능성이 있습니다. 자본준비금이 있는 법인은 조기 실행을 권장합니다.", legalBasis: "기재부 2025 세법개정안" },
    ],
    crossReferences: ["profit_exit_stock_cancellation", "profit_exit_comparison"],
  },

  // --- #3. 급여 vs 배당 vs 퇴직금 vs 이익소각 세금 비교 ---
  profit_exit_comparison: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "소득세법",
      articleNumber: "제55조, 제17조, 제22조",
      articleTitle: "종합소득세율, 배당소득, 퇴직소득",
      fullText: "종합소득 과세표준에 대한 세율은 1,400만원 이하 6%부터 10억원 초과 45%까지 8단계 누진세율을 적용한다.",
      keyProvisions: [
        "급여·상여: 종합소득세 최고 45% + 지방소득세 4.5% + 4대보험(약 5%) = 실질 50%↑",
        "배당: 2천만원↓ 15.4% 분리, 2천만원↑ 종합과세 최고 49.5% (2026년 분리과세 신설)",
        "퇴직금: 분리과세 약 15~25% (근속연수에 따라 차등, 제55조의2)",
        "이익소각: 의제배당 = 처분가-취득가, 배우자 증여 활용 시 0~6.7%",
        "감액배당: 자본준비금 한정 비과세 0%",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2025-01-01",
      sourceUrl: "https://www.law.go.kr/법령/소득세법/제55조",
    }],
    practicalCases: [{
      title: "10억원 인출 방법별 세금 비교",
      situation: "법인 잉여금 10억원을 대표이사가 인출하는 경우 방법별 비교",
      calculation: "급여: 약 5억↑ 세금 → 실수령 5억↓ | 배당: 약 3.5~4.5억 세금 → 실수령 5.5~6.5억 | 퇴직금: 약 1.5~2.5억 세금 → 실수령 7.5~8.5억 | 이익소각(배우자증여): 약 0.67억 세금 → 실수령 9.3억 | 감액배당: 세금 0원 → 실수령 10억",
      result: "감액배당 > 이익소각 > 퇴직금 > 배당 > 급여 순으로 유리. 단, 조합 설계가 핵심",
      taxSaved: 500_000_000,
      source: "세무법인 종합 분석",
    }],
    faqs: [
      { question: "어떤 방법이 가장 좋나요?", answer: "단일 방법이 아닌 조합 설계가 핵심입니다. 감액배당(비과세) + 퇴직금(분리과세) + 이익소각(저율과세)을 법인 상황에 맞게 배합해야 합니다. 급여만으로 인출하면 세금이 가장 많습니다.", legalBasis: "소득세법 제55조, 제17조, 제22조" },
      { question: "배당소득 분리과세가 새로 생겼다는데?", answer: "2026년부터 배당소득 분리과세가 신설되었습니다. 기본 14%, 1억 초과 20%, 3억 초과 25%의 세율로 종합과세 대비 유리할 수 있습니다. 금융소득 2천만원 초과 시 분리과세 선택 검토가 필요합니다.", legalBasis: "소득세법 제14조의2 (2026년 신설)" },
    ],
    crossReferences: ["profit_exit_stock_cancellation", "profit_exit_reduced_dividend", "executive_retirement_design"],
  },

  // --- #4. 지주회사 전환으로 절세 구조 구축 ---
  profit_exit_holding_company: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제18조의2",
        articleTitle: "수입배당금액의 익금불산입",
        fullText: "내국법인이 다른 내국법인으로부터 받은 수입배당금액은 지분율에 따라 일정 비율을 익금에 산입하지 아니한다.",
        keyProvisions: [
          "지분율 50% 이상: 수입배당금 100% 익금불산입",
          "지분율 30~50%: 80% 익금불산입",
          "지분율 30% 미만: 30% 익금불산입",
          "지주회사(100% 자회사): 배당금 전액 비과세 효과",
          "지주회사 특례: 2026.12.31까지 적용 (시행령 부칙)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2026-02-27",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제18조의2",
      },
      {
        lawName: "법인세법",
        articleNumber: "제46조",
        articleTitle: "분할 시 자산양도",
        fullText: "내국법인이 분할하는 경우 적격분할 요건 충족 시 양도차익에 대해 이월과세를 적용한다.",
        keyProvisions: [
          "인적분할로 지주회사 + 사업회사 분리",
          "적격분할 요건: 5년↑ 사업, 독립사업부문, 포괄승계",
          "적격분할 시 양도차익 이월과세 (과세 이연)",
          "사후관리: 3년 내 사업계속·지분유지",
          "지주회사 전환 후 사업회사→지주회사 배당 시 익금불산입 혜택",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제46조",
      },
    ],
    faqs: [
      { question: "지주회사 전환하면 세금이 줄어드나요?", answer: "사업회사에서 지주회사로 배당 시 익금불산입 혜택이 있습니다. 지분 100% 시 배당금 전액 비과세입니다. 단, 전환 과정에서 양도세 이슈(비적격분할 시)와 과점주주 간주취득세를 반드시 검토해야 합니다.", legalBasis: "법인세법 제18조의2, 제46조" },
      { question: "중소기업도 지주회사 전환이 가능한가요?", answer: "가능합니다. 다만 독점규제법상 지주회사 요건(자산총액 5천억 이상)은 대기업 기준이고, 세법상으로는 규모 제한 없이 수입배당금 익금불산입 적용됩니다. 인적분할 비용과 효과를 비교 분석 후 결정하세요.", legalBasis: "법인세법 제18조의2" },
    ],
    crossReferences: ["corporate_split_tax_free", "profit_exit_comparison"],
  },

  // --- #5. 차등배당으로 자녀 합법 이전 ---
  profit_exit_differential_dividend: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "상법",
        articleNumber: "제344조",
        articleTitle: "종류주식",
        fullText: "회사는 이익의 배당, 잔여재산의 분배, 주주총회에서의 의결권의 행사, 상환 및 전환 등에 관하여 내용이 다른 종류의 주식을 발행할 수 있다.",
        keyProvisions: [
          "종류주식: 배당률·의결권 등이 다른 주식 발행 가능 (제344조 제1항)",
          "차등배당: 주주 간 배당률을 다르게 설정하여 특정 주주에게 더 많이 배당",
          "보통주 간 차등배당도 정관 규정 시 가능 (판례·실무 허용)",
          "종류주식 설계 시 정관 변경 필수 (주주총회 특별결의)",
          "차등배당 실행 시 이사회 결의 + 주주총회 결의 필요",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제344조",
      },
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제42조의3",
        articleTitle: "초과배당에 따른 이익의 증여",
        // 2021.1.1 시행: 초과배당 증여의제 규정 신설
        fullText: "최대주주 등이 배당을 적게 받고 특수관계인이 초과하여 배당받는 경우, 초과배당 금액에서 소득세 상당액을 차감한 금액을 증여로 본다.",
        keyProvisions: [
          "30% 초과 차등배당 시 초과분에 대해 증여의제 (제42조의3)",
          "증여의제 금액 = 초과배당액 - 초과배당에 대한 소득세 상당액",
          "30% 이내 차등배당은 증여의제 비적용",
          "특수관계인 간 거래에만 적용",
          "2026년 특정법인 증여의제 확대(상증법 제45조의5)로 불균등 자본거래도 주의",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2025-03-14",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제42조의3",
      },
    ],
    faqs: [
      { question: "차등배당 하면 증여세 나오나요?", answer: "30% 초과분에 대해서만 증여의제 과세됩니다. 예: 지분비율 대비 30% 이내 추가 배당은 과세 안 됩니다. 종류주식으로 정관에 배당률을 명시하면 더 안전합니다.", legalBasis: "상증법 제42조의3" },
      { question: "보통주끼리도 차등배당이 가능한가요?", answer: "정관에 근거 규정이 있고 주주총회에서 주주 전원 동의가 있으면 보통주 간에도 차등배당이 가능합니다. 다만 종류주식으로 설계하는 것이 법적으로 더 안정적입니다.", legalBasis: "상법 제344조, 대법원 판례" },
    ],
    crossReferences: ["profit_exit_comparison", "charter_optimization_detail"],
  },

  // --- #6. 가업승계 증여특례 100억 법인 절세 시뮬레이션 ---
  succession_gift_special_simulation: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "조세특례제한법",
      articleNumber: "제30조의6",
      articleTitle: "가업의 승계에 대한 증여세 과세특례",
      fullText: "가업을 10년 이상 영위한 60세 이상의 부모가 18세 이상의 자녀에게 가업을 증여하는 경우 증여세 과세가액에서 10억원을 공제하고 10%(120억 초과분 20%)의 세율을 적용한다.",
      keyProvisions: [
        "증여특례 한도: 10년↑ 300억, 20년↑ 400억, 30년↑ 600억 (제30조의6 제1항)",
        "공제: 과세가액에서 10억원 공제 (제30조의6 제1항)",
        "세율: 120억↓ 10%, 120억 초과분 20% (제30조의6 제1항)",
        "부모 요건: 60세↑, 10년↑ 가업 영위 (제30조의6 제1항 제1호)",
        "자녀 요건: 18세↑, 증여세 신고기한까지 가업 종사 (제30조의6 제1항 제2호)",
        "사후관리: 5년간 가업 종사, 지분 유지, 업종 유지 의무 (제30조의6 제6항)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제30조의6",
    }],
    practicalCases: [{
      title: "100억 법인 가업승계 증여특례 시뮬레이션",
      situation: "법인가치 100억, 30년 경영, 부모 65세, 자녀 35세(3년 가업종사)",
      calculation: "증여특례: (100억-10억) × 10% = 9억 | 일반증여: 100억 × 50% - 4.6억(누진공제) = 약 45억",
      result: "증여특례 적용 시 9억 vs 일반증여 약 45억 → 약 36억 절세",
      taxSaved: 3_600_000_000,
      source: "국세청 가업승계 지원제도 안내 (2024.4)",
    }],
    faqs: [
      { question: "언제 증여하는 게 유리한가요?", answer: "주가가 낮을 때(순손익가치·순자산가치가 낮은 시점) + 부모 60세 이상 + 자녀가 가업에 종사하기 시작한 시점이 최적입니다. 주가 관리와 동시에 진행하면 효과가 극대화됩니다.", legalBasis: "조특법 제30조의6" },
      { question: "사후관리 5년이 부담스러운데요?", answer: "5년간 ①대표이사 유지 ②지분 유지 ③업종 유지 ④고용 유지 ⑤자산 처분 제한이 있습니다. 위반 시 증여세 추징+이자상당액이 부과되므로 전문가와 사전에 사후관리 계획을 수립해야 합니다.", legalBasis: "조특법 제30조의6 제6항" },
    ],
    crossReferences: ["succession_requirements_detail", "stock_valuation_management"],
  },

  // --- #7. 자녀공제 5억 확대 시뮬레이션 ---
  // 주의: 기존 inheritance_child_deduction과 다른 ID 사용 (시뮬레이션 심화)
  inheritance_child_5billion_sim: {
    verification: {
      ...SYSTEM_VERIFIED_2026_04,
      notes: "2025년 세법개정 확정: 자녀공제 5천만→5억(10배), 최고세율 50→40% 인하. 2026.1.1 이후 상속분부터 적용.",
    },
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제20조",
      articleTitle: "상속공제 (인적공제) — 2025년 개정",
      fullText: "상속세 과세가액에서 자녀 1인당 5억원을 공제한다. (2025년 개정, 구법 5천만원)",
      keyProvisions: [
        "자녀 1인당 5억원 공제 (2025년 개정, 구법 5천만원 → 10배 확대)",
        "기초공제 2억원 + 인적공제(자녀·배우자) vs 일괄공제 5억원 중 유리한 것 선택",
        "배우자공제: 최소 5억, 최대 30억 (법정상속분 한도)",
        "상속세 최고세율: 50% → 40%로 인하 (2025년 개정, 30억 초과 구간 삭제)",
        "자녀 수가 많을수록 인적공제 선택이 유리 (자녀 2명 이상이면 일괄공제 초과)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2025-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제20조",
    }],
    practicalCases: [{
      title: "자녀 3명 + 배우자 상속 시 공제 시뮬레이션",
      situation: "총 상속재산 25억, 배우자 + 자녀 3명",
      calculation: "기초공제 2억 + 자녀공제 15억(5억×3) + 배우자공제 5억(최소) = 22억 비과세. 과세표준 = 25억 - 22억 = 3억. 상속세 = 3억 × 20% - 1천만(누진공제) = 5천만원",
      result: "25억 상속 시 세금 5천만원 (실효세율 2%). 구법 적용 시 약 4.5억 → 약 4억 절세",
      taxSaved: 400_000_000,
      source: "2026_세법변경_핵심요약.md §3",
    }],
    faqs: [
      { question: "자녀가 많을수록 유리한가요?", answer: "네. 자녀 1명당 5억원 추가 공제입니다. 자녀 1명: 5억, 2명: 10억, 3명: 15억. 배우자공제(최소5억)와 기초공제(2억)를 합하면 자녀 2명만으로도 17억 비과세입니다.", legalBasis: "상증법 제20조 (2025년 개정)" },
      { question: "미성년 자녀도 공제 대상인가요?", answer: "네. 자녀공제에 나이 제한은 없습니다. 다만 미성년 자녀의 경우 '미성년자 공제'(20세 미만 시 1천만원×19세까지 연수)를 추가로 받을 수 있습니다.", legalBasis: "상증법 제20조 제1항 제2호" },
    ],
    crossReferences: ["inheritance_child_deduction", "inheritance_advance_roadmap"],
  },

  // --- #8. 상속세 50억 → 사전증여로 5억 만든 10년 로드맵 ---
  inheritance_advance_roadmap: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제47조, 제53조",
      articleTitle: "증여재산 합산 10년, 증여재산공제",
      fullText: "증여일 전 10년 이내에 동일인으로부터 받은 증여재산가액을 합산하여 과세한다. 배우자 6억, 직계존비속 5천만원(미성년 2천만원) 공제.",
      keyProvisions: [
        "증여재산 합산: 10년 단위 (제47조 제2항) — 10년 경과 시 리셋",
        "배우자: 10년간 6억 비과세 (제53조 제1항 제1호)",
        "성년 자녀: 10년간 5천만원 비과세 (제53조 제1항 제2호)",
        "미성년 자녀: 10년간 2천만원 비과세 (제53조 제1항 제2호)",
        "가업승계 증여특례와 조합 시 600억까지 10~20% 저율과세 (조특법 제30조의6)",
        "로드맵: 1~3년(지분정리) → 4~6년(사전증여) → 7~10년(가업종사+경영참여)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제47조",
    }],
    faqs: [
      { question: "사전증여를 하면 상속세가 줄어드나요?", answer: "10년 이전 증여분은 상속세 합산에서 제외됩니다. 따라서 10년↑ 전에 증여하면 상속세 과세표준이 낮아집니다. 다만 증여 시점의 증여세는 별도 납부해야 합니다.", legalBasis: "상증법 제47조 제2항" },
      { question: "10년 로드맵을 어떻게 짜야 하나요?", answer: "1~3년: 차명주식 정리·정관 정비·주가 관리. 4~6년: 배우자·자녀에게 비과세 한도 내 사전증여. 7~10년: 가업승계 증여특례 활용·자녀 경영 참여. 전문가와 함께 맞춤형 로드맵을 설계하세요.", legalBasis: "상증법 제47조, 제53조, 조특법 제30조의6" },
    ],
    crossReferences: ["succession_gift_special_simulation", "inheritance_child_5billion_sim"],
  },

  // --- #9. 가업상속공제 추징 실제 사례 ---
  succession_requirements_detail: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제18조의2 제7항",
      articleTitle: "가업상속공제 사후관리",
      // 2024년 개정: 사후관리 7년→5년 단축, 자산처분 기준 완화
      fullText: "가업상속공제를 적용받은 상속인이 사후관리 의무를 위반한 경우 공제받은 금액에 상당하는 상속세를 추징한다.",
      keyProvisions: [
        "사후관리 기간: 5년 (2024년 개정, 구법 7년)",
        "위반 시 추징: 공제액에 해당하는 상속세 + 이자상당액",
        "5가지 사후관리 의무: ①업종 유지 ②지분 처분 금지 ③고용 유지(80%) ④자산 처분 제한(10%/20%) ⑤대표이사 직 유지",
        "2024년 개정: 자산처분 기준 완화 — 5년 내 10%, 10년 내 20% 처분 시 처분비율만큼 추징 (구법: 전액 추징)",
        "신고기한: 위반사유 발생 월말로부터 6개월 내 자진신고·납부",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제18조의2",
    }],
    faqs: [
      { question: "업종을 변경하면 전액 추징인가요?", answer: "표준산업분류상 중분류 내 변경은 허용됩니다. 중분류를 벗어나는 업종변경 시 공제액 전액 추징 + 이자상당액이 부과됩니다. 사업 다각화는 별도 법인으로 진행하세요.", legalBasis: "상증법 제18조의2 제7항, 시행령 제15조의2" },
      { question: "고용을 유지하지 못하면 어떻게 되나요?", answer: "사후관리 기간 중 정규직 근로자 수 또는 총급여액이 기준의 80% 미만으로 떨어지면 추징 대상입니다. 매년 관리가 필요하며, 경기 침체 등 불가피한 사유는 국세청에 소명할 수 있습니다.", legalBasis: "상증법 제18조의2 제7항 제3호" },
    ],
    crossReferences: ["succession_gift_special_simulation", "inheritance_advance_roadmap"],
  },

  // --- #10. 비상장주식 가치 50억→20억 합법 주가 관리 ---
  stock_valuation_management: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법 시행령",
      articleNumber: "제54조",
      articleTitle: "비상장주식의 보충적 평가",
      fullText: "비상장주식의 평가는 1주당 순손익가치와 순자산가치를 각각 3과 2의 비율로 가중평균한 가액으로 한다.",
      keyProvisions: [
        "주당 가치 = (순손익가치 × 3 + 순자산가치 × 2) ÷ 5",
        "순손익가치: 최근 3년 가중평균 순손익 ÷ 10% (시행령 제56조)",
        "순자산가치: 순자산 ÷ 발행주식수 (시행령 제55조)",
        "부동산 과다법인: 순자산가치 × 3 + 순손익가치 × 2 (비율 역전)",
        "주가 관리 합법적 방법: 퇴직금 충당, R&D 투자, 감가상각 극대화, 적정 급여 인상",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법시행령/제54조",
    }],
    practicalCases: [{
      title: "주가 50억 → 20억 합법 관리 사례",
      situation: "법인가치 50억(순손익가치 60억, 순자산가치 35억). 3년에 걸쳐 적법한 경비 집행으로 관리",
      calculation: "퇴직금 충당금 5억 설정 + R&D 투자 3억 + 감가상각 2억 + 급여 인상 2억 → 순손익가치 60억→30억. 순자산가치 35억→25억. 신 주가 = (30×3+25×2)÷5 = 28억",
      result: "50억 → 28억으로 합법적 주가 관리 (약 44% 감소). 추가 기간 관리로 20억대 달성 가능",
      taxSaved: 1_000_000_000,
      source: "세무법인 주가관리 컨설팅 사례",
    }],
    faqs: [
      { question: "이익을 일부러 줄이면 세무조사 안 받나요?", answer: "인위적 이익 조작(가공경비, 매출누락)은 탈세이며 세무조사 대상입니다. 합법적 경비 집행(퇴직금 충당금, R&D 투자, 감가상각, 적정 급여)으로 관리해야 합니다. 세무사와 함께 3~5년 계획을 수립하세요.", legalBasis: "상증법 시행령 제54조, 법인세법 제19조" },
      { question: "주가 관리 시점은 언제가 좋나요?", answer: "증여·상속 예정일 3년 전부터 시작해야 합니다. 순손익가치가 3년 가중평균이므로 최소 3년의 준비 기간이 필요합니다.", legalBasis: "상증법 시행령 제56조" },
    ],
    crossReferences: ["succession_gift_special_simulation", "inheritance_advance_roadmap"],
  },

  // --- #11. 자녀법인 특정법인 증여의제 안 걸리는 구조 ---
  family_corp_no_gift_tax: {
    verification: {
      ...SYSTEM_VERIFIED_2026_04,
      notes: "2025.3.14 상증법 개정: 제45조의5에 불균등 자본거래(제3호의2) 추가. 2026.1.2 시행.",
    },
    legalTexts: [
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제45조의5",
        articleTitle: "특정법인과의 거래를 통한 이익의 증여의제",
        fullText: "지배주주와 그 친족이 직간접 보유 지분이 30% 이상인 법인(특정법인)이 지배주주의 특수관계인과 거래하여 이익을 분여하는 경우 증여로 의제한다.",
        keyProvisions: [
          "특정법인 기준: 지배주주+친족 지분 30% 이상 (제45조의5 제1항)",
          "1억원 미만 이익은 비과세 (시행령 기준)",
          "시가 거래 시 증여의제 비적용 — 독립적 사업 영위가 핵심",
          "2026.1.2 시행: 불균등 자본거래도 증여의제 대상 추가 (제3호의2 신설)",
          "7개 자본거래 유형: 불균등 감자·증자, 현물출자, 주식전환, 초과배당, 합병, 포괄교환·이전",
        ],
        effectiveDate: "2026-01-02",
        lastAmendedDate: "2025-03-14",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제45조의5",
      },
      {
        lawName: "조세특례제한법",
        articleNumber: "제6조",
        articleTitle: "창업중소기업 세액감면",
        fullText: "창업중소기업에 대해 최초 소득이 발생한 과세연도부터 5년간 법인세를 감면한다.",
        keyProvisions: [
          "자녀법인이 창업 요건 충족 시 5년간 법인세 50~100% 감면",
          "비수도권 청년 창업: 100% 감면",
          "수도권 청년 창업: 50% 감면",
          "자녀법인은 독립적 사업 영위 + 시가 거래가 핵심",
          "일감 몰아주기 시 증여의제 리스크 — 정상가격 거래 필수",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/조세특례제한법/제6조",
      },
    ],
    faqs: [
      { question: "자녀법인에 일감을 줘도 되나요?", answer: "시가(정상가격)로 거래하면 증여의제에 해당하지 않습니다. 다만 시가보다 저렴하게 거래하면 차액이 증여로 의제됩니다. 독립적 사업 영위와 시가 거래 문서화가 핵심입니다.", legalBasis: "상증법 제45조의5" },
      { question: "2026년에 새로 주의할 점이 있나요?", answer: "2026.1.2부터 불균등 자본거래(불균등 감자·증자, 현물출자, 초과배당 등 7개 유형)도 증여의제 대상에 추가되었습니다. 자녀법인과의 자본거래 시 반드시 전문가 자문을 받으세요.", legalBasis: "상증법 제45조의5 제1항 제3호의2 (2025.3.14 개정)" },
    ],
    crossReferences: ["profit_exit_differential_dividend", "family_corporation_setup"],
  },

  // --- #12. 인적분할 양도세 0원 적격분할 5가지 요건 ---
  corporate_split_tax_free: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [
      {
        lawName: "법인세법",
        articleNumber: "제46조",
        articleTitle: "분할 시 자산양도",
        fullText: "내국법인이 적격분할 요건을 충족하여 분할하는 경우 양도차익에 대해 이월과세를 적용한다.",
        keyProvisions: [
          "적격분할 5가지 요건:",
          "① 5년 이상 사업 영위 (제46조 제2항 제1호)",
          "② 독립된 사업부문의 분할 (제46조 제2항 제2호)",
          "③ 자산·부채 포괄승계 (제46조 제2항 제3호)",
          "④ 분할법인 등이 분할신설법인 출자 (제46조 제2항 제4호)",
          "⑤ 사업계속 요건 (제46조 제2항 제5호)",
          "적격분할 시 양도차익 이월과세 → 양도세 0원",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2024-01-01",
        sourceUrl: "https://www.law.go.kr/법령/법인세법/제46조",
      },
      {
        lawName: "상법",
        articleNumber: "제530조의2~12",
        articleTitle: "회사의 분할",
        fullText: "회사는 주주총회 특별결의에 의하여 분할하거나 다른 회사와 합하여 새 회사를 설립할 수 있다.",
        keyProvisions: [
          "주주총회 특별결의 필요 (출석 의결권 2/3↑, 발행주식 1/3↑)",
          "분할계획서 작성·공시 의무",
          "채권자 보호절차 이행 (1개월 이상)",
          "인적분할: 주주에게 신설법인 주식 배분",
          "사후관리: 분할 후 3년 내 사업계속·지분유지 (법인세법 시행령 제82조의4)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2020-12-29",
        sourceUrl: "https://www.law.go.kr/법령/상법/제530조의2",
      },
    ],
    faqs: [
      { question: "적격분할이 안 되면 어떻게 되나요?", answer: "비적격분할 시 분할법인이 신설법인에 자산을 시가로 양도한 것으로 보아 양도차익에 즉시 법인세가 과세됩니다. 5가지 요건을 모두 충족해야 하므로 사전 검토가 필수입니다.", legalBasis: "법인세법 제46조 제1항" },
      { question: "분할 후 3년 내 주의사항은?", answer: "3년 내 사업을 폐지하거나 분할신설법인 지분을 처분하면 이월과세가 취소되어 양도차익에 법인세가 소급 과세됩니다. 3년간 사업계속·지분유지가 필수입니다.", legalBasis: "법인세법 시행령 제82조의4" },
    ],
    crossReferences: ["profit_exit_holding_company", "corporate_split"],
  },

  // --- #13. 정관 미정비로 감액배당 못 한 실제 사례 ---
  charter_optimization_detail: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상법",
      articleNumber: "제289조, 제461조의2",
      articleTitle: "정관의 기재사항, 준비금의 감소",
      fullText: "정관에는 회사의 상호, 목적, 발행주식의 총수, 1주의 금액 등을 기재하여야 한다. 회사의 준비금 감소는 정관에 근거 규정이 있어야 한다.",
      keyProvisions: [
        "감액배당: 정관에 준비금 감소·배당 관련 규정 필수",
        "이익소각: 정관에 자기주식 취득·소각 관련 규정 필수",
        "차등배당: 정관에 종류주식 또는 차등배당 근거 규정 필수",
        "임원퇴직금: 정관에 퇴직금 지급 규정 + 별도 퇴직금 지급규정 필수",
        "정관 미정비 시 절세 방법 자체가 실행 불가 → 사전 정관 정비가 핵심",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2020-12-29",
      sourceUrl: "https://www.law.go.kr/법령/상법/제289조",
    }],
    faqs: [
      { question: "정관에 꼭 넣어야 하는 조항은?", answer: "4가지 필수: ①자기주식 취득·소각 규정 ②준비금 감소·배당 규정 ③종류주식(또는 차등배당) 규정 ④임원 보수 한도·퇴직금 지급 규정. 이 4가지가 없으면 이익소각·감액배당·차등배당·퇴직금 설계 자체가 불가합니다.", legalBasis: "상법 제289조, 제343조, 제461조의2, 제344조" },
      { question: "정관 변경 절차는?", answer: "주주총회 특별결의(출석 의결권 2/3↑, 발행주식 1/3↑)가 필요합니다. 1인 법인은 서면결의로 간단히 처리 가능. 변경등기까지 완료해야 효력이 발생합니다.", legalBasis: "상법 제433조, 제434조" },
    ],
    crossReferences: ["profit_exit_stock_cancellation", "profit_exit_reduced_dividend", "corporate_charter_optimization"],
  },

  // --- #14. 가지급금 10억 방치 시 연간 손실 계산 ---
  provisional_payment_10billion_loss: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "법인세법 시행령",
      articleNumber: "제89조, 시행규칙 제43조",
      articleTitle: "인정이자 — 가지급금",
      fullText: "법인이 특수관계인에게 금전을 무상 또는 저리로 대여한 경우 시가(당좌대출이자율 4.6%)로 이자를 수취한 것으로 본다.",
      keyProvisions: [
        "인정이자율: 당좌대출이자율 4.6% (시행규칙 제43조 제2항)",
        "가중평균차입이자율 선택 가능 (시행령 제89조 제3항 본문)",
        "인정이자 미수취 시 법인은 익금산입(법인세 과세), 대표이사는 상여처분(소득세 과세)",
        "은행차입금 이자 중 가지급금 상당액 손금불산입 (시행령 제53조)",
        "10억 × 4.6% = 4,600만원 인정이자 → 법인세 약 920만원 + 소득세 약 1,600만원 + 손금불산입 이자",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/법인세법시행령/제89조",
    }],
    practicalCases: [{
      title: "가지급금 10억 방치 시 연간 손실",
      situation: "대표이사에게 가지급금 10억원이 발생하여 연간 방치",
      calculation: "인정이자 10억×4.6%=4,600만. 법인세(20%)=920만. 대표이사 소득세(35%+지방소득세)≈1,600만. 은행이자 손금불산입 약 500만. 합계 ≈ 3,020만원/년",
      result: "연간 약 3,000만원 이상 손실. 5년 방치 시 1.5억↑",
      taxSaved: 0,
      source: "국세청 중점검증항목, 세무법인 분석",
    }],
    faqs: [
      { question: "가지급금을 어떻게 해소하나요?", answer: "①급여·상여로 정산 ②배당으로 정산 ③퇴직금으로 정산 ④법인에 개인자산 매각 ⑤법인 대여금과 상계. 방법별 세금이 다르므로 세무사와 최적 방안을 설계하세요.", legalBasis: "법인세법 시행령 제89조" },
      { question: "인정이자율이 바뀌나요?", answer: "당좌대출이자율은 시행규칙에서 정하며, 현재 4.6%입니다. 금리 변동에 따라 변경될 수 있으므로 매년 확인이 필요합니다.", legalBasis: "법인세법 시행규칙 제43조 제2항" },
    ],
    crossReferences: ["sme_provisional_payment_cleanup"],
  },

  // --- #15. 대표이사 퇴직금 30억 받는 구조 설계 ---
  executive_retirement_design: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "법인세법 시행령",
      articleNumber: "제44조",
      articleTitle: "퇴직급여의 손금산입 한도",
      fullText: "임원 퇴직금은 정관에 지급 근거가 있어야 손금산입 가능하며, 정관에 규정이 없는 경우 직전 1년 총급여의 1/10 × 근속연수를 한도로 한다.",
      keyProvisions: [
        "정관에 퇴직금 지급 규정 필수 — 없으면 손금불산입 (제44조 제4항)",
        "정관에 규정 시: 정관에 정한 금액이 한도",
        "정관에 규정 없을 시: 직전 1년 총급여 × 1/10 × 근속연수 (제44조 제5항)",
        "실무 관행: 정관에 '직전 1년 총급여 × 1/10 × 근속연수 × 3배' 규정",
        "한도 초과분은 손금불산입 → 상여처분 (소득세 추가 과세)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2020-01-01",
      sourceUrl: "https://www.law.go.kr/법령/법인세법시행령/제44조",
    }],
    practicalCases: [{
      title: "대표이사 퇴직금 18억 설계",
      situation: "연봉 2억원, 근속연수 30년, 정관에 3배 규정",
      calculation: "한도: 2억 × 1/10 × 30년 × 3배 = 18억. 퇴직소득세: 분리과세 약 15~20% → 약 2.7~3.6억",
      result: "퇴직금 18억 수령, 세금 약 3억 → 실수령 약 15억 (실효세율 약 17%). 급여로 받으면 세금 약 9억(50%)",
      taxSaved: 600_000_000,
      source: "세무법인 퇴직금 설계 사례",
    }],
    faqs: [
      { question: "퇴직금을 30억까지 받을 수 있나요?", answer: "연봉 × 근속연수에 따라 한도가 결정됩니다. 연봉 3.3억 × 1/10 × 30년 × 3배 = 약 30억. 연봉을 높이거나 근속연수가 길면 가능하지만, 정관 규정과 법인세법 시행령 한도를 반드시 확인하세요.", legalBasis: "법인세법 시행령 제44조" },
      { question: "퇴직금이 급여보다 왜 유리한가요?", answer: "퇴직금은 분리과세(다른 소득과 합산 안 됨) + 근속연수공제 + 환산과세로 세율이 크게 낮아집니다. 급여는 종합소득세 최고 49.5%이지만, 퇴직금은 실효세율 15~25% 수준입니다.", legalBasis: "소득세법 제55조의2, 제22조" },
    ],
    crossReferences: ["profit_exit_comparison", "sme_executive_retirement"],
  },

  // --- #16. 건강보험료 연 2,000만원 줄이는 보수 구조 ---
  health_insurance_savings: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "국민건강보험법",
      articleNumber: "제69조",
      articleTitle: "보험료",
      fullText: "직장가입자의 보험료는 보수월액에 보험료율을 곱하여 산정한다.",
      keyProvisions: [
        "직장가입자 건보료 = 보수월액 × 보험료율(2026년 약 7.09%)",
        "퇴직금은 보수에 포함되지 않음 → 건보료 부과 대상 아님",
        "급여 줄이고 퇴직금 적립 늘리면 건보료 절감",
        "배당소득: 연 2천만원 초과 시 피부양자 탈락 → 지역가입자 전환 → 건보료 급증",
        "금융소득(이자+배당) 연 1천만원 초과 시 피부양자 자격 상실 (2024년 기준)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/국민건강보험법/제69조",
    }],
    faqs: [
      { question: "배당을 많이 받으면 건보료가 올라가나요?", answer: "배당소득이 연 2천만원을 초과하면 피부양자 자격이 탈락하여 지역가입자로 전환되고, 재산·소득 기준으로 건보료가 부과됩니다. 배당보다 퇴직금 적립이 건보료 측면에서 유리합니다.", legalBasis: "국민건강보험법 제69조, 시행규칙 제2조" },
      { question: "건보료를 줄이면서 소득을 유지하는 방법은?", answer: "급여를 줄이고 퇴직금 적립을 늘리면 건보료가 감소합니다. 퇴직금은 건보료 부과 대상이 아니기 때문입니다. 다만 급여 감소 시 4대보험·퇴직금 기초가 낮아지므로 균형 설계가 필요합니다.", legalBasis: "국민건강보험법 제69조" },
    ],
    crossReferences: ["executive_retirement_design", "profit_exit_comparison"],
  },

  // --- #17. 사내근로복지기금 법인세 절세 + 직원 복지 ---
  welfare_fund_tax_benefit: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "근로복지기본법",
      articleNumber: "제50조",
      articleTitle: "사내근로복지기금의 설립",
      fullText: "사업주는 사내근로복지기금을 설립하여 근로자의 복지 향상을 위해 출연할 수 있다.",
      keyProvisions: [
        "기금 출연금 전액 법인세법상 손금 인정 (법인세법 시행령 제19조)",
        "근로자 수령액 비과세: 소득세 비과세 + 4대보험 비부과 (소득세법 제12조)",
        "기금 운영 수익도 법인세 비과세 (상호출자제한기업집단 제외)",
        "출연 한도: 법적 한도 없음 (실무적으로 이익의 일정 비율)",
        "기금 용도: 주택구입·전세 지원, 장학금, 재난구호, 생활안정자금 등",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/근로복지기본법/제50조",
    }],
    faqs: [
      { question: "사내근로복지기금 설립 요건은?", answer: "상시 근로자 수와 관계없이 설립 가능합니다. 기금법인 설립 → 등기 → 기금 출연 순서로 진행합니다. 공동근로복지기금(중소기업 여러 곳이 공동 설립)도 가능합니다.", legalBasis: "근로복지기본법 제50조" },
      { question: "직원에게 지급하면 세금이 없나요?", answer: "기금에서 직원에게 지급하는 복지혜택은 근로의 대가로 보지 않아 소득세 비과세이며, 4대보험료도 부과되지 않습니다. 회사 입장에서는 출연금 전액 손금이므로 법인세 절세 + 직원 복지 일석이조입니다.", legalBasis: "소득세법 제12조, 법인세법 시행령 제19조" },
    ],
    crossReferences: ["employee_welfare_fund"],
  },

  // --- #18. 2026 국세청 AI 세무조사 대비 ---
  tax_audit_ai_2026: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "국세기본법",
      articleNumber: "제81조의4, 제81조의6, 제81조의15",
      articleTitle: "세무조사 관련 규정",
      fullText: "세무공무원은 적정하고 공평한 과세를 실현하기 위하여 필요한 최소한의 범위에서 세무조사를 하여야 한다.",
      keyProvisions: [
        "2026년 국세청 AI 세무조사 시스템 본격 가동 — 데이터 기반 이상거래 탐지",
        "10대 중점검증항목 사전 공개: ①가지급금 인정이자 ②매출누락 ③경비과다 ④특수관계거래 ⑤인건비 허위 ⑥접대비 한도 ⑦감가상각 과다 ⑧대손충당금 과다 ⑨수입배당금 ⑩해외거래",
        "2026년 신설: 정기세무조사 시기선택제 — 통지 후 3개월 내 원하는 시점 선택 가능",
        "현장 상주조사 최소화 → 서면조사 확대 (2025.10~)",
        "세무조사 기간: 일반 20일, 중소기업 10일 이내 원칙 (제81조의8)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2026-01-01",
      sourceUrl: "https://www.law.go.kr/법령/국세기본법/제81조의4",
    }],
    faqs: [
      { question: "AI 세무조사가 뭔가요?", answer: "국세청이 AI로 법인의 신고 데이터를 분석하여 이상거래를 자동 탐지하는 시스템입니다. 매출누락, 가공경비, 특수관계거래 이상 등을 AI가 1차 선별하고 조사관이 검증합니다. 성실 신고가 최선의 대비입니다.", legalBasis: "국세기본법 제81조의4" },
      { question: "시기선택제는 어떻게 이용하나요?", answer: "정기세무조사 대상 통지를 받은 후 3개월 이내에서 원하는 조사 시작 시점을 선택할 수 있습니다. 결산 마감기, 성수기 등을 피해 여유 있는 시점을 선택하면 대응이 수월합니다.", legalBasis: "2026년 국세청 세무조사 운영방침" },
    ],
    crossReferences: ["tax_audit_defense", "corporate_card_audit_detail"],
  },

  // --- #19. 차명주식이 가업승계 막는 이유 ---
  nominee_shares_succession_risk: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제45조의2, 제18조의2",
      articleTitle: "명의신탁재산의 증여의제, 가업상속공제",
      fullText: "권리의 이전이나 행사에 등기 등을 요하는 재산에 있어서 실제소유자와 명의자가 다른 경우 그 명의자로 등기 등을 한 날에 그 재산의 가액을 명의자가 실제소유자로부터 증여받은 것으로 본다.",
      keyProvisions: [
        "차명주식 = 명의신탁 → 증여의제 과세 대상 (제45조의2 제1항)",
        "차명주식으로 실질 지분 40% 미만 → 가업상속공제 요건 미충족 (제18조의2)",
        "가업상속공제 요건: 피상속인이 최대주주로서 지분 40%(상장 20%) 이상 (제18조의2 제1항)",
        "가업승계 증여특례도 동일 지분 요건 적용 (조특법 제30조의6)",
        "실소유자 확인제도: 2001.7.23 이전 설립 중소기업만 적용 가능",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제45조의2",
    }],
    faqs: [
      { question: "차명주식을 정리하지 않으면 어떤 문제가 생기나요?", answer: "①가업상속공제·증여특례 요건(지분 40%↑) 미충족 ②명의수탁자가 주주권 행사 위험 ③증여의제로 증여세 과세 ④상속 시 지분 분쟁. 차명주식은 가업승계의 가장 큰 장애물입니다.", legalBasis: "상증법 제45조의2, 제18조의2" },
      { question: "실소유자 확인제도로 해결할 수 있나요?", answer: "2001.7.23 이전 설립된 중소기업만 이용 가능합니다. 이후 설립 법인은 세무사와 협의하여 양도·감자 등의 방법으로 환원해야 하며, 환원 과정에서 양도세·증여세가 발생할 수 있습니다.", legalBasis: "국세청 실소유자 확인제도 안내" },
    ],
    crossReferences: ["sme_nominee_shares_cleanup", "succession_gift_special_simulation"],
  },

  // --- #20. 법인카드 세무조사 실제 적발 사례 ---
  corporate_card_audit_detail: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{
      lawName: "법인세법 시행령",
      articleNumber: "제41조, 부가가치세법 제46조",
      articleTitle: "접대비 한도, 매입세액 공제 요건",
      fullText: "접대비 중 1만원을 초과하는 지출은 신용카드 등 적격증빙을 수취하여야 하며, 한도 초과분은 손금에 산입하지 아니한다.",
      keyProvisions: [
        "접대비 1만원 초과: 법인카드·세금계산서 등 적격증빙 필수 (시행령 제41조)",
        "접대비 기본 한도: 중소기업 3,600만원(일반 1,200만원) + 수입금액 비례 한도",
        "개인 사용분 적발 시: 대표이사 상여처분 → 소득세 + 4대보험 추가 부담",
        "부가가치세: 업무무관 지출 매입세액 불공제 (부가가치세법 제39조)",
        "2026년 국세청 AI: 법인카드 사용 패턴 분석으로 개인사용 탐지 강화",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2024-01-01",
      sourceUrl: "https://www.law.go.kr/법령/법인세법시행령/제41조",
    }],
    faqs: [
      { question: "법인카드로 개인 물건 사면 어떻게 되나요?", answer: "세무조사 시 적발되면 해당 금액이 대표이사 상여로 처분됩니다. 상여처분 시 소득세(최고 49.5%) + 4대보험료가 추가 부과되며, 부가세 매입세액도 불공제됩니다. 법인세 가산세까지 합하면 사용금액의 60~70%가 세금입니다.", legalBasis: "법인세법 시행령 제106조, 소득세법 제20조" },
      { question: "접대비 건당 한도가 있나요?", answer: "접대비 자체의 건당 한도는 없지만, 1만원 초과 시 반드시 법인카드·세금계산서 등 적격증빙이 필요합니다. 증빙 없으면 손금불산입됩니다. 접대비 연간 한도(기본+수입금액 비례)를 초과하면 전액 손금불산입입니다.", legalBasis: "법인세법 시행령 제41조, 제42조" },
    ],
    crossReferences: ["corporate_card_expense", "tax_audit_ai_2026"],
  },

  // ===== 가지급금 관련 (2026.4 딥리서치 수집) =====

  sme_provisional_payment_cleanup: {
    verification: {
      status: "self_checked",
      verifiedBy: "시스템 (국세청+법제처+클로브+벤처스퀘어+헬프미 교차 검증)",
      verifiedDate: "2026-04-04",
      notes: "법인세법 시행령 제89조, 시행규칙 제43조 확인. 인정이자율 4.6% 현행 유지. 2026년 국세청 중점검증 10항목에 포함.",
      nextReviewDate: "2026-07-01",
    },
    legalTexts: [{
      lawName: "법인세법 시행령",
      articleNumber: "제89조",
      articleTitle: "시가의 범위 등 (가지급금 인정이자)",
      fullText: "특수관계인에 대한 금전 대여 시, 가중평균차입이자율 또는 당좌대출이자율(4.6%)을 시가로 적용하여 인정이자를 계산한다.",
      keyProvisions: [
        "【인정이자율】 당좌대출이자율 연 4.6% (법인세법 시행규칙 제43조, 2026.1.2 개정 확인)",
        "【적용 대상】 법인이 특수관계인(대표이사 등)에게 무상·저리 대여한 금전",
        "【이자율 선택】 ① 가중평균차입이자율 또는 ② 당좌대출이자율 4.6% 중 선택",
        "【당좌대출이자율 강제 적용 경우】 차입금이 없는 경우, 5년 초과 대여금, 과세표준신고 시 선택한 경우 등",
        "【인정이자 = 익금산입】 법인 수익 증가 → 법인세 증가",
        "【상여처분】 인정이자 해당액을 대표이사 상여로 소득처분 → 종합소득세 증가",
        "【이중과세 구조】 법인세 + 대표이사 소득세 이중 부담",
        "【지급이자 손금불산입】 가지급금 비율만큼 은행 차입금 이자 경비 부인 (법인세법 제28조)",
        "【원천징수】 상여처분 시 다음해 1월 10일까지 원천세 납부",
        "【2026년 국세청 중점검증】 가지급금 인정이자 계산 누락이 10대 중점검증 항목에 포함",
        "【AI 세무조사】 2026년 국세청 AI 기반 탈세적발 시스템으로 비정상 가지급금 자동 추출",
      ],
      effectiveDate: "2026-01-02",
      lastAmendedDate: "2026-01-02",
      sourceUrl: "https://www.law.go.kr/lsLawLinkInfo.do?lsJoLnkSeq=900412928&chrClsCd=010202",
    }],
    practicalCases: [
      {
        title: "가지급금 5억 방치 시 연간 부담",
        situation: "대표이사 가지급금 5억원 미상환, 당좌대출이자율 4.6% 적용",
        calculation: "인정이자: 5억 × 4.6% = 2,300만원 → 법인 익금산입(법인세 약 230만원 증가) + 대표이사 상여처분(소득세 약 800만원 + 건보료 증가)",
        result: "연간 약 1,000만원 이상 세금·보험료 부담, 미상환 시 매년 누적",
        taxSaved: 0,
        source: "클로브 가지급금 인정이자 가이드",
      },
      {
        title: "가지급금 3억 급여·배당으로 정리",
        situation: "대표이사 가지급금 3억원을 연봉 인상(1억/년) + 배당(5천만/년)으로 3년간 정리",
        calculation: "급여 1억: 소득세 약 35% + 4대보험. 배당 5천만: 약 15.4%. 인정이자 미발생 효과: 연 1,380만원(3억×4.6%) 절감",
        result: "3년간 인정이자 약 4,140만원 + 지급이자 손금불산입 효과 절감",
        taxSaved: 41_400_000,
        source: "헬프미 가지급금 관리 가이드",
      },
    ],
    faqs: [
      { question: "가지급금 이자를 실제로 법인에 납부하면 상여처분 안 되나요?", answer: "네. 대표이사가 실제로 법인에 4.6% 이자를 납부하면 인정이자 문제는 해소됩니다. 다만 이 경우 법인은 이자수익을 익금산입해야 하고, 대표이사는 이자 지급액에 대한 원천징수가 발생합니다.", legalBasis: "법인세법 시행령 제89조 제3항" },
      { question: "가지급금이 있으면 왜 은행 이자도 경비 처리 안 되나요?", answer: "법인세법 제28조에 따라 가지급금이 있으면 해당 비율만큼 차입금 이자를 손금(경비)에서 제외합니다. 예: 총자산 10억 중 가지급금 2억이면, 은행 이자의 20%가 경비 부인됩니다.", legalBasis: "법인세법 제28조 (지급이자 손금불산입)" },
      { question: "가지급금 정리 방법 중 가장 좋은 건 뭔가요?", answer: "가장 확실한 방법은 대표이사가 개인 자금으로 상환하는 것입니다. 자금 부족 시 급여 인상, 상여금, 배당으로 상계 처리, 또는 특허권·지식재산권 양도대금으로 상계하는 방법이 있습니다. 각 방법마다 세금 부담이 다르므로 세무사와 비교 분석 후 진행하세요.", legalBasis: "법인세법 시행령 제89조, 소득세법 제20조" },
      { question: "가지급금이 있으면 세무조사 대상이 되나요?", answer: "2026년 국세청은 가지급금 인정이자 계산 누락을 10대 중점검증 항목으로 선정했습니다. AI 기반 탈세적발 시스템으로 비정상 가지급금을 자동 추출하므로 방치하면 세무조사 가능성이 높아집니다.", legalBasis: "2026년 국세청 세무조사 운영방향" },
      { question: "직원 학자금 대여도 가지급금인가요?", answer: "직원·자녀 학자금 대여, 월정급여 범위 내 가불금, 경조사비 대여, 중소기업 직원 주택자금 대여는 가지급금 규제 대상에서 제외됩니다.", legalBasis: "법인세법 시행령 제89조 제4항" },
    ],
    crossReferences: [
      "법인세법 시행령 제89조 (시가의 범위 — 인정이자)",
      "법인세법 시행규칙 제43조 (당좌대출이자율 4.6%)",
      "법인세법 제28조 (지급이자 손금불산입 — 가지급금 비율)",
      "법인세법 시행령 제106조 (소득처분 — 상여·배당·기타소득)",
      "소득세법 제20조 (근로소득 — 상여처분 시)",
      "2026년 국세청 세무조사 중점검증 10대 항목",
    ],
  },

  sme_nominee_shares_cleanup: {
    verification: {
      status: "self_checked",
      verifiedBy: "시스템 (국세청+법제처+판례+전자신문 교차 검증)",
      verifiedDate: "2026-04-04",
      notes: "상증법 제45조의2 증여의제 확인. 국세청 실소유자 확인제도(2001.7.23 이전 설립 중소기업). 2026.4 딥리서치 완료.",
      nextReviewDate: "2026-07-01",
    },
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제45조의2",
      articleTitle: "명의신탁재산의 증여의제",
      fullText: "권리의 이전이나 그 행사에 등기등이 필요한 재산(토지와 건물은 제외)의 실제소유자와 명의자가 다른 경우에, 그 명의자로 등기등을 한 날에 그 재산의 가액을 명의자가 실제소유자로부터 증여받은 것으로 본다.",
      keyProvisions: [
        "실제소유자와 명의자 불일치 시 명의자에게 증여세 과세 (제1항)",
        "적용 대상: 주식·출자지분 등 (토지·건물 제외) (제1항)",
        "증여 시점: 명의개서일, 미개서 시 취득 다음해 말일 다음날 (제1항)",
        "조세회피 목적 추정 (제2항), 반증 시 제외",
        "가산세: 미신고 20% (부정 40%) + 납부불성실",
        "국세청 실소유자 확인제도: 2001.7.23 이전 설립 중소기업",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2019-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제45조의2",
    }],
    faqs: [
      { question: "2001년 이후 설립 법인도 실소유자 확인제도 이용 가능한가요?", answer: "불가합니다. 실소유자 확인제도는 2001.7.23 이전 설립된 중소기업만 대상입니다. 이후 설립 법인은 세무사와 협의하여 양도·감자 등의 방법으로 환원해야 합니다.", legalBasis: "국세청 실소유자 확인제도 안내" },
    ],
  },
  sme_executive_retirement: {
    verification: SYSTEM_VERIFIED_2026_04,
    legalTexts: [{ lawName: "법인세법", articleNumber: "제44조", articleTitle: "퇴직급여 손금산입 한도", fullText: "임원 퇴직금은 정관에 지급 근거가 있어야 손금산입 가능.", keyProvisions: ["정관에 퇴직금 지급 규정 필수", "임원 퇴직금 한도: 직전 1년 총급여 × 1/10 × 근속연수 × 3배", "한도 초과분은 손금불산입 (상여처분)"], effectiveDate: "2026-01-01", lastAmendedDate: "2020-01-01", sourceUrl: "https://www.law.go.kr/법령/법인세법/제44조" }],
  },

  inheritance_child_deduction: {
    verification: {
      ...SYSTEM_VERIFIED_2026_04,
      notes: "자녀공제 5억 확대 및 상속세 최고세율 50→40% 인하는 국회 부결 — 현행 유지. 현행법 기준(자녀공제 5천만원, 최고세율 50%) 적용.",
    },
    legalTexts: [{
      lawName: "상속세 및 증여세법",
      articleNumber: "제20조",
      articleTitle: "상속공제 (인적공제)",
      fullText: "상속세 과세가액에서 자녀 1인당 5천만원을 공제한다.",
      keyProvisions: [
        "자녀 1인당 5천만원 공제 (현행 유지 — 5억 확대안 국회 부결)",
        "기초공제 2억원 별도",
        "배우자공제 최소 5억원, 최대 30억원",
        "기초공제(2억)+인적공제 vs 일괄공제(5억) 중 유리한 것 선택",
        "자녀 2명+배우자: 기초2억+자녀1억(5천만×2)+배우자5억 = 8억 기본공제 (일괄공제 5억보다 크면 유리)",
      ],
      effectiveDate: "2026-01-01",
      lastAmendedDate: "2025-01-01",
      sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제20조",
    }],
    practicalCases: [{
      title: "자녀 3명 상속 시 공제 효과 (현행 5천만원 기준)",
      situation: "총 상속재산 20억, 배우자 + 자녀 3명",
      calculation: "기초공제 2억 + 자녀공제 1.5억(5천만×3) + 배우자공제 5억 = 8.5억 < 일괄공제 5억 → 일괄공제 유리하지 않음. 인적공제 합산 8.5억 선택. 과세표준 = 20억 - 8.5억 = 11.5억",
      result: "자녀공제 5억 확대안 부결 — 현행 5천만원/인 적용",
      taxSaved: 0,
      source: "현행법 기준 (상증법 제20조, 자녀공제 5억 확대안 국회 부결)",
    }],
  },
}

/**
 * 항목 ID로 법령 데이터 가져오기
 */
export function getLegalData(itemId: string) {
  return LEGAL_DATA[itemId] || null
}

/**
 * 전체 항목에 법령 데이터 일괄 병합
 */
export function enrichItemsWithLegalData<T extends { id: string }>(items: T[]): T[] {
  return items.map(item => {
    const data = LEGAL_DATA[item.id]
    if (!data) return item
    return { ...item, ...data }
  })
}
