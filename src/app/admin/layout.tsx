import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SESSION_COOKIE, sessionUser } from "@/lib/admin-session";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: { default: "관리자", template: "%s · 관리자" },
  robots: { index: false, follow: false },
};

// 접근 제한은 src/middleware.ts가 맡는다. 여기서는 로그인 화면에서 메뉴만 숨긴다.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await sessionUser((await cookies()).get(SESSION_COOKIE)?.value);
  return (
    <div className="min-h-dvh bg-ground">
      {user && <AdminNav user={user} />}
      <main className="container-page flex flex-col gap-6 py-8 sm:py-10">{children}</main>
    </div>
  );
}
