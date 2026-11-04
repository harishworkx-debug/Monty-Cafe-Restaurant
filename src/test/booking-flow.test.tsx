import { describe, expect, it } from "vitest";
import { buildBookingMessage, whatsappLink, BUSINESS } from "@/lib/site";

describe("Booking flow and message validation", () => {
  it("generates correctly formatted message with all fields", () => {
    const data = {
      name: "Marcus Aurelius",
      phone: "+61 439 622 806",
      date: "2026-11-20",
      time: "7:00 PM",
      guests: "6",
      message: "Quiet corner table requested for an anniversary dinner.",
    };

    const msg = buildBookingMessage(data);

    expect(msg).toBe(
      "Hello Monty Cafe & Restaurant!\n\n" +
        "I would like to book a table.\n\n" +
        "Booking Details:\n\n" +
        "Name: Marcus Aurelius\n" +
        "Phone: +61 439 622 806\n" +
        "Date: 2026-11-20\n" +
        "Time: 7:00 PM\n" +
        "Number of Guests: 6\n\n" +
        "Additional Message: Quiet corner table requested for an anniversary dinner.\n\n" +
        "Please confirm whether a table is available.\n\n" +
        "Thank you!",
    );
  });

  it("handles empty or optional message gracefully", () => {
    const data = {
      name: "Sarah Conner",
      phone: "0400 123 456",
      date: "2026-11-21",
      time: "8:30 AM",
      guests: "2",
      message: "",
    };

    const msg = buildBookingMessage(data);
    expect(msg).toContain("Additional Message: None");
    expect(msg).toContain("Name: Sarah Conner");
    expect(msg).toContain("Number of Guests: 2");
  });

  it("produces valid URL for wa.me destination", () => {
    const data = {
      name: "Alice",
      phone: "0411 222 333",
      date: "2026-12-01",
      time: "1:00 PM",
      guests: "3",
      message: "Outside table",
    };

    const msg = buildBookingMessage(data);
    const url = whatsappLink(msg);

    expect(url.startsWith("https://wa.me/61439622806?text=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Hello Monty Cafe & Restaurant!"));
    expect(url).toContain(encodeURIComponent("Number of Guests: 3"));
  });

  it("has the verified official business phone and WhatsApp destination", () => {
    expect(BUSINESS.whatsapp).toBe("https://wa.me/61439622806");
    expect(BUSINESS.phone).toBe("+61 439 622 806");
  });
});
