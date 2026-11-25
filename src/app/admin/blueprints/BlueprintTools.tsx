"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Plus, Search, Send, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/ui";
import { BLUEPRINT_LIBRARY, MAKERS, type Blueprint } from "@/data/mock";

export function BlueprintTools() {
  const [q, setQ] = useState("");
  const [baseId, setBaseId] = useState<string | null>(null);
  const [subs, setSubs] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const [sent, setSent] = useState<string | null>(null);

  // TODO(API): GET /api/admin/blueprints?main=
  const matches = useMemo(
    () => BLUEPRINT_LIBRARY.filter((b) => q.trim() === "" || b.mainIngredient.includes(q.trim()) || b.product.includes(q.trim())),
    [q],
  );
  const base = BLUEPRINT_LIBRARY.find((b) => b.id === baseId);
  const changed = base ? JSON.stringify(base.subIngredients) !== JSON.stringify(subs.filter(Boolean)) : false;
  const makers = useMemo(
    () => (base ? [...MAKERS].sort((a, b) => Number(b.forms.includes(base.form)) - Number(a.forms.includes(base.form))) : MAKERS),
    [base],
  );

  function load(b: Blueprint) {
    setBaseId(b.id);
    setSubs([...b.subIngredients]);
    setTargets([]);
    setSent(null);
  }

  function send() {
    if (!base || !base.thirdPartyConsent || targets.length === 0) return;
    // TODO(API): changed 이면 새 버전(v+1) 저장 후 POST /api/admin/dispatch { blueprintId, makerIds }
    const names = targets.map((id) => MAKERS.find((m) => m.id === id)!.name).join(", ");
    setSent(`${changed ? `v${base.version + 1}로 저장하고 ` : ""}${names}에 발송했습니다.`);
  }

  return (
    <div className="flex flex-wrap items-start gap-6">
      {/* 1. 불러오기 */}
      <section aria-labelledby="lib-title" className="flex min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
        <h2 id="lib-title" className="m-0 text-base font-extrabold text-navy">
          1. 유사 설계 불러오기
        </h2>
        <div className="relative">
          <label htmlFor="lib-q" className="sr-only">
            주원료 또는 제품명으로 검색
          </label>
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="lib-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="주원료 · 제품명 (예: 밀크씨슬)"
            className="min-h-11 w-full rounded-control border border-line-strong pr-3 pl-9 text-sm"
          />
        </div>
        <ul className="m-0 flex list-none flex-col gap-2 p-0" aria-live="polite">
          {matches.length === 0 && <li className="py-6 text-center text-sm text-muted">일치하는 설계서가 없습니다.</li>}
          {matches.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => load(b)}
                aria-pressed={b.id === baseId}
                className={`flex w-full cursor-pointer flex-col gap-1 rounded-xl border p-3.5 text-left ${b.id === baseId ? "border-primary bg-primary-tint/50" : "border-line bg-white hover:border-line-strong"}`}
              >
                <span className="flex items-center gap-2 text-sm font-bold">
                  {b.product} <Badge tone="neutral">v{b.version}</Badge>
                </span>
                <span className="text-[13px] text-muted">
                  {b.client} · {b.form} · 주원료 {b.mainIngredient}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. 부원료 교체 */}
      <section aria-labelledby="edit-title" className="flex min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
        <h2 id="edit-title" className="m-0 text-base font-extrabold text-navy">
          2. 부원료 교체
        </h2>
        {!base ? (
          <p className="m-0 rounded-xl bg-ground px-4 py-8 text-center text-sm text-muted">왼쪽에서 설계서를 불러오세요.</p>
        ) : (
          <>
            <dl className="m-0 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-ground p-3">
                <dt className="text-[12px] text-muted">주원료 (고정)</dt>
                <dd className="m-0 font-bold">{base.mainIngredient}</dd>
              </div>
              <div className="rounded-lg bg-ground p-3">
                <dt className="text-[12px] text-muted">제형</dt>
                <dd className="m-0 font-bold">{base.form}</dd>
              </div>
            </dl>
            <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
              <legend className="pb-2 text-sm font-bold">부원료</legend>
              {subs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <label htmlFor={`sub-${i}`} className="sr-only">
                    부원료 {i + 1}
                  </label>
                  <input
                    id={`sub-${i}`}
                    value={s}
                    onChange={(e) => setSubs((l) => l.map((x, j) => (j === i ? e.target.value : x)))}
                    className="min-h-11 min-w-0 flex-1 rounded-control border border-line-strong px-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setSubs((l) => l.filter((_, j) => j !== i))}
                    aria-label={`부원료 ${i + 1} 삭제`}
                    className="inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-control border border-line-strong bg-white text-muted hover:text-ink"
                  >
                    <X size={16} aria-hidden />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSubs((l) => [...l, ""])}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 self-start border-0 bg-transparent text-sm font-bold text-primary"
              >
                <Plus size={16} aria-hidden /> 부원료 추가
              </button>
            </fieldset>
            <p className="m-0 text-[13px] leading-relaxed text-muted">
              {changed
                ? `부원료가 바뀌었습니다. 발송하면 v${base.version + 1} 새 버전으로 저장됩니다. 약사 검수 후 발송하세요.`
                : "부원료를 바꾸지 않으면 같은 버전을 수신 제조사만 바꿔 재발송합니다."}
            </p>
          </>
        )}
      </section>

      {/* 3. 다중 발송 */}
      <section aria-labelledby="send-title" className="flex min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
        <h2 id="send-title" className="m-0 text-base font-extrabold text-navy">
          3. 제조사 다중 발송
        </h2>
        {!base ? (
          <p className="m-0 rounded-xl bg-ground px-4 py-8 text-center text-sm text-muted">설계서를 불러오면 발송할 수 있습니다.</p>
        ) : !base.thirdPartyConsent ? (
          <div role="alert" className="flex gap-2.5 rounded-xl border border-[#FCD34D] bg-[#FFFBEB] p-4 text-sm leading-relaxed text-[#78350F]">
            <AlertTriangle size={18} className="mt-0.5 flex-none" aria-hidden />
            <p className="m-0">
              <strong>{base.client}</strong>님이 제3자 제공에 동의하지 않았습니다. 동의를 받기 전에는 제조사에 보낼 수 없습니다.
            </p>
          </div>
        ) : (
          <>
            <fieldset className="m-0 flex flex-col gap-1 border-0 p-0">
              <legend className="pb-2 text-sm font-bold">받을 제조사</legend>
              {makers.map((m) => {
                const fit = m.forms.includes(base.form);
                return (
                  <label key={m.id} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg px-2 text-sm hover:bg-ground">
                    <input
                      type="checkbox"
                      checked={targets.includes(m.id)}
                      onChange={() => setTargets((t) => (t.includes(m.id) ? t.filter((x) => x !== m.id) : [...t, m.id]))}
                      className="size-5 flex-none accent-primary"
                    />
                    <span className="font-bold">{m.name}</span>
                    <span className="text-[13px] text-muted">{m.forms.join(" · ")}</span>
                    {fit && <Badge tone="tint" className="ml-auto">{base.form} 가능</Badge>}
                  </label>
                );
              })}
            </fieldset>
            {sent ? (
              <p role="status" className="m-0 flex gap-2 rounded-xl bg-[#DCFCE7] p-3.5 text-sm text-[#166534]">
                <CheckCircle2 size={18} className="mt-0.5 flex-none" aria-hidden />
                {sent}
              </p>
            ) : (
              <Button onClick={send} aria-disabled={targets.length === 0}>
                <Send size={16} aria-hidden />
                {targets.length > 0 ? `${targets.length}곳에 발송` : "제조사를 선택하세요"}
              </Button>
            )}
          </>
        )}
      </section>
    </div>
  );
}
