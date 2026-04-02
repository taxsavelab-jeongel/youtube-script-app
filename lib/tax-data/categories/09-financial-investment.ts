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
  },
  {
    id: "fin_dividend_separate_tax",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "배당소득",
    savingType: "special_rate", targetAudience: ["investor", "business_owner"],
    name: "배당소득 분리과세 (2026 신설)",
    shortDescription: "배당소득 구간별 15.4~33% 분리과세 선택 가능",
    fullDescription: "2026년 1월 1일 이후 배당분부터 분리과세 선택 가능. 2천만원 이하 15.4%, 2천만~3억 22%, 3억~50억 27.5%, 50억 초과 33%. 종합과세(최대 49.5%)보다 유리할 수 있음.",
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
  },
]
