import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { BagelCollection } from "@/components/site/BagelCollection";
import { BUSINESS } from "@/lib/site";
import breakfastRoll from "@/assets/breakfast-roll.webp";
import clubSandwich from "@/assets/club-sandwich.webp";
import burgers from "@/assets/burgers.webp";
import coffeeCounter from "@/assets/coffee-counter.webp";

export const Route = createFileRoute("/day-menu")({
  head: () => ({
    meta: [
      {
        title: "Day Menu | Monty Cafe & Restaurant — Breakfast, Brunch & Lunch in Montmorency",
      },
      {
        name: "description",
        content:
          "Monty Cafe's daytime menu — all-day breakfast, eggs Benedict, avocado crush, buttermilk pancakes, fresh bagels, gourmet sandwiches, burgers and barista-made coffee.",
      },
    ],
    links: [{ rel: "canonical", href: "https://montycafe.com.au/day-menu" }],
  }),
  component: DayMenuPage,
});

const DAY_ITEMS = [
  { image: breakfastRoll, alt: "Freshly prepared breakfast roll with fried egg and hashbrown at Monty Cafe", title: "All-Day Breakfast", text: "Eggs Benedict, avocado crush, buttermilk pancakes, breakfast burgers and more — served all day." },
  { image: clubSandwich, alt: "Club sandwich with hot chips at Monty Cafe", title: "Gourmet Sandwiches", text: "Club sandwiches, gourmet sandwiches and homestyle lunch favourites, made fresh to order." },
  { image: burgers, alt: "Juicy burgers with chips served on red-check paper at Monty Cafe", title: "Burgers", text: "Juicy burgers with chips — a proper lunch that hits the spot every time." },
  { image: coffeeCounter, alt: "Barista coffee machine at the Monty Cafe counter", title: "Barista Coffee", text: "Quality coffee made with care — flat whites, lattes, long blacks and more." },
] as const;

function DayMenuPage() {
  return (
    <>
      <PageHero
        image={breakfastRoll}
        imageAlt="Freshly prepared breakfast at Monty Cafe Montmorency"
        eyebrow="Day Menu"
        title="Breakfast, Brunch & Lunch — All Day"
        subtitle="Freshly prepared favourites from morning to afternoon, seven days a week."
      />

      <section className="bg-sand/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              The Daytime Menu
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
              A Cafe for Every Morning
            </h2>
            <p className="mt-4 text-muted-foreground">
              From sunrise coffees to leisurely lunches, everything on our daytime menu is freshly
              prepared and made to be enjoyed slowly.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DAY_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <article className="group h-full overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-forest">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <a
              href={BUSINESS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Full Menu on Our Website
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>

      <BagelCollection />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
              Hungry for More?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our full menu has even more breakfast classics, lunch favourites, sweet treats and
              specialty coffees. Drop in or check out the complete menu online.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-lg"
              >
                Book a Table
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/indian-dinner"
                className="group inline-flex items-center gap-2 rounded-full border border-forest/40 px-8 py-3.5 text-sm font-semibold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-cream"
              >
                Explore Indian Dinner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
