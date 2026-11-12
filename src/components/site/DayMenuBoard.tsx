import { useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Baby,
  CalendarCheck,
  ChevronDown,
  CircleDot,
  Coffee,
  Croissant,
  CupSoda,
  Flame,
  Leaf,
  Salad,
  Sandwich,
  Sparkles,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import {
  ALLERGY_NOTICE,
  BARISTA_COFFEE,
  COLD_DRINKS_AND_TEA,
  DAY_DIETARY_KEY,
  DAY_FOOD_CATEGORIES,
  EXTRAS_GROUPS,
  GRAB_AND_GO_SECTIONS,
  type DayDietaryTag,
  type DayMenuCategory,
  type DayMenuItem,
  type GrabAndGoSection,
} from "@/lib/day-menu";
import { WA_MESSAGES } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsApp";

export type DayMenuTab =
  | "all"
  | "breakfast"
  | "grab-and-go"
  | "lunch"
  | "burgers"
  | "pasta"
  | "salads"
  | "drinks"
  | "kids";

type DayDietaryFilter = "all" | "veg" | "gf";

const DAY_MENU_TABS: { id: DayMenuTab; label: string }[] = [
  { id: "all", label: "All Day Menu" },
  { id: "breakfast", label: "All-Day Breakfast" },
  { id: "grab-and-go", label: "Grab & Go" },
  { id: "lunch", label: "Lunch" },
  { id: "burgers", label: "Burgers" },
  { id: "pasta", label: "Pasta" },
  { id: "salads", label: "Salads" },
  { id: "drinks", label: "Drinks & Coffee" },
  { id: "kids", label: "Kids Menu" },
];

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  breakfast: UtensilsCrossed,
  lunch: Sandwich,
  burgers: Flame,
  pasta: Leaf,
  salads: Salad,
  kids: Baby,
};

const GRAB_GO_ICONS: Record<GrabAndGoSection["id"], ComponentType<{ className?: string }>> = {
  bagels: CircleDot,
  toasties: Flame,
  croissant: Croissant,
  focaccia: Sandwich,
  wraps: UtensilsCrossed,
  burritos: Wheat,
};

function matchesDayDietary(tags: DayDietaryTag[] | undefined, filter: DayDietaryFilter): boolean {
  if (filter === "all") return true;
  if (!tags || tags.length === 0) return false;
  if (filter === "gf") return tags.includes("GF") || tags.includes("GFO");
  if (filter === "veg") {
    return tags.some((tag) => tag === "V" || tag === "VO" || tag === "VG" || tag === "VGO");
  }
  return true;
}

function MenuItemRow({ item }: { item: DayMenuItem }) {
  return (
    <li className="flex flex-col justify-between border-b border-dashed border-[#E5D5C3]/80 pb-5 last:border-b-0 md:[&:nth-last-child(2):nth-child(odd)]:border-b-0">
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
  );
}

