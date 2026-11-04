import { Link } from "@tanstack/react-router";
import { Sun, MoonStar, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import coffeeCounter from "@/assets/coffee-counter.webp";
import indianCurry from "@/assets/indian-curry.webp";

export function StorySection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Image side */}
        <Reveal className="relative">
          <div className="relative">
            <div className="absolute -top-5 -left-5 hidden h-full w-full rounded-3xl border-2 border-terracotta/40 lg:block" />
            <img
              src={coffeeCounter}
              alt="Monty Cafe's coffee counter with barista-made coffee and menu boards"
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
              loading="lazy"
            />
            <img
              src={indianCurry}
              alt="Indian curry dinner served at Monty Restaurant"
              className="animate-float-y absolute -right-4 -bottom-10 hidden w-44 rounded-2xl border-4 border-cream object-cover shadow-xl sm:block lg:-right-8 lg:w-56"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Text side */}
        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              Our Story
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold text-forest sm:text-4xl lg:text-[2.75rem]">
              Community Cafe by Day, Indian Restaurant by Night.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Monty sits in the heart of Were Street, bringing together everything a neighbourhood
              should have: a welcoming cafe for your mornings, a kitchen for lazy lunches and a warm
              Indian dining room for the evenings.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 space-y-6">
            <div className="flex gap-4 rounded-2xl bg-sand/70 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-forest">
                  By Day — Monty Cafe
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Breakfast, brunch and lunch done right: fresh bagels, gourmet sandwiches, golden
                  pancakes and quality barista-made coffee.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl bg-forest p-5 text-cream">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream">
                <MoonStar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-cream">
                  By Night — Raj Indian Restaurant
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-cream/85">
                  Comforting curries, aromatic spices and traditional favourites — the flavours of
                  India, served with Monty's warm hospitality.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-8 flex flex-wrap gap-4">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
