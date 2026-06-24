import Link from "next/link";
import { Waves } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { copy } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export const SiteHeader = ({ locale }: SiteHeaderProps) => {
  const t = copy[locale];
  const mobileBookLabel = t.book.split(" ")[0] ?? t.book;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-cream/86 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:flex sm:justify-between sm:gap-4 sm:px-5 sm:py-4 lg:px-8">
        <Link
          href={localizedPath(locale)}
          className="flex min-w-0 items-center gap-2 font-black sm:gap-3"
          aria-label="Casa la Sorpresa home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun text-foreground shadow-[0_10px_26px_rgba(246,162,26,0.25)] sm:h-11 sm:w-11">
            <Waves className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-base sm:text-lg">
              Casa la Sorpresa
            </span>
            <span className="block truncate text-[0.62rem] font-bold uppercase tracking-[0.14em] text-muted sm:text-xs sm:tracking-[0.18em]">
              {t.common.brandSubline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {t.nav.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(locale, item.href)}
              className="rounded-full px-4 py-2 text-sm font-bold text-foreground/84 transition hover:bg-sun/40 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Link
            href={localizedPath(locale, "/booking")}
            className="cta-primary header-cta"
          >
            <span className="sm:hidden">{mobileBookLabel}</span>
            <span className="hidden sm:inline">{t.book}</span>
          </Link>
          <MobileMenu locale={locale} items={t.nav} />
        </div>
      </div>
    </header>
  );
};
