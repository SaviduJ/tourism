import nextEnv from "@next/env";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { database } from "../lib/admin/database.mjs";

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");
const [address, option] = process.argv.slice(2);
const email = address?.trim().toLowerCase();
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    (option && option !== "--reset")) {
  console.error("Usage: npm run staff:create -- you@example.com [--reset]");
  process.exit(1);
}

const db = await database();
try {
  const password = randomBytes(21).toString("base64url");
  const hash = await bcrypt.hash(password, 12);
  if (option === "--reset") {
    const [updated] = await db.batch([
      { sql: "UPDATE staff SET password_hash=?, attempts=0, window_start=0 WHERE email=?", args: [hash, email] },
      { sql: "DELETE FROM staff_sessions WHERE email=?", args: [email] },
    ], "write");
    if (!updated.rowsAffected) throw new Error("Staff account does not exist.");
  } else {
    const result = await db.execute({
      sql: "INSERT INTO staff(email, password_hash) VALUES (?, ?) ON CONFLICT(email) DO NOTHING",
      args: [email, hash],
    });
    if (!result.rowsAffected) throw new Error("Account already exists. Use --reset to change its password.");
  }
  console.log(`Staff login: ${email}\nPassword: ${password}\nStore this password in your password manager.`);
} finally {
  db.close();
}