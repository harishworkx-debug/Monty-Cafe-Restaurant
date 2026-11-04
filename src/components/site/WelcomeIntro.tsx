import { useEffect, useState } from "react";
import montyLogo from "@/assets/monty-logo.png";
import { cn } from "@/lib/utils";

export const WELCOME_SESSION_KEY = "monty-welcome-shown";

const LEAVE_AFTER_MS = 2700;
const FADE_OUT_MS = 700;

type Phase = "shown" | "leaving" | "done";

/**
 * Cinematic welcome intro, shown once per browser session.
 * Rendered in the server HTML so it is the first thing visible on load; the root
 * layout hides it before paint for returning visitors and reduced-motion users.
 */
export function WelcomeIntro() {
  const [phase, setPhase] = useState<Phase>("shown");

  useEffect(() => {
    let shownBefore = true;
    try {
      shownBefore = sessionStorage.getItem(WELCOME_SESSION_KEY) === "1";
    } catch {
      /* storage unavailable: skip the intro */
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

  useEffect(() => {
    if (phase !== "shown") return;
    const id = window.setTimeout(() => setPhase("leaving"), LEAVE_AFTER_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_OUT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

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
      className={cn(
        "welcome-intro fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-forest-deep px-6 text-center",
        phase === "leaving" && "welcome-intro-leaving",
      )}
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/10 blur-3xl"
      />
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
