import { createClient } from "@libsql/client";
import { mkdirSync } from "node:fs";

let ready;

async function openDatabase() {
  let url = process.env.CEYLON_DATABASE_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Configure CEYLON_DATABASE_URL for production.");
    }
    mkdirSync(".data", { recursive: true, mode: 0o700 });
    url = "file:.data/ceylon.db";
  }

  const db = createClient({ url, authToken: process.env.CEYLON_DATABASE_TOKEN });
  try {
    await db.batch([
      `CREATE TABLE IF NOT EXISTS staff (
        email TEXT PRIMARY KEY, password_hash TEXT NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0, window_start INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS staff_sessions (
        digest TEXT PRIMARY KEY, email TEXT NOT NULL REFERENCES staff(email),
        expires INTEGER NOT NULL
      )`,
      "CREATE INDEX IF NOT EXISTS staff_sessions_expiry ON staff_sessions(expires)",
      `CREATE TABLE IF NOT EXISTS enquiries (
        id TEXT PRIMARY KEY, created_at INTEGER NOT NULL,
        name TEXT NOT NULL, email TEXT NOT NULL, dates TEXT NOT NULL,
        duration TEXT NOT NULL, budget TEXT NOT NULL, style TEXT NOT NULL,
        trip TEXT NOT NULL, message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New','In progress','Closed'))
      )`,
      "CREATE INDEX IF NOT EXISTS enquiries_date ON enquiries(created_at DESC, id DESC)",
    ], "write");
    return db;
  } catch (error) {
    db.close();
    throw error;
  }
}

/** @returns {Promise<import("@libsql/client").Client>} */
export function database() {
  ready ??= openDatabase().catch((error) => {
    ready = undefined;
    throw error;
  });
  return ready;
}