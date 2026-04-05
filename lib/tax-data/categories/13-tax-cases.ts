// ============================================================
// 13. 납세자 승소/패소 판례 (2020~2024년 주요 사례)
// 대법원, 조세심판원 결정 — 절세 전략 및 리스크 경고 활용
// ============================================================
// 근거: 대법원 판결 및 조세심판원 결정례
//   - 납세자 승소 4건: 배우자증여+이익소각, 가업승계증여, 가지급금, 비상장주식평가
//   - 납세자 패소 4건: 가업상속공제사후관리, 명의신탁, 가지급금폐업, 저가양도
// ============================================================

import type { TaxSavingItem } from "@/types/tax-database"

export const taxCases: TaxSavingItem[] = [
  // ── 납세자 승소 판례 ──────────────────────────────────────────

  // ── 1. 배우자 증여 후 이익소각 — 납세자 승소 ─────────────────
  {
    id: "case_win_spouse_gift_treasury_cancel",
    version: "2024.9", lastUpdated: "2024-09-12",
    category: "corporate", subcategory: "이익소각판례",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "배우자 증여 후 이익소각 — 납세자 승소 (대법원 2024두24659)",
    shortDescription: "배우자 공제 6억 활용 주식 증여 후 법인 자사주 매입, 소각, 의제배당 과세 불가 확정",
    fullDescription: `대법원 2024두24659 (2024.9.12 선고) — 납세자 승소

■ 사건 개요
  대표이사가 배우자에게 비상장주식을 증여(배우자증여공제 6억원 활용) → 법인이 자기주식으로 매입 후 소각

■ 국세청 주장
  실질과세원칙(국세기본법 제14조 제3항)에 따라 다단계, 우회거래로 보아 의제배당 과세
  "실질적으로 대표이사가 법인으로부터 현금을 받은 것과 같다"

■ 대법원 판단 (납세자 승소)
  1. 배우자에게 주식을 증여할지, 현금을 증여할지는 납세자의 선택권
  2. 세부담이 줄었다는 이유만으로 거래를 재구성하여 과세할 수 없음
  3. 상법상 절차를 준수하고 자금 귀속에 실질적 문제가 없으면 적법한 거래

■ 실효세율
  6억원까지 실질 0%: 배우자 증여공제 6억원 적용 + 취득가액 인수 인정으로 양도차익 없음

■ 콘텐츠 활용
  "법인 잉여금 10억 6.79%로 가져오는 방법" 등 잉여금 출구전략 영상에 판례 근거로 활용
  대법원 확정 판결이므로 가장 강력한 법적 근거`,
    tags: ["배우자증여", "이익소각", "자기주식", "실질과세", "의제배당", "대법원판례", "잉여금출구"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "비상장법인 대표이사", type: "employment", critical: true },
      { id: "r2", description: "배우자 존재 (법률혼)", type: "other", critical: true },
      { id: "r3", description: "법인에 배당가능이익(잉여금) 존재", type: "business_type", critical: true },
      { id: "r4", description: "상법상 자기주식 취득, 소각 절차 준수", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "국세기본법", article: "제14조 제3항 (실질과세원칙)", effectiveDate: "2023-01-01" },
      { law: "상속세 및 증여세법", article: "제53조 (배우자 증여공제 6억)", effectiveDate: "2024-01-01" },
      { law: "소득세법", article: "제17조 (의제배당)", effectiveDate: "2024-01-01" },
      { law: "상법", article: "제341조, 제342조 (자기주식 취득 및 소각)", effectiveDate: "2026-03-06" },
    ],
    calculationParams: [
      { id: "stock_value", label: "증여 주식 평가액", type: "number", unit: "원", required: true },
      { id: "spouse_deduction", label: "배우자 증여공제액 (최대 6억)", type: "number", unit: "원", required: true },
      { id: "acquisition_cost", label: "법인의 자기주식 매입가액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "증여세 = (증여가액 - 배우자공제 6억) × 세율. 6억 이내: 증여세 0원. 의제배당 = 0원 (대법원 확정)",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "1. 배우자에게 증여할 주식 수량 및 평가액 산정 (보충적 평가방법)",
      "2. 배우자 증여공제 6억원 한도 내에서 증여 실행 (증여세 신고 필수)",
      "3. 배우자가 증여받은 주식을 취득가액(증여 시 평가액)으로 인식",
      "4. 법인이 상법상 절차에 따라 자기주식 매입 (주총 결의 → 이사회 결의)",
      "5. 자기주식 취득 후 소각 (3차 상법개정 의무소각 기준 준수)",
      "6. 세무사와 전략 검토 후 실행 (국세청 전수 검증 중 — 충분한 보유 기간 확보)",
    ],
    contentHook: {
      title: "대법원이 인정한 법인 잉여금 절세법 — 배우자 증여 후 이익소각",
      hook: "6억 세금 0원 + 나머지도 최저세율! 대법원 2024두24659 완전 분석",
      targetKeyword: "배우자 증여 이익소각 절세 대법원 판례",
      estimatedViews: "high",
    },
    warnings: [
      "2026년 국세청에서 배우자 증여 후 즉시 소각 건에 대해 전수 검증 진행 중",
      "증여 후 충분한 기간 보유 후 소각 권장 (즉시 소각은 가장행위로 부인 위험)",
      "상법상 자기주식 취득, 소각 절차 완벽 준수 필수 (서류 미비 시 과세 위험)",
      "3차 상법 개정(2026.3.6)으로 자기주식 1년 내 소각 의무화 — 절차 설계에 반영 필요",
    ],
  },

  // ── 2. 가업주식 전부 증여 후 가업상속공제 — 납세자 승소 ───────
  {
    id: "case_win_family_business_full_gift",
    version: "2024.1", lastUpdated: "2024-01-01",
    category: "corporate", subcategory: "가업승계판례",
    savingType: "deduction", targetAudience: ["business_owner"],
    name: "가업주식 전부 증여 후 가업상속공제 — 납세자 승소 (조심2024전3003)",
    shortDescription: "가업주식 전부를 생전 증여 완료 후 사망 시에도 가업상속공제 적용 가능 확인",
    fullDescription: `조세심판원 조심2024전3003 — 납세자 승소

■ 사건 개요
  가업주식 전부를 생전에 증여세 특례(가업승계 증여세 특례)로 증여 완료
  → 피상속인 사망 시 주식 0주 보유
  → 국세청: "상속 시점에 주식이 없으므로 가업상속공제 불가" 주장

■ 조세심판원 판단 (납세자 승소)
  1. 주식 1주를 남긴 경우는 가업상속공제가 되고, 전부 증여한 경우는 안 된다는 것은 과세형평에 반함
  2. 가업승계를 완벽히 완료한 경우 오히려 불이익을 주는 것은 입법취지(가업승계 장려)에 반함
  3. 실질적으로 가업이 승계된 경우 공제 적용 가능

■ 실무 의미
  가업승계 증여세 특례(10~20% 특례세율)로 전부 증여한 경우에도 사망 시 가업상속공제(최대 600억) 적용 가능성 확인
  단, 조세심판원 결정이므로 대법원 판례는 아님 — 추후 과세 관청과 분쟁 가능성 존재

■ 콘텐츠 활용
  가업승계 증여세 특례 관련 영상에서 "전부 증여해도 가업상속공제 가능" 근거로 활용`,
    tags: ["가업승계", "가업상속공제", "증여세특례", "조세심판원", "상속공제", "비상장주식"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "가업 해당 요건 충족 (중소기업, 10년 이상 경영)", type: "business_type", critical: true },
      { id: "r2", description: "가업승계 증여세 특례로 전부 증여 완료", type: "other", critical: true },
      { id: "r3", description: "수증자(후계자)의 가업 계속 경영", type: "employment", critical: true },
    ],
    legalBasis: [
      { law: "조세특례제한법", article: "제30조의6 (가업승계 증여세 특례)", effectiveDate: "2024-01-01" },
      { law: "상속세 및 증여세법", article: "제18조의2 (가업상속공제)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "business_value", label: "가업 주식 총 평가액", type: "number", unit: "원", required: true },
      { id: "gift_tax_special", label: "가업승계 특례세율 적용 증여세", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "가업상속공제 최대 600억. 가업승계 증여세 특례 세율 10%(30억 이하), 20%(30억 초과)로 생전 납부, 사망 시 공제 적용 가능(심판원 결정)",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "1. 가업 해당 요건 확인 (중소기업 기준, 대표이사 10년 이상 경영)",
      "2. 가업승계 증여세 특례 요건 검토 (수증자 조건, 사후관리 요건)",
      "3. 주식 전부 증여 후 상속 시 가업상속공제 적용 전략 세무사와 협의",
      "4. 조세심판원 결정이므로 대법원 판례 확정 전까지 리스크 고지 후 진행",
      "5. 사후관리 기간 내 가업 유지 (고용, 자산 유지 요건 엄격 관리)",
    ],
    contentHook: {
      title: "가업주식 전부 증여했더니 상속공제 못 받는다고? — 심판원은 달랐습니다",
      hook: "1주라도 남겨야 한다? 상식을 깬 조세심판원 결정 (조심2024전3003)",
      targetKeyword: "가업승계 증여세 특례 가업상속공제 전부증여",
      estimatedViews: "high",
    },
    warnings: [
      "조세심판원 결정 — 대법원 확정 판례가 아니므로 변경 가능성 존재",
      "세무사, 변호사와 반드시 검토 후 실행 권장",
      "사후관리 기간(5년) 내 가업 유지 요건 엄수 필수",
    ],
  },

  // ── 3. 가지급금 인정이자 상여처분 — 납세자 부분 승소 ──────────
  {
    id: "case_win_partial_provisional_payment_interest",
    version: "2021.1", lastUpdated: "2021-01-15",
    category: "corporate", subcategory: "가지급금판례",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "가지급금 인정이자 상여처분 — 납세자 부분 승소 (조심2020중1482)",
    shortDescription: "단순 형식적 가지급금에 대한 상여처분, 실질 확인 없이 과세한 처분 일부 취소",
    fullDescription: `조세심판원 조심2020중1482 (2021.1.15 결정) — 납세자 부분 승소

■ 사건 개요
  국세청이 대표이사 가지급금에 대해 인정이자를 계산하고 미회수분을 상여처분

■ 심판원 판단 (납세자 부분 승소)
  실질과세원칙 적용을 위해서는 다음 3가지가 모두 충족되어야 함:
  1. 실질과 형식의 괴리 존재
  2. 비합리적인 거래 구조
  3. 조세부담 공평을 위한 과세 목적 충족

  단순히 형식상 가지급금이 존재한다는 이유만으로 전부 상여처분하는 것은 부당
  실질적인 자금 귀속과 용도를 구체적으로 확인해야 함

■ 실무 의미
  가지급금의 실질이 업무관련 지출이거나, 일시적 자금 융통이었음을 입증하면 과세 일부 취소 가능
  무조건 패소하는 것이 아니라 증거 준비에 따라 방어 가능

■ 콘텐츠 활용
  "가지급금 그냥 두면 형사처벌?" 등 가지급금 해결 영상에서 방어 논리로 활용
  가지급금에 대한 막연한 공포 vs 실질적 리스크 구분 콘텐츠`,
    tags: ["가지급금", "인정이자", "상여처분", "실질과세", "조세심판원", "법인세"],
    impactLevel: "high",
    requirements: [
      { id: "r1", description: "법인 대표이사 가지급금 보유", type: "employment", critical: true },
      { id: "r2", description: "가지급금 실질(업무관련성 등) 입증 자료 보유", type: "other", critical: false },
    ],
    legalBasis: [
      { law: "국세기본법", article: "제14조 (실질과세원칙)", effectiveDate: "2024-01-01" },
      { law: "법인세법", article: "제52조 (부당행위계산의 부인)", effectiveDate: "2024-01-01" },
      { law: "법인세법 시행령", article: "제89조 (인정이자 계산)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "provisional_balance", label: "가지급금 잔액", type: "number", unit: "원", required: true },
      { id: "interest_rate", label: "인정이자율 (현행 4.6%)", type: "number", unit: "%", required: true },
    ],
    calculationFormula: "인정이자 = 가지급금 × 4.6% (법정이자율). 미회수 시 상여처분 → 대표이사 소득세, 4대보험 추가 부담",
    urgency: "year_round",
    difficulty: "medium",
    steps: [
      "1. 가지급금 발생 경위 파악 및 용도별 분류",
      "2. 업무관련 지출 입증 자료 확보 (영수증, 계약서, 이사회 결의 등)",
      "3. 인정이자율(4.6%)로 연간 이자 계산 및 상여처분 규모 추산",
      "4. 가지급금 해결 방안 검토 (급여, 배당, 자산매각, 가수금 상계 등)",
      "5. 세무사 자문을 통해 실질과세 주장 방어 논리 준비",
    ],
    contentHook: {
      title: "가지급금, 무조건 내야 하는 세금 아닙니다 — 심판원 부분 승소 사례",
      hook: "실질을 입증하면 싸울 수 있다! 가지급금 방어 전략 완공",
      targetKeyword: "가지급금 상여처분 절세 방법 대응",
      estimatedViews: "high",
    },
    warnings: [
      "부분 승소: 전부 면제가 아닌 일부만 취소된 사례 — 과세 자체는 유지",
      "가지급금은 방치할수록 리스크 증가 — 조기 해소가 최선",
      "입증 자료 없이 주장만으로는 방어 어려움",
    ],
  },

  // ── 4. 비상장주식 평가 — 납세자 승소 ────────────────────────
  {
    id: "case_win_unlisted_stock_valuation",
    version: "2024.1", lastUpdated: "2024-01-01",
    category: "corporate", subcategory: "비상장주식판례",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "비상장주식 평가 — 납세자 승소 (조심2024서2408)",
    shortDescription: "국세청의 법령 근거 없는 비상장주식 평가 방법 적용 처분 취소",
    fullDescription: `조세심판원 조심2024서2408 — 납세자 승소

■ 사건 개요
  국세청이 비상장주식 저가양도에 대해 증여세 과세
  국세청의 순자산가액 계산 방법: 매매사례가액에서 유상증자 가액을 차감하여 산출

■ 심판원 판단 (납세자 승소)
  국세청의 계산 방법은 관련 법령(상속세 및 증여세법, 시행령)에 아무런 근거가 없음
  과세요건 법정주의: 법률상 근거 없는 과세는 위법한 처분
  → 과세처분 전부 취소

■ 실무 의미
  비상장주식 평가 시 국세청이 자의적으로 시가를 산정하는 경우 불복 가능
  보충적 평가방법(순자산가액, 수익가치 가중평균)이 법정 기준임을 확인

■ 콘텐츠 활용
  비상장주식 지분이전, 자녀 증여 관련 영상에서 주식 평가 방법의 중요성 강조
  "국세청도 틀릴 수 있다 — 비상장주식 평가 분쟁"`,
    tags: ["비상장주식", "주식평가", "저가양도", "증여세", "과세요건법정주의", "조세심판원"],
    impactLevel: "high",
    requirements: [
      { id: "r1", description: "비상장주식 양도 또는 증여 당사자", type: "other", critical: true },
      { id: "r2", description: "국세청의 시가 산정 방법이 법령에 근거 없는 경우", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제60조 (평가의 원칙)", effectiveDate: "2024-01-01" },
      { law: "상속세 및 증여세법", article: "제63조 (유가증권 등의 평가)", effectiveDate: "2024-01-01" },
      { law: "상속세 및 증여세법 시행령", article: "제54조 (비상장주식 보충적 평가방법)", effectiveDate: "2024-01-01" },
      { law: "국세기본법", article: "제18조 (세법 해석의 기준)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "net_asset_value", label: "순자산가액 (재산-부채)", type: "number", unit: "원", required: true },
      { id: "earnings_value", label: "순손익가치 (3년 평균)", type: "number", unit: "원", required: true },
      { id: "total_shares", label: "총 발행주식 수", type: "number", unit: "주", required: true },
    ],
    calculationFormula: "비상장주식 1주당 평가액 = (순자산가치 × 2 + 순손익가치 × 3) / 5 (일반법인 기준). 법정 보충적 평가방법 외 다른 계산 방법은 근거 없음",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "1. 비상장주식 양도, 증여 시 법정 보충적 평가방법으로 시가 산정",
      "2. 국세청 시가 산정에 이의 있는 경우 법령 근거 조항 요구",
      "3. 법령에 근거 없는 계산 방법 적용 시 조세심판원 불복 신청 검토",
      "4. 불복 기한 확인 (처분 통지 후 90일 이내 이의신청 또는 심판청구)",
    ],
    contentHook: {
      title: "국세청이 비상장주식 평가를 잘못 했습니다 — 심판원이 취소시켰습니다",
      hook: "법령 근거 없는 과세는 위법! 비상장주식 세금 폭탄 대응법",
      targetKeyword: "비상장주식 평가 방법 증여세 불복",
      estimatedViews: "medium",
    },
    warnings: [
      "심판원 결정: 유사 사안에서도 무조건 승소를 보장하지 않음",
      "불복 전 세무사, 세무전문변호사 자문 필수",
      "불복 기한(90일) 경과 시 불복 불가 — 과세 통지 즉시 확인 필요",
    ],
  },

  // ── 납세자 패소 판례 ──────────────────────────────────────────

  // ── 5. 가업상속공제 사후관리 위반 — 납세자 패소 ───────────────
  {
    id: "case_lose_family_business_post_management",
    version: "2024.1", lastUpdated: "2024-01-01",
    category: "corporate", subcategory: "가업승계패소",
    savingType: "deduction", targetAudience: ["business_owner"],
    name: "가업상속공제 사후관리 위반 — 납세자 패소 (국세청 추징 사례)",
    shortDescription: "가업상속공제 후 5년 내 고용, 자산 요건 미달 시 공제액 전액 추징",
    fullDescription: `가업상속공제 사후관리 위반 — 납세자 패소 (다수 추징 사례)

■ 사건 개요
  가업상속공제를 받은 후 사후관리 기간(5년) 내 조건 위반:
  1. 고용인원 90% 미달 유지
  2. 가업용 자산 40% 이상 처분, 매각
  3. 주된 업종 변경
  4. 상속인의 가업 미종사

■ 국세청 처분
  공제받은 상속세 전액 추징 + 이자 상당액(연 3.5%) 부과

■ 패소 이유
  사후관리 요건은 법정 요건으로 엄격 적용
  부득이한 사유(경기침체, 구조조정, 코로나 영향 등)라도 법에 명시된 예외사유에 해당하지 않으면 추징 불가피
  법원도 국세청 처분을 대부분 지지

■ 핵심 메시지
  공제를 받는 것보다 5년간 유지하는 것이 훨씬 중요
  사후관리 기간 중 구조조정, 매각 등이 필요한 경우 반드시 세무사와 사전 협의`,
    tags: ["가업상속공제", "사후관리", "추징", "고용유지", "자산처분", "상속세"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "가업상속공제 수혜자 (사후관리 5년 기간 중)", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제18조의2 제5항 (가업상속공제 사후관리)", effectiveDate: "2024-01-01" },
      { law: "상속세 및 증여세법 시행령", article: "제15조의2 (사후관리 요건)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "deduction_amount", label: "가업상속공제 적용 금액", type: "number", unit: "원", required: true },
      { id: "interest_rate", label: "추징 시 이자율 (연 3.5%)", type: "number", unit: "%", required: false },
    ],
    calculationFormula: "추징세액 = 공제받은 상속세 전액 + 이자상당액(연 3.5% × 경과연수). 최대 수십억 원 추징 사례 다수",
    urgency: "year_round",
    difficulty: "medium",
    steps: [
      "1. 매년 사후관리 요건 충족 여부 점검 (고용인원, 자산현황 모니터링)",
      "2. 구조조정, 자산매각, 업종변경 전 반드시 세무사 사전 검토",
      "3. 법정 예외사유(천재지변 등) 해당 여부 확인",
      "4. 요건 위반 예상 시 자진신고 vs 추징 처분 후 불복 전략 비교 검토",
    ],
    contentHook: {
      title: "가업상속공제 받았다고 끝이 아닙니다 — 5년 사후관리 경고",
      hook: "공제 받고 5년 안에 이것 어기면 수십억 추징! 가업승계 리스크 총정리",
      targetKeyword: "가업상속공제 사후관리 추징 조건",
      estimatedViews: "high",
    },
    warnings: [
      "사후관리 기간: 상속 후 5년 (위반 시 전액 추징 + 이자 3.5%)",
      "고용인원 90% 기준: 상속 당시 정규직 인원 기준 — 매년 확인 필수",
      "가업용 자산 40% 이상 처분 금지 — 부동산 매각 전 세무사 상담 필수",
      "경기침체, 코로나 등 불가항력도 법정 예외사유 아니면 추징 대상",
    ],
  },

  // ── 6. 명의신탁 주식 증여의제 — 납세자 패소 ──────────────────
  {
    id: "case_lose_nominal_stock_gift_deemed",
    version: "2023.9", lastUpdated: "2023-09-21",
    category: "corporate", subcategory: "명의신탁패소",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "명의신탁 주식 증여의제 — 납세자 패소 (대법원 2020두53378)",
    shortDescription: "명의신탁자 변경 시 새로운 증여의제 성립 — 기존 명의개서 유용도 포함",
    fullDescription: `대법원 2020두53378 (2023.9.21 선고) — 납세자 패소

■ 사건 개요
  중소기업 주식을 타인 명의로 보유(명의신탁) → 명의신탁자 변경 시 새로운 증여의제 적용 여부

■ 대법원 판단 (납세자 패소)
  1. 명의신탁자(수탁자)가 변경되면 새로운 명의신탁 관계 성립
  2. 기존 명의개서를 유용하는 경우에도 새로운 증여의제 규정 적용됨
  3. 실질 소유자의 세금 회피 의도가 인정되는 경우 증여세 부과 적법

■ 실무 의미
  명의신탁 주식 정리 과정에서도 증여세가 발생할 수 있음
  명의신탁자 변경 = 새로운 증여의제 → 증여세 추가 부담
  과거에 명의신탁 이력이 있는 모든 법인이 리스크 대상

■ 핵심 메시지
  명의신탁 정리는 빠를수록 좋고, 정리 과정에서도 증여세 발생 가능
  전문가와 함께 최적의 정리 시점, 방법 설계 필요`,
    tags: ["명의신탁", "증여의제", "비상장주식", "대법원판례", "증여세", "중소기업"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "타인 명의로 주식 보유 중인 실질 주주", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제45조의2 (명의신탁재산의 증여의제)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "stock_value", label: "명의신탁 주식 평가액", type: "number", unit: "원", required: true },
      { id: "gift_tax_rate", label: "증여세율 (10~50%)", type: "number", unit: "%", required: false },
    ],
    calculationFormula: "증여세 = 명의신탁 주식 평가액 × 증여세율(10~50%). 명의신탁자 변경 시마다 새로운 증여의제 적용",
    urgency: "year_round",
    difficulty: "hard",
    steps: [
      "1. 명의신탁 주식 현황 전수 파악 (주주명부 vs 실제 소유자 비교)",
      "2. 명의신탁 정리 방법 검토 (실명 전환 시 과세 시뮬레이션)",
      "3. 세무사, 변호사와 명의신탁 해소 최적 시점 및 방법 설계",
      "4. 명의신탁자 변경 절대 금지 (새로운 증여의제 발생)",
      "5. 명의신탁 해소 후 주주명부 정정 및 세무신고 완료",
    ],
    contentHook: {
      title: "명의신탁 주식 정리하다가 세금 폭탄? 대법원이 확인한 리스크",
      hook: "과거 명의신탁 이력 있는 대표님 필수 시청 — 정리 과정에서도 세금 나옵니다",
      targetKeyword: "명의신탁 주식 정리 증여세 리스크",
      estimatedViews: "high",
    },
    warnings: [
      "명의신탁자 변경 = 즉시 새로운 증여의제 → 증여세 추가 발생",
      "정리 중에도 과세 발생 가능 — 반드시 전문가와 설계 후 실행",
      "명의신탁 해소 지연 시 리스크만 증가 — 조기 정리 권장",
      "대법원 확정 판례 — 명의신탁자 변경 관련 불복 사실상 어려움",
    ],
  },

  // ── 7. 가지급금 폐업 시 상여처분 — 납세자 패소 ───────────────
  {
    id: "case_lose_provisional_payment_closure",
    version: "2021.1", lastUpdated: "2021-01-01",
    category: "corporate", subcategory: "가지급금패소",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "가지급금 폐업 시 상여처분 — 납세자 패소 (조세심판원 다수 결정)",
    shortDescription: "법인 폐업 시 가지급금 잔액 전액 대표이사 상여처분 — 방치 불가",
    fullDescription: `조세심판원 심사소득2011-0163 외 다수 결정 — 납세자 패소

■ 사건 개요
  법인 폐업 시점에 가지급금 잔액이 남아있는 경우 → 국세청이 전액 대표이사 상여처분

■ 심판원 판단 (납세자 패소)
  1. 폐업 당시 가지급금에 대한 상여처분은 해산, 청산절차를 밟지 않았더라도 정당
  2. 가지급금은 법인에서 대표이사에게 실질적으로 귀속된 것으로 봄
  3. 폐업 = 더 이상 회수 불가능 → 전액 소득 처분

■ 실무 영향
  가지급금을 해결하지 않고 폐업하면 전액 소득세 + 4대보험 추가 납부
  폐업 후 추가 세금 추징으로 수천만~수억 원 손실 사례 다수

■ 핵심 메시지
  폐업 전 반드시 가지급금 정리 필요
  방치하면 폐업 시점에 전액 소득세 과세 (최고세율 45% 적용 가능)`,
    tags: ["가지급금", "폐업", "상여처분", "소득세", "법인해산", "조세심판원"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "가지급금 보유 법인 폐업 예정", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "법인세법", article: "제67조 (소득처분)", effectiveDate: "2024-01-01" },
      { law: "소득세법", article: "제20조 (근로소득)", effectiveDate: "2024-01-01" },
      { law: "법인세법 시행령", article: "제106조 (소득처분의 종류)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "provisional_balance", label: "폐업 시 가지급금 잔액", type: "number", unit: "원", required: true },
      { id: "income_tax_rate", label: "대표이사 적용 소득세율 (최대 45%)", type: "number", unit: "%", required: false },
    ],
    calculationFormula: "추가 소득세 = 가지급금 전액 × 소득세율(6~45%) + 지방소득세 10% + 4대보험. 가지급금 1억 기준 최대 약 5,000만원 이상 추가 세금 가능",
    urgency: "year_round",
    difficulty: "medium",
    steps: [
      "1. 폐업 전 가지급금 잔액 전액 파악",
      "2. 가지급금 해결 방법 선택 (급여, 배당, 자산매각, 가수금 상계 등)",
      "3. 해결 방법별 세금 비용 비교 분석 (폐업 시 상여처분과 비교)",
      "4. 폐업 일정 전 가지급금 전액 정리 완료",
      "5. 법인 해산, 청산 절차와 병행 진행",
    ],
    contentHook: {
      title: "법인 폐업할 때 가지급금 남겨두면 생기는 일",
      hook: "폐업 후 갑자기 소득세 수천만 원 고지서? 반드시 먼저 정리하세요",
      targetKeyword: "법인 폐업 가지급금 세금 상여처분",
      estimatedViews: "high",
    },
    warnings: [
      "폐업 시 가지급금 전액 상여처분 — 최고세율(45%) 적용 가능",
      "해산, 청산 절차 없이 사실상 폐업해도 과세됨",
      "폐업 후에는 수정 불가 — 폐업 전 반드시 정리 완료",
      "가지급금 규모가 클수록 조기 정리가 유리 (시간 가치 고려)",
    ],
  },

  // ── 8. 특수관계자 간 저가양도 부당행위계산 — 납세자 패소 ────────
  {
    id: "case_lose_related_party_low_price_transfer",
    version: "2024.1", lastUpdated: "2024-01-01",
    category: "corporate", subcategory: "저가양도패소",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "특수관계자 간 저가양도 부당행위계산 — 납세자 패소 (다수 판례)",
    shortDescription: "자녀 등 특수관계인에게 비상장주식 저가양도 시 시가 기준 양도세 + 증여세 이중 과세",
    fullDescription: `특수관계자 간 저가양도 부당행위계산 부인 — 납세자 패소 (다수 판례)

■ 사건 개요
  대표이사가 특수관계인(자녀 등)에게 비상장주식을 시가보다 현저히 낮은 가격으로 양도

■ 국세청 처분
  시가와 거래가액의 차이가 다음 기준 이상인 경우:
  1. 3억원 이상 또는
  2. 시가의 5% 이상
  → 양도자: 시가를 양도가액으로 보아 양도소득세 과세 (부당행위계산 부인)
  → 수증자(자녀): 저가양수 이익에 대해 증여세 과세

■ 패소 이유
  부당행위계산 부인 규정(소득세법 제101조)은 특수관계자 간 저가양도에 명확히 적용
  시가 미달 거래 = 조세 회피 의도가 있는 것으로 간주
  실거래가가 아닌 시가(보충적 평가방법) 기준으로 세금 계산

■ 핵심 메시지
  비상장주식 양도 시 반드시 보충적 평가방법으로 시가 산정 후 거래
  시가 미달 시 양도자, 수증자 모두 세금 부과 (이중 과세 위험)`,
    tags: ["저가양도", "부당행위계산", "특수관계인", "비상장주식", "양도소득세", "증여세", "자녀증여"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "특수관계인(자녀, 배우자, 친족 등)에게 주식 양도 계획", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "소득세법", article: "제101조 (부당행위계산의 부인)", effectiveDate: "2024-01-01" },
      { law: "상속세 및 증여세법", article: "제35조 (저가양수, 고가양도에 따른 이익의 증여)", effectiveDate: "2024-01-01" },
      { law: "상속세 및 증여세법 시행령", article: "제26조 (저가양수, 고가양도 범위)", effectiveDate: "2024-01-01" },
    ],
    calculationParams: [
      { id: "market_value", label: "비상장주식 보충적 평가 시가", type: "number", unit: "원", required: true },
      { id: "transfer_price", label: "실제 거래(양도) 가액", type: "number", unit: "원", required: true },
      { id: "difference", label: "시가-거래가액 차액", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "부당행위계산 부인 기준: (시가 - 거래가액) ≥ 3억원 OR ≥ 시가의 5%. 해당 시 양도자: 시가 기준 양도세 / 수증자: 차액에 증여세",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "1. 양도 전 비상장주식 보충적 평가방법으로 시가 산정 (세무사 의뢰)",
      "2. 부당행위계산 부인 기준 해당 여부 계산 (시가의 5% 또는 3억 기준)",
      "3. 시가 기준 적정 가격으로 거래 실행",
      "4. 양도소득세 신고 및 납부 (양도일 말일부터 2개월 이내)",
      "5. 수증자(자녀 등) 저가양수 이익 증여세 신고 여부 검토",
    ],
    contentHook: {
      title: "자녀에게 주식 싸게 넘기면 세금폭탄 — 부당행위계산 완전 정복",
      hook: "시가 조금만 벗어나도 양도세+증여세 이중 폭탄! 안전하게 넘기는 법",
      targetKeyword: "비상장주식 자녀 양도 부당행위계산 절세",
      estimatedViews: "high",
    },
    warnings: [
      "특수관계인 간 거래는 전부 국세청 집중 검증 대상",
      "시가 대비 5% 또는 3억 초과 차이 시 이중 과세 발생 (양도자+수증자)",
      "비상장주식 '시가'는 반드시 법정 보충적 평가방법으로 산정해야 함",
      "거래 전 반드시 주식 평가 → 세금 시뮬레이션 → 전략 설계 순서 준수",
    ],
  },

  // ── 5. K사 종합 출구전략 사례 — 50억 인출 실효세율 10% ───────
  {
    id: "case_k_company_exit_strategy_50bil",
    version: "2026.1", lastUpdated: "2026-04-05",
    category: "corporate", subcategory: "잉여금출구전략사례",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "K사 종합 잉여금 출구전략 — 50억 인출, 실효세율 10% 달성",
    shortDescription: "6가지 전략 조합(감액배당+퇴직+특허+차등배당+이익소각)으로 50억 인출 시 총 세금 5억(10%)",
    fullDescription: `정엘가업승계연구소 실제 컨설팅 사례 (K사)

■ 기본 상황
  비상장 중소기업, 미처분이익잉여금 대규모 보유
  단순 배당 인출 시 실효세율 60%+, 급여 인출 시 40%+

■ 전략별 실행 내역 (총 50억, 총 세금 5억, 실효세율 10%)
  ① 감액배당 6억 — 주주 균등 배당, 세금 0원 (0%)
  ② STF (임원 퇴직금 특별플랜) 11억 — 대표 0.83억 (7.5%)
  ③ 특허권 출원·등록 11억 — 대표 0.84억 (7.6%)
  ④ 차등배당 4억 (자녀1,2 + 어머니) — 세금 0.62억 (15.4%)
  ⑤ 차등배당 7억 (자녀1,2) — 세금 1.88억 (26.85%)
  ⑥ 자사주 이익소각 11억 (사모님 배우자 증여 후) — 0.83억 (7.5%)

■ K사 사례2 (컨설팅 전/후 비교, 총 17.5억)
  컨설팅 전 세금: 7.5억 → 컨설팅 후: 약 1.5억 → 절감: 5.9억+
  - 주식증여(사모님 6억): 0원 (배우자공제)
  - 자사주 이익소각(6억): 0원 (부모 지분 소각→자녀 지분 상승, 세금없는 증여효과)
  - 특허권(5억): 4~5천만원 (7.6%)
  - 차등배당 5년(6.5억): 0.93억 (15.4%)

■ 핵심 원리
  단일 전략이 아닌 다중 전략 조합으로 세율 구간을 분산
  각 전략의 소득 귀속자(대표/사모님/자녀)를 분산하여 종합소득세 누진 회피`,
    tags: ["잉여금출구", "감액배당", "특허권", "이익소각", "차등배당", "퇴직금", "실효세율10%", "종합전략"],
    impactLevel: "very_high",
    applicableRate: "실효세율 10% (50억 기준), 단순 배당 대비 50% 이상 절세",
    requirements: [
      { id: "r1", description: "비상장 중소기업 대표이사", type: "employment", critical: true },
      { id: "r2", description: "미처분이익잉여금 10억 이상", type: "asset", critical: true },
      { id: "r3", description: "배우자 또는 가족 주주 있음", type: "family", critical: false },
      { id: "r4", description: "장기 설계 (5~10년) 가능", type: "period", critical: false },
    ],
    legalBasis: [
      { law: "상법", article: "제341조 (자기주식 취득)", effectiveDate: "2026-01-01" },
      { law: "소득세법", article: "제17조 (배당소득, 의제배당)", effectiveDate: "2026-01-01" },
      { law: "법인세법", article: "제16조 (의제배당)", effectiveDate: "2026-01-01" },
      { law: "상속세및증여세법", article: "제53조 (배우자 증여재산공제 6억)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "retained_earnings", label: "미처분이익잉여금", type: "number", unit: "원", required: true },
      { id: "spouse_exists", label: "배우자 유무", type: "boolean", required: true },
      { id: "children_count", label: "자녀 수", type: "number", unit: "명", required: false },
    ],
    calculationFormula: "최적 전략 조합 = 감액배당(0%) + STF(7.5%) + 특허(7.6%) + 차등배당(15~27%) + 이익소각(6.79%). 각 전략별 한도 내에서 조합하여 실효세율 10~15% 달성 목표.",
    urgency: "event_based",
    difficulty: "expert",
    steps: [
      "1. 잉여금 규모·주주 구성·가족 현황 파악 (진단 단계)",
      "2. 5~10년 출구전략 로드맵 설계 (순서·금액·소득귀속자 확정)",
      "3. 특허 출원 + 정관 정비 + 퇴직금 규정 사전 준비",
      "4. 감액배당 → 이익소각 → 특허 → 차등배당 순서로 단계 실행",
      "5. 매년 세금 신고·정산 및 전략 유지관리",
    ],
    contentHook: {
      title: "법인돈 50억 세금 5억(10%)로 가져온 실제 방법",
      hook: "급여로 뺐으면 25억 날렸다. K사가 6가지 전략으로 40억 아낀 비결",
      targetKeyword: "법인 잉여금 출구전략 절세 사례",
      estimatedViews: "high",
    },
    warnings: [
      "차등배당은 증여세 위험 — 배당 포기 주주의 증여세 과세 가능성 검토 필수",
      "특허는 매출기여도 높은 실질 특허만 가능 (형식적 특허 감평 불가)",
      "전략 실행 순서와 시기가 중요 — 같은 해 다중 전략 실행 시 종합과세 검토 필요",
      "STF(임원퇴직금) 지급 규정은 퇴직 전 정관·이사회 의결로 사전 확정 필수",
    ],
  },

  // ── 6. 가업상속공제 4가지 추징 함정 ─────────────────────────
  {
    id: "case_lose_family_business_post_management",
    version: "2026.1", lastUpdated: "2026-04-05",
    category: "inheritance", subcategory: "가업상속공제추징",
    savingType: "structure", targetAudience: ["business_owner", "heir"],
    name: "가업상속공제·증여특례 사후관리 위반 4가지 — 추징 59건/541억 경고",
    shortDescription: "가업상속공제 받다가 추징 59건/541억 — 가업미종사·고용유지·업종변경·지분감소 함정",
    fullDescription: `가업상속공제·증여세 과세특례 추징 실태 (2019~2023년)

■ 추징 실태
  추징 건수: 59건 (2019~2023년 누적)
  추징 액수: 541억원
  이자상당액: 연 3.5% 내외 가산
  2023년 이용기업: 188개 (역대 최다) → 향후 추징 리스크 증가 예상

■ 4가지 주요 추징 사유

① 가업 미종사 (가장 많은 비중)
  - 상속인이 대표이사로 취임하지 않음
  - 주된 업종 변경 (중분류 초과)
  - 1년 이상 휴·폐업
  ⚠ 교훈: 자녀가 실제 경영 의지와 능력 있는지 사전 냉정 판단

② 고용 유지 의무 위반
  - 정규직 수 또는 급여 총액 유지 실패
  - 사후관리 기간: 5년 (7년→5년으로 단축)
  ⚠ 교훈: 경기 불황에도 고용 유지 방안 사전 설계 필수

③ 업무무관자산 비율 착오 (가장 흔한 사례)
  - 기업가치 100억 중 업무무관자산 40억 → 40억에 일반세율(50%) 적용 추징
  - 무관자산: 유휴부지, 비상장주식, 과다현금, 법인 보험
  ⚠ 교훈: 증여·상속 前 업무무관자산 최대한 정리하여 가업자산 비율 제고

④ 지분율 감소 (사후관리 5년 내)
  - 증여세 납부용 주식 일부 매각 → 추징
  - 유상증자 미참여로 지분율 감소 → 추징
  ⚠ 교훈: 증여세 납부 재원은 배당·급여로 미리 준비

■ 결론
  "가업상속공제는 받는 것보다 지키는 것이 더 어렵다"
  공제 후 5년간 매년 요건 점검 필수`,
    tags: ["가업상속공제", "사후관리", "추징", "고용유지", "업무무관자산", "가업미종사", "지분감소", "증여세특례"],
    impactLevel: "very_high",
    applicableRate: "추징 시 본세 + 이자 연 3.5% 가산. 수억~수십억 추가 부담 가능",
    requirements: [
      { id: "r1", description: "가업상속공제 또는 증여세 과세특례 적용 받은 기업", type: "business_type", critical: true },
      { id: "r2", description: "사후관리 기간 내 (5년)", type: "period", critical: true },
    ],
    legalBasis: [
      { law: "상속세및증여세법", article: "제18조의2 (가업상속공제)", effectiveDate: "2026-01-01" },
      { law: "조세특례제한법", article: "제30조의6 (가업승계 증여세 과세특례)", effectiveDate: "2026-01-01" },
      { law: "상속세및증여세법", article: "제18조의3 (가업상속공제 사후관리)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "deduction_amount", label: "가업상속공제 적용액", type: "number", unit: "원", required: true },
      { id: "violation_type", label: "위반 유형", type: "select", required: true },
    ],
    calculationFormula: "추징세액 = 당초 감면세액 × 미충족 비율 + 이자상당액(연 3.5% × 경과연수). 최대 원래 세금 전액 + 이자 가산.",
    urgency: "long_term",
    difficulty: "expert",
    steps: [
      "1. 매년 고용인원 및 급여총액 모니터링 (연말 기준)",
      "2. 업종 변경 전 표준산업분류 중분류 내 해당 여부 법률 검토",
      "3. 자산 처분 전 가업용 자산 비율 40% 룰 확인",
      "4. 지분 변동(유상증자 포함) 전 공제 요건 검토",
      "5. 전문가 연간 사후관리 점검 계약 권장",
    ],
    contentHook: {
      title: "가업상속공제 받다가 541억 토해낸 진짜 이유",
      hook: "혜택인 줄 알았더니 함정 — 5년 안에 이것 놓치면 이자까지 다 토해낸다",
      targetKeyword: "가업상속공제 사후관리 추징 위험",
      estimatedViews: "high",
    },
    warnings: [
      "국세청은 사후관리 대상 기업 전수 모니터링 — 위반 즉시 추징",
      "이자상당액은 연 3.5%, 5년이면 원금의 17.5% 추가 부담",
      "최근 대형 베이커리·카페 등 편법 승계 집중 조사 예고",
      "사후관리 위반 한 가지만 있어도 공제 전액 추징 가능",
    ],
  },
]
