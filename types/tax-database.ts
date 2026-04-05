// ============================================================
// 절세 컨설팅 솔루션 - 전체 절세 데이터베이스 타입 정의
// 2026년 대한민국 세법 기준
// ============================================================

// ── 1. 기본 열거형 ──────────────────────────────────────────

/** 세금 대분류 */
export type TaxCategory =
  | "income"           // 소득세 (근로/사업/기타)
  | "corporate"        // 법인세
  | "vat"              // 부가가치세
  | "inheritance"      // 상속세
  | "gift"             // 증여세
  | "capital_gains"    // 양도소득세
  | "comprehensive_property" // 종합부동산세
  | "acquisition"      // 취득세
  | "property"         // 재산세
  | "securities"       // 증권거래세
  | "local"            // 지방세 (기타)

/** 절세 수단 유형 */
export type TaxSavingType =
  | "deduction"        // 소득공제 (과세표준 감소)
  | "credit"           // 세액공제 (산출세액 감소)
  | "exemption"        // 비과세 (아예 과세 안 됨)
  | "reduction"        // 감면 (세율/세액 경감)
  | "deferral"         // 과세이연 (납부 시기 연기)
  | "split"            // 소득분산 (세율구간 낮추기)
  | "structure"        // 구조변경 (법인전환 등)
  | "special_rate"     // 특례세율 적용

/** 대상자 유형 */
export type TargetAudience =
  | "employee"         // 근로소득자 (직장인)
  | "freelancer"       // 프리랜서/인적용역
  | "sole_proprietor"  // 개인사업자
  | "corporation"      // 법인
  | "investor"         // 투자자 (금융/부동산)
  | "retiree"          // 퇴직자/연금수령자
  | "youth"            // 청년 (만 15~34세)
  | "newlywed"         // 신혼부부
  | "parent"           // 출산/양육 가구
  | "senior"           // 고령자 (60세+)
  | "heir"             // 상속인/수증자
  | "business_owner"   // 기업 오너/대표이사
  | "multi_home_owner" // 다주택자
  | "all"              // 전체

/** 난이도 */
export type Difficulty = "easy" | "medium" | "hard" | "expert"

/** 절세 효과 규모 */
export type ImpactLevel = "low" | "medium" | "high" | "very_high"

/** 시기/긴급도 */
export type Urgency = "year_round" | "year_end" | "quarterly" | "event_based" | "long_term"

// ── 2. 핵심 데이터 구조 ─────────────────────────────────────

/** 법령 근거 */
export interface LegalBasis {
  law: string           // 법률명 (예: "조세특례제한법")
  article: string       // 조항 (예: "제30조의6")
  clause?: string       // 항/호 (예: "제1항")
  url?: string          // 국가법령정보센터 URL
  effectiveDate: string // 시행일 (예: "2026-01-01")
  expiryDate?: string   // 일몰 기한 (있는 경우)
}

/** 적용 요건 */
export interface Requirement {
  id: string
  description: string   // 요건 설명
  type: "income_limit" | "age" | "period" | "employment" | "region" | "business_type" | "asset" | "family" | "other"
  value?: string        // 구체적 기준값 (예: "총급여 7,000만원 이하")
  critical: boolean     // 필수 요건 여부
}

/** 절세 금액 계산 파라미터 */
export interface CalculationParam {
  id: string
  label: string         // 입력 필드명 (예: "연간 총급여")
  type: "number" | "select" | "boolean" | "date"
  unit?: string         // 단위 (예: "원", "년", "명")
  options?: { label: string; value: string }[] // select인 경우
  min?: number
  max?: number
  defaultValue?: number | string | boolean
  required: boolean
}

/** 절세 시나리오 결과 */
export interface SavingResult {
  beforeTax: number     // 절세 전 세금
  afterTax: number      // 절세 후 세금
  savingAmount: number  // 절세 금액
  savingRate: number    // 절세율 (%)
  notes?: string        // 부가 설명
}

