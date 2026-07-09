import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BookingConfirmationTool } from "@/components/BookingConfirmationTool";
import {
  ADMIN_COOKIE_NAME,
  isAdminLoginConfigured,
  isValidAdminSession,
} from "@/lib/adminAuth";
import { isLocale, type Locale } from "@/lib/i18n";
import { loginToBookingConfirmationAdmin } from "./actions";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ adminError?: string; setup?: string }>;
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
    return (
      <BookingConfirmationTool
        key={confirmationLanguage}
        initialLanguage={confirmationLanguage}
      />
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
