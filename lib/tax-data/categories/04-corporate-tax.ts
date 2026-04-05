// ============================================================
// 04. 법인세 절세 항목
// ============================================================

import type { TaxSavingItem } from "@/types/tax-database"

export const corporateTax: TaxSavingItem[] = [
  {
    id: "corp_startup_reduction",
    version: "2026.2", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "창업감면",
    savingType: "reduction", targetAudience: ["corporation", "youth"],
    name: "창업중소기업 세액감면 (2026 지역 세분화)",
    shortDescription: "창업 후 5년간 법인세 50~100% 감면 — 2026년부터 수도권 구분 세분화",
    fullDescription: `창업 후 5년간 법인세(또는 소득세)를 감면하는 제도로, 2026.1.1 이후 창업분부터 지역 구분이 세분화됩니다.

■ 2026년 감면율 (2026.1.1 이후 창업분)
  지역별 구분 3단계로 세분화:
  ① 수도권 과밀억제권역: 50% 감면
  ② 비과밀억제 수도권 (과밀 외 수도권): 75% 감면  ← 2026년 신설
  ③ 수도권 외 지역 또는 인구감소지역: 100% 감면

■ 청년 창업자 (만 15~34세, 병역복무 최대 6년 추가)
  동일 지역 기준 적용 (동일 감면율)

■ 감면 적용 요건
  - 조세특례제한법 §6③ 해당 업종: 제조업, 건설업, 출판업, 음식점업 등 18개 업종
  - 창업일로부터 5년간 (매년 법인세 신고 시 신청)
  - 최소 고용인원 기준 별도 확인 필요`,
    tags: ["창업감면", "중소기업", "청년창업", "법인세감면", "수도권세분화"],
    impactLevel: "very_high", maxSavingAmount: 100_000_000, applicableRate: "50%(과밀) / 75%(비과밀수도권) / 100%(비수도권·인구감소)",
    requirements: [
      { id: "req_1", description: "중소기업 창업", type: "business_type", critical: true },
      { id: "req_2", description: "조세특례제한법 §6③ 업종 해당 (18개 업종)", type: "business_type", value: "제조업, 건설업 등 18개 업종", critical: true },
      { id: "req_3", description: "2026.1.1 이후 창업분에 세분화 감면율 적용", type: "period", critical: false },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제6조", url: "https://www.law.go.kr/LSW//lsLawLinkInfo.do?lsJoLnkSeq=900239530&chrClsCd=010202&lsId=001584", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "corp_tax", label: "법인세 산출세액", type: "number", unit: "원", required: true },
      { id: "region", label: "사업장 소재지", type: "select", options: [
        { label: "수도권 과밀억제권역 (50% 감면)", value: "capital_metro" },
        { label: "비과밀억제 수도권 (75% 감면)", value: "capital_non_metro" },
        { label: "수도권 외 / 인구감소지역 (100% 감면)", value: "non_capital" },
      ], required: true },
      { id: "is_youth", label: "청년 대표 여부 (만15~34세)", type: "boolean", required: true },
    ],
    calculationFormula: "감면세액 = 산출세액 × 감면율. 과밀: 50%, 비과밀수도권: 75%, 비수도권·인구감소: 100%",
    urgency: "year_round", difficulty: "medium",
    steps: [
      "① 사업장이 수도권 과밀억제권역인지 확인 (국토교통부 고시)",
      "② 비과밀억제 수도권 해당 시 75% 감면 (2026년 신설 구간)",
      "③ 업종 해당 여부 확인 (18개 업종)",
      "④ 청년 해당 여부 확인 (만15~34세, 병역 최대 6년 추가)",
      "⑤ 법인세 신고 시 세액감면 신청서 별도 제출",
    ],
    contentHook: { title: "2026년 창업감면 달라졌습니다 — 수도권도 최대 75% 가능!", hook: "수도권 창업해도 과밀 아니면 75% 감면! 내 사무실이 어디냐가 핵심", targetKeyword: "창업중소기업 세액감면 2026 수도권", estimatedViews: "high" },
  },
  {
    id: "corp_sme_special_reduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "중소기업 감면",
    savingType: "reduction", targetAudience: ["corporation", "sole_proprietor"],
    name: "중소기업 특별세액감면",
    shortDescription: "업종·지역별 법인세/소득세 5~30% 감면 (2028년까지 연장)",
    fullDescription: "중소기업이 제조업, 도소매업, 음식점업 등 감면 대상 업종을 영위하는 경우 소재지와 업종에 따라 소득세·법인세를 5~30% 감면. 2028년 12월 31일까지 연장 적용.",
    tags: ["중소기업", "특별세액감면", "법인세감면", "소득세감면"],
    impactLevel: "high", applicableRate: "5~30%",
    requirements: [
      { id: "req_1", description: "중소기업기본법상 중소기업", type: "business_type", critical: true },
      { id: "req_2", description: "감면 대상 업종 영위", type: "business_type", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제7조", effectiveDate: "2026-01-01", expiryDate: "2028-12-31" }],
    calculationParams: [
      { id: "tax_amount", label: "산출세액", type: "number", unit: "원", required: true },
      { id: "business_type", label: "업종", type: "select", options: [
        { label: "제조업", value: "manufacturing" },
        { label: "도소매업", value: "retail" },
        { label: "음식점업", value: "restaurant" },
        { label: "건설업", value: "construction" },
        { label: "기타", value: "other" },
      ], required: true },
      { id: "region", label: "소재지", type: "select", options: [
        { label: "수도권", value: "capital" },
        { label: "비수도권", value: "non_capital" },
      ], required: true },
    ],
    calculationFormula: "감면세액 = 산출세액 × 감면율(업종·지역별 5~30%)",
    urgency: "year_round", difficulty: "easy",
    steps: ["업종 및 소재지 감면율 확인", "법인세/소득세 신고 시 감면 신청서 제출"],
  },
  {
    id: "corp_rd_credit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "R&D 세액공제",
    savingType: "credit", targetAudience: ["corporation"],
    name: "연구인력개발비 세액공제",
    shortDescription: "R&D 비용의 최대 25% 세액공제",
    fullDescription: "연구소/전담부서 보유 기업이 지출한 연구인력개발비에 대해 세액공제. 중소기업은 당기분 25%, 대기업은 증가분 기준 적용. 신성장동력·원천기술은 최대 30~40%.",
    tags: ["R&D", "연구개발", "세액공제", "연구소"],
    impactLevel: "high", applicableRate: "중소기업 당기분 25%",
    requirements: [
      { id: "req_1", description: "기업부설연구소 또는 연구개발전담부서 보유", type: "other", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제10조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "rd_expense", label: "R&D 비용", type: "number", unit: "원", required: true },
      { id: "company_size", label: "기업 규모", type: "select", options: [
        { label: "중소기업", value: "sme" },
        { label: "중견기업", value: "mid" },
        { label: "대기업", value: "large" },
      ], required: true },
    ],
    calculationFormula: "공제액 = R&D비용 × 공제율(중소 25%, 중견·대기업 증가분방식)",
    urgency: "year_round", difficulty: "hard",
    steps: ["기업부설연구소/전담부서 인정 신청", "R&D 비용 집계 및 구분", "법인세 신고 시 세액공제 신청"],
    contentHook: { title: "연구소 하나 만들면 세금 25% 돌려받는다", hook: "직원 3명이면 연구소 설립 가능, R&D 세액공제 꿀팁!", targetKeyword: "연구개발비 세액공제", estimatedViews: "medium" },
  },
  {
    id: "corp_employment_credit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "고용 세액공제",
    savingType: "credit", targetAudience: ["corporation", "sole_proprietor"],
    name: "통합고용세액공제 (2026 개편)",
    shortDescription: "신규 고용 1인당 최대 1,300만원, 사후관리 폐지 (점증적 공제)",
    fullDescription: "2026년 통합고용세액공제(조특법 제29조의8) 개편. 사후관리 요건 폐지로 추징 위험 제거. 점증적 공제 구조: 수도권 400만→900만→1,000만원, 지방 700만→1,200만→1,300만원 (연차별 증가). 고용을 유지할수록 공제액이 늘어나는 구조.",
    tags: ["통합고용세액공제", "고용증대", "세액공제", "채용", "사후관리폐지"],
    impactLevel: "high", maxSavingAmount: 13_000_000, applicableRate: "수도권 400~1,000만 / 지방 700~1,300만 (연차별)",
    requirements: [
      { id: "req_1", description: "전년 대비 상시근로자 수 증가", type: "employment", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제29조의8", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "new_employees", label: "신규 고용 인원", type: "number", unit: "명", required: true },
      { id: "employ_year", label: "고용 연차", type: "select", options: [
        { label: "1년차", value: "year1" },
        { label: "2년차", value: "year2" },
        { label: "3년차", value: "year3" },
      ], required: true },
      { id: "region", label: "사업장 소재지", type: "select", options: [
        { label: "수도권", value: "capital" },
        { label: "지방(비수도권)", value: "non_capital" },
      ], required: true },
    ],
    calculationFormula: "공제액 = 증가인원 × 연차별 공제금액 (수도권: 1년차 400만/2년차 900만/3년차 1000만, 지방: 1년차 700만/2년차 1200만/3년차 1300만)",
    urgency: "year_round", difficulty: "medium",
    steps: ["전년 대비 고용 증가 확인", "사업장 소재지(수도권/지방) 확인", "고용 연차별 공제금액 계산", "법인세 신고 시 세액공제 신청 (사후관리 불필요)"],
  },
  {
    id: "corp_ceo_salary_design",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "급여설계",
    savingType: "split", targetAudience: ["business_owner", "corporation"],
    name: "대표이사 급여 최적 설계",
    shortDescription: "법인세와 소득세의 교차점에서 급여 최적화",
    fullDescription: "대표이사 급여를 너무 낮추면 법인 이익이 커져 법인세 부담 증가, 너무 높이면 소득세 부담 증가. 2026년 법인세율 인상에 맞춰 최적 급여 구간을 재설계하여 법인세+소득세 합계를 최소화하는 전략.",
    tags: ["대표이사", "급여설계", "법인세", "소득세", "최적화"],
    impactLevel: "high", applicableRate: "법인세 10/20/22/25% vs 소득세 6~45%",
    requirements: [{ id: "req_1", description: "법인 대표이사", type: "employment", critical: true }],
    legalBasis: [
      { law: "법인세법", article: "제55조", effectiveDate: "2026-01-01" },
      { law: "소득세법", article: "제55조", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "corp_profit", label: "법인 세전이익 (급여 반영 전)", type: "number", unit: "원", required: true },
      { id: "ceo_salary", label: "대표이사 연봉", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "법인세(이익-급여) + 소득세(급여) 합계를 최소화하는 급여 금액 탐색",
    urgency: "year_round", difficulty: "hard",
    steps: ["법인 예상 이익 추정", "급여 구간별 세금 합계 시뮬레이션", "4대보험료까지 고려한 최적점 도출", "정관에 보수 한도 반영"],
    contentHook: { title: "사장님 월급, 얼마가 최적인지 계산해드립니다", hook: "급여 500만원 올리면 세금이 300만원 줄어드는 마법!", targetKeyword: "대표이사 급여 최적화", estimatedViews: "high" },
  },
]
