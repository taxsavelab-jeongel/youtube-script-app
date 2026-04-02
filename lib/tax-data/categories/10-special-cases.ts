// ============================================================
// 10. 특수 상황 절세 (퇴직, 유산취득세 전환 대비 등)
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const specialCases: TaxSavingItem[] = [
  {
    id: "special_retirement_tax",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "퇴직소득",
    savingType: "deferral", targetAudience: ["retiree", "employee"],
    name: "퇴직금 IRP 이체 과세이연",
    shortDescription: "퇴직금을 IRP로 이체하면 퇴직소득세 과세이연",
    fullDescription: "퇴직금을 IRP(개인형 퇴직연금)로 이체하면 퇴직소득세 납부를 연금 수령 시점까지 이연. 55세 이후 연금으로 수령하면 퇴직소득세의 60~70%만 부과 (연금소득세).",
    tags: ["퇴직금", "IRP", "과세이연", "연금", "퇴직소득세"],
    impactLevel: "high", applicableRate: "퇴직소득세 30~40% 절감",
    requirements: [{ id: "req_1", description: "퇴직금을 IRP 계좌로 이체", type: "other", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제146조의2", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "retirement_pay", label: "퇴직금", type: "number", unit: "원", required: true },
      { id: "retirement_tax", label: "퇴직소득세", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "IRP 이체 시 퇴직소득세 이연. 연금 수령 시 퇴직소득세 × 60~70% 수준만 과세.",
    urgency: "event_based", difficulty: "easy",
    steps: ["퇴직 전 IRP 계좌 개설", "퇴직금 전액 IRP로 이체 (60일 이내)", "55세 이후 연금으로 수령 계획"],
    contentHook: { title: "퇴직금 받으면 무조건 IRP로! 세금 40% 아끼는 법", hook: "그냥 받으면 세금 폭탄, IRP로 받으면 40% 절세!", targetKeyword: "퇴직금 IRP 이체 절세", estimatedViews: "high" },
  },
  {
    id: "special_inheritance_reform_prep",
    version: "2026.1", lastUpdated: "2026-04-01",
    category: "inheritance", subcategory: "유산취득세 전환 대비",
    savingType: "structure", targetAudience: ["heir", "business_owner", "senior"],
    name: "유산취득세 전환 대비 전략 (2028 시행 예정)",
    shortDescription: "유산세→유산취득세 전환 시 상속인 분산으로 절세 가능",
    fullDescription: "정부가 2028년 시행을 목표로 유산세(피상속인 전체 재산 기준)에서 유산취득세(상속인 각자 취득분 기준)로 전환 예정. 상속인이 여러 명이면 각각 낮은 세율구간에서 과세되므로 세 부담 크게 감소. 지금부터 상속 구조를 설계해야 함.",
    tags: ["유산취득세", "상속세개편", "상속설계", "2028"],
    impactLevel: "very_high", applicableRate: "상속인 분산 시 세율구간 대폭 하락",
    requirements: [
      { id: "req_1", description: "상속 계획이 있는 고자산가", type: "asset", critical: false },
    ],
    legalBasis: [{ law: "상속세 및 증여세법 개정안", article: "국회 심의 중", effectiveDate: "2028-01-01 (예정)" }],
    calculationParams: [
      { id: "total_estate", label: "총 상속재산", type: "number", unit: "원", required: true },
      { id: "heir_count", label: "상속인 수", type: "number", unit: "명", required: true },
    ],
    calculationFormula: "현행: 전체 유산에 10~50% 누진과세. 개편 후: 각 상속인 취득분에 개별 과세 → 세율구간 분산",
    urgency: "long_term", difficulty: "expert",
    steps: [
      "현행 상속세 vs 유산취득세 시뮬레이션",
      "상속인 구성 및 재산 분배 계획 수립",
      "사전증여 vs 상속 시점 비교",
      "2028년 시행 전 준비 사항 점검",
    ],
    contentHook: { title: "2028 상속세 대변혁! 지금 준비 안 하면 수억 차이", hook: "자녀 3명이면 상속세가 절반으로? 유산취득세의 비밀", targetKeyword: "유산취득세 전환 2028", estimatedViews: "high" },
    warnings: ["아직 국회 심의 중으로 최종 확정 전까지 변동 가능"],
  },
]
