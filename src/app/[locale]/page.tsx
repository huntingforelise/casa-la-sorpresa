import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Euro,
  MessageCircle,
} from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import {
  areaImages,
  contact,
  copy,
  galleryImages,
  homeGalleryImages,
  pageMeta,
  registrationNumber,
  siteUrl,
} from "@/data/site";
import { bookingsEnabled, bookingsPausedMessage } from "@/lib/booking-config";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const meta = pageMeta[locale].home;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", nl: "/nl", es: "/es" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [galleryImages[0].src],
    },
  };
};

const LocaleHome = async ({ params }: PageProps) => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];
  const homeGridImages = homeGalleryImages.slice(0, 4);
  const homeFeatureImages = homeGalleryImages.slice(4, 6);
  const areaGraphicImages = [areaImages[0], areaImages[2], areaImages[10]];
  const contactPromptIcons = [CalendarDays, Clock, MessageCircle];
  const discountSummary = t.bookingSummary.items[1];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Casa la Sorpresa",
    url: `${siteUrl}/${locale}`,
    image: galleryImages.map((image) => image.src),
    description: pageMeta[locale].home.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alhaurin de la Torre",
      addressRegion: "Malaga",
      addressCountry: "ES",
    },
    email: contact.email,
    telephone: contact.phone,
    amenityFeature: t.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.title,
      value: true,
    })),
    maximumAttendeeCapacity: 4,
    identifier: registrationNumber,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero locale={locale} />

      <section className="bg-cream px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.7rem] border border-border bg-background p-6"
            >
              <p className="text-4xl font-black text-citrus">{stat.value}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-band bg-background px-5 py-20 lg:px-8">
        <span className="shape-sun right-10 top-16 h-28 w-28" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow={t.sections.stayEyebrow}
            title={t.sections.stayTitle}
            text={t.sections.stayText}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {t.amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={amenity.title}
                  className="organic-card rounded-[1.7rem] p-6"
                >
                  <Icon className="h-7 w-7 text-pool-deep" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-black">{amenity.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {amenity.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sand/55 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow={t.sections.galleryEyebrow}
              title={t.sections.galleryTitle}
              text={t.sections.galleryText}
            />
            <div className="mt-8">
              <GalleryGrid
                locale={locale}
                gridClassName="grid gap-4 sm:grid-cols-2"
                images={homeGridImages}
                showFilters={false}
              />
            </div>
          </div>
          {homeFeatureImages.length === 2 ? (
            <div className="relative min-h-[500px] lg:-ml-2 xl:-ml-4">
              <div className="absolute left-0 top-0 w-[76%] overflow-hidden rounded-[2.4rem] border-[8px] border-cream shadow-2xl">
                <Image
                  src={homeFeatureImages[0].src}
                  alt={homeFeatureImages[0].alt}
                  width={900}
                  height={1100}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden arch-mask border-[8px] border-cream shadow-2xl">
                <Image
                  src={homeFeatureImages[1].src}
                  alt={homeFeatureImages[1].alt}
                  width={900}
                  height={1000}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-band bg-cream px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_0.58fr]">
            <SectionHeading
              eyebrow={t.sections.areaEyebrow}
              title={t.sections.areaTitle}
              text={t.sections.areaText}
            />
            <div
              className="relative min-h-[15rem] overflow-hidden sm:min-h-[17rem] lg:min-h-[20rem]"
              aria-hidden="true"
            >
              <span className="shape-pool right-4 top-4 h-20 w-20 opacity-45 sm:right-10 sm:h-28 sm:w-28" />
              <span className="shape-citrus bottom-16 left-16 h-16 w-16 opacity-55 sm:left-24 sm:h-24 sm:w-24" />
              {areaGraphicImages.map((image, index) => {
                const placement = [
                  "left-4 top-6 h-32 w-32 sm:h-40 sm:w-40 lg:left-0 lg:h-44 lg:w-44",
                  "right-2 top-0 h-40 w-40 sm:right-8 sm:h-52 sm:w-52 lg:right-4 lg:h-60 lg:w-60",
                  "bottom-2 left-[38%] h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40",
                ][index];

                return (
                  <div
                    key={image.src}
                    className={`absolute ${placement} overflow-hidden rounded-full border-[7px] border-cream shadow-[0_20px_54px_rgba(85,107,47,0.16)]`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={520}
                      height={520}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.attractions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] bg-background p-6"
                >
                  <Icon className="h-7 w-7 text-citrus" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-pool-deep px-5 py-20 text-cream lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-sun">
              {t.sections.bookingEyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {t.sections.bookingTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-cream/78">
              {t.sections.bookingText}
            </p>
            <div className="mt-8 grid gap-3">
              {t.rateSeasons.map((season) => (
                <div
                  key={season.name}
                  className="flex items-center justify-between rounded-3xl border border-cream/14 bg-cream/10 px-5 py-4"
                >
                  <div>
                    <p className="font-black">{season.name}</p>
                    <p className="text-sm text-cream/70">{season.months}</p>
                  </div>
                  <p className="flex items-center gap-1 font-black text-sun">
                    <Euro className="h-4 w-4" aria-hidden="true" />
                    {season.nightly}/{t.bookingNight}
                  </p>
                </div>
              ))}
              {discountSummary ? (
                <p className="px-1 text-sm font-semibold leading-6 text-cream/72">
                  <span className="font-black text-cream">
                    {discountSummary.label}:
                  </span>{" "}
                  {discountSummary.text} Automatically applied.
                </p>
              ) : null}
            </div>
          </div>
          <BookingForm
            locale={locale}
            mode="lead"
            variant="compact"
            bookingsEnabled={bookingsEnabled}
            pausedMessage={bookingsPausedMessage}
          />
        </div>
      </section>

      <section className="section-band bg-background px-5 py-20 lg:px-8">
        <span className="shape-sun right-10 top-16 h-28 w-28" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow={t.sections.detailsEyebrow}
              title={t.sections.detailsTitle}
              text={t.sections.detailsText}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.contactPrompts.map((prompt, index) => {
              const Icon = contactPromptIcons[index];
              return (
                <div
                  key={prompt.title}
                  className="rounded-[1.7rem] border border-border bg-cream p-6"
                >
                  <Icon className="h-7 w-7 text-citrus" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-black">{prompt.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {prompt.text}
                  </p>
                </div>
              );
            })}
            <div className="organic-card flex flex-col justify-between rounded-[1.7rem] p-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-citrus">
                  {t.sections.contactEyebrow}
                </p>
                <h3 className="mt-3 text-xl font-black">{t.common.contact}</h3>
              </div>
              <Link
                href={localizedPath(locale, "/contact")}
                className="cta-secondary mt-6"
              >
                {t.sections.contactTitle}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocaleHome;
