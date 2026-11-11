import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Leaf, Sparkles, UtensilsCrossed } from "lucide-react";
import {
  BREAD_OPTIONS,
  DIETARY_KEY,
  INDIAN_MENU_CATEGORIES,
  RICE_OPTIONS,
  type DietaryTag,
  type IndianMenuCategory,
} from "@/lib/indian-menu";
import { WA_MESSAGES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsApp";

const MENU_TABS = [
  { id: "all", label: "All Menu" },
  ...INDIAN_MENU_CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
  { id: "rice-breads", label: "Rice & Breads" },
] as const;

type DietaryFilter = "all" | "gf" | "veg";

function matchesDietaryFilter(tags: DietaryTag[] | undefined, filter: DietaryFilter): boolean {
  if (filter === "all") return true;
  if (!tags || tags.length === 0) return false;
  if (filter === "gf") return tags.includes("GF");
  if (filter === "veg") {
    return tags.some((t) => t === "Veg" || t === "VG" || t === "V" || t === "VGO");
  }
  return true;
}

function CategorySection({
  category,
  dietaryFilter,
}: {
  category: IndianMenuCategory;
  dietaryFilter: DietaryFilter;
}) {
  const items = category.items.filter((item) => {
    if (dietaryFilter === "veg" && category.id === "veg-starters") return true;
    if (dietaryFilter === "veg" && category.id === "vegetarian-mains") return true;
    if (dietaryFilter === "veg" && category.id === "desserts") return true;
    return matchesDietaryFilter(item.tags, dietaryFilter);
  });

  if (items.length === 0) return null;

  return (
    <article
      id={category.id}
      className="scroll-mt-28 rounded-3xl border border-[#E5D5C3] bg-[#FFFDF9] p-6 shadow-sm sm:p-10"
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5D5C3] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B84C32] uppercase">
            <Leaf className="h-3.5 w-3.5 text-[#173D32]" />
            Raj Indian Restaurant
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-[#173D32] sm:text-3xl">
            {category.title}
          </h3>
          {category.subtitle ? (
            <p className="mt-1.5 text-sm text-[#4B3026]/80 sm:text-base">{category.subtitle}</p>
          ) : null}
        </div>

        {category.priceBadge ? (
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#D9A441] bg-[#173D32] px-5 py-2 font-display text-base font-bold text-[#FFF8EF] shadow-md sm:text-lg">
            <Sparkles className="h-4 w-4 text-[#D9A441]" />
            {category.priceBadge}
          </span>
        ) : null}
      </header>

      <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col justify-between border-b border-dashed border-[#E5D5C3]/80 pb-5 last:border-b-0 md:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-lg font-bold text-[#173D32] sm:text-xl">
                    {item.name}
                  </h4>
                  {item.tags && item.tags.length > 0 ? (
                    <span className="inline-flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#173D32]/20 bg-[#EADCC9]/60 px-2 py-0.5 text-[11px] font-bold tracking-wide text-[#173D32]"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 font-display text-lg font-bold text-[#B84C32] sm:text-xl">
                  {item.price}
                </span>
              </div>
              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-[#4B3026]/85 sm:text-base">
                  {item.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

const NON_VEG_BREADS = new Set(["Chicken Naan", "Chicken & Cheese Naan"]);

function RiceAndBreadsSection({ dietaryFilter }: { dietaryFilter: DietaryFilter }) {
  const visibleBreads =
    dietaryFilter === "gf"
      ? []
      : dietaryFilter === "veg"
        ? BREAD_OPTIONS.filter((item) => !NON_VEG_BREADS.has(item.name))
        : BREAD_OPTIONS;

  return (
    <article
      id="rice-breads"
      className="scroll-mt-28 rounded-3xl border border-[#E5D5C3] bg-[#FFFDF9] p-6 shadow-sm sm:p-10"
    >
      <header className="border-b border-[#E5D5C3] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B84C32] uppercase">
          <Leaf className="h-3.5 w-3.5 text-[#173D32]" />
          Accompaniments
        </div>
        <h3 className="mt-2 font-display text-2xl font-bold text-[#173D32] sm:text-3xl">
          Rice &amp; Bread Sides
        </h3>
        <p className="mt-1.5 text-sm text-[#4B3026]/80 sm:text-base">
          Fragrant basmati rice options and fresh breads straight from the tandoor.
        </p>
      </header>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Rice Options */}
        <div>
          <h4 className="flex items-center gap-2 border-b border-[#E5D5C3] pb-3 font-display text-xl font-bold text-[#173D32]">
            Rice Options
          </h4>
          <ul className="mt-4 divide-y divide-dashed divide-[#E5D5C3]/80">
            {RICE_OPTIONS.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-base font-semibold text-[#4B3026]">{item.name}</span>
                <span className="shrink-0 font-display text-lg font-bold text-[#B84C32]">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Breads */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E5D5C3] pb-3">
            <h4 className="font-display text-xl font-bold text-[#173D32]">Breads</h4>
            <span className="text-sm font-medium italic text-[#B84C32]">
              Straight from the tandoor
            </span>
          </div>
          {visibleBreads.length > 0 ? (
            <ul className="mt-4 divide-y divide-dashed divide-[#E5D5C3]/80">
              {visibleBreads.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-base font-semibold text-[#4B3026]">{item.name}</span>
                  <span className="shrink-0 font-display text-lg font-bold text-[#B84C32]">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-[#E5D5C3] bg-[#FFF8EF] p-4 text-sm text-[#4B3026]/80">
              Tandoori breads contain wheat flour. Select one of our basmati rice sides or switch
              the dietary filter to see all breads.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function IndianDinnerMenu() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");

  const visibleCategories =
    activeTab === "all"
      ? INDIAN_MENU_CATEGORIES
      : INDIAN_MENU_CATEGORIES.filter((c) => c.id === activeTab);

  const showRiceAndBreads = activeTab === "all" || activeTab === "rice-breads";

  return (
    <section id="dinner-menu" className="bg-[#FFF8EF] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] text-[#B84C32] uppercase">
            <UtensilsCrossed className="h-4 w-4" />
            Dinner Menu
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-[#173D32] sm:text-5xl">
            Authentic Indian Dinner Menu
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4B3026]/85 sm:text-lg">
            Explore our freshly prepared starters, traditional curries, dum biryanis, tandoori
            breads, aromatic rice sides and classic Indian desserts.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {MENU_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  active
                    ? "bg-[#173D32] text-[#FFF8EF] shadow-md"
                    : "border border-[#E5D5C3] bg-white text-[#4B3026] hover:border-[#B84C32]/50 hover:bg-[#EADCC9]/40",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dietary Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs font-semibold tracking-wider text-[#6B554B] uppercase">
            Dietary Filter:
          </span>
          {(
            [
              { id: "all", label: "Show All" },
              { id: "veg", label: "Vegetarian & Vegan" },
              { id: "gf", label: "Gluten-Free (GF)" },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setDietaryFilter(f.id)}
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-semibold transition-colors",
                dietaryFilter === f.id
                  ? "bg-[#B84C32] text-[#FFF8EF]"
                  : "border border-[#E5D5C3] bg-[#FFFDF9] text-[#4B3026] hover:bg-[#EADCC9]/50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Menu Categories */}
        <div className="mt-12 space-y-8">
          {visibleCategories.map((category) => (
            <CategorySection key={category.id} category={category} dietaryFilter={dietaryFilter} />
          ))}

          {showRiceAndBreads ? <RiceAndBreadsSection dietaryFilter={dietaryFilter} /> : null}
        </div>

        {/* Dietary Key Legend */}
        <div className="mt-10 rounded-2xl border border-[#E5D5C3] bg-[#EADCC9]/40 px-6 py-5 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#173D32] uppercase">
            Dietary Key
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#4B3026] sm:text-sm">
            {DIETARY_KEY.map((entry) => (
              <span key={entry.code} className="inline-flex items-center gap-1.5">
                <span className="rounded bg-[#173D32] px-1.5 py-0.5 text-[11px] font-bold text-[#FFF8EF]">
                  {entry.code}
                </span>
                <span>{entry.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Order & Booking CTA */}
        <div className="mt-12 rounded-3xl bg-[#173D32] p-8 text-center text-[#FFF8EF] shadow-xl sm:p-10">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Join Us for Dinner or Order Takeaway
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#FFF8EF]/85 sm:text-base">
            Every curry and biryani is freshly made to order. Reserve your evening table online or
            message us directly on WhatsApp for takeaway and dietary questions.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              to="/book-a-table"
              className="inline-flex items-center gap-2 rounded-full bg-[#B84C32] px-7 py-3.5 text-sm font-semibold text-[#FFF8EF] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#C95F44]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Table for Dinner
            </Link>
            <WhatsAppButton variant="solid" message={WA_MESSAGES.takeaway}>
              Order Takeaway via WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
