import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { OpeningHours } from "@/components/site/OpeningHours";
import { IndianDinnerMenu } from "@/components/site/IndianDinnerMenu";
import { DINNER_NOTE, WA_MESSAGES } from "@/lib/site";
import { WhatsAppButton } from "@/components/site/WhatsApp";
import indianCurry from "@/assets/indian-curry.webp";
import parmigiana from "@/assets/parmigiana.webp";

export const Route = createFileRoute("/indian-dinner")({
  head: () => ({
    meta: [
      {
        title: "Indian Dinner | Raj Indian Restaurant at Monty — Montmorency",
      },
      {
        name: "description",
        content:
          "Authentic Indian dinner at Monty Cafe & Restaurant — curries, vegetarian favourites, chicken curry and traditional flavours, Thursday to Sunday, 5 PM – 9 PM in Montmorency.",
      },
    ],
    links: [{ rel: "canonical", href: "https://montycafe.com.au/indian-dinner" }],
  }),
  component: IndianDinnerPage,
});

const DINNER_HIGHLIGHTS = [
  {
    title: "Authentic Curries",
    text: "Rich, slow-cooked curry classics made with traditional spices and deep, layered flavours.",
  },
  {
    title: "Vegetarian Favourites",
    text: "Beautifully spiced vegetarian dishes — generous, comforting and full of colour.",
  },
  {
    title: "Chicken Curry Classics",
    text: "Tender chicken in aromatic, flavour-packed sauces that keep regulars coming back.",
  },
  {
    title: "Freshly Prepared Meals",
    text: "Every dish is made to order — nothing pre-made, everything fresh from the kitchen.",
  },
  {
    title: "Traditional Flavours",
    text: "Recipes rooted in tradition, bringing the warmth of Indian home cooking to Were Street.",
  },
  {
    title: "Family-Style Dining",
    text: "Order a spread and share it the way Indian food is meant to be enjoyed — together.",
  },
] as const;

function IndianDinnerPage() {
  return (
    <>
      <PageHero
        image={indianCurry}
        imageAlt="Authentic Indian curries with rice served in copper bowls at Monty Restaurant"
        eyebrow="Indian Dinner"
        title="Evenings Made Better with Indian Flavours"
        subtitle="Raj Indian Restaurant — comforting curries, aromatic spices and traditional favourites, Thursday to Sunday."
      />

      <section className="relative overflow-hidden bg-forest-deep py-20 text-cream lg:py-28">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-5 -right-5 hidden h-full w-full rounded-3xl border-2 border-terracotta/50 lg:block" />
              <img
                src={indianCurry}
                alt="Indian curries with rice served at Monty's evening restaurant"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
                loading="lazy"
              />
              <img
                src={parmigiana}
                alt="Homestyle dinner served at Monty Restaurant"
                className="animate-float-y absolute -bottom-10 -left-4 hidden w-44 rounded-2xl border-4 border-forest-deep object-cover shadow-xl sm:block lg:-left-8 lg:w-52"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta-light">
                Raj Indian Restaurant
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-cream sm:text-4xl">
                A Taste of India, Right Here in Monty.
              </h2>
              <p className="mt-5 leading-relaxed text-cream/85">
                When the coffee machines cool down, the spices come out. Our evening dining room
                serves comforting Indian food — the kind that turns a weeknight into an occasion.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {DINNER_HIGHLIGHTS.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  >
                    <h3 className="font-display text-base font-semibold text-terracotta-light">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/75">{item.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-3 rounded-2xl bg-terracotta/15 p-4 text-sm text-cream/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta font-display font-bold text-cream">
                  5
                </span>
                Dinner Thursday – Sunday, 5 PM – 9 PM. Hours can change — please call to confirm
                before your visit.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#dinner-menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-forest-deep transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  View Full Dinner Menu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  to="/book-a-table"
                  className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-lg"
                >
                  Book for Dinner
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/day-menu"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-cream hover:text-forest-deep"
                >
                  See the Day Menu
                </Link>
                <WhatsAppButton variant="onDark" message={WA_MESSAGES.indianDinner}>
                  Ask on WhatsApp
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <IndianDinnerMenu />

      <section className="bg-sand/50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              Dinner Hours
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
              When to Join Us
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{DINNER_NOTE}</p>
            <div className="mt-8">
              <Link
                to="/book-a-table"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book a Table for Dinner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OpeningHours />
    </>
  );
}
