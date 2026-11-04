import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WA_MESSAGES, whatsappLink } from "@/lib/site";

/** Official WhatsApp brand path (simple-icons "whatsapp"). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.595 5.391l-.999 3.648 3.893-1.738zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

type WhatsAppButtonVariant = "solid" | "outline" | "onDark";

const VARIANTS: Record<WhatsAppButtonVariant, string> = {
  solid:
    "bg-[#25D366] text-white shadow-md hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg",
  outline:
    "border border-[#25D366] bg-transparent text-[#128C4A] hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white",
  onDark:
    "border border-[#25D366]/70 bg-transparent text-[#4be08c] hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
};

interface WhatsAppButtonProps {
  /** Pre-filled message that opens in WhatsApp. */
  message: string;
  children?: ReactNode;
  variant?: WhatsAppButtonVariant;
  /** Render as a large, easy-to-tap button (default true). */
  className?: string;
}

/**
 * WhatsApp CTA button — opens wa.me with a pre-filled message.
 * The customer still sends the message themselves; nothing is submitted elsewhere.
 */
export function WhatsAppButton({
  message,
  children,
  variant = "solid",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-semibold transition-all",
        VARIANTS[variant],
        className,
      )}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      {children}
    </a>
  );
}

/** Floating WhatsApp button — fixed bottom-right on every page. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#25D366]/40 focus-visible:outline-none"
    >
      <span
        aria-hidden
        className="animate-whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366]"
      />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span
        aria-hidden
        className="pointer-events-none absolute right-full mr-3 hidden items-center rounded-full bg-forest-deep px-4 py-2 text-sm font-medium whitespace-nowrap text-cream shadow-lg group-hover:flex group-focus-visible:flex"
      >
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
