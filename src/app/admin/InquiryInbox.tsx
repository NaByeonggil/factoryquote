"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge, TableScroll, td, th } from "@/components/ui";
import { INQUIRIES, INQUIRY_STATUSES, type Inquiry, type InquiryStatus } from "@/data/mock";

const STATUS_TONE: Record<InquiryStatus, "warning" | "tint" | "primary" | "neutral" | "success"> = {
  신규: "warning",
  "검토 중": "tint",
  "설계 중": "tint",
  "견적 발송": "primary",
  완료: "success",
};

type Filter = "전체" | InquiryStatus;

export function InquiryInbox() {
  // TODO(API): GET /api/admin/inquiries?status=&q=
  const [rows, setRows] = useState<Inquiry[]>(INQUIRIES);
  const [filter, setFilter] = useState<Filter>("전체");
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { 전체: rows.length };
    for (const r of rows) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rows]);

  const shown = rows.filter(
    (r) => (filter === "전체" || r.status === filter) && (q === "" || `${r.name} ${r.subject} ${r.id}`.includes(q)),
  );

  function setStatus(id: string, status: InquiryStatus) {
    // TODO(API): PATCH /api/admin/inquiries/{id} { status }
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <section className="flex flex-col gap-4 rounded-card border border-line bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="상태 필터" className="flex flex-wrap gap-1.5">
          {(["전체", ...INQUIRY_STATUSES] as Filter[]).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
              className={`min-h-11 cursor-pointer rounded-full border px-3.5 text-[13px] ${filter === s ? "border-primary bg-primary-tint font-bold text-primary-deep" : "border-line-strong bg-white text-body"}`}
            >
              {s} <span className="text-muted">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="relative min-w-0 flex-[0_1_280px] max-sm:flex-[1_1_100%]">
          <label htmlFor="inbox-q" className="sr-only">
            문의 검색
          </label>
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="inbox-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="이름 · 내용 · 번호 검색"
            className="min-h-11 w-full rounded-control border border-line-strong pr-3 pl-9 text-sm"
          />
        </div>
      </div>

      <TableScroll label="문의 목록">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-ground">
              {["번호", "구분", "이름", "내용", "접수일", "상태"].map((h) => (
                <th key={h} scope="col" className={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody aria-live="polite">
            {shown.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  조건에 맞는 문의가 없습니다.
                </td>
              </tr>
            ) : (
              shown.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className={`${td} font-mono text-[13px] text-muted`}>{r.id}</td>
                  <td className={td}>
                    <Badge tone={r.kind === "입점 문의" ? "navy" : "neutral"}>{r.kind}</Badge>
                  </td>
                  <td className={`${td} font-bold`}>{r.name}</td>
                  <td className={td}>{r.subject}</td>
                  <td className={`${td} whitespace-nowrap text-muted`}>{r.createdAt}</td>
                  <td className={td}>
                    <div className="flex items-center gap-2">
                      <Badge tone={STATUS_TONE[r.status]} className="max-lg:hidden">
                        {r.status}
                      </Badge>
                      <label htmlFor={`st-${r.id}`} className="sr-only">
                        {r.id} 상태 변경
                      </label>
                      <select
                        id={`st-${r.id}`}
                        value={r.status}
                        onChange={(e) => setStatus(r.id, e.target.value as InquiryStatus)}
                        className="min-h-11 rounded-control border border-line-strong bg-white px-2.5 text-[13px]"
                      >
                        {INQUIRY_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableScroll>
    </section>
  );
}
