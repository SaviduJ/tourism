"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, "");
  return (
    <form className="staff-login-form" action={action}>
      <label>Email address<input type="email" name="email" autoComplete="username" required maxLength={254} /></label>
      <label>Password<input type="password" name="password" autoComplete="current-password" required maxLength={72} /></label>
      {error && <p className="staff-error" role="alert">{error}</p>}
      <button className="btn" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}