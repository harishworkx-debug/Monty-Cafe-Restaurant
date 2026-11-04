import { useEffect, useState } from "react";
import montyLogo from "@/assets/monty-logo.png";
import { cn } from "@/lib/utils";

export const WELCOME_SESSION_KEY = "monty-welcome-shown";

// Exactly 2 seconds of display time as requested
const DISPLAY_DURATION_MS = 2000;
const FADE_OUT_MS = 400;

type Phase = "shown" | "leaving" | "done";

/**
 * Cinematic welcome intro:
 * Immediately 100% opaque on screen load with 0ms delay (no home page flash).
 * Displays for exactly 2 seconds, then smoothly transitions to the website.
 */
export function WelcomeIntro() {
  const [phase, setPhase] = useState<Phase>("shown");

  useEffect(() => {
    let shownBefore = false;
    try {
      shownBefore = sessionStorage.getItem(WELCOME_SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shownBefore || reduced) {
      setPhase("done");
      return;
    }
    try {
      sessionStorage.setItem(WELCOME_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // Exactly 2 seconds of display time
  useEffect(() => {
    if (phase !== "shown") return;
    const id = window.setTimeout(() => setPhase("leaving"), DISPLAY_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Smooth fade-out duration
  useEffect(() => {
    if (phase !== "leaving") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_OUT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Prevent background scrolling while the welcome screen is visible
  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome to Monty Cafe"
      style={{ opacity: 1, backgroundColor: "#0D261F" }}
      className={cn(
        "welcome-intro fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0D261F] px-6 text-center select-none",
        phase === "leaving" && "welcome-intro-leaving",
      )}
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="animate-float-y absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-terracotta/25 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10 pointer-events-none"
      />

      <button
        type="button"
        onClick={() => setPhase("leaving")}
        className="absolute top-6 right-6 rounded-full px-4 py-2 text-xs sm:text-sm text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
      >
        Skip
      </button>

      <img
        src={montyLogo}
        alt="Monty Cafe & Restaurant logo"
        width={130}
        height={60}
        className="intro-item relative z-10 h-22 sm:h-24 w-auto rounded-2xl bg-cream p-2.5 shadow-2xl"
      />
      <p className="intro-item relative z-10 mt-7 font-display text-3xl sm:text-5xl font-semibold text-cream">
        Welcome to Monty Cafe
      </p>
      <p className="intro-item relative z-10 mt-3 text-xs sm:text-base font-semibold tracking-[0.25em] text-terracotta-light uppercase">
        Good Food. Great Coffee. Wonderful Company.
      </p>
    </div>
  );
}
