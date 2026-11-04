import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { WhyVisit } from "@/components/site/WhyVisit";
import { OpeningHours } from "@/components/site/OpeningHours";
import { BUSINESS } from "@/lib/site";
import cafeInterior from "@/assets/cafe-interior.webp";
import coffeeCounter from "@/assets/coffee-counter.webp";
import indianCurry from "@/assets/indian-curry.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Monty Cafe & Restaurant | Montmorency's Neighbourhood Spot",
      },
      {
        name: "description",
        content:
          "Monty Cafe & Restaurant on Were Street, Montmorency — a welcoming cafe by day serving breakfast, brunch and coffee, and an Indian restaurant by night.",
      },
    ],
    links: [{ rel: "canonical", href: "https://montycafe.com.au/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        image={cafeInterior}
        imageAlt="Inside Monty Cafe — warm, busy dining room on Were Street, Montmorency"
        eyebrow="About Us"
        title="Two Experiences, One Were Street Address"
        subtitle="Community cafe by day, Indian restaurant by night — Monty is Montmorency's welcoming local spot."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative">
            <div className="relative">
              <div className="absolute -top-5 -left-5 hidden h-full w-full rounded-3xl border-2 border-terracotta/40 lg:block" />
              <img
                src={coffeeCounter}
                alt="Monty Cafe's coffee counter with barista-made coffee and menu boards"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
                Our Story
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
                A Neighbourhood Cafe with Heart
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Monty Cafe & Restaurant sits in the heart of Were Street, Montmorency — a place
                where locals gather for their morning coffee, friends meet over brunch, and families
                come together for a memorable Indian dinner.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                By day, we're a classic Melbourne neighbourhood cafe: all-day breakfast, fresh
                bagels, gourmet sandwiches and quality barista-made coffee. By night, the kitchen
                transforms into Raj Indian Restaurant, serving comforting curries, aromatic spices
                and traditional favourites.
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-8 rounded-3xl bg-sand/70 p-7">
              <h3 className="font-display text-xl font-semibold text-forest">
                Two Experiences Under One Roof
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-forest" />
                  <span>
                    <strong className="text-forest">By Day:</strong> Breakfast, brunch, lunch, fresh
                    bagels and barista coffee — 7 days a week.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-terracotta" />
                  <span>
                    <strong className="text-forest">By Night:</strong> Authentic Indian dinner —
                    curries, vegetarian dishes and family-style dining, Thursday to Sunday.
                  </span>
                </li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  to="/day-menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explore the Day Menu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/indian-dinner"
                  className="group inline-flex items-center gap-2 rounded-full border border-forest/40 px-7 py-3 text-sm font-semibold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-cream"
                >
                  Indian Dinner
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-deep py-20 text-cream lg:py-28">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="order-1 lg:order-1">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta-light">
                Evenings at Monty
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-cream sm:text-4xl">
                Raj Indian Restaurant
              </h2>
              <p className="mt-5 leading-relaxed text-cream/85">
                When the cafe closes for the afternoon, the spices come out. Raj Indian Restaurant
                takes over the dining room with comforting, freshly prepared Indian meals — the kind
                that turn a weeknight into an occasion.
              </p>
              <p className="mt-4 leading-relaxed text-cream/75">
                From rich, slow-cooked curries to beautifully spiced vegetarian dishes, every meal
                is made to be shared with family and friends. Dinner is served Thursday to Sunday, 5
                PM to 9 PM.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120} className="order-2 lg:order-2">
            <img
              src={indianCurry}
              alt="Authentic Indian curries with rice served in copper bowls at Monty Restaurant"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <WhyVisit />
      <OpeningHours />
    </>
  );
}
