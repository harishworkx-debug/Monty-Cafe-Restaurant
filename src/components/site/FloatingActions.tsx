import { Link } from "@tanstack/react-router";
import { WhatsAppIcon } from "./WhatsApp";
import { BUSINESS } from "@/lib/site";

/**
 * Universal, elegant restaurant dining cutlery icon for the center disc.
 * Represents fine cafe & evening restaurant dining.
 */
function DiningCenterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {/* Classic fork on left, knife on right */}
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7z" />
      <path d="M21 2c-3.31 0-6 2.69-6 6v7h2.5v7h2.5V2z" />
    </svg>
  );
}

/**
 * Rotating "Book a Table" floating button.
 * Scaled to match the exact size of the WhatsApp button (56px / h-14 w-14)
 * with continuous circular text rotation, glowing outer ring,
 * and stationary center dining icon.
 *
 * Clicking navigates directly to the dedicated booking page: /book-a-table
 */
export function RotatingBookButton() {
  return (
    <Link
      to="/book-a-table"
      aria-label="Book a table at Monty Cafe & Restaurant"
      className="group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:scale-108 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
    >
      {/* Outer pulsing glow halo */}
      <span
        aria-hidden="true"
        className="animate-booking-glow absolute -inset-1 rounded-full bg-gradient-to-tr from-[#B84C32] via-[#D9A441] to-[#173D32] opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100 group-hover:blur-md"
      />

      {/* Main button container with gentle breathing pulse */}
      <div className="animate-pulse-gentle relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#173D32] via-[#112F26] to-[#0D261F] shadow-[0_6px_18px_rgba(13,38,31,0.5),0_2px_4px_rgba(0,0,0,0.3)] ring-1 ring-[#D9A441]/50">
        {/* Subtle rotating decorative outer dashed accent ring */}
        <svg
          viewBox="0 0 100 100"
          className="animate-spin-reverse-slow absolute inset-0 h-full w-full pointer-events-none"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="47.5"
            fill="none"
            stroke="#D9A441"
            strokeWidth="0.8"
            strokeDasharray="2.5 3.5"
            strokeOpacity="0.45"
          />
        </svg>

        {/* Continuously rotating circular text: "BOOK A TABLE • BOOK A TABLE •" */}
        <div className="animate-spin-slow absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <defs>
              <path
                id="bookTableCirclePath"
                d="M 50, 50 m -35.2, 0 a 35.2,35.2 0 1,1 70.4,0 a 35.2,35.2 0 1,1 -70.4,0"
              />
            </defs>
            <text
              className="fill-[#FFF8EF] font-extrabold uppercase"
              style={{
                fontSize: "8.5px",
                letterSpacing: "0.18em",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
              }}
            >
              <textPath href="#bookTableCirclePath" startOffset="0%">
                BOOK A TABLE • BOOK A TABLE •&#160;
              </textPath>
            </text>
          </svg>
        </div>

        {/* Central stationary booking icon badge (remains visually stable, does NOT rotate) */}
        <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#B84C32] to-[#CC5A3F] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-[#D9A441] transition-transform duration-300 group-hover:scale-110">
          <DiningCenterIcon className="h-3.5 w-3.5 text-[#FFF8EF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* Tooltip: "Book a Table" */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3.5 hidden items-center rounded-full border border-gold/40 bg-[#0D261F]/95 px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-[#FFF8EF] shadow-xl backdrop-blur-sm group-hover:flex group-focus-visible:flex transition-opacity"
      >
        Book a Table
      </span>
    </Link>
  );
}

/**
 * Floating WhatsApp Button.
 * Recognizable WhatsApp green (#25D366), white icon, circular shape,
 * soft shadow, subtle pulse animation, hover glow effect, and "Chat with Us" tooltip.
 * Exactly 56px (h-14 w-14) to match the rotating booking button.
 * Clicking directly opens WhatsApp chat at https://wa.me/61439622806.
 */
export function FloatingWhatsAppButton() {
  return (
    <a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Us on WhatsApp"
      className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_18px_rgba(37,211,102,0.35),0_2px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-108 hover:shadow-[0_0_24px_rgba(37,211,102,0.7)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
    >
      {/* Subtle pulse wave */}
      <span
        aria-hidden="true"
        className="animate-whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366]"
      />

      {/* Official WhatsApp Icon */}
      <WhatsAppIcon className="relative z-10 h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* Tooltip: "Chat with Us" */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3.5 hidden items-center rounded-full border border-white/10 bg-[#0D261F]/95 px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-[#FFF8EF] shadow-xl backdrop-blur-sm group-hover:flex group-focus-visible:flex transition-opacity"
      >
        Chat with Us
      </span>
    </a>
  );
}

/**
 * Unified Floating Actions Container:
 * Renders both floating buttons fixed on the right-hand side of every page:
 * Both buttons share identical 56px (h-14 w-14) circular dimensions for a
 * balanced, unified, and premium aesthetic.
 * - Top: Rotating "Book a Table" button (navigates to /book-a-table)
 * - Bottom: WhatsApp button (opens direct WhatsApp chat)
 */
export function FloatingActions() {
  return (
    <aside
      aria-label="Quick booking and contact actions"
      className="fixed right-3.5 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-center gap-3.5 print:hidden pointer-events-none"
    >
      <div className="pointer-events-auto">
        <RotatingBookButton />
      </div>
      <div className="pointer-events-auto">
        <FloatingWhatsAppButton />
      </div>
    </aside>
  );
}
