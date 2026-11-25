/**
 * 아직 확정되지 않은 값(자리표시)을 모두 이곳에 모읍니다.
 * 값이 정해지면 이 파일만 고치면 됩니다. 페이지에 직접 쓰지 마세요.
 */

export const SITE = {
  name: "[서비스명]",
  description: "약사가 설계하는 건강기능식품 OEM 발주 설계서와 제조사 비교 견적",
} as const;

/** 사업자 정보 — 전자상거래법상 사이트 하단 표시 의무 항목 */
export const BUSINESS = {
  companyName: "[상호]",
  ceo: "[이름]",
  bizRegNo: "[사업자등록번호]",
  mailOrderRegNo: "[통신판매업 신고번호]",
  address: "[사업장 주소]",
  phone: "[고객센터 전화번호]",
  email: "[고객센터 이메일]",
  privacyOfficer: "[개인정보 보호책임자]",
} as const;

/** 운영 지표 */
export const STATS = {
  monthlyInquiries: "750건+",
  partnerCount: "[N]곳",
  monthlyBlueprints: "[N]건",
  successFee: "0원",
} as const;

/** 설계서 상품 */
export const PLANS = {
  basic: {
    id: "basic",
    name: "기본 설계서",
    price: "[기본 가격]",
    leadTime: "납기 [N]영업일",
    features: [
      "원료별 함량 · 공전/인정 근거",
      "1일 섭취량 · 상한 검토",
      "제형 · MOQ 제안",
      "수정 [N]회",
    ],
  },
  premium: {
    id: "premium",
    name: "프리미엄",
    price: "[프리미엄 가격]",
    badge: "추천",
    features: [
      "기본 설계서 전체",
      "조건 맞는 제조사 3곳 비교 견적",
      "표시사항 · 광고 사전심의 가이드",
      "약사 화상 상담 [N]분",
    ],
    /** 이 상품은 제조사에 정보를 넘겨야 제공할 수 있음 */
    requiresThirdPartyConsent: true,
  },
} as const;

export type PlanId = keyof typeof PLANS;
export const DEFAULT_PLAN: PlanId = "premium";

/** 생산 계약 시 설계비 차감률 */
export const DEDUCTION_RATE = "[N]%";

/** 제조사 입점 상품 */
export const PARTNER_PRODUCTS = {
  membershipPrice: "[월 가격]",
  interviewPrice: "[건당 가격]",
  comparisonPrice: "[건당 가격]",
} as const;

/** 입점 문의 회신 기한 (영업일) */
export const PARTNER_REPLY_DAYS = "[N]";

/** 개인정보 보유 기간 */
export const RETENTION = {
  thirdPartyQuote: "견적 절차 종료 후 [N]개월 또는 동의 철회 시까지",
  partnerInquiry: "상담 종료 후 [N]개월 또는 동의 철회 시까지",
} as const;

/** 공통 선택지 */
export const FORMULATIONS = ["정제", "캡슐", "분말 스틱", "젤리", "액상"] as const;
export const BENEFITS = ["간 건강", "피로 개선", "혈행 개선", "장 건강", "면역", "체지방 감소"] as const;
export const TARGETS = ["30~40대 직장인", "50~60대 중장년", "여성 20~30대"] as const;

/**
 * 제형별 문의 비중 — 실제 문의 DB와 연동 전에는 null로 두고 "집계 중"으로 표시합니다.
 * TODO(API): 문의 DB에서 월간 집계를 받아 { label, percent }[] 형태로 채우기
 */
export const INQUIRY_SHARE_BY_FORM: { label: string; percent: number }[] | null = null;
