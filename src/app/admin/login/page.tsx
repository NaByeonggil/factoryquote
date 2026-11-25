import type { Metadata } from "next";
import { loginEnabled, safeNext } from "@/lib/admin-session";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "로그인" };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const enabled = loginEnabled();
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 rounded-card border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="m-0 text-2xl font-extrabold text-navy">관리자 로그인</h1>
        <p className="m-0 text-[15px] text-muted">관리자 계정으로 로그인하세요.</p>
      </div>
      {!enabled && (
        <p role="alert" className="m-0 text-sm font-bold text-[#B91C1C]">
          관리자 계정이 설정되지 않아 로그인할 수 없습니다. 서버의 ADMIN_USERNAME, ADMIN_PASSWORD,
          ADMIN_SESSION_SECRET 환경변수를 확인하세요.
        </p>
      )}
      <LoginForm next={safeNext(next)} disabled={!enabled} />
    </div>
  );
}
