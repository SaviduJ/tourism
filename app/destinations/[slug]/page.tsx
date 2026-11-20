import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations } from "@/lib/data";

type DetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default async function Detail({ params }: DetailProps) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Link href="/destinations">← All destinations</Link>
          <p className="eyebrow" style={{ marginTop: 25 }}>
            {destination.region}
          </p>
          <h1>{destination.name}</h1>
          <p>{destination.tag}</p>
        </div>
      </section>

      <section className="section container">
        <div className="detail">
          <div>
            <img
              className="detail-img"
              src={destination.img}
              alt={destination.name}
            />
            <h2>Get to know {destination.name}</h2>
            <p>{destination.desc}</p>

            <h2>Make it part of your journey</h2>
            <p>
              Travel with local guides where possible, respect local customs,
              and confirm opening times and seasonal conditions before
              departure.
            </p>
            <Link className="btn" href="/itineraries">
              Find an itinerary →
            </Link>
          </div>

          <aside className="side">
            <h3>At a glance</h3>
            <p>
              <strong>Region</strong>
              <br />
              {destination.region}
            </p>
            <p>
              <strong>Suggested stay</strong>
              <br />
              {destination.stay}
            </p>
            <p>
              <strong>Often best visited</strong>
              <br />
              {destination.best}
            </p>
            <p>
              Dress appropriately at religious sites and choose responsible local
              operators.
            </p>
            <Link className="btn" href="/contact">
              Plan a visit
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
