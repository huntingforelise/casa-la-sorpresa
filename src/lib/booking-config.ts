import { contact } from "@/data/site";

export const bookingsEnabled = process.env.BOOKINGS_ENABLED === "true";

export const bookingsPausedMessage =
  `Online booking isn’t available yet. Email ${contact.email} to book.`;
