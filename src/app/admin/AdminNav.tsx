"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FlaskConical, Inbox, LogOut, Search, Send } from "lucide-react";
import { SITE } from "@/config/site";
import { logout } from "./auth-actions";

const ITEMS = [
  { href: "/admin", label: "문의함", icon: Inbox },
  { href: "/admin/blueprints", label: "설계 · 발송", icon: Send },
  { href: "/admin/ingredients", label: "원료 검색", icon: Search },
  { href: "/admin/reports", label: "리포트", icon: BarChart3 },
];

export function AdminNav({ user }: { user: string }) {
  const pathname = usePathname();
  return (
    <header className="border-b border-white/10 bg-navy text-white">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2">
        <Link href="/admin" className="flex items-center gap-2.5 text-white no-underline">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/10">
            <FlaskConical size={18} aria-hidden />
          </span>
          <span className="font-extrabold">{SITE.name}</span>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-bold">관리자</span>
        </Link>
        <nav aria-label="관리자 메뉴" className="-mx-2 flex flex-wrap gap-1">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const current = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-control px-3 text-sm whitespace-nowrap no-underline ${current ? "bg-white font-bold text-navy" : "text-on-dark-muted hover:bg-white/10 hover:text-white"}`}
              >
                <Icon size={16} aria-hidden />
                {label}
              </Link>
            );
          })}
          <form action={logout}>
            <button
              type="submit"
              title={`${user} 로그아웃`}
              className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-control px-3 text-sm whitespace-nowrap text-on-dark-muted hover:bg-white/10 hover:text-white"
            >
              <LogOut size={16} aria-hidden />
              로그아웃
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
