import { useEffect, useState } from "react";
import { Sun, MoonStar } from "lucide-react";
import { Reveal } from "./Reveal";
import { HOURS, DINNER_NOTE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Opening hours panel — schedule lives in src/lib/site.ts for easy editing. */
export function OpeningHours() {
  // Highlight today's row after mount so SSR and hydration always agree.
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    const jsDay = new Date().getDay(); // 0 = Sunday
    setTodayIndex((jsDay + 6) % 7); // index into HOURS where Monday = 0
  }, []);

  return (
    <section className="bg-sand/50 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
            Trading Hours
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
            When to Find Us
          </h2>
          <p className="mt-4 text-muted-foreground">
            The cafe runs all day; the Indian kitchen takes over in the evening.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream">
                  <Sun className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold text-forest">
                  Cafe — Daytime
                </h3>
              </div>
              <ul className="mt-5 divide-y divide-border text-sm">
                {HOURS.map((row, i) => (
                  <li
                    key={row.day}
                    className={cn(
                      "flex items-center justify-between gap-3 py-2.5",
                      i === todayIndex && "rounded-lg bg-terracotta/10 px-3 font-semibold text-forest",
                    )}
                  >
                    <span>{row.day}</span>
                    <span className="text-muted-foreground">{row.cafe}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-3xl bg-forest p-7 text-cream shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-cream">
                  <MoonStar className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-semibold">Indian Dinner — Evenings</h3>
              </div>
              <ul className="mt-5 flex-1 divide-y divide-white/15 text-sm">
                {HOURS.map((row, i) => (
                  <li
                    key={row.day}
                    className={cn(
                      "flex items-center justify-between gap-3 py-2.5",
                      i === todayIndex && "rounded-lg bg-white/10 px-3 font-semibold text-cream",
                    )}
                  >
                    <span>{row.day}</span>
                    {row.dinner ? (
                      <span className="text-terracotta-light">{row.dinner}</span>
                    ) : (
                      <span className="text-cream/50">Closed for dinner</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-white/10 p-4 text-xs leading-relaxed text-cream/80">
                {DINNER_NOTE}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
