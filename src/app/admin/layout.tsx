import type { Metadata } from "next";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: { default: "관리자", template: "%s · 관리자" },
  robots: { index: false, follow: false },
};

// TODO(API): 관리자 권한 확인 (middleware 또는 서버 세션). 지금은 누구나 접근 가능합니다.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-ground">
      <AdminNav />
      <main className="container-page flex flex-col gap-6 py-8 sm:py-10">{children}</main>
    </div>
  );
}
