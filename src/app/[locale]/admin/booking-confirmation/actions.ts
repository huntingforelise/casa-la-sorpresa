"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  isAdminLoginConfigured,
} from "@/lib/adminAuth";
import { isLocale, type Locale } from "@/lib/i18n";

const adminPath = (locale: Locale, search = "") =>
  `/${locale}/admin/booking-confirmation${search}`;

export const loginToBookingConfirmationAdmin = async (formData: FormData) => {
  const rawLocale = String(formData.get("locale") ?? "en");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const password = String(formData.get("password") ?? "");
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!isAdminLoginConfigured() || !expectedPassword) {
    redirect(adminPath(locale, "?setup=missing"));
  }

  if (password !== expectedPassword) {
    redirect(adminPath(locale, "?adminError=1"));
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: createAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect(adminPath(locale));
};
