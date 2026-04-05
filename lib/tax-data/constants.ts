// ============================================================
// 절세 데이터베이스 - 상수 정의
// ============================================================

/** 세금 카테고리 한글 매핑 */
export const TAX_CATEGORY_MAP = {
  income: "소득세",
  corporate: "법인세",
  vat: "부가가치세",
  inheritance: "상속세",
  gift: "증여세",
  capital_gains: "양도소득세",
  comprehensive_property: "종합부동산세",
  acquisition: "취득세",
  property: "재산세",
  securities: "증권거래세",
  local: "지방세",
} as const

/** 대상자 유형 한글 매핑 */
export const TARGET_AUDIENCE_MAP = {
  employee: "직장인",
  freelancer: "프리랜서",
  sole_proprietor: "개인사업자",
  corporation: "법인",
  investor: "투자자",
  retiree: "퇴직자",
  youth: "청년",
  newlywed: "신혼부부",
  parent: "출산/양육 가구",
  senior: "고령자",
  heir: "상속인/수증자",
  business_owner: "기업 오너",
  multi_home_owner: "다주택자",
  all: "전체",
} as const

/**
 * 2026년 종합소득세율 구간
 * 근거: 소득세법 제55조 제1항 (2023.1.1 시행)
 * 변경: 2023년 개정 — 하위 2개 구간 조정 (1,200→1,400만, 4,600→5,000만)
 * 출처: https://www.law.go.kr - 소득세법 제55조
 * 검증: 2026-01-01 기준 현행법 확인 완료
 */
export const INCOME_TAX_BRACKETS_2026 = [
  { min: 0,           max: 14_000_000,     rate: 0.06, label: "1,400만 이하" },
  { min: 14_000_000,  max: 50_000_000,     rate: 0.15, label: "1,400만~5,000만" },
  { min: 50_000_000,  max: 88_000_000,     rate: 0.24, label: "5,000만~8,800만" },
  { min: 88_000_000,  max: 150_000_000,    rate: 0.35, label: "8,800만~1.5억" },
  { min: 150_000_000, max: 300_000_000,    rate: 0.38, label: "1.5억~3억" },
  { min: 300_000_000, max: 500_000_000,    rate: 0.40, label: "3억~5억" },
  { min: 500_000_000, max: 1_000_000_000,  rate: 0.42, label: "5억~10억" },
  { min: 1_000_000_000, max: Infinity,     rate: 0.45, label: "10억 초과" },
] as const

/**
 * 2026년 법인세율 구간
 * 근거: 법인세법 제55조
 * 변경 이력:
 *   - 2023년 개정: 각 구간 1%p 인하 (10→9, 20→19, 22→21, 25→24)
 *   - 2025년 개정: 각 구간 1%p 재인상 (9→10, 19→20, 21→22, 24→25)
 * 2026.1.1 시행 기준: 10% / 20% / 22% / 25%
 * 출처: 기획재정부 2025 세법개정안, 2026_세법변경_핵심요약 자료
 * 검증: 2026-04-03 첨부자료 대조 완료
 */
export const CORPORATE_TAX_BRACKETS_2026 = [
  { min: 0,             max: 200_000_000,     rate: 0.10, label: "2억 이하" },
  { min: 200_000_000,   max: 20_000_000_000,  rate: 0.20, label: "2억~200억" },
  { min: 20_000_000_000, max: 300_000_000_000, rate: 0.22, label: "200억~3000억" },
  { min: 300_000_000_000, max: Infinity,       rate: 0.25, label: "3000억 초과" },
] as const

/**
 * 2026년 상속세·증여세율 구간
 * 근거: 상속세 및 증여세법 제26조 (세율)
 * 참고: 2025년 세법 개정안에서 최고세율 인하(50→40%) 논의되었으나
 *       국회 미통과로 기존 세율 유지 (2026.1.1 기준)
 * 출처: https://www.law.go.kr - 상속세 및 증여세법 제26조
 * 검증: 2026-01-01 기준 현행법 확인 필요 (국회 개정 동향 주시)
 */
