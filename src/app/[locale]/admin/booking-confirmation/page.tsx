import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BookingConfirmationTool } from "@/components/BookingConfirmationTool";
import {
  ADMIN_COOKIE_NAME,
  isAdminLoginConfigured,
  isValidAdminSession,
} from "@/lib/adminAuth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSupabaseAdmin } from "@/lib/supabase";
import { addBlockedDates, loginToBookingConfirmationAdmin, removeBlockedDates } from "./actions";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ adminError?: string; setup?: string; calendar?: string }>;
};

type BlockedDate = { id: string; arrival: string; departure: string; reason: string };

const calendarMessages: Record<string, string> = {
  added: "Dates blocked and added to your calendar feed.",
  removed: "Date block removed.",
  invalid: "Enter valid dates, with departure after arrival, and a note under 240 characters.",
  unavailable: "Date blocking is unavailable until Supabase is configured.",
  "booking-conflict": "Those dates overlap an active booking or payment hold.",
  "block-conflict": "Those dates overlap another date block.",
  error: "Could not save the date block. Please try again.",
  unauthorized: "Your admin session expired. Please log in again.",
};

const loginLabels = {
  nl: {
    badge: "Privetool",
    title: "Log in om verder te gaan",
    intro:
      "Deze boekingsbevestiging is afgeschermd zodat gast- en betaalgegevens niet publiek bereikbaar zijn.",
    password: "Wachtwoord",
    submit: "Open bevestigingstool",
    error: "Dat wachtwoord klopt niet. Probeer het nog eens.",
    setup:
      "Stel ADMIN_PASSWORD in om deze adminpagina te activeren. Zonder wachtwoord blijft de tool verborgen.",
  },
  en: {
    badge: "Private tool",
    title: "Log in to continue",
    intro:
      "This booking confirmation maker is protected so guest and payment details are not publicly available.",
    password: "Password",
    submit: "Open confirmation maker",
    error: "That password is not correct. Please try again.",
    setup:
      "Set ADMIN_PASSWORD to activate this admin page. Until then, the tool stays hidden.",
  },
  es: {
    badge: "Herramienta privada",
    title: "Inicia sesion para continuar",
    intro:
      "Esta herramienta de confirmacion esta protegida para que los datos de huespedes y pagos no sean publicos.",
    password: "Contrasena",
    submit: "Abrir herramienta",
    error: "La contrasena no es correcta. Intentalo de nuevo.",
    setup:
      "Configura ADMIN_PASSWORD para activar esta pagina de administracion. Mientras tanto, la herramienta permanece oculta.",
  },
} satisfies Record<
  Locale,
  {
    badge: string;
    title: string;
    intro: string;
    password: string;
    submit: string;
    error: string;
    setup: string;
  }
>;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return {
    title:
      locale === "nl"
        ? "Boekingsbevestiging maken"
        : locale === "es"
          ? "Crear confirmacion de reserva"
          : "Booking confirmation maker",
    robots: {
      index: false,
      follow: false,
    },
  };
};

