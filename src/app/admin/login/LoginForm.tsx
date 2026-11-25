"use client";

import { useActionState } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Field";
import { login, type LoginState } from "../auth-actions";

export function LoginForm({ next, disabled }: { next: string; disabled: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, null);
  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />
      <TextField id="username" label="아이디" autoComplete="username" required disabled={disabled} />
      <TextField
        id="password"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        required
        disabled={disabled}
      />
      {state?.error && (
        <p role="alert" className="m-0 text-sm font-bold text-[#B91C1C]">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending || disabled}>
        {pending ? "확인 중…" : "로그인"}
      </Button>
    </form>
  );
}