function FoodCategorySection({
  category,
  dietaryFilter,
  onJumpToGrabAndGo,
}: {
  category: DayMenuCategory;
  dietaryFilter: DayDietaryFilter;
  onJumpToGrabAndGo?: () => void;
}) {
  const items = category.items.filter((item) => matchesDayDietary(item.tags, dietaryFilter));
  if (items.length === 0) return null;

  const Icon = CATEGORY_ICONS[category.id] ?? UtensilsCrossed;

  return (
    <article
      id={`day-${category.id}`}
      className="scroll-mt-28 rounded-3xl border border-[#E5D5C3] bg-[#FFFDF9] p-6 shadow-sm sm:p-10"
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5D5C3] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B84C32] uppercase">
            <Icon className="h-3.5 w-3.5 text-[#173D32]" />
            Monty Cafe Day Menu
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-[#173D32] sm:text-3xl">
            {category.title}
          </h3>
          {category.subtitle ? (
            <p className="mt-1.5 text-sm text-[#4B3026]/80 sm:text-base">{category.subtitle}</p>
          ) : null}
          {category.note ? (
            <p className="mt-2 inline-block rounded-lg bg-[#EADCC9]/60 px-3 py-1 text-xs font-semibold text-[#173D32]">
              {category.note}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {category.id === "breakfast" && onJumpToGrabAndGo ? (
            <button
              type="button"
              onClick={onJumpToGrabAndGo}
              className="inline-flex items-center gap-2 rounded-full border border-[#B84C32]/40 bg-[#FFF8EF] px-4 py-2 text-xs font-bold tracking-wide text-[#B84C32] uppercase transition-colors hover:bg-[#B84C32] hover:text-[#FFF8EF]"
            >
              <Sandwich className="h-3.5 w-3.5" />
              Grab &amp; Go Options
            </button>
          ) : null}
          {category.priceBadge ? (
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#D9A441] bg-[#173D32] px-5 py-2 font-display text-base font-bold text-[#FFF8EF] shadow-md sm:text-lg">
              <Sparkles className="h-4 w-4 text-[#D9A441]" />
              {category.priceBadge}
            </span>
          ) : null}
        </div>
      </header>

      <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </ul>
    </article>
  );
}

function GrabAndGoPanel({ dietaryFilter }: { dietaryFilter: DayDietaryFilter }) {
  const [openSection, setOpenSection] = useState<GrabAndGoSection["id"] | null>("bagels");

  const selected = GRAB_AND_GO_SECTIONS.find((s) => s.id === openSection) ?? null;
  const filteredItems = selected
    ? selected.items.filter((item) => matchesDayDietary(item.tags, dietaryFilter))
    : [];

  return (
    <article
      id="day-grab-and-go"
      className="scroll-mt-28 rounded-3xl border-2 border-[#D9A441]/55 bg-gradient-to-br from-[#FFFDF9] to-[#FFF6E7] p-6 shadow-md sm:p-10"
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5D5C3] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B84C32] uppercase">
            <Sandwich className="h-4 w-4 text-[#173D32]" />
            Fresh From the Counter
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-[#173D32] sm:text-3xl">
            Grab &amp; Go
          </h3>
          <p className="mt-1.5 text-sm text-[#4B3026]/85 sm:text-base">
            Select any icon below to open our counter Bagels, Toasties / Sandwich, Croissants,
            Focaccias, Wraps and Burritos.
          </p>
        </div>

        <WhatsAppButton variant="outline" message={WA_MESSAGES.grabAndGo}>
          Ask About Counter Specials
        </WhatsAppButton>
      </header>

      {/* Clickable Grab & Go Icon Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GRAB_AND_GO_SECTIONS.map((section) => {
          const Icon = GRAB_GO_ICONS[section.id];
          const isOpen = openSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`grab-go-panel-${section.id}`}
              onClick={() => setOpenSection((prev) => (prev === section.id ? null : section.id))}
              className={cn(
                "group flex flex-col items-center rounded-2xl border p-5 text-center transition-all duration-300",
                isOpen
                  ? "border-[#D9A441] bg-[#173D32] text-[#FFF8EF] shadow-lg"
                  : "border-[#E5D5C3] bg-white text-[#173D32] hover:-translate-y-0.5 hover:border-[#B84C32]/60 hover:shadow-md",
              )}
            >
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full transition-colors",
                  isOpen
                    ? "bg-[#B84C32] text-[#FFF8EF] ring-2 ring-[#D9A441]/70"
                    : "bg-[#EADCC9]/70 text-[#173D32] group-hover:bg-[#B84C32] group-hover:text-[#FFF8EF]",
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="mt-3 font-display text-lg font-bold">{section.title}</span>
              <span
                className={cn(
                  "mt-1 text-xs font-medium",
                  isOpen ? "text-[#EADCC9]" : "text-[#4B3026]/75",
                )}
              >
                {section.shortTagline}
              </span>
              <span
                className={cn(
                  "mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase",
                  isOpen ? "text-[#D9A441]" : "text-[#B84C32]",
                )}
              >
                {isOpen ? "Showing" : "Open"}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    isOpen ? "rotate-180" : "",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Expandable Grab & Go Detail Drawer */}
      {selected ? (
        <div
          id={`grab-go-panel-${selected.id}`}
          role="region"
          aria-label={`${selected.title} Grab and Go items`}
          className="mt-8 rounded-2xl border border-[#E5D5C3] bg-white/95 p-6 shadow-inner sm:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#E5D5C3] pb-4">
            <div>
              <h4 className="font-display text-xl font-bold text-[#173D32] sm:text-2xl">
                {selected.title}
              </h4>
              <p className="mt-1 text-sm text-[#4B3026]/80">{selected.description}</p>
            </div>
            <span className="rounded-full bg-[#EADCC9]/60 px-3 py-1 text-xs font-bold text-[#173D32]">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          {filteredItems.length > 0 ? (
            <ul className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
              {filteredItems.map((item) => (
                <MenuItemRow key={item.name} item={item} />
              ))}
            </ul>
          ) : !selected.emptyNote ? (
            <p className="mt-6 rounded-xl border border-dashed border-[#E5D5C3] bg-[#FFF8EF] px-4 py-3 text-sm text-[#4B3026]/85">
              Switch the dietary filter back to Show All to browse every item in {selected.title},
              or ask our counter team about custom fillings.
            </p>
          ) : null}

          {selected.promoNote ? (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#D9A441]/60 bg-[#173D32] px-5 py-3.5 text-sm font-semibold text-[#FFF8EF] shadow-sm">
              <Coffee className="h-5 w-5 shrink-0 text-[#D9A441]" />
              <span>{selected.promoNote}</span>
            </div>
          ) : null}

          {selected.emptyNote ? (
            <p className="mt-6 rounded-xl border border-dashed border-[#D9A441]/70 bg-[#FFF8EF] px-4 py-3 text-sm text-[#4B3026]/85">
              {selected.emptyNote}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function ExtrasPanel() {
  return (
    <article
      id="day-extras"
      className="scroll-mt-28 rounded-3xl border border-[#E5D5C3] bg-[#FFFDF9] p-6 shadow-sm sm:p-10"
    >
      <header className="border-b border-[#E5D5C3] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B84C32] uppercase">
          <Sparkles className="h-3.5 w-3.5 text-[#173D32]" />
          Customise Your Plate
        </div>
        <h3 className="mt-2 font-display text-2xl font-bold text-[#173D32] sm:text-3xl">
          Sides &amp; Extras
        </h3>
        <p className="mt-1.5 text-sm text-[#4B3026]/80 sm:text-base">
          Add extra eggs, sides, proteins, or gluten-free toast to any breakfast or lunch dish.
        </p>
      </header>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EXTRAS_GROUPS.map((group) => (
          <div
            key={group.price}
            className="flex flex-col justify-between rounded-2xl border border-[#E5D5C3] bg-[#FFF8EF] p-5"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2 border-b border-[#E5D5C3] pb-3">
                <span className="font-display text-lg font-bold text-[#173D32]">{group.label}</span>
                <span className="font-display text-xl font-bold text-[#B84C32]">{group.price}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm font-medium text-[#4B3026]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function DrinksAndCoffeePanel() {
  return (
    <article
      id="day-drinks"
      className="scroll-mt-28 rounded-3xl border border-[#E5D5C3] bg-[#FFFDF9] p-6 shadow-sm sm:p-10"
    >
      <header className="border-b border-[#E5D5C3] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#B84C32] uppercase">
          <Coffee className="h-3.5 w-3.5 text-[#173D32]" />
          Drinks Menu
        </div>
        <h3 className="mt-2 font-display text-2xl font-bold text-[#173D32] sm:text-3xl">
          Barista Coffee &amp; Cold Drinks
        </h3>
        <p className="mt-1.5 text-sm text-[#4B3026]/80 sm:text-base">
          Specialty espresso made fresh alongside iced drinks, thickshakes, smoothies and herbal
          teas.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Barista Coffee */}
        <div className="rounded-2xl border border-[#E5D5C3] bg-[#FFF8EF] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5D5C3] pb-4">
            <h4 className="flex items-center gap-2 font-display text-xl font-bold text-[#173D32]">
              <Coffee className="h-5 w-5 text-[#B84C32]" />
              Barista Coffee
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-white px-2.5 py-1 text-[#173D32] ring-1 ring-[#E5D5C3]">
                S {BARISTA_COFFEE.regularPrices.small}
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-[#173D32] ring-1 ring-[#E5D5C3]">
                M / Mug {BARISTA_COFFEE.regularPrices.mediumMug}
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-[#B84C32] ring-1 ring-[#E5D5C3]">
                L {BARISTA_COFFEE.regularPrices.large}
              </span>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-semibold text-[#4B3026]">
            {BARISTA_COFFEE.regularCoffees.map((coffee) => (
              <li key={coffee} className="py-1">
                {coffee}
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-dashed border-[#E5D5C3] pt-4">
            <p className="text-xs font-bold tracking-wider text-[#B84C32] uppercase">
              Short Espresso Classics
            </p>
            <ul className="mt-2 divide-y divide-dashed divide-[#E5D5C3]/70 text-sm">
              {BARISTA_COFFEE.shortCoffees.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between py-1.5 font-semibold text-[#4B3026]"
                >
                  <span>{c.name}</span>
                  <span className="font-display font-bold text-[#B84C32]">{c.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid gap-4 border-t border-dashed border-[#E5D5C3] pt-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#173D32] uppercase">
                Milk Alternatives
              </p>
              <p className="mt-1 text-xs font-semibold text-[#B84C32]">
                S {BARISTA_COFFEE.milkPrices.small} · M {BARISTA_COFFEE.milkPrices.mediumMug} · L{" "}
                {BARISTA_COFFEE.milkPrices.large}
              </p>
              <p className="mt-1.5 text-sm text-[#4B3026]/85">
                {BARISTA_COFFEE.milkAlternatives.join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#173D32] uppercase">
                Extra Shot &amp; Syrups
              </p>
              <p className="mt-1 text-xs font-semibold text-[#B84C32]">
                {BARISTA_COFFEE.extraShotAndSyrups.price}
              </p>
              <p className="mt-1.5 text-sm text-[#4B3026]/85">
                {BARISTA_COFFEE.extraShotAndSyrups.options.join(" · ")}
              </p>
            </div>
          </div>
        </div>

        {/* Cold Drinks, Shakes, Smoothies & Teas */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#E5D5C3] bg-[#FFF8EF] p-6">
            <div className="flex items-baseline justify-between gap-2 border-b border-[#E5D5C3] pb-3">
              <h4 className="flex items-center gap-2 font-display text-xl font-bold text-[#173D32]">
                <CupSoda className="h-5 w-5 text-[#B84C32]" />
                {COLD_DRINKS_AND_TEA.icedDrinks.title}
              </h4>
              <span className="font-display text-base font-bold text-[#B84C32]">
                {COLD_DRINKS_AND_TEA.icedDrinks.priceLabel}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {COLD_DRINKS_AND_TEA.icedDrinks.items.map((item) => (
                <span
                  key={item.name}
                  className="rounded-full border border-[#E5D5C3] bg-white px-3 py-1 text-xs font-semibold text-[#4B3026]"
                >
                  {item.name}
                  {item.price.startsWith("$") ? ` · ${item.price}` : ""}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E5D5C3] bg-[#FFF8EF] p-5">
              <div className="flex items-baseline justify-between gap-2 border-b border-[#E5D5C3] pb-2">
                <h4 className="font-display text-lg font-bold text-[#173D32]">
                  {COLD_DRINKS_AND_TEA.milkshakes.title}
                </h4>
              </div>
              <p className="mt-1.5 font-display text-base font-bold text-[#B84C32]">
                {COLD_DRINKS_AND_TEA.milkshakes.priceLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4B3026]/85">
                {COLD_DRINKS_AND_TEA.milkshakes.flavours.join(" · ")}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5D5C3] bg-[#FFF8EF] p-5">
              <div className="flex items-baseline justify-between gap-2 border-b border-[#E5D5C3] pb-2">
                <h4 className="font-display text-lg font-bold text-[#173D32]">
                  {COLD_DRINKS_AND_TEA.smoothies.title}
                </h4>
              </div>
              <p className="mt-1.5 font-display text-base font-bold text-[#B84C32]">
                {COLD_DRINKS_AND_TEA.smoothies.priceLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4B3026]/85">
                {COLD_DRINKS_AND_TEA.smoothies.flavours.join(" · ")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5D5C3] bg-[#FFF8EF] p-5">
            <div className="flex items-baseline justify-between gap-2 border-b border-[#E5D5C3] pb-2">
              <h4 className="font-display text-lg font-bold text-[#173D32]">
                {COLD_DRINKS_AND_TEA.herbTea.title}
              </h4>
              <span className="font-display text-lg font-bold text-[#B84C32]">
                {COLD_DRINKS_AND_TEA.herbTea.priceLabel}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#4B3026]/85">
              {COLD_DRINKS_AND_TEA.herbTea.varieties.join(" · ")}
            </p>
            <ul className="mt-4 divide-y divide-dashed divide-[#E5D5C3] border-t border-[#E5D5C3] pt-2 text-sm">
              {COLD_DRINKS_AND_TEA.bottledAndCans.map((drink) => (
                <li
                  key={drink.name}
                  className="flex items-center justify-between py-2 font-semibold text-[#4B3026]"
                >
                  <span>{drink.name}</span>
                  <span className="font-display font-bold text-[#B84C32]">{drink.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function DayMenuBoard({
  activeTab: controlledTab,
  onTabChange,
}: {
  activeTab?: DayMenuTab;
  onTabChange?: (tab: DayMenuTab) => void;
}) {
  const [internalTab, setInternalTab] = useState<DayMenuTab>("all");
  const [dietaryFilter, setDietaryFilter] = useState<DayDietaryFilter>("all");

  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: DayMenuTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const showCategory = (id: string) => activeTab === "all" || activeTab === id;
  const breakfastCategory = DAY_FOOD_CATEGORIES.find((c) => c.id === "breakfast");
  const afterBreakfastCategories = DAY_FOOD_CATEGORIES.filter(
    (c) => c.id !== "breakfast" && c.id !== "kids",
  );
  const kidsCategory = DAY_FOOD_CATEGORIES.find((c) => c.id === "kids");

  return (
    <section id="day-menu-board" className="bg-[#FFF8EF] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] text-[#B84C32] uppercase">
            <UtensilsCrossed className="h-4 w-4" />
            Full Cafe Menu
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-[#173D32] sm:text-5xl">
            Breakfast, Lunch, Grab &amp; Go &amp; Drinks
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4B3026]/85 sm:text-lg">
            Browse our full daytime menu — all-day breakfast, counter Grab &amp; Go favourites,
            hearty lunches, burgers, pasta, salads, kids meals and barista coffee.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {DAY_MENU_TABS.map((tab) => {
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
        {activeTab !== "drinks" ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs font-semibold tracking-wider text-[#6B554B] uppercase">
              Dietary Filter:
            </span>
            {(
              [
                { id: "all", label: "Show All" },
                { id: "veg", label: "Vegetarian & Vegan (V / VGO)" },
                { id: "gf", label: "Gluten-Free Option (GF / GFO)" },
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
        ) : null}

        {/* Menu Sections */}
        <div className="mt-12 space-y-8">
          {breakfastCategory && showCategory("breakfast") ? (
            <FoodCategorySection
              category={breakfastCategory}
              dietaryFilter={dietaryFilter}
              onJumpToGrabAndGo={() => setActiveTab("grab-and-go")}
            />
          ) : null}

          {showCategory("grab-and-go") ? <GrabAndGoPanel dietaryFilter={dietaryFilter} /> : null}

          {activeTab === "all" || activeTab === "breakfast" ? <ExtrasPanel /> : null}

          {afterBreakfastCategories
            .filter((category) => showCategory(category.id))
            .map((category) => (
              <FoodCategorySection
                key={category.id}
                category={category}
                dietaryFilter={dietaryFilter}
              />
            ))}

          {showCategory("drinks") ? <DrinksAndCoffeePanel /> : null}

          {kidsCategory && showCategory("kids") ? (
            <FoodCategorySection category={kidsCategory} dietaryFilter={dietaryFilter} />
          ) : null}
        </div>

        {/* Allergy Notice & Dietary Key */}
        <div className="mt-10 rounded-2xl border border-[#E5D5C3] bg-[#EADCC9]/40 px-6 py-5 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-[#B84C32] uppercase">
            <AlertCircle className="h-4 w-4" />
            {ALLERGY_NOTICE}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#4B3026] sm:text-sm">
            {DAY_DIETARY_KEY.map((entry) => (
              <span key={entry.code} className="inline-flex items-center gap-1.5">
                <span className="rounded bg-[#173D32] px-1.5 py-0.5 text-[11px] font-bold text-[#FFF8EF]">
                  {entry.code}
                </span>
                <span>{entry.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl bg-[#173D32] p-8 text-center text-[#FFF8EF] shadow-xl sm:p-10">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Dine In With Us or Order Ahead
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#FFF8EF]/85 sm:text-base">
            Open daily from 7 AM on Were Street, Montmorency. Reserve your table online or message
            us on WhatsApp for takeaway and dietary requests.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              to="/book-a-table"
              className="inline-flex items-center gap-2 rounded-full bg-[#B84C32] px-7 py-3.5 text-sm font-semibold text-[#FFF8EF] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#C95F44]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Table
            </Link>
            <WhatsAppButton variant="solid" message={WA_MESSAGES.dayMenu}>
              Ask About the Day Menu
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
