import { useEffect, useState, type FormEvent } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsApp";
import { BUSINESS, WA_MESSAGES, buildBookingMessage, whatsappLink } from "@/lib/site";
import diningRoom from "@/assets/dining-room.webp";

const TIME_SLOTS = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
] as const;

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

const initialForm = {
  name: "",
  phone: "",
  date: "",
  time: "6:00 PM",
  guests: "2",
  message: "",
};

type FormState = typeof initialForm;

export function BookingSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [minDate, setMinDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  // Date min can only be computed in the browser (hydration-safe)
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const setField =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = form.name.trim();
    const phone = form.phone.trim();
    if (name.length < 2) return setError("Please enter your full name.");
    if (phone.length < 6) return setError("Please enter a contact phone number.");
    if (!form.date) return setError("Please choose a booking date.");

    const url = whatsappLink(
      buildBookingMessage({
        name,
        phone,
        date: form.date,
        time: form.time,
        guests: form.guests,
        message: form.message.trim(),
      }),
    );
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/30 focus:outline-none";
  const labelClass = "mb-2 block text-sm font-semibold text-forest";

  return (
    <section id="book" className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${diningRoom})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-forest-deep/90" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[420px_1fr] lg:gap-16 lg:px-8">
        <Reveal className="text-cream">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta-light">
            Bookings
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Let's Make Your Next Visit Special.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/90">
            Fill in the short form and WhatsApp will open with your details ready to send. Just
            press send in WhatsApp to request your table.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-base font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-terracotta-light"
            >
              <Phone className="h-5 w-5" /> Call Now
            </a>
            <a
              href={whatsappLink(WA_MESSAGES.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/60 px-6 py-3 text-base font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-forest-deep"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
          </div>

          <p className="mt-8 flex items-start gap-3 rounded-2xl bg-white/10 p-5 text-base text-cream/90">
            <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-light" />
            Dinner seats fill quickly on Friday and Saturday nights, so booking ahead is a good
            idea.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="rounded-3xl bg-card p-6 text-foreground shadow-2xl sm:p-8">
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="font-display text-2xl font-semibold text-forest">Book a Table</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Fields marked with * are required.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="bk-name" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="bk-name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={setField("name")}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelClass}>
                    Phone Number *
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={20}
                    value={form.phone}
                    onChange={setField("phone")}
                    placeholder="04XX XXX XXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bk-date" className={labelClass}>
                    Booking Date *
                  </label>
                  <input
                    id="bk-date"
                    type="date"
                    required
                    min={minDate}
                    value={form.date}
                    onChange={setField("date")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bk-time" className={labelClass}>
                    Preferred Time *
                  </label>
                  <select
                    id="bk-time"
                    value={form.time}
                    onChange={setField("time")}
                    className={inputClass}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bk-guests" className={labelClass}>
                    Number of Guests *
                  </label>
                  <select
                    id="bk-guests"
                    value={form.guests}
                    onChange={setField("guests")}
                    className={inputClass}
                  >
                    {GUEST_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n === "1" ? "1 guest" : `${n} guests`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bk-message" className={labelClass}>
                    Additional Message{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    id="bk-message"
                    rows={3}
                    maxLength={1000}
                    value={form.message}
                    onChange={setField("message")}
                    placeholder="High chair needed, birthday celebration, dietary requirements"
                    className={inputClass}
                  />
                </div>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-base font-medium text-destructive"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold tracking-wide text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl"
              >
                <WhatsAppIcon className="h-6 w-6" />
                Book Your Table via WhatsApp
              </button>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                WhatsApp will open with your booking ready to send. Your table is{" "}
                <strong className="text-forest">not confirmed</strong> until Monty Cafe replies to
                you on WhatsApp.
              </p>
              {sentUrl ? (
                <a
                  href={sentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-base font-semibold text-terracotta underline underline-offset-4"
                >
                  WhatsApp did not open? Tap here to open your message
                </a>
              ) : null}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
