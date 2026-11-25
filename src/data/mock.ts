/**
 * 예시 데이터 — 화면 확인용입니다. 실제 서비스 데이터가 아닙니다.
 * TODO(API): 각 배열을 DB/API 조회로 교체하세요. 타입은 그대로 쓰면 됩니다.
 */

export type Formulation = "정제" | "캡슐" | "분말 스틱" | "젤리" | "액상";
export type Cert = "건기식 GMP" | "HACCP";

export type Maker = {
  id: string;
  name: string;
  forms: Formulation[];
  certs: Cert[];
  moq: number; // 최소 생산 수량 (병/박스 기준)
  moqLabel: string;
  leadTime: string;
  individualApproved: boolean; // 개별인정형 원료 취급 여부
  summary: string;
  equipment: string[];
  ingredients: string[];
  cases: { title: string; detail: string }[];
  /** 유료 광고 콘텐츠(인터뷰 기사). 있으면 상세 화면에 "광고" 표기로 노출 */
  sponsoredInterview?: { title: string; href: string };
};

export const MAKERS: Maker[] = [
  {
    id: "a",
    name: "A제조",
    forms: ["정제", "캡슐"],
    certs: ["건기식 GMP", "HACCP"],
    moq: 3000,
    moqLabel: "3,000병",
    leadTime: "[N]주",
    individualApproved: true,
    summary: "정제·캡슐 전문, 소량 초도 생산 가능",
    equipment: ["[타정기 사양]", "[캡슐 충전기 사양]", "[코팅 설비]"],
    ingredients: ["[주력 원료]", "[주력 원료]"],
    cases: [{ title: "[생산 사례 제목]", detail: "[제형 · 수량 · 기간]" }],
  },
  {
    id: "b",
    name: "B제조",
    forms: ["젤리", "분말 스틱"],
    certs: ["건기식 GMP", "HACCP"],
    moq: 10000,
    moqLabel: "10,000포",
    leadTime: "[N]주",
    individualApproved: false,
    summary: "젤리·스틱 대량 생산 라인 보유",
    equipment: ["[젤리 충전 라인]", "[스틱 포장기]"],
    ingredients: ["[주력 원료]"],
    cases: [
      { title: "[생산 사례 제목]", detail: "[제형 · 수량 · 기간]" },
      { title: "[생산 사례 제목]", detail: "[제형 · 수량 · 기간]" },
    ],
    sponsoredInterview: { title: "[대표 인터뷰] 젤리 제형, 맛과 함량을 같이 잡는 법", href: "/guides" },
  },
  {
    id: "c",
    name: "C제조",
    forms: ["분말 스틱", "액상"],
    certs: ["건기식 GMP"],
    moq: 2000,
    moqLabel: "2,000개",
    leadTime: "[N]주",
    individualApproved: true,
    summary: "분말·액상 소량 다품종",
    equipment: ["[액상 충전 라인]", "[분말 혼합기]"],
    ingredients: ["[주력 원료]"],
    cases: [{ title: "[생산 사례 제목]", detail: "[제형 · 수량 · 기간]" }],
  },
  {
    id: "d",
    name: "D제조",
    forms: ["정제", "분말 스틱"],
    certs: ["HACCP"],
    moq: 5000,
    moqLabel: "5,000병",
    leadTime: "[N]주",
    individualApproved: false,
    summary: "정제·분말 중량 생산",
    equipment: ["[타정기 사양]"],
    ingredients: ["[주력 원료]"],
    cases: [],
  },
];

export function getMaker(id: string) {
  return MAKERS.find((m) => m.id === id);
}

/** 제조사 찾기 화면 상단 광고 영역 (유료 비교 콘텐츠 · 배너) */
export const MAKER_ADS = [
  { id: "ad1", title: "소량 MOQ 젤리 제조사 비교", sponsor: "B제조 외", href: "/guides" },
];

/* ───────── 의뢰자: 내 설계서 · 견적 ───────── */

export type Stage = "draft" | "blueprint" | "quote" | "production";
export const STAGES: { id: Stage; label: string }[] = [
  { id: "draft", label: "AI 초안" },
  { id: "blueprint", label: "설계서" },
  { id: "quote", label: "견적 비교" },
  { id: "production", label: "생산" },
];

export type Blueprint = {
  id: string;
  product: string;
  version: number;
  plan: "basic" | "premium";
  stage: Stage;
  updatedAt: string;
  form: Formulation;
  mainIngredient: string;
  subIngredients: string[];
  thirdPartyConsent: boolean;
  client: string;
};

export const MY_BLUEPRINTS: Blueprint[] = [
  {
    id: "bp-2",
    product: "[제품명] 간 건강 정제",
    version: 2,
    plan: "premium",
    stage: "quote",
    updatedAt: "2026-11-18",
    form: "정제",
    mainIngredient: "밀크씨슬 추출물",
    subIngredients: ["[부원료]", "[부원료]"],
    thirdPartyConsent: true,
    client: "[의뢰자 A]",
  },
  {
    id: "bp-1",
    product: "[제품명] 간 건강 정제",
    version: 1,
    plan: "premium",
    stage: "blueprint",
    updatedAt: "2026-11-02",
    form: "정제",
    mainIngredient: "밀크씨슬 추출물",
    subIngredients: ["[부원료]"],
    thirdPartyConsent: true,
    client: "[의뢰자 A]",
  },
];

export type Quote = {
  makerId: string;
  unitPrice: number;
  moq: number;
  leadTimeWeeks: number;
  note: string;
};

/** 와이어프레임의 비교 예시 값 (단가·MOQ) */
export const QUOTES_BY_BLUEPRINT: Record<string, Quote[]> = {
  "bp-2": [
    { makerId: "a", unitPrice: 3200, moq: 3000, leadTimeWeeks: 6, note: "[비고]" },
    { makerId: "b", unitPrice: 2900, moq: 10000, leadTimeWeeks: 8, note: "[비고]" },
    { makerId: "c", unitPrice: 3500, moq: 2000, leadTimeWeeks: 5, note: "[비고]" },
  ],
};

export type Message = { from: "me" | "maker"; text: string; at: string };
export const THREADS: Record<string, Message[]> = {
  a: [
    { from: "maker", text: "[제조사 메시지] 코팅 여부에 따라 단가가 달라집니다.", at: "11-19 10:12" },
    { from: "me", text: "[의뢰자 메시지] 무코팅 기준으로 부탁드립니다.", at: "11-19 11:40" },
  ],
  b: [{ from: "maker", text: "[제조사 메시지] 정제 대신 젤리 제형도 제안드립니다.", at: "11-20 09:05" }],
  c: [],
};

/* ───────── 관리자 ───────── */

export const INQUIRY_STATUSES = ["신규", "검토 중", "설계 중", "견적 발송", "완료"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export type Inquiry = {
  id: string;
  kind: "설계 의뢰" | "입점 문의";
  name: string;
  subject: string;
  createdAt: string;
  status: InquiryStatus;
};

export const INQUIRIES: Inquiry[] = [
  { id: "q-1031", kind: "설계 의뢰", name: "[의뢰자 A]", subject: "간 건강 · 정제 · 프리미엄", createdAt: "2026-11-22", status: "신규" },
  { id: "q-1030", kind: "입점 문의", name: "[제조사 E]", subject: "젤리 · 건기식 GMP", createdAt: "2026-11-21", status: "검토 중" },
  { id: "q-1029", kind: "설계 의뢰", name: "[의뢰자 B]", subject: "면역 · 캡슐 · 기본", createdAt: "2026-11-20", status: "설계 중" },
  { id: "q-1028", kind: "설계 의뢰", name: "[의뢰자 C]", subject: "장 건강 · 분말 스틱 · 프리미엄", createdAt: "2026-11-19", status: "견적 발송" },
  { id: "q-1027", kind: "설계 의뢰", name: "[의뢰자 D]", subject: "피로 개선 · 액상 · 기본", createdAt: "2026-11-15", status: "완료" },
];

/** 관리자 설계 라이브러리 (유사 설계 불러오기용) */
export const BLUEPRINT_LIBRARY: Blueprint[] = [
  ...MY_BLUEPRINTS,
  {
    id: "bp-7",
    product: "[제품명] 면역 캡슐",
    version: 1,
    plan: "basic",
    stage: "blueprint",
    updatedAt: "2026-10-28",
    form: "캡슐",
    mainIngredient: "[주원료]",
    subIngredients: ["[부원료]", "[부원료]"],
    thirdPartyConsent: false,
    client: "[의뢰자 B]",
  },
];

export type Ingredient = { name: string; type: "고시형" | "개별인정형"; claim: string; dailyIntake: string };

/** TODO(API): 공전·개별인정형 원료 DB 검색 + AI 요약으로 교체 */
export const INGREDIENTS: Ingredient[] = [
  { name: "밀크씨슬 추출물", type: "고시형", claim: "간 건강에 도움을 줄 수 있음", dailyIntake: "[1일 섭취량]" },
  { name: "[원료 A]", type: "고시형", claim: "[기능성 문구]", dailyIntake: "[1일 섭취량]" },
  { name: "[원료 B]", type: "개별인정형", claim: "[기능성 문구]", dailyIntake: "[1일 섭취량]" },
  { name: "[원료 C]", type: "개별인정형", claim: "[기능성 문구]", dailyIntake: "[1일 섭취량]" },
];

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
export const qty = (n: number) => n.toLocaleString("ko-KR");
