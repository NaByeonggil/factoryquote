# 발주설계 중개 사이트 — 디자인 핸드오프

Claude Code가 이 문서와 `reference/` 폴더를 기준으로 실제 코드를 구현합니다.

- 원본 디자인 캔버스: https://claude.ai/artifact/Rtan5QoJekKNxe2sJC85oP
- 와이어프레임 보드 (8개 화면): https://claude.ai/artifact/ATZVzDYYTtk69bUMWAkucf

## 0. 참고 파일 읽는 법

`reference/*.dc.html` 파일은 디자인 툴 전용 포맷입니다. 그대로 실행하지 마세요.

- `<x-dc>` 안의 HTML과 inline style이 실제 화면 구조와 스타일입니다. 이 부분을 컴포넌트로 옮기면 됩니다.
- `<helmet><style>`에는 공통 클래스(.btn, .chip, .input, .plan)가 들어 있습니다.
- `<sc-for list="{{ x }}">`는 반복 렌더링(map)이고, `{{ 값 }}`은 바인딩입니다. 하단 `class Component` 안의 `renderVals()`가 상태 로직입니다.
- `support.js`, `data-props`, `$preview`는 디자인 툴 전용이니 무시하세요.

## 1. 디자인 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| navy | `#0B2545` | 로고, 제목, 다크 섹션 배경 |
| primary | `#1D4ED8` | 주요 버튼, 링크, 강조 |
| primary-hover | `#1E40AF` | 버튼 hover |
| primary-tint | `#EAF1FF` | 배지, 안내 박스 배경 |
| primary-deep | `#1E3A8A` | tint 위 텍스트 |
| ground | `#F5F7FA` | 섹션 배경 |
| border | `#E2E8F0` | 카드·구분선 |
| border-strong | `#CBD5E1` | 입력창·고스트 버튼 테두리 |
| text | `#0F172A` | 본문 |
| text-muted | `#475569` | 보조 텍스트 (흰 배경 대비 4.5:1 이상) |
| on-dark-muted | `#CBD5E1` | 네이비 배경 위 보조 텍스트 |
| on-dark-accent | `#93C5FD` | 네이비 배경 위 eyebrow |

- 폰트: Noto Sans KR (400/500/700/800). Pretendard로 바꿔도 됩니다.
- 한글 줄바꿈: 최상위에 `word-break: keep-all`
- 레이아웃: 콘텐츠 최대 폭 1200px, 좌우 패딩 24px, 섹션 상하 패딩 72~96px
- 라운드: 버튼·입력 10px / 카드 16px / 배지 999px
- 그림자: 히어로 카드 `0 20px 48px rgba(11,37,69,0.10)`

### 타이포 스케일
| 용도 | 크기 / 굵기 |
|---|---|
| H1 히어로 | 48px / 800, line-height 1.25, letter-spacing -0.02em |
| H1 하위 페이지 | 36px / 800 |
| H2 섹션 | 32~36px / 800 |
| H3 카드 | 18~20px / 700 |
| 본문 | 15~18px / 400, line-height 1.7 |
| eyebrow | 14px / 700, primary 색 |
| 캡션 | 13px |

## 2. 공통 컴포넌트

- **Header**: 로고(네이비 32px 사각 + 플라스크 아이콘) + [서비스명], 우측 nav(설계하기, 제조사 찾기, 원료·규제 가이드, 제조사 입점, 로그인). 높이 72px, flex-wrap.
- **Button**: 높이 48px 이상(터치 44px 이상). `primary`(파랑 채움) / `ghost`(흰 바탕 + 테두리) / `light`(네이비 섹션 위 흰 버튼)
- **Chip (토글)**: 높이 44px, pill. 선택 시 테두리 primary, 배경 tint, 굵게. `aria-pressed` 사용.
- **Input / Select**: 높이 48px, 테두리 border-strong, 반드시 `<label>` 연결
- **Card**: 흰 배경, 1px border, radius 16px, padding 28~32px
- **PlanCard**: 선택형 카드. 선택 시 2px primary 테두리 + 그림자
- **StatTile**: 큰 숫자(30~32px/800) + 설명(14~15px muted)
- **LockedBox**: 점선 테두리 박스 + 자물쇠 아이콘. 설계서에서만 공개되는 항목 안내
- **Footer**: 상호·대표·사업자번호 / 이용약관·개인정보처리방침·광고 상품 안내

