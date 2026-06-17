import Link from "next/link";
import { Waves } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { copy } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export const SiteHeader = ({ locale }: SiteHeaderProps) => {
  const t = copy[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-cream/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link
          href={localizedPath(locale)}
          className="flex min-w-0 items-center gap-3 font-black"
          aria-label="Casa la Sorpresa home"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun text-foreground shadow-[0_10px_26px_rgba(246,162,26,0.25)]">
            <Waves className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg">Casa la Sorpresa</span>
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted">
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
          <Link href={localizedPath(locale, "/booking")} className="cta-primary">
            {t.book}
          </Link>
        </div>
      </div>
    </header>
  );
};
