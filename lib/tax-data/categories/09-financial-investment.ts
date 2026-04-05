// ============================================================
// 09. 금융·투자 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const financialInvestment: TaxSavingItem[] = [
  {
    id: "fin_isa_account",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "금융투자",
    savingType: "exemption", targetAudience: ["all", "investor"],
    name: "ISA (개인종합자산관리계좌) 비과세",
    shortDescription: "금융소득 200~400만원 비과세, 초과분 9.9% 분리과세",
    fullDescription: "ISA 계좌 내 발생 수익에 대해 일반형 200만원, 서민·농어민형 400만원까지 비과세. 초과분은 9.9% 분리과세. 의무가입 3년, 연 2,000만원(총 1억원) 납입 한도.",
    tags: ["ISA", "비과세", "분리과세", "금융소득", "절세"],
    impactLevel: "medium", maxSavingAmount: 4_000_000, applicableRate: "200~400만원 비과세, 초과 9.9%",
    requirements: [
      { id: "req_1", description: "만 19세 이상 (근로소득자 15세↑)", type: "age", critical: true },
      { id: "req_2", description: "1인 1계좌", type: "other", critical: true },
      { id: "req_3", description: "3년 의무 가입", type: "period", value: "3년", critical: true },
    ],
    legalBasis: [{ law: "조세특례제한법", article: "제91조의18", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "annual_deposit", label: "연간 납입액", type: "number", unit: "원", max: 20_000_000, required: true },
      { id: "expected_return", label: "예상 수익률", type: "number", unit: "%", required: false },
    ],
    calculationFormula: "비과세 한도 내 수익: 세금 0원. 초과분: 9.9% 분리과세 (종합과세 제외)",
    urgency: "year_round", difficulty: "easy",
    steps: ["ISA 계좌 개설 (은행/증권사)", "연 2,000만원 한도 내 납입", "3년 유지 후 비과세 혜택 수령"],
    contentHook: { title: "ISA 계좌, 왜 안 만들면 손해인지 3분에 설명", hook: "수익 200만원까지 세금 0원, 초과해도 9.9%만!", targetKeyword: "ISA 계좌 비과세 2026", estimatedViews: "medium" },
    warnings: [
      "ISA 비과세 한도(일반 200만원, 서민·농어민 400만원)는 3년 의무가입 기간 충족 후 해지 시 적용 — 중도 해지 시 일반 과세",
      "금융투자소득세(금투세)는 2025년 폐지 확정. ISA 내 손익통산 방식은 유지되므로 계좌 내 손실·이익 관리 전략 여전히 유효",
      "총납입한도 1억원(연 2,000만원) 초과 납입 불가. 미납입분 이월 가능 여부 가입 조건 확인 필요",
    ],
    practicalCases: [
      {
        title: "ISA 3년 운용 후 해지 — 비과세 혜택",
        situation: "일반형 ISA 계좌에 3년간 연 2,000만원씩 납입 (총 6,000만원). 수익 300만원 발생.",
        calculation: "비과세 200만원 초과분 100만원 × 9.9% = 9.9만원 과세. 일반 과세(15.4%) 대비 300만원 × 15.4% = 46.2만원 절세",
        result: "3년간 약 36만원 절세. 수익이 클수록 절세 효과 증가",
        taxSaved: 360000,
      },
    ],
  },
  {
    id: "fin_dividend_separate_tax",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "배당소득",
    savingType: "special_rate", targetAudience: ["investor", "business_owner"],
    name: "배당소득 분리과세 (2026 신설)",
    shortDescription: "배당소득 구간별 14~30% 분리과세 선택 가능 (2026~2028 한시)",
    fullDescription: "2026.1.1 이후 배당분부터 분리과세 선택 가능 (2026~2028 한시 적용). 2천만원 이하 14%(지방세포함 15.4%), 2천만~3억 20%(22%), 3억~50억 25%(27.5%), 50억 초과 30%(33%). 종합과세(최대 49.5%)보다 유리할 수 있음.",
    tags: ["배당", "분리과세", "금융소득", "법인", "주주"],
    impactLevel: "high", applicableRate: "15.4~33% (종합과세 최대 49.5% 대비)",
    requirements: [{ id: "req_1", description: "2026.1.1 이후 지급 배당", type: "period", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제14조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "dividend_income", label: "배당소득", type: "number", unit: "원", required: true },
      { id: "other_income", label: "배당 외 종합소득", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "분리과세 vs 종합과세 비교. 고소득자일수록 분리과세가 유리.",
    urgency: "year_round", difficulty: "hard",
    steps: ["배당소득 규모 파악", "종합과세 vs 분리과세 세액 비교", "유리한 과세 방식 선택", "소득세 신고 시 반영"],
    contentHook: { title: "2026 배당소득 분리과세, 법인 사장님 필수 전략", hook: "배당 3억 받으면 종합과세 대비 수천만원 절세!", targetKeyword: "배당소득 분리과세 2026", estimatedViews: "medium" },
    warnings: [
      "분리과세 선택권은 2026~2028년 한시 적용 — 2029년 이후 연장 여부 미확정으로 장기 배당 전략 수립 시 주의",
      "배당소득 분리과세 적용 시 건강보험료 피부양자 탈락 여부와 함께 검토 필요",
      "금투세 폐지(2025 확정)로 배당소득 분리과세가 금융소득 절세의 핵심 수단으로 부상 — 종합소득세 확정신고 시 선택 신청 필수",
    ],
    practicalCases: [
      {
        title: "배당소득 5억원 종합과세 vs 분리과세 비교",
        situation: "법인 대표, 배당소득 5억원. 다른 종합소득 1억원 추가 보유.",
        calculation: "종합과세: 합산 6억 × 최고세율 45%(지방세 포함 49.5%) 구간. 분리과세: 3억까지 25%, 초과 2억 25% → 세율 대폭 절감",
        result: "분리과세 선택 시 약 5,000만~1억원 절세 효과 (소득구간에 따라 상이)",
        taxSaved: 75000000,
      },
    ],
  },
]
