export const bookingsEnabled = process.env.BOOKINGS_ENABLED === "true";

export const bookingsReopenLabel =
  process.env.NEXT_PUBLIC_BOOKINGS_REOPEN_LABEL ?? "December 2026";

export const bookingsPausedMessage = `Bookings open from ${bookingsReopenLabel}.`;
