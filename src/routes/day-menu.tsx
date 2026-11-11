import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { DayMenuBoard, type DayMenuTab } from "@/components/site/DayMenuBoard";
import { WA_MESSAGES } from "@/lib/site";
import { WhatsAppButton } from "@/components/site/WhatsApp";
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

const DAY_ITEMS: readonly {
  image: string;
  alt: string;
  title: string;
  text: string;
  tab: DayMenuTab;
}[] = [
  {
    image: breakfastRoll,
    alt: "Freshly prepared breakfast roll with fried egg and hashbrown at Monty Cafe",
    title: "All-Day Breakfast",
    text: "Eggs Benedict, avocado crush, buttermilk pancakes, chilli eggs fusion and more — served all day.",
    tab: "breakfast",
  },
  {
    image: clubSandwich,
    alt: "Club sandwich with hot chips at Monty Cafe",
    title: "Grab & Go + Lunch",
    text: "Bagels, focaccias, toasties & burritos from the counter alongside gourmet sandwiches, schnitzels & parmas.",
    tab: "grab-and-go",
  },
  {
    image: burgers,
    alt: "Juicy burgers with chips served on red-check paper at Monty Cafe",
    title: "Burgers & Pasta",
    text: "Gourmet beef, fried chicken & veggie burgers with chips plus handcrafted gnocchi & pasta.",
    tab: "burgers",
  },
  {
    image: coffeeCounter,
    alt: "Barista coffee machine at the Monty Cafe counter",
    title: "Barista Coffee & Drinks",
    text: "Specialty espresso, milk alternatives, iced coffees, thickshakes, smoothies and herbal teas.",
    tab: "drinks",
  },
];

function DayMenuPage() {
  const [activeTab, setActiveTab] = useState<DayMenuTab>("all");

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
              From sunrise coffees and Grab &amp; Go counter bites to leisurely lunches, everything
              on our daytime menu is freshly prepared and made to enjoy slowly.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DAY_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <a
                  href="#day-menu-board"
                  onClick={() => setActiveTab(item.tab)}
                  className="group block h-full overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
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
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <a
              href="#day-menu-board"
              onClick={() => setActiveTab("all")}
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Browse Complete Day Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>

      <DayMenuBoard activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
              Planning a Visit?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Joining us for all-day breakfast, coffee or an evening curry? Book your table online
              or message us on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/book-a-table"
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
              <WhatsAppButton message={WA_MESSAGES.dayMenu}>Ask about the day menu</WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
