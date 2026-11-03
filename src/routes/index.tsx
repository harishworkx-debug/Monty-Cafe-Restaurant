import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/site/HeroSlider";
import { StorySection } from "@/components/site/StorySection";
import { FoodExperience } from "@/components/site/FoodExperience";
import { BagelCollection } from "@/components/site/BagelCollection";
import { WhyVisit } from "@/components/site/WhyVisit";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { OpeningHours } from "@/components/site/OpeningHours";
import { BookingSection } from "@/components/site/BookingSection";
import { LocationSection } from "@/components/site/LocationSection";
import { Reveal } from "@/components/site/Reveal";
import { BUSINESS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Monty Cafe & Restaurant | Cafe, Brunch & Indian Dinner in Montmorency",
      },
      {
        name: "description",
        content:
          "Monty Cafe & Restaurant on Were Street, Montmorency — all-day breakfast, fresh bagels, quality coffee and authentic Indian dinner, Thursday to Sunday.",
      },
      { property: "og:site_name", content: "Monty Cafe & Restaurant" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Monty Cafe & Restaurant | Montmorency" },
      {
        property: "og:description",
        content:
          "Community cafe by day, Indian restaurant by night. Breakfast, brunch, bagels, coffee & authentic Indian dinner in Montmorency, Victoria.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://montycafe.com.au/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: BUSINESS.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: "14 Were St",
            addressLocality: "Montmorency",
            addressRegion: "VIC",
            postalCode: "3094",
            addressCountry: "AU",
          },
          telephone: BUSINESS.phone,
          url: BUSINESS.website,
          servesCuisine: ["Cafe", "Breakfast", "Brunch", "Indian"],
          priceRange: "$$",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSlider />
      <StorySection />
      <FoodExperience />
      <BagelCollection />
      <WhyVisit />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-terracotta">
              Gallery
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-forest sm:text-4xl">
              A Taste of What's Waiting
            </h2>
            <p className="mt-4 text-muted-foreground">
              From morning coffee to evening curries — a glimpse of life at Monty.
            </p>
          </Reveal>
          <GalleryGrid />
        </div>
      </section>
      <OpeningHours />
      <BookingSection />
      <LocationSection />
    </>
  );
}
