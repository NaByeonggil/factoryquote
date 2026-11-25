import type { ReactNode } from "react";

/** 작은 라벨 배지 */
export function Badge({
  children,
  tone = "tint",
  className = "",
}: {
  children: ReactNode;
  tone?: "tint" | "navy" | "neutral" | "primary" | "success" | "warning";
  className?: string;
}) {
  const tones = {
    tint: "bg-primary-tint text-primary-deep",
    navy: "bg-navy text-white",
    neutral: "bg-subtle text-body",
    primary: "bg-primary text-white",
    success: "bg-[#DCFCE7] text-[#166534]",
    warning: "bg-[#FEF3C7] text-[#92400E]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/**
 * 광고 표기 — 유료 노출 콘텐츠에는 반드시 붙입니다 (표시광고법).
 * 테두리 박스로 감싸 일반 목록과 시각적으로 분리합니다.
 */
export function AdLabel() {
  return (
    <span className="inline-flex items-center rounded border border-[#B45309] px-1.5 py-0.5 text-[11px] leading-none font-bold text-[#92400E]">
      광고
    </span>
  );
}

/** 표를 가로 스크롤 박스 안에 둡니다 (모바일 대응). */
export function TableScroll({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-x-auto rounded-xl border border-line ${className}`}
      tabIndex={0}
      role="region"
      aria-label={`${label} (가로 스크롤)`}
    >
      {children}
    </div>
  );
}

export const th = "px-4 py-3 text-left text-[13px] font-bold whitespace-nowrap text-muted";
export const td = "px-4 py-3.5 align-middle";

/** 빈 상태 */
export function EmptyState({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-xl border border-dashed border-line-strong px-6 py-12 text-center">
      <span className="text-primary">{icon}</span>
      <p className="m-0 text-base font-bold text-navy">{title}</p>
      {children && <div className="m-0 max-w-[420px] text-sm leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
