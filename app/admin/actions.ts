"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, requireStaff, signIn } from "@/lib/admin/session";
import { database } from "@/lib/admin/database.mjs";
import { isEnquiryStatus } from "@/lib/enquiry-options";

export async function login(_error: string, form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  try {
    if (!(await signIn(email, password))) {
      return "Unable to sign in. Check your details or try again in 15 minutes.";
    }
  } catch {
    return "Sign-in is temporarily unavailable. Please try again later.";
  }
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function updateStatus(_message: string, form: FormData) {
  await requireStaff();
  const status = String(form.get("status"));
  const previous = String(form.get("previous"));
  if (!isEnquiryStatus(status) || !isEnquiryStatus(previous)) return "Choose a valid status.";
  try {
    const db = await database();
    const result = await db.execute({
      sql: "UPDATE enquiries SET status=? WHERE id=? AND status=?",
      args: [status, String(form.get("id")), previous],
    });
    revalidatePath("/admin");
    return result.rowsAffected ? "Status saved." : "This request changed. Review its current status.";
  } catch {
    return "The status could not be saved. Please try again.";
  }
}