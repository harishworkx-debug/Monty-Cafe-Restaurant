import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cafeInterior from "@/assets/cafe-interior.webp";
import parmigiana from "@/assets/parmigiana.webp";
import indianCurry from "@/assets/indian-curry.webp";
import communityTable from "@/assets/community-table.webp";
import { cn } from "@/lib/utils";
import { WA_MESSAGES, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

const SLIDES = [
  {
    image: cafeInterior,
    alt: "Inside Monty Cafe — warm, busy dining room on Were Street, Montmorency",
    eyebrow: "Welcome to Monty",
    title: "Good Food. Great Coffee. Good Company.",
    text: "Your neighbourhood cafe for fresh flavours, memorable moments and warm hospitality.",
    cta: { label: "Explore Our Menu", to: "/day-menu" },
  },
  {
    image: parmigiana,
    alt: "Homestyle chicken parmigiana with burgers and fresh salads at Monty Cafe",
    eyebrow: "Breakfast & Brunch",
    title: "Make Your Mornings Delicious.",
    text: "Discover beautiful breakfasts, freshly prepared bagels and barista-made coffee.",
    cta: { label: "Discover Day Menu", to: "/day-menu" },
  },
  {
    image: indianCurry,
    alt: "Authentic Indian curries with rice served in copper bowls at Monty Restaurant",
    eyebrow: "A Taste of India",
    title: "A Taste of India, Right Here in Monty.",
    text: "Enjoy comforting Indian flavours and memorable evenings with family and friends.",
    cta: { label: "Explore Indian Dinner", to: "/indian-dinner" },
  },
  {
    image: communityTable,
    alt: "Friends celebrating together around a table at Monty Cafe",
    eyebrow: "Community & Coffee",
    title: "Your Local Place to Connect.",
    text: "Come for the coffee, stay for the food and enjoy the warmth of Monty.",
    cta: { label: "Visit Us", to: "/contact" },
  },
] as const;

const AUTOPLAY_MS = 6500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  // Gentle parallax on the slide images while the hero is in view
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight) setOffset(window.scrollY * 0.25);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const slide = SLIDES[index] ?? SLIDES[0];

  return (
    <section
      className="relative h-[100svh] min-h-[560px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) touchX.current = touch.clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        if (touch && touchX.current !== null) {
          const delta = touch.clientX - touchX.current;
          if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
        }
        touchX.current = null;
        setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Monty Cafe highlights"
    >
      {/* Slides */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset}px)` }}>
        {SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
              i === index ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <img
              src={s.image}
              alt={i === index ? s.alt : ""}
              className={cn("h-full w-full object-cover", i === index && "animate-kenburns")}
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/85 via-forest-deep/45 to-forest-deep/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-forest-deep/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" key={index}>
          <p className="hero-rise hero-rise-1 text-sm font-semibold tracking-[0.35em] uppercase text-terracotta-light">
            {slide.eyebrow}
          </p>
          <h1 className="hero-rise hero-rise-2 mt-5 font-display text-4xl leading-[1.08] font-semibold text-cream sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="hero-rise hero-rise-3 mt-5 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            {slide.text}
          </p>
          <div className="hero-rise hero-rise-4 mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={slide.cta.to}
              className="rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold tracking-wide uppercase text-cream shadow-lg transition-all hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-xl"
            >
              {slide.cta.label}
            </Link>
            <a
              href={whatsappLink(WA_MESSAGES.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-8 py-3.5 text-sm font-semibold tracking-wide uppercase text-cream transition-all hover:bg-cream hover:text-forest"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 text-cream transition-all hover:scale-110 hover:bg-cream hover:text-forest sm:left-8"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 text-cream transition-all hover:scale-110 hover:bg-cream hover:text-forest sm:right-8"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-500",
              i === index ? "w-10 bg-terracotta" : "bg-cream/50 hover:bg-cream/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
