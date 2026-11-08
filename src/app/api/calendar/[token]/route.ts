import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

type CalendarRange = {
  id: string;
  arrival: string;
  departure: string;
};

type BookingCalendarEntry = CalendarRange & { guest_name: string };

const escapeIcalText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const event = (uid: string, start: string, end: string, summary: string) =>
  [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;VALUE=DATE:${start.replace(/-/g, "")}`,
    `DTEND;VALUE=DATE:${end.replace(/-/g, "")}`,
    `SUMMARY:${escapeIcalText(summary)}`,
    "END:VEVENT",
  ].join("\r\n");

const isValidToken = (provided: string, expected: string) => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

export async function GET(
  _request: Request,
  context: RouteContext<"/api/calendar/[token]">,
) {
  const { token } = await context.params;
  const expectedToken = process.env.CALENDAR_FEED_TOKEN;

  if (!expectedToken || !isValidToken(token, expectedToken)) {
    return new Response("Not found", { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new Response("Calendar is not configured", { status: 503 });
  }

  const [bookingsResult, blocksResult] = await Promise.all([
    supabase
      .from("bookings")
      .select("id, arrival, departure, guest_name")
      .eq("status", "confirmed")
      .order("arrival"),
    supabase
      .from("blocked_dates")
      .select("id, arrival, departure")
      .order("arrival"),
  ]);

  if (bookingsResult.error || blocksResult.error) {
    console.error("Could not load calendar feed", {
      bookingsError: bookingsResult.error,
      blocksError: blocksResult.error,
    });
    return new Response("Could not load calendar", { status: 500 });
  }

  const events = [
    ...(bookingsResult.data as BookingCalendarEntry[]).map((booking) => {
      const firstName = booking.guest_name.trim().split(/\s+/)[0] || "Guest";
      return event(
        `booking-${booking.id}@casalasorpresa.com`,
        booking.arrival,
        booking.departure,
        `CLS - ${firstName} booking`,
      );
    }),
    ...(blocksResult.data as CalendarRange[]).map((block) =>
      event(`block-${block.id}@casalasorpresa.com`, block.arrival, block.departure, "Unavailable"),
    ),
  ];

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Casa la Sorpresa//Availability Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Casa la Sorpresa availability",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="casa-la-sorpresa.ics"',
      "Cache-Control": "no-store, private",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
