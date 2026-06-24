import { contact, siteUrl } from "@/data/site";

type BookingEmailDetails = {
  arrival: string;
  departure: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  notes: string;
  quotedTotal: number;
  depositAmount: number;
  currency: string;
};

type ResendEmail = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
};

const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const sendResendEmail = async (email: ResendEmail) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Casa la Sorpresa <bookings@casalasorpresa.com>";

  if (!apiKey) {
    console.warn("Skipping booking email: RESEND_API_KEY is not configured.");
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      ...email,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend email failed: ${response.status} ${body}`);
  }

  return response.json();
};

export const sendBookingConfirmationEmails = async (
  booking: BookingEmailDetails,
) => {
  const ownerEmail = process.env.BOOKING_NOTIFICATION_EMAIL ?? contact.email;
  const total = formatMoney(booking.quotedTotal, booking.currency);
  const deposit = formatMoney(booking.depositAmount, booking.currency);
  const bookingUrl = `${siteUrl}/en/booking`;
  const guestName = escapeHtml(booking.guestName);
  const guestEmail = escapeHtml(booking.guestEmail);
  const notes = escapeHtml(booking.notes || "None");
  const guestText = `Hi ${booking.guestName},

Wonderful news - your Casa la Sorpresa booking request is confirmed and your deposit payment was received.

Dates: ${booking.arrival} to ${booking.departure}
Guests: ${booking.guests}
Total stay: ${total}
Deposit paid: ${deposit}

We will email you separately with any practical arrival details.

Casa la Sorpresa`;

  const ownerText = `A new Casa la Sorpresa booking has been confirmed.

Guest: ${booking.guestName}
Email: ${booking.guestEmail}
Dates: ${booking.arrival} to ${booking.departure}
Guests: ${booking.guests}
Total stay: ${total}
Deposit paid: ${deposit}
Notes: ${booking.notes || "None"}

Booking page: ${bookingUrl}`;

  const results = await Promise.all([
    sendResendEmail({
      to: booking.guestEmail,
      subject: "Your Casa la Sorpresa booking is confirmed",
      text: guestText,
      html: `
        <div style="margin:0;padding:0;background:#fff8e8;color:#243128;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
            <div style="overflow:hidden;border-radius:28px;background:#fffdf4;border:1px solid rgba(36,49,40,0.12);box-shadow:0 18px 48px rgba(85,107,47,0.14);">
              <div style="background:#0f6f7c;padding:34px 30px 30px;color:#fffdf4;">
                <div style="display:inline-block;border-radius:999px;background:rgba(255,211,78,0.95);color:#243128;padding:7px 13px;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">
                  Booking confirmed
                </div>
                <h1 style="margin:18px 0 0;font-size:34px;line-height:1.05;font-weight:900;color:#fffdf4;">
                  Your sunny dates are reserved
                </h1>
                <p style="margin:14px 0 0;font-size:16px;line-height:1.7;color:rgba(255,253,244,0.78);">
                  Hi ${guestName}, wonderful news - your Casa la Sorpresa booking request is confirmed and your deposit payment was received.
                </p>
              </div>

              <div style="padding:28px 30px 30px;">
                <div style="border-radius:22px;background:#f8e6bd;padding:20px;border:1px solid rgba(36,49,40,0.1);">
                  <p style="margin:0 0 14px;font-size:13px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;color:#0f6f7c;">
                    Stay details
                  </p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:9px 0;color:rgba(36,49,40,0.72);font-size:14px;">Dates</td>
                      <td style="padding:9px 0;text-align:right;font-weight:800;font-size:14px;">${booking.arrival} to ${booking.departure}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;color:rgba(36,49,40,0.72);font-size:14px;border-top:1px solid rgba(36,49,40,0.12);">Guests</td>
                      <td style="padding:9px 0;text-align:right;font-weight:800;font-size:14px;border-top:1px solid rgba(36,49,40,0.12);">${booking.guests}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;color:rgba(36,49,40,0.72);font-size:14px;border-top:1px solid rgba(36,49,40,0.12);">Total stay</td>
                      <td style="padding:9px 0;text-align:right;font-weight:800;font-size:14px;border-top:1px solid rgba(36,49,40,0.12);">${total}</td>
                    </tr>
                  </table>
                </div>

                <div style="margin-top:16px;border-radius:22px;background:rgba(56,184,199,0.14);padding:18px 20px;border:1px solid rgba(15,111,124,0.18);">
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#0f6f7c;">
                    <strong style="color:#243128;">Deposit paid:</strong> ${deposit}. We will email you separately with practical arrival details, check-in timing, and anything else you need before your stay.
                  </p>
                </div>

                <p style="margin:24px 0 0;font-size:15px;line-height:1.8;color:rgba(36,49,40,0.72);">
                  We are looking forward to welcoming you to Casa la Sorpresa for pool days, mountain views, and a little Andalusian sunshine.
                </p>

                <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(36,49,40,0.12);">
                  <p style="margin:0;font-size:15px;font-weight:900;color:#243128;">Casa la Sorpresa</p>
                  <p style="margin:4px 0 0;font-size:13px;color:rgba(36,49,40,0.64);">Malaga sunshine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    }),
    sendResendEmail({
      to: ownerEmail,
      subject: `New confirmed booking: ${booking.arrival} to ${booking.departure}`,
      text: ownerText,
      html: `
        <div style="font-family: Arial, sans-serif; color: #243128; line-height: 1.6;">
          <h1 style="color: #0f6f7c;">New confirmed booking</h1>
          <ul>
            <li><strong>Guest:</strong> ${guestName}</li>
            <li><strong>Email:</strong> ${guestEmail}</li>
            <li><strong>Dates:</strong> ${booking.arrival} to ${booking.departure}</li>
            <li><strong>Guests:</strong> ${booking.guests}</li>
            <li><strong>Total stay:</strong> ${total}</li>
            <li><strong>Deposit paid:</strong> ${deposit}</li>
            <li><strong>Notes:</strong> ${notes}</li>
          </ul>
          <p><a href="${bookingUrl}">Open booking page</a></p>
        </div>
      `,
    }),
  ]);

  return results.every((result) => !("skipped" in result));
};
