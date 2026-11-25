// 관리자 세션 쿠키. 미들웨어(Edge)와 서버 액션(Node) 양쪽에서 쓰도록 Web Crypto만 쓴다.
// 아이디·비밀번호·서명 키는 환경변수(ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET)에 둔다.
// 셋 중 하나라도 없으면 로그인을 받지 않고 관리자 화면은 계속 잠겨 있다.
export const SESSION_COOKIE = "admin_session";
export const SESSION_HOURS = 12;

const enc = new TextEncoder();

export const loginEnabled = () =>
  !!(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(process.env.ADMIN_SESSION_SECRET ?? ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
  return btoa(String.fromCharCode(...mac)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// 길이가 달라도 끝까지 비교해 응답 시간으로 값을 짐작하지 못하게 한다.
export function safeEqual(a: string, b: string) {
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export function checkPassword(username: string, password: string) {
  return (
    loginEnabled() &&
    safeEqual(username, process.env.ADMIN_USERNAME!) &&
    safeEqual(password, process.env.ADMIN_PASSWORD!)
  );
}

// "아이디.만료시각(ms).서명"
export async function createSessionToken(username: string) {
  const payload = `${username}.${Date.now() + SESSION_HOURS * 3600_000}`;
  return `${payload}.${await sign(payload)}`;
}

export async function sessionUser(token: string | undefined): Promise<string | null> {
  if (!token || !loginEnabled()) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const payload = token.slice(0, i);
  if (!safeEqual(token.slice(i + 1), await sign(payload))) return null;
  const j = payload.lastIndexOf(".");
  const username = payload.slice(0, j);
  const expires = Number(payload.slice(j + 1));
  return username === process.env.ADMIN_USERNAME && expires > Date.now() ? username : null;
}

// 로그인 뒤 돌아갈 주소. 관리자 화면 안의 경로만 받는다("//다른사이트" 같은 값은 버린다).
export function safeNext(next: unknown) {
  const s = typeof next === "string" ? next : "";
  return (s === "/admin" || s.startsWith("/admin/")) && !s.startsWith("/admin/login") ? s : "/admin";
}
