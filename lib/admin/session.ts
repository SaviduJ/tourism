import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { database } from "./database.mjs";

const secure = process.env.NODE_ENV === "production";
const cookieName = secure ? "__Host-ceylon-staff" : "ceylon-staff";
const lifetime = 8 * 60 * 60;
const digest = (token: string) => createHash("sha256").update(token).digest("hex");

export async function signIn(email: string, password: string) {
  if (!email || email.length > 254 || !password || Buffer.byteLength(password) > 72) return false;
  const db = await database();
  const now = Date.now();
  const cutoff = now - 15 * 60 * 1000;
  // Reserve an attempt atomically, including when two sign-ins arrive together.
  const result = await db.execute({
    sql: `UPDATE staff SET attempts = CASE WHEN window_start <= ? THEN 1 ELSE attempts + 1 END,
            window_start = CASE WHEN window_start <= ? THEN ? ELSE window_start END
          WHERE email = ? AND (window_start <= ? OR attempts < 10)
          RETURNING password_hash`,
    args: [cutoff, cutoff, now, email, cutoff],
  });
  const hash = result.rows[0]?.password_hash;
  if (typeof hash !== "string" || !(await bcrypt.compare(password, hash))) return false;

  const token = randomBytes(32).toString("hex");
  const [, session] = await db.batch([
    { sql: "DELETE FROM staff_sessions WHERE expires <= ?", args: [now] },
    { sql: `INSERT INTO staff_sessions(digest,email,expires)
            SELECT ?,email,? FROM staff WHERE email=? AND password_hash=?`,
      args: [digest(token), now + lifetime * 1000, email, hash] },
    { sql: "UPDATE staff SET attempts=0, window_start=0 WHERE email=? AND password_hash=?", args: [email, hash] },
  ], "write");
  if (!session.rowsAffected) return false;
  (await cookies()).set(cookieName, token, {
    httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: lifetime,
  });
  return true;
}

export async function staffEmail() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const db = await database();
  const { rows } = await db.execute({
    sql: "SELECT email FROM staff_sessions WHERE digest=? AND expires>?",
    args: [digest(token), Date.now()],
  });
  return typeof rows[0]?.email === "string" ? rows[0].email : null;
}

export async function requireStaff() {
  const email = await staffEmail();
  if (!email) redirect("/admin/login");
  return email;
}

export async function endSession() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (token) {
    const db = await database();
    await db.execute({ sql: "DELETE FROM staff_sessions WHERE digest=?", args: [digest(token)] });
  }
  jar.set(cookieName, "", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 0 });
}