import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { StatTile } from "@/components/StatTile";
import { SectionHeading } from "@/components/SectionHeading";
import { STATS } from "@/config/site";

const STEPS = [
  {
    title: "AI 설계 초안",
    tag: "무료",
    body: "타깃과 원하는 기능성을 입력하면 공전·개별인정형 원료 후보와 표시 가능한 기능성을 보여드립니다.",
  },
  {
    title: "약사 발주 설계서",
    body: "원료별 함량, 공전 근거, 섭취량과 상한 검토, 제형과 MOQ 제안을 제조사용 양식으로 정리합니다.",
  },
  {
    title: "비교 견적 · 생산",
    body: "설계 조건에 맞는 제조사들의 견적을 한 화면에서 비교하고, 선택한 곳과 생산을 진행합니다.",
  },
];

const WHY = [
  { title: "견적 왕복이 줄어듭니다", body: "함량과 제형이 정해진 상태로 요청하니 제조사가 바로 단가를 냅니다." },
  { title: "조건이 같아 비교가 됩니다", body: "여러 제조사가 같은 사양서를 받아 단가·MOQ·납기를 나란히 봅니다." },
  { title: "표시·광고 리스크를 먼저 봅니다", body: "쓸 수 있는 기능성 문구를 설계 단계에서 확인합니다." },
  { title: "설계비는 생산 때 차감", body: "생산 계약으로 이어지면 설계비 일부를 돌려드립니다." },
];

// TODO(CMS): 가이드 글 목록을 CMS/DB에서 불러오기
const GUIDES = [
  { category: "원료", title: "고시형과 개별인정형, 무엇이 다른가" },
  { category: "제형", title: "정제·캡슐·젤리, 제형별 MOQ 감 잡기" },
  { category: "표시·광고", title: "기능성 문구, 어디까지 쓸 수 있나" },
];

