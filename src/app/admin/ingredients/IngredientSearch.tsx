"use client";

import { useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Badge, TableScroll, td, th } from "@/components/ui";
import { INGREDIENTS, type Ingredient } from "@/data/mock";

type TypeFilter = "전체" | Ingredient["type"];

export function IngredientSearch() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<TypeFilter>("전체");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Ingredient[] | null>(null);

  async function search() {
    if (loading) return;
    setLoading(true);
    // TODO(API): POST /api/admin/ingredients/search { q, type } — 공전·개별인정 DB 검색 + AI 요약
    await new Promise((r) => setTimeout(r, 500));
    const k = q.trim();
    setResults(INGREDIENTS.filter((i) => (type === "전체" || i.type === type) && (k === "" || i.name.includes(k) || i.claim.includes(k))));
    setLoading(false);
  }

  return (
    <section className="flex flex-col gap-5 rounded-card border border-line bg-white p-5 sm:p-6">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-wrap gap-2">
          <div className="relative min-w-0 flex-[1_1_280px]">
            <label htmlFor="ing-q" className="sr-only">
              원료명 또는 기능성
            </label>
            <Search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="ing-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="예: 밀크씨슬, 간 건강"
              className="min-h-12 w-full rounded-control border border-line-strong pr-3 pl-10 text-[15px]"
            />
          </div>
          <Button type="submit" aria-disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Sparkles size={18} aria-hidden />}
            AI 검색
          </Button>
        </div>
        <div role="group" aria-label="원료 구분" className="flex flex-wrap gap-2">
          {(["전체", "고시형", "개별인정형"] as TypeFilter[]).map((t) => (
            <Chip key={t} selected={type === t} onClick={() => setType(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </form>

      <div aria-live="polite" aria-busy={loading}>
        {results === null ? (
          <p className="m-0 rounded-xl bg-ground px-4 py-10 text-center text-sm text-muted">원료명이나 기능성으로 검색하세요.</p>
        ) : results.length === 0 ? (
          <p className="m-0 rounded-xl bg-ground px-4 py-10 text-center text-sm text-muted">검색 결과가 없습니다.</p>
        ) : (
          <TableScroll label="원료 검색 결과">
            <table className="w-full min-w-[620px] border-collapse text-sm">
              <thead>
                <tr className="bg-ground">
                  {["원료", "구분", "표시 가능 기능성", "1일 섭취량"].map((h) => (
                    <th key={h} scope="col" className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.name} className="border-t border-line">
                    <td className={`${td} font-bold`}>{r.name}</td>
                    <td className={td}>
                      <Badge tone={r.type === "고시형" ? "tint" : "navy"}>{r.type}</Badge>
                    </td>
                    <td className={td}>{r.claim}</td>
                    <td className={`${td} text-muted`}>{r.dailyIntake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        )}
      </div>
      <p className="m-0 text-[13px] text-muted">
        AI 검색 결과는 참고용입니다. 설계서에 넣기 전에 원문(건강기능식품 공전 · 개별인정 고시)을 확인하세요.
      </p>
    </section>
  );
}