아이콘은 stroke 스타일(lucide 계열)이며 이모지는 쓰지 않습니다.

## 3. 페이지

### ① 홈 `/` — reference/Main.dc.html
1. Header
2. Hero (ground 배경): 좌측 eyebrow 배지 + H1 + 설명 + CTA 2개(무료 AI 설계 시작 → `/design`, 설계서 샘플 보기 → `/plans`) / 우측 AI 초안 미리보기 카드
3. 운영 현황 3칸: 월 750건+ 문의 / 등록 제조사 [N]곳 / 약사 검수
4. 진행 방식 3단계 카드
5. 다크 섹션 "왜 설계서부터인가" + 장점 카드 4개
6. 원료·규제 가이드 카드 3개 (`#guides`)
7. 제조사 CTA 배너 (`#makers`) → `/partners`
8. Footer

### ② AI 설계 도우미 `/design` — reference/Designer.dc.html
- 좌측 폼: 타깃 고객(select), 원하는 기능성(복수 선택 chip), 희망 제형(단일 선택 chip), 1차 생산 수량, 개당 목표 원가, [AI 초안 만들기]
- 우측 결과: 원료 후보 표(원료 / 구분(고시형·개별인정형) / 표시 가능 기능성), 예상 제형 태그, LockedBox(함량·근거, 섭취량·상한, MOQ·단가), CTA [설계서 받기 → `/plans`] + [초안 저장]
- 하단 면책 문구 필수
- 상태: `picked: string[]`, `form: string`

### ③ 설계서 상품·결제 `/plans` — reference/Plans.dc.html
- PlanCard 2개: 기본 설계서 / 프리미엄(추천 배지). 기본 선택값은 premium
- 좌측: 샘플 설계서 미리보기(문서 카드 + 원료/1일 함량/근거/비고 표 + 제형·MOQ·상한 검토 타일)
- 우측 주문 요약: 선택 상품명과 금액(선택에 따라 바뀜), 생산 계약 시 차감 안내, **개인정보 제3자 제공 동의 체크박스(선택 항목, 기본 해제)**, [결제하고 설계 시작], 면책 문구

### ⑦ 제조사 입점 안내 `/partners` — reference/Partner.dc.html
- Header에 "제조사용" 배지, nav: 입점 상품 / 입점 문의 / 의뢰자 사이트
- 다크 히어로 + StatTile 4개(750건+ 월 문의, [N]건 월 설계서 발급, 0원 성사 수수료, [N]곳 등록 제조사)
- 제형별 문의 비중 막대 (실제 문의 DB와 연동해야 함. 지금은 0% 자리표시)
- 입점 상품 카드 4개: 견적 요청 멤버십(핵심) / 인터뷰 기사 / 비교 콘텐츠 / 배너
- "유료 노출은 모두 '광고' 표기" 안내 문구 필수
- 입점 문의 폼: 회사명, 담당자, 연락처, 주력 제형, 보유 인증, 최소 생산 수량

## 4. 아직 디자인하지 않은 화면 (와이어프레임만 있음)
④ 마이페이지·견적 비교, ⑤ 제조사 찾기, ⑥ 제조사 상세, ⑧ 관리자.
위 토큰과 컴포넌트로 와이어프레임 보드 구조를 따라 구현합니다.

## 5. 자리표시 `[ ... ]`
[서비스명], [기본 가격], [프리미엄 가격], [N]% 차감률, [N]곳, [월 가격], [건당 가격] 등은 아직 정해지지 않은 값입니다. 하드코딩하지 말고 설정 파일이나 상수로 분리해 주세요.

## 6. 반드시 지킬 것
- 반응형: 모바일 폭에서 2단 레이아웃은 1단으로, nav는 줄바꿈되고, 표는 가로 스크롤 박스 안에 둡니다.
- 접근성: 실제 `<button>`, `<a>`, `<label>`을 쓰고, 텍스트 대비는 4.5:1 이상을 유지합니다.
- 광고 상품은 일반 목록과 시각적으로 분리하고 "광고"를 표기합니다.
- 제조사에 정보를 넘기기 전에 제3자 제공 동의를 별도로 받습니다.
