import type { ComponentProps, ElementType } from "react";

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentProps<T>, "as" | "className">;

/** 흰 배경 + 1px 테두리 + 16px 라운드. 패딩은 반응형(모바일 20px / 데스크톱 32px). */
export function Card<T extends ElementType = "div">({ as, className = "", ...rest }: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={`rounded-card border border-line bg-white p-5 sm:p-8 ${className}`}
      {...rest}
    />
  );
}
