"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { SITE } from "@/config/site";
import { buttonClass } from "./Button";

type NavItem = { href: string; label: string };

const CLIENT_NAV: NavItem[] = [
  { href: "/design", label: "설계하기" },
  { href: "/makers", label: "제조사 찾기" },
  { href: "/#guides", label: "원료·규제 가이드" },
  { href: "/partners", label: "제조사 입점" },
];

const PARTNER_NAV: NavItem[] = [
  { href: "/partners#products", label: "입점 상품" },
  { href: "/partners#apply", label: "입점 문의" },
  { href: "/", label: "의뢰자 사이트" },
];

export function Header({ variant = "client" }: { variant?: "client" | "partner" }) {
  const pathname = usePathname();
  const items = variant === "partner" ? PARTNER_NAV : CLIENT_NAV;

  return (
    <header className="border-b border-line bg-white">
      <div className="container-page flex min-h-[72px] flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3 sm:py-0">
        <Link href="/" className="flex items-center gap-2.5 text-navy no-underline">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-navy">
            <FlaskConical size={18} color="#fff" strokeWidth={2} aria-hidden />
          </span>
          <span className="text-lg font-extrabold">{SITE.name}</span>
          {variant === "partner" && (
            <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[13px] font-bold text-muted">
              제조사용
            </span>
          )}
        </Link>

        <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
          {items.map((item) => {
            const current = !item.href.includes("#") && item.href !== "/" && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={
                  "py-2 text-[15px] no-underline hover:text-navy " +
                  (current ? "font-bold text-navy" : "font-medium text-body")
                }
              >
                {item.label}
              </Link>
            );
          })}
          {variant === "client" && (
            <Link href="/login" className={buttonClass("ghost", "sm")}>
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
