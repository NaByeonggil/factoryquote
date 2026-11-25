import { ChevronDown } from "lucide-react";

export type ConsentRow = { term: string; detail: string };

/**
 * 개인정보 동의 고지 사항 펼침 상자.
 * 개인정보보호법상 알려야 할 항목(받는 자/목적/항목/보유 기간/거부 권리)을 표로 보여줍니다.
 */
export function ConsentDetails({ rows, summary = "자세히 보기" }: { rows: ConsentRow[]; summary?: string }) {
  return (
    <details className="group rounded-control border border-line bg-ground text-[13px] leading-relaxed text-body">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-3.5 font-bold text-navy [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown size={16} aria-hidden className="transition-transform group-open:rotate-180" />
      </summary>
      <dl className="m-0 grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-2 border-t border-line px-3.5 py-3">
        {rows.map((r) => (
          <div key={r.term} className="contents">
            <dt className="font-bold text-muted">{r.term}</dt>
            <dd className="m-0">{r.detail}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
