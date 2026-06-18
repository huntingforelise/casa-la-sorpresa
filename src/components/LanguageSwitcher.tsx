"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localeNames, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  variant?: "header" | "footer";
};

export const LanguageSwitcher = ({
  locale,
  variant = "header",
}: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const rest = locales.includes(segments[0] as Locale)
    ? segments.slice(1)
    : segments;

  const hrefFor = (option: Locale) => {
    const suffix = rest.length ? `/${rest.join("/")}` : "";
    return `/${option}${suffix}`;
  };

  if (variant === "footer") {
    return (
      <div className="mt-3 flex gap-2">
        {locales.map((option) => (
          <Link
            key={option}
            href={hrefFor(option)}
            className={`rounded-full border px-3 py-1 text-xs font-black transition ${
              option === locale
                ? "border-pool bg-pool text-cream"
                : "border-border bg-cream/70 text-muted hover:border-pool hover:text-pool-deep"
            }`}
            aria-label={localeNames[option]}
          >
            {option.toUpperCase()}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-1 rounded-full border border-border bg-cream px-2 py-1 md:flex">
      <Languages className="h-4 w-4 text-pool-deep" aria-hidden="true" />
      {locales.map((option) => (
        <Link
          key={option}
          href={hrefFor(option)}
          className={`rounded-full px-2 py-1 text-xs font-black ${
            option === locale
              ? "bg-pool text-cream"
              : "text-muted hover:text-foreground"
          }`}
          aria-label={localeNames[option]}
        >
          {option.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};
