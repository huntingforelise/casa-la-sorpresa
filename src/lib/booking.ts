import { z } from "zod";
import { maxGuests, rateSeasons } from "@/data/site";

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
  });

export type BookingRequest = z.infer<typeof bookingRequestSchema>;

export const nightsBetween = (arrival: string, departure: string) => {
  const start = new Date(`${arrival}T00:00:00Z`).getTime();
  const end = new Date(`${departure}T00:00:00Z`).getTime();
  return Math.max(0, Math.round((end - start) / 86_400_000));
};

export const nightlyRateFor = (arrival: string) => {
  const month = new Date(`${arrival}T00:00:00Z`).getUTCMonth() + 1;

  if (month >= 6 && month <= 9) return rateSeasons[1].nightly;
  if (month >= 3 && month <= 5) return rateSeasons[0].nightly;

  return rateSeasons[2].nightly;
};

export const quoteStay = (arrival: string, departure: string) => {
  const nights = nightsBetween(arrival, departure);
  const nightlyRate = nightlyRateFor(arrival);
  const total = nights * nightlyRate;
  const deposit = Math.max(150, Math.round(total * 0.25));

  return {
    nights,
    nightlyRate,
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