const BookingConfirmationAdminPage = async ({
  params,
  searchParams,
}: PageProps) => {
  const { locale: rawLocale } = await params;
  const resolvedSearchParams = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const confirmationLanguage =
    locale === "nl" ? "nl" : locale === "es" ? "es" : "en";
  const cookieStore = await cookies();
  const isAuthenticated = isValidAdminSession(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value,
  );

  if (isAuthenticated) {
    const supabase = getSupabaseAdmin();
    let blockedDates: BlockedDate[] = [];
    let blocksUnavailable = !supabase;
    if (supabase) {
      const { data, error } = await supabase
        .from("blocked_dates")
        .select("id, arrival, departure, reason")
        .order("arrival");
      if (error) blocksUnavailable = true;
      else blockedDates = (data ?? []) as BlockedDate[];
    }
    const calendarMessage = resolvedSearchParams?.calendar
      ? calendarMessages[resolvedSearchParams.calendar]
      : undefined;

    return (
      <>
        <section className="bg-background px-5 py-10 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="organic-card rounded-[2rem] p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-pool-deep">Availability</p>
              <h1 className="mt-3 text-3xl font-black">Block dates</h1>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                Add dates when friends or family are staying. Departure is the checkout day and is available for the next booking.
              </p>
              {calendarMessage ? (
                <p className="mt-5 rounded-2xl border border-pool/20 bg-pool/10 px-4 py-3 text-sm font-bold" role="status">
                  {calendarMessage}
                </p>
              ) : null}
              {blocksUnavailable ? (
                <p className="mt-5 rounded-2xl border border-citrus/30 bg-citrus/10 px-4 py-3 text-sm font-bold">
                  Supabase is not configured or date blocks could not be loaded.
                </p>
              ) : (
                <form action={addBlockedDates} className="mt-6 grid gap-4">
                  <input type="hidden" name="locale" value={locale} />
                  <label className="grid gap-2 text-sm font-bold">
                    Arrival
                    <input name="arrival" type="date" required className="rounded-2xl border border-border bg-white px-4 py-3 text-base font-semibold" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Departure
                    <input name="departure" type="date" required className="rounded-2xl border border-border bg-white px-4 py-3 text-base font-semibold" />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Note (optional)
                    <input name="reason" type="text" maxLength={240} placeholder="Friends visiting" className="rounded-2xl border border-border bg-white px-4 py-3 text-base font-semibold" />
                  </label>
                  <button type="submit" className="cta-primary">Block these dates</button>
                </form>
              )}
            </div>

            <div className="organic-card rounded-[2rem] p-6 md:p-8">
              <h2 className="text-2xl font-black">Current date blocks</h2>
              {blockedDates.length ? (
                <ul className="mt-5 divide-y divide-border">
                  {blockedDates.map((block) => (
                    <li key={block.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-black">{block.arrival} → {block.departure}</p>
                        <p className="mt-1 text-sm font-semibold text-muted">{block.reason}</p>
                      </div>
                      <form action={removeBlockedDates}>
                        <input type="hidden" name="locale" value={locale} />
                        <input type="hidden" name="id" value={block.id} />
                        <button type="submit" className="rounded-full border border-border px-4 py-2 text-sm font-bold transition hover:border-red-400 hover:text-red-700">Remove block</button>
                      </form>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm font-semibold text-muted">No owner date blocks yet.</p>
              )}
            </div>
          </div>
        </section>
        <BookingConfirmationTool
          key={confirmationLanguage}
          initialLanguage={confirmationLanguage}
        />
      </>
    );
  }

  const t = loginLabels[locale];
  const showSetupMessage =
    !isAdminLoginConfigured() || resolvedSearchParams?.setup === "missing";

  return (
    <section className="bg-background px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-xl">
        <div className="organic-card rounded-[2rem] p-6 md:p-8">
          <p className="inline-flex rounded-full bg-pool/18 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pool-deep">
            {t.badge}
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-sm font-semibold leading-6 text-muted">
            {t.intro}
          </p>
          {showSetupMessage ? (
            <p className="mt-6 rounded-2xl border border-citrus/30 bg-citrus/10 px-4 py-3 text-sm font-bold leading-6 text-foreground">
              {t.setup}
            </p>
          ) : (
            <form action={loginToBookingConfirmationAdmin} className="mt-6">
              <input type="hidden" name="locale" value={locale} />
              <label className="grid gap-2 text-sm font-bold">
                {t.password}
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="rounded-2xl border border-border bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-pool focus:ring-4 focus:ring-pool/15"
                  required
                />
              </label>
              {resolvedSearchParams?.adminError ? (
                <p className="mt-3 text-sm font-bold text-red-700">
                  {t.error}
                </p>
              ) : null}
              <button type="submit" className="cta-primary mt-5 w-full">
                {t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmationAdminPage;
