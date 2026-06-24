import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].booking;
};

const firstSearchValue = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value;
};

const BookingPage = async ({ params, searchParams }: PageProps) => {
  const { locale: rawLocale } = await params;
  const query = searchParams ? await searchParams : {};
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];

  return (
    <section className="bg-pool-deep px-5 py-16 text-cream lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.95fr_0.85fr]">
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
          <div className="mt-8 grid gap-3 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-cream/14 bg-cream/10 px-5 py-4">
              <p className="font-black">{t.bookingSummary.title}</p>
              <div className="mt-3 grid gap-2">
                {t.bookingSummary.items.map((item, index) => (
                  <p
                    key={item.label}
                    className="text-sm leading-6 text-cream/72"
                  >
                    <span className="font-black text-cream">{item.label}:</span>{" "}
                    {item.text}
                    {index === 1 ? " Automatically applied." : null}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-cream/14 bg-cream/10 px-5 py-4">
              <div className="grid gap-4">
                {t.rateSeasons.map((season) => (
                  <div
                    key={season.name}
                    className="border-b border-cream/14 pb-4 last:border-0 last:pb-0"
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
          </div>
        </div>
        <div className="w-full max-w-xl lg:justify-self-end">
          <BookingForm
            locale={locale}
            initialValues={{
              arrival: firstSearchValue(query.arrival),
              departure: firstSearchValue(query.departure),
              guests: firstSearchValue(query.guests),
            }}
          />
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-sun">
          {t.bookingPolicies.title}
        </p>
        <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
          {t.bookingPolicies.items.map((item) => (
            <details
              key={item.label}
              className="group rounded-2xl border border-cream/14 bg-cream/10 px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-black marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.label}
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sun text-sm leading-none text-foreground transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-cream/72">
                {item.text}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
