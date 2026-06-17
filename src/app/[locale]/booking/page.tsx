import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].booking;
}

export default async function BookingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];

  return (
    <section className="bg-pool-deep px-5 py-16 text-cream lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-sun">
            {t.sections.bookingEyebrow}
          </p>
          <h1 className="mt-3 text-5xl font-black leading-tight">
            {t.sections.bookingTitle}
          </h1>
          <p className="mt-5 leading-8 text-cream/78">
            {t.sections.bookingText}
          </p>
          <div className="mt-8 grid gap-3">
            {t.rateSeasons.map((season) => (
              <div
                key={season.name}
                className="rounded-3xl border border-cream/14 bg-cream/10 px-5 py-4"
              >
                <p className="font-black">{season.name}</p>
              <p className="text-sm text-cream/70">
                  {season.months} - {t.bookingRateSuffix} {season.nightly}/
                  {t.bookingNight}
                </p>
              </div>
            ))}
          </div>
        </div>
        <BookingForm locale={locale} />
      </div>
    </section>
  );
}
