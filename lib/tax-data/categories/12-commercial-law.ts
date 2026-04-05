// ============================================================
// 12. 상법 변경사항 (2025~2026년 시행)
// 비상장·상장 법인 모두 영향 — 세무 실무 연계 포인트 포함
// ============================================================
// 근거 법령: 상법 일부개정법률 1·2·3차 개정
//   - 1차: 2025.7.22 시행 (이사 충실의무 확대)
//   - 2차: 2026.7.23 / 2026.9.10 시행 (감사위원 분리선출, 독립이사, 집중투표제)
//   - 3차: 2026.3.6 시행 (자기주식 소각 의무화) — 2026.2.25 국회 통과
// ============================================================

import type { TaxSavingItem } from "@/types/tax-database"

export const commercialLaw: TaxSavingItem[] = [
  // ── 1. 자기주식(자사주) 소각 의무화 ────────────────────────────
  {
    id: "commercial_treasury_stock_disposal",
    version: "2026.3", lastUpdated: "2026-03-06",
    category: "corporate", subcategory: "자기주식소각",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "자기주식(자사주) 소각 의무화 — 3차 상법 개정",
    shortDescription: "2026.3.6 시행 — 비상장 포함 전 법인, 신규 취득 자사주 1년 내 소각 의무",
    fullDescription: `2026년 2월 25일 국회 통과, 3월 6일 시행된 3차 상법 개정으로 모든 법인(비상장 포함)은 자기주식을 취득하면 원칙적으로 소각해야 합니다.

■ 소각 기한
  • 신규 취득 자사주: 취득일로부터 1년 내 소각
  • 기존 보유 자사주(시행일 전 취득분): 1년 6개월 내 소각 (2027.9.5까지)

■ 예외: 보유 유지 가능 조건
  주주총회 결의로 '자기주식 보유·처분계획'을 수립한 경우 보유 가능
  - 임직원 스톡옵션·성과보상 재원
  - 우리사주조합 지원
  - 교환사채(EB) 교환 목적 등

■ 위반 시 제재
  이사 개인에게 5,000만원 이하 과태료 부과

■ 비상장법인 세무 실무 영향
  1. 자사주 소각 시 의제배당 이슈
     - 소각 시 취득가액 초과분 → 주주에게 의제배당 과세
     - 취득가액 이하 소각 시 세금 없음 (단, 저가매수 부당행위 주의)
  2. 비상장주식 가치 평가 변동
     - 자사주 소각으로 총 발행주식 수 감소 → 주당 순자산가치(주식평가액) 상승
     - 향후 가업승계·증여·상속 시 주식평가액 상승 → 증여/상속세 부담 증가 가능
  3. 법인세 처리
     - 자사주 소각은 자본거래 → 법인세 손익 영향 없음
     - 단, 자사주 취득가액 > 액면가 차이는 감자차손으로 회계처리`,
    tags: ["자기주식", "자사주소각", "상법개정", "의제배당", "비상장법인", "주식평가"],
    impactLevel: "very_high",
    requirements: [
      { id: "r1", description: "자기주식 보유 법인 (비상장 포함 전 법인)", type: "business_type", critical: true },
      { id: "r2", description: "시행일(2026.3.6) 전 취득 자사주: 1년6개월 내 조치 필요", type: "period", critical: true },
    ],
    legalBasis: [
      { law: "상법", article: "제342조 (자기주식의 소각)", effectiveDate: "2026-03-06" },
      { law: "상법", article: "제341조 (자기주식의 취득)", effectiveDate: "2026-03-06" },
      { law: "상속세 및 증여세법", article: "제63조 (비상장주식 평가)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "treasury_stock_value", label: "자기주식 취득가액", type: "number", unit: "원", required: true },
      { id: "par_value", label: "주식 액면가액", type: "number", unit: "원", required: true },
      { id: "market_value", label: "소각 시점 주식 평가액", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "의제배당 = 소각가액(=취득가액) - 액면가액. 소각가액 > 취득가액이면 주주에게 배당소득 과세.",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "① 자기주식 보유 현황 즉시 파악 (기존 보유분 → 2027.9.5 기한)",
      "② 예외 사유 검토 (임직원 보상, 우리사주 등 활용 계획 여부)",
      "③ 주주총회 결의로 '자기주식 보유·처분계획' 수립 필요 시 결의",
      "④ 소각 결정 시: 의제배당 발생 여부·금액 계산",
      "⑤ 소각 후 주식 수 감소에 따른 주당 평가액 상승 효과 분석",
      "⑥ 향후 가업승계·증여 계획 있는 경우 소각 전 타이밍 전략 검토",
    ],
    contentHook: {
      title: "자사주 소각 의무화! 내 회사 자사주 어떻게 해야 하나? (2026.3.6 시행)",
      hook: "모르면 이사가 5천만원 과태료! 비상장법인 대표님 필수 확인",
      targetKeyword: "자기주식 소각 의무화 2026 비상장법인",
      estimatedViews: "high",
    },
    warnings: [
      "기존 보유 자사주: 2027년 9월 5일까지 소각 또는 보유계획 수립 필요",
      "소각 시 의제배당 발생 가능 → 세무사 검토 필수",
      "자사주 소각으로 주당 평가액 상승 → 향후 증여·상속세 부담 증가 가능",
      "주주총회 결의 없이 보유 지속 시 이사에게 과태료 5,000만원 이하",
    ],
  },

  // ── 2. 이사 충실의무 확대 ─────────────────────────────────────
  {
    id: "commercial_director_loyalty_expansion",
    version: "2026.1", lastUpdated: "2025-07-22",
    category: "corporate", subcategory: "이사충실의무",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "이사 충실의무 확대 — 1차 상법 개정 (2025.7.22 시행)",
    shortDescription: "이사 충실의무 대상: '회사' → '회사 및 주주'로 확대 (비상장 포함)",
    fullDescription: `2025년 7월 22일부터 시행된 1차 상법 개정으로 이사의 충실의무 대상이 확대되었습니다.

■ 변경 내용
  개정 전: 이사는 '회사'를 위하여 직무를 충실하게 수행해야 함
  개정 후: 이사는 '회사 및 주주'를 위하여 직무를 충실하게 수행해야 함

■ 적용 대상
  모든 법인 (비상장법인 포함)

■ 실무 영향
  1. 소수주주 보호 강화: 대주주의 불공정 거래·합병 시 소수주주가 이사에게 손해배상 청구 가능
  2. 특수관계인 거래 주의: 대표이사-법인 간 자금거래, 부당행위계산 부인 위험 증가
  3. 가족법인 운영: 대표이사가 곧 최대주주인 1인 법인·소규모 비상장법인도 적용
  4. 배당 정책 결정: 이익 유보 vs 배당 판단 시 소수주주 이익도 고려 의무`,
    tags: ["이사충실의무", "상법개정", "소수주주보호", "비상장법인", "이사책임"],
    impactLevel: "high",
    requirements: [
      { id: "r1", description: "법인 이사 (대표이사 포함)", type: "employment", critical: true },
    ],
    legalBasis: [
      { law: "상법", article: "제382조의3 (이사의 충실의무)", effectiveDate: "2025-07-22" },
    ],
    calculationParams: [],
    calculationFormula: "해당 없음 (법적 의무 사항, 위반 시 손해배상 책임)",
    urgency: "event_based",
    difficulty: "medium",
    steps: [
      "① 특수관계인과의 거래 내역 점검 (부당행위계산 부인 위험)",
      "② 이사회 의사록 작성 강화 (의사결정 근거 명확화)",
      "③ 소수주주가 있는 경우 배당 정책·주요 거래 사전 협의",
      "④ 법인 자금의 대표이사 개인 용도 사용 자제 (가지급금 위험)",
    ],
    contentHook: {
      title: "2025년부터 이사 충실의무 대상에 '주주'가 추가됐습니다",
      hook: "1인 법인도 해당! 대표이사가 알아야 할 상법 변화",
      targetKeyword: "이사 충실의무 확대 비상장법인 2025",
      estimatedViews: "medium",
    },
    warnings: [
      "이미 2025.7.22 시행 중 — 소급 적용 가능성 주의",
      "소수주주가 있는 비상장법인은 주요 거래 시 이사회 결의 강화 필요",
    ],
  },

  // ── 3. 감사위원 분리선출 확대 ─────────────────────────────────
  {
    id: "commercial_audit_committee_separate",
    version: "2026.2", lastUpdated: "2026-07-23",
    category: "corporate", subcategory: "감사위원분리선출",
    savingType: "structure", targetAudience: ["corporation"],
    name: "감사위원 분리선출 확대 — 2차 상법 개정",
    shortDescription: "자산 1천억~2조 상장사 감사위원 전원 분리선출 + 최소 2명 의무 (2026.7.23·9.10 순차 시행)",
    fullDescription: `2차 상법 개정으로 감사위원 분리선출 의무가 확대됩니다.

■ 시행 일정 및 내용
  1) 2026.7.23 시행: 자산 1천억원 이상 ~ 2조원 미만 상장회사
     - 감사위원 전원 선임·해임 시 최대주주 의결권 3% 제한 (기존: 2조↑만 해당)
  2) 2026.9.10 시행: 상장법인 전체
     - 감사위원 최소 2명을 이사와 분리하여 주주총회에서 선출 의무

■ 적용 대상
  주로 상장법인 (비상장법인은 원칙 적용 제외)
  단, 코스닥 상장 준비(IPO 준비) 중인 중소기업은 상장 후 즉시 적용되므로 사전 준비 필요

■ 실무 영향
  - 최대주주의 감사위원 선임 영향력 약화
  - 소수주주(기관투자자) 의결권 강화
  - IPO 준비 기업: 정관 및 이사회 구성 사전 정비 필요`,
    tags: ["감사위원", "분리선출", "상법개정", "상장법인", "IPO준비"],
    impactLevel: "medium",
    requirements: [
      { id: "r1", description: "자산 1천억 이상 상장회사 또는 IPO 준비 기업", type: "business_type", critical: true },
    ],
    legalBasis: [
      { law: "상법", article: "제542조의12 (감사위원회 위원의 선임)", effectiveDate: "2026-07-23" },
    ],
    calculationParams: [],
    calculationFormula: "해당 없음 (법적 의무 사항)",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "① 자산 규모 및 상장 여부 확인",
      "② 정관상 감사위원회 선임 조항 점검",
      "③ 주주총회 의안 준비 (분리선출 절차 반영)",
      "④ IPO 준비 기업: 상장 전 이사회·감사위원회 구성 정비",
    ],
    contentHook: {
      title: "상장 준비 중이라면 반드시 알아야 할 2026 상법 개정",
      hook: "감사위원 분리선출 의무화 — IPO 준비 기업 체크리스트",
      targetKeyword: "감사위원 분리선출 2026 IPO",
      estimatedViews: "medium",
    },
    warnings: [
      "2026.7.23·9.10 순차 시행 — 일정별 적용 범위 확인 필요",
      "상장 준비 기업: 상장 즉시 적용, 사전 정관 정비 권장",
    ],
  },

  // ── 4. 독립이사 제도 ──────────────────────────────────────────
  {
    id: "commercial_independent_director",
    version: "2026.2", lastUpdated: "2026-07-23",
    category: "corporate", subcategory: "독립이사",
    savingType: "structure", targetAudience: ["corporation"],
    name: "독립이사 제도 — 사외이사 명칭 변경 및 비율 확대",
    shortDescription: "사외이사 → 독립이사 명칭 변경, 의무 비율 1/4 → 1/3로 확대 (2026.7.23)",
    fullDescription: `2차 상법 개정으로 사외이사 제도가 독립이사 제도로 개편됩니다.

■ 주요 변경 내용 (2026.7.23 시행)
  1. 명칭 변경: 사외이사 → 독립이사
  2. 의무 비율 확대: 이사회의 1/4 이상 → 1/3 이상
     - 상장법인의 경우 즉시 적용
     - 자산 2조 이상 대규모 상장법인: 과반수 이상 유지

■ 독립이사 자격 요건 강화
  - 최대주주·경영진과의 독립성 요건 강화
  - 겸직 제한 및 임기 제한 규정 보완

■ 실무 영향
  - 이사회 구성 재편 필요 (1/3 비율 미달 시 정관 위반)
  - 독립이사 추천·선임 절차 정비
  - 상장 준비 기업: 상장 전 이사회 구성 정비 시 새 기준 적용`,
    tags: ["독립이사", "사외이사", "상법개정", "이사회", "상장법인"],
    impactLevel: "medium",
    requirements: [
      { id: "r1", description: "상장법인 (독립이사 의무 대상)", type: "business_type", critical: true },
    ],
    legalBasis: [
      { law: "상법", article: "제382조 (이사의 선임, 결격사유 등)", effectiveDate: "2026-07-23" },
      { law: "상법", article: "제542조의8 (사외이사의 선임)", effectiveDate: "2026-07-23" },
    ],
    calculationParams: [],
    calculationFormula: "해당 없음. 이사회 내 독립이사 비율 = 독립이사 수 / 전체 이사 수 ≥ 1/3",
    urgency: "event_based",
    difficulty: "medium",
    steps: [
      "① 현행 이사회 구성 현황 파악 (사외이사 비율 계산)",
      "② 1/3 기준 충족 여부 확인 (미달 시 추가 선임 계획)",
      "③ 사외이사 명칭을 독립이사로 정관·내규 변경",
      "④ 독립이사 자격 요건 강화 기준으로 현 사외이사 자격 재검토",
    ],
    contentHook: {
      title: "사외이사가 독립이사로 바뀐다! 2026년 상법 개정 핵심 정리",
      hook: "이사회 구성 1/3로 확대 — 상장사 대표님 체크해보세요",
      targetKeyword: "독립이사 제도 사외이사 상법개정 2026",
      estimatedViews: "medium",
    },
    warnings: [
      "2026.7.23 시행 — 이사회 구성 변경에 시간이 필요하므로 사전 준비 권장",
      "IPO 준비 기업: 상장 시 새로운 독립이사 기준 적용",
    ],
  },

  // ── 5. 집중투표제 의무화 ─────────────────────────────────────
  {
    id: "commercial_cumulative_voting",
    version: "2026.2", lastUpdated: "2026-07-23",
    category: "corporate", subcategory: "집중투표제",
    savingType: "structure", targetAudience: ["corporation"],
    name: "집중투표제 의무화 — 대규모 상장회사 대상 (2차 상법 개정)",
    shortDescription: "대규모 상장회사, 집중투표제 의무화로 소수주주 이사 선임 기회 확대",
    fullDescription: `2차 상법 개정으로 대규모 상장회사에 집중투표제가 의무화됩니다.

■ 집중투표제란?
  복수의 이사를 선출할 때 주주가 보유 주식 수 × 선출 이사 수만큼의 의결권을 하나의 후보에 몰아줄 수 있는 제도.
  소수주주가 자신이 지지하는 이사를 선임할 수 있도록 보호하는 제도.

■ 적용 대상
  자산 2조원 이상 대규모 상장회사 (세부 기준 시행령 위임)

■ 실무 영향
  - 지배주주의 이사회 독점 지배 약화
  - 소수주주(기관투자자, ESG 투자자)의 이사 선임 영향력 강화
  - 이사 후보 선정 전략 변화 필요

■ 중소 비상장법인 관련성
  직접 적용은 아니지만, 추후 상장을 계획하는 기업이라면 참고.
  기존 비상장법인도 정관에 집중투표제 도입 가능 (자율)`,
    tags: ["집중투표제", "상법개정", "대규모상장회사", "소수주주", "이사선임"],
    impactLevel: "medium",
    requirements: [
      { id: "r1", description: "자산 2조원 이상 대규모 상장회사", type: "business_type", critical: true },
    ],
    legalBasis: [
      { law: "상법", article: "제382조의2 (집중투표)", effectiveDate: "2026-07-23" },
    ],
    calculationParams: [],
    calculationFormula: "집중투표 의결권 = 보유주식 수 × 선출 이사 수 (1인에 집중 가능)",
    urgency: "event_based",
    difficulty: "hard",
    steps: [
      "① 자산 규모 기준 대규모 상장회사 해당 여부 확인",
      "② 주주총회 이사 선임 절차에 집중투표제 반영",
      "③ 이사 후보 선정 및 선임 전략 재검토",
      "④ 정관 규정 정비 (집중투표 배제 조항 삭제 여부 검토)",
    ],
    contentHook: {
      title: "집중투표제 의무화! 주주 권리 강화 어디까지?",
      hook: "소수주주가 원하는 이사를 선임할 수 있게 됩니다",
      targetKeyword: "집중투표제 의무화 2026 상법",
      estimatedViews: "medium",
    },
    warnings: [
      "대규모 상장회사(자산 2조↑) 대상 — 중소법인 직접 적용 없음",
      "세부 기준은 시행령 확인 필요",
    ],
  },

  // ── 5. 자사주 희석화 전략 + 우리사주조합 루트 ────────────────
  {
    id: "commercial_treasury_dilution_esop",
    version: "2026.1", lastUpdated: "2026-04-05",
    category: "corporate", subcategory: "자사주희석화",
    savingType: "structure", targetAudience: ["corporation", "business_owner"],
    name: "자사주 희석화(Dilution) + 우리사주조합 처분 — 강제소각 공포 탈출법",
    shortDescription: "100억 자사주를 10억으로 희석 후 우리사주조합에 처분 — 상법 개정 후에도 유효한 구조",
    fullDescription: `자사주 강제소각 의무화(3차 상법 개정) 대응 핵심 전략

■ 배경
  2026년 3차 상법 개정: 자사주 취득 후 1년 이내 소각 원칙
  위반 시 이사 과태료 5천만원
  기존 보유 자사주 유예기간: 약 1년 6개월~2년

■ 희석화(Dilution) 전략
  100억 자사주 → 신주 발행 등으로 지분 희석 → 자사주 가치 10억으로 감소
  효과: 강제소각 시 세금 부담 10분의 1로 축소
  법인세법 개정과 무관하게 유효한 구조

■ 우리사주조합 처분 루트
  상법 개정안 논의 과정에서 우리사주조합은 규제 예외로 살아남음
  희석화된 자사주 → 우리사주조합에 처분 → 임직원 지분화
  회사가 다시 매입하거나 제3자에게 매각 가능
  '희석화 → 우리사주조합' 루트 = 강제소각 공포에서 완전 해방

■ 실행 타이밍
  법 통과 전 등기우편으로 주총소집통지서 발송 (우체국 소인 = 시작일 증거)
  Max 금액으로 설정 (나중에 줄이는 건 쉽지만 늘리는 건 불가)
  기존 자사주: 유예기간 내 희석화 + 우리사주조합 처분 실행`,
    tags: ["자사주희석화", "우리사주조합", "상법개정", "강제소각", "자사주전략", "막차전략"],
    impactLevel: "very_high",
    applicableRate: "자사주 가치의 90%까지 세금 부담 감축 가능 (100억→10억으로 희석 시)",
    requirements: [
      { id: "r1", description: "자사주 보유 법인 (비상장 포함)", type: "business_type", critical: true },
      { id: "r2", description: "3차 상법 개정 시행 전 또는 유예기간 내", type: "period", critical: true },
      { id: "r3", description: "임직원 조합 구성 가능한 규모", type: "other", critical: false },
    ],
    legalBasis: [
      { law: "상법", article: "제341조 (자기주식 취득·소각)", effectiveDate: "2026-01-01" },
      { law: "근로복지기본법", article: "우리사주조합 관련 규정", effectiveDate: "2026-01-01" },
      { law: "자본시장법", article: "우리사주조합 예외 규정", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "treasury_stock_value", label: "현재 자사주 취득가액", type: "number", unit: "원", required: true },
      { id: "target_dilution_ratio", label: "희석화 목표 비율 (%)", type: "number", unit: "%", required: false },
    ],
    calculationFormula: "희석화 후 자사주 가치 = 기존 자사주 가치 × (1 - 희석화 비율). 우리사주조합 처분 시 세금: 종합소득세 또는 배당소득세 별도 검토.",
    urgency: "event_based",
    difficulty: "expert",
    steps: [
      "1. 우체국에서 등기우편 발송 (주총소집통지서, Max 금액 설정)",
      "2. 희석화 방안 설계 (신주 발행 방법 및 비율 결정)",
      "3. 우리사주조합 설립 또는 기존 조합 활용",
      "4. 희석화된 자사주 조합에 처분",
      "5. 조합이 회사에 재매각 또는 임직원에게 배분",
    ],
    contentHook: {
      title: "자사주 강제소각 공포 탈출법 — 희석화+우리사주조합 완전 가이드",
      hook: "100억 자사주, 희석화하면 10억짜리가 됩니다 — 강제소각 공포에서 완전히 해방되는 법",
      targetKeyword: "자사주 강제소각 대응 희석화 전략",
      estimatedViews: "high",
    },
    warnings: [
      "희석화 후 처분 시 법인의 부당행위계산 부인 검토 필요 (저가처분 주의)",
      "우리사주조합 설립 요건 및 운영 규정 사전 검토",
      "법인세법 개정과 희석화는 별개 이슈 — 전문가 확인 필수",
      "등기우편 발송 시 우체국 소인 날짜 반드시 보존 (국세청/법원 증거용)",
    ],
  },

  // ── 6. 자녀법인 활용 경영권 승계 전략 ────────────────────────
  {
    id: "commercial_child_corp_succession",
    version: "2026.1", lastUpdated: "2026-04-05",
    category: "corporate", subcategory: "자녀법인승계",
    savingType: "structure", targetAudience: ["business_owner", "heir"],
    name: "자녀법인 활용 경영권 승계 — 희석 자사주 매입으로 현금+지분 동시 이전",
    shortDescription: "자녀 명의 법인 설립 → 희석된 자사주 매입 → 대표 현금 확보 + 자녀 경영권 이전 완성",
    fullDescription: `대기업 벤치마킹 중소기업 승계 전략

■ 구조 개요
  대표 법인 → (자사주 희석화) → 자녀 명의 법인 자사주 매입
  결과: 대표 현금 확보 + 자녀법인 지분 확보 = 경영권 자연 이전

■ 대기업 사례
  삼성SDS, 현대글로비스: 자녀 명의 법인을 통한 일감 몰아주기 + 지분 확보
  상장 후 막대한 자산 형성 경로

■ 중소기업 적용 방법
  Step 1: 자녀 명의 법인 설립 (서비스업, IT, 경영지원 등)
  Step 2: 일감 일부 이전 (법인세법 일감몰아주기 과세 한도 내)
  Step 3: 부모 법인의 자사주 희석화 실행
  Step 4: 희석된 자사주를 자녀법인이 매입 (시가 기준)
  결과: 부모는 자사주 매각 대금(현금) + 자녀법인은 부모 법인 지분 확보

■ 세금 효과
  부모: 자사주 매각 → 양도소득세 (희석화로 차익 최소화)
  자녀법인: 주식 취득 → 법인세 과세 없음 (취득가 원가로 처리)
  증여세: 시가 기준 거래이므로 증여세 없음 (부당행위계산 부인 주의)`,
    tags: ["자녀법인", "경영권승계", "자사주희석화", "일감몰아주기", "가업승계", "지분이전"],
    impactLevel: "very_high",
    applicableRate: "상속세 50% 대비 증여세·양도세 10~20%대로 절세 가능",
    requirements: [
      { id: "r1", description: "후계자(자녀) 존재 및 경영 참여 의지", type: "family", critical: true },
      { id: "r2", description: "자녀 명의 법인 설립 가능", type: "other", critical: true },
      { id: "r3", description: "부모 법인의 자사주 보유 또는 취득 계획", type: "asset", critical: true },
    ],
    legalBasis: [
      { law: "법인세법", article: "제52조 (부당행위계산 부인 — 일감몰아주기)", effectiveDate: "2026-01-01" },
      { law: "상속세및증여세법", article: "제45조의3 (일감몰아주기 증여의제)", effectiveDate: "2026-01-01" },
      { law: "상법", article: "제341조 (자기주식 처분)", effectiveDate: "2026-01-01" },
    ],
    calculationParams: [
      { id: "diluted_treasury_value", label: "희석화 후 자사주 가치", type: "number", unit: "원", required: true },
      { id: "child_corp_capital", label: "자녀법인 자본금", type: "number", unit: "원", required: false },
    ],
    calculationFormula: "자녀법인 자사주 매입 대금 = 희석화된 자사주 시가. 부모 양도소득: 매각가 - 취득가(희석 후 낮아짐). 실질 세금 = (매각가 - 취득가) × 20~25%.",
    urgency: "event_based",
    difficulty: "expert",
    steps: [
      "1. 자녀법인 설립 (업종, 자본금, 주주 구성 설계)",
      "2. 법인세법 일감몰아주기 과세 한도(세후 이익 30% 이내) 확인",
      "3. 부모 법인 자사주 희석화 실행",
      "4. 자녀법인이 희석된 자사주를 시가로 매입 (계약서·이사회 의사록 필수)",
      "5. 양도소득세 신고 및 주주명부 변경",
    ],
    contentHook: {
      title: "삼성·현대가 하는 방식, 중소기업도 할 수 있다 — 자녀법인 승계 완전 공개",
      hook: "자녀법인에 자사주 넘기면 현금도 챙기고 경영권도 물려준다",
      targetKeyword: "자녀법인 자사주 경영권 승계 전략",
      estimatedViews: "high",
    },
    warnings: [
      "일감몰아주기 증여의제세 과세 한도(세후이익 30%) 초과 주의",
      "시가 기준 거래 필수 — 저가 처분 시 증여세 문제",
      "자녀법인 설립 후 일정 기간 정상 영업 실적 필요 (설립 즉시 매입은 리스크)",
      "전체 구조는 세무·법무 전문가와 사전 설계 필수",
    ],
  },
]
