import { Croissant, Coffee, Sun, Flame, HeartHandshake, ShoppingBag } from "lucide-react";
import { Reveal } from "./Reveal";

const REASONS = [
  {
    icon: Croissant,
    title: "Freshly Prepared Food",
    text: "Everything on the plate is made fresh — breakfast, bagels, sandwiches and lunch classics.",
  },
  {
    icon: Coffee,
    title: "Quality Coffee",
    text: "Barista-made coffee with care in every cup, whether it's your first or your fourth.",
  },
  {
    icon: Sun,
    title: "Breakfast, Brunch & Lunch",
    text: "One menu for every mood — sunrise breakfasts, lazy brunches and proper lunches.",
  },
  {
    icon: Flame,
    title: "Indian Dinner",
    text: "Authentic curries and traditional favourites, Thursday to Sunday evenings.",
  },
  {
    icon: HeartHandshake,
    title: "Friendly Neighbourhood Vibe",
    text: "A warm, welcoming local spot where regulars are family and newcomers are friends.",
  },
  {
    icon: ShoppingBag,
    title: "Dine In or Takeaway",
    text: "Sit down and stay a while, or grab your favourites to go.",
  },
] as const;

export function WhyVisit() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
            Why Visit Monty
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
            A Local Place Worth Coming Back To
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 3) * 110} as="li" className="list-none">
              <div className="group flex h-full flex-col items-start rounded-3xl bg-card p-7 ring-1 ring-border transition-all duration-500 hover:-translate-y-1.5 hover:ring-terracotta/50 hover:shadow-xl">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-sand text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-cream">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-forest">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
