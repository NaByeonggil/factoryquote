"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, Check, CheckCircle2, Copy, FileText, Inbox, MessageSquare, ShieldCheck } from "lucide-react";
import { Button, ButtonLink } from "@/components/Button";
import { Badge, EmptyState, TableScroll, td, th } from "@/components/ui";
import { PLANS } from "@/config/site";
import {
  MY_BLUEPRINTS,
  QUOTES_BY_BLUEPRINT,
  STAGES,
  THREADS,
  getMaker,
  qty,
  won,
  type Blueprint,
  type Message,
  type Quote,
} from "@/data/mock";

type SortKey = "unitPrice" | "moq" | "leadTimeWeeks";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "unitPrice", label: "단가" },
  { key: "moq", label: "MOQ" },
  { key: "leadTimeWeeks", label: "납기" },
];

export function MyPage() {
  const [blueprints, setBlueprints] = useState(MY_BLUEPRINTS);
  const [activeId, setActiveId] = useState(MY_BLUEPRINTS[0].id);
  const active = blueprints.find((b) => b.id === activeId)!;
  const requestTo = getMaker(useSearchParams().get("requestTo") ?? "");
  const [requested, setRequested] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {requestTo && (
        <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-primary bg-primary-tint p-4 sm:p-5">
          <p className="m-0 text-[15px] text-primary-deep">
            {requested ? (
              <>
                <strong>{requestTo.name}</strong>에 <strong>{active.product} v{active.version}</strong>로 견적을 요청했습니다.
              </>
            ) : (
              <>
                <strong>{requestTo.name}</strong>에 보낼 설계서를 고르세요. 지금 선택: <strong>v{active.version}</strong>
              </>
            )}
          </p>
          {!requested && (
            <Button
              size="sm"
              onClick={() => {
                // TODO(API): 동의 여부 확인 후 POST /api/quote-requests { blueprintId, makerId }
                if (!active.thirdPartyConsent) return;
                setRequested(true);
              }}
              aria-disabled={!active.thirdPartyConsent}
            >
              이 설계서로 견적 요청
            </Button>
          )}
        </div>
      )}
      <Progress blueprint={active} />
      <div className="flex flex-wrap items-start gap-6">
        <BlueprintList
          blueprints={blueprints}
          activeId={activeId}
          onSelect={setActiveId}
          className="min-w-0 flex-[1_1_320px]"
        />
        <div className="flex min-w-0 flex-[3_1_600px] flex-col gap-6">
          <QuoteCompare
            key={active.id}
            blueprint={active}
            onConsent={() =>
              // TODO(API): 동의 시각과 함께 저장
              setBlueprints((list) => list.map((b) => (b.id === active.id ? { ...b, thirdPartyConsent: true } : b)))
            }
          />
        </div>
      </div>
    </div>
  );
}