/** 사후관리 요건 (가업승계 등) */
export interface PostManagement {
  period: number        // 사후관리 기간 (년)
  requirements: {
    item: string        // 관리 항목
    standard: string    // 기준
    penalty: string     // 위반 시 제재
  }[]
}

/** 관련 신고 일정 */
export interface TaxSchedule {
  name: string          // 일정명
  deadline: string      // 기한 (예: "매년 5월 31일")
  singoType: string     // 신고 유형
  singoMethod: string   // 신고 방법 (홈택스 등)
}

/** 검증 상태 */
export type VerificationStatus =
  | "unverified"       // 미검증 (AI 생성 또는 초기 데이터)
  | "self_checked"     // 자체 확인 (법령 원문 대조 완료)
  | "expert_reviewed"  // 세무사 감수 완료
  | "outdated"         // 법 개정으로 구법 상태

/** 검증 이력 */
export interface VerificationRecord {
  status: VerificationStatus
  verifiedBy: string     // 검증자 (예: "시스템", "김세무사")
  verifiedDate: string   // 검증일
  notes?: string         // 검증 메모
  nextReviewDate?: string // 다음 검토 예정일
}

/** 법령 원문 데이터 (세무사 수준 정확성 확보) */
export interface LegalText {
  lawName: string         // 법률명
  articleNumber: string   // 조문 번호 (예: "제18조의2")
  articleTitle: string    // 조문 제목
  fullText: string        // 조문 전문 (원문 그대로)
  keyProvisions: string[] // 핵심 조항 요약 (항/호 단위)
  effectiveDate: string   // 시행일
  lastAmendedDate: string // 최종 개정일
  sourceUrl: string       // 법제처 URL
}

/** 실무 사례 */
export interface PracticalCase {
  title: string           // 사례 제목
  situation: string       // 상황 설명
  calculation: string     // 계산 과정
  result: string          // 결과
  taxSaved: number        // 절세 금액
  source?: string         // 출처 (국세청 해석 등)
}

/** 자주 묻는 질문 */
export interface FAQ {
  question: string
  answer: string
  legalBasis?: string     // 근거 조문
}

/** 유튜브 콘텐츠 연계 정보 */
export interface ContentHook {
  title: string         // 추천 영상 제목
  hook: string          // 시청자 관심 유발 포인트
  targetKeyword: string // SEO 키워드
  estimatedViews: "low" | "medium" | "high" // 예상 관심도
}

// ── 3. 메인 절세 항목 (TaxSavingItem) ───────────────────────

export interface TaxSavingItem {
  // 식별
  id: string                          // 고유 ID (예: "inheritance_business_succession")
  version: string                     // 데이터 버전 (예: "2026.1")
  lastUpdated: string                 // 최종 업데이트일

  // 분류
  category: TaxCategory               // 세금 대분류
  subcategory: string                  // 세부 분류 (예: "연말정산", "가업승계")
  savingType: TaxSavingType            // 절세 수단 유형
  targetAudience: TargetAudience[]     // 대상자

  // 기본 정보
  name: string                         // 항목명
  shortDescription: string             // 한줄 설명 (50자 이내)
  fullDescription: string              // 상세 설명
  tags: string[]                       // 검색 태그

  // 절세 효과
  impactLevel: ImpactLevel             // 절세 효과 규모
  maxSavingAmount?: number             // 최대 절세 가능 금액 (원)
  maxDeductionAmount?: number          // 최대 공제/감면 한도 (원)
  applicableRate?: string              // 적용 세율/공제율 (예: "15%", "10~20%")

  // 요건 및 조건
  requirements: Requirement[]          // 적용 요건 목록
  exclusions?: string[]                // 적용 제외 사항
  conflicts?: string[]                 // 중복 적용 불가 항목 ID

  // 법령 근거
  legalBasis: LegalBasis[]             // 관련 법령
  postManagement?: PostManagement      // 사후관리 (해당 시)

