/**
 * Central business data for Monty Cafe & Restaurant.
 * Prices, hours and contact details live here so they are easy to update.
 */

export const BUSINESS = {
  name: "Monty Cafe & Restaurant",
  tagline: "Good Food. Great Coffee. Wonderful Company.",
  address: "14 Were St, Montmorency VIC 3094, Australia",
  phone: "+61 439 622 806",
  phoneDisplay: "0439 622 806",
  phoneHref: "tel:+61439622806",
  whatsapp: "https://wa.me/61439622806",
  whatsappNumber: "+61 439 622 806",
  website: "https://montycafe.com.au/",
  mapsLink: "https://maps.app.goo.gl/Yry2rHNFYEvxUAp1A",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.109255451877!2d145.1187881114976!3d-37.717113271883115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad648160895c1d7%3A0x915b452a3afc40a8!2sMonty%20Cafe%20%26%20Restaurant!5e0!3m2!1sen!2sin!4v1793680587768!5m2!1sen!2sin",
} as const;

/** cafe = daytime cafe hours, dinner = Indian dinner hours (null when closed) */
export const HOURS: { day: string; cafe: string; dinner: string | null }[] = [
  { day: "Monday", cafe: "7 AM – 2 PM", dinner: null },
  { day: "Tuesday", cafe: "7 AM – 2 PM", dinner: null },
  { day: "Wednesday", cafe: "7 AM – 3 PM", dinner: null },
  { day: "Thursday", cafe: "7 AM – 3 PM", dinner: "5 PM – 9 PM" },
  { day: "Friday", cafe: "7 AM – 3 PM", dinner: "5 PM – 9 PM" },
  { day: "Saturday", cafe: "7 AM – 3 PM", dinner: "5 PM – 9 PM" },
  { day: "Sunday", cafe: "7 AM – 3 PM", dinner: null },
];

/** Signature bagel range — update names/prices here and the site follows. */
export const BAGELS: { name: string; description: string; price: number }[] = [
  { name: "Schnitzel Bagel", description: "Coleslaw, cheese & schnitzel", price: 15 },
  { name: "Chicken & Avo Bagel", description: "Chicken, avo, onion & relish", price: 15 },
  { name: "Bacon & Egg Bagel", description: "Egg, bacon & cheese", price: 12 },
  { name: "Brekky Bagel", description: "Bacon, egg, cheese, hashbrown & relish", price: 14 },
  { name: "BLT Bagel", description: "Bacon, lettuce & tomato", price: 14 },
  { name: "Ham, Cheese & Tomato Bagel", description: "Ham, cheese & tomato", price: 13 },
  { name: "Nutella Bagel", description: "Nutella & strawberry", price: 14 },
  { name: "Biscoff Bagel", description: "Biscoff spread & crumble", price: 13 },
];

export const DINNER_NOTE =
  "Indian dinner is served Thursday to Sunday, 5 PM – 9 PM. Trading hours can change on public holidays — please call to confirm before your visit.";

/**
 * Build an official wa.me link with a pre-filled, URL-encoded message.
 * Used for every booking and enquiry — the customer sends the message
 * themselves in WhatsApp, so nothing is stored or sent elsewhere.
 */
export function whatsappLink(message: string): string {
  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface BookingDetails {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message?: string;
}

/**
 * Formats the booking form into the exact requested message format
 * ready for the customer to review and send in WhatsApp.
 */
export function buildBookingMessage(d: BookingDetails): string {
  const lines = [
    "Hello Monty Cafe & Restaurant!",
    "",
    "I would like to book a table.",
    "",
    "Booking Details:",
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Date: ${d.date}`,
    `Time: ${d.time}`,
    `Number of Guests: ${d.guests}`,
    "",
    `Additional Message: ${d.message && d.message.trim() ? d.message.trim() : "None"}`,
    "",
    "Please confirm whether a table is available.",
    "",
    "Thank you!",
  ];
  return lines.join("\n");
}

/** Pre-filled WhatsApp messages for each part of the site. */
export const WA_MESSAGES = {
  general: "Hello Monty Cafe & Restaurant! I have a question about your cafe, please.",
  booking: "Hello Monty Cafe & Restaurant! I would like to book a table, please.",
  dayMenu: "Hello Monty Cafe & Restaurant! I would like to enquire about your day menu, please.",
  indianDinner:
    "Hello Monty Cafe & Restaurant! I would like to know more about your Indian dinner menu, please.",
  bagels:
    "Hello Monty Cafe & Restaurant! I would like to enquire about your bagel collection, please.",
  takeaway: "Hello Monty Cafe & Restaurant! I would like to order a takeaway, please.",
} as const;
