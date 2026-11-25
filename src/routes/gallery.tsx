import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, UtensilsCrossed } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { Reveal } from "@/components/site/Reveal";
import { getGalleryPageSchema, getBreadcrumbSchema } from "@/lib/seo";
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
      {
        property: "og:title",
        content: "Photo Gallery | Monty Cafe & Restaurant",
      },
      {
        property: "og:description",
        content:
          "Take a peek inside Monty Cafe & Restaurant — artisan breakfast, coffee, burgers, and evening Indian dishes.",
      },
      { property: "og:url", content: "https://montycafe.com.au/gallery" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://montycafe.com.au/gallery" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(getGalleryPageSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ),
      },
    ],
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

      {/* Internal Link CTA Section */}
      <section className="bg-forest-deep py-16 text-cream lg:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-light">
              Visit Monty
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl text-cream">
              Taste the Experience in Person
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              From our morning cafe spreads on Were Street to evening aromatic Indian curries with
              family, we would love to welcome you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/day-menu"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-cream shadow-md transition-all hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-lg"
              >
                <UtensilsCrossed className="h-4 w-4 text-gold" />
                Explore Day Menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/indian-dinner"
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-cream shadow-md transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lg"
              >
                <UtensilsCrossed className="h-4 w-4 text-cream" />
                Indian Dinner Menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/book-a-table"
                className="group inline-flex items-center gap-2 rounded-full border border-cream/35 px-6 py-3 text-sm font-bold text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-forest-deep"
              >
                <CalendarCheck className="h-4 w-4 text-gold" />
                Reserve a Table
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
