import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import breakfastRoll from "@/assets/breakfast-roll.webp";
import clubSandwich from "@/assets/club-sandwich.webp";
import burgers from "@/assets/burgers.webp";
import coffeeCounter from "@/assets/coffee-counter.webp";
import indianCurry from "@/assets/indian-curry.webp";
import parmigiana from "@/assets/parmigiana.webp";
import { DINNER_NOTE } from "@/lib/site";

const DAY_CARDS = [
  {
    image: breakfastRoll,
    alt: "Freshly prepared breakfast roll with fried egg and hashbrown at Monty Cafe",
    title: "All-Day Breakfast",
    text: "Eggs Benedict, Avocado Crush, buttermilk pancakes, breakfast burgers and more — served all day.",
  },
  {
    image: clubSandwich,
    alt: "Club sandwich with hot chips at Monty Cafe",
    title: "Lunch & Sandwiches",
    text: "Gourmet sandwiches, club sandwiches, burgers and homestyle lunch favourites, made to order.",
  },
  {
    image: burgers,
    alt: "Juicy burgers with chips served on red-check paper at Monty Cafe",
    title: "Burgers & Bagels",
    text: "Juicy burgers and our famous fresh bagels — from classic BLT to indulgent Biscoff.",
  },
  {
    image: coffeeCounter,
    alt: "Barista coffee machine at the Monty Cafe counter",
    title: "Barista Coffee",
    text: "Quality coffee made with care — your flat white, latte or long black, brewed to perfection.",
  },
] as const;

const DINNER_HIGHLIGHTS = [
  { title: "Authentic Curries", text: "Rich, slow-cooked curry classics made with traditional spices." },
  { title: "Vegetarian Favourites", text: "Beautifully spiced vegetarian dishes, generous and comforting." },
  { title: "Chicken Curry Classics", text: "Tender chicken in aromatic, flavour-packed sauces." },
  { title: "Family-Style Dining", text: "Order a spread and share it the way Indian food is meant to be enjoyed." },
] as const;

export function FoodExperience() {
  return (
    <>
      {/* ---------- Daytime ---------- */}
      <section className="bg-sand/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              The Monty Experience
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
              A Cafe for Every Morning
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From sunrise coffees to leisurely lunches, everything on our daytime menu is freshly
              prepared and made to be enjoyed slowly.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DAY_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 110}>
                <article className="group h-full overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-forest">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <Link
              to="/day-menu"
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View the Full Day Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Evening ---------- */}
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
                alt="Homestyle chicken parmigiana dinner at Monty Restaurant"
                className="animate-float-y absolute -bottom-10 -left-4 hidden w-44 rounded-2xl border-4 border-forest-deep object-cover shadow-xl sm:block lg:-left-8 lg:w-52"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta-light">
                Evenings at Monty
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-cream sm:text-4xl">
                Evenings Made Better with Indian Flavours.
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
                <Link
                  to="/indian-dinner"
                  className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-lg"
                >
                  Explore Indian Dinner
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-cream hover:text-forest-deep"
                >
                  Book for Dinner
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