export const INHERITANCE_TAX_BRACKETS_2026 = [
  { min: 0,             max: 100_000_000,      rate: 0.10, label: "1억 이하" },
  { min: 100_000_000,   max: 500_000_000,      rate: 0.20, label: "1억~5억" },
  { min: 500_000_000,   max: 1_000_000_000,    rate: 0.30, label: "5억~10억" },
  { min: 1_000_000_000, max: 3_000_000_000,    rate: 0.40, label: "10억~30억" },
  { min: 3_000_000_000, max: Infinity,          rate: 0.50, label: "30억 초과" },
] as const

/**
 * 2026년 양도소득세율
 * 근거: 소득세법 제104조 (세율)
 * 참고: 다주택 중과는 소득세법 시행령 부칙에 의해 2026.5.9까지 유예
 * 출처: https://www.law.go.kr - 소득세법 제104조
 */
export const CAPITAL_GAINS_TAX_RATES_2026 = {
  // 토지·건물 (주택 외) — 소득세법 제104조 제1항 제2호의3
  land_under1Year: 0.50,    // 1년 미만 보유: 50%
  land_under2Years: 0.40,   // 1~2년 보유: 40%
  // 주택·조합원입주권·분양권 — 소득세법 제104조 제1항 제2호의4~6
  house_under1Year: 0.70,   // 1년 미만 보유: 70%
  house_under2Years: 0.60,  // 1~2년 보유: 60%
  // 2년 이상 보유
  over2Years: "기본세율(6~45%)",  // 2년 이상 보유 (소득세법 제55조 누진세율 적용)
  // 다주택 중과 (조정대상지역)
  // 소득세법 제104조 제7항, 시행령 부칙 제20조에 의해 2022.5.10~2026.5.9 유예
  multiHome2: 0.20,       // 2주택 중과: 기본세율+20%p (유예중, 기본세율만 적용)
  multiHome3: 0.30,       // 3주택+ 중과: 기본세율+30%p (유예중, 기본세율만 적용)
  // 비사업용 토지 — 소득세법 제104조 제1항 제2호의7
  nonBusinessLand: 0.10,  // 기본세율 + 10%p
} as const

/**
 * 2026년 주요 세금 신고·납부 일정 캘린더
 * 근거: 국세기본법, 소득세법, 법인세법, 부가가치세법, 지방세법 등
 * 주의: 공휴일·토요일이면 다음 영업일로 연장
 * 검증: 국세청 홈택스 신고일정 기준
 */
export const TAX_CALENDAR_2026 = [
  { month: 1, name: "부가세 확정신고 (2기)", deadline: "01-25", legalBasis: "부가가치세법 제49조" },
  { month: 1, name: "연말정산 간소화 서비스 오픈", deadline: "01-15", legalBasis: "소득세법 제165조의2" },
  { month: 2, name: "연말정산 신고", deadline: "02-28", legalBasis: "소득세법 제137조" },
  { month: 3, name: "법인세 신고 (12월 결산법인)", deadline: "03-31", legalBasis: "법인세법 제60조" },
  { month: 4, name: "부가세 예정신고 (1기)", deadline: "04-25", legalBasis: "부가가치세법 제48조" },
  { month: 5, name: "종합소득세 확정신고", deadline: "05-31", legalBasis: "소득세법 제70조" },
  { month: 6, name: "성실신고 확인 대상자 종소세", deadline: "06-30", legalBasis: "소득세법 제70조의2" },
  { month: 7, name: "부가세 확정신고 (1기)", deadline: "07-25", legalBasis: "부가가치세법 제49조" },
  { month: 7, name: "재산세 납부 (건축물·주택 1/2)", deadline: "07-31", legalBasis: "지방세법 제115조" },
  { month: 9, name: "재산세 납부 (토지·주택 1/2)", deadline: "09-30", legalBasis: "지방세법 제115조" },
  { month: 10, name: "부가세 예정신고 (2기)", deadline: "10-25", legalBasis: "부가가치세법 제48조" },
  { month: 11, name: "종합소득세 중간예납 납부", deadline: "11-30", legalBasis: "소득세법 제65조" },
  { month: 12, name: "종합부동산세 납부", deadline: "12-15", legalBasis: "종합부동산세법 제16조" },
] as const

