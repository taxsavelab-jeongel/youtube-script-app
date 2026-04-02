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

/** 2026년 소득세율 구간 */
export const INCOME_TAX_BRACKETS_2026 = [
  { min: 0,           max: 14_000_000,     rate: 0.06 },
  { min: 14_000_000,  max: 50_000_000,     rate: 0.15 },
  { min: 50_000_000,  max: 88_000_000,     rate: 0.24 },
  { min: 88_000_000,  max: 150_000_000,    rate: 0.35 },
  { min: 150_000_000, max: 300_000_000,    rate: 0.38 },
  { min: 300_000_000, max: 500_000_000,    rate: 0.40 },
  { min: 500_000_000, max: 1_000_000_000,  rate: 0.42 },
  { min: 1_000_000_000, max: Infinity,     rate: 0.45 },
] as const

/** 2026년 법인세율 구간 (1%p 인상 반영: 9→10, 19→20, 21→22, 24→25) */
export const CORPORATE_TAX_BRACKETS_2026 = [
  { min: 0,             max: 200_000_000,     rate: 0.10 },
  { min: 200_000_000,   max: 20_000_000_000,  rate: 0.20 },
  { min: 20_000_000_000, max: 300_000_000_000, rate: 0.22 },
  { min: 300_000_000_000, max: Infinity,       rate: 0.25 },
] as const

/** 2026년 상속세율 구간 */
export const INHERITANCE_TAX_BRACKETS_2026 = [
  { min: 0,             max: 100_000_000,      rate: 0.10 },
  { min: 100_000_000,   max: 500_000_000,      rate: 0.20 },
  { min: 500_000_000,   max: 1_000_000_000,    rate: 0.30 },
  { min: 1_000_000_000, max: 3_000_000_000,    rate: 0.40 },
  { min: 3_000_000_000, max: Infinity,          rate: 0.50 },
] as const

/** 2026년 양도소득세율 (기본) */
export const CAPITAL_GAINS_TAX_RATES_2026 = {
  under1Year: 0.45,       // 1년 미만 보유
  under2Years: 0.35,      // 1~2년 보유 (기본세율과 비교 중 높은것)
  over2Years: "기본세율",   // 2년 이상 보유 (누진세율 적용)
  multiHome2: 0.20,       // 2주택 중과 (기본세율+20%p, 현재 유예중)
  multiHome3: 0.30,       // 3주택+ 중과 (기본세율+30%p, 현재 유예중)
} as const

/** 신고 일정 캘린더 */
export const TAX_CALENDAR_2026 = [
  { month: 1, name: "부가세 확정신고 (2기)", deadline: "01-25" },
  { month: 1, name: "연말정산 간소화 서비스 오픈", deadline: "01-15" },
  { month: 2, name: "연말정산 신고", deadline: "02-28" },
  { month: 3, name: "법인세 신고 (12월 결산법인)", deadline: "03-31" },
  { month: 4, name: "부가세 예정신고 (1기)", deadline: "04-25" },
  { month: 5, name: "종합소득세 신고", deadline: "05-31" },
  { month: 6, name: "성실신고 확인 대상자 종소세", deadline: "06-30" },
  { month: 7, name: "부가세 확정신고 (1기)", deadline: "07-25" },
  { month: 7, name: "재산세 납부 (건축물)", deadline: "07-31" },
  { month: 8, name: "종합소득세 중간예납", deadline: "08-31" },
  { month: 9, name: "재산세 납부 (토지)", deadline: "09-30" },
  { month: 10, name: "부가세 예정신고 (2기)", deadline: "10-25" },
  { month: 11, name: "종합소득세 중간예납", deadline: "11-30" },
  { month: 12, name: "종합부동산세 납부", deadline: "12-15" },
] as const
