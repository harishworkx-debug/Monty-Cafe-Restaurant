/**
 * SEO metadata & Structured Data (JSON-LD) generators for Monty Cafe & Restaurant.
 * Conforms to schema.org standards for Restaurants, Menus, Breadcrumbs, and LocalBusiness.
 */

import { BUSINESS, HOURS } from "./site";

export const CANONICAL_BASE = "https://montycafe.com.au";

export function canonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_BASE}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Common PostalAddress Schema
 */
export const POSTAL_ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: "14 Were St",
  addressLocality: "Montmorency",
  addressRegion: "VIC",
  postalCode: "3094",
  addressCountry: "AU",
} as const;

/**
 * GeoCoordinates for 14 Were St, Montmorency VIC 3094
 */
export const GEO_COORDINATES_SCHEMA = {
  "@type": "GeoCoordinates",
  latitude: -37.717113,
  longitude: 145.118788,
} as const;

/**
 * OpeningHoursSpecification formatted for Google / Schema.org
 */
export const OPENING_HOURS_SPECIFICATION = [
  // Daytime Cafe Hours
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday"],
    opens: "07:00",
    closes: "14:00",
    description: "Daytime Cafe & Breakfast",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00",
    closes: "15:00",
    description: "Daytime Cafe & Brunch",
  },
  // Indian Dinner Hours (Thursday - Saturday)
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Thursday", "Friday", "Saturday"],
    opens: "17:00",
    closes: "21:00",
    description: "Raj Indian Restaurant — Dinner Service",
  },
];

/**
 * Primary Restaurant / Cafe LocalBusiness JSON-LD Schema
 */
export function getRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "CafeOrCoffeeShop"],
    "@id": `${CANONICAL_BASE}/#restaurant`,
    name: BUSINESS.name,
    alternateName: ["Monty Cafe", "Raj Indian Restaurant at Monty"],
    description:
      "Monty Cafe & Restaurant on Were Street, Montmorency — all-day breakfast, fresh bagels, specialty coffee by day, and authentic Indian dinner Thursday to Sunday.",
    url: CANONICAL_BASE,
    telephone: BUSINESS.phone,
    menu: `${CANONICAL_BASE}/day-menu`,
    hasMenu: [`${CANONICAL_BASE}/day-menu`, `${CANONICAL_BASE}/indian-dinner`],
    servesCuisine: [
      "Modern Australian",
      "Cafe",
      "Breakfast",
      "Brunch",
      "Indian",
      "Bagels",
      "Burgers",
    ],
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Credit Card, EFTPOS",
    address: POSTAL_ADDRESS_SCHEMA,
    geo: GEO_COORDINATES_SCHEMA,
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
    acceptsReservations: "True",
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${CANONICAL_BASE}/book-a-table`,
          inLanguage: "en-AU",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: {
          "@type": "FoodEstablishmentReservation",
          name: "Table Reservation",
        },
      },
    ],
    sameAs: [BUSINESS.mapsLink, BUSINESS.whatsapp],
  };
}

/**
 * BreadcrumbList Schema Generator
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/**
 * Day Menu Schema (Breakfast, Lunch, Burgers, Grab & Go)
 */
export function getDayMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${CANONICAL_BASE}/day-menu#menu`,
    name: "Monty Cafe Daytime Menu",
    description:
      "All-day breakfast, artisanal bagels, gourmet burgers, sandwiches, focaccias, burritos, and barista-crafted coffee at Monty Cafe in Montmorency.",
    url: `${CANONICAL_BASE}/day-menu`,
    inLanguage: "en-AU",
    mainEntityOfPage: `${CANONICAL_BASE}/day-menu`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: "5.00",
      highPrice: "28.90",
    },
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "All-Day Breakfast",
        description:
          "Eggs Benedict, Avocado Crush, Buttermilk Pancakes, Chilli Eggs Fusion, Brekky Burger, French Toast, and hearty breakfast platters.",
      },
      {
        "@type": "MenuSection",
        name: "Gourmet Burgers",
        description:
          "Classic Beef Burger, Fried Chicken Burger, Veggie Burger, Grilled Beef & Bacon, and The Lot served with chips.",
      },
      {
        "@type": "MenuSection",
        name: "Lunch & Sandwiches",
        description:
          "Steak Sandwich, Club Sandwich, BLT Focaccia, Chicken Schnitzel, Chicken Parma, and Fish & Chips.",
      },
      {
        "@type": "MenuSection",
        name: "Grab & Go Counter",
        description:
          "Fresh bagels, toasties, toasted sandwiches, croissants, gourmet focaccias, wraps, and burritos with a $2.50 small coffee add-on.",
      },
      {
        "@type": "MenuSection",
        name: "Pasta & Bowls",
        description:
          "Fettuccine Carbonara, Spaghetti Bolognese, Chicken Mushroom Fettuccine, and Pumpkin Spinach Gnocchi.",
      },
    ],
  };
}

