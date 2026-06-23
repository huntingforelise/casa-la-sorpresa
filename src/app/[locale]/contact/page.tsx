import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { LocationMap } from "@/components/LocationMap";
import { SectionHeading } from "@/components/SectionHeading";
import { contact, copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMeta[locale].contact;
};

const ContactPage = async ({ params }: PageProps) => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = copy[locale];

  return (
    <section className="section-band bg-background px-5 py-16 lg:px-8">
      <span className="shape-sun right-10 top-20 h-32 w-32" />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow={t.sections.contactEyebrow}
          title={t.sections.contactTitle}
          text={t.sections.contactText}
        />
        <div className="grid gap-4 lg:self-start">
          <a
            href={`mailto:${contact.email}`}
            className="organic-card flex  items-center gap-4 rounded-[1.7rem] p-6"
          >
            <Mail className="h-7 w-7 shrink-0 text-citrus" aria-hidden="true" />
            <span className="break-all font-black">{contact.email}</span>
          </a>
          <div className="organic-card flex items-center gap-4 rounded-[1.7rem] p-6">
            <Phone
              className="h-7 w-7 shrink-0 text-pool-deep"
              aria-hidden="true"
            />
            <span className="font-black">{contact.phone}</span>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-5 rounded-[2rem] bg-sun/35 p-6 sm:grid-cols-[13rem_1fr] sm:items-start lg:block xl:grid">
            <Image
              src="/images/owners-elise-julien-noah.jpeg"
              alt="Elise, Julien and Noah"
              width={352}
              height={470}
              className="aspect-[4/5] w-48 rounded-[1.35rem] border-[6px] border-cream object-cover shadow-[0_14px_34px_rgba(85,107,47,0.16)] sm:w-full lg:mb-5 lg:w-56 xl:mb-0 xl:w-full"
            />
            <div>
              <p className="text-lg font-black">{t.ownerStory.title}</p>
              <p className="mt-2 leading-7 text-muted">{t.ownerStory.text}</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-border bg-cream/76 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-pool-deep">
              {t.lagosApartment.title}
            </p>
            <p className="mt-2 leading-7 text-muted">{t.lagosApartment.text}</p>
          </div>
        </div>
        <LocationMap className="h-full min-h-[28rem]" />
      </div>
    </section>
  );
};

export default ContactPage;
