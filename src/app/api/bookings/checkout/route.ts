import { NextResponse } from "next/server";
import { bookingRequestSchema, quoteStay } from "@/lib/booking";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";
import { siteUrl } from "@/data/site";

export const POST = async (request: Request) => {
  const parsed = bookingRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid booking request." },
      { status: 400 },
    );
  }

  const booking = parsed.data;
  const quote = quoteStay(booking.arrival, booking.departure, booking.guests);

  const supabase = getSupabaseAdmin();
  const stripe = getStripe();

  if (!supabase || !stripe) {
    return NextResponse.json({
      message:
        "Demo mode: your dates passed validation. Connect Supabase and Stripe env vars to create live holds and deposit checkout.",
      quote,
    });
  }

  const { data: conflicts, error: conflictError } = await supabase
    .from("bookings")
    .select("id")
    .lt("arrival", booking.departure)
    .gt("departure", booking.arrival)
    .in("status", ["hold", "confirmed"])
    .limit(1);

  if (conflictError) {
    return NextResponse.json(
      { error: "Could not check availability." },
      { status: 500 },
    );
  }

  if (conflicts.length > 0) {
    return NextResponse.json(
      { error: "Those dates are no longer available." },
      { status: 409 },
    );
  }

  const { data: blocks, error: blockError } = await supabase
    .from("blocked_dates")
    .select("id")
    .lt("arrival", booking.departure)
    .gt("departure", booking.arrival)
    .limit(1);

  if (blockError) {
    return NextResponse.json(
      { error: "Could not check availability." },
      { status: 500 },
    );
  }

  if (blocks.length > 0) {
    return NextResponse.json(
      { error: "Those dates are no longer available." },
      { status: 409 },
    );
  }

  const holdExpiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  const { data: hold, error: holdError } = await supabase
    .from("bookings")
    .insert({
      arrival: booking.arrival,
      departure: booking.departure,
      guests: booking.guests,
      guest_name: booking.name,
      guest_email: booking.email,
      notes: booking.notes,
      locale: booking.locale,
      status: "hold",
      quoted_total: quote.total,
      deposit_amount: quote.deposit,
      currency: quote.currency,
      hold_expires_at: holdExpiresAt,
    })
    .select("id")
    .single();

  if (holdError?.code === "23P01" || holdError?.code === "23505") {
    return NextResponse.json(
      { error: "Those dates are no longer available." },
      { status: 409 },
    );
  }

  if (holdError || !hold) {
    return NextResponse.json(
      { error: "Could not create booking hold." },
      { status: 500 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: booking.email,
    line_items: [
      {
        price_data: {
          currency: quote.currency,
          product_data: {
            name: "Casa la Sorpresa reservation deposit",
            description: `${booking.arrival} to ${booking.departure}, ${quote.nights} nights`,
          },
          unit_amount: quote.deposit * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: String(hold.id),
      arrival: booking.arrival,
      departure: booking.departure,
    },
    success_url: `${siteUrl}/${booking.locale}/booking?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/${booking.locale}/booking?status=cancelled`,
  });

  await supabase
    .from("bookings")
    .update({ stripe_session_id: session.id })
    .eq("id", hold.id);

  return NextResponse.json({ url: session.url, quote });
};
