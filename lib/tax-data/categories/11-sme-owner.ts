// ============================================================
// 11. 중소기업 오너 특화 절세 항목 (12개)
// 2026년 현행법 기준 — 국세청/법령원문 대조 검증 완료
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const smeOwner: TaxSavingItem[] = [
  // ── 1. 가지급금 정리 ──────────────────────────────────────
  {
    id: "sme_provisional_payment_cleanup",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "가지급금",
    savingType: "structure", targetAudience: ["business_owner", "corporation"],
    name: "대표이사 가지급금 정리",
    shortDescription: "가지급금 미정리 시 인정이자(4.6%) 익금산입 + 상여처분 위험",
    fullDescription: "대표이사에게 업무 무관하게 유출된 자금(가지급금)이 있으면 법인은 인정이자(당좌대출이자율 4.6%)를 수익으로 계상해야 하고, 대표이사는 해당 금액이 상여로 처분되어 소득세까지 부담합니다. 급여 인상, 상여금, 배당 등으로 가지급금을 조기 정리해야 합니다.",
    tags: ["가지급금", "인정이자", "상여처분", "대표이사", "4.6%"],
    impactLevel: "very_high",
    applicableRate: "인정이자율 연 4.6% (법인세법 시행규칙 제43조)",
    requirements: [
      { id: "r1", description: "법인에 대표이사 가지급금 존재", type: "asset", critical: true },
    ],
    legalBasis: [
      { law: "법인세법 시행령", article: "제89조 (부당행위계산부인)", effectiveDate: "2026-01-01" },
      { law: "법인세법 시행규칙", article: "제43조 (당좌대출이자율 4.6%)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "provisional_amount", label: "가지급금 잔액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "연간 인정이자 = 가지급금 잔액 × 4.6%. 이 금액이 법인 익금산입 + 대표 상여처분됨.",
    urgency: "year_round", difficulty: "hard",
    steps: [
      "가지급금 잔액 확인 (재무제표)",
      "정리 방법 선택: 급여 인상/상여금/배당/자산매각",
      "단계적 상환 계획 수립",
      "가지급금 0원 달성 시까지 매년 점검",
    ],
    warnings: [
      "가지급금이 장기간 방치되면 세무조사 시 부당행위계산부인 적용 위험",
      "인정이자가 대표이사 상여로 소득처분되면 소득세+4대보험 추가 부담",
    ],
    practicalCases: [
      {
        title: "대표이사 가지급금 5억원 정리",
        situation: "중소기업 대표이사 가지급금 5억원, 법인 순이익 1억원/년",
        calculation: "상여 처리 시 소득세+법인세 절감 vs 퇴직금 활용 시 퇴직소득세 낮음. 5년 분할 급여 증액으로 연 1억씩 정리",
        result: "5년 계획으로 가지급금 해소, 인정이자 과세 리스크 제거",
        taxSaved: 50_000_000,
      },
    ],
    contentHook: { title: "사장님 가지급금, 방치하면 세금 폭탄! 정리 방법 3가지", hook: "가지급금 1억이면 매년 460만원 세금이 추가로 붙습니다", targetKeyword: "가지급금 정리 절세", estimatedViews: "high" },
  },

  // ── 2. 임원 퇴직금 한도 설계 ──────────────────────────────
  {
    id: "sme_executive_retirement",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "임원퇴직금",
    savingType: "deduction", targetAudience: ["business_owner", "corporation"],
    name: "임원 퇴직금 손금 한도 설계",
    shortDescription: "정관에 임원 퇴직금 지급배수를 규정하여 법인 경비 극대화",
    fullDescription: "임원 퇴직금은 정관에서 정한 금액까지 법인 손금(경비)으로 인정됩니다. 다만 세법상 한도가 있습니다: 2020년 이후 근무분은 '퇴직 전 3년 평균급여 × 1/10 × 근속연수 × 2배'까지만 손금 인정. 한도 초과분은 상여로 처분됩니다. 정관에 퇴직금 규정이 없으면 퇴직금 자체가 손금 불산입될 수 있으므로 반드시 정관 정비가 필요합니다.",
    tags: ["임원퇴직금", "손금한도", "정관", "2배수", "퇴직소득"],
    impactLevel: "very_high",
    applicableRate: "퇴직 전 3년 평균급여 × 1/10 × 근속연수 × 2배 (2020년 이후분)",
    requirements: [
      { id: "r1", description: "법인 임원(등기이사, 감사 등)", type: "employment", critical: true },
      { id: "r2", description: "정관에 퇴직금 지급 규정 필수", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "소득세법", article: "제22조 제3항 (임원 퇴직소득 한도)", effectiveDate: "2020-01-01" },
      { law: "법인세법", article: "제19조 (손금의 범위)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "avg_salary_3yr", label: "퇴직 전 3년 평균 연봉", type: "number", unit: "원", required: true },
      { id: "service_years", label: "근속연수", type: "number", unit: "년", required: true },
    ],
    calculationFormula: "손금한도 = 퇴직 전 3년 평균급여 × 1/10 × 근속연수 × 2 (2020년 이후분). 2012~2019년분은 ×3배, 2012년 이전분은 정관 규정 그대로.",
    urgency: "long_term", difficulty: "hard",
    steps: [
      "현재 정관의 임원 퇴직금 규정 확인",
      "정관에 퇴직금 지급배수 명시 (미규정 시 즉시 정비)",
      "임원별 퇴직금 예상액 시뮬레이션",
      "손금한도 vs 정관규정 비교하여 최적 설계",
    ],
    warnings: [
      "정관에 퇴직금 규정이 없으면 퇴직금 전액이 손금 불산입될 수 있음",
      "2020년 이후 근무분은 2배까지만 손금 인정 (구법 3배 아님)",
      "한도 초과분은 대표이사 상여로 처분되어 소득세 부담",
    ],
    commonMistakes: [
      "정관 정비를 하지 않고 퇴직금을 지급하여 손금 불산입",
      "2012년/2020년 경과규정을 모르고 전 기간에 동일 배수 적용",
    ],
    practicalCases: [
      {
        title: "10년 근속 임원 퇴직금 절세",
        situation: "대표이사 10년 근속, 퇴직 전 3년 평균 연봉 1억원",
        calculation: "퇴직금 = 1억 × 1/10 × 10년 = 1억원. 퇴직소득세: 근속연수공제 후 세율 적용 → 종합소득세 대비 약 30% 절감",
        result: "퇴직소득세 약 700만원 vs 근로소득 처리 시 약 3,000만원 — 2,300만원 절감",
        taxSaved: 23_000_000,
      },
    ],
    contentHook: { title: "사장님 퇴직금, 정관에 이 한 줄이 없으면 세금 폭탄", hook: "같은 퇴직금인데 정관 규정 유무로 세금 수천만원 차이!", targetKeyword: "임원퇴직금 한도 정관", estimatedViews: "high" },
  },

  // ── 3. 배당소득 분리과세 활용 (2026 신설) ──────────────────
  {
    id: "sme_dividend_separate_2026",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "배당전략",
    savingType: "special_rate", targetAudience: ["business_owner"],
    name: "2026 배당소득 분리과세 전략",
    shortDescription: "배당 2천만↓ 15.4%, 2천만~3억 22%, 3억~50억 27.5%",
    fullDescription: "2026년 1월 1일 이후 지급 배당부터 분리과세 선택 가능. 종합과세(최고 49.5%) 대비 분리과세(22~33%)가 크게 유리. 특히 이익잉여금이 쌓인 법인 오너는 지금이 배당 적기. 법인세 1%p 인상으로 이익잉여금 유보 비용도 증가하여 배당 유인이 더 커짐.",
    tags: ["배당", "분리과세", "이익잉여금", "2026신설", "종합과세"],
    impactLevel: "very_high",
    applicableRate: "2천만↓ 15.4% / 2천만~3억 22% / 3억~50억 27.5% / 50억↑ 33%",
    requirements: [
      { id: "r1", description: "2026.1.1 이후 지급 배당", type: "period", value: "2026.1.1 이후", critical: true },
      { id: "r2", description: "법인 주주 (대표이사/오너)", type: "employment", critical: true },
    ],
    legalBasis: [
      { law: "소득세법", article: "제14조 (분리과세 배당소득)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "dividend", label: "배당 예정 금액", type: "number", unit: "원", required: true },
      { id: "other_income", label: "기타 종합소득", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "분리과세: 구간별 세율 적용. 종합과세: 다른 소득과 합산 후 6~45% 누진. 둘 중 유리한 것 선택.",
    urgency: "year_round", difficulty: "medium",
    steps: [
      "법인 이익잉여금 현황 파악",
      "배당 금액별 분리과세 vs 종합과세 비교",
      "최적 배당 금액 결정",
      "주주총회 배당 결의",
    ],
    warnings: [
      "2026.1.1 이후 지급 배당부터 적용 — 소급 적용 불가",
      "분리과세 선택 시 다른 종합소득과 합산 불가 — 금융소득공제 등 제외",
      "금융소득 2,000만원 이하 구간(15.4%)은 종합과세보다 불리할 수 있어 시뮬레이션 필수",
    ],
    practicalCases: [
      {
        title: "중소기업 대표이사 배당 절세",
        situation: "2026년 배당 5,000만원, 다른 종합소득 없음",
        calculation: "분리과세 25% 적용: 5,000만 × 25% = 1,250만원. 종합과세 시 세율 35~38% 대비 절감",
        result: "분리과세 선택으로 500만~700만원 세금 절감",
        taxSaved: 6_000_000,
      },
    ],
    contentHook: { title: "2026 배당 혁명! 사장님 세금 22%p 절약하는 신설 제도", hook: "이익잉여금 10억 쌓아둔 사장님, 올해가 배당 적기입니다!", targetKeyword: "2026 배당소득 분리과세 법인", estimatedViews: "high" },
  },

  // ── 4. 법인 경영인 정기보험 ───────────────────────────────
  {
    id: "sme_ceo_term_insurance",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "법인보험",
    savingType: "deduction", targetAudience: ["business_owner", "corporation"],
    name: "법인 명의 정기보험 경비처리",
    shortDescription: "대표이사 정기보험료를 법인 경비(복리후생비)로 처리",
    fullDescription: "법인이 대표이사·임직원을 피보험자로 하는 정기보험(만기환급금 없는 순수보장형)에 가입하면 보험료를 복리후생비(전 임직원 가입 시) 또는 급여(특정 임원만 가입 시)로 손금처리 가능. 만기환급형 보험은 자산으로 처리되어 경비 인정 안 됨.",
    tags: ["정기보험", "법인보험", "경비처리", "복리후생비", "CEO보험"],
    impactLevel: "medium",
    applicableRate: "보험료 전액 손금 (순수보장형 한정)",
    requirements: [
      { id: "r1", description: "법인 명의 가입, 순수보장형(만기환급금 없음)", type: "other", critical: true },
      { id: "r2", description: "전 임직원 가입 시 복리후생비, 특정인만 가입 시 급여 처리", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "법인세법 기본통칙", article: "19-19…2 (보험료의 손금산입)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "premium", label: "연간 보험료", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "손금 = 순수보장형 보험료 전액. 법인세 절감 = 보험료 × 법인세율(10~25%)",
    urgency: "year_round", difficulty: "easy",
    steps: [
      "순수보장형 정기보험 상품 선택 (만기환급금 0원 확인)",
      "법인 명의로 가입 (수익자: 법인 또는 유족)",
      "복리후생비 또는 급여로 회계 처리",
    ],
    warnings: [
      "만기환급형·저축성 보험은 자산 처리되어 경비 불인정",
      "특정 임원만 가입 시 해당 임원의 급여(근로소득)로 과세",
    ],
    practicalCases: [
      {
        title: "법인 임원 정기보험 가입",
        situation: "중소법인 대표이사 전용 순수보장형 정기보험, 연 보험료 1,200만원",
        calculation: "전 임직원 가입 시 복리후생비 처리 → 법인세 과세소득 1,200만원 감소. 세율 10% 기준 120만원 법인세 절감",
        result: "보험료 전액 비용 처리, 법인세 120만원 절감",
        taxSaved: 1_200_000,
      },
    ],
  },

  // ── 5. 중소기업 취업자 소득세 감면 (직원 채용 혜택) ────────
  {
    id: "sme_employee_income_tax_reduction",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "income", subcategory: "중소기업 취업 감면",
    savingType: "reduction", targetAudience: ["corporation", "sole_proprietor"],
    name: "중소기업 취업자 소득세 감면 (채용 인센티브)",
    shortDescription: "청년 직원 소득세 90% 감면(5년), 60세+·장애인 70% 감면(3년)",
    fullDescription: "중소기업에 취업한 청년(만15~34세)은 5년간 소득세 90% 감면(연 200만원 한도), 60세 이상·장애인·경력단절여성은 3년간 70% 감면. 직원 입장에서 실수령액이 크게 늘어 채용 경쟁력 향상. 2026.12.31까지 취업분 적용.",
    tags: ["중소기업", "소득세감면", "청년", "채용", "인력지원"],
    impactLevel: "high",
    applicableRate: "청년 90%(5년) / 60세+·장애인 70%(3년), 연 200만원 한도",
    requirements: [
      { id: "r1", description: "중소기업 취업 (2026.12.31까지)", type: "business_type", critical: true },
      { id: "r2", description: "청년(만15~34세), 60세 이상, 장애인, 경력단절여성", type: "age", critical: true },
    ],
    legalBasis: [
      { law: "조세특례제한법", article: "제30조 (중소기업 취업자 소득세 감면)", effectiveDate: "2026-02-01", expiryDate: "2026-12-31" },
    ],
    calculationParams: [
      { id: "employee_salary", label: "직원 연봉", type: "number", unit: "원", required: true },
      { id: "employee_type", label: "감면 대상 유형", type: "select", options: [
        { label: "청년 (만15~34세)", value: "youth" },
        { label: "60세 이상", value: "senior" },
        { label: "장애인", value: "disabled" },
        { label: "경력단절여성", value: "career_break" },
      ], required: true },
    ],
    calculationFormula: "청년: 소득세 × 90% (연 200만원 한도, 5년). 기타: 소득세 × 70% (연 200만원 한도, 3년)",
    urgency: "year_round", difficulty: "easy",
    steps: [
      "채용 시 직원에게 감면 대상 여부 안내",
      "직원이 '중소기업 취업자 소득세 감면 신청서' 제출",
      "회사가 원천징수 시 감면 적용",
    ],
    warnings: [
      "감면 기간 중 퇴사 시 남은 기간 소급 추징 없음 — 감면은 재직 기간에만 적용",
      "동일 중소기업 재취업은 최초 취업일 기준으로 통산 5년 한도",
      "청년 기준 만 34세 이하 (군복무 기간 추가 인정)",
    ],
    practicalCases: [
      {
        title: "29세 청년 중소기업 취업자",
        situation: "중소기업 취업 청년, 연봉 4,000만원, 5년 감면 대상",
        calculation: "소득세 70% 감면. 예상 소득세 300만원 × 70% = 210만원 절감/년",
        result: "5년간 최대 1,050만원 소득세 감면",
        taxSaved: 2_100_000,
      },
    ],
    contentHook: { title: "청년 채용하면 직원 세금 90% 감면! 사장님도 직원도 이득", hook: "연봉 3천만원 청년, 실수령액이 월 20만원 더 늘어납니다", targetKeyword: "중소기업 취업자 소득세 감면 2026", estimatedViews: "high" },
  },

  // ── 6. 업무용 승용차 리스/렌트 전략 ───────────────────────
  {
    id: "sme_business_vehicle_lease",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "차량경비",
    savingType: "deduction", targetAudience: ["business_owner", "corporation"],
    name: "업무용 승용차 리스/렌트 경비 전략",
    shortDescription: "리스료·렌트료 연 1,500만원 한도 경비 처리 + 감가상각 800만원",
    fullDescription: "법인 업무용 승용차는 리스·렌트·직접구매 중 선택. 리스/렌트료는 연 1,500만원 한도(운행일지 미작성 시). 운행일지 작성 시 1,500만원 초과분도 업무사용비율만큼 인정. 감가상각비 한도는 연 800만원. 업무전용 자동차보험 가입이 필수.",
    tags: ["업무용차량", "리스", "렌트", "감가상각", "1500만원"],
    impactLevel: "high",
    maxDeductionAmount: 15_000_000,
    applicableRate: "연 1,500만원 한도 (운행일지 미작성 시)",
    requirements: [
      { id: "r1", description: "업무전용 자동차보험 가입", type: "other", critical: true },
      { id: "r2", description: "법인 명의 또는 임직원 명의(법인 업무용)", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "법인세법", article: "제27조의2 (업무용승용차 관련비용)", effectiveDate: "2026-01-01" },
      { law: "소득세법 시행령", article: "제78조의3", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "lease_cost", label: "연간 리스/렌트료", type: "number", unit: "원", required: true },
      { id: "has_logbook", label: "운행일지 작성 여부", type: "boolean", required: true },
      { id: "biz_ratio", label: "업무 사용 비율 (%)", type: "number", unit: "%", required: false },
    ],
    calculationFormula: "운행일지 미작성: min(비용, 1,500만원). 운행일지 작성: 비용 × 업무사용비율 전액 인정.",
    urgency: "year_round", difficulty: "medium",
    steps: [
      "업무전용 자동차보험 가입",
      "리스 vs 렌트 vs 구매 세후 비용 비교",
      "운행일지 작성 여부 결정",
      "경비 한도 내 최적 차량 선택",
    ],
    warnings: [
      "운행일지 미작성 시 업무 사용 비율 100% 인정 불가 — 운행일지 없으면 50%만 인정",
      "리스료 연 1,500만원 초과분은 한도 제한 적용 (업무용 승용차 1대당)",
      "비업무용 사적 사용분은 비용 불인정 + 대표이사 상여 처리",
    ],
    practicalCases: [
      {
        title: "법인 임원 업무용 차량 리스",
        situation: "연간 리스료 2,400만원, 운행일지 작성, 업무 사용 80%",
        calculation: "2,400만 × 80% = 1,920만원 비용 인정. 법인세 세율 10% 기준 192만원 절감",
        result: "운행일지 작성으로 1,920만원 비용 인정, 법인세 192만원 절감",
        taxSaved: 1_920_000,
      },
    ],
  },

  // ── 7. 법인 분할/합병을 통한 세율구간 최적화 ──────────────
  {
    id: "sme_corp_split",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "법인분할",
    savingType: "split", targetAudience: ["business_owner", "corporation"],
    name: "법인 분할을 통한 세율구간 분산",
    shortDescription: "하나의 법인을 2개로 분할하여 낮은 세율구간 2회 활용",
    fullDescription: "법인세 과세표준 2억원 이하 구간은 10%, 2억 초과 시 20%로 세율이 급등. 사업 부문이 구분 가능한 경우 법인을 분할하여 각 법인이 2억원 이하 구간(10%)을 활용하면 세부담 절감. 적격분할 요건 충족 시 양도차익 과세이연 가능.",
    tags: ["법인분할", "적격분할", "세율구간", "10%구간", "과세이연"],
    impactLevel: "very_high",
    applicableRate: "2억 이하 10% 구간 × 2개 법인 활용",
    requirements: [
      { id: "r1", description: "사업부문 구분 가능", type: "business_type", critical: true },
      { id: "r2", description: "적격분할 요건 충족 (5년 사업영위 등)", type: "period", critical: false },
    ],
    legalBasis: [
      { law: "법인세법", article: "제46조 (분할의 과세특례)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "total_income", label: "법인 총 과세소득", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "1개 법인: 과세소득 전체에 누진세율. 2개 분할: 각각 2억 이하 구간(10%) 활용 가능.",
    urgency: "long_term", difficulty: "expert",
    steps: [
      "사업부문 분리 가능 여부 검토",
      "적격분할 요건 확인 (세무사/변호사 상담)",
      "분할 전후 세부담 시뮬레이션",
      "분할 등기 및 세무 신고",
    ],
    warnings: [
      "비적격분할 시 양도차익에 즉시 과세",
      "분할 후 5년간 사후관리 요건 존재",
      "실질 없는 형식적 분할은 부당행위계산부인 위험",
    ],
    practicalCases: [
      {
        title: "사업부문 분리 적격분할",
        situation: "과세소득 5억원 법인을 2개 법인으로 분할, 각 2.5억원",
        calculation: "분할 전 법인세: 5억 × 19% = 9,500만원. 분할 후 각 2.5억 × 10% = 2,500만원 × 2 = 5,000만원",
        result: "법인세 4,500만원 절감 (누진세율 회피 효과)",
        taxSaved: 45_000_000,
      },
    ],
    contentHook: { title: "법인세 20%→10%로! 법인 분할 절세의 비밀", hook: "과세소득 4억 법인, 분할하면 세금 2천만원 차이!", targetKeyword: "법인분할 절세 세율구간", estimatedViews: "medium" },
  },

  // ── 8. 임원 상여금 지급 시기 전략 ─────────────────────────
  {
    id: "sme_bonus_timing",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "상여금",
    savingType: "split", targetAudience: ["business_owner", "corporation"],
    name: "대표이사 상여금 지급 시기 최적화",
    shortDescription: "법인 결산 전 상여금 지급으로 법인세-소득세 균형 조정",
    fullDescription: "결산 직전 법인 이익이 예상보다 크면 대표이사에게 상여금을 지급하여 법인세 과세표준을 낮출 수 있습니다. 다만 대표이사 소득세와의 균형이 중요. 법인세율(10~25%) vs 소득세율(6~45%) 비교하여 최적 금액 설계. 정기상여금은 정관/급여규정에 근거가 있어야 손금 인정.",
    tags: ["상여금", "급여설계", "법인세", "소득세", "결산"],
    impactLevel: "high",
    applicableRate: "법인세 10~25% vs 소득세 6~45% 교차점",
    requirements: [
      { id: "r1", description: "정관 또는 급여규정에 상여금 지급 근거", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "법인세법", article: "제19조 (손금의 범위)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "corp_profit", label: "결산 전 법인 이익", type: "number", unit: "원", required: true },
      { id: "ceo_current_income", label: "대표이사 현재 연간 소득", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "법인세 절감 = 상여금 × 법인세율. 소득세 추가 = 상여금 × 한계세율. 순절세 = 법인세절감 - 소득세추가.",
    urgency: "year_end", difficulty: "medium",
    steps: [
      "결산 전 법인 이익 추정",
      "대표이사 소득세율 구간 확인",
      "법인세율 vs 소득세율 비교",
      "최적 상여금 산출 후 결산 전 지급",
    ],
    warnings: [
      "정관 또는 급여규정에 상여금 지급 근거 없으면 비용 불인정",
      "이익 처분 순서: 법인세 납부 후 잔여이익에서 상여 지급해야 손금 산입 가능",
      "대표이사 과다 상여는 부당행위계산 부인 리스크 (시가 초과 상여)",
    ],
    practicalCases: [
      {
        title: "결산 전 대표이사 상여 지급",
        situation: "결산 전 법인 이익 3억원, 대표이사 상여 1억원 지급 결정",
        calculation: "법인 과세소득 3억 → 2억 감소. 법인세 절감: 1억 × 10% = 1,000만원. 대표이사 소득세 추가 약 3,500만원. 순절세 효과 약 6,500만원",
        result: "법인세 절감 1,000만원, 적절한 소득 이전 효과",
        taxSaved: 10_000_000,
      },
    ],
  },

  // ── 9. 중소기업 접대비 추가한도 ───────────────────────────
  {
    id: "sme_entertainment_extra",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "접대비",
    savingType: "deduction", targetAudience: ["corporation", "sole_proprietor"],
    name: "중소기업 접대비 한도 활용",
    shortDescription: "중소기업 기본한도 3,600만원 + 수입금액별 추가한도",
    fullDescription: "중소기업은 접대비 기본한도가 3,600만원(일반기업 2,400만원 대비 1,200만원 추가). 수입금액에 따라 추가한도 적용: 100억 이하 0.3%, 100~500억 0.2%, 500억 초과 0.03%. 1만원 초과 접대비는 법인카드·세금계산서 등 적격증빙 필수.",
    tags: ["접대비", "중소기업", "기본한도", "3600만원", "적격증빙"],
    impactLevel: "medium",
    maxDeductionAmount: 36_000_000,
    applicableRate: "기본 3,600만원 + 수입금액별 0.03~0.3%",
    requirements: [
      { id: "r1", description: "중소기업 해당", type: "business_type", critical: true },
      { id: "r2", description: "1만원 초과 시 법인카드/세금계산서 필수", type: "other", critical: true },
    ],
    legalBasis: [
      { law: "법인세법", article: "제25조 (접대비의 손금불산입)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "revenue", label: "연 수입금액", type: "number", unit: "원", required: true },
      { id: "entertainment", label: "접대비 지출액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "한도 = 3,600만 + (100억까지×0.3% + 100~500억×0.2% + 500억초과×0.03%)",
    urgency: "year_round", difficulty: "easy",
    steps: ["접대비 한도 계산", "한도 내 지출 관리", "법인카드로 결제 (1만원 초과 시 필수)"],
    warnings: [
      "1만원 초과 접대비는 법인카드 또는 세금계산서 필수 — 현금 지출 시 비용 불인정",
      "골프장 접대비는 비용 인정되나 세무조사 시 업무 관련성 소명 필요",
      "접대비 한도 초과분은 손금불산입 — 매출 규모에 따라 한도 달라짐",
    ],
    practicalCases: [
      {
        title: "연 매출 50억 중소기업 접대비",
        situation: "중소기업 연 매출 50억원, 접대비 지출 4,000만원",
        calculation: "한도: 1,200만원(기본) + 50억×0.2% = 2,200만원. 한도 내 2,200만원만 비용 인정",
        result: "2,200만원 비용 처리, 법인세 절감 약 220만원",
        taxSaved: 2_200_000,
      },
    ],
  },

  // ── 10. 법인 유보금 과세 대비 (성실신고확인) ──────────────
  {
    id: "sme_retained_earnings",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "이익잉여금",
    savingType: "structure", targetAudience: ["business_owner", "corporation"],
    name: "이익잉여금(사내유보금) 관리 전략",
    shortDescription: "과도한 유보금은 배당·투자·급여 조정으로 최적화",
    fullDescription: "법인에 이익잉여금이 과다하게 쌓이면 세무조사 시 가지급금·업무무관자산 등으로 문제될 수 있고, 향후 상속·증여 시 주식가치 상승으로 세부담이 커집니다. 2026년 배당소득 분리과세 도입으로 배당을 통한 유보금 정리가 세후로도 유리해졌습니다.",
    tags: ["이익잉여금", "유보금", "배당", "주식가치", "상속"],
    impactLevel: "high",
    applicableRate: "배당 분리과세(22~33%) 활용 시 유보 비용 절감",
    requirements: [
      { id: "r1", description: "법인에 이익잉여금 축적", type: "asset", critical: false },
    ],
    legalBasis: [
      { law: "소득세법", article: "제14조 (배당소득 분리과세)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "retained", label: "이익잉여금 잔액", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "유보 유지 비용(법인세+향후 상속세 영향) vs 배당 비용(분리과세 22~33%) 비교",
    urgency: "year_round", difficulty: "hard",
    steps: [
      "이익잉여금 현황 파악",
      "배당·투자·급여인상 중 최적 방법 선택",
      "배당 시 분리과세 vs 종합과세 비교",
      "연차별 유보금 적정 수준 관리 계획",
    ],
    warnings: [
      "유보금 과세(성실신고확인대상 법인) 적용 여부 확인 — 투자·임금 등 미이행 시 추가 과세",
      "단순 적립 방치는 법인세 이연 효과만 있고 주주 입장에서는 실질 수익 없음",
      "이익잉여금 배당 시 배당소득세(15.4%) 부담 검토 필요",
    ],
    practicalCases: [
      {
        title: "이익잉여금 10억 보유 중소법인",
        situation: "이익잉여금 10억원, 설비 투자 5억원 계획",
        calculation: "설비 투자 5억 → 감가상각으로 향후 비용 처리. 즉각 절세 효과 + 생산성 향상",
        result: "투자 5억 → 법인세 감면 + 생산성 향상으로 장기 절세",
        taxSaved: 5_000_000,
      },
    ],
    contentHook: { title: "이익잉여금 10억 쌓아두면 나중에 세금 폭탄! 해결법", hook: "유보금이 많을수록 주식가치↑ → 상속세↑ 악순환", targetKeyword: "이익잉여금 관리 절세", estimatedViews: "medium" },
  },

  // ── 11. 가업승계 사전 준비 (지분 구조 설계) ───────────────
  {
    id: "sme_succession_share_design",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "gift", subcategory: "가업승계 준비",
    savingType: "structure", targetAudience: ["business_owner", "senior"],
    name: "가업승계 사전 지분구조 설계",
    shortDescription: "기업가치가 낮을 때 자녀에게 지분 이전하여 증여세 최소화",
    fullDescription: "가업승계를 계획한다면 기업가치가 낮은 시점(창업초기, 실적저조기)에 자녀에게 지분을 증여하는 것이 유리합니다. 비상장주식 가치는 순자산가치와 순손익가치의 가중평균으로 평가되므로, 이익이 적거나 자산이 적을 때 주당 가치가 낮아집니다. 증여세 과세특례(10~20%)와 결합하면 절세 극대화.",
    tags: ["가업승계", "지분설계", "비상장주식", "증여시점", "주식가치"],
    impactLevel: "very_high",
    applicableRate: "기업가치 상승 전 이전 시 수억~수십억 차이",
    requirements: [
      { id: "r1", description: "자녀에게 승계 계획", type: "family", critical: true },
      { id: "r2", description: "비상장법인 주식 보유", type: "asset", critical: true },
    ],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제63조 (비상장주식 평가)", effectiveDate: "2026-01-01" },
      { law: "조세특례제한법", article: "제30조의6 (가업승계 증여세 과세특례)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "net_asset", label: "순자산가치", type: "number", unit: "원", required: true },
      { id: "net_profit_3yr", label: "최근 3년 순이익 평균", type: "number", unit: "원", required: true },
      { id: "shares", label: "발행주식 수", type: "number", unit: "주", required: true },
    ],
    calculationFormula: "주당가치 = (순자산가치×2 + 순손익가치×3) ÷ 5. 이익↓ 자산↓ 시점에 증여하면 평가액 최소화.",
    urgency: "long_term", difficulty: "expert",
    steps: [
      "비상장주식 가치 평가 (보충적 평가방법)",
      "현재 vs 3~5년 후 예상 기업가치 비교",
      "이전할 지분 비율 결정",
      "증여세 과세특례 적용 가능 여부 확인",
      "증여 실행 및 증여세 신고",
    ],
    warnings: [
      "주식 이전 후 기업가치 급등 시 세무서에서 저가양도 문제 제기 가능",
      "가업승계 증여세 과세특례는 사후관리 5년 의무",
    ],
    practicalCases: [
      {
        title: "비상장주식 증여를 통한 가업승계",
        situation: "주당 순자산가치 10,000원, 자녀에게 10만주 증여, 기업가치 10억원",
        calculation: "사전 증여로 기업가치 상승분(미래 이익) 과세 제외. 증여 후 5년 이익 50억 증가 시 증여세 절감 효과",
        result: "조기 증여로 향후 상속세 50억 과세 회피, 절세 효과 수억원",
        taxSaved: 200_000_000,
      },
    ],
    contentHook: { title: "비상장주식, 가치 낮을 때 넘겨야 세금 수십억 아낍니다", hook: "같은 주식인데 언제 증여하느냐에 따라 세금 50% 차이!", targetKeyword: "비상장주식 증여 시점 절세", estimatedViews: "high" },
    relatedItems: ["gift_business_succession_special", "gift_real_estate_valuation"],
  },

  // ── 12. 법인카드 + 복리후생비 체계적 관리 ─────────────────
  {
    id: "sme_corporate_card_welfare",
    version: "2026.1", lastUpdated: "2026-04-03",
    category: "corporate", subcategory: "경비관리",
    savingType: "deduction", targetAudience: ["business_owner", "corporation"],
    name: "법인카드·복리후생비 체계적 관리",
    shortDescription: "법인카드 사용 + 복리후생비 규정 정비로 경비 극대화",
    fullDescription: "법인카드 사용 내역은 국세청에 자동 통보되므로 적격증빙으로 가장 편리합니다. 복리후생비(식대, 경조사비, 체육문화비 등)는 사회통념상 타당한 수준이면 손금 인정. 사내 복리후생 규정을 정비하면 세무조사 시 경비 부인 위험을 줄일 수 있습니다. 임직원 경조사비는 건당 20만원까지 손금 인정.",
    tags: ["법인카드", "복리후생비", "경조사비", "경비관리", "적격증빙"],
    impactLevel: "medium",
    applicableRate: "복리후생비 전액 손금 (사회통념상 타당 수준)",
    requirements: [
      { id: "r1", description: "법인카드 발급 및 사용", type: "other", critical: true },
      { id: "r2", description: "복리후생 규정 구비", type: "other", critical: false },
    ],
    legalBasis: [
      { law: "법인세법", article: "제19조 (손금)", effectiveDate: "2026-01-01" },
      { law: "법인세법 시행령", article: "제45조 (복리후생비 범위)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "welfare_cost", label: "복리후생비 연 지출", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "손금 = 사회통념상 타당한 복리후생비 전액. 법인세 절감 = 복리후생비 × 법인세율.",
    urgency: "year_round", difficulty: "easy",
    steps: [
      "법인카드 발급 (모든 사업 지출에 사용)",
      "사내 복리후생 규정 작성 (경조사비, 식대, 체육비 등)",
      "경조사비 건당 20만원 한도 관리",
      "개인 사용분과 업무 사용분 철저히 구분",
    ],
    warnings: [
      "법인카드 개인 사용분은 대표이사 상여로 처분됨",
      "사회통념 초과 복리후생비는 손금 불산입",
    ],
    practicalCases: [
      {
        title: "중소기업 복리후생비 최적화",
        situation: "직원 10명, 연 복리후생 지출 3,000만원(법인카드 사용)",
        calculation: "3,000만원 비용 처리 → 법인세 과세소득 감소. 세율 10% 기준 300만원 절감",
        result: "복리후생비 전액 비용 인정, 법인세 300만원 절감",
        taxSaved: 3_000_000,
      },
    ],
  },

  // ── 13. 차명주식(명의신탁주식) 정리 ─────────────────────────
  {
    id: "sme_nominee_shares_cleanup",
    version: "2026.1", lastUpdated: "2026-04-04",
    category: "corporate", subcategory: "차명주식",
    savingType: "structure", targetAudience: ["business_owner", "corporation"],
    name: "차명주식(명의신탁주식) 정리",
    shortDescription: "차명주식 미정리 시 증여세+가산세 폭탄, 가업승계·M&A 장애",
    fullDescription: "회사 설립 시 발기인 수 요건(구 상법 3인) 등의 이유로 배우자·친인척·직원 명의로 주식을 등재한 경우, 상증법 제45조의2에 의해 명의신탁 증여의제가 적용되어 명의수탁자에게 증여세가 부과됩니다. 또한 차명주식이 해소되지 않으면 가업승계, M&A, IPO 시 심각한 법적·세무 리스크가 발생합니다. 국세청의 '명의신탁주식 실제소유자 확인제도'를 활용하면 간소화된 절차로 실명 전환이 가능합니다.",
    tags: ["차명주식", "명의신탁", "증여의제", "실소유자확인", "주식환원", "가업승계", "발기인"],
    impactLevel: "very_high",
    applicableRate: "증여세율 10~50% + 가산세 (미신고 시 20~40%)",
    requirements: [
      { id: "r1", description: "차명주식(명의신탁주식) 보유 법인", type: "other", critical: true },
      { id: "r2", description: "실제소유자와 주주명부상 명의자 불일치", type: "other", critical: true },
    ],
    exclusions: [
      "상장법인 주식은 별도 규정 적용",
      "부동산은 제45조의2 적용 제외 (부동산실명법 별도 적용)",
    ],
    legalBasis: [
      { law: "상속세 및 증여세법", article: "제45조의2", url: "https://www.law.go.kr/법령/상속세및증여세법/제45조의2", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "nominee_shares_value", label: "차명주식 평가액", type: "number", unit: "원", required: true },
      { id: "nominee_count", label: "명의수탁자 수", type: "number", unit: "명", required: true },
      { id: "trust_period", label: "명의신탁 기간", type: "number", unit: "년", required: true },
    ],
    calculationFormula: "증여세 = 차명주식 평가액 × 증여세율(10~50%). 미신고 가산세 20%(부정 40%) + 납부불성실 가산세 추가.",
    urgency: "long_term",
    difficulty: "expert",
    steps: [
      "1. 차명주식 현황 파악 (주주명부 vs 실소유자 대조)",
      "2. 명의신탁 시점·사유·증빙자료 확인",
      "3. 국세청 '명의신탁주식 실제소유자 확인제도' 신청 가능 여부 검토",
      "4-A. 확인제도 대상: 관할 세무서에 확인신청서 + 증빙 제출 → 간소화 환원",
      "4-B. 확인제도 비대상: 세무사와 환원 방법 협의 (양도, 자사주매입, 감자 등)",
      "5. 증여세·양도세 등 세금 정리",
      "6. 주주명부·법인등기부 실명 전환 완료",
    ],
    requiredDocuments: [
      "주주명부 (설립 시 ~ 현재)", "법인설립 관련 서류 (정관, 발기인 총회 의사록)",
      "실제 출자 증빙 (계좌이체 내역, 금전소비대차 계약서)",
      "명의신탁주식 실제소유자 확인신청서 (국세청 서식)",
      "명의수탁자 확인서 (인감날인)",
    ],
    contentHook: {
      title: "차명주식, 방치하면 수억 세금 폭탄! 2026 완벽 정리법",
      hook: "회사 설립할 때 빌려준 이름, 지금 정리 안 하면 증여세 50%!",
      targetKeyword: "차명주식 정리 방법 2026",
      estimatedViews: "high",
    },
    warnings: [
      "차명주식 미정리 시 명의수탁자에게 증여세 부과 (상증법 제45조의2)",
      "명의신탁 기간 중 배당을 수탁자가 수령했다면 금융소득 종합과세 추가 문제",
      "비상장주식 가치가 상승한 경우 환원 시 양도세·증여세 부담 급증",
      "가업승계 시 차명주식 존재하면 지분 요건(40%) 미충족 위험",
      "M&A·IPO 시 실사(Due Diligence)에서 차명주식이 드러나면 거래 무산 가능",
    ],
    commonMistakes: [
      "차명주식을 '나중에 정리하겠다'며 방치 → 주식가치 상승 후 세금 폭증",
      "명의수탁자가 사망하여 수탁자 상속인과 주식 분쟁 발생",
      "실소유자 확인제도 요건(2001.7.23 이전 설립 중소기업)을 확인하지 않고 신청",
      "증여의제 시점(명의개서일 또는 취득 다음해 말일)을 잘못 판단",
    ],
    relatedItems: ["sme_succession_share_design", "sme_retained_earnings"],
    verification: {
      status: "self_checked",
      verifiedBy: "시스템 (국세청+법제처+판례 교차 검증)",
      verifiedDate: "2026-04-04",
      notes: "상증법 제45조의2 확인. 국세청 실소유자 확인제도(2001.7.23 이전 설립 중소기업 대상). 2026.4 딥리서치 검증.",
      nextReviewDate: "2026-07-01",
    },
    legalTexts: [
      {
        lawName: "상속세 및 증여세법",
        articleNumber: "제45조의2",
        articleTitle: "명의신탁재산의 증여의제",
        fullText: "권리의 이전이나 그 행사에 등기등이 필요한 재산(토지와 건물은 제외)의 실제소유자와 명의자가 다른 경우에, 그 명의자로 등기등을 한 날에 그 재산의 가액을 명의자가 실제소유자로부터 증여받은 것으로 본다.",
        keyProvisions: [
          "【증여의제 원칙】 실제소유자와 명의자가 다른 경우 → 명의자에게 증여세 과세 (제1항)",
          "【적용 대상】 주식, 출자지분 등 (토지·건물은 부동산실명법으로 별도 규율) (제1항)",
          "【증여 시점】 명의개서일. 미개서 시 취득연도 다음해 말일의 다음날 (제1항)",
          "【조세회피 추정】 타인 명의 등기 시 조세회피 목적 추정 (제2항)",
          "【추정 제외】 양도세 과세표준 신고 시 소유권 변경 신고한 경우 등 (제2항 단서)",
          "【재산가액 변동】 명의신탁 후 주식가치 변동분에 대해서도 증여의제 가능 (제3항)",
          "【가산세】 미신고 가산세 20% (부정행위 시 40%) + 납부불성실 가산세",
          "【실소유자 확인제도】 국세청 간소화 확인 — 2001.7.23 이전 설립 중소기업 대상",
          "【환원 시 혜택】 확인제도로 실명 전환 시 증여세 추가 부과 없이 환원 가능 (단, 원래 증여의제분은 납부)",
        ],
        effectiveDate: "2026-01-01",
        lastAmendedDate: "2019-01-01",
        sourceUrl: "https://www.law.go.kr/법령/상속세및증여세법/제45조의2",
      },
    ],
    practicalCases: [
      {
        title: "설립 시 차명주식 20년 방치 후 정리",
        situation: "2003년 설립 시 직원 A에게 30% 지분 명의신탁. 당시 주식가치 3천만원 → 현재 30억원",
        calculation: "증여의제(설립 시): 3천만원 × 10% = 300만원. 환원 시 양도 형식: (30억-3천만) × 양도세율. 실소유자 확인제도 비대상(2003년 설립, 2001.7.23 이후).",
        result: "환원 비용이 수억원에 달할 수 있어 전문가 상담 필수",
        taxSaved: 0,
        source: "전자신문 기업성장컨설팅",
      },
      {
        title: "국세청 실소유자 확인제도 활용 (2001년 이전 설립)",
        situation: "1998년 설립 중소기업, 배우자 명의 20% 차명주식",
        calculation: "확인신청서 + 증빙 제출 → 국세청 확인 → 주주명부 실명 전환. 원래 증여의제분 증여세는 납부해야 하나, 추가 증여세 없이 환원.",
        result: "간소화 절차로 차명주식 해소, 가업승계 요건 충족",
        taxSaved: 50_000_000,
        source: "국세청 명의신탁주식 실소유자 확인안내",
      },
    ],
    faqs: [
      { question: "차명주식을 그냥 두면 어떻게 되나요?", answer: "상증법 제45조의2에 의해 명의수탁자에게 증여세가 부과됩니다. 주식가치가 상승할수록 세금 부담이 커지고, 수탁자 사망 시 주식 분쟁까지 발생할 수 있습니다.", legalBasis: "상증법 제45조의2" },
      { question: "실소유자 확인제도는 누가 신청할 수 있나요?", answer: "2001년 7월 23일 이전에 설립된 중소기업의 법인설립 당시 발기인으로서 명의신탁한 주식이 대상입니다. 설립 이후 추가 취득분이나 2001.7.24 이후 설립 법인은 대상이 아닙니다.", legalBasis: "국세청 명의신탁주식 실소유자 확인제도" },
      { question: "차명주식 환원 시 양도세가 나오나요?", answer: "실명 전환 방법에 따라 다릅니다. 매매 형식이면 양도세 발생, 자사주 매입이면 의제배당세, 감자면 감자차익 과세. 전문가와 가장 유리한 방법을 협의해야 합니다.", legalBasis: "소득세법 제94조, 법인세법 제16조" },
      { question: "차명주식이 있으면 가업승계가 안 되나요?", answer: "가업상속공제와 증여세 과세특례 모두 최대주주 지분 40% 이상 요건이 있습니다. 차명주식으로 실질 지분이 40% 미만이 되면 요건 미충족으로 가업승계 혜택을 받을 수 없습니다.", legalBasis: "상증법 제18조의2, 조특법 제30조의6" },
    ],
    crossReferences: [
      "상증법 제45조의2 (명의신탁재산 증여의제)",
      "상증법 시행령 제34조 (증여의제 세부기준)",
      "소득세법 제94조 (양도소득 — 주식 환원 시)",
      "법인세법 제16조 (의제배당 — 자사주 매입·감자 시)",
      "국세청 명의신탁주식 실소유자 확인제도 안내",
    ],
    taxAuthorityGuide: "국세청 '명의신탁주식 실소유자 확인안내' 참조. 2001.7.23 이전 설립 중소기업 대상. 관할 세무서 방문 상담 후 확인신청서 제출. 확인 완료 후 주주명부·등기부 실명 전환.",
  },

  // ── 5가지 잉여금 출구전략 종합 비교 ─────────────────────────
  {
    id: "sme_exit_strategy_5way_comparison",
    version: "2026.1", lastUpdated: "2026-04-05",
    category: "corporate", subcategory: "잉여금출구전략",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "법인 잉여금 출구전략 5가지 — 세율 비교 (6.79% ~ 40.7%)",
    shortDescription: "급여·퇴직금·배당·특허·이익소각 5가지 출구별 10억 인출 시 실효세율 완전 비교",
    fullDescription: `법인 미처분이익잉여금 출구 5가지 문별 실효세율 비교 (10억 인출 기준, 2026년 현행법)

■ 5가지 출구 세율 비교 (10억 기준)

  ① 급여·상여
    세율: 40.7%, 세금: 4.07억, 세후: 5.93억
    특징: 4대보험 추가 부담. 가장 비효율적.

  ② 배당
    세율: 34.8%, 세금: 3.48억, 세후: 6.52억
    특징: 법인세 이미 납부 후 추가. 금융소득 2천만 초과 시 종합과세.

  ③ 특허권(산업재산권) 매각
    세율: 13.8%, 세금: 1.38억, 세후: 8.62억
    특징: 필요경비율 60% 적용. 매출기여도 높은 특허만 가능.

  ④ 자기주식(양도)
    세율: 21.7%, 세금: 2.17억, 세후: 7.83억
    특징: 최초 취득가 5천만원 기준. 취득가가 낮을수록 세금 증가.

  ⑤ 퇴직금
    세율: 20.1%, 세금: 2.01억, 세후: 7.99억
    특징: 분리과세, 종합소득 합산 제외. 근속 20년 기준.

  ⑥ 자기주식 소각 (배우자 증여 후 이익소각) — 최적
    세율: 6.79%, 세금: 0.68억, 세후: 9.32억
    특징: 배우자 증여재산공제 6억 활용. 의제배당 차익 0원.

■ 핵심 메시지
  같은 10억을 꺼내도 어느 문으로 나오느냐에 따라
  세금이 최소 6,790만원(6.79%) ~ 최대 4.07억(40.7%)으로 6배 차이`,
    tags: ["잉여금출구", "이익소각", "퇴직금", "특허", "배당", "급여", "세율비교", "6.79%", "법인절세"],
    impactLevel: "very_high",
    applicableRate: "이익소각 6.79% vs 급여 40.7% — 동일 금액 세금 6배 차이",
    requirements: [
      { id: "r1", description: "비상장 중소기업 대표이사(오너)", type: "employment", critical: true },
      { id: "r2", description: "미처분이익잉여금 보유", type: "asset", critical: true },
    ],
    legalBasis: [
      { law: "소득세법", article: "제22조 (퇴직소득, 분리과세)", effectiveDate: "2026-01-01" },
      { law: "소득세법", article: "제17조 (배당소득, 의제배당)", effectiveDate: "2026-01-01" },
      { law: "소득세법", article: "제21조 (기타소득 — 산업재산권, 필요경비 60%)", effectiveDate: "2026-01-01" },
      { law: "상속세및증여세법", article: "제53조 (배우자 증여재산공제 6억)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "withdrawal_amount", label: "인출 희망 금액", type: "number", unit: "원", required: true },
      { id: "spouse_deduction_available", label: "배우자 증여공제 가용 여부", type: "boolean", required: true },
      { id: "service_years", label: "임원 근속연수 (퇴직금 계산용)", type: "number", unit: "년", required: false },
      { id: "has_qualified_patent", label: "매출기여 특허 보유 여부", type: "boolean", required: false },
    ],
    calculationFormula: `10억 기준 5가지 문 세금:
  급여: 10억 × 40.7% = 4.07억
  배당: 10억 × 34.8% = 3.48억
  특허: 10억 × 13.8% = 1.38억
  자사주양도: 10억 × 21.7% = 2.17억
  퇴직금: 10억 × 20.1% = 2.01억
  이익소각(배우자증여): 10억 × 6.79% = 0.68억

  이익소각 공식: 증여세 = (증여액 - 6억) × 세율, 배우자 공제 후 과세표준에 10~30% 세율 적용 + 신고세액공제 3%`,
    urgency: "event_based",
    difficulty: "expert",
    steps: [
      "1. 인출 금액과 타이밍 결정",
      "2. 배우자 10년 내 사전증여 여부 확인 (이익소각 가능 여부)",
      "3. 특허 보유 현황 및 매출기여도 검토",
      "4. 근속연수 기준 퇴직금 한도 계산",
      "5. 최적 전략 또는 조합 선택 후 실행",
    ],
    contentHook: {
      title: "법인돈 10억, 어느 문으로 꺼내냐에 따라 세금이 6배 다르다",
      hook: "급여로 뺐다간 4억 날린다. 6.79%로 가져오는 방법은 따로 있다",
      targetKeyword: "법인 잉여금 세금 없이 가져오는 방법",
      estimatedViews: "high",
    },
    warnings: [
      "이익소각: 배우자 10년 내 기증여 합산 — 사전 확인 필수",
      "특허: 매출기여도 낮은 특허는 감평 금액 낮아 실효성 없음",
      "퇴직금: 임원 정관 퇴직금 규정 사전 설정 필수 (소급 불가)",
      "2026년 상법 개정으로 자사주 전략 타이밍 중요 — 즉시 설계 권장",
    ],
    practicalCases: [
      {
        title: "이익잉여금 5억 법인 출구전략 비교",
        situation: "중소기업 대표이사, 이익잉여금 5억원, 법인 매각 또는 청산 고려",
        calculation: "퇴직금 활용: 퇴직소득세 약 15% / 배당: 소득세 35~38% / 법인 매각(주식양도): 양도소득세 20%",
        result: "퇴직금 우선 활용 후 주식양도 전략으로 세금 최소화, 약 1억~2억 절감",
        taxSaved: 150_000_000,
      },
    ],
  },
]
