import { contact, copy } from "@/data/site";
import { bookingsEnabled } from "@/lib/booking-config";
import type { Locale } from "@/lib/i18n";

export const BookingIntro = ({
  locale,
  className,
}: {
  locale: Locale;
  className: string;
}) => {
  const t = copy[locale];

  if (bookingsEnabled) {
    return <p className={className}>{t.sections.bookingText}</p>;
  }

  const [beforeEmail, afterEmail] = t.booking.emailBookingText;

  return (
    <p className={className}>
      {beforeEmail}
      <a
        className="text-base font-bold text-sun underline underline-offset-4"
        href={`mailto:${contact.email}`}
      >
        {contact.email}
      </a>
      {afterEmail}
    </p>
  );
};
