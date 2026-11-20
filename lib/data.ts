export type DestinationCategory = "Culture" | "Nature" | "Beach" | "Wildlife";

export interface Destination {
  slug: string;
  name: string;
  region: string;
  tag: string;
  desc: string;
  img: string;
  best: string;
  stay: string;
  category: DestinationCategory;
}

export interface Itinerary {
  slug: string;
  title: string;
  days: number;
  style: string;
  price: string;
  intro: string;
  img: string;
  route: string[];
  daily: [string, string][];
}

export const destinations: Destination[] = [
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "Cultural Triangle",
    tag: "Where history reaches the sky",
    desc: "Rise early for the ancient rock fortress, wander through water gardens, and discover the extraordinary stories of Sri Lanka's cultural heart.",
    img: "https://images.unsplash.com/photo-1588598198321-9735fd5f3f4b?auto=format&fit=crop&w=1000&q=85",
    best: "January–April",
    stay: "2 days",
    category: "Culture",
  },
  {
    slug: "ella",
    name: "Ella",
    region: "Hill Country",
    tag: "Slow mornings in the highlands",
    desc: "Walk among tea-covered hills, watch the famous train cross the Nine Arch Bridge, and follow trails into misty mountain landscapes.",
    img: "https://images.unsplash.com/photo-1586613835341-3f1e7d0f2c52?auto=format&fit=crop&w=1000&q=85",
    best: "January–May",
    stay: "2–3 days",
    category: "Nature",
  },
  {
    slug: "galle",
    name: "Galle Fort",
    region: "Southern Coast",
    tag: "Colonial charm by the sea",
    desc: "Explore lantern-lit lanes, independent boutiques, historic ramparts, and slow evenings above the Indian Ocean.",
    img: "https://images.unsplash.com/photo-1586183189334-6d2c5c9f6f45?auto=format&fit=crop&w=1000&q=85",
    best: "December–April",
    stay: "1–2 days",
    category: "Culture",
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    region: "South Coast",
    tag: "A softer kind of coastal life",
    desc: "Palm-fringed beaches, cafés, surf breaks, and sunsets over the southern ocean.",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
    best: "December–April",
    stay: "2–3 days",
    category: "Beach",
  },
  {
    slug: "kandy",
    name: "Kandy",
    region: "Central Highlands",
    tag: "Tradition in a green valley",
    desc: "Visit the Temple of the Sacred Tooth Relic, walk around the lake, and discover dance, craft, and hill-country heritage.",
    img: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?auto=format&fit=crop&w=1000&q=85",
    best: "January–April",
    stay: "1–2 days",
    category: "Culture",
  },
  {
    slug: "udawalawe",
    name: "Udawalawe",
    region: "Wildlife Country",
    tag: "Meet the island's wild side",
    desc: "Join a guided safari through open grasslands and dry forest in search of elephants and abundant birdlife.",
    img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=85",
    best: "May–September",
    stay: "1–2 days",
    category: "Wildlife",
  },
];

export const itineraries: Itinerary[] = [
  {
    slug: "island-highlights",
    title: "The Island Highlights",
    days: 7,
    style: "Culture · Highlands · Coast",
    price: "From $950 per person",
    intro:
      "A balanced first journey through iconic cultural sites, misty highlands, and sunlit southern shores.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    route: ["Negombo", "Sigiriya", "Kandy", "Ella", "Galle"],
    daily: [
      [
        "Arrival & settle in",
        "Arrive near Colombo, transfer to your hotel, and enjoy a relaxed dinner.",
      ],
      [
        "Ancient Sigiriya",
        "Explore the water gardens and climb Sigiriya Rock Fortress before the midday heat.",
      ],
      [
        "Culture to Kandy",
        "Visit Dambulla Cave Temple, then discover Kandy's lakefront and sacred temple.",
      ],
      [
        "Into the highlands",
        "Travel through tea country toward Ella, stopping at viewpoints and a tea estate.",
      ],
      [
        "Ella at your pace",
        "Walk to Little Adam's Peak, visit Nine Arch Bridge, and enjoy a leisurely evening.",
      ],
      [
        "South to the sea",
        "Travel toward Galle and explore the old fort's ramparts and independent shops.",
      ],
      [
        "A gentle farewell",
        "Enjoy breakfast by the coast before your airport transfer, allowing time for traffic.",
      ],
    ],
  },
  {
    slug: "slow-escape",
    title: "The Slow Escape",
    days: 5,
    style: "Boutique stays · Coast · Wellness",
    price: "From $720 per person",
    intro:
      "Five restorative days of coastal hideaways, unhurried mornings, thoughtful food, and small discoveries.",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85",
    route: ["Colombo", "Galle", "Weligama", "Mirissa"],
    daily: [
      [
        "Arrival on the coast",
        "Settle into a boutique stay and keep the afternoon free for a swim or sunset walk.",
      ],
      [
        "Discover Galle Fort",
        "Explore the historic fort, galleries, cafés, and ramparts with a local guide.",
      ],
      [
        "Coastal rituals",
        "Choose a surf lesson, yoga session, cooking experience, or a long beach afternoon.",
      ],
      [
        "Ocean and village life",
        "Visit fishing villages and quiet coves. Whale watching is seasonal and sea-dependent.",
      ],
      [
        "A slow goodbye",
        "Enjoy a leisurely breakfast before your transfer toward Colombo or the airport.",
      ],
    ],
  },
  {
    slug: "wild-island",
    title: "The Wild Island",
    days: 14,
    style: "Wildlife · Adventure · Culture",
    price: "From $1,850 per person",
    intro:
      "A deeper journey linking ancient cities, mountain trails, wildlife-rich landscapes, and remote-feeling beaches.",
    img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=85",
    route: [
      "Negombo",
      "Anuradhapura",
      "Sigiriya",
      "Kandy",
      "Ella",
      "Udawalawe",
      "Yala",
      "Tangalle",
    ],
    daily: [
      [
        "Arrive & unwind",
        "Arrive in Sri Lanka and settle in near the coast.",
      ],
      [
        "Ancient Anuradhapura",
        "Explore sacred sites and ancient reservoirs with a knowledgeable guide.",
      ],
      [
        "The Cultural Triangle",
        "Discover Sigiriya's rock fortress and surrounding landscape.",
      ],
      [
        "Cave temples & villages",
        "Visit Dambulla and enjoy a village lunch or countryside cycle.",
      ],
      [
        "Kandy heritage",
        "Explore the temple, lake, and cultural traditions of the hill capital.",
      ],
      [
        "Tea country journey",
        "Travel through lush highlands, stopping at tea gardens and viewpoints.",
      ],
      [
        "Ella trails",
        "Walk a scenic hill trail and see the Nine Arch Bridge.",
      ],
      [
        "Into elephant country",
        "Head south toward Udawalawe.",
      ],
      [
        "Safari morning",
        "Join a responsible guided safari, following park rules.",
      ],
      [
        "Yala wilderness",
        "Explore another wildlife region, subject to conditions.",
      ],
      [
        "Wild coast",
        "Continue to the southern coast for rest and beach time.",
      ],
      [
        "Ocean and village life",
        "Choose a coastal walk, local food experience, or seasonal ocean excursion.",
      ],
      [
        "Galle's living history",
        "Explore the historic fort, cafés, and craft shops.",
      ],
      [
        "Departure",
        "Return toward Colombo or the airport with time for traffic and check-in.",
      ],
    ],
  },
];
