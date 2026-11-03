import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import montyLogo from "@/assets/monty-logo.png";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/site";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Day Menu", to: "/day-menu" },
  { label: "Indian Dinner", to: "/indian-dinner" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overHero
          ? "bg-transparent"
          : "border-b border-border bg-cream/95 shadow-sm backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Monty Cafe & Restaurant — home">
          <img
            src={montyLogo}
            alt="Monty Cafe & Restaurant logo"
            className="h-11 w-auto rounded-lg bg-cream/90 p-1 shadow-sm transition-all hover:scale-105 md:h-13 md:p-1.5"
            width={120}
            height={56}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
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

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/day-menu"
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
              overHero
                ? "border-cream/50 text-cream hover:bg-cream hover:text-forest"
                : "border-forest/40 text-forest hover:bg-forest hover:text-cream",
            )}
          >
            View Menu
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream shadow-md transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-lg"
          >
            Book a Table
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={cn(
            "relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
            overHero && !menuOpen
              ? "border-cream/50 text-cream hover:bg-cream/10"
              : "border-border bg-cream text-forest",
          )}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-20 z-40 flex flex-col bg-forest-deep transition-all duration-500 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-10"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className={cn(
                "font-display text-3xl text-cream transition-all duration-500",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: menuOpen ? `${100 + i * 70}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={cn(
              "mt-4 flex flex-col items-center gap-4 transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: menuOpen ? "560ms" : "0ms" }}
          >
            <Link
              to="/day-menu"
              className="rounded-full border border-cream/50 px-8 py-3 text-sm font-semibold tracking-wide uppercase text-cream"
            >
              View Menu
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-terracotta px-8 py-3 text-sm font-semibold tracking-wide uppercase text-cream"
            >
              Book a Table
            </Link>
            <a href={BUSINESS.phoneHref} className="mt-2 text-sm text-cream/80">
              Call us — {BUSINESS.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
