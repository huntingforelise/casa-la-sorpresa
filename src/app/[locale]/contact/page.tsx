import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { LocationMap } from "@/components/LocationMap";
import { SectionHeading } from "@/components/SectionHeading";
import { contact, copy, pageMeta } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
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
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow={t.sections.contactEyebrow}
          title={t.sections.contactTitle}
          text={t.sections.contactText}
        />
        <div className="grid gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="organic-card flex items-center gap-4 rounded-[1.7rem] p-6"
          >
            <Mail className="h-7 w-7 text-citrus" aria-hidden="true" />
            <span className="font-black">{contact.email}</span>
          </a>
          <div className="organic-card flex items-center gap-4 rounded-[1.7rem] p-6">
            <Phone className="h-7 w-7 text-pool-deep" aria-hidden="true" />
            <span className="font-black">{contact.phone}</span>
          </div>
          <div className="rounded-[2rem] bg-sun/35 p-6">
            <p className="text-lg font-black">{t.ownerStory.title}</p>
            <p className="mt-2 leading-7 text-muted">
              {t.ownerStory.text}
            </p>
          </div>
          <LocationMap />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
