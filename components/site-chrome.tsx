"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our story", href: "/about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="container">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">
          <span className="mark" aria-hidden="true">
            ✳
          </span>
          <span>
            <span className="brand-name">CEYLON</span>
            <span className="brand-tag">BEYOND THE ORDINARY</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link className="btn" href="/contact">
          Plan your journey <ArrowUpRight size={14} />
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/" style={{ color: "#f5f1e8" }}>
              <span className="mark" aria-hidden="true">
                ✳
              </span>
              <span>
                <span className="brand-name">CEYLON</span>
                <span className="brand-tag">BEYOND THE ORDINARY</span>
              </span>
            </Link>
            <p>
              Thoughtfully curated journeys for curious travellers. Discover Sri
              Lanka beyond the expected.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <p>
              <Link href="/destinations">Destinations</Link>
              <br />
              <Link href="/itineraries">Itineraries</Link>
              <br />
              <Link href="/experiences">Experiences</Link>
            </p>
          </div>

          <div>
            <h4>Get in touch</h4>
            <p>
              <Link href="/contact">Plan a journey</Link>
              <br />
              <Link href="/about">Our story</Link>
              <br />
              Sri Lanka · Indian Ocean
            </p>
          </div>
        </div>

        <div className="bottom">
          <Link href="/admin" prefetch={false}>Staff sign in</Link>

          <span>
            © {new Date().getFullYear()} CEYLON. Made for meaningful journeys.
          </span>
          <span>Travel thoughtfully. Leave a lighter footprint.</span>
        </div>
      </div>
    </footer>

  );
}
