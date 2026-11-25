import type { ReactNode } from "react";

/** eyebrow + H2 묶음 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {eyebrow && (
        <p className={`m-0 text-sm font-bold ${dark ? "text-on-dark-accent" : "text-primary"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`m-0 text-[26px] leading-[1.3] font-extrabold sm:text-[32px] lg:text-[36px] ${dark ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`m-0 text-base leading-[1.7] ${dark ? "text-on-dark-muted" : "text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

/** 하위 페이지 상단 제목 (H1 36px) */
export function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-[720px] flex-col gap-2.5">
      <p className="m-0 text-sm font-bold text-primary">{eyebrow}</p>
      <h1 className="m-0 text-[28px] leading-[1.3] font-extrabold text-navy sm:text-[36px]">{title}</h1>
      <p className="m-0 text-base leading-[1.7] text-muted">{description}</p>
    </div>
  );
}
