import { BarChart3 } from "lucide-react";
import { INQUIRY_SHARE_BY_FORM } from "@/config/site";

/** 제형별 문의 비중. 실데이터가 없으면 0% 막대 대신 "집계 중" 안내를 보여줍니다. */
export function InquiryShare() {
  if (!INQUIRY_SHARE_BY_FORM) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-xl bg-ground px-6 py-10 text-center">
        <BarChart3 size={28} className="text-primary" aria-hidden />
        <p className="m-0 text-[15px] font-bold text-navy">이번 달 데이터를 집계하고 있습니다</p>
        <p className="m-0 text-sm text-muted">제형별 문의 비중은 집계가 끝나면 이곳에 공개합니다.</p>
      </div>
    );
  }
  return (
    <dl className="m-0 grid grid-cols-[72px_minmax(0,1fr)_48px] items-center gap-x-4 gap-y-3.5 text-[15px] sm:grid-cols-[88px_minmax(0,1fr)_56px]">
      {INQUIRY_SHARE_BY_FORM.map((row) => (
        <div key={row.label} className="contents">
          <dt>{row.label}</dt>
          <dd className="m-0 h-3 rounded-md bg-line" aria-hidden>
            <div className="h-3 rounded-md bg-primary" style={{ width: `${row.percent}%` }} />
          </dd>
          <dd className="m-0 text-right text-muted">{row.percent}%</dd>
        </div>
      ))}
    </dl>
  );
}
