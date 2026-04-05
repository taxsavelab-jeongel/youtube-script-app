// ============================================================
// 08-extra. 상속세·증여세 추가 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const inheritanceGiftExtra: TaxSavingItem[] = [
  {
    id: "inheritance_life_insurance",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "inheritance", subcategory: "보험 활용",
    savingType: "structure", targetAudience: ["senior", "business_owner"],
    name: "종신보험 활용 상속세 납부 재원 마련",
    shortDescription: "종신보험으로 상속세 납부 자금을 비과세로 마련",
    fullDescription: "피상속인이 종신보험에 가입하여 사망 시 보험금으로 상속세 납부 재원을 확보. 보험료는 증여세 없이 자녀에게 이전 가능(증여재산공제 활용). 보험금은 상속재산에 포함되나, 납부 유동성 확보 효과.",
    tags: ["종신보험", "상속세", "납부재원", "유동성"],
    impactLevel: "high", applicableRate: "유동성 확보 (직접 절세는 아닌 구조적 전략)",
    requirements: [{ id: "r1", description: "종신보험 가입 가능 건강 상태", type: "other", critical: true }],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제8조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "estate_value", label: "예상 상속재산", type: "number", unit: "원", required: true },
      { id: "insurance_amount", label: "종신보험 보험금", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "상속세 예상액을 보험금으로 커버. 보험금 수령 후 세금 납부.", urgency: "long_term", difficulty: "medium",
    steps: ["예상 상속세 계산", "상속세 규모에 맞는 종신보험 설계", "수익자를 상속인으로 지정", "보험료 납입 (증여공제 내)"],
    contentHook: { title: "상속세 수억 원, 보험으로 해결하는 방법", hook: "현금이 없어서 집을 팔아야 하는 상황 방지!", targetKeyword: "상속세 종신보험", estimatedViews: "medium" },
  },
  {
    id: "gift_installment_10year",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "gift", subcategory: "분할증여",
    savingType: "split", targetAudience: ["senior", "all"],
    name: "10년 단위 분할증여 전략",
    shortDescription: "10년마다 5천만원씩 증여하여 비과세로 자산 이전",
    fullDescription: "증여재산공제는 10년 단위로 리셋. 성년 자녀에게 10년마다 5천만원(미성년 2천만원)씩 증여하면 누적 무세 이전 가능. 30년이면 1.5억 무세 이전. 조기 시작이 핵심.",
    tags: ["분할증여", "10년", "증여공제", "자산이전", "장기전략"],
    impactLevel: "high", maxDeductionAmount: 50_000_000, applicableRate: "10년당 5천만원(성년)/2천만원(미성년)",
    requirements: [{ id: "r1", description: "증여 대상 자녀 존재", type: "family", critical: true }],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제53조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "child_age", label: "자녀 현재 나이", type: "number", unit: "세", required: true },
      { id: "target_amount", label: "이전 목표 금액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "무세 이전 가능액 = (60세-자녀나이)/10 × 5천만원 (성년 기준)",
    urgency: "long_term", difficulty: "easy",
    steps: ["자녀 나이별 증여 타임라인 설계", "10년 단위로 5천만원 증여 실행", "증여세 신고 (공제 범위 내라도 신고 권장)", "투자하여 증식"],
    contentHook: { title: "자녀에게 세금 0원으로 1.5억 물려주는 30년 플랜", hook: "아이가 0세일 때 시작하면 성인 시 1.5억 무세 이전!", targetKeyword: "분할증여 10년 전략", estimatedViews: "high" },
  },
  {
    id: "inheritance_financial_deduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "inheritance", subcategory: "금융재산공제",
    savingType: "deduction", targetAudience: ["heir"],
    name: "금융재산 상속공제",
    shortDescription: "순금융재산 2천만~2억원 공제",
    fullDescription: "상속재산 중 금융재산(예금, 적금, 주식, 보험 등)에서 금융채무를 뺀 순금융재산에 대해 공제. 순금융재산 2천만원 이하: 전액, 2천만~1억: 2천만원, 1억~10억: 순금융재산×20%, 10억 초과: 2억원 한도.",
    tags: ["금융재산", "상속공제", "예금", "주식"],
    impactLevel: "medium", maxDeductionAmount: 200_000_000, applicableRate: "순금융재산의 20% (2억 한도)",
    requirements: [{ id: "r1", description: "순금융재산 보유", type: "asset", critical: true }],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제22조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "financial_assets", label: "금융재산 합계", type: "number", unit: "원", required: true },
      { id: "financial_debts", label: "금융채무 합계", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "순금융 = 금융재산 - 금융채무. 공제: ~2천만 전액, ~1억 2천만, ~10억 20%, 10억↑ 2억",
    urgency: "event_based", difficulty: "easy",
    steps: ["금융재산 및 금융채무 파악", "순금융재산 계산", "상속세 신고 시 공제 적용"],
  },
  {
    id: "inheritance_spouse_deduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "inheritance", subcategory: "배우자공제",
    savingType: "deduction", targetAudience: ["heir"],
    name: "배우자 상속공제",
    shortDescription: "배우자 법정상속분 최대 30억원 공제 (최소 5억)",
    fullDescription: "배우자가 실제 상속받은 금액에 대해 최소 5억원, 최대 30억원까지 공제. 배우자의 법정상속분 범위 내 실제 상속분만큼 공제되며, 별도 신고 불요.",
    tags: ["배우자", "상속공제", "법정상속분", "30억"],
    impactLevel: "very_high", maxDeductionAmount: 3_000_000_000, applicableRate: "최소 5억~최대 30억",
    requirements: [{ id: "r1", description: "배우자가 상속인으로 존재", type: "family", critical: true }],
    legalBasis: [{ law: "상속세 및 증여세법", article: "제19조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "spouse_share", label: "배우자 실제 상속액", type: "number", unit: "원", required: true },
      { id: "legal_share", label: "배우자 법정상속분", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "공제 = max(5억, min(실제상속분, 법정상속분, 30억))",
    urgency: "event_based", difficulty: "medium",
    steps: ["법정상속분 계산", "배우자 실제 상속분 결정", "상속세 신고 시 공제 적용"],
    contentHook: { title: "배우자 있으면 상속세 30억까지 공제! 몰랐던 혜택", hook: "배우자 상속공제만으로 상속세 절반 이상 줄이는 방법", targetKeyword: "배우자 상속공제 30억", estimatedViews: "high" },
  },
  {
    id: "gift_real_estate_valuation",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "gift", subcategory: "평가전략",
    savingType: "structure", targetAudience: ["business_owner", "investor"],
    name: "비상장주식/부동산 시가 평가 전략",
    shortDescription: "자산 가치가 낮을 때 증여하여 절세 극대화",
    fullDescription: "비상장주식은 순자산가치와 순손익가치를 가중평균하여 평가. 부동산은 기준시가(공시가격)와 시가(감정평가) 중 유리한 것 활용. 경기 침체기, 실적 저조 시 증여하면 평가액이 낮아 절세 효과 극대화.",
    tags: ["비상장주식", "평가", "증여시점", "감정평가", "시가"],
    impactLevel: "very_high", applicableRate: "평가액 차이만큼 절세",
    requirements: [{ id: "r1", description: "비상장주식 또는 부동산 보유", type: "asset", critical: true }],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제60~63조", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "market_value", label: "시가 추정액", type: "number", unit: "원", required: true },
      { id: "assessed_value", label: "보충적 평가액 (순자산/공시가)", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "평가액 차이 × 세율 = 절세 효과", urgency: "long_term", difficulty: "expert",
    steps: ["비상장주식 순자산/순손익가치 평가", "부동산 공시가격 vs 감정평가 비교", "평가액이 낮은 시점에 증여 실행"],
    contentHook: { title: "비상장주식 증여, 타이밍이 수억 차이 만든다", hook: "같은 주식인데 언제 증여하느냐에 따라 세금 50% 차이!", targetKeyword: "비상장주식 증여 평가", estimatedViews: "medium" },
  },
  // ── 영리법인 수유자 상속세 과세 범위 확대 ────────────────────
  {
    id: "inheritance_profit_corp_heir_expansion",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "inheritance", subcategory: "법인수유자",
    savingType: "structure", targetAudience: ["business_owner", "corporation", "heir"],
    name: "영리법인 수유자 상속세 과세 범위 확대 (2026.1.1↑)",
    shortDescription: "영리법인이 유증·사인증여를 받을 때 과세 대상 주주 범위 확대",
    fullDescription: `2026년 1월 1일 이후 개시하는 상속분부터 영리법인이 유증(遺贈) 또는 사인증여를 받는 경우의 상속세 과세 범위가 확대됩니다.

■ 개정 전 (2025년까지)
  영리법인이 수유자(유증 받는 자)인 경우, 해당 법인의 주주 중
  → 상속인 및 그 직계비속에 한하여 상속세 과세

■ 개정 후 (2026.1.1 이후 상속분)
  영리법인이 수유자인 경우, 해당 법인의 주주 중
  → 상속인 및 그 직계비속, + 상속인의 배우자, + 직계비속의 배우자에 대해서도 과세
  → 과세 대상 친족 범위 확대

■ 실무 영향
  1. 법인에 재산을 유증하는 방식으로 상속세를 회피하던 구조 차단
  2. 법인 지분을 보유한 배우자·며느리·사위에게도 상속세 부담 발생
  3. 가족법인에 재산 유증 시 세무 시뮬레이션 필수
  4. 기존 유언장·유증 계획을 세무사와 재검토 필요

■ 핵심 키워드
  수유자(受遺者): 유증으로 재산을 받는 사람
  사인증여: 증여자 사망을 조건으로 한 증여 (상속세 과세)`,
    tags: ["영리법인수유자", "유증", "상속세", "법인주주", "사인증여", "2026개정"],
    impactLevel: "high",
    requirements: [
      { id: "r1", description: "영리법인을 수유자로 하는 유언·유증 계획", type: "other", critical: true },
      { id: "r2", description: "2026.1.1 이후 개시 상속분", type: "period", critical: true },
    ],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제3조의2 (영리법인이 유증받은 경우 등)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "legacy_value", label: "유증 재산 가액", type: "number", unit: "원", required: true },
      { id: "corp_share_ratio", label: "과세 대상 주주 지분 합계 (%)", type: "number", unit: "%", required: true },
    ],
    calculationFormula: "과세 대상 주주의 지분 비율 × 유증 재산가액에 해당하는 부분에 상속세율 적용",
    urgency: "event_based",
    difficulty: "expert",
    steps: [
      "① 영리법인에 유증을 계획 중인 경우 주주 구성 파악",
      "② 상속인·배우자·직계비속·그 배우자 지분 합산",
      "③ 2026.1.1 이후 상속 개시 시 과세 범위 확대 적용",
      "④ 기존 유언장에 영리법인 수유자 조항이 있는 경우 세무사와 재검토",
      "⑤ 법인 유증 대신 개인 직접 유증 방식으로 구조 변경 검토",
    ],
    contentHook: {
      title: "법인에 재산 물려주는 유언장, 2026년부터 세금 더 냅니다",
      hook: "며느리·사위도 상속세 대상! 가족법인 유증 전략 재검토 필요",
      targetKeyword: "영리법인 수유자 상속세 2026",
      estimatedViews: "medium",
    },
    warnings: [
      "2026.1.1 이후 개시 상속분부터 적용 — 기존 유언장 재검토 권장",
      "가족법인(배우자·자녀가 주주인 법인)에 재산 유증 시 세부담 시뮬레이션 필수",
      "세무사·법무사 동시 검토 필요 (상속세+유언장 효력)",
    ],
  },
]
