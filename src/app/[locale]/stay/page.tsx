import type { Metadata } from "next";
import Image from "next/image";
import { FAQSection } from "@/components/FAQSection";
import { SectionHeading } from "@/components/SectionHeading";
import { copy, galleryImages, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].stay;
};

const StayPage = async ({ params }: PageProps) => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];

  return (
    <>
      <section className="section-band bg-background px-5 py-16 lg:px-8">
        <span className="shape-sun right-10 top-20 h-32 w-32" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow={t.sections.stayEyebrow}
              title={t.sections.stayTitle}
              text={t.sections.stayText}
            />
            <div className="mt-8 rounded-[1.4rem] border border-border bg-cream p-5">
              <h2 className="text-lg font-black">{t.sharedPoolNote.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {t.sharedPoolNote.text}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[...t.stayDetails, ...t.amenities].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="organic-card rounded-[1.7rem] p-6"
                >
                  <Icon className="h-7 w-7 text-pool-deep" aria-hidden="true" />
                  <h2 className="mt-5 text-xl font-black">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-3">
          {galleryImages.slice(2, 5).map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-[2rem] border-[8px] border-cream shadow-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={700}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      <FAQSection faq={t.faq} />
    </>
  );
};

export default StayPage;
