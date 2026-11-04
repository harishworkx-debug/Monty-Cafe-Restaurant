import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookingSection } from "@/components/site/BookingSection";
import { LocationSection } from "@/components/site/LocationSection";
import { OpeningHours } from "@/components/site/OpeningHours";
import { Reveal } from "@/components/site/Reveal";
import { BUSINESS } from "@/lib/site";
import diningRoom from "@/assets/dining-room.webp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact & Bookings | Monty Cafe & Restaurant — Montmorency",
      },
      {
        name: "description",
        content:
          "Contact Monty Cafe & Restaurant in Montmorency — book a table, call us, or find us at 14 Were St, Montmorency VIC 3094. Phone: +61 439 622 806.",
      },
    ],
    links: [{ rel: "canonical", href: "https://montycafe.com.au/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        image={diningRoom}
        imageAlt="Guests dining inside Monty Cafe & Restaurant"
        eyebrow="Contact & Bookings"
        title="Come Say Hello"
        subtitle="Book a table, give us a call, or drop in — we'd love to see you at Monty."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              Get in Touch
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
              We're Here for You
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether it's a breakfast booking, a dinner reservation or just a question — reach out
              and we'll get back to you.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <div className="grid gap-5 sm:grid-cols-3">
              <a
                href={BUSINESS.phoneHref}
                className="group flex flex-col items-center gap-3 rounded-3xl bg-card p-7 text-center shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors group-hover:bg-terracotta">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h2.5a1 1 0 01.968.748l1.078 3.78a1 1 0 01-.5 1.21l-1.6.8a11 11 0 005 5l.8-1.6a1 1 0 011.21-.5l3.78 1.078A1 1 0 0121 17.5V20a2 2 0 01-2 2C10.474 22 2 13.526 2 5a2 2 0 011-2z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-forest">Call Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{BUSINESS.phoneDisplay}</p>
                </div>
              </a>

              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-3xl bg-card p-7 text-center shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors group-hover:bg-terracotta">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.595 5.391l-.999 3.648 3.893-1.738zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-forest">WhatsApp</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Chat with us</p>
                </div>
              </a>

              <a
                href={BUSINESS.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-3xl bg-card p-7 text-center shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors group-hover:bg-terracotta">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-forest">Visit Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{BUSINESS.address}</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingSection />
      <LocationSection />
      <OpeningHours />
    </>
  );
}
