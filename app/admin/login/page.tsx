import { KeyRound } from "lucide-react";
import { redirect } from "next/navigation";
import { staffEmail } from "@/lib/admin/session";
import { LoginForm } from "./login-form";

export default async function StaffLogin() {
  if (await staffEmail()) redirect("/admin");
  return (
    <section className="staff-login">
      <div className="staff-login-card">
        <KeyRound size={28} aria-hidden="true" />
        <h1>Staff sign in</h1>
        <p>Sign in to manage trip enquiries.</p>
        <LoginForm />
      </div>
    </section>
  );
}