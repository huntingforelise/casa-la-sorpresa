import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendBookingConfirmationEmails } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

export const POST = async (request: Request) => {
  const stripe = getStripe();
  const supabase = getSupabaseAdmin();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !supabase || !signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
          confirmed_at: new Date().toISOString(),
        })
        .eq("id", bookingId)
        .select(
          "id, arrival, departure, guests, guest_name, guest_email, notes, quoted_total, deposit_amount, currency",
        )
        .single();

      if (bookingError || !booking) {
        console.error("Could not confirm booking after Stripe checkout", {
          bookingId,
          error: bookingError,
        });
      }

      await supabase.from("booking_events").insert({
        booking_id: bookingId,
        event_type: "checkout.session.completed",
        payload: session,
      });

      if (booking) {
        const { data: sentEvent, error: sentEventError } = await supabase
          .from("booking_events")
          .select("id")
          .eq("booking_id", booking.id)
          .eq("event_type", "booking.confirmation_email.sent")
          .maybeSingle();

        if (sentEventError) {
          console.error("Could not check booking confirmation email status", {
            bookingId: booking.id,
            error: sentEventError,
          });
        }

        if (!sentEvent && !sentEventError) {
          try {
            const sent = await sendBookingConfirmationEmails({
              arrival: booking.arrival,
              departure: booking.departure,
              guests: booking.guests,
              guestName: booking.guest_name,
              guestEmail: booking.guest_email,
              notes: booking.notes,
              quotedTotal: booking.quoted_total,
              depositAmount: booking.deposit_amount,
              currency: booking.currency,
            });

            if (sent) {
              await supabase.from("booking_events").insert({
                booking_id: booking.id,
                event_type: "booking.confirmation_email.sent",
                payload: {
                  guestEmail: booking.guest_email,
                  sentAt: new Date().toISOString(),
                },
              });
            }
          } catch (error) {
            console.error("Could not send booking confirmation emails", {
              bookingId: booking.id,
              error,
            });
          }
        }
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      await supabase
        .from("bookings")
        .update({ status: "expired" })
        .eq("id", bookingId)
        .eq("status", "hold");
    }
  }

  return NextResponse.json({ received: true });
};
