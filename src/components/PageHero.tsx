import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { copy, heroImage } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";
import { OrganicShapes } from "./OrganicShapes";

export const PageHero = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];

  return (
    <section className="section-band sunny-shell">
      <OrganicShapes />
      <div className="mx-auto grid min-h-[calc(100svh-84px)] max-w-7xl items-center gap-10 px-5 py-10 md:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-sun/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            {t.hero.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizedPath(locale, "/booking")}
              className="cta-primary"
            >
              {t.hero.primary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={localizedPath(locale, "/stay")}
              className="cta-secondary"
            >
              {t.hero.secondary}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {t.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-cream/80 px-4 py-2 text-sm font-bold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="absolute -left-4 top-8 h-40 w-40 rounded-full bg-citrus/28" />
          <div className="absolute -right-2 bottom-10 h-28 w-28 rounded-full bg-pool/35" />
          <div className="relative overflow-hidden rounded-[2.4rem] border-[10px] border-cream shadow-[0_26px_80px_rgba(85,107,47,0.22)]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={1400}
              height={1000}
              priority
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="wave-divider h-16 bg-cream" />
    </section>
  );
};
