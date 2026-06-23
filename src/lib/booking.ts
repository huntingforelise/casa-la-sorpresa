import { z } from "zod";
import {
  extraGuestNightlyRate,
  maxGuests,
  minimumStayNights,
  rateSeasons,
  stayDiscounts,
} from "@/data/site";

export const bookingRequestSchema = z
  .object({
    locale: z.enum(["en", "nl", "es"]).default("en"),
    arrival: z.iso.date(),
    departure: z.iso.date(),
    guests: z.coerce.number().int().min(1).max(maxGuests),
    name: z.string().min(2).max(120),
    email: z.email(),
    notes: z.string().max(1200).optional().default(""),
  })
  .refine((value) => new Date(value.departure) > new Date(value.arrival), {
    message: "Departure must be after arrival.",
    path: ["departure"],
  })
  .refine(
    (value) =>
      nightsBetween(value.arrival, value.departure) >= minimumStayNights,
    {
      message: `Please choose at least ${minimumStayNights} nights.`,
      path: ["departure"],
    },
  );

export type BookingRequest = z.infer<typeof bookingRequestSchema>;

export const nightsBetween = (arrival: string, departure: string) => {
  const start = new Date(`${arrival}T00:00:00Z`).getTime();
  const end = new Date(`${departure}T00:00:00Z`).getTime();
  return Math.max(0, Math.round((end - start) / 86_400_000));
};

export const baseNightlyRateFor = (arrival: string) => {
  const month = new Date(`${arrival}T00:00:00Z`).getUTCMonth() + 1;

  if (month >= 6 && month <= 9) return rateSeasons[1].nightly;
  if (month >= 3 && month <= 5) return rateSeasons[0].nightly;

  return rateSeasons[2].nightly;
};

export const nightlyRateFor = (arrival: string, guests: number) => {
  const extraGuests = Math.max(0, guests - 2);
  return baseNightlyRateFor(arrival) + extraGuests * extraGuestNightlyRate;
};

export const discountForNights = (nights: number) => {
  return [...stayDiscounts]
    .sort((a, b) => b.nights - a.nights)
    .find((discount) => nights >= discount.nights);
};

export const quoteStay = (
  arrival: string,
  departure: string,
  guests: number,
) => {
  const nights = nightsBetween(arrival, departure);
  const nightlyRate = nightlyRateFor(arrival, guests);
  const subtotal = nights * nightlyRate;
  const discount = discountForNights(nights);
  const discountAmount = discount
    ? Math.round(subtotal * (discount.percent / 100))
    : 0;
  const total = subtotal - discountAmount;
  const deposit = Math.round(total * 0.5);

  return {
    nights,
    nightlyRate,
    subtotal,
    discountPercent: discount?.percent ?? 0,
    discountAmount,
    total,
    deposit,
    currency: "eur",
  };
};

export const rangesOverlap = (
  arrivalA: string,
  departureA: string,
  arrivalB: string,
  departureB: string,
) => arrivalA < departureB && arrivalB < departureA;
