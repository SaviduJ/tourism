"use client";

import { useState } from "react";
import { itineraries } from "@/lib/data";
import { TripCard } from "@/components/cards";

const DURATION_FILTERS = ["Any length", "3–7 days", "8–14 days"] as const;
type DurationFilter = (typeof DURATION_FILTERS)[number];

export default function Itineraries() {
  const [selectedDuration, setSelectedDuration] =
    useState<DurationFilter>("Any length");

  const filteredItineraries = itineraries.filter((trip) => {
    if (selectedDuration === "3–7 days") return trip.days <= 7;
    if (selectedDuration === "8–14 days") return trip.days > 7;
    return true;
  });

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Thoughtfully curated</span>
          <h1>Journeys worth remembering.</h1>
          <p>
            Find a route that fits your rhythm, from a short coastal escape to a
            deeper exploration of the island.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="filters" role="group" aria-label="Filter by trip length">
          {DURATION_FILTERS.map((duration) => {
            const isActive = selectedDuration === duration;

            return (
              <button
                key={duration}
                type="button"
                aria-pressed={isActive}
                className={`chip ${isActive ? "active" : ""}`}
                onClick={() => setSelectedDuration(duration)}
              >
                {duration}
              </button>
            );
          })}
        </div>

        <div className="trip-grid">
          {filteredItineraries.map((trip) => (
            <TripCard key={trip.slug} t={trip} />
          ))}
        </div>

        <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 25 }}>
          Prices are indicative examples, not live quotes. Confirm arrangements
          before booking.
        </p>
      </section>
    </main>
  );
}
