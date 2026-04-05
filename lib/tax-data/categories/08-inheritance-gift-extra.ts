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
    warnings: [
      "보험금은 상속재산에 포함되므로 직접 절세 효과는 없음 — 유동성 확보 전략임을 명확히 이해하고 가입",
      "수익자를 자녀로 지정 시 보험료가 증여재산공제(10년 5천만원) 한도를 초과하면 증여세 발생",
      "보험 계약자·피보험자·수익자 구조에 따라 과세 방식이 달라지므로 세무사와 계약 구조 사전 검토 필수",
    ],
    practicalCases: [
      {
        title: "예상 상속세 3억원에 대한 종신보험 재원 마련",
        situation: "70세 자산가, 예상 상속세 3억원. 현금 자산 부족으로 부동산 매각 우려",
        calculation: "자녀를 수익자로 한 종신보험 3억 설계. 월 보험료 약 50만원 (추산). 증여공제 범위 내 보험료 납입.",
        result: "사망 시 보험금 3억으로 상속세 즉시 납부 가능. 부동산 강제매각 방지.",
        taxSaved: 0,
      },
    ],
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
    warnings: [
      "증여일 기준 10년 이내 동일인에게 받은 증여액을 합산 — 10년 타이머 정확히 관리 필수",
      "증여 후 10년 이내 증여자 사망 시 상속재산에 합산 (이월과세) — 건강 상태와 시점 조율 필요",
      "공제 범위 내라도 증여세 신고를 해두면 향후 취득가액 입증에 유리 — 무신고 시 불이익 가능",
    ],
    practicalCases: [
      {
        title: "신생아 자녀에게 30년간 분할증여",
        situation: "0세 자녀에게 2세(미성년 2천만), 10세(미성년 2천만), 20세(성년 5천만), 30세(5천만) 4회 증여",
        calculation: "각 10년 단위 공제 적용. 합산 무세 이전 = 2천만+2천만+5천만+5천만 = 1억4천만원",
        result: "30년간 1억 4천만원 무세 이전. 조기 증여 후 투자수익까지 포함 시 실질 자산 훨씬 증가.",
        taxSaved: 14000000,
      },
    ],
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
    warnings: [
      "금융재산 중 상속개시 전 1~2년 내 인출·처분된 금액은 추정상속재산으로 합산될 수 있음",
      "금융채무 차감 시 실제 채무 증빙이 필요하며, 허위 채무 계상 시 가산세 대상",
      "순금융재산 공제는 기초공제·일괄공제와 별도로 적용되므로 누락하지 않도록 주의",
    ],
    practicalCases: [
      {
        title: "순금융재산 5억원 상속 시 공제 적용",
        situation: "상속재산 중 예금·주식 등 금융재산 6억원, 금융채무 1억원 → 순금융재산 5억원",
        calculation: "순금융재산 5억원 × 20% = 1억원 공제 (1억~10억 구간 적용)",
        result: "상속세 과세가액 1억원 감소. 세율 20% 적용 시 상속세 2천만원 절감",
        taxSaved: 20000000,
      },
    ],
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
    warnings: [
      "배우자 상속공제는 신고기한(상속개시 후 9개월) 내 배우자 상속분을 확정해야 최대 공제 적용 가능",
      "배우자가 실제 상속을 받지 않으면 최소 5억 공제만 적용 — 상속재산 분할 협의서 작성 권장",
      "배우자 사망 후 자녀에게 다시 상속될 때 2차 상속세 부담 발생 — 장기 관점의 상속 설계 필요",
    ],
    practicalCases: [
      {
        title: "총 상속재산 30억, 배우자 상속공제 최대 활용",
        situation: "피상속인 사망, 상속재산 30억원. 배우자+자녀 2명. 배우자 법정상속분 3/7 ≈ 12.86억",
        calculation: "배우자 실제 상속 12억(법정상속분 이내). 공제 = max(5억, min(12억, 12.86억, 30억)) = 12억 공제",
        result: "배우자 공제 12억 적용으로 과세표준 대폭 감소. 상속세 약 2~3억원 절감 효과",
        taxSaved: 250000000,
      },
    ],
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
    warnings: [
      "증여 후 5년(부동산 10년) 이내 양도 시 이월과세 적용 — 수증자의 양도차익에 증여자 취득가액 기준 과세",
      "비상장주식 증여 후 주식 처분·사업 폐업 등 사후관리 의무 위반 시 증여세 추징 가능",
      "감정평가 활용 시 국세청이 시가 재산정을 요구할 수 있으므로 독립된 감정기관 2곳 이상 평가 권장",
    ],
    practicalCases: [
      {
        title: "실적 저조 시기 비상장주식 증여로 증여세 절감",
        situation: "비상장법인 대표, 주식 순자산가치 시가 추정 20억. 실적 저조 시기 평가액 12억으로 하락",
        calculation: "평가액 12억 기준 증여세 과세. 20억 기준 대비 8억 차이 × 세율 30% = 2.4억 절감",
        result: "증여세 약 2억 4천만원 절감 (평가 시점 전략 활용)",
        taxSaved: 240000000,
      },
    ],
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
    practicalCases: [
      {
        title: "가족법인에 부동산 10억 유증 시 과세 범위 확대",
        situation: "피상속인이 가족법인(배우자 50%, 자녀 50% 지분)에 부동산 10억원 유증. 2026.1.1 이후 상속 개시.",
        calculation: "개정 전: 자녀 지분 50% × 10억 = 5억 과세. 개정 후: 배우자+자녀+며느리 등 지분 합산 → 최대 100% 과세 대상",
        result: "과세 대상 재산 5억 → 10억으로 확대. 상속세 추가 부담 약 1억~2억원 이상 발생 가능",
        taxSaved: 0,
      },
    ],
  },
]
