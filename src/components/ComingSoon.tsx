import { Construction } from "lucide-react";
import { ButtonLink } from "./Button";

/** 와이어프레임만 있고 아직 디자인되지 않은 화면의 임시 페이지 */
export function ComingSoon({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <main className="container-page flex flex-col items-start gap-5 py-20 sm:py-28">
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary-tint text-primary">
        <Construction size={24} aria-hidden />
      </span>
      <h1 className="m-0 text-[28px] font-extrabold text-navy sm:text-[36px]">{title}</h1>
      <p className="m-0 max-w-[560px] text-base leading-[1.7] text-muted">{description}</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <ButtonLink href="/design">무료 AI 설계 시작</ButtonLink>
        <ButtonLink href="/" variant="ghost">
          홈으로
        </ButtonLink>
      </div>
      {children}
    </main>
  );
}
