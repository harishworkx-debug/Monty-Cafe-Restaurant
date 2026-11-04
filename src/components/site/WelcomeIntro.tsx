import { useEffect, useState } from "react";
import montyLogo from "@/assets/monty-logo.png";
import { cn } from "@/lib/utils";

const SESSION_KEY = "monty-welcome-shown";

type Phase = "idle" | "shown" | "leaving" | "done";

/**
 * Cinematic welcome intro — shown once per browser session.
 * Respects sessionStorage and prefers-reduced-motion; skipped entirely for
 * returning visitors and reduced-motion users.
 */
export function WelcomeIntro() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    let shownBefore = false;
    try {
      shownBefore = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      shownBefore = true; // storage unavailable — safest to skip
    }
    if (shownBefore) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    if (reduced) return;

    setPhase("shown");
    const t1 = window.setTimeout(() => setPhase("leaving"), 2700);
    const t2 = window.setTimeout(() => setPhase("done"), 3450);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "shown" && phase !== "leaving") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase !== "shown" && phase !== "leaving") return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome to Monty Cafe"
      className={cn(
        "welcome-intro fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-forest-deep px-6 text-center",
        phase === "leaving" && "welcome-intro-leaving",
      )}
    >
      {/* Soft warm glow behind the logo */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/10 blur-3xl"
      />
      {/* Subtle coffee-inspired ring */}
      <div
        aria-hidden
        className="animate-float-y absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-terracotta/25"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10"
      />

      <button
        type="button"
        onClick={() => setPhase("leaving")}
        className="absolute top-6 right-6 rounded-full px-4 py-2 text-sm text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
      >
        Skip
      </button>

      <img
        src={montyLogo}
        alt="Monty Cafe & Restaurant logo"
        width={120}
        height={56}
        className="intro-item relative z-10 h-24 w-auto rounded-2xl bg-cream p-2.5 shadow-2xl"
        style={{ animationDelay: "0.15s" }}
      />
      <p
        className="intro-item relative z-10 mt-8 font-display text-4xl font-semibold text-cream sm:text-5xl"
        style={{ animationDelay: "0.4s" }}
      >
        Welcome to Monty Cafe
      </p>
      <p
        className="intro-item relative z-10 mt-4 text-sm font-semibold tracking-[0.3em] text-terracotta-light uppercase sm:text-base"
        style={{ animationDelay: "0.65s" }}
      >
        Good Food. Great Coffee. Wonderful Company.
      </p>
    </div>
  );
}