/**
 * Indian Dinner Menu Schema
 */
export function getIndianDinnerMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${CANONICAL_BASE}/indian-dinner#menu`,
    name: "Raj Indian Restaurant at Monty — Dinner Menu",
    description:
      "Authentic Indian dinner in Montmorency: aromatic curries, tandoori starters, vegetarian specialties, biryani, and freshly baked naan.",
    url: `${CANONICAL_BASE}/indian-dinner`,
    inLanguage: "en-AU",
    mainEntityOfPage: `${CANONICAL_BASE}/indian-dinner`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: "4.50",
      highPrice: "28.90",
    },
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Starters & Entrees",
        description:
          "Vegetable Samosas, Onion Pakoras, Chicken Tikka, Seekh Kebabs, and Tandoori platters.",
      },
      {
        "@type": "MenuSection",
        name: "Chicken & Meat Curries",
        description:
          "Classic Butter Chicken, Chicken Tikka Masala, Lamb Rogan Josh, Beef Korma, and traditional Goat Curry.",
      },
      {
        "@type": "MenuSection",
        name: "Vegetarian & Vegan Specialties",
        description:
          "Paneer Butter Masala, Dal Makhani, Palak Paneer, Aloo Gobi, and spiced chickpea curries.",
      },
      {
        "@type": "MenuSection",
        name: "Biryani & Rice",
        description:
          "Aromatic Basmati rice, Vegetable Biryani, Chicken Dum Biryani, and saffron rice.",
      },
      {
        "@type": "MenuSection",
        name: "Tandoori Breads",
        description: "Freshly baked Garlic Naan, Plain Naan, Cheese Naan, and Roti.",
      },
    ],
  };
}

/**
 * Book a Table Page Schema
 */
export function getBookingPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${CANONICAL_BASE}/book-a-table#webpage`,
    name: "Reserve Your Table | Monty Cafe & Restaurant",
    description:
      "Book a table online or via WhatsApp for brunch or Indian dinner at 14 Were Street, Montmorency.",
    url: `${CANONICAL_BASE}/book-a-table`,
    inLanguage: "en-AU",
    potentialAction: {
      "@type": "ReserveAction",
      target: `${CANONICAL_BASE}/book-a-table`,
      name: "Table Reservation",
    },
  };
}

/**
 * About Page Schema
 */
export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${CANONICAL_BASE}/about#webpage`,
    name: "About Monty Cafe & Restaurant",
    description:
      "The story of Monty Cafe & Restaurant — community daytime cafe and authentic Indian dinner restaurant on Were Street, Montmorency.",
    url: `${CANONICAL_BASE}/about`,
    inLanguage: "en-AU",
    mainEntity: {
      "@type": "Restaurant",
      name: BUSINESS.name,
      address: POSTAL_ADDRESS_SCHEMA,
      telephone: BUSINESS.phone,
    },
  };
}

/**
 * Contact Page Schema
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${CANONICAL_BASE}/contact#webpage`,
    name: "Contact & Location | Monty Cafe & Restaurant",
    description:
      "Get in touch with Monty Cafe & Restaurant. Address: 14 Were St, Montmorency VIC 3094. Phone: +61 439 622 806.",
    url: `${CANONICAL_BASE}/contact`,
    inLanguage: "en-AU",
    mainEntity: {
      "@type": "Restaurant",
      name: BUSINESS.name,
      address: POSTAL_ADDRESS_SCHEMA,
      telephone: BUSINESS.phone,
      geo: GEO_COORDINATES_SCHEMA,
    },
  };
}

/**
 * Gallery Page Schema
 */
export function getGalleryPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL_BASE}/gallery#webpage`,
    name: "Photo Gallery | Monty Cafe & Restaurant",
    description:
      "A glimpse of life at Monty Cafe & Restaurant — breakfast dishes, coffee, burgers, and evening Indian curries.",
    url: `${CANONICAL_BASE}/gallery`,
    inLanguage: "en-AU",
  };
}
