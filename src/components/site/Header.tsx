import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, CalendarCheck, Phone } from "lucide-react";
import montyLogo from "@/assets/monty-logo.png";
import { cn } from "@/lib/utils";
import { BUSINESS, WA_MESSAGES, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Day Menu", to: "/day-menu" },
  { label: "Indian Dinner", to: "/indian-dinner" },
  { label: "Book a Table", to: "/book-a-table" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const overHero = location.pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top Navbar */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          overHero
            ? "bg-transparent"
            : "border-b border-border bg-cream/95 shadow-sm backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="Monty Cafe & Restaurant — home"
          >
            <img
              src={montyLogo}
              alt="Monty Cafe & Restaurant logo"
              className="h-11 w-auto rounded-lg bg-cream/90 p-1 shadow-sm transition-all hover:scale-105 md:h-13 md:p-1.5"
              width={120}
              height={56}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-6 xl:gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className={cn(
                  "group relative text-sm font-semibold tracking-wide uppercase transition-colors",
                  overHero ? "text-cream/90 hover:text-cream" : "text-coffee/80 hover:text-forest",
                )}
                activeProps={{
                  className: overHero
                    ? "!text-terracotta-light"
                    : "!text-forest after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-terracotta",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/day-menu"
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                overHero
                  ? "border-cream/50 text-cream hover:bg-cream hover:text-forest"
                  : "border-forest/40 text-forest hover:bg-forest hover:text-cream",
              )}
            >
              View Menu
            </Link>
            <Link
              to="/book-a-table"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream shadow-md transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-lg active:scale-95"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Table
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className={cn(
              "relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              overHero
                ? "border-cream/50 text-cream hover:bg-cream/10"
                : "border-border bg-cream text-forest",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer (Rendered outside header with z-[100] and 100% solid dark background) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ backgroundColor: "#0D261F" }}
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-[#0D261F] text-[#FFF8EF] transition-all duration-300 lg:hidden",
          menuOpen
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none",
        )}
      >
        {/* Mobile Header Bar */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#FFF8EF]/15 px-4 sm:px-6">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center"
            aria-label="Monty Cafe & Restaurant — home"
          >
            <img
              src={montyLogo}
              alt="Monty Cafe & Restaurant logo"
              className="h-11 w-auto rounded-lg bg-cream/95 p-1 shadow-md"
              width={120}
              height={56}
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFF8EF]/30 bg-white/10 text-[#FFF8EF] transition-colors hover:bg-white/20 active:scale-95"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col items-center gap-4 text-center"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              const isBooking = link.to === "/book-a-table";
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  className={cn(
                    "font-display text-2xl sm:text-3xl font-semibold transition-colors py-1.5 px-4 rounded-xl",
                    isBooking
                      ? "text-gold hover:text-cream"
                      : isActive
                        ? "text-terracotta-light underline underline-offset-8"
                        : "text-[#FFF8EF] hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Action Buttons Section */}
            <div className="mt-6 flex w-full max-w-xs flex-col items-stretch gap-3 border-t border-[#FFF8EF]/15 pt-6">
              <Link
                to="/book-a-table"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#B84C32] px-6 py-3 text-base font-bold uppercase tracking-wider text-[#FFF8EF] shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Table
              </Link>

              <a
                href={whatsappLink(WA_MESSAGES.booking)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book via WhatsApp
              </a>

              <a
                href={BUSINESS.phoneHref}
                className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#FFF8EF]/80 hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                Call us — {BUSINESS.phoneDisplay}
              </a>

              <p className="text-center text-xs text-[#FFF8EF]/60">
                14 Were St, Montmorency VIC 3094
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
