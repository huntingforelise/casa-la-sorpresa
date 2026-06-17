"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import { copy, maxGuests } from "@/data/site";
import type { Locale } from "@/lib/i18n";

type BookingFormProps = {
  locale: Locale;
};

type FormState = {
  arrival: string;
  departure: string;
  guests: string;
  name: string;
  email: string;
  notes: string;
};

const today = new Date().toISOString().slice(0, 10);

export const BookingForm = ({ locale }: BookingFormProps) => {
  const t = copy[locale].booking;
  const [form, setForm] = useState<FormState>({
    arrival: "",
    departure: "",
    guests: "2",
    name: "",
    email: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/bookings/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, locale, guests: Number(form.guests) }),
    });

    const payload = (await response.json()) as {
      url?: string;
      message?: string;
      error?: string;
    };

    setIsSubmitting(false);

    if (payload.url) {
      window.location.href = payload.url;
      return;
    }

    setMessage(payload.message ?? payload.error ?? t.demo);
  };

  return (
    <form
      onSubmit={submit}
      className="organic-card grid gap-5 rounded-[2rem] p-5 md:p-7"
    >
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-pool/18 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pool-deep">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {t.title}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">{t.intro}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          {t.arrival}
          <input
            required
            min={today}
            type="date"
            value={form.arrival}
            onChange={(event) => update("arrival", event.target.value)}
            className="rounded-2xl border border-border bg-cream px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          {t.departure}
          <input
            required
            min={form.arrival || today}
            type="date"
            value={form.departure}
            onChange={(event) => update("departure", event.target.value)}
            className="rounded-2xl border border-border bg-cream px-4 py-3"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-[0.7fr_1fr]">
        <label className="grid gap-2 text-sm font-bold">
          {t.guests}
          <select
            value={form.guests}
            onChange={(event) => update("guests", event.target.value)}
            className="rounded-2xl border border-border bg-cream px-4 py-3"
          >
            {Array.from({ length: maxGuests }, (_, index) => index + 1).map(
              (guestCount) => (
                <option key={guestCount} value={guestCount}>
                  {guestCount}
                </option>
              ),
            )}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          {t.name}
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="rounded-2xl border border-border bg-cream px-4 py-3"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        {t.email}
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          className="rounded-2xl border border-border bg-cream px-4 py-3"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        {t.notes}
        <textarea
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          rows={4}
          className="resize-none rounded-2xl border border-border bg-cream px-4 py-3"
        />
      </label>

      <button type="submit" className="cta-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : null}
        {t.submit}
      </button>

      {message ? (
        <p className="rounded-2xl bg-sun/28 px-4 py-3 text-sm font-semibold leading-6 text-foreground">
          {message}
        </p>
      ) : null}
    </form>
  );
};
