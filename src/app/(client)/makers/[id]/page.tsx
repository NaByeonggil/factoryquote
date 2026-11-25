import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Factory, MinusCircle, Newspaper } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { AdLabel, Badge } from "@/components/ui";
import { MAKERS, getMaker } from "@/data/mock";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return MAKERS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: getMaker(id)?.name ?? "제조사" };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-8">
      <h2 className="m-0 text-lg font-extrabold text-navy">{title}</h2>
      {children}
    </section>
  );
}

export default async function MakerDetailPage({ params }: Props) {
  const { id } = await params;
  const m = getMaker(id);
  if (!m) notFound();

  return (
    <div className="bg-ground">
      <main className="container-page flex flex-col gap-6 pt-8 pb-16 sm:pt-10 sm:pb-24">
        <Link href="/makers" className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-bold text-primary no-underline">
          <ArrowLeft size={16} aria-hidden /> 제조사 목록
        </Link>

        {/* 헤더 */}
        <header className="flex flex-wrap items-center justify-between gap-6 rounded-card border border-line bg-white p-5 sm:p-8">
          <div className="flex min-w-0 items-center gap-4">
            <span className="inline-flex size-14 flex-none items-center justify-center rounded-xl bg-primary-tint text-primary">
              <Factory size={28} aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="m-0 text-[26px] font-extrabold text-navy sm:text-[32px]">{m.name}</h1>
              <p className="m-0 text-[15px] text-muted">{m.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {m.certs.map((c) => (
                  <Badge key={c} tone="tint">{c}</Badge>
                ))}
                {m.forms.map((f) => (
                  <Badge key={f} tone="neutral">{f}</Badge>
                ))}
              </div>
            </div>
          </div>
          <ButtonLink href={`/mypage?requestTo=${m.id}`} className="flex-[0_1_auto] max-sm:w-full">
            설계서로 견적 요청 <ArrowRight size={18} aria-hidden />
          </ButtonLink>
        </header>

        <div className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 flex-[2_1_520px] flex-col gap-6">
            <Section title="생산 조건">
              <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                {[
                  ["최소 생산 수량", m.moqLabel],
                  ["평균 납기", m.leadTime],
                  ["주력 제형", m.forms.join(" · ")],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-ground p-4">
                    <dt className="text-[13px] text-muted">{k}</dt>
                    <dd className="m-0 mt-1 text-base font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 text-sm font-bold">보유 설비</h3>
                <ul className="m-0 flex flex-col gap-1 pl-5 text-[15px] text-body">
                  {m.equipment.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section title="취급 원료">
              <p className="m-0 flex items-center gap-2 text-[15px]">
                {m.individualApproved ? (
                  <>
                    <CheckCircle2 size={18} className="text-[#15803D]" aria-hidden /> 개별인정형 원료 취급 가능
                  </>
                ) : (
                  <>
                    <MinusCircle size={18} className="text-muted" aria-hidden /> 고시형 원료 위주 (개별인정형 미취급)
                  </>
                )}
              </p>
              <ul className="m-0 flex flex-wrap gap-2 p-0">
                {m.ingredients.map((x, i) => (
                  <li key={i} className="list-none">
                    <Badge tone="neutral">{x}</Badge>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="생산 사례">
              {m.cases.length === 0 ? (
                <p className="m-0 text-sm text-muted">등록된 생산 사례가 없습니다.</p>
              ) : (
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {m.cases.map((c, i) => (
                    <li key={i} className="rounded-xl border border-line p-4">
                      <p className="m-0 font-bold">{c.title}</p>
                      <p className="m-0 mt-1 text-sm text-muted">{c.detail}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          </div>

          <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-6 lg:sticky lg:top-6">
            {m.sponsoredInterview && (
              <section aria-label="광고" className="rounded-card border border-dashed border-[#D97706] bg-[#FFFBEB] p-5">
                <Link href={m.sponsoredInterview.href} rel="sponsored" className="flex flex-col gap-2 text-ink no-underline hover:underline">
                  <span className="flex items-center gap-2 text-[13px] text-muted">
                    <AdLabel />
                    <Newspaper size={16} aria-hidden /> 제조사 인터뷰
                  </span>
                  <span className="flex items-start justify-between gap-2 font-bold">
                    {m.sponsoredInterview.title}
                    <ChevronRight size={18} className="mt-0.5 flex-none text-muted" aria-hidden />
                  </span>
                </Link>
              </section>
            )}
            <section className="flex flex-col gap-3 rounded-card border border-line bg-white p-5">
              <h2 className="m-0 text-base font-extrabold text-navy">설계서가 아직 없나요?</h2>
              <p className="m-0 text-sm leading-relaxed text-muted">
                같은 사양으로 요청해야 견적을 비교할 수 있습니다. 무료 AI 초안부터 시작하세요.
              </p>
              <ButtonLink href="/design" variant="ghost">
                무료 AI 설계 시작
              </ButtonLink>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
