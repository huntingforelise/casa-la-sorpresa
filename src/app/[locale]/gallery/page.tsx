import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].gallery;
};

const GalleryPage = async ({ params }: PageProps) => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];

  return (
    <section className="section-band bg-sand/55 px-5 py-16 lg:px-8">
      <span className="shape-citrus -right-8 top-8 h-28 w-28 sm:right-8 sm:top-20" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.sections.galleryEyebrow}
          title={t.sections.galleryTitle}
          text={t.sections.galleryText}
        />
        <div className="mt-10">
          <GalleryGrid locale={locale} />
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
