import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookingConfirmationTool } from "@/components/BookingConfirmationTool";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/adminAuth";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return {
    title:
      locale === "nl"
        ? "Boekingsbevestiging maken"
        : locale === "es"
          ? "Crear confirmacion de reserva"
          : "Booking confirmation maker",
    robots: { index: false, follow: false },
  };
};

const BookingConfirmationAdminPage = async ({ params }: PageProps) => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect(`/${locale}/admin?auth=required`);
  }

  return (
    <>
      <div className="admin-panel mx-auto w-full max-w-5xl px-5 pt-8 lg:px-8">
        <Link href={`/${locale}/admin`} className="text-sm font-bold text-pool-deep hover:underline">
          ← Admin dashboard
        </Link>
      </div>
      <BookingConfirmationTool
        key={locale}
        initialLanguage={locale === "nl" || locale === "es" ? locale : "en"}
      />
    </>
  );
};

export default BookingConfirmationAdminPage;
