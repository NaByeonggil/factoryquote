import { Lock } from "lucide-react";

/** 설계서에서만 공개되는 항목 안내 (점선 박스 + 자물쇠) */
export function LockedBox({
  title,
  items,
  note,
}: {
  title: string;
  items: readonly string[];
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-dashed border-[#94A3B8] bg-[#F8FAFC] p-6">
      <div className="flex items-center gap-2.5">
        <Lock size={20} className="text-navy" aria-hidden />
        <p className="m-0 text-base font-bold text-navy">{title}</p>
      </div>
      <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-body">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      {note && <p className="m-0 text-sm text-muted">{note}</p>}
    </div>
  );
}
