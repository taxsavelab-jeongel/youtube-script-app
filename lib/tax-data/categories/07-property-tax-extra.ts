// ============================================================
// 07-extra. 부동산 보유세 추가 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const propertyTaxExtra: TaxSavingItem[] = [
  {
    id: "prop_senior_long_hold_credit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "comprehensive_property", subcategory: "종부세 세액공제",
    savingType: "credit", targetAudience: ["senior"],
    name: "종부세 고령자·장기보유 세액공제",
    shortDescription: "1세대1주택 고령자(60세↑) 최대 40%, 장기보유 최대 50%, 합산 80%",
    fullDescription: "1세대 1주택자가 단독명의로 보유 시 고령자 세액공제(60세↑ 20%, 65세↑ 30%, 70세↑ 40%)와 장기보유 세액공제(5년↑ 20%, 10년↑ 40%, 15년↑ 50%)를 합산 최대 80%까지 적용.",
    tags: ["종부세", "고령자", "장기보유", "세액공제", "1주택"],
    impactLevel: "very_high", applicableRate: "합산 최대 80%",
    requirements: [
      { id: "r1", description: "1세대 1주택 단독명의", type: "asset", critical: true },
      { id: "r2", description: "60세 이상 또는 5년 이상 보유", type: "age", critical: true },
    ],
    legalBasis: [{ law: "종합부동산세법", article: "제9조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "age", label: "소유자 나이", type: "number", unit: "세", required: true },
      { id: "holding_years", label: "보유기간", type: "number", unit: "년", required: true },
      { id: "tax_before_credit", label: "종부세 산출세액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "고령자공제(20~40%) + 장기보유공제(20~50%) = 합산 80% 한도",
    urgency: "year_round", difficulty: "easy",
    steps: ["단독명의 1주택 확인", "나이·보유기간 확인", "종부세 고지 시 자동 적용 확인"],
    contentHook: { title: "70세 1주택자, 종부세 80% 깎아준다!", hook: "종부세 1천만원이 200만원으로! 고령자+장기보유 공제", targetKeyword: "종부세 고령자 세액공제", estimatedViews: "medium" },
    warnings: [
      "공동명의로 전환하면 고령자·장기보유 세액공제(최대 80%) 적용 불가 — 단독명의 유지가 필수 조건",
      "1세대 1주택 특례 적용 중 추가 주택 취득 시 즉시 특례 배제 — 취득 전 반드시 확인",
      "세액공제 합산 80% 한도이므로 각 공제율 합이 80%를 초과해도 80%로 제한",
    ],
    practicalCases: [
      {
        title: "70세 1주택자 종부세 80% 세액공제",
        situation: "공시가 20억 단독명의 아파트 보유, 70세, 15년 보유",
        calculation: "종부세 산출세액 1,000만원 × (고령자 40% + 장기보유 50% → 합산 80% 한도) = 800만원 공제",
        result: "납부 세액 200만원 (800만원 절감)",
        taxSaved: 8000000,
      },
    ],
  },
  {
    id: "prop_depopulation_area",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "acquisition", subcategory: "인구감소지역",
    savingType: "reduction", targetAudience: ["investor", "all"],
    name: "인구감소지역 세컨드홈 취득세 특례",
    shortDescription: "인구감소지역 주택 취득 시 취득세 50% 감면, 종부세 제외",
    fullDescription: "2024년부터 인구감소지역 내 공시가격 4억원 이하 주택 1채를 추가 취득하면, 취득세 50% 감면 및 종합부동산세 합산 제외(1세대 1주택 판단 시 제외). 양도세 중과도 배제.",
    tags: ["인구감소지역", "세컨드홈", "취득세감면", "종부세제외"],
    impactLevel: "high", applicableRate: "취득세 50% 감면 + 종부세·양도세 혜택",
    requirements: [
      { id: "r1", description: "인구감소지역 소재 주택", type: "region", critical: true },
      { id: "r2", description: "공시가격 4억원 이하", type: "asset", value: "공시가 4억 이하", critical: true },
      { id: "r3", description: "1채 한정", type: "asset", critical: true },
    ],
    legalBasis: [{ law: "지방세특례제한법", article: "특례", effectiveDate: "2024-01-01" }],
    calculationParams: [
      { id: "house_price", label: "주택 취득가액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "취득세 50% 감면 + 종부세 합산 제외 + 양도세 중과 배제",
    urgency: "event_based", difficulty: "medium",
    steps: ["인구감소지역 해당 지역 확인", "공시가격 4억원 이하 주택 탐색", "취득 시 감면 신청"],
    contentHook: { title: "세컨드홈 사면 세금 혜택 3가지! 인구감소지역 특례", hook: "시골에 집 하나 사면 취득세 반값+종부세 제외!", targetKeyword: "인구감소지역 세컨드홈 세금", estimatedViews: "medium" },
    warnings: [
      "인구감소지역 지정 현황은 매년 변경될 수 있으므로 행정안전부 고시 목록 사전 확인 필수",
      "세컨드홈 특례 적용은 1채에 한정 — 2채 이상 취득 시 추가분은 특례 미적용",
      "종부세·양도세 혜택은 세컨드홈 주택을 실제 주거용으로 사용해야 하며, 임대 등 용도 변경 시 사후 추징 가능",
    ],
    practicalCases: [
      {
        title: "인구감소지역 3억원 주택 추가 취득",
        situation: "서울 1주택자가 인구감소지역 공시가 2.5억(취득가 3억) 주택 추가 매입",
        calculation: "취득세 원래 3% = 900만원. 50% 감면 → 450만원. 종부세 합산 제외로 연 수십만~수백만원 추가 절감",
        result: "취득 시 취득세 450만원 절감 + 종부세 비합산으로 매년 종부세 절감",
        taxSaved: 4500000,
      },
    ],
  },
  {
    id: "prop_lease_deduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "전세자금",
    savingType: "deduction", targetAudience: ["employee"],
    name: "전세자금대출 원리금상환 소득공제",
    shortDescription: "전세자금 대출 원리금 상환액 연 400만원 한도 소득공제",
    fullDescription: "무주택 세대주인 근로소득자가 주거용 전세자금 대출의 원리금을 상환하는 경우, 연 400만원 한도로 소득공제. 국민주택규모(85㎡) 이하 주택에 한함.",
    tags: ["전세자금", "대출", "소득공제", "원리금"],
    impactLevel: "medium", maxDeductionAmount: 4_000_000, applicableRate: "원리금상환액 40% (400만원 한도)",
    requirements: [
      { id: "r1", description: "무주택 세대주", type: "asset", critical: true },
      { id: "r2", description: "국민주택규모 이하", type: "asset", value: "85㎡ 이하", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제52조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "repayment", label: "연간 원리금 상환액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "공제 = min(원리금상환액 × 40%, 400만원)", urgency: "year_end", difficulty: "easy",
    steps: ["전세자금 대출 여부 확인", "연간 원리금상환 증명서 발급", "연말정산 시 제출"],
    warnings: [
      "세대주 요건 미충족 시 공제 불가 — 세대원이 세대주인 경우에도 적용 안 됨",
      "국민주택규모(85㎡) 초과 주택의 전세자금 대출은 공제 대상 제외",
      "주택임차차입금 원리금상환공제와 장기주택저당차입금 이자상환공제 합산 한도(1,500만원 이내) 확인 필요",
    ],
    practicalCases: [
      {
        title: "무주택 세대주 전세자금대출 소득공제",
        situation: "연봉 5,000만원 무주택 세대주, 전세자금대출 원리금 연 1,000만원 상환",
        calculation: "공제액 = min(1,000만원 × 40%, 400만원) = 400만원. 세율 24% 적용 → 세금 96만원 환급",
        result: "연말정산 환급액 96만원",
        taxSaved: 960000,
      },
    ],
  },
  {
    id: "prop_jeonse_deduction_interest",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "주거비",
    savingType: "deduction", targetAudience: ["employee"],
    name: "주택임차 차입금 이자 소득공제",
    shortDescription: "전세/월세 보증금 대출 이자 연 300만원 소득공제",
    fullDescription: "무주택 세대주가 전세/월세 보증금 마련을 위해 금융기관에서 차입한 대출의 이자상환액에 대해 연 300만원 한도로 소득공제.",
    tags: ["주택임차", "보증금대출", "이자", "소득공제"],
    impactLevel: "medium", maxDeductionAmount: 3_000_000, applicableRate: "이자상환액 (300만원 한도)",
    requirements: [
      { id: "r1", description: "무주택 세대주", type: "asset", critical: true },
      { id: "r2", description: "국민주택규모 이하 주택 임차", type: "asset", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제52조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "interest", label: "연간 이자 상환액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "공제 = min(이자상환액, 300만원)", urgency: "year_end", difficulty: "easy",
    steps: ["대출 이자 상환 증명서 발급", "연말정산 시 제출"],
    warnings: [
      "금융기관(은행 등)에서 직접 차입한 경우에만 적용 — 개인 차용 불가",
      "국민주택규모(85㎡) 이하 주택 임차 요건 미충족 시 공제 불가",
      "원리금상환공제와 이자공제 합산 시 주택 관련 차입금 공제 총한도 초과 여부 반드시 확인",
    ],
    practicalCases: [
      {
        title: "전세보증금 대출 이자 소득공제",
        situation: "무주택 세대주, 75㎡ 전세 거주, 전세보증금 대출 이자 연 360만원 납부",
        calculation: "공제액 = min(360만원, 300만원) = 300만원. 세율 15% 적용 → 환급 45만원",
        result: "연말정산 환급액 45만원",
        taxSaved: 450000,
      },
    ],
  },
]
