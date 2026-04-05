// ============================================================
// 03-extra. 사업소득세 추가 절세 항목
// ============================================================
import type { TaxSavingItem } from "@/types/tax-database"

export const businessTaxExtra: TaxSavingItem[] = [
  {
    id: "biz_home_office_expense",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "홈오피스",
    savingType: "deduction", targetAudience: ["freelancer", "sole_proprietor"],
    name: "자택 사무실(홈오피스) 경비 처리",
    shortDescription: "자택을 사업장으로 사용 시 임차료·공과금 일부 경비 인정",
    fullDescription: "프리랜서·개인사업자가 자택 일부를 사업장으로 사용하는 경우, 사업 사용 면적 비율만큼 임차료, 관리비, 전기료, 인터넷비 등을 필요경비로 인정. 사업자등록 시 자택 주소 등록 필요.",
    tags: ["홈오피스", "재택근무", "경비", "프리랜서"],
    impactLevel: "medium", applicableRate: "사업 사용 면적 비율만큼",
    requirements: [
      { id: "r1", description: "사업자등록 (자택 주소)", type: "business_type", critical: true },
      { id: "r2", description: "사업 사용 면적 구분 가능", type: "other", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제27조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "total_rent", label: "월 임차료/관리비", type: "number", unit: "원", required: true },
      { id: "biz_ratio", label: "사업 사용 비율 (%)", type: "number", unit: "%", min: 1, max: 100, required: true },
    ],
    calculationFormula: "경비 = (임차료+관리비+공과금) × 사업사용비율 × 12개월",
    urgency: "year_round", difficulty: "medium",
    steps: ["사업장 주소를 자택으로 등록", "사업 사용 면적 비율 산정", "관련 지출 증빙 보관", "종합소득세 신고 시 경비 반영"],
    contentHook: { title: "집에서 일하면 월세도 세금에서 빠진다?!", hook: "방 하나를 사무실로 쓰면 월세 30% 경비 처리!", targetKeyword: "프리랜서 홈오피스 경비", estimatedViews: "high" },
    warnings: [
      "사업 사용 비율을 과대 계상 시 세무조사에서 부인될 위험 — 도면 또는 사진 등 증빙 보관 권장",
      "자가 소유 주택은 임차료 경비 처리 불가 (감가상각비·재산세 일부만 가능)",
      "사업자등록 주소와 실제 거주지가 다를 경우 홈오피스 경비 인정 불가",
      "공과금(전기료 등)은 사용량 기반 안분이 원칙 — 단순 면적 비율 외 실사용 근거 추가 보완 권장",
      "임대차계약서 원본 및 납입 증빙(이체내역) 반드시 보관",
    ],
    practicalCases: [
      {
        title: "방 1개를 사무실로 쓰는 프리랜서 홈오피스 경비",
        situation: "웹개발 프리랜서, 84㎡ 아파트에서 방 1개(14㎡)를 사무실로 사용. 월세 130만원, 관리비 15만원, 인터넷+전기 월 10만원.",
        calculation: "사업 사용 비율 = 14/84 = 약 16.7%\n월 경비 = (130+15+10)만원 × 16.7% = 약 25.8만원\n연간 경비 = 25.8만원 × 12 = 약 310만원\n절세액(세율 24%) = 310만원 × 24% = 약 74만원",
        result: "홈오피스 등록 한 번으로 연 74만원 절세",
        taxSaved: 740000,
      },
      {
        title: "홈오피스 비율 과대 신고 세무조사 사례",
        situation: "1인 유튜버, 원룸(33㎡) 전체를 100% 사업용으로 신고. 월세 80만원 전액 경비 처리. 세무서 사실확인 조사.",
        calculation: "원룸 전체 사업 사용 인정 불가 → 50% 비율로 조정\n추가 납부세액 = (80만원 × 50%) × 12개월 × 24% = 약 115만원\n가산세(10%) 포함 약 127만원",
        result: "생활공간 겸용 공간은 50% 이상 인정 어려움. 합리적 비율(30~40%) 적용 권장",
        taxSaved: -1270000,
      },
    ],
  },
  {
    id: "biz_vehicle_expense",
    version: "2026.2", lastUpdated: "2026-01-01",
    category: "income", subcategory: "차량경비",
    savingType: "deduction", targetAudience: ["sole_proprietor", "corporation"],
    name: "업무용 승용차 경비 한도 (2026 부분기간 보험 가입 개정)",
    shortDescription: "업무용 차량 연 1,500만원 한도 — 1대 초과분은 가입기간 비율만큼 경비 인정",
    fullDescription: `업무 전용 보험에 가입한 차량의 감가상각비, 유류비, 보험료, 수리비 등을 연간 1,500만원 한도로 경비 처리.

■ 기본 원칙
  - 업무전용 자동차보험 가입이 경비 처리의 전제 조건
  - 운행일지 작성 시 업무사용비율만큼 경비 인정 (미작성 시 100만원 이하만 인정)

■ 2026년 개정 — 1대 초과 차량 부분기간 보험 가입 시 (신설)
  업무용 승용차를 2대 이상 운용하는 경우, 2번째 차량부터:
  - 연중 일부 기간만 업무전용 보험에 가입한 경우
  - 가입 기간 비율에 따라 경비를 안분하여 인정
  예) 7월부터 12월까지 가입(6개월) → 해당 차량 비용의 6/12(50%)만 경비 인정

■ 기존 규정 (1대까지)
  - 연간 1,500만원 한도 (감가상각비 포함)
  - 업무전용 보험 미가입 시 전액 비용 불인정`,
    tags: ["업무용차량", "감가상각", "차량경비", "운행일지", "부분기간보험"],
    impactLevel: "high", maxDeductionAmount: 15_000_000, applicableRate: "연 1,500만원 한도 (1대 초과분: 보험가입기간 비율 적용)",
    requirements: [
      { id: "r1", description: "업무전용 자동차보험 가입 (필수)", type: "other", critical: true },
      { id: "r2", description: "운행일지 작성 (경비 한도 초과 시)", type: "other", critical: false },
      { id: "r3", description: "1대 초과 차량: 가입기간 비율로 경비 안분 (2026년 신설)", type: "other", critical: false },
    ],
    legalBasis: [
      { law: "소득세법 시행령", article: "제78조의3", effectiveDate: "2026-01-01" },
      { law: "법인세법 시행령", article: "제50조의2", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "vehicle_count", label: "업무용 차량 대수", type: "number", unit: "대", required: true },
      { id: "vehicle_cost", label: "차량 관련 연간 총비용", type: "number", unit: "원", required: true },
      { id: "biz_usage", label: "업무 사용 비율 (%)", type: "number", unit: "%", required: true },
      { id: "insurance_months", label: "1대 초과 차량 업무전용 보험 가입 개월 수", type: "number", unit: "개월", min: 1, max: 12, required: false },
    ],
    calculationFormula: "1대: 경비 = min(차량비용 × 업무비율, 1,500만). 2대↑: 경비 = 차량비용 × (가입개월/12) × 업무비율, 한도 1,500만",
    urgency: "year_round", difficulty: "medium",
    steps: [
      "① 업무전용 보험 가입 (전 차량 필수)",
      "② 2대 이상인 경우: 각 차량 보험 가입 기간 확인",
      "③ 운행일지 작성 (앱 활용 — 한도 초과 차량)",
      "④ 연간 차량비용 집계 및 가입기간 비율 계산",
      "⑤ 한도 내 경비 처리 (신고 시 차량 목록 첨부)",
    ],
    contentHook: { title: "차 2대 있는 사장님 주목! 2026년 차량경비 규정 바뀌었습니다", hook: "보험 중간에 가입해도 경비 인정! 단, 기간 비율만큼만", targetKeyword: "업무용차량 경비 한도 2026 부분기간", estimatedViews: "high" },
    warnings: [
      "업무전용 자동차보험 미가입 차량은 차량 관련 비용 전액 경비 불인정",
      "운행일지 미작성 시 업무 사용 비율을 100%로 인정받을 수 없음 — 한도 초과 차량은 반드시 작성",
      "임직원 전용 보험이 아닌 일반 자동차보험은 업무전용 보험 요건 미충족",
      "감가상각비 한도(연 800만원, 리스·렌트는 연 1,500만원 포함 한도) 별도 적용 — 혼동 주의",
      "1대 초과 차량의 부분기간 보험 가입 시 미가입 기간 비용은 경비 전액 불인정 (2026년 개정)",
    ],
    practicalCases: [
      {
        title: "업무용 승용차 1대, 운행일지 작성으로 경비 최대화",
        situation: "컨설팅 개인사업자, 2,800cc 업무용 차량 1대. 연간 차량 관련 비용 2,200만원. 업무전용 보험 가입. 운행일지 작성(업무사용비율 80%).",
        calculation: "업무 인정 비용 = 2,200만원 × 80% = 1,760만원\n한도 적용: min(1,760만원, 1,500만원) = 1,500만원 경비 인정\n세율 35% 적용 시 절세액 = 1,500만원 × 35% = 525만원",
        result: "운행일지 작성으로 한도 최대 활용, 연 525만원 절세",
        taxSaved: 5250000,
      },
      {
        title: "2대 차량 운용 시 2026년 개정 부분기간 보험 적용",
        situation: "의류 도매업 사업자, 차량 2대 운용. 2번째 차량은 7월에 업무전용 보험 가입(6개월). 2번째 차량 연간 비용 1,800만원, 업무비율 90%.",
        calculation: "2번째 차량 인정 비용 = 1,800만원 × (6/12) × 90% = 810만원\n한도 적용: min(810만원, 1,500만원) = 810만원\n세율 35% 기준 절세액 = 810만원 × 35% = 283만원\n(보험 미가입 시 0원 인정 대비 283만원 절세)",
        result: "7월 중간 가입이라도 6개월 비율 인정으로 283만원 절세 가능",
        taxSaved: 2830000,
      },
    ],
  },
  {
    id: "biz_estimated_expense",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "추계신고",
    savingType: "deduction", targetAudience: ["freelancer"],
    name: "단순경비율/기준경비율 활용",
    shortDescription: "장부 없이 업종별 경비율로 간편 신고",
    fullDescription: "장부를 작성하지 않은 소규모 사업자는 국세청이 정한 단순경비율 또는 기준경비율을 적용하여 소득을 추계할 수 있습니다. 단순경비율 적용 시 경비를 높게 잡아주므로 유리할 수 있으나, 실제 경비가 더 많다면 장부 기장이 유리.",
    tags: ["단순경비율", "기준경비율", "추계신고", "프리랜서"],
    impactLevel: "medium", applicableRate: "업종별 경비율 적용 (60~90%)",
    requirements: [{ id: "r1", description: "직전연도 수입금액이 단순경비율 기준 이하", type: "income_limit", critical: true }],
    legalBasis: [{ law: "소득세법", article: "제80조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "revenue", label: "연 매출", type: "number", unit: "원", required: true },
      { id: "expense_rate", label: "단순경비율 (%)", type: "number", unit: "%", required: true },
    ],
    calculationFormula: "소득 = 매출 × (1 - 단순경비율). 실제경비 vs 추계 비교 후 유리한 쪽 선택.",
    urgency: "year_end", difficulty: "easy",
    steps: ["업종별 단순/기준경비율 확인 (국세청)", "실제 경비와 추계 경비 비교", "유리한 방식으로 종합소득세 신고"],
    contentHook: { title: "영수증 없어도 세금 신고 가능! 경비율 신고 총정리", hook: "프리랜서 매출 2천만원, 경비율 적용하면 소득 600만원만 인정!", targetKeyword: "단순경비율 프리랜서", estimatedViews: "medium" },
    warnings: [
      "단순경비율 적용 기준(직전연도 수입금액)을 초과하면 기준경비율 적용 — 세부담 급증 주의",
      "추계신고(기준경비율) 시 주요경비(매입비용, 임차료, 인건비) 증빙서류 없으면 경비 인정 불가",
      "실제 경비가 단순경비율보다 높은 경우 장부 기장이 유리 — 비교 후 선택",
      "무기장가산세(20%) 대상자가 추계신고를 잘못 적용하면 이중 불이익 가능",
      "업종 코드 오류로 잘못된 경비율 적용 시 추후 수정신고·가산세 발생",
    ],
    practicalCases: [
      {
        title: "단순경비율 적용으로 소득세 최소화 (소규모 프리랜서)",
        situation: "번역 프리랜서, 연 매출 1,800만원. 실제 경비 증빙 거의 없음. 업종 단순경비율 64.1% 적용 가능.",
        calculation: "추계소득 = 1,800만원 × (1 - 0.641) = 646만원\n기본공제 등 적용 후 과세표준 낮음 → 세율 6% 적용\n소득세 = 646만원 × 6% = 약 39만원",
        result: "단순경비율 적용으로 소득세 39만원 수준 유지. 실제 경비 증빙 없이도 신고 가능",
        taxSaved: 390000,
      },
      {
        title: "기준경비율 전환 후 세부담 급증 사례",
        situation: "유튜버 겸 강사, 전년도 수입 5,500만원으로 기준경비율 대상 전환. 주요경비 증빙 없음. 기준경비율 18.5% 적용.",
        calculation: "기준경비율 적용 소득 = 5,500만원 × (1 - 0.185) = 4,483만원\n단순경비율(64.1%) 비교 시 소득 = 5,500만원 × (1 - 0.641) = 1,975만원\n세부담 차이 = (4,483만원 기준 세액) - (1,975만원 기준 세액) ≈ 500만원 이상",
        result: "수입 증가로 경비율 방식 변경 시 세금 급증. 장부 기장으로 전환 검토 필수",
        taxSaved: -5000000,
      },
    ],
  },
  {
    id: "biz_tax_agent_deduction",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "세무대리",
    savingType: "deduction", targetAudience: ["sole_proprietor", "freelancer"],
    name: "성실신고 확인비용 세액공제",
    shortDescription: "성실신고 확인 대상자 세무사 비용 60% 세액공제 (120만원 한도)",
    fullDescription: "성실신고 확인 대상 사업자가 세무사에게 지급한 성실신고 확인 비용의 60%를 세액공제 (120만원 한도). 성실신고 확인 대상: 업종별 수입금액 기준 충족 시.",
    tags: ["성실신고", "세무사", "세액공제", "확인비용"],
    impactLevel: "low", maxSavingAmount: 1_200_000, applicableRate: "확인비용의 60% (120만원 한도)",
    requirements: [{ id: "r1", description: "성실신고 확인 대상 사업자", type: "income_limit", critical: true }],
    legalBasis: [{ law: "조세특례제한법", article: "제126조의6", effectiveDate: "2026-01-01" }],
    calculationParams: [{ id: "cost", label: "성실신고 확인 비용", type: "number", unit: "원", required: true }],
    calculationFormula: "공제 = min(비용 × 60%, 120만원)", urgency: "year_end", difficulty: "easy",
    steps: ["성실신고 확인 대상 여부 확인", "세무사에게 성실신고 확인 의뢰", "확인비용 영수증 수취", "종합소득세 신고 시 공제 적용"],
    warnings: [
      "성실신고 확인 대상 여부는 업종별 수입금액 기준으로 판단 — 매년 기준 확인 필수",
      "성실신고 확인서를 제출하지 않으면 가산세(미제출 시 산출세액의 5%) 부과",
      "확인 비용 세액공제는 성실신고 확인서 첨부 신고분에만 적용 — 수정신고로는 소급 불가",
      "세무사 확인 비용이 200만원을 초과해도 공제 한도는 120만원으로 고정",
      "성실신고 확인을 받은 후에도 중요 항목 오류 발견 시 수정신고 의무 있음",
    ],
    practicalCases: [
      {
        title: "성실신고 확인 대상 의원의 세액공제 활용",
        situation: "내과 의원 원장, 연 수입 7억원(의료업 성실신고 기준 초과). 성실신고 확인 비용 200만원 지급.",
        calculation: "공제액 = min(200만원 × 60%, 120만원) = 120만원\n실질 확인 비용 부담 = 200만원 - 120만원(공제) = 80만원",
        result: "세무사 비용 200만원 중 120만원 세액공제로 실질 비용 80만원으로 절감",
        taxSaved: 1200000,
      },
      {
        title: "성실신고 확인서 미제출 가산세 사례",
        situation: "학원 원장, 연 수입 5억원. 성실신고 확인 대상이나 확인서 미첨부 신고. 산출세액 8,000만원.",
        calculation: "미제출 가산세 = 8,000만원 × 5% = 400만원\n성실신고 확인 비용(150만원) + 세액공제(90만원) 비교\n확인서 제출 시 실질 비용 = 150만원 - 90만원 = 60만원\n미제출 시 가산세 400만원 부담",
        result: "성실신고 확인 의뢰 시 실질 비용 60만원 vs 미의뢰 시 가산세 400만원 — 반드시 이행",
        taxSaved: 4000000,
      },
    ],
  },
  {
    id: "biz_mixed_income_split",
    version: "2026.1", lastUpdated: "2026-01-01",
    category: "income", subcategory: "소득분산",
    savingType: "split", targetAudience: ["sole_proprietor", "business_owner"],
    name: "가족 급여 지급을 통한 소득 분산",
    shortDescription: "배우자·가족에게 적정 급여 지급하여 세율구간 분산",
    fullDescription: "개인사업자가 실제 근무하는 배우자나 가족에게 적정 수준의 급여를 지급하면, 사업소득이 분산되어 종합소득세 누진세율 구간이 낮아짐. 단, 실제 근무 사실이 있어야 하며, 과도한 급여는 부인될 수 있음.",
    tags: ["소득분산", "가족급여", "누진세율", "사업자"],
    impactLevel: "high", applicableRate: "누진세율 구간 차이만큼 절세",
    requirements: [
      { id: "r1", description: "가족의 실제 근무 사실", type: "employment", critical: true },
      { id: "r2", description: "적정 수준의 급여 (시장가격 기준)", type: "income_limit", critical: true },
    ],
    legalBasis: [{ law: "소득세법", article: "제27조", effectiveDate: "2026-01-01" }],
    calculationParams: [
      { id: "biz_income", label: "사업소득", type: "number", unit: "원", required: true },
      { id: "family_salary", label: "가족 급여 (월)", type: "number", unit: "원", required: true },
    ],
    calculationFormula: "사업소득 세금(전체) vs 사업소득세금(급여차감) + 가족 소득세 합계 비교",
    urgency: "year_round", difficulty: "medium",
    steps: ["가족의 실제 업무 내용 정의", "적정 급여 수준 결정 (유사 직종 참고)", "근로계약서 작성, 4대보험 가입", "급여 지급 및 원천징수"],
    contentHook: { title: "부부 사업, 급여 나누면 세금 수백만원 절약!", hook: "연소득 1억 → 5천만원씩 나누면 세금 700만원 차이!", targetKeyword: "가족급여 소득분산 절세", estimatedViews: "high" },
    warnings: [
      "실제 근무 없는 허위 급여 지급 시 세무조사 대상 — 근로계약서, 출퇴근 기록, 업무 결과물 필수 보관",
      "과도한 급여(동종업계 시세 초과)는 부당행위계산 부인으로 경비 불인정 가능",
      "가족 급여 지급 시 4대보험 가입 의무 — 미가입 시 보험료 추징 및 가산금 부과",
      "배우자·직계존비속에 대한 급여는 세무서 집중 검토 대상 — 실제 근무 입증 자료 철저히 준비",
      "원천세(근로소득세) 미신고·미납 시 가산세 별도 부과",
    ],
    practicalCases: [
      {
        title: "부부 공동 운영 쇼핑몰의 배우자 급여 소득분산",
        situation: "온라인 쇼핑몰 사업자, 연 사업소득 1억 2,000만원. 배우자가 실제 CS·물류 담당. 배우자 급여 월 300만원(연 3,600만원) 지급.",
        calculation: "소득분산 전: 사업소득 1.2억 → 세율 35% → 세액 약 2,586만원\n소득분산 후: 사업소득 8,400만원(세율 24%) → 세액 약 1,326만원\n+ 배우자 소득세(3,600만원 기준) 약 216만원\n합산 세액 = 1,542만원",
        result: "소득분산으로 연간 약 1,044만원 절세 (4대보험 포함 실절세 약 700만원 수준)",
        taxSaved: 7000000,
      },
      {
        title: "허위 급여 지급으로 세무조사 경비 부인 사례",
        situation: "학원 원장, 실제 근무 없는 어머니(65세)에게 월 200만원 급여 지급. 근로계약서 없음. 세무조사에서 가족급여 전액 부인.",
        calculation: "부인된 경비 = 200만원 × 12 = 2,400만원\n추가 세액(세율 35%) = 2,400만원 × 35% = 840만원\n신고불성실가산세(40%) = 840만원 × 40% = 336만원\n총 추징 = 840만원 + 336만원 = 1,176만원",
        result: "허위 급여는 경비 부인 + 가산세 40%로 실질 손해. 반드시 실제 근무 사실 전제",
        taxSaved: -11760000,
      },
    ],
  },
]
