"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, RotateCcw, SearchX } from "lucide-react";
import { Chip, ChipGroup } from "@/components/Chip";
import { inputClass } from "@/components/Field";
import { AdLabel, Badge, EmptyState } from "@/components/ui";
import { FORMULATIONS } from "@/config/site";
import { MAKERS, MAKER_ADS, type Cert } from "@/data/mock";

const CERTS: Cert[] = ["건기식 GMP", "HACCP"];
const MOQ_OPTIONS = [
  { value: 0, label: "상관없음" },
  { value: 3000, label: "3,000 이하" },
  { value: 5000, label: "5,000 이하" },
  { value: 10000, label: "10,000 이하" },
];

export function MakerFinder() {
  // TODO(API): 필터를 URL 쿼리와 동기화하고 서버에서 검색
  const [forms, setForms] = useState<string[]>([]);
  const [certs, setCerts] = useState<Cert[]>([]);
  const [maxMoq, setMaxMoq] = useState(0);
  const [individual, setIndividual] = useState(false);

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const filtered = useMemo(
    () =>
      MAKERS.filter(
        (m) =>
          (forms.length === 0 || forms.some((f) => m.forms.includes(f as never))) &&
          certs.every((c) => m.certs.includes(c)) &&
          (maxMoq === 0 || m.moq <= maxMoq) &&
          (!individual || m.individualApproved),
      ),
    [forms, certs, maxMoq, individual],
  );
  const active = forms.length + certs.length + (maxMoq ? 1 : 0) + (individual ? 1 : 0);

  function reset() {
    setForms([]);
    setCerts([]);
    setMaxMoq(0);
    setIndividual(false);
  }

  return (
    <div className="flex flex-wrap items-start gap-6">
      {/* 필터 */}
      <form
        aria-label="제조사 필터"
        onSubmit={(e) => e.preventDefault()}
        className="flex min-w-0 flex-[1_1_280px] flex-col gap-6 rounded-card border border-line bg-white p-5 sm:p-6 lg:sticky lg:top-6 lg:max-w-[320px]"
      >
        <div className="flex items-center justify-between">
          <h2 className="m-0 text-base font-extrabold text-navy">필터</h2>
          {active > 0 && (
            <button type="button" onClick={reset} className="inline-flex min-h-11 cursor-pointer items-center gap-1 border-0 bg-transparent text-sm font-bold text-primary">
              <RotateCcw size={14} aria-hidden /> 초기화
            </button>
          )}
        </div>
        <ChipGroup legend="제형" hint="(하나라도 가능)">
          {FORMULATIONS.map((f) => (
            <Chip key={f} selected={forms.includes(f)} onClick={() => setForms(toggle(forms, f))}>
              {f}
            </Chip>
          ))}
        </ChipGroup>
        <ChipGroup legend="인증" hint="(모두 보유)">
          {CERTS.map((c) => (
            <Chip key={c} selected={certs.includes(c)} onClick={() => setCerts(toggle(certs, c))}>
              {c}
            </Chip>
          ))}
        </ChipGroup>
        <div className="flex flex-col gap-2">
          <label htmlFor="moq" className="text-sm font-bold text-ink">
            최소 생산 수량(MOQ)
          </label>
          <select id="moq" className={inputClass} value={maxMoq} onChange={(e) => setMaxMoq(Number(e.target.value))}>
            {MOQ_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-body">
          <input
            type="checkbox"
            checked={individual}
            onChange={(e) => setIndividual(e.target.checked)}
            className="size-5 flex-none accent-primary"
          />
          개별인정형 원료 취급
        </label>
      </form>

      <div className="flex min-w-0 flex-[3_1_560px] flex-col gap-6">
        {/* 광고 영역 — 일반 목록과 분리 */}
        {MAKER_ADS.length > 0 && (
          <section aria-label="광고" className="rounded-card border border-dashed border-[#D97706] bg-[#FFFBEB] p-4 sm:p-5">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {MAKER_ADS.map((ad) => (
                <li key={ad.id}>
                  <Link
                    href={ad.href}
                    rel="sponsored"
                    className="flex min-h-12 items-center justify-between gap-3 text-ink no-underline hover:underline"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <AdLabel />
                      <span className="font-bold">{ad.title}</span>
                      <span className="text-[13px] text-muted">{ad.sponsor}</span>
                    </span>
                    <ChevronRight size={18} className="flex-none text-muted" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 일반 목록 */}
        <section aria-labelledby="list-title" className="flex flex-col gap-4">
          <h2 id="list-title" className="m-0 text-base font-bold text-ink" aria-live="polite">
            제조사 {filtered.length}곳
          </h2>
          {filtered.length === 0 ? (
            <EmptyState icon={<SearchX size={32} aria-hidden />} title="조건에 맞는 제조사가 없습니다">
              필터를 줄여 보세요.{" "}
              <button type="button" onClick={reset} className="cursor-pointer border-0 bg-transparent p-0 font-bold text-primary underline">
                필터 초기화
              </button>
            </EmptyState>
          ) : (
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-4 p-0">
              {filtered.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/makers/${m.id}`}
                    className="flex h-full flex-col gap-3 rounded-card border border-line bg-white p-5 text-ink no-underline transition-shadow hover:border-line-strong hover:shadow-doc"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-lg font-extrabold text-navy">{m.name}</span>
                      <ChevronRight size={18} className="text-muted" aria-hidden />
                    </span>
                    <span className="text-sm text-muted">{m.summary}</span>
                    <span className="flex flex-wrap gap-1.5">
                      {m.certs.map((c) => (
                        <Badge key={c} tone="tint">{c}</Badge>
                      ))}
                      {m.individualApproved && <Badge tone="neutral">개별인정형 취급</Badge>}
                    </span>
                    <dl className="m-0 mt-auto grid grid-cols-2 gap-2 border-t border-line pt-3 text-[13px]">
                      <div>
                        <dt className="text-muted">제형</dt>
                        <dd className="m-0 font-bold">{m.forms.join(" · ")}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">MOQ</dt>
                        <dd className="m-0 font-bold">{m.moqLabel}</dd>
                      </div>
                    </dl>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
