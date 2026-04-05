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
  },
]
