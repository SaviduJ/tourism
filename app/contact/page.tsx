"use client";

import { itineraries } from "@/lib/data";
import { EnquiryForm } from "./enquiry-form";

export default async function Contact({ searchParams }: { searchParams: Promise<{ trip?: string }> }) {
  const { trip: slug } = await searchParams;
  const trip = itineraries.find((entry) => entry.slug === slug);
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Your island story starts here</span>
          <h1>Let&apos;s plan something wonderful.</h1>
          <p>
            Tell us about your travel plans so our team can help shape your journey.
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

          <EnquiryForm trip={trip && { slug: trip.slug, title: trip.title, days: trip.days }} />
        </div>
      </section>
    </main>
  );
}