import { useState, useEffect, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MapPin,
  UtensilsCrossed,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsApp";
import { BUSINESS, buildBookingMessage, whatsappLink, type BookingDetails } from "@/lib/site";
import diningRoom from "@/assets/dining-room.webp";

export const Route = createFileRoute("/book-a-table")({
  head: () => ({
    meta: [
      {
        title: "Reserve Your Table | Monty Cafe & Restaurant Montmorency",
      },
      {
        name: "description",
        content:
          "Reserve your table at Monty Cafe & Restaurant, 14 Were Street, Montmorency. Fill out your details and confirm seamlessly via WhatsApp.",
      },
      { property: "og:title", content: "Reserve Your Table | Monty Cafe & Restaurant" },
      {
        property: "og:description",
        content:
          "Planning a visit? We'd love to welcome you to Monty Cafe & Restaurant. Quick, direct WhatsApp reservation.",
      },
    ],
  }),
  component: BookATablePage,
});

const POPULAR_GUEST_COUNTS = ["1", "2", "4", "6", "8+"] as const;

const TIME_OPTIONS = [
  // Daytime Cafe Slots
  {
    group: "Daytime Cafe & Brunch",
    times: [
      "7:30 AM",
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
    ],
  },
  // Evening Indian Dinner Slots
  {
    group: "Indian Dinner (Thu – Sat)",
    times: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"],
  },
] as const;

export function BookATablePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("6:00 PM");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");

  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionUrl, setSubmissionUrl] = useState<string | null>(null);

  // Set minDate safely on client side
  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      setMinDate(today);
      setDate((d) => (d ? d : today));
    } catch {
      // fallback
    }
  }, []);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errs.name = "Please enter your full name (at least 2 characters).";
    }

    if (!trimmedPhone || trimmedPhone.replace(/\D/g, "").length < 8) {
      errs.phone = "Please enter a valid phone number (at least 8 digits).";
    }

    if (!date) {
      errs.date = "Please select a booking date.";
    }

    if (!time) {
      errs.time = "Please select your preferred arrival time.";
    }

    if (!guests) {
      errs.guests = "Please choose the number of guests.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to the first error
      const firstError = document.querySelector(".form-error-target");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const bookingData: BookingDetails = {
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      message: message.trim(),
    };

    const formattedMessage = buildBookingMessage(bookingData);
    const url = whatsappLink(formattedMessage);

    setSubmissionUrl(url);

    // Open WhatsApp in a new tab/window
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] pt-24 pb-20">
      {/* Decorative top pattern */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#173D32] to-[#0D261F] text-[#FFF8EF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: `url(${diningRoom})` }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold">
            <Sparkles className="h-4 w-4" />
            Direct WhatsApp Reservation
          </div>

          <h1 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF8EF]">
            Reserve Your Table
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#FFF8EF]/85 max-w-2xl mx-auto leading-relaxed">
            Planning a visit? We'd love to welcome you to Monty Cafe &amp; Restaurant.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#FFF8EF]/75">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" /> 14 Were St, Montmorency VIC
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" /> Daytime Cafe 7 AM &amp; Dinner Thu–Sat 5 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Main Booking Form Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E5D5C3] bg-white p-6 sm:p-10 shadow-xl shadow-[#173D32]/5">
              <div className="mb-8 border-b border-[#E5D5C3] pb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#173D32]">
                  Table Reservation Details
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#4B3026]/80 leading-relaxed">
                  Enter your reservation details below. When you click{" "}
                  <strong className="text-[#B84C32]">Continue to WhatsApp</strong>, WhatsApp will
                  open with your details formatted and ready to send.
                </p>
              </div>

              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  className="form-error-target mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-red-800"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Please complete the required fields:</p>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-xs sm:text-sm">
                      {Object.values(errors).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Full Name */}
                <div>
                  <label
                    htmlFor="booking-name"
                    className="mb-2 flex items-center justify-between text-base font-semibold text-[#173D32]"
                  >
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#B84C32]" />
                      Full Name <span className="text-[#B84C32]">*</span>
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">Required</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    placeholder="e.g. Sarah Jenkins"
                    autoComplete="name"
                    className={`w-full rounded-2xl border px-4 py-3.5 text-base sm:text-lg text-[#4B3026] placeholder:text-[#6B554B]/50 transition-colors focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/30"
                        : "border-[#E5D5C3] bg-[#FFFDF9] focus:border-[#B84C32] focus:ring-[#B84C32]/25"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Phone Number */}
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="mb-2 flex items-center justify-between text-base font-semibold text-[#173D32]"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#B84C32]" />
                      Phone Number <span className="text-[#B84C32]">*</span>
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">For WhatsApp</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="e.g. 0439 622 806"
                    autoComplete="tel"
                    className={`w-full rounded-2xl border px-4 py-3.5 text-base sm:text-lg text-[#4B3026] placeholder:text-[#6B554B]/50 transition-colors focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/30"
                        : "border-[#E5D5C3] bg-[#FFFDF9] focus:border-[#B84C32] focus:ring-[#B84C32]/25"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-[#6B554B]/75">
                    We will reply directly to this number via WhatsApp.
                  </p>
                </div>

                {/* Date & Time Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* 3. Booking Date */}
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="mb-2 flex items-center justify-between text-base font-semibold text-[#173D32]"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#B84C32]" />
                        Booking Date <span className="text-[#B84C32]">*</span>
                      </span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={minDate}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                      }}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-base sm:text-lg text-[#4B3026] transition-colors focus:outline-none focus:ring-2 ${
                        errors.date
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/30"
                          : "border-[#E5D5C3] bg-[#FFFDF9] focus:border-[#B84C32] focus:ring-[#B84C32]/25"
                      }`}
                    />
                    {errors.date && (
                      <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* 4. Preferred Time */}
                  <div>
                    <label
                      htmlFor="booking-time"
                      className="mb-2 flex items-center justify-between text-base font-semibold text-[#173D32]"
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#B84C32]" />
                        Preferred Time <span className="text-[#B84C32]">*</span>
                      </span>
                    </label>
                    <select
                      id="booking-time"
                      required
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        if (errors.time) setErrors((prev) => ({ ...prev, time: "" }));
                      }}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-base sm:text-lg text-[#4B3026] bg-[#FFFDF9] transition-colors focus:outline-none focus:ring-2 ${
                        errors.time
                          ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/30"
                          : "border-[#E5D5C3] focus:border-[#B84C32] focus:ring-[#B84C32]/25"
                      }`}
                    >
                      {TIME_OPTIONS.map((grp) => (
                        <optgroup key={grp.group} label={grp.group}>
                          {grp.times.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. Number of Guests */}
                <div>
                  <label
                    htmlFor="booking-guests"
                    className="mb-2 flex items-center justify-between text-base font-semibold text-[#173D32]"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#B84C32]" />
                      Number of Guests <span className="text-[#B84C32]">*</span>
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      Select or choose quick pill
                    </span>
                  </label>

                  {/* Quick-tap pills for easy accessibility on mobile and for older users */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {POPULAR_GUEST_COUNTS.map((pill) => {
                      const isSelected =
                        guests === pill || (pill === "8+" && parseInt(guests, 10) >= 8);
                      return (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => {
                            setGuests(pill === "8+" ? "8" : pill);
                            if (errors.guests) setErrors((prev) => ({ ...prev, guests: "" }));
                          }}
                          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                            isSelected
                              ? "bg-[#173D32] text-[#FFF8EF] shadow-sm"
                              : "border border-[#E5D5C3] bg-[#FFFDF9] text-[#4B3026] hover:bg-[#EADCC9]/50"
                          }`}
                        >
                          {pill} {pill === "1" ? "Guest" : "Guests"}
                        </button>
                      );
                    })}
                  </div>

                  <select
                    id="booking-guests"
                    required
                    value={guests}
                    onChange={(e) => {
                      setGuests(e.target.value);
                      if (errors.guests) setErrors((prev) => ({ ...prev, guests: "" }));
                    }}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-base sm:text-lg text-[#4B3026] bg-[#FFFDF9] transition-colors focus:outline-none focus:ring-2 ${
                      errors.guests
                        ? "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/30"
                        : "border-[#E5D5C3] focus:border-[#B84C32] focus:ring-[#B84C32]/25"
                    }`}
                  >
                    <option value="1">1 Person (Solo diner)</option>
                    <option value="2">2 People (Table for 2)</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                    <option value="7">7 People</option>
                    <option value="8">8 People</option>
                    <option value="9">9 People</option>
                    <option value="10">10 People (Group)</option>
                    <option value="12">12+ People (Large Party / Function)</option>
                  </select>
                  {errors.guests && (
                    <p className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                      {errors.guests}
                    </p>
                  )}
                </div>

                {/* 6. Additional Message (Optional) */}
                <div>
                  <label
                    htmlFor="booking-message"
                    className="mb-2 flex items-center justify-between text-base font-semibold text-[#173D32]"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#B84C32]" />
                      Additional Message (optional)
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">Optional</span>
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Highchair required, birthday celebration, dietary needs (gluten-free/vegan), or preferred seating area."
                    className="w-full rounded-2xl border border-[#E5D5C3] bg-[#FFFDF9] px-4 py-3.5 text-base text-[#4B3026] placeholder:text-[#6B554B]/50 transition-colors focus:border-[#B84C32] focus:ring-2 focus:ring-[#B84C32]/25 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C4A] px-8 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:brightness-105 hover:shadow-2xl hover:shadow-[#25D366]/45 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
                  >
                    <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110" />
                    <span>CONTINUE TO WHATSAPP</span>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3 text-center text-xs sm:text-sm text-[#4B3026]/75">
                    Clicking opens WhatsApp with your booking details ready.{" "}
                    <strong>Just press Send in WhatsApp</strong> to deliver.
                  </p>
                </div>
              </form>

              {/* Informative Submission Success Banner / Fallback */}
              {submissionUrl && (
                <div className="mt-8 rounded-2xl border border-[#D9A441]/40 bg-[#FFFDF9] p-5 sm:p-6 shadow-md animate-fade-in">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-[#25D366] mt-0.5" />
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-bold text-[#173D32]">
                        WhatsApp Link Generated!
                      </h3>
                      <p className="text-sm text-[#4B3026]/90 leading-relaxed">
                        If WhatsApp didn't open automatically, tap the button below to open your
                        chat with the pre-filled reservation:
                      </p>
                      <div className="pt-2">
                        <a
                          href={submissionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-105"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          Open WhatsApp Now
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <div className="mt-3 rounded-xl bg-[#F3EAE0] p-3 text-xs text-[#4B3026]/85">
                        <strong>Important:</strong> A booking is confirmed only after the Monty Cafe
                        &amp; Restaurant team reviews and confirms availability in WhatsApp.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Information & Experience Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Booking Notice Card */}
            <div className="rounded-3xl border border-gold/40 bg-gradient-to-br from-[#173D32] to-[#0D261F] p-6 sm:p-8 text-[#FFF8EF] shadow-xl">
              <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase">
                <ShieldCheck className="h-4 w-4" /> Easy &amp; Direct Reservation
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-[#FFF8EF]">
                How WhatsApp Booking Works
              </h3>
              <ol className="mt-4 space-y-3.5 text-sm text-[#FFF8EF]/90">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-[#0D261F] text-xs font-bold">
                    1
                  </span>
                  <span>Fill in your name, contact phone, date, time and guest count.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-[#0D261F] text-xs font-bold">
                    2
                  </span>
                  <span>
                    Tap <strong>Continue to WhatsApp</strong>. Your details will be formatted into
                    an official booking request.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-[#0D261F] text-xs font-bold">
                    3
                  </span>
                  <span>
                    <strong>Press Send in WhatsApp.</strong> Our friendly Monty team confirms table
                    availability directly with you!
                  </span>
                </li>
              </ol>

              <div className="mt-6 border-t border-[#FFF8EF]/15 pt-5 text-xs text-[#FFF8EF]/80">
                <p>
                  * No accounts, credit cards or third-party booking fees required. Private, secure,
                  and straight to the restaurant.
                </p>
              </div>
            </div>

            {/* Hours & Contact Card */}
            <div className="rounded-3xl border border-[#E5D5C3] bg-white p-6 sm:p-7 shadow-lg shadow-[#173D32]/5">
              <h3 className="font-display text-xl font-bold text-[#173D32] flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#B84C32]" />
                Dining &amp; Kitchen Hours
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[#4B3026]">
                <div className="flex justify-between border-b border-[#E5D5C3] pb-2">
                  <span className="font-semibold text-[#173D32]">Mon – Tue (Cafe)</span>
                  <span>7:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-[#E5D5C3] pb-2">
                  <span className="font-semibold text-[#173D32]">Wed &amp; Sun (Cafe)</span>
                  <span>7:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-[#E5D5C3] pb-2">
                  <span className="font-semibold text-[#173D32]">Thu – Sat (Cafe + Dinner)</span>
                  <div className="text-right">
                    <div>Cafe: 7 AM – 3 PM</div>
                    <div className="font-semibold text-[#B84C32]">Indian Dinner: 5 PM – 9 PM</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#FFF8EF] p-4 border border-[#E5D5C3]">
                <p className="text-xs text-[#4B3026]/90 leading-relaxed">
                  Need a same-day table or have an urgent question? Give our team a quick ring:
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={BUSINESS.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[#173D32] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFF8EF] transition-colors hover:bg-[#0D261F]"
                  >
                    <Phone className="h-3.5 w-3.5 text-gold" />
                    Call {BUSINESS.phoneDisplay}
                  </a>
                  <Link
                    to="/day-menu"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B84C32] hover:underline"
                  >
                    <UtensilsCrossed className="h-3.5 w-3.5" />
                    Explore Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Atmosphere Snippet */}
            <div className="overflow-hidden rounded-3xl border border-[#E5D5C3] bg-white shadow-md">
              <img
                src={diningRoom}
                alt="Monty Cafe & Restaurant interior dining room"
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <p className="font-display text-base font-bold text-[#173D32]">
                  Warm Community Dining
                </p>
                <p className="mt-1 text-xs text-[#4B3026]/80 leading-relaxed">
                  Whether it's morning bagels &amp; flat whites on Were Street or an evening of
                  authentic fragrant Indian curries with family, we look forward to having you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