// ============================================================
// 2026년 신규/변경 세법 상수 (첨부 자료 + 딥리서치 기반)
// 출처: 2026_세법변경_핵심요약.md, 기획재정부, 국세청, KPMG, 삼일PwC
// 검증: 2026-04-03 첨부자료 대조 완료
// ============================================================

/**
 * 2026년 배당소득 분리과세 (신설, 2026~2028 한시 적용)
 * 고배당 상장법인 배당에 한하여 종합과세 대신 분리과세 선택 가능
 * 2026.1.1 이후 지급분부터 2028.12.31까지 한시 적용
 * 세율: 국세 기준 (지방소득세 10% 별도 — 예: 14% → 지방세포함 15.4%)
 */
export const DIVIDEND_SEPARATE_TAX_2026 = [
  { min: 0,              max: 20_000_000,      rate: 0.14,  label: "2천만 이하 (14%, 지방세포함 15.4%)" },
  { min: 20_000_000,     max: 300_000_000,     rate: 0.20,  label: "2천만~3억 (20%, 지방세포함 22%)" },
  { min: 300_000_000,    max: 5_000_000_000,   rate: 0.25,  label: "3억~50억 (25%, 지방세포함 27.5%)" },
  { min: 5_000_000_000,  max: Infinity,        rate: 0.30,  label: "50억 초과 (30%, 지방세포함 33%)" },
] as const

/**
 * 2026년 부가가치세 핵심 기준
 */
export const VAT_THRESHOLDS_2026 = {
  simplifiedTaxpayerLimit: 104_000_000,  // 간이과세 기준: 1억 400만원 미만
  paymentExemptionLimit: 48_000_000,     // 납부면제: 4,800만원 미만
  falseTaxInvoicePenalty: 0.04,          // 허위세금계산서 가산세: 3→4%
} as const

/**
 * 2026년 가상자산 과세 상태
 */
export const CRYPTO_TAX_2026 = {
  status: "비과세" as const,
  scheduledStart: "2027-01-01",
  exemptionAmount: 2_500_000,
  rate: 0.22,
  note: "2027.1.1 시행 예정이나 4차 유예 가능성 있음",
} as const

/**
 * 2026년 주요 세액공제/소득공제 기준
 */
export const DEDUCTION_LIMITS_2026 = {
  cardChildExtra: { under70m: 500_000, over70m: 250_000 },
  childCredit: { child1: 250_000, child2: 550_000, child3plus_extra: 400_000 },
  childcareAllowance: 200_000,
  marriageCredit: 500_000,
  pensionLimit: { pensionSavings: 6_000_000, total: 9_000_000 },
  pensionRate: { under55m: 0.165, over55m: 0.132 },
} as const

/**
 * 2026년 상속세 자녀공제 (현행법 기준)
 * 참고: 2025년 세법개정안에서 5억 확대 논의되었으나 국회 부결 — 현행 5천만원 유지
 */
export const INHERITANCE_DEDUCTIONS_2026 = {
  childPerPerson: 50_000_000,
  basicDeduction: 200_000_000,
  lumpSumDeduction: 500_000_000,
  spouseDeduction: 500_000_000,
  spouseDeductionMax: 3_000_000_000,
} as const

/** 2026년 최저임금 */
export const MINIMUM_WAGE_2026 = 10_320
