import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { ADMIN_COOKIE_NAME, isAdminLoginConfigured, isValidAdminSession } from "@/lib/adminAuth";
import { isLocale, type Locale } from "@/lib/i18n";
import { loginToAdmin } from "./actions";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ adminError?: string; setup?: string; auth?: string }>;
};

const copy = {
  en: {
    badge: "Private admin", title: "Admin dashboard",
    intro: "Choose a tool to manage availability or prepare a booking confirmation.",
    password: "Password", login: "Log in", error: "That password is not correct. Please try again.",
    setup: "Set ADMIN_PASSWORD in your environment to activate the admin area.",
    expired: "Your admin session expired. Please log in again.",
    blocks: "Block dates", blocksText: "Reserve dates for friends, family, or owner use.",
    confirmation: "Generate booking confirmation", confirmationText: "Create and print a guest booking confirmation as a PDF.",
  },
  nl: {
    badge: "Privébeheer", title: "Beheerdashboard",
    intro: "Kies een hulpmiddel om beschikbaarheid te beheren of een boekingsbevestiging te maken.",
    password: "Wachtwoord", login: "Inloggen", error: "Dat wachtwoord klopt niet. Probeer het opnieuw.",
    setup: "Stel ADMIN_PASSWORD in je omgeving in om het beheergedeelte te activeren.",
    expired: "Je beheersessie is verlopen. Log opnieuw in.",
    blocks: "Datums blokkeren", blocksText: "Reserveer datums voor vrienden, familie of eigen gebruik.",
    confirmation: "Boekingsbevestiging maken", confirmationText: "Maak en print een boekingsbevestiging als PDF.",
  },
  es: {
    badge: "Administración privada", title: "Panel de administración",
    intro: "Elige una herramienta para gestionar la disponibilidad o preparar una confirmación.",
    password: "Contraseña", login: "Iniciar sesión", error: "La contraseña no es correcta. Inténtalo de nuevo.",
    setup: "Configura ADMIN_PASSWORD para activar el área de administración.",
    expired: "Tu sesión de administración ha caducado. Inicia sesión de nuevo.",
    blocks: "Bloquear fechas", blocksText: "Reserva fechas para amigos, familia o uso propio.",
    confirmation: "Crear confirmación de reserva", confirmationText: "Crea e imprime una confirmación de reserva en PDF.",
  },
} satisfies Record<Locale, Record<string, string>>;

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return { title: copy[locale].title, robots: { index: false, follow: false } };
};

export default async function AdminDashboardPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const query = await searchParams;
  const cookieStore = await cookies();
  const authenticated = isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  const t = copy[locale];

  return (
    <section className="bg-background px-5 py-16 lg:px-8">
      <div className={`mx-auto ${authenticated ? "max-w-5xl" : "max-w-xl"}`}>
        <div className="organic-card rounded-[2rem] p-6 md:p-8">
          <p className="inline-flex rounded-full bg-pool/18 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pool-deep">{t.badge}</p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">{t.title}</h1>
          <p className="mt-4 text-sm font-semibold leading-6 text-muted">{t.intro}</p>

          {authenticated ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Link href={`/${locale}/admin/blocked-dates`} className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-pool/50 hover:shadow-lg">
                <h2 className="text-2xl font-black">{t.blocks}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">{t.blocksText}</p>
                <span className="mt-6 inline-flex font-black text-pool-deep">Open tool →</span>
              </Link>
              <Link href={`/${locale}/admin/booking-confirmation`} className="rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-pool/50 hover:shadow-lg">
                <h2 className="text-2xl font-black">{t.confirmation}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">{t.confirmationText}</p>
                <span className="mt-6 inline-flex font-black text-pool-deep">Open tool →</span>
              </Link>
            </div>
          ) : !isAdminLoginConfigured() || query?.setup === "missing" ? (
            <p className="mt-6 rounded-2xl border border-citrus/30 bg-citrus/10 px-4 py-3 text-sm font-bold leading-6">{t.setup}</p>
          ) : (
            <form action={loginToAdmin} className="mt-6">
              <input type="hidden" name="locale" value={locale} />
              <label className="grid gap-2 text-sm font-bold">
                {t.password}
                <input name="password" type="password" autoComplete="current-password" className="rounded-2xl border border-border bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-pool focus:ring-4 focus:ring-pool/15" required />
              </label>
              {query?.adminError ? <p className="mt-3 text-sm font-bold text-red-700">{t.error}</p> : null}
              {query?.auth === "required" ? <p className="mt-3 text-sm font-bold text-red-700">{t.expired}</p> : null}
              <button type="submit" className="cta-primary mt-5 w-full">{t.login}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
