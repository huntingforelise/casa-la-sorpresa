"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  Loader2,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import {
  copy,
  depositRefundableUntilDays,
  maxGuests,
  minimumStayNights,
} from "@/data/site";
import { nightsBetween, quoteStay } from "@/lib/booking";
import { localizedPath, type Locale } from "@/lib/i18n";

type BookingFormProps = {
  locale: Locale;
  mode?: "full" | "lead";
  variant?: "default" | "compact";
  initialValues?: Partial<Pick<FormState, "arrival" | "departure" | "guests">>;
  bookingsEnabled?: boolean;
  pausedMessage?: string;
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
const dateLocale: Record<Locale, string> = {
  en: "en-GB",
  nl: "nl-NL",
  es: "es-ES",
};
const fieldClass = {
  default:
    "rounded-2xl border border-border bg-cream px-4 py-3 text-foreground caret-foreground placeholder:text-muted [color-scheme:light]",
  compact:
    "h-11 rounded-xl border border-border bg-cream px-3.5 text-sm text-foreground caret-foreground placeholder:text-muted [color-scheme:light]",
};
const selectClass = {
  default: `${fieldClass.default} w-full appearance-none pr-12`,
  compact: `${fieldClass.compact} w-full appearance-none pr-11`,
};
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const sanitizeDate = (value?: string) => {
  return value && datePattern.test(value) ? value : "";
};

const sanitizeGuestCount = (value?: string) => {
  const guests = Number(value);

  return Number.isInteger(guests) && guests >= 1 && guests <= maxGuests
    ? String(guests)
    : "2";
};

export const BookingForm = ({
  locale,
  mode = "full",
  variant = "default",
  initialValues,
  bookingsEnabled = true,
  pausedMessage,
}: BookingFormProps) => {
  const router = useRouter();
  const localeCopy = copy[locale];
  const t = localeCopy.booking;
  const isCompact = variant === "compact";
  const isLeadMode = mode === "lead";
  const [form, setForm] = useState<FormState>({
    arrival: sanitizeDate(initialValues?.arrival),
    departure: sanitizeDate(initialValues?.departure),
    guests: sanitizeGuestCount(initialValues?.guests),
    name: "",
    email: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const guestCount = Number(form.guests);
  const selectedNights =
    form.arrival && form.departure
      ? nightsBetween(form.arrival, form.departure)
      : 0;
  const hasChronologicalDates =
    Boolean(form.arrival && form.departure) && form.departure > form.arrival;
  const hasMinimumStay = selectedNights >= minimumStayNights;
  const quote = useMemo(() => {
    if (!hasChronologicalDates || !hasMinimumStay) return null;

    return quoteStay(form.arrival, form.departure, guestCount);
  }, [
    form.arrival,
    form.departure,
    guestCount,
    hasChronologicalDates,
    hasMinimumStay,
  ]);
  const refundableUntil = useMemo(() => {
    if (!form.arrival) return "";

    const date = new Date(`${form.arrival}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - depositRefundableUntilDays);

    return date.toLocaleDateString(dateLocale[locale], {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }, [form.arrival, locale]);
  const money = useMemo(
    () =>
      new Intl.NumberFormat(dateLocale[locale], {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const canSubmit = Boolean(quote) && !isSubmitting && bookingsEnabled;
  const canLeadSubmit = hasChronologicalDates && !isSubmitting;
  const leadFormClass =
    "organic-card grid auto-rows-max content-start gap-4 self-start rounded-[1.35rem] p-5 text-foreground md:p-6";
  const fullFormClass =
    "organic-card grid gap-5 rounded-[2rem] p-5 text-foreground md:p-7";

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLeadMode) {
      if (!bookingsEnabled) {
        if (!pausedMessage) setMessage("Bookings are not open yet.");
        return;
      }

      if (!hasChronologicalDates) {
        setMessage(t.quotePrompt);
        return;
      }

      const params = new URLSearchParams({
        arrival: form.arrival,
        departure: form.departure,
        guests: form.guests,
      });

      router.push(`${localizedPath(locale, "/booking")}?${params.toString()}`);
      return;
    }

    if (!quote) {
      setMessage(t.quotePrompt);
      return;
    }

    if (!bookingsEnabled) {
      setMessage(pausedMessage ?? "Bookings are not open yet.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale, guests: Number(form.guests) }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        url?: string;
        message?: string;
        error?: string;
      };

      setIsSubmitting(false);

      if (payload.url) {
        window.location.href = payload.url;
        return;
      }

      setMessage(
        payload.message ??
          payload.error ??
          (response.ok
            ? t.demo
            : "Could not start checkout. Please try again."),
      );
    } catch {
      setIsSubmitting(false);
      setMessage("Could not start checkout. Please try again.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className={isLeadMode ? leadFormClass : fullFormClass}
    >
      <div className={isLeadMode ? "grid gap-2" : ""}>
        <p
          className={
            isLeadMode
              ? "inline-flex w-fit items-center gap-2 rounded-full bg-pool/18 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-pool-deep"
              : "inline-flex items-center gap-2 rounded-full bg-pool/18 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pool-deep"
          }
        >
          <CalendarDays
            className={isLeadMode ? "h-3.5 w-3.5" : "h-4 w-4"}
            aria-hidden="true"
          />
          {isLeadMode ? t.title : t.fullTitle}
        </p>
        <p
          className={
            isLeadMode
              ? "max-w-2xl text-sm leading-5 text-muted"
              : "mt-3 text-sm leading-6 text-muted"
          }
        >
          {t.intro}
        </p>
      </div>

      <div
        className={
          isLeadMode ? "grid gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"
        }
      >
        <label className="grid gap-1.5 text-sm font-bold">
          {t.arrival}
          <input
            required
            min={today}
            type="date"
            value={form.arrival}
            onChange={(event) => update("arrival", event.target.value)}
            className={fieldClass[variant]}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          {t.departure}
          <input
            required
            min={form.arrival || today}
            type="date"
            value={form.departure}
            onChange={(event) => update("departure", event.target.value)}
            className={fieldClass[variant]}
          />
        </label>
      </div>

      <label
        className={
          isLeadMode
            ? "grid max-w-36 gap-1.5 text-sm font-bold"
            : "grid max-w-40 gap-1.5 text-sm font-bold"
        }
      >
        {t.guests}
        <span className="relative block">
          <select
            value={form.guests}
            onChange={(event) => update("guests", event.target.value)}
            className={selectClass[variant]}
          >
            {Array.from({ length: maxGuests }, (_, index) => index + 1).map(
              (guestCount) => (
                <option key={guestCount} value={guestCount}>
                  {guestCount}
                </option>
              ),
            )}
          </select>
          <ChevronDown
            className={
              isLeadMode
                ? "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground"
                : "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground"
            }
            strokeWidth={2.25}
            aria-hidden="true"
          />
        </span>
      </label>

      {isLeadMode ? (
        <>
          {!bookingsEnabled && pausedMessage ? (
            <p className="rounded-2xl bg-sun/28 px-4 py-3 text-sm font-semibold leading-6 text-foreground">
              {pausedMessage}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-2xl bg-sun/28 px-4 py-3 text-sm font-semibold leading-6 text-foreground">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-citrus px-5 text-sm font-black text-cream shadow-[0_14px_30px_rgb(241_115_45_/_0.22)] transition hover:-translate-y-0.5 hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
            disabled={!canLeadSubmit}
          >
            {localeCopy.hero.primary}
          </button>
        </>
      ) : null}

      {isLeadMode ? null : (
        <>
          <div className="border-y border-border/80 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pool/18 text-pool-deep">
                <ReceiptText className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-black">{t.quoteTitle}</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {quote ? t.quoteIntro : t.quotePrompt}
                </p>
              </div>
            </div>

            {hasChronologicalDates && !hasMinimumStay ? (
              <p className="mt-4 rounded-xl bg-sun/28 px-3.5 py-3 text-sm font-semibold leading-6 text-foreground">
                {t.minimumStayWarning
                  .replace("{minimum}", String(minimumStayNights))
                  .replace("{selected}", String(selectedNights))}
              </p>
            ) : null}

            {quote ? (
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">{t.selectedDates}</span>
                  <span className="text-right font-black">
                    {form.arrival} - {form.departure}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">{t.nights}</span>
                  <span className="font-black">{quote.nights}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">{t.nightlyRate}</span>
                  <span className="font-black">
                    {money.format(quote.nightlyRate)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">{t.subtotal}</span>
                  <span className="font-black">
                    {money.format(quote.subtotal)}
                  </span>
                </div>
                {quote.discountAmount > 0 ? (
                  <div className="flex items-center justify-between gap-4 text-pool-deep">
                    <span>
                      {t.discount} ({quote.discountPercent}%)
                    </span>
                    <span className="font-black">
                      -{money.format(quote.discountAmount)}
                    </span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
                  <span className="font-black">{t.total}</span>
                  <span className="text-lg font-black">
                    {money.format(quote.total)}
                  </span>
                </div>
                <div className="grid gap-2 rounded-xl border border-pool/24 bg-pool/10 px-3.5 py-3 text-foreground">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black">{t.depositDue}</span>
                    <span className="text-lg font-black">
                      {money.format(quote.deposit)}
                    </span>
                  </div>
                  <p className="flex gap-2 text-sm leading-6 text-pool-deep">
                    <ShieldCheck
                      className="mt-1 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {t.refundableUntil} {refundableUntil}.
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-cream/85 px-3.5 py-3 text-foreground">
                  <span className="font-black">{t.balanceAmount}</span>
                  <span className="text-lg font-black">
                    {money.format(quote.total - quote.deposit)}
                  </span>
                </div>
                <p className="text-xs font-semibold leading-5 text-muted">
                  {t.balanceDue}.
                </p>
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-bold">
              {t.name}
              <input
                required
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                className={fieldClass[variant]}
              />
            </label>

            <label className="grid gap-1.5 text-sm font-bold">
              {t.email}
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className={fieldClass[variant]}
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-bold">
            {t.notes}
            <textarea
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
              rows={isCompact ? 3 : 4}
              className={`${fieldClass[variant]} resize-none`}
            />
          </label>

          <button
            type="submit"
            className="cta-primary w-full disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
            disabled={!canSubmit}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            {t.submit}
          </button>

          {!bookingsEnabled && pausedMessage ? (
            <p className="rounded-2xl bg-sun/28 px-4 py-3 text-sm font-semibold leading-6 text-foreground">
              {pausedMessage}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-2xl bg-sun/28 px-4 py-3 text-sm font-semibold leading-6 text-foreground">
              {message}
            </p>
          ) : null}
        </>
      )}
    </form>
  );
};
