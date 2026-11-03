import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

import cafeInterior from "@/assets/cafe-interior.webp";
import diningRoom from "@/assets/dining-room.webp";
import coffeeCounter from "@/assets/coffee-counter.webp";
import communityTable from "@/assets/community-table.webp";
import burgers from "@/assets/burgers.webp";
import breakfastRoll from "@/assets/breakfast-roll.webp";
import parmigiana from "@/assets/parmigiana.webp";
import clubSandwich from "@/assets/club-sandwich.webp";
import indianCurry from "@/assets/indian-curry.webp";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

/** All Monty photos in one shared list — used by the gallery page and homepage. */
export const GALLERY_IMAGES: GalleryImage[] = [
  { src: cafeInterior, alt: "Monty Cafe's dining room filled with locals enjoying breakfast", caption: "Atmosphere" },
  { src: diningRoom, alt: "Guests dining inside Monty Cafe & Restaurant", caption: "Dining room" },
  { src: coffeeCounter, alt: "Barista coffee machine at the Monty Cafe counter with menu boards", caption: "Great coffee" },
  { src: communityTable, alt: "Friends celebrating a special occasion together at Monty Cafe", caption: "Community" },
  { src: burgers, alt: "Juicy burgers with chips served on red-check paper at Monty Cafe", caption: "Burgers" },
  { src: breakfastRoll, alt: "Freshly prepared breakfast roll with fried egg and hashbrown", caption: "Breakfast" },
  { src: parmigiana, alt: "Homestyle chicken parmigiana with burgers and fresh salads", caption: "Lunch favourites" },
  { src: clubSandwich, alt: "Club sandwich with hot chips at Monty Cafe", caption: "Sandwiches" },
  { src: indianCurry, alt: "Indian curries with rice served in copper bowls at Monty Restaurant", caption: "Indian dinner" },
];

interface GalleryGridProps {
  images?: GalleryImage[];
}

export function GalleryGrid({ images = GALLERY_IMAGES }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) =>
      setLightbox((cur) => (cur === null ? null : (cur + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((img, i) => (
          <Reveal key={img.src + i} delay={(i % 3) * 90}>
            <button
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Open photo: ${img.caption}`}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-border focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:outline-none"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="font-display text-lg font-medium text-cream">{img.caption}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={close}
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-deep"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-deep sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-deep sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure
            className={cn("max-h-full max-w-4xl transition-transform duration-300")}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center font-display text-lg text-cream">
              {images[lightbox].caption}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
