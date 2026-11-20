import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { destinations, itineraries } from "@/lib/data";
import { DestinationCard, TripCard } from "@/components/cards";

const featuredExperiences = [
  {
    title: "Wild encounters",
    description: "Observe wildlife with responsible guides.",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Highland journeys",
    description: "Tea country, misty trails, and mountain towns.",
    image:
      "https://images.unsplash.com/photo-1586613835341-3f1e7d0f2c52?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Coastal living",
    description: "Surf breaks, fishing villages, and sunsets.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=90"
          alt="Sri Lankan landscape"
        />
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">An island like no other</span>
            <h1>
              A little island.
              <br />A world of wonder.
            </h1>
            <p>
              Ancient kingdoms, mist-covered mountains, wild encounters, and
              slow days by the sea. Find your own way through Sri Lanka.
            </p>
            <div className="actions">
              <Link className="btn light" href="/destinations">
                Discover the island <ArrowUpRight size={15} />
              </Link>
              <Link
                className="btn outline"
                style={{ color: "white", borderColor: "#ffffff88" }}
                href="/itineraries"
              >
                Explore journeys <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section container">
        <div className="head">
          <div>
            <span className="eyebrow">The island, your way</span>
            <h2>Find your kind of paradise.</h2>
          </div>
          <p>
            From ancient citadels to quiet coves, every corner of Sri Lanka has
            a story worth slowing down for.
          </p>
        </div>

        <div className="grid-dest">
          {destinations.slice(0, 4).map((destination) => (
            <DestinationCard key={destination.slug} d={destination} />
          ))}
        </div>

        <p style={{ marginTop: 25 }}>
          <Link className="btn outline" href="/destinations">
            Explore all destinations →
          </Link>
        </p>
      </section>

      {/* Featured Itineraries */}
      <section className="section sand">
        <div className="container">
          <div className="head">
            <div>
              <span className="eyebrow">Journeys worth remembering</span>
              <h2>Made for the way you travel.</h2>
            </div>
            <p>
              Thoughtful routes, memorable places, and enough breathing room to
              make the journey your own.
            </p>
          </div>

          <div className="trip-grid">
            {itineraries.map((trip) => (
              <TripCard key={trip.slug} t={trip} />
            ))}
          </div>

          <p style={{ marginTop: 25 }}>
            <Link className="btn" href="/itineraries">
              Browse all itineraries →
            </Link>
          </p>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="section forest">
        <div className="container">
          <div className="head">
            <div>
              <span className="eyebrow">Feel more, see deeper</span>
              <h2>Experiences that stay with you.</h2>
            </div>
            <p>
              Meet the island through its people, landscapes, flavours, and wild
              places.
            </p>
          </div>

          <div className="exp-grid">
            {featuredExperiences.map((item) => (
              <Link href="/experiences" className="exp" key={item.title}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div>
                  <span className="eyebrow">Discover</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Callout */}
      <section className="quote">
        <span className="eyebrow">A different pace of travel</span>
        <blockquote>
          “The best journeys leave room for the unexpected — and bring you
          closer to the places you visit.”
        </blockquote>
        <Link className="btn" href="/contact">
          Let&apos;s plan yours ↗
        </Link>
      </section>
    </main>
  );
}
