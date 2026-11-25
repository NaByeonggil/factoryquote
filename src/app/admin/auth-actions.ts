"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, createSessionToken, safeNext, SESSION_COOKIE, SESSION_HOURS } from "@/lib/admin-session";

export type LoginState = { error?: string } | null;

// 공개 주소에 열려 있으므로 IP별로 비밀번호 대입을 늦춘다. 서버 한 대라 메모리로 충분하다.
const MAX_FAILURES = 5;
const LOCK_MS = 10 * 60_000;
const failures = new Map<string, { count: number; since: number }>();

async function clientIp() {
  // X-Forwarded-For는 "(접속자가 보낸 값…), .129 nginx가 붙인 실제 접속자 IP, Caddy가 붙인 nginx IP" 순이다.
  // 맨 앞은 접속자가 위조할 수 있으므로 뒤에서 두 번째를 쓴다.
  const chain = (await headers()).get("x-forwarded-for")?.split(",").map((s) => s.trim()) ?? [];
  return chain.at(-2) ?? chain[0] ?? "local";
}

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const ip = await clientIp();
  const now = Date.now();
  const f = failures.get(ip);
  if (f && now - f.since > LOCK_MS) failures.delete(ip);
  if ((failures.get(ip)?.count ?? 0) >= MAX_FAILURES) {
    return { error: "로그인 시도가 너무 많습니다. 10분 뒤에 다시 시도하세요." };
  }

  const username = String(fd.get("username") ?? "");
  if (!checkPassword(username, String(fd.get("password") ?? ""))) {
    const cur = failures.get(ip) ?? { count: 0, since: now };
    failures.set(ip, { count: cur.count + 1, since: cur.since });
    return { error: "아이디 또는 비밀번호가 맞지 않습니다." };
  }

  failures.delete(ip);
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  redirect(safeNext(fd.get("next")));
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
