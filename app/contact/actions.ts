"use server";

import { database } from "@/lib/admin/database.mjs";
import { budgets, travelStyles, tripLengths } from "@/lib/enquiry-options";
import { itineraries } from "@/lib/data";

export async function submitEnquiry(form: FormData) {
  const value = (field: string) => String(form.get(field) ?? "").trim();
  const id = value("id");
  const name = value("name"), email = value("email");
  const dates = value("dates"), duration = value("length");
  const budget = value("budget"), style = value("style"), message = value("journey");
  const slug = value("trip");
  const trip = itineraries.find((entry) => entry.slug === slug);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
      !name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      dates.length > 120 || message.length > 3000 || !tripLengths.includes(duration) ||
      !budgets.includes(budget) || !travelStyles.includes(style) || (slug && !trip)) {
    return { ok: false, message: "Please check the enquiry details and try again." };
  }
  try {
    const db = await database();
    await db.execute({
      sql: `INSERT INTO enquiries(id,created_at,name,email,dates,duration,budget,style,trip,message)
            VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING`,
      args: [id, Date.now(), name, email, dates, duration, budget, style, trip?.title ?? "", message],
    });
    return { ok: true, message: "Your enquiry has been received." };
  } catch {
    return { ok: false, message: "We could not save your enquiry. Your details are still here. Please try again." };
  }
}