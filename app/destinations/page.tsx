"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import { DestinationCard } from "@/components/cards";

const CATEGORIES = ["All", "Culture", "Nature", "Beach", "Wildlife"] as const;

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredDestinations = destinations.filter(
    (destination) =>
      selectedCategory === "All" || destination.category === selectedCategory
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Discover the island</span>
          <h1>Every place has a story.</h1>
          <p>
            Explore the regions, landscapes, and living traditions that make Sri
            Lanka unforgettable.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="filters" role="group" aria-label="Filter destinations">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                className={`chip ${isActive ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid-dest">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.slug} d={destination} />
          ))}
        </div>
      </section>
    </main>
  );
}
