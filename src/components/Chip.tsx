"use client";

import type { ComponentProps } from "react";

type ChipProps = Omit<ComponentProps<"button">, "type"> & { selected: boolean };

/** 토글 칩 — 선택 상태는 aria-pressed로 전달합니다. */
export function Chip({ selected, className = "", children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={
        "min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors " +
        (selected
          ? "border-primary bg-primary-tint font-bold text-primary-deep"
          : "border-line-strong bg-white font-medium text-body hover:border-navy") +
        " " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

/** 칩 묶음 — fieldset + legend로 그룹 이름을 붙입니다. */
export function ChipGroup({
  legend,
  hint,
  error,
  children,
}: {
  legend: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
      <legend className="pb-2.5 text-sm font-bold text-ink">
        {legend}
        {hint && <span className="ml-1 font-medium text-muted">{hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
      {error && (
        <p role="alert" className="m-0 text-[13px] font-medium text-[#B91C1C]">
          {error}
        </p>
      )}
    </fieldset>
  );
}
