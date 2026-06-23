import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { LocationMap } from "@/components/LocationMap";
import { SectionHeading } from "@/components/SectionHeading";
import { areaImages, copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].area;
};

const AreaPage = async ({ params }: PageProps) => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];

  return (
    <section className="section-band bg-cream px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.sections.areaEyebrow}
          title={t.sections.areaTitle}
          text={t.sections.areaText}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.attractions.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="organic-card rounded-[2rem] p-7"
              >
                <Icon className="h-8 w-8 text-citrus" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-black">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted">{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-14">
          <SectionHeading
            eyebrow={t.areaFacilities.eyebrow}
            title={t.areaFacilities.title}
            text={t.areaFacilities.text}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {t.areaFacilities.items.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] bg-white p-6 shadow-[0_16px_42px_rgba(85,107,47,0.1)]"
                >
                  <Icon className="h-7 w-7 text-citrus" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-black">{item.title}</h2>
                  <p className="mt-3 leading-7 text-muted">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areaImages.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_18px_54px_rgba(85,107,47,0.12)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={700}
                className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-pool-deep p-7 text-cream">
            <MapPin className="h-7 w-7 text-sun" aria-hidden="true" />
            <p className="mt-4 max-w-3xl text-xl font-black">
              {t.areaCallout}
            </p>
          </div>
          <LocationMap />
        </div>
      </div>
    </section>
  );
};

export default AreaPage;
