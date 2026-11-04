import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { buildBookingMessage, whatsappLink, BUSINESS } from "@/lib/site";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /book-a-table instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/book-a-table");

    expect(matches.at(-1)?.routeId).toBe("/book-a-table");
  });
});

describe("Booking message formatting", () => {
  it("formats the WhatsApp booking message exactly as specified", () => {
    const message = buildBookingMessage({
      name: "John Smith",
      phone: "0439 123 456",
      date: "2026-11-10",
      time: "6:30 PM",
      guests: "4",
      message: "Window table please",
    });

    expect(message).toContain("Hello Monty Cafe & Restaurant!");
    expect(message).toContain("I would like to book a table.");
    expect(message).toContain("Booking Details:");
    expect(message).toContain("Name: John Smith");
    expect(message).toContain("Phone: 0439 123 456");
    expect(message).toContain("Date: 2026-11-10");
    expect(message).toContain("Time: 6:30 PM");
    expect(message).toContain("Number of Guests: 4");
    expect(message).toContain("Additional Message: Window table please");
    expect(message).toContain("Please confirm whether a table is available.");
    expect(message).toContain("Thank you!");
  });

  it("generates correct wa.me link with encoded text", () => {
    const url = whatsappLink("Hello Monty!");
    expect(url).toBe(`https://wa.me/61439622806?text=${encodeURIComponent("Hello Monty!")}`);
  });
});
