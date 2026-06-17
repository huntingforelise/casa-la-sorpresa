export const locales = ["en", "nl", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
  es: "Espanol",
};

export const isLocale = (value: string): value is Locale => {
  return locales.includes(value as Locale);
};

export const localizedPath = (locale: Locale, path = "") => {
  const cleanPath = path === "/" ? "" : path;
  return `/${locale}${cleanPath}`;
};