const PREVIEW_ROWS = [
  { name: "밀크씨슬 추출물", type: "고시형" },
  { name: "[부원료 후보]", type: "[구분]" },
  { name: "[부원료 후보]", type: "[구분]" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ground">
        <div className="container-page flex flex-wrap items-center gap-10 py-14 sm:py-[88px] sm:pb-24 lg:gap-14">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <p className="m-0 self-start rounded-full bg-primary-tint px-3 py-1.5 text-sm font-bold text-primary-deep">
              약사가 설계하는 건강기능식품 OEM
            </p>
            <h1 className="m-0 text-[32px] leading-[1.25] font-extrabold tracking-[-0.02em] text-navy sm:text-[40px] lg:text-[48px]">
              제조사가 바로 견적 낼 수 있는
              <br className="hidden sm:inline" /> 발주 설계서를 만들어 드립니다
            </h1>
            <p className="m-0 text-base leading-[1.7] text-muted sm:text-lg">
              원료 조합부터 함량, 공전 근거, 제형과 MOQ까지 정리합니다. 설계가 끝나면 조건에 맞는
              제조사들의 비교 견적으로 바로 이어집니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/design">
                무료 AI 설계 시작
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/plans" variant="ghost">
                설계서 샘플 보기
              </ButtonLink>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4 rounded-card border border-line bg-white p-5 shadow-hero sm:p-7">
            <div className="flex items-center justify-between">
              <p className="m-0 text-[15px] font-bold text-navy">AI 설계 초안</p>
              <span className="rounded-full bg-subtle px-2.5 py-1 text-[13px] text-muted">예시</span>
            </div>
            <p className="m-0 text-sm text-muted">간 건강 · 30~40대 직장인 · 정제</p>
            <ul className="m-0 flex list-none flex-col border-t border-line p-0">
              {PREVIEW_ROWS.map((r, i) => (
                <li key={i} className="flex justify-between gap-3 border-b border-line py-3.5">
                  <span className="text-[15px] font-medium">{r.name}</span>
                  <span className="text-[13px] font-bold text-primary-deep">{r.type}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2.5 rounded-control bg-ground p-3.5 text-sm text-muted">
              <Lock size={18} aria-hidden />
              함량 · 근거 · 제조 조건은 설계서에서 공개
            </div>
          </div>
        </div>
      </section>

      {/* 운영 현황 */}
      <section aria-label="운영 현황" className="border-b border-line">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 py-9">
          <StatTile value={`월 ${STATS.monthlyInquiries}`} label="건강기능식품 제조 문의" />
          <StatTile value={STATS.partnerCount} label="등록 제조사 (GMP·HACCP)" />
          <StatTile value="약사 검수" label="모든 설계서 직접 확인" />
        </div>
      </section>

      {/* 진행 방식 */}
      <section>
        <div className="container-page flex flex-col gap-10 py-16 sm:gap-12 sm:py-24">
          <SectionHeading eyebrow="진행 방식" title="아이디어에서 생산까지 3단계" className="max-w-[640px]" />
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 p-0">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3.5 rounded-card border border-line p-6 sm:p-8">
                <span
                  aria-hidden
                  className="inline-flex size-10 items-center justify-center rounded-control bg-primary-tint font-extrabold text-primary"
                >
                  {i + 1}
                </span>
                <h3 className="m-0 text-xl font-bold">
                  <span className="sr-only">{i + 1}단계: </span>
                  {s.title}
                  {s.tag && <span className="ml-1.5 text-sm font-medium text-muted">{s.tag}</span>}
                </h3>
                <p className="m-0 text-[15px] leading-[1.7] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 왜 설계서부터인가 */}
      <section className="bg-navy">
        <div className="container-page flex flex-wrap items-start gap-12 py-16 sm:py-[88px]">
          <SectionHeading
            tone="dark"
            eyebrow="왜 설계서부터인가"
            title={
              <>
                같은 사양으로 물어야
                <br className="hidden sm:inline" /> 견적을 비교할 수 있습니다
              </>
            }
            description="건강기능식품 제조사 부사장 출신 약사가 설계서를 직접 검수합니다."
            className="min-w-0 flex-[1_1_380px]"
          />
          <div className="grid min-w-0 flex-[1_1_520px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
            {WHY.map((w) => (
              <div key={w.title} className="flex flex-col gap-2 rounded-[14px] border border-white/15 bg-white/5 p-6">
                <h3 className="m-0 text-[17px] font-bold text-white">{w.title}</h3>
                <p className="m-0 text-[15px] leading-[1.65] text-on-dark-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 원료·규제 가이드 */}
      <section id="guides" className="scroll-mt-4">
        <div className="container-page flex flex-col gap-10 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="원료·규제 가이드" title="제품 기획 전에 알아둘 것" />
            <Link href="/guides" className="link text-[15px]">
              가이드 전체 보기
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
            {GUIDES.map((g) => (
              <Link
                key={g.title}
                href="/guides"
                className="flex flex-col overflow-hidden rounded-card border border-line text-ink no-underline transition-shadow hover:shadow-doc"
              >
                <div className="flex h-40 items-center justify-center bg-primary-tint text-sm font-bold text-primary-deep">
                  [대표 이미지]
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <p className="m-0 text-[13px] text-muted">{g.category}</p>
                  <h3 className="m-0 text-lg leading-normal font-bold">{g.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 제조사 CTA */}
      <section id="makers" className="bg-ground">
        <div className="container-page flex flex-wrap items-center justify-between gap-6 py-14 sm:py-[72px]">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-2.5">
            <h2 className="m-0 text-2xl leading-[1.35] font-extrabold text-navy sm:text-[28px]">
              건강기능식품 제조사이신가요?
            </h2>
            <p className="m-0 text-base leading-[1.7] text-muted">
              사양이 정리된 설계서 기반 견적 요청을 받아보세요.
            </p>
          </div>
          <ButtonLink href="/partners">제조사 입점 안내</ButtonLink>
        </div>
      </section>
    </main>
  );
}
