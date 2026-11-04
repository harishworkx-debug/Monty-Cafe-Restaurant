import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import montyLogo from "@/assets/monty-logo.png";
import { BUSINESS, HOURS } from "@/lib/site";

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact & Bookings", to: "/contact" },
] as const;

const EXPERIENCE_LINKS = [
  { label: "Day Menu", to: "/day-menu" },
  { label: "Indian Dinner", to: "/indian-dinner" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream/85">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src={montyLogo}
              alt="Monty Cafe & Restaurant logo"
              className="h-16 w-auto rounded-xl bg-cream p-2"
              width={160}
              height={76}
            />
            <p className="mt-5 text-sm leading-relaxed">
              Your neighbourhood cafe on Were Street — fresh flavours, quality coffee and warm
              hospitality by day, comforting Indian dinner by night.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="font-display text-lg font-semibold text-cream">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-terracotta-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-display text-lg font-semibold text-cream">Our Food</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {EXPERIENCE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-terracotta-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream">Visit Us</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-light" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-terracotta-light" />
                <a href={BUSINESS.phoneHref} className="transition-colors hover:text-terracotta-light">
                  {BUSINESS.phone}
                </a>
              </li>
            </ul>
            <a
              href={BUSINESS.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full border border-cream/40 px-5 py-2 text-sm font-semibold transition-colors hover:bg-cream hover:text-forest-deep"
            >
              Get Directions
            </a>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream">Opening Hours</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-light" />
                <span>
                  <strong className="text-cream">Cafe</strong>
                  {HOURS.map((row) => (
                    <span key={row.day} className="block">
                      {row.day.slice(0, 3)}: {row.cafe}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-light" />
                <span>
                  <strong className="text-cream">Indian Dinner</strong>
                  {HOURS.filter((row) => row.dinner).map((row) => (
                    <span key={row.day} className="block">
                      {row.day.slice(0, 3)}: {row.dinner}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-cream/60">
              Hours may vary on public holidays — please call to confirm.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-2 border-t border-cream/15 pt-8 text-center">
          <p className="font-display text-lg text-terracotta-light">
            Good Food. Great Coffee. Wonderful Company.
          </p>
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} {BUSINESS.name} — {BUSINESS.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
