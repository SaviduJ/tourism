"use client";

import { useRef, useState, type FormEvent } from "react";
import { budgets, travelStyles, tripLengths } from "@/lib/enquiry-options";
import { submitEnquiry } from "./actions";

type Trip = { slug: string; title: string; days: number };

export function EnquiryForm({ trip }: { trip?: Trip }) {
  const submissionId = useRef("");
  const inFlight = useRef(false);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(event.currentTarget);
    inFlight.current = true;
    setPending(true);
    setError("");
    try {
      submissionId.current ||= crypto.randomUUID();
      form.set("id", submissionId.current);
      form.set("trip", trip?.slug ?? "");
      const result = await submitEnquiry(form);
      if (result.ok) setSent(true);
      else setError(result.message);
    } catch {
      setError("Your enquiry could not be confirmed. Please try again.");
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  if (sent) return <div role="status" className="success">
    <h3>Enquiry received</h3><p>Thank you. Your travel plans are with the CEYLON team.</p>
    <button className="btn outline" onClick={() => { submissionId.current = ""; setSent(false); }}>Send another enquiry</button>
  </div>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      {trip && <p className="full"><strong>Selected itinerary</strong><br />{trip.title}</p>}
      <div className="field">
        <label htmlFor="name">YOUR NAME</label>
        <input
          id="name"
          name="name" maxLength={120}
          type="text"
          required
          placeholder="Full name"
        />
      </div>

      <div className="field">
        <label htmlFor="email">EMAIL ADDRESS</label>
        <input
          id="email"
          name="email" maxLength={254}
          type="email"
          required
          placeholder="you@example.com"
        />
      </div>

      <div className="field">
        <label htmlFor="dates">TRAVEL DATES</label>
        <input
          id="dates"
          name="dates" maxLength={120}
          type="text"
          placeholder="e.g. February 2027"
        />
      </div>

      <div className="field">
        <label htmlFor="length">TRIP LENGTH</label>
        <select id="length" name="length" defaultValue={trip ? `${trip.days} days` : "7 days"}>
          {tripLengths.map((length) => (
            <option key={length} value={length}>
              {length}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="budget">BUDGET PER PERSON (USD)</label>
        <select id="budget" name="budget">
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="style">TRAVEL STYLE</label>
        <select id="style" name="style">
          {travelStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="journey">YOUR JOURNEY</label>
        <textarea
          id="journey"
          name="journey" maxLength={3000}
          rows={4}
          placeholder="Who is travelling, what do you love?"
        />
      </div>

      <div className="full">
        <button className="btn" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send trip enquiry"}
        </button>

        {error && <p role="alert">{error}</p>}
      </div>
    </form>
  );
}