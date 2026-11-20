"use client";

import { useState, FormEvent } from "react";

const TRIP_LENGTHS = [
  "3 days",
  "5 days",
  "7 days",
  "10 days",
  "14 days",
  "Flexible",
];

const BUDGET_OPTIONS = [
  "Under $750",
  "$750–$1,500",
  "$1,500–$3,000",
  "$3,000+",
  "Not sure yet",
];

const TRAVEL_STYLES = [
  "A little of everything",
  "Culture & history",
  "Nature & wildlife",
  "Beaches & relaxation",
  "Luxury & wellness",
  "Adventure",
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Your island story starts here</span>
          <h1>Let&apos;s plan something wonderful.</h1>
          <p>
            Tell us about your travel plans. Connect a form backend before
            launch to receive enquiries.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="detail">
          <div>
            <h2>Make the journey yours.</h2>
            <p>
              Share your dates, travel style, and the experiences you&apos;re
              dreaming of.
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">YOUR NAME</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Full name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="field">
              <label htmlFor="dates">TRAVEL DATES</label>
              <input
                id="dates"
                name="dates"
                type="text"
                placeholder="e.g. February 2027"
              />
            </div>

            <div className="field">
              <label htmlFor="length">TRIP LENGTH</label>
              <select id="length" name="length" defaultValue="7 days">
                {TRIP_LENGTHS.map((length) => (
                  <option key={length} value={length}>
                    {length}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="budget">BUDGET PER PERSON (USD)</label>
              <select id="budget" name="budget">
                {BUDGET_OPTIONS.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="style">TRAVEL STYLE</label>
              <select id="style" name="style">
                {TRAVEL_STYLES.map((style) => (
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
                name="journey"
                rows={4}
                placeholder="Who is travelling, what do you love?"
              />
            </div>

            <div className="full">
              <button className="btn" type="submit">
                Send trip enquiry ↗
              </button>

              {sent && (
                <p className="success" role="status">
                  Thanks! This demo form works locally but no message has been
                  sent. Connect an email/form backend before publishing.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
