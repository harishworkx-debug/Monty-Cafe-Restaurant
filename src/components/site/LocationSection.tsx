import { MapPin, Phone, Navigation } from "lucide-react";
import { Reveal } from "./Reveal";
import { BUSINESS, WA_MESSAGES, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

export function LocationSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
            Find Us
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
            On Were Street, in the Heart of Montmorency
          </h2>
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-forest">Address</h3>
                <p className="mt-1 text-muted-foreground">{BUSINESS.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-forest">Phone</h3>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-1 block text-muted-foreground transition-colors hover:text-terracotta"
                >
                  {BUSINESS.phone}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={BUSINESS.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-forest/40 px-7 py-3 text-sm font-semibold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-cream"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={whatsappLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            <iframe
              title="Map showing Monty Cafe & Restaurant at 14 Were St, Montmorency"
              src={BUSINESS.mapsEmbed}
              className="h-[420px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
