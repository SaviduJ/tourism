import Link from "next/link";

const experiences = [
  {
    title: "Wildlife, respectfully",
    description: "Observe elephants and birdlife with responsible guides.",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Highland journeys",
    description: "Tea country, misty trails, waterfalls, and hill-town life.",
    image:
      "https://images.unsplash.com/photo-1586613835341-3f1e7d0f2c52?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Coastal living",
    description: "Surf breaks, fishing villages, long lunches, and sunsets.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Culture & cuisine",
    description: "Discover local stories, heritage sites, and island flavours.",
    image:
      "https://images.unsplash.com/photo-1588598198321-9735fd5f3f4b?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Experiences() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Feel more, see deeper</span>
          <h1>Experiences that stay with you.</h1>
          <p>
            Discover the island through landscapes, food, living heritage, and
            wildlife.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="trip-grid">
          {experiences.map((item) => (
            <article className="trip" key={item.title}>
              <div className="trip-img">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="trip-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link className="btn" href="/contact">
                  Plan an experience ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
