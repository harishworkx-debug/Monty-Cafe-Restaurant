import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Public booking-enquiry endpoint.
 * Visitors submit the "Book a Table" form here; enquiries are stored for the
 * cafe owner. No private data is returned — the response is a plain ok/error.
 */

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(255),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  preferredTime: z.string().trim().min(1).max(20),
  guests: z.coerce.number().int().min(1).max(40),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const Route = createFileRoute("/api/public/booking-enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => null);
          const parsed = enquirySchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "Please check the form fields and try again." },
              { status: 400 },
            );
          }
          const d = parsed.data;
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("booking_enquiries").insert({
            full_name: d.fullName,
            phone: d.phone,
            email: d.email,
            preferred_date: d.preferredDate,
            preferred_time: d.preferredTime,
            guests: d.guests,
            message: d.message ? d.message : null,
          });
          if (error) {
            console.error("[booking-enquiry] insert failed:", error.message);
            return Response.json(
              { ok: false, error: "We couldn't record your enquiry right now — please call us instead." },
              { status: 500 },
            );
          }
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[booking-enquiry] unexpected error:", err);
          return Response.json(
            { ok: false, error: "Something went wrong. Please try again or call us." },
            { status: 500 },
          );
        }
      },
    },
  },
});
