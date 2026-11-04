import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { BAGELS, WA_MESSAGES } from "@/lib/site";
import { WhatsAppButton } from "./WhatsApp";
import bagelMenuPoster from "@/assets/bagel-menu.webp";

/**
 * Signature bagel collection.
 * Names, descriptions and prices come from src/lib/site.ts — update them there.
 */
export function BagelCollection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_380px]">
          <div>
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
                Signature Collection
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
                Fresh Bagels, Made to Love.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Baked fresh, filled generously. Our bagel menu has something for everyone —
                savoury brekky classics, hearty lunch fillings and sweet finishes.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2">
              {BAGELS.map((bagel, i) => (
                <Reveal key={bagel.name} delay={(i % 2) * 110}>
                  <li className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:ring-terracotta/50 hover:shadow-xl">
                    <span
                      aria-hidden
                      className="absolute -top-6 -right-3 font-display text-[5.5rem] leading-none font-bold text-sand/80 transition-colors duration-500 group-hover:text-terracotta/25"
                    >
                      {i + 1}
                    </span>
                    <div className="relative">
                      <h3 className="font-display text-xl font-semibold text-forest">{bagel.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{bagel.description}</p>
                    </div>
                    <p className="relative mt-5 font-display text-2xl font-semibold text-terracotta">
                      ${bagel.price}
                      <span className="ml-2 font-body text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        only
                      </span>
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={150} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://montycafe.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                View Full Menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/day-menu"
                className="text-sm font-semibold text-forest underline decoration-terracotta decoration-2 underline-offset-4 transition-colors hover:text-terracotta"
              >
                See the whole day menu
              </Link>
              <WhatsAppButton message={WA_MESSAGES.bagels}>Enquire about bagels</WhatsAppButton>
            </Reveal>
          </div>

          {/* Menu poster */}
          <Reveal delay={100} className="lg:sticky lg:top-28">
            <figure className="overflow-hidden rounded-3xl bg-card shadow-xl ring-1 ring-border">
              <img
                src={bagelMenuPoster}
                alt="Monty Cafe bagel menu poster listing all eight bagels with prices"
                className="w-full object-cover"
                loading="lazy"
              />
              <figcaption className="bg-forest px-6 py-4 text-center text-sm text-cream/85">
                Straight from our Were Street counter — the real Monty bagel board.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
