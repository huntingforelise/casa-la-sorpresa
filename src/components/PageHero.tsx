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
      <div className="mx-auto grid min-h-[calc(100svh-65px)] max-w-7xl items-center gap-8 px-4 py-8 sm:px-5 sm:py-10 md:min-h-[calc(100svh-84px)] md:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="relative z-10 min-w-0 max-w-2xl">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full bg-sun/70 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-foreground sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-full text-balance break-words text-[clamp(2.35rem,10.5vw,3.15rem)] font-black leading-[1] text-foreground sm:mt-6 sm:text-6xl sm:leading-[0.95] lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
            {t.hero.text}
          </p>
          <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
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
          <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            {t.highlights.map((item) => (
              <span
                key={item}
                className="min-w-0 rounded-full border border-border bg-cream/80 px-3 py-2 text-center text-xs font-bold leading-snug sm:px-4 sm:text-sm"
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
              className="aspect-[4/3] h-full w-full object-cover object-[66%_center]"
            />
          </div>
        </div>
      </div>
      <div className="wave-divider h-16 bg-cream" />
    </section>
  );
};
