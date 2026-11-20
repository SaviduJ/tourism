import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Destination = {
  slug: string;
  img: string;
  name: string;
  region: string;
  tag: string;
};

type Trip = {
  slug: string;
  img: string;
  title: string;
  days: number;
  style: string;
  intro: string;
  price: string;
};

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link className="dest" href={`/destinations/${d.slug}`}>
      <img src={d.img} alt={d.name} loading="lazy" />
      <div className="dest-info">
        <span className="eyebrow">{d.region}</span>
        <h3>{d.name}</h3>
        <p>{d.tag}</p>
      </div>
    </Link>
  );
}

export function TripCard({ t }: { t: Trip }) {
  return (
    <Link className="trip" href={`/itineraries/${t.slug}`}>
      <div className="trip-img">
        <img src={t.img} alt={t.title} loading="lazy" />
        <span className="days">{t.days} days</span>
      </div>

      <div className="trip-copy">
        <span className="eyebrow">{t.style}</span>
        <h3>{t.title}</h3>
        <p>{t.intro}</p>

        <div className="meta">
          <span>{t.price}</span>
          <span>
            Explore{" "}
            <ArrowUpRight
              size={13}
              style={{ display: "inline", verticalAlign: "middle" }}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