  // 계산
  calculationParams: CalculationParam[] // 시뮬레이션 입력 파라미터
  calculationFormula?: string           // 계산 로직 설명

  // 일정
  schedule?: TaxSchedule               // 관련 신고 일정
  urgency: Urgency                     // 시기/긴급도

  // 난이도 및 실행
  difficulty: Difficulty                // 실행 난이도
  steps: string[]                      // 실행 단계 (체크리스트)
  requiredDocuments?: string[]          // 필요 서류

  // 콘텐츠 연계
  contentHook?: ContentHook            // 유튜브 콘텐츠 연계
  relatedItems?: string[]              // 관련 절세 항목 ID

  // 주의사항
  warnings?: string[]                  // 주의/리스크
  commonMistakes?: string[]            // 흔한 실수

  // ── 신뢰도 강화 필드 (세무사 수준) ──────────────────────
  verification?: VerificationRecord    // 검증 상태
  legalTexts?: LegalText[]             // 법령 원문 (조문 전문)
  practicalCases?: PracticalCase[]     // 실무 사례
  faqs?: FAQ[]                         // 자주 묻는 질문
  calculationLogic?: string            // 프로그래밍 가능한 계산 로직 설명
  crossReferences?: string[]           // 관련 시행령/시행규칙 조문
  taxAuthorityGuide?: string           // 국세청 안내자료 요약
}

// ── 4. 사용자 프로필 ────────────────────────────────────────

export interface UserTaxProfile {
  // 기본 정보
  id: string
  type: TargetAudience
  age: number
  region: "capital_metro" | "capital_non_metro" | "non_capital" // 수도권과밀/수도권외/비수도권

  // 소득 정보
  annualIncome: number                  // 연간 총소득 (원)
  incomeType: ("salary" | "business" | "freelance" | "rental" | "financial" | "pension" | "other")[]
  totalAssets?: number                  // 총 자산

  // 가족 구성
  dependents: number                    // 부양가족 수
  children: number                      // 자녀 수
  childrenUnder6?: number               // 6세 이하 자녀
  isNewlywed?: boolean                  // 신혼부부 여부
  hasRecentBirth?: boolean              // 최근 출산 여부

  // 부동산
  homeCount: number                     // 주택 보유 수
  homeValues?: number[]                 // 주택 공시가격 목록
  hasJeonse?: boolean                   // 전세 거주 여부
  monthlyRent?: number                  // 월세 금액

  // 사업 관련
  businessType?: string                 // 업종 (표준산업분류)
  businessYears?: number                // 사업 영위 기간
  employeeCount?: number                // 직원 수
  isRepresentative?: boolean            // 대표이사 여부
  corporateValue?: number               // 기업 가치 (법인)

  // 금융
  pensionSavings?: number               // 연금저축 납입액
  irpContribution?: number              // IRP 납입액
  stockInvestment?: number              // 주식 투자 규모

  // 승계 관련
  hasSuccessionPlan?: boolean           // 가업승계 계획
  parentBusinessYears?: number          // 부모 경영 기간
  parentAge?: number                    // 증여자(부모) 연령
}

// ── 5. 절세 추천 결과 ───────────────────────────────────────

export interface TaxSavingRecommendation {
  userId: string
  generatedAt: string
  totalEstimatedSaving: number          // 총 예상 절세 금액

  recommendations: {
    item: TaxSavingItem                 // 절세 항목
    priority: number                    // 우선순위 (1이 가장 높음)
    estimatedSaving: number             // 예상 절세 금액
    applicability: "fully" | "partially" | "conditional" // 적용 가능성
    reason: string                      // 추천 이유
    actionRequired: string              // 필요 액션
    deadline?: string                   // 기한
  }[]

  scenarios: {
    name: string                        // 시나리오명
    description: string
    items: string[]                     // 포함된 절세 항목 ID 목록
    result: SavingResult
  }[]
}
