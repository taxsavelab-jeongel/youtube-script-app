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
    warnings: [
      "감면 업종 외 수입이 혼재될 경우 업종별 안분이 필요하며, 전체 매출 기준으로 적용하면 과다 감면으로 추징될 수 있음",
      "창업 후 5년 이내라도 업종을 변경하면 감면 업종 해당 여부를 재확인해야 하며, 비해당 업종 전환 시 감면이 소멸될 수 있음",
      "합병·분할·사업양수 등 실질적인 사업 승계는 창업으로 인정되지 않아 감면 적용 불가 (조특법 §6⑥)",
      "과밀억제권역 내 종전 사업장 이전 또는 종전 사업을 인수·확장하는 경우 창업으로 미인정",
      "고용인원 기준 미충족 시 감면 일부 또는 전부가 배제될 수 있으므로 사후관리 필요",
      "세액감면 신청서를 법인세 신고 기한 내 제출하지 않으면 감면 적용 불가 (기한 후 신청 불가)",
    ],
    practicalCases: [
      {
        title: "비과밀 수도권 IT 스타트업 창업 3년차 법인세 75% 감면",
        situation: "경기도 성남시(비과밀억제권역)에서 2026년 3월 소프트웨어 개발업 법인 창업. 3년차 법인세 산출세액 4,000만원 발생.",
        calculation: "감면세액 = 4,000만원 × 75% = 3,000만원. 납부세액 = 4,000만원 - 3,000만원 = 1,000만원",
        result: "비과밀수도권 75% 감면 구간 적용으로 3,000만원 절세. 구법(50% 단일 적용) 대비 1,000만원 추가 절세.",
        taxSaved: 30_000_000,
      },
      {
        title: "비수도권 청년 창업자 100% 감면 — 5년간 법인세 전액 면제",
        situation: "만 28세 청년이 충북 청주시에서 2026년 음식점업 법인 창업. 연간 법인세 산출세액 2,500만원.",
        calculation: "감면세액 = 2,500만원 × 100% = 2,500만원. 5년 누적 절세 = 2,500만원 × 5 = 1억 2,500만원(산출세액 동일 가정)",
        result: "비수도권 + 청년 창업자로서 100% 감면 적용, 5년간 법인세 전액 면제.",
        taxSaved: 125_000_000,
      },
    ],
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
    warnings: [
      "창업중소기업 세액감면(조특법 §6)과 중복 적용이 금지되므로, 창업감면 적용 중에는 중소기업 특별세액감면 선택 불가",
      "감면 업종 수입금액과 비감면 업종 수입금액이 혼재된 경우, 반드시 감면 업종 비율로 안분하여 적용해야 함",
      "개인사업자에서 법인으로 전환 시 법인 전환 시점부터 감면 적용 여부를 재확인해야 하며, 승계 여부에 따라 중소기업 판단이 달라짐",
      "매출 규모 증가로 중소기업 기준을 초과하는 시점부터 감면 적용이 중단되므로, 매년 중소기업 해당 여부 확인 필요",
    ],
    practicalCases: [
      {
        title: "비수도권 제조업 중소기업 — 법인세 30% 감면",
        situation: "경북 구미 소재 금속 제조업 중소법인, 당해 법인세 산출세액 8,000만원 발생.",
        calculation: "비수도권 제조업 감면율 30% 적용. 감면세액 = 8,000만원 × 30% = 2,400만원. 납부세액 = 5,600만원.",
        result: "연 2,400만원 절세. 창업감면 미해당 법인도 지속적으로 적용 가능한 상시 절세 수단.",
        taxSaved: 24_000_000,
      },
      {
        title: "수도권 도소매업 중소기업 — 법인세 10% 감면",
        situation: "서울 소재 온라인 도소매업 중소법인, 법인세 산출세액 5,000만원.",
        calculation: "수도권 도소매업 감면율 10% 적용. 감면세액 = 5,000만원 × 10% = 500만원.",
        result: "별도 투자·고용 없이 업종·소재지 요건만으로 연 500만원 절세.",
        taxSaved: 5_000_000,
      },
    ],
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
    warnings: [
      "한국산업기술진흥협회(KIAT) 인정 기업부설연구소 또는 연구개발전담부서가 없으면 공제 불가 — 인정 신청을 선행해야 함",
      "R&D 비용으로 인정되려면 연구원 인건비, 재료비 등 직접비만 해당하며, 일반 관리비·판관비가 혼입되면 세무조사 시 부인될 수 있음",
      "중소기업에서 중견기업으로 성장 시 공제율이 대폭 하락(25% → 8% 이하)하므로, 규모 변화 시점에 즉시 재검토 필요",
      "세액공제 금액이 크면 국세청 사후검증(서면검증·현장검증) 대상이 될 수 있으며, R&D 활동 증빙 서류(연구노트, 활동일지 등) 철저히 보관 필요",
      "신성장동력·원천기술 R&D 공제는 별도 요건(연구소 인정 + 해당 기술 목록)을 충족해야 하며 일반 R&D와 중복 적용 불가",
    ],
    practicalCases: [
      {
        title: "중소 IT기업 연구소 설립 후 R&D 세액공제 25% 적용",
        situation: "직원 15명 소프트웨어 중소법인이 기업부설연구소 인정 후, 연구원 인건비·재료비 합계 2억원 지출.",
        calculation: "공제액 = 2억원 × 25%(중소기업 당기분) = 5,000만원. 증가분(전년 대비 5,000만원 증가) 추가공제 = 5,000만원 × 25% = 1,250만원(별도 계산 불가, 당기분 방식 선택 시 5,000만원)",
        result: "법인세 산출세액에서 5,000만원 직접 공제. 법인세 납부액 5,000만원 절감.",
        taxSaved: 50_000_000,
      },
      {
        title: "제조업 중견기업 — 증가분 방식 R&D 공제",
        situation: "중견 제조기업, 전년도 R&D 비용 5억원, 당해 R&D 비용 8억원(3억원 증가).",
        calculation: "중견기업 증가분 공제율 40%(한시 적용 구간). 증가분 공제 = 3억원 × 40% = 1억 2,000만원",
        result: "증가분 방식 적용으로 1억 2,000만원 세액공제. 당기분 방식보다 유리한 사례.",
        taxSaved: 120_000_000,
      },
    ],
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
    warnings: [
      "2026년 개편으로 사후관리 요건이 폐지되었으나, 상시근로자 수 산정 기준(단시간 근로자 환산, 최저임금 이상 여부 등)을 정확히 적용해야 함",
      "기간제·파견·용역 근로자는 상시근로자 수 계산에서 제외되므로 고용 형태를 명확히 구분해야 함",
      "법인과 개인사업자가 동일 대표자인 경우, 두 사업체 간 고용 인원 중복 계상 금지",
      "최저임금 미만 근로자는 상시근로자 수 산정에서 제외되어 공제액이 줄어들 수 있음",
      "고용증대 세액공제와 사회보험료 세액공제는 중복 적용 가능하지만, 통합고용세액공제 내 다른 항목과의 중복 여부는 개별 확인 필요",
    ],
    practicalCases: [
      {
        title: "지방 소재 중소법인 — 신규 3명 고용, 3년차 공제 누적",
        situation: "경남 창원 제조업 중소법인이 2024년 3명 신규 고용. 2026년(3년차) 법인세 신고 시 공제 적용.",
        calculation: "3년차 지방 공제액 = 1,300만원 × 3명 = 3,900만원. 1년차(700만×3=2,100만) + 2년차(1,200만×3=3,600만) 포함 3년 누적 = 9,600만원",
        result: "3년차 단년 공제 3,900만원, 3년 누적 총 9,600만원 세액공제.",
        taxSaved: 39_000_000,
      },
      {
        title: "수도권 소재 스타트업 — 신규 5명 고용 1년차",
        situation: "서울 소재 플랫폼 스타트업, 2026년 정규직 5명 신규 채용.",
        calculation: "1년차 수도권 공제액 = 400만원 × 5명 = 2,000만원",
        result: "첫 해 2,000만원 세액공제. 고용 유지 시 2년차 4,500만원(900만×5), 3년차 5,000만원(1,000만×5)으로 공제 확대.",
        taxSaved: 20_000_000,
      },
    ],
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
    warnings: [
      "대표이사 급여를 법인이익 이상으로 과도하게 설정하면, 세무서에서 '부당행위계산 부인' 적용으로 손금 일부가 부인될 수 있음 (법인세법 §52)",
      "급여를 과소 설정하고 이익잉여금으로 누적한 후 배당하는 전략은 배당소득세 부담 및 건강보험료 증가 리스크 존재",
      "급여는 정관에 명시된 보수한도 범위 내여야 손금 인정 — 주주총회에서 보수한도 결의 미이행 시 손금 불인정 위험",
      "법인에서 가지급금(대여금) 형태로 개인 자금을 인출하면 인정이자(현행 4.6%)가 법인 이익으로 잡히고, 대표자 배당·상여로 소득세 추가 발생",
      "4대보험료까지 고려한 실수령 최적화가 필요하며, 급여 인상 시 건강보험료 대폭 증가하는 구간(소득 7,822만원 초과)에 주의",
      "이익잉여금 과다 누적 시 업무무관 자산 보유 법인으로 분류되어 비상장주식 가치 평가 시 불이익 가능",
    ],
    practicalCases: [
      {
        title: "법인 세전이익 3억원 — 대표 급여 최적 구간 탐색",
        situation: "법인 세전이익(급여 차감 전) 3억원. 현재 대표 급여 연 1억 2,000만원. 급여 인상 여부 검토.",
        calculation: "현재: 법인이익 1억 8,000만원 × 법인세율 20% = 3,600만원 + 급여 소득세(1.2억 기준) 약 1,500만원 = 합계 5,100만원. 급여 2억으로 인상 시: 법인이익 1억 × 10% = 1,000만원 + 급여 소득세(2억 기준) 약 3,200만원 = 합계 4,200만원",
        result: "대표 급여를 2억원으로 인상하면 법인세+소득세 합계 900만원 추가 절감. 4대보험료 증가분 차감 후 실절세 효과 확인 필요.",
        taxSaved: 9_000_000,
      },
      {
        title: "소규모 법인 — 급여 과소 설정으로 발생한 가지급금 리스크",
        situation: "대표 급여 월 100만원으로 설정하고, 매월 500만원씩 법인 통장에서 개인 용도로 인출. 연간 가지급금 4,800만원 발생.",
        calculation: "인정이자(4.6%) = 4,800만원 × 4.6% = 220만 8,000원이 법인 이익에 가산. 대표자 상여 처리 시 소득세 추가 발생.",
        result: "급여를 적정 수준으로 설계하지 않아 가지급금 이자 + 추가 소득세 약 300만원 이상 추가 부담. 사전 설계가 핵심.",
        taxSaved: 3_000_000,
      },
    ],
  },
]
