"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  isAdminLoginConfigured,
  isValidAdminSession,
} from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isLocale, type Locale } from "@/lib/i18n";

const adminPath = (locale: Locale, search = "") =>
  `/${locale}/admin/booking-confirmation${search}`;

const requireAdmin = async (locale: Locale) => {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect(adminPath(locale, "?calendar=unauthorized"));
  }
};

const isValidDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
};

export const addBlockedDates = async (formData: FormData) => {
  const rawLocale = String(formData.get("locale") ?? "en");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  await requireAdmin(locale);

  const arrival = String(formData.get("arrival") ?? "");
  const departure = String(formData.get("departure") ?? "");
  const reason = String(formData.get("reason") ?? "").trim();
  if (
    !isValidDate(arrival) ||
    !isValidDate(departure) ||
    departure <= arrival ||
    reason.length > 240
  ) {
    redirect(adminPath(locale, "?calendar=invalid"));
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect(adminPath(locale, "?calendar=unavailable"));

  const { data: conflicts, error: conflictError } = await supabase
    .from("bookings")
    .select("id")
    .lt("arrival", departure)
    .gt("departure", arrival)
    .in("status", ["hold", "confirmed"])
    .limit(1);

  if (conflictError) redirect(adminPath(locale, "?calendar=error"));
  if (conflicts.length > 0) redirect(adminPath(locale, "?calendar=booking-conflict"));

  const { error } = await supabase.from("blocked_dates").insert({
    arrival,
    departure,
    reason: reason || "Owner block",
  });

  if (error) {
    const status = error.code === "23P01" ? "block-conflict" : "error";
    redirect(adminPath(locale, `?calendar=${status}`));
  }

  revalidatePath(adminPath(locale));
  redirect(adminPath(locale, "?calendar=added"));
};

export const removeBlockedDates = async (formData: FormData) => {
  const rawLocale = String(formData.get("locale") ?? "en");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  await requireAdmin(locale);

  const id = String(formData.get("id") ?? "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    redirect(adminPath(locale, "?calendar=invalid"));
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect(adminPath(locale, "?calendar=unavailable"));

  const { error } = await supabase.from("blocked_dates").delete().eq("id", id);
  if (error) redirect(adminPath(locale, "?calendar=error"));

  revalidatePath(adminPath(locale));
  revalidatePath("/api/calendar");
  redirect(adminPath(locale, "?calendar=removed"));
};

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
