import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].area;
}

export default async function AreaPage({ params }: PageProps) {
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
        <div className="mt-10 rounded-[2rem] bg-pool-deep p-7 text-cream">
          <MapPin className="h-7 w-7 text-sun" aria-hidden="true" />
          <p className="mt-4 max-w-3xl text-xl font-black">
            {t.areaCallout}
          </p>
        </div>
      </div>
    </section>
  );
}
