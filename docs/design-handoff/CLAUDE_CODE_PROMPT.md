# Claude Code에 붙여넣을 첫 지시문

아래 내용을 프로젝트 루트에서 Claude Code에 그대로 붙여넣으세요. (`design-handoff` 폴더를 프로젝트 안 `docs/`에 넣었다고 가정합니다.)

---

docs/design-handoff/DESIGN_HANDOFF.md를 먼저 읽고, reference/ 폴더의 .dc.html 4개를 디자인 원본으로 참고해서 구현해줘.

1. 먼저 현재 프로젝트 구조와 스택을 확인하고, 디자인 토큰(색·폰트·라운드·간격)을 설정 파일(예: Tailwind theme 또는 CSS 변수)로 정의해줘.
2. 공통 컴포넌트(Header, Footer, Button, Chip, Input, Card, PlanCard, StatTile, LockedBox)를 만들어줘.
3. 페이지 4개를 순서대로 구현해줘: `/`(홈), `/design`(AI 설계 도우미), `/plans`(설계서 상품·결제), `/partners`(제조사 입점).
4. [서비스명], [가격] 같은 자리표시 값은 상수 파일 하나에 모아줘.
5. 페이지 하나를 끝낼 때마다 데스크톱(1440px)과 모바일(390px) 폭에서 reference 디자인과 비교해 확인하고 다음으로 넘어가줘.

API 연동(AI 초안 생성, 결제, 문의 저장)은 이번 단계에서 하지 말고, UI와 상태만 만든 다음 연동 지점에 TODO 주석을 남겨줘.
