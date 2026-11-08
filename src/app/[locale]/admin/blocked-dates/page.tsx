import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSupabaseAdmin } from "@/lib/supabase";
import { addBlockedDates, removeBlockedDates } from "../actions";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ calendar?: string }>;
};

type BlockedDate = { id: string; arrival: string; departure: string; reason: string };

const messages: Record<string, string> = {
  added: "Dates blocked and added to your calendar feed.",
  removed: "Date block removed.",
  invalid: "Enter valid dates, with departure after arrival, and a note under 240 characters.",
  unavailable: "Date blocking is unavailable until Supabase is configured.",
  "booking-conflict": "Those dates overlap an active booking or payment hold.",
  "block-conflict": "Those dates overlap another date block.",
  error: "Could not save the date block. Please try again.",
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: locale === "nl" ? "Datums blokkeren" : locale === "es" ? "Bloquear fechas" : "Block dates",
    robots: { index: false, follow: false },
  };
};

export default async function BlockedDatesAdminPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const query = await searchParams;
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect(`/${locale}/admin?auth=required`);
  }

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
  const message = query?.calendar ? messages[query.calendar] : undefined;

  return (
    <section className="bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href={`/${locale}/admin`} className="text-sm font-bold text-pool-deep hover:underline">← Admin dashboard</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="organic-card rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-pool-deep">Availability</p>
            <h1 className="mt-3 text-3xl font-black">Block dates</h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted">
              Add dates when friends or family are staying. Departure is the checkout day and is available for the next booking.
            </p>
            {message ? <p className="mt-5 rounded-2xl border border-pool/20 bg-pool/10 px-4 py-3 text-sm font-bold" role="status">{message}</p> : null}
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
      </div>
    </section>
  );
}
