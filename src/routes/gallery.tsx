import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { Reveal } from "@/components/site/Reveal";
import cafeInterior from "@/assets/cafe-interior.webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Gallery | Monty Cafe & Restaurant — Montmorency",
      },
      {
        name: "description",
        content:
          "Photos of Monty Cafe & Restaurant — breakfast dishes, coffee, bagels, burgers, sandwiches, Indian curries and the warm restaurant atmosphere in Montmorency.",
      },
    ],
    links: [{ rel: "canonical", href: "https://montycafe.com.au/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        image={cafeInterior}
        imageAlt="Monty Cafe's dining room filled with locals enjoying breakfast"
        eyebrow="Gallery"
        title="A Taste of What's Waiting"
        subtitle="From morning coffee to evening curries — a glimpse of life at Monty."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              Moments at Monty
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
              Food, Coffee & Community
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tap any photo to see it full size. From our breakfast spreads to our Indian dinner
              curries — here's what a visit to Monty looks like.
            </p>
          </Reveal>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
