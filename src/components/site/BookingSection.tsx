import { useEffect, useState, type FormEvent } from "react";
import { Phone, MessageCircle, CalendarCheck, CircleCheck as CheckCircle2, Loader as Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { BUSINESS } from "@/lib/site";
import diningRoom from "@/assets/dining-room.webp";

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
] as const;

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  preferredDate: "",
  preferredTime: "6:00 PM" as (typeof TIME_SLOTS)[number],
  guests: "2",
  message: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function BookingSection() {
  const [form, setForm] = useState(initialForm);
  const [minDate, setMinDate] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Date min can only be computed in the browser (hydration-safe)
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const setField = (key: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (form.fullName.trim().length < 2) return setError("Please enter your full name.");
    if (form.phone.trim().length < 6) return setError("Please enter a contact phone number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("Please enter a valid email address.");
    if (!form.preferredDate) return setError("Please choose a preferred date.");

    setState("submitting");
    try {
      const res = await fetch("/api/public/booking-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          guests: Number(form.guests),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again or call us.");
      }
      setState("success");
      setForm(initialForm);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/30 focus:outline-none";

  return (
    <section id="book" className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${diningRoom})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-forest-deep/88" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[420px_1fr] lg:gap-16 lg:px-8">
        {/* Left: intro + quick actions */}
        <Reveal className="text-cream">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta-light">
            Bookings
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Let's Make Your Next Visit Special.
          </h2>
          <p className="mt-5 leading-relaxed text-cream/85">
            Planning breakfast with friends, a family lunch or an Indian dinner? Send us a booking
            enquiry and we'll get back to you to confirm — or simply give us a call.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-terracotta-light"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-6 py-3 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-forest-deep"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          <p className="mt-8 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm text-cream/85">
            <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-light" />
            Dinner seats fill quickly on Friday and Saturday nights — booking ahead is a good idea.
          </p>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={140}>
          <div className="rounded-3xl bg-card p-6 shadow-2xl sm:p-8">
            {state === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-forest">
                  Thank you — enquiry received!
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We've sent your booking request through to the team. Your visit is{" "}
                  <strong className="text-forest">not confirmed yet</strong> — we'll call or email
                  you shortly to lock it in. For anything urgent, call{" "}
                  <a href={BUSINESS.phoneHref} className="font-semibold text-terracotta underline">
                    {BUSINESS.phoneDisplay}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-6 rounded-full border border-forest/40 px-6 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-display text-xl font-semibold text-forest">Book a Table</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-forest">
                      Full Name
                    </label>
                    <input
                      id="bk-name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.fullName}
                      onChange={setField("fullName")}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold text-forest">
                      Phone
                    </label>
                    <input
                      id="bk-phone"
                      type="tel"
                      required
                      maxLength={20}
                      value={form.phone}
                      onChange={setField("phone")}
                      placeholder="04XX XXX XXX"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-email" className="mb-1.5 block text-sm font-semibold text-forest">
                      Email
                    </label>
                    <input
                      id="bk-email"
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={setField("email")}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold text-forest">
                      Preferred Date
                    </label>
                    <input
                      id="bk-date"
                      type="date"
                      required
                      min={minDate}
                      value={form.preferredDate}
                      onChange={setField("preferredDate")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="bk-time" className="mb-1.5 block text-sm font-semibold text-forest">
                      Preferred Time
                    </label>
                    <select
                      id="bk-time"
                      value={form.preferredTime}
                      onChange={setField("preferredTime")}
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
                    <label htmlFor="bk-guests" className="mb-1.5 block text-sm font-semibold text-forest">
                      Number of Guests
                    </label>
                    <select
                      id="bk-guests"
                      value={form.guests}
                      onChange={setField("guests")}
                      className={inputClass}
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8", "10"].map((n) => (
                        <option key={n} value={n}>
                          {n === "10" ? "9 or more (we'll call to arrange)" : `${n} ${Number(n) === 1 ? "guest" : "guests"}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-message" className="mb-1.5 block text-sm font-semibold text-forest">
                      Additional Message <span className="font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="bk-message"
                      rows={3}
                      maxLength={1000}
                      value={form.message}
                      onChange={setField("message")}
                      placeholder="Highchair needed, birthday celebration, dietary requirements…"
                      className={inputClass}
                    />
                  </div>
                </div>

                {error ? (
                  <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold tracking-wide uppercase text-cream shadow-lg transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-xl disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Book a Table"
                  )}
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Your enquiry goes straight to our team — we'll confirm by phone or email. Bookings
                  are only confirmed once we've been in touch.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
