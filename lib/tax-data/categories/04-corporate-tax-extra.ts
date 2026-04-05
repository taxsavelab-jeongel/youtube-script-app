// ============================================================
// 04-extra. 법인세 절세 추가 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const corporateTaxExtra: TaxSavingItem[] = [
  {
    id: "corp_investment_credit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "투자세액공제",
    savingType: "credit", targetAudience: ["corporation"],
    name: "통합투자세액공제",
    shortDescription: "사업용 자산 투자액의 1~12% 세액공제",
    fullDescription: "기계장치, 시설 등 사업용 유형자산에 투자한 경우 기본공제(중소 10%, 대기업 1%) + 증가분 추가공제(3%). 국가전략기술 투자는 최대 25%.",
    tags: ["투자세액공제", "기계장치", "시설투자", "국가전략기술"],
    impactLevel: "high", applicableRate: "중소 10%+3% / 대기업 1%+3%",
    requirements: [{ id: "r1", description: "사업용 유형자산 투자", type: "other", critical: true }],
    legalBasis: [{ law: "조세특례제한법", article: "제24조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "invest_amount", label: "투자금액", type: "number", unit: "원", required: true },
      { id: "prior_year_invest", label: "전년도 투자금액", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "기본: 투자액 × 10%(중소). 추가: (당기-직전3년평균) × 3%", urgency: "year_round", difficulty: "medium",
    steps: ["투자 자산 목록 정리", "기본+추가 공제 계산", "법인세 신고 시 세액공제 신청"],
    contentHook: { title: "설비투자하면 세금 10% 돌려받는다! 통합투자세액공제", hook: "1억 기계 사면 1,300만원 세금 환급!", targetKeyword: "통합투자세액공제 중소기업", estimatedViews: "medium" },
    warnings: [
      "공제 받은 자산을 취득일로부터 2년(또는 3년) 내에 처분·임대하면 공제세액이 추징되므로, 투자 후 자산 처분 계획을 신중히 검토해야 함",
      "중고 자산·리스 자산은 원칙적으로 공제 대상에서 제외되며, 새 법인이 기존 법인으로부터 매입하는 경우에도 제외될 수 있음",
      "사업 개시 전 취득 자산은 공제 대상이 되지 않으므로, 법인 설립 후 사업 개시 이후 투자 시점을 명확히 확인해야 함",
      "국가전략기술(반도체·이차전지·백신·디스플레이 등) 최대 25% 공제는 별도 요건(해당 기술 목록 해당 + 기재부 확인) 충족 필요",
      "증가분 추가공제(3%)는 직전 3년 평균 투자액 초과분에만 적용되므로, 투자 변동이 작으면 추가공제 효과가 미미할 수 있음",
    ],
    practicalCases: [
      {
        title: "중소 제조기업 — 기계장치 1억 3,000만원 투자 시 공제",
        situation: "중소 제조법인이 2026년 CNC 기계 1억 3,000만원 신규 취득. 직전 3년 평균 투자액 5,000만원.",
        calculation: "기본공제 = 1억 3,000만원 × 10% = 1,300만원. 증가분 = 1억 3,000만원 - 5,000만원 = 8,000만원. 추가공제 = 8,000만원 × 3% = 240만원. 총 공제 = 1,540만원",
        result: "법인세 1,540만원 직접 공제. 투자 원금 대비 실질 공제율 약 11.8%.",
        taxSaved: 15_400_000,
      },
      {
        title: "대기업 계열사 — 국가전략기술 반도체 설비 투자",
        situation: "반도체 제조 대기업이 2026년 국가전략기술 해당 제조설비 100억원 투자.",
        calculation: "국가전략기술 공제율(대기업) 15% 적용. 기본공제 = 100억 × 15% = 15억원. 증가분 추가공제(3%) 별도. 총 공제 약 15억원 이상.",
        result: "일반 투자공제(대기업 1%)와 비교 시 14%p 추가 공제 혜택. 국가전략기술 여부 확인이 핵심.",
        taxSaved: 1_500_000_000,
      },
    ],
  },
  {
    id: "corp_dividend_timing",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "배당전략",
    savingType: "split", targetAudience: ["business_owner", "corporation"],
    name: "배당 시점·금액 최적화 (2026 분리과세 활용)",
    shortDescription: "2026년 배당소득 분리과세 신설로 배당 전략 재설계",
    fullDescription: "2026년부터 배당소득 분리과세(2천만↓ 14%/15.4%, 2천만~3억 20%/22%, 3억~50억 25%/27.5%, 50억↑ 30%/33%) 2026~2028 한시 도입. 법인세를 약간 더 내더라도 이익잉여금을 배당으로 가져올 때 세금이 대폭 줄어듦. 종합과세(최대 49.5%) 대비 최대 19%p 절세.",
    tags: ["배당", "분리과세", "이익잉여금", "법인", "주주"],
    impactLevel: "very_high", applicableRate: "종합과세 49.5% → 분리과세 22~33%",
    requirements: [{ id: "r1", description: "법인 주주/대표이사", type: "employment", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제14조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "retained_earnings", label: "이익잉여금", type: "number", unit: "원", required: true },
      { id: "dividend_amount", label: "배당 예정 금액", type: "number", unit: "원", required: true },
      { id: "other_income", label: "기타 종합소득", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "분리과세 세금 vs 종합과세 세금 비교. 고소득일수록 분리과세 유리.",
    urgency: "year_round", difficulty: "hard",
    steps: ["이익잉여금 현황 파악", "배당 금액 시뮬레이션", "종합과세 vs 분리과세 비교", "최적 배당 시점/금액 결정"],
    contentHook: { title: "2026 배당소득 혁명! 사장님 세금 22%p 절약하는 법", hook: "이익잉여금 쌓아두던 사장님들, 지금이 배당 적기!", targetKeyword: "배당소득 분리과세 2026 법인", estimatedViews: "high" },
    warnings: [
      "2026~2028년 한시 도입된 배당소득 분리과세 제도로, 2028년 12월 31일 이후 배당분은 다시 종합과세로 환원될 수 있으므로 배당 시점을 반드시 확인해야 함",
      "분리과세를 선택하면 다른 소득과 합산하지 않으므로, 손실·공제와 상계가 불가능 — 종합소득 공제가 많은 경우 종합과세가 유리할 수 있음",
      "법인세를 낸 이익잉여금에서 배당하므로 법인세+배당소득세 이중과세 효과가 존재 — 법인세 부담분을 포함한 실효세율을 비교해야 함",
      "주주 구성이 여럿인 경우, 한 주주의 배당 전략이 다른 주주의 세부담에 영향을 미칠 수 있으므로 주주별 세무 검토 필요",
      "배당 결의 전 정관 및 주주총회 의사록 작성 등 상법상 절차를 반드시 준수해야 하며, 절차 미이행 시 배당 자체가 무효화될 수 있음",
      "이익잉여금이 아닌 자본잉여금 배당은 과세 처리 방법이 다르므로 혼용 주의",
    ],
    practicalCases: [
      {
        title: "종합과세 고소득 대표자 — 배당 분리과세로 19%p 절세",
        situation: "근로·사업소득이 이미 5억원인 대표자가 법인 이익잉여금 2억원 배당 예정. 종합과세 시 최고세율 49.5% 적용 구간.",
        calculation: "종합과세 세액 = 2억 × 49.5% = 9,900만원. 분리과세(2억원, 20% 구간) 세액 = 2억 × 22%(지방소득세 포함) = 4,400만원",
        result: "분리과세 선택으로 5,500만원 절세. 2026~2028 한시 기간 내 배당 전략 설계 필요.",
        taxSaved: 55_000_000,
      },
      {
        title: "이익잉여금 50억 이상 법인 — 단계별 배당 분산 전략",
        situation: "이익잉여금 80억원 법인. 50억 초과분(30억원)은 분리과세율 33%, 50억 이하분은 27.5% 적용.",
        calculation: "50억까지 배당 시 세액 = 50억 × 27.5% = 13억 7,500만원. 잔여 30억 배당 시 세액 = 30억 × 33% = 9억 9,000만원. 종합과세(49.5%) 대비 3년에 나누어 배당하면 추가 절세 가능.",
        result: "배당 시기·금액 분산으로 누진세율 구간 최적화. 연간 배당 한도를 50억 이하로 관리하면 27.5% 세율 유지 가능.",
        taxSaved: 330_000_000,
      },
    ],
  },
  {
    id: "corp_loss_carryforward",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "이월결손금",
    savingType: "deduction", targetAudience: ["corporation"],
    name: "이월결손금 공제",
    shortDescription: "과거 15년 내 결손금을 당기 소득에서 공제",
    fullDescription: "법인의 사업연도 결손금은 향후 15년간 이월하여 소득에서 공제 가능. 중소기업은 100% 공제, 대기업은 60% 한도. 적자 발생 시 법인세 신고를 정확히 해야 향후 활용 가능.",
    tags: ["이월결손금", "결손금", "법인세", "적자"],
    impactLevel: "high", applicableRate: "중소 100% / 대기업 60%",
    requirements: [{ id: "r1", description: "과거 사업연도 결손금 존재", type: "other", critical: true }],
    legalBasis: [{ law: "법인세법", article: "제13조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "loss_amount", label: "이월결손금", type: "number", unit: "원", required: true },
      { id: "current_income", label: "당기 소득", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "공제액 = min(이월결손금, 당기소득 × 100%(중소) 또는 60%(대기업))",
    urgency: "year_round", difficulty: "medium",
    steps: ["과거 15년 내 결손금 확인", "법인세 신고 시 이월결손금 공제 적용"],
    warnings: [
      "결손금은 발생 연도의 법인세 신고를 적법하게 해야만 이월 공제 가능 — 무신고·기한 후 신고로 결손이 발생한 경우, 공제 인정 여부가 제한될 수 있음",
      "대기업은 이월결손금 공제 한도가 각 사업연도 소득의 60%로 제한되므로, 결손금이 많아도 한 해에 전부 공제할 수 없어 분산 계획이 필요",
      "합병·분할 시 피합병법인의 이월결손금을 합병법인이 승계할 수 없으므로(원칙), 기업 구조 변경 전 결손금 처리 방향을 사전에 검토해야 함",
      "결손금 공제 후 과세표준이 0이 되더라도 법인세 최저한세(7%, 중소기업 감면 포함) 대상인 경우 일정 금액은 납부해야 함",
      "결손금 발생 연도가 15년을 초과하면 자동 소멸하므로, 오래된 결손금부터 우선 공제 적용해야 함",
    ],
    practicalCases: [
      {
        title: "스타트업 창업 3년차 — 이월결손금으로 법인세 전액 면제",
        situation: "2023~2024년 2년간 누적 결손금 3억원 보유 중소법인. 2025년 흑자 전환으로 과세표준 2억원 발생.",
        calculation: "이월결손금 공제(중소기업 100%) = 2억원 전액 공제. 과세표준 = 0원. 납부 법인세 = 0원(최저한세 검토 필요). 잔여 결손금 1억원은 향후 15년 내 추가 공제 가능.",
        result: "흑자 전환 첫해 법인세 0원 납부. 이월결손금 신고 관리의 중요성 확인.",
        taxSaved: 20_000_000,
      },
      {
        title: "중견기업 — 60% 한도 내 이월결손금 활용",
        situation: "이월결손금 10억원 보유 중견법인. 당해 소득 8억원 발생.",
        calculation: "대기업·중견기업 공제 한도 = 8억 × 60% = 4억 8,000만원. 공제 후 과세표준 = 8억 - 4억 8,000만 = 3억 2,000만원. 법인세(20%) = 6,400만원. 잔여 결손금 5억 2,000만원은 차기 이월.",
        result: "한도 제한으로 전액 공제 불가하나, 4억 8,000만원 공제로 법인세 9,600만원 절감(한도 미적용 대비).",
        taxSaved: 96_000_000,
      },
    ],
  },
  {
    id: "corp_entertainment_expense",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "접대비",
    savingType: "deduction", targetAudience: ["corporation", "sole_proprietor"],
    name: "접대비 한도 관리",
    shortDescription: "접대비 한도 내 처리로 경비 극대화 (기본 3,600만원)",
    fullDescription: "법인의 접대비는 기본한도 3,600만원(중소기업) + 수입금액에 따른 추가한도로 손금산입 가능. 1만원 초과 접대비는 법인카드/세금계산서 등 적격증빙 필수. 한도 초과분은 손금불산입.",
    tags: ["접대비", "손금", "경비", "적격증빙"],
    impactLevel: "medium", maxDeductionAmount: 36_000_000, applicableRate: "기본 3,600만+수입금액별",
    requirements: [{ id: "r1", description: "법인 또는 사업자", type: "business_type", critical: true }],
    legalBasis: [{ law: "법인세법", article: "제25조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "revenue", label: "연 매출", type: "number", unit: "원", required: true },
      { id: "entertainment", label: "접대비 지출", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "한도 = 3,600만 + 수입금액별 추가한도. 한도 내 금액만 손금 인정.",
    urgency: "year_round", difficulty: "easy",
    steps: ["접대비 한도 계산", "한도 내 지출 관리", "적격증빙 수취 (법인카드 필수)"],
    warnings: [
      "1만원 초과 접대비는 법인카드·세금계산서·현금영수증 등 적격증빙이 없으면 전액 손금 불인정 (법인세법 §25④)",
      "골프장·유흥주점 등 소비성 서비스업 지출은 금액 불문하고 손금 불인정 항목이므로, 지출 업종 확인 필수",
      "접대비를 판매촉진비·광고선전비로 위장 처리하면 세무조사 시 접대비로 재분류되어 한도 초과분 추징 및 가산세 부과",
      "한도 초과 접대비는 손금불산입 처리 시 귀속 불분명 시 대표자 상여 처리되어 소득세 추가 과세 가능",
      "거래처·임직원 경조사비는 20만원 이하 건당 청첩장·부고장 등 증빙 보관 시 접대비로 인정되나, 초과분은 불인정",
    ],
    practicalCases: [
      {
        title: "연 매출 50억 중소법인 — 접대비 한도 최적 활용",
        situation: "연 매출 50억원 중소법인. 접대비 지출 5,000만원. 한도 내 처리 가능 금액 확인.",
        calculation: "기본한도 3,600만원 + 수입금액별 추가한도(50억 × 0.3% = 1,500만원) = 총 한도 5,100만원. 지출 5,000만원 전액 한도 내. 손금산입 5,000만원 × 법인세율 20% = 1,000만원 절세 효과.",
        result: "지출 전액 손금 인정. 한도(5,100만원) 초과 없음. 법인세 1,000만원 절감.",
        taxSaved: 10_000_000,
      },
      {
        title: "한도 초과 접대비 처리 실수 — 추징 사례",
        situation: "연 매출 20억 법인이 접대비 6,000만원 지출. 한도 = 3,600만원 + 600만원(20억×0.3%) = 4,200만원.",
        calculation: "한도 초과액 = 6,000만원 - 4,200만원 = 1,800만원 손금 불인정. 세금 추가납부 = 1,800만원 × 20% = 360만원 + 가산세.",
        result: "한도 관리 실패로 360만원 이상 추징. 지출 전 한도 사전 계산 필수.",
        taxSaved: 3_600_000,
      },
    ],
  },
  {
    id: "corp_depreciation",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "감가상각",
    savingType: "deduction", targetAudience: ["corporation", "sole_proprietor"],
    name: "감가상각 방법 선택 전략",
    shortDescription: "정률법 vs 정액법 선택으로 초기 비용 극대화",
    fullDescription: "유형자산의 감가상각 방법을 정률법(초기 비용↑)과 정액법(균등) 중 선택. 초기 수익이 큰 사업은 정률법으로 초기 법인세 절감. 건물은 정액법만 가능.",
    tags: ["감가상각", "정률법", "정액법", "유형자산"],
    impactLevel: "medium", applicableRate: "방법에 따라 초기 비용 차이",
    requirements: [{ id: "r1", description: "감가상각 대상 유형자산 보유", type: "asset", critical: true }],
    legalBasis: [{ law: "법인세법", article: "제23조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "asset_value", label: "자산 취득가액", type: "number", unit: "원", required: true },
      { id: "useful_life", label: "내용연수", type: "number", unit: "년", required: true },
    ],
    calculationFormula: "정액법: 매년 동일 금액. 정률법: 초기 높고 점점 감소.", urgency: "year_round", difficulty: "medium",
    steps: ["자산별 내용연수 확인", "정률법 vs 정액법 시뮬레이션", "신고 시 감가상각 방법 선택"],
    warnings: [
      "건물·구축물은 정액법만 적용 가능하며, 임의로 정률법을 선택할 수 없음 (법인세법 §23②)",
      "감가상각 방법은 최초 신고 시 선택 후 변경하려면 세무서장 승인이 필요하며, 임의 변경 시 세무조사 대상이 될 수 있음",
      "세법상 내용연수 범위(기준내용연수 ±25%)를 벗어나는 내용연수 선택 시 손금 불인정 리스크 있음",
      "장부상 감가상각을 하지 않아도 세법상 상각범위액은 소멸하므로, 과소 상각 후 나중에 추가 공제를 받으려 할 경우 누락 위험",
      "중고자산 취득 시 잔존내용연수를 적용해야 하며, 신규자산과 동일한 내용연수를 적용하면 오류 처리됨",
    ],
    practicalCases: [
      {
        title: "초기 수익 큰 제조업 — 정률법으로 초기 법인세 절감",
        situation: "중소 제조법인이 기계장치(취득가 1억원, 내용연수 5년) 취득. 초기 2년 수익이 집중됨.",
        calculation: "정률법 상각률(5년, 약 0.451). 1년차 상각 = 1억 × 0.451 = 4,510만원. 2년차 = (1억-4,510만) × 0.451 = 2,476만원. 합계 2년 6,986만원 비용 처리. 정액법(매년 2,000만원) 대비 2년 합계 2,986만원 추가 비용처리.",
        result: "정률법 선택으로 초기 2년간 약 2,986만원 추가 손금 확보. 법인세(20%) 기준 약 597만원 이익 세금 이연.",
        taxSaved: 5_970_000,
      },
      {
        title: "안정적 수익 서비스업 — 정액법으로 균등 비용 처리",
        situation: "구독형 SaaS 중소법인이 서버 장비(취득가 5,000만원, 내용연수 5년) 취득. 매년 균등 비용 원함.",
        calculation: "정액법 상각 = 5,000만원 ÷ 5년 = 매년 1,000만원. 법인세(20%) 기준 매년 200만원 절세 효과 균등 발생.",
        result: "5년간 매년 200만원, 총 1,000만원 법인세 절감. 이익이 균등한 경우 정액법이 예측 용이.",
        taxSaved: 10_000_000,
      },
    ],
  },
  {
    id: "corp_parental_leave_return_credit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "고용 세액공제",
    savingType: "credit", targetAudience: ["corporation", "sole_proprietor"],
    name: "육아휴직 복귀자 세액공제 (2026.12.31까지 연장)",
    shortDescription: "육아휴직 후 복귀한 직원 1인당 중소기업 1,300만원 / 중견기업 900만원 세액공제",
    fullDescription: `육아휴직을 사용한 직원이 복직한 경우 사업주에게 세액을 추가 공제하는 제도. 2026년 12월 31일까지 적용 기한이 연장되었습니다.

■ 공제 금액
  - 중소기업: 복귀자 1인당 1,300만원
  - 중견기업: 복귀자 1인당 900만원

■ 적용 요건
  - 근로자가 육아휴직을 사용한 후 같은 사업장에 복직
  - 복직 후 1년 이상 계속 고용 유지
  - 중소기업 또는 중견기업 해당

■ 적용 기한
  2026.12.31까지 (조세특례제한법 일몰 기한 연장)`,
    tags: ["육아휴직", "복직", "세액공제", "고용", "중소기업", "출산장려"],
    impactLevel: "high", maxSavingAmount: 13_000_000, applicableRate: "중소기업 1,300만원 / 중견기업 900만원 (1인당)",
    requirements: [
      { id: "r1", description: "중소기업 또는 중견기업", type: "business_type", critical: true },
      { id: "r2", description: "육아휴직 후 동일 사업장 복직", type: "employment", critical: true },
      { id: "r3", description: "복직 후 1년 이상 고용 유지", type: "period", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제29조의3", effectiveDate: "2026-01-01", expiryDate: "2026-12-31" }],
    calculationParams: [
      { id: "returnees", label: "육아휴직 복귀자 수", type: "number", unit: "명", required: true },
      { id: "company_size", label: "기업 규모", type: "select", options: [
        { label: "중소기업 (1,300만원)", value: "sme" },
        { label: "중견기업 (900만원)", value: "mid" },
      ], required: true },
    ],
    calculationFormula: "공제액 = 복귀자 수 × 1,300만원(중소) 또는 900만원(중견)",
    urgency: "year_round", difficulty: "easy",
    steps: [
      "① 육아휴직 후 복직 직원 현황 파악",
      "② 복직 후 1년 고용 유지 여부 확인",
      "③ 법인세/소득세 신고 시 세액공제 신청서 제출",
    ],
    contentHook: { title: "육아휴직 직원 복귀시키면 세금 1,300만원 돌려받는다!", hook: "출산율 높이면 세금도 준다 — 중소기업 사장님 체크!", targetKeyword: "육아휴직 복귀자 세액공제 2026", estimatedViews: "medium" },
    warnings: [
      "복직 후 1년 이상 고용 유지 요건 미충족 시(1년 내 퇴직 등) 공제세액 전액 추징 (사후관리 의무)",
      "동일 사업장 복직 요건이므로, 육아휴직 중 사업장 이전·양수도가 있었던 경우 동일 사업장 해당 여부 별도 확인 필요",
      "2026.12.31까지 한시 적용이므로 이후 기한 연장 여부를 매년 확인해야 하며, 기한 내 복직 및 고용 유지가 완성되어야 함",
      "고용보험 미가입 근로자의 육아휴직은 본 공제 대상에 해당하지 않을 수 있으므로 고용보험 가입 여부 확인 필요",
      "통합고용세액공제와의 중복 적용 제한 여부를 세무사와 사전 확인해야 함",
    ],
    practicalCases: [
      {
        title: "중소기업 — 육아휴직 복귀자 3명, 법인세 3,900만원 공제",
        situation: "중소 제조법인에서 2025년 육아휴직 3명이 2026년 복직. 복직 후 1년 이상 고용 유지.",
        calculation: "공제액 = 1,300만원 × 3명 = 3,900만원. 법인세 산출세액 6,000만원에서 3,900만원 공제 → 납부세액 2,100만원.",
        result: "별도 투자 없이 기존 인력 복직만으로 법인세 3,900만원 절감. 고용 유지 1년 요건 관리 필수.",
        taxSaved: 39_000_000,
      },
      {
        title: "중견기업 — 복귀자 5명, 900만원씩 공제",
        situation: "중견 서비스기업에서 육아휴직 복귀자 5명 발생. 중견기업 해당.",
        calculation: "공제액 = 900만원 × 5명 = 4,500만원. 법인세 부담 4,500만원 감소.",
        result: "중견기업도 복귀자 1인당 900만원 공제. 출산·육아 지원 정책과 세금 절감 동시 달성.",
        taxSaved: 45_000_000,
      },
    ],
  },
  {
    id: "corp_sme_employment_income_reduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "고용 세액공제",
    savingType: "reduction", targetAudience: ["corporation", "sole_proprietor", "youth"],
    name: "중소기업 취업자 소득세 감면 (2026.12.31까지 연장)",
    shortDescription: "중소기업 취업 청년·노인·장애인·경력단절여성 소득세 70~90% 감면",
    fullDescription: `중소기업에 취업한 청년·고령자·장애인·경력단절여성에 대해 일정 기간 소득세를 감면하는 제도. 2026년 12월 31일까지 적용 기한이 연장되었습니다.

■ 대상자 및 감면율
  - 청년 (만15~34세): 소득세 90% 감면, 5년간
  - 60세 이상 고령자 / 장애인 / 경력단절여성: 소득세 70% 감면, 3년간

■ 감면 한도
  - 연 200만원 (감면세액 기준)

■ 중소기업 요건
  - 조세특례제한법상 중소기업 해당 업종
  - 소비성 서비스업 등 일부 업종 제외

■ 적용 기한
  2026.12.31까지 (기한 연장)`,
    tags: ["중소기업", "취업자감면", "청년취업", "소득세감면", "경력단절"],
    impactLevel: "high", maxSavingAmount: 2_000_000, applicableRate: "청년 90% / 고령자·장애인·경력단절 70% (연 200만원 한도)",
    requirements: [
      { id: "r1", description: "중소기업 취업 (감면 업종)", type: "business_type", critical: true },
      { id: "r2", description: "청년(만15~34세) 또는 60세↑ / 장애인 / 경력단절여성", type: "other", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제30조", effectiveDate: "2026-01-01", expiryDate: "2026-12-31" }],
    calculationParams: [
      { id: "income_tax", label: "산출 소득세", type: "number", unit: "원", required: true },
      { id: "beneficiary_type", label: "대상자 유형", type: "select", options: [
        { label: "청년 (만15~34세) — 90% 감면, 5년", value: "youth" },
        { label: "60세 이상 고령자 — 70% 감면, 3년", value: "senior" },
        { label: "장애인 — 70% 감면, 3년", value: "disabled" },
        { label: "경력단절여성 — 70% 감면, 3년", value: "career_break" },
      ], required: true },
    ],
    calculationFormula: "감면액 = min(소득세 × 90%(청년) 또는 70%(기타), 연 200만원)",
    urgency: "year_round", difficulty: "easy",
    steps: [
      "① 취업자 유형 확인 (청년/고령/장애/경력단절)",
      "② 중소기업 해당 업종 확인",
      "③ 근로자가 연말정산 시 감면신청서 제출 (원천징수의무자에게)",
    ],
    contentHook: { title: "중소기업 취업하면 소득세 90% 면제! 2026년 연장 확정", hook: "청년 직원 채용하면 세금 혜택 이중으로 받는 방법", targetKeyword: "중소기업 취업자 소득세 감면 2026", estimatedViews: "medium" },
    warnings: [
      "연 감면 한도가 200만원이므로, 산출 소득세가 222만원 이상인 청년의 경우 90% 감면이 아닌 200만원 정액 한도로 제한됨",
      "근로자가 직접 연말정산 시 감면신청서를 제출해야 하며, 원천징수의무자(회사)가 대신 신청하지 않으면 감면 누락 발생",
      "중소기업 해당 업종이어도 소비성 서비스업(유흥주점, 무도장 등)은 감면 제외 업종이므로 업종 코드 확인 필요",
      "청년 기준 나이(만 15~34세)는 취업일 기준으로 판단하며, 군 복무기간은 병역증명서 제출 시 최대 6년 추가 인정",
      "동일 기업에 재취업 시 이전 취업 기간과 합산하여 5년 한도가 적용되므로, 이직 후 재입사한 경우 잔여 감면 기간 확인 필수",
      "2026.12.31 일몰로, 이후 기한 연장이 되지 않으면 감면 적용 불가 — 연말정산 시점에 기한 확인 필수",
    ],
    practicalCases: [
      {
        title: "만 28세 청년 중소기업 취업자 — 소득세 90% 감면 적용",
        situation: "만 28세 청년이 2026년 경남 창원 소재 중소 제조업 취업. 연봉 3,600만원, 산출 소득세 약 160만원.",
        calculation: "감면액 = 160만원 × 90% = 144만원. 한도(200만원) 미초과. 실납부 소득세 = 160만원 - 144만원 = 16만원.",
        result: "연간 소득세 144만원 절감. 5년간 누적 720만원 절세 (소득 동일 가정).",
        taxSaved: 7_200_000,
      },
      {
        title: "65세 고령 근로자 중소기업 취업 — 70% 감면 3년 적용",
        situation: "만 65세 고령자가 2026년 중소 서비스업 취업. 연봉 2,400만원, 산출 소득세 약 80만원.",
        calculation: "감면액 = 80만원 × 70% = 56만원. 3년간 누적 = 56만원 × 3 = 168만원.",
        result: "3년간 168만원 절세. 고령자 재취업 장려 및 사업주의 통합고용세액공제와 동시 활용 가능.",
        taxSaved: 1_680_000,
      },
    ],
  },
  {
    id: "corp_tax_free_benefit",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "corporate", subcategory: "복리후생",
    savingType: "exemption", targetAudience: ["corporation", "business_owner"],
    name: "비과세 복리후생비 활용",
    shortDescription: "식대 월 20만원, 자가운전보조금 월 20만원 등 비과세",
    fullDescription: "임직원에게 지급하는 식대(월 20만원), 자가운전보조금(월 20만원), 연구보조비(월 20만원), 생산직 야간근무수당 등은 비과세. 법인은 전액 경비처리, 직원은 소득세 면제.",
    tags: ["비과세", "식대", "자가운전", "복리후생", "비과세수당"],
    impactLevel: "medium", applicableRate: "식대·교통비·연구비 각 월 20만원",
    requirements: [{ id: "r1", description: "근로계약서에 비과세 항목 명시", type: "employment", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제12조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "employee_count", label: "직원 수", type: "number", unit: "명", required: true },
    ],
    calculationFormula: "직원당 비과세 합계 = (식대+교통비) × 12 = 480만원/년. 법인 경비+직원 세금 절감",
    urgency: "year_round", difficulty: "easy",
    steps: ["비과세 항목 정리 (식대, 교통비 등)", "급여체계에 비과세 항목 분리", "근로계약서 반영"],
    contentHook: { title: "사장님도 직원도 윈윈! 비과세 수당 총정리", hook: "같은 급여인데 세금 연 50만원 차이?!", targetKeyword: "비과세 수당 종류 2026", estimatedViews: "medium" },
    warnings: [
      "식대 비과세는 사내 구내식당 또는 식사 현물 제공 시에는 전액 비과세이나, 현금 식대는 월 20만원 한도이므로 초과분은 과세",
      "자가운전보조금 비과세(월 20만원)는 본인 차량을 업무에 직접 사용하는 경우에만 해당 — 법인 차량을 운전하거나 대중교통 이용자에게 지급하면 과세",
      "근로계약서·급여규정 등 내부 규정에 비과세 항목과 지급 기준이 명시되지 않으면, 세무조사 시 전액 과세 근로소득으로 재분류될 수 있음",
      "연구보조비 비과세(월 20만원)는 기업부설연구소 또는 연구개발전담부서에 소속된 연구원에게만 적용 가능",
      "비과세 수당 항목을 과도하게 늘려 실제 과세 급여를 낮추면, 퇴직금 산정 기준(평균임금)이 낮아져 직원에게 불이익이 생길 수 있음",
      "4대보험료 부과 기준(보수월액)에서도 비과세 항목은 제외되므로, 비과세 수당 설계가 보험료 절감으로 이어지나 추후 실업급여·국민연금 수령액에도 영향",
    ],
    practicalCases: [
      {
        title: "직원 10명 법인 — 비과세 수당 설계로 연 법인세+소득세 절감",
        situation: "직원 10명에게 식대·자가운전보조금 각 월 20만원씩 비과세 수당으로 지급 전환. 기존 전액 과세 급여 지급 대비 비교.",
        calculation: "직원 1인당 연간 비과세 480만원(식대 240만+교통비 240만). 10명 합계 4,800만원 비과세 처리. 직원 소득세 절감(세율 15% 가정) = 4,800만원 × 15% = 720만원. 법인은 전액 경비 인정 유지.",
        result: "직원 10명 연간 소득세 합계 720만원 절감. 법인은 경비 처리 그대로 유지. 법인+직원 동시 절세 효과.",
        taxSaved: 7_200_000,
      },
      {
        title: "연구소 보유 법인 — 연구원 연구보조비 추가 비과세 설계",
        situation: "기업부설연구소 소속 연구원 5명에게 연구보조비 월 20만원 추가 지급. 기존 급여에서 분리 설계.",
        calculation: "5명 × 월 20만원 × 12 = 1,200만원 비과세. 연구원 소득세 절감(세율 24% 가정) = 1,200만원 × 24% = 288만원.",
        result: "연구원 5명 연간 소득세 288만원 절감. 연구소 유지+R&D 세액공제+연구보조비 비과세 삼중 혜택 가능.",
        taxSaved: 2_880_000,
      },
    ],
  },
]