/* 진행 단계: 초안 → 설계서 → 견적 → 생산 */
function Progress({ blueprint }: { blueprint: Blueprint }) {
  const current = STAGES.findIndex((s) => s.id === blueprint.stage);
  return (
    <section aria-label="진행 단계" className="rounded-card border border-line bg-white p-5 sm:p-6">
      <p className="m-0 mb-4 text-sm text-muted">
        <strong className="text-ink">{blueprint.product}</strong> · v{blueprint.version}
      </p>
      <ol className="m-0 grid list-none grid-cols-4 gap-2 p-0">
        {STAGES.map((s, i) => {
          const done = i < current;
          const now = i === current;
          return (
            <li key={s.id} aria-current={now ? "step" : undefined} className="flex flex-col gap-2">
              <span className={`h-1.5 rounded-full ${done || now ? "bg-primary" : "bg-line"}`} />
              <span
                className={`flex items-center gap-1 text-[13px] sm:text-sm ${now ? "font-bold text-primary-deep" : done ? "text-body" : "text-muted"}`}
              >
                {done && <Check size={14} aria-hidden />}
                {s.label}
                <span className="sr-only">{done ? " (완료)" : now ? " (진행 중)" : " (예정)"}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* 내 설계서 v1 · v2 (재사용) */
function BlueprintList({
  blueprints,
  activeId,
  onSelect,
  className,
}: {
  blueprints: Blueprint[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <section aria-labelledby="bp-title" className={`flex flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 id="bp-title" className="m-0 text-lg font-extrabold text-navy">
          내 설계서
        </h2>
        <Link href="/design" className="link text-sm">
          새로 만들기
        </Link>
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {blueprints.map((b) => {
          const on = b.id === activeId;
          return (
            <li key={b.id}>
              <div
                className={`flex flex-col gap-3 rounded-xl border p-4 ${on ? "border-primary bg-primary-tint/40" : "border-line"}`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(b.id)}
                  aria-pressed={on}
                  className="flex cursor-pointer flex-col items-start gap-1.5 border-0 bg-transparent p-0 text-left"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <Badge tone={on ? "primary" : "neutral"}>v{b.version}</Badge>
                    <Badge tone="tint">{PLANS[b.plan].name}</Badge>
                  </span>
                  <span className="text-[15px] font-bold text-ink">{b.product}</span>
                  <span className="text-[13px] text-muted">
                    {b.form} · {b.mainIngredient} · {b.updatedAt}
                  </span>
                </button>
                <div className="flex flex-wrap gap-2">
                  {/* TODO: 설계서 PDF 경로 연결 */}
                  <a href="#blueprint-pdf" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary no-underline hover:text-primary-deep">
                    <FileText size={16} aria-hidden /> 설계서 보기
                  </a>
                  {/* TODO(API): 이 버전을 복제해 새 버전 생성 후 편집 화면으로 이동 */}
                  <Link href={`/design?from=${b.id}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary no-underline hover:text-primary-deep">
                    <Copy size={16} aria-hidden /> 이 설계로 새 버전
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* 견적 비교 + 제조사별 문의 스레드 + 생산 진행 */
function QuoteCompare({ blueprint, onConsent }: { blueprint: Blueprint; onConsent: () => void }) {
  const quotes = QUOTES_BY_BLUEPRINT[blueprint.id] ?? [];
  const [sort, setSort] = useState<SortKey>("unitPrice");
  const [picked, setPicked] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const sorted = useMemo(() => [...quotes].sort((a, b) => a[sort] - b[sort]), [quotes, sort]);
  const best = useMemo(() => {
    const min = (k: SortKey) => Math.min(...quotes.map((q) => q[k]));
    return { unitPrice: min("unitPrice"), moq: min("moq"), leadTimeWeeks: min("leadTimeWeeks") };
  }, [quotes]);

  if (!blueprint.thirdPartyConsent) {
    return (
      <section className="flex flex-col items-start gap-4 rounded-card border border-line bg-white p-5 sm:p-8">
        <h2 className="m-0 text-lg font-extrabold text-navy">견적 비교</h2>
        <div className="flex gap-3 rounded-xl bg-primary-tint p-4 text-sm leading-relaxed text-primary-deep">
          <ShieldCheck size={20} className="flex-none" aria-hidden />
          <p className="m-0">
            제조사에 견적을 요청하려면 설계서와 연락처를 제조사에 제공하는 데 동의가 필요합니다.
          </p>
        </div>
        <Button onClick={onConsent}>동의하고 견적 요청하기</Button>
      </section>
    );
  }

  if (quotes.length === 0) {
    return (
      <section className="flex flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-8">
        <h2 className="m-0 text-lg font-extrabold text-navy">견적 비교</h2>
        <EmptyState icon={<Inbox size={32} aria-hidden />} title="아직 받은 견적이 없습니다">
          {blueprint.plan === "premium"
            ? "조건에 맞는 제조사 3곳에 설계서를 보내고 있습니다. 견적이 도착하면 이곳에서 비교할 수 있습니다."
            : "제조사 찾기에서 원하는 곳을 골라 이 설계서로 견적을 요청하세요."}
        </EmptyState>
        {blueprint.plan !== "premium" && (
          <ButtonLink href="/makers" variant="ghost" className="self-start">
            제조사 찾기
          </ButtonLink>
        )}
      </section>
    );
  }

  const pickedMaker = picked ? getMaker(picked) : undefined;

  return (
    <>
      <section aria-labelledby="quote-title" className="flex flex-col gap-5 rounded-card border border-line bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 id="quote-title" className="m-0 text-lg font-extrabold text-navy">
              견적 비교 <span className="text-sm font-medium text-muted">{quotes.length}곳</span>
            </h2>
            <p className="m-0 text-[13px] text-muted">모든 제조사가 같은 설계서(v{blueprint.version})로 낸 견적입니다.</p>
          </div>
          <div role="group" aria-label="정렬" className="flex items-center gap-1.5">
            <ArrowUpDown size={16} className="text-muted" aria-hidden />
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                aria-pressed={sort === s.key}
                onClick={() => setSort(s.key)}
                className={`min-h-11 cursor-pointer rounded-full border px-3.5 text-[13px] ${sort === s.key ? "border-primary bg-primary-tint font-bold text-primary-deep" : "border-line-strong bg-white text-body"}`}
              >
                {s.label} 낮은 순
              </button>
            ))}
          </div>
        </div>

        <fieldset className="m-0 border-0 p-0" disabled={confirmed}>
          <legend className="sr-only">생산을 진행할 제조사 선택</legend>
          <TableScroll label="제조사 견적 비교 표">
            <table className="w-full min-w-[560px] border-collapse text-[15px]">
              <thead>
                <tr className="bg-ground">
                  <th scope="col" className={`${th} w-14`}>
                    <span className="sr-only">선택</span>
                  </th>
                  <th scope="col" className={th}>제조사</th>
                  <th scope="col" className={th}>단가</th>
                  <th scope="col" className={th}>MOQ</th>
                  <th scope="col" className={th}>납기</th>
                  <th scope="col" className={th}>비고</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((q) => (
                  <QuoteRow key={q.makerId} q={q} best={best} picked={picked === q.makerId} onPick={() => setPicked(q.makerId)} />
                ))}
              </tbody>
            </table>
          </TableScroll>
        </fieldset>

        {confirmed && pickedMaker ? (
          <div role="status" className="flex gap-3 rounded-xl bg-[#DCFCE7] p-4 text-sm text-[#166534]">
            <CheckCircle2 size={20} className="flex-none" aria-hidden />
            <p className="m-0">
              <strong>{pickedMaker.name}</strong>에 생산 진행 의사를 전달했습니다. 계약 조건은 문의 스레드로 안내됩니다.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => {
                if (!picked) return;
                // TODO(API): 선택 제조사에 생산 진행 요청 → 주문 상태 production 으로 변경
                setConfirmed(true);
              }}
              aria-disabled={!picked}
              className="flex-[1_1_240px]"
            >
              {pickedMaker ? `${pickedMaker.name}와 생산 진행` : "제조사를 선택하세요"}
            </Button>
            <p className="m-0 flex-[1_1_240px] text-[13px] leading-relaxed text-muted">
              생산 계약이 맺어지면 설계비 일부가 생산 대금에서 차감됩니다.
            </p>
          </div>
        )}
      </section>

      <Threads makerIds={quotes.map((q) => q.makerId)} />
    </>
  );
}

function QuoteRow({
  q,
  best,
  picked,
  onPick,
}: {
  q: Quote;
  best: Record<SortKey, number>;
  picked: boolean;
  onPick: () => void;
}) {
  const maker = getMaker(q.makerId)!;
  const id = `pick-${q.makerId}`;
  const cell = (k: SortKey, text: string) => (
    <td className={td}>
      <span className={q[k] === best[k] ? "font-bold text-primary-deep" : ""}>{text}</span>
      {q[k] === best[k] && (
        <Badge tone="tint" className="ml-1.5 !px-1.5 !py-0.5 !text-[11px]">
          최저
        </Badge>
      )}
    </td>
  );
  return (
    <tr className={`border-t border-line ${picked ? "bg-primary-tint/50" : ""}`}>
      <td className={td}>
        <input
          type="radio"
          id={id}
          name="maker-pick"
          checked={picked}
          onChange={onPick}
          className="size-5 cursor-pointer accent-primary"
          aria-label={`${maker.name} 선택`}
        />
      </td>
      <td className={td}>
        <label htmlFor={id} className="cursor-pointer font-bold">
          {maker.name}
        </label>
        <Link href={`/makers/${maker.id}`} className="ml-2 text-[13px] text-primary">
          상세
        </Link>
      </td>
      {cell("unitPrice", won(q.unitPrice))}
      {cell("moq", qty(q.moq))}
      {cell("leadTimeWeeks", `${q.leadTimeWeeks}주`)}
      <td className={`${td} text-body`}>{q.note}</td>
    </tr>
  );
}

/* 제조사별 문의 스레드 */
function Threads({ makerIds }: { makerIds: string[] }) {
  const [threads, setThreads] = useState<Record<string, Message[]>>(THREADS);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function send(makerId: string) {
    const text = (drafts[makerId] ?? "").trim();
    if (!text) return;
    // TODO(API): POST /api/threads/{makerId}/messages
    setThreads((t) => ({ ...t, [makerId]: [...(t[makerId] ?? []), { from: "me", text, at: "방금" }] }));
    setDrafts((d) => ({ ...d, [makerId]: "" }));
  }

  return (
    <section aria-labelledby="thread-title" className="flex flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-8">
      <h2 id="thread-title" className="m-0 text-lg font-extrabold text-navy">
        제조사별 문의
      </h2>
      <div className="flex flex-col gap-3">
        {makerIds.map((id) => {
          const maker = getMaker(id)!;
          const msgs = threads[id] ?? [];
          const inputId = `reply-${id}`;
          return (
            <details key={id} className="group rounded-xl border border-line">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 font-bold">
                  <MessageSquare size={18} className="text-primary" aria-hidden />
                  {maker.name}
                </span>
                <span className="text-[13px] text-muted">메시지 {msgs.length}개</span>
              </summary>
              <div className="flex flex-col gap-3 border-t border-line p-4">
                {msgs.length === 0 ? (
                  <p className="m-0 text-sm text-muted">아직 주고받은 메시지가 없습니다.</p>
                ) : (
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {msgs.map((m, i) => (
                      <li
                        key={i}
                        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "me" ? "self-end bg-primary text-white" : "self-start bg-subtle text-ink"}`}
                      >
                        <span className="sr-only">{m.from === "me" ? "나: " : `${maker.name}: `}</span>
                        {m.text}
                        <span className={`mt-1 block text-[11px] ${m.from === "me" ? "text-white/80" : "text-muted"}`}>{m.at}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <form
                  className="flex flex-wrap gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(id);
                  }}
                >
                  <label htmlFor={inputId} className="sr-only">
                    {maker.name}에 보낼 메시지
                  </label>
                  <input
                    id={inputId}
                    value={drafts[id] ?? ""}
                    onChange={(e) => setDrafts((d) => ({ ...d, [id]: e.target.value }))}
                    placeholder="메시지를 입력하세요"
                    className="min-h-12 min-w-0 flex-[1_1_220px] rounded-control border border-line-strong px-3.5 text-[15px]"
                  />
                  <Button type="submit" variant="ghost">
                    보내기
                  </Button>
                </form>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
