import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { builder, contact, copy, registrationNumber } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";

export const SiteFooter = ({ locale }: { locale: Locale }) => {
  const t = copy[locale];

  return (
    <footer className="border-t border-pool/20 bg-pool/12 text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-2xl font-black">Casa la Sorpresa</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            {t.common.footerText}
          </p>
          <p className="mt-4 font-mono text-xs font-bold text-terracotta">
            {t.common.registration} {registrationNumber}
          </p>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-pool-deep">
            {t.common.explore}
          </p>
          <div className="mt-4 grid gap-2">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(locale, item.href)}
                className="text-sm text-muted transition hover:text-pool-deep"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-pool-deep">
            {t.common.contact}
          </p>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <a
              href={`mailto:${contact.email}`}
              className="transition hover:text-pool-deep"
            >
              {contact.email}
            </a>
            <p>{contact.phone}</p>
            <p>{contact.location}</p>
            <LanguageSwitcher locale={locale} variant="footer" />
            <p className="pt-2 text-xs">
              Built by{" "}
              <a
                href={builder.url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-pool-deep transition hover:text-terracotta"
              >
                {builder.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
