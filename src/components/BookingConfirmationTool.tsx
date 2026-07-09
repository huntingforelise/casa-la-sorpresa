"use client";

import { useMemo, useState } from "react";
import {
  FileDown,
  MessageSquareText,
  ReceiptText,
  Sparkles,
  Waves,
} from "lucide-react";

type ConfirmationLanguage = "nl" | "en" | "es";

type BookingConfirmationToolProps = {
  initialLanguage?: ConfirmationLanguage;
};

type ConfirmationForm = {
  language: ConfirmationLanguage;
  documentDate: string;
  guestName: string;
  arrival: string;
  departure: string;
  guests: string;
  nightlyRate: string;
  discountPercent: string;
  discountReason: string;
  depositPercent: string;
  address: string;
  website: string;
  accountName: string;
  accountNumber: string;
  signOff: string;
  extraNote: string;
};

type ToolLabels = {
  badge: string;
  title: string;
  intro: string;
  print: string;
  conversation: string;
  conversationPlaceholder: string;
  pullDetails: string;
  language: string;
  documentDate: string;
  guestName: string;
  guests: string;
  arrival: string;
  departure: string;
  nightlyRate: string;
  depositPercent: string;
  discountPercent: string;
  discountReason: string;
  discountReasonPlaceholder: string;
  address: string;
  website: string;
  accountName: string;
  accountNumber: string;
  extraNote: string;
  extraNotePlaceholder: string;
  signOff: string;
};

type ConfirmationLabels = {
  confirmation: string;
  greeting: string;
  thanks: string;
  bookingLine: string;
  departure: string;
  guests: string;
  perNight: string;
  total: string;
  discount: string;
  discountWithoutReason: string;
  nights: string;
  deposit: string;
  balance: string;
  thanksAgain: string[];
  place: string;
  prepared: string;
  stay: string;
  guestsLabel: string;
  payment: string;
  depositShort: string;
  bankDetails: string;
  tool: ToolLabels;
};

const today = new Date().toISOString().slice(0, 10);

const defaultForm: ConfirmationForm = {
  language: "nl",
  documentDate: today,
  guestName: "",
  arrival: "",
  departure: "",
  guests: "2",
  nightlyRate: "185",
  discountPercent: "",
  discountReason: "",
  depositPercent: "50",
  address: "C. Monda 1240, 29130 Pinos de Alhaurin, Malaga, Spain",
  website: "www.casalasorpresa.com",
  accountName: "Elise Verhoeye",
  accountNumber: "BE63 9794 3666 5208",
  signOff: "Elise en Julien",
  extraNote: "",
};

const monthIndexes: Record<string, string> = {
  january: "01",
  januari: "01",
  jan: "01",
  february: "02",
  februari: "02",
  feb: "02",
  march: "03",
  maart: "03",
  mar: "03",
  april: "04",
  apr: "04",
  may: "05",
  mei: "05",
  june: "06",
  juni: "06",
  jun: "06",
  july: "07",
  juli: "07",
  jul: "07",
  august: "08",
  augustus: "08",
  aug: "08",
  september: "09",
  sep: "09",
  october: "10",
  oktober: "10",
  oct: "10",
  november: "11",
  nov: "11",
  december: "12",
  dec: "12",
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  setiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

const labels = {
  nl: {
    confirmation: "Bevestiging van jullie boeking",
    greeting: "Beste",
    thanks: "Bedankt voor jullie reserveringsaanvraag.",
    bookingLine: "Hierbij de bevestiging van jullie boeking voor aankomst op",
    departure: "en vertrek op",
    guests: "Voor {guests} personen vragen wij",
    perNight: "per nacht.",
    total: "Totaal is jullie verblijf",
    discount:
      "We hebben een korting van {percent}% toegepast voor {reason}. Het totaal na korting is {total}.",
    discountWithoutReason:
      "We hebben een korting van {percent}% toegepast. Het totaal na korting is {total}.",
    nights: "nachten",
    deposit:
      "Wij vragen een aanbetaling van {percent}% van de totale som. Het bedrag van {amount} bevestigt de boeking.",
    balance:
      "Het restantbedrag van {amount} vragen we jullie 4 weken voor aankomstdatum, {date}, te betalen.",
    thanksAgain: [
      "Nogmaals bedankt voor jullie boeking, we verheugen ons op jullie komst.",
      "Mochten er nog vragen zijn dan horen we die graag.",
    ],
    place: "Het paradijs wacht",
    prepared: "Opgesteld op",
    stay: "Verblijf",
    guestsLabel: "Gasten",
    payment: "Betaling",
    depositShort: "aanbetaling",
    bankDetails: "Bankgegevens",
    tool: {
      badge: "Boekings-PDF",
      title: "Bevestiging maken",
      intro:
        "Plak een gesprek met een gast om de basisgegevens in te vullen, pas de details aan en print de live bevestiging als PDF.",
      print: "Print / bewaar PDF",
      conversation: "Gesprek",
      conversationPlaceholder:
        "Plak een e-mail, WhatsApp-bericht of boekingsnotities...",
      pullDetails: "Haal gegevens op",
      language: "Taal",
      documentDate: "Documentdatum",
      guestName: "Naam gast",
      guests: "Gasten",
      arrival: "Aankomst",
      departure: "Vertrek",
      nightlyRate: "Prijs per nacht",
      depositPercent: "Aanbetaling %",
      discountPercent: "Korting %",
      discountReason: "Reden korting",
      discountReasonPlaceholder:
        "Vroege boeking, terugkerende gast, langer verblijf...",
      address: "Adres",
      website: "Website",
      accountName: "Naam rekeninghouder",
      accountNumber: "Rekeningnummer",
      extraNote: "Extra notitie",
      extraNotePlaceholder: "Optionele betalings-, aankomst- of gastnotitie...",
      signOff: "Afsluiting",
    },
  },
  en: {
    confirmation: "Confirmation of your booking",
    greeting: "Dear",
    thanks: "Thank you for your reservation request.",
    bookingLine: "This confirms your booking with arrival on",
    departure: "and departure on",
    guests: "For {guests} guests we charge",
    perNight: "per night.",
    total: "Your total stay is",
    discount:
      "We have applied a discount of {percent}% for {reason}. The total after discount is {total}.",
    discountWithoutReason:
      "We have applied a discount of {percent}%. The total after discount is {total}.",
    nights: "nights",
    deposit:
      "We ask for a deposit of {percent}% of the total amount. The amount of {amount} confirms the booking.",
    balance:
      "The remaining balance of {amount} is due 4 weeks before arrival, on {date}.",
    thanksAgain: [
      "Thank you again for your booking, we look forward to welcoming you.",
      "Please let us know if you have any questions.",
    ],
    place: "Paradise awaits",
    prepared: "Prepared on",
    stay: "Stay",
    guestsLabel: "Guests",
    payment: "Payment",
    depositShort: "deposit",
    bankDetails: "Bank details",
    tool: {
      badge: "Booking PDF",
      title: "Confirmation maker",
      intro:
        "Paste a guest conversation to pre-fill the basics, adjust the details, then print the live confirmation as a PDF.",
      print: "Print / save PDF",
      conversation: "Conversation",
      conversationPlaceholder:
        "Paste an email, WhatsApp message, or booking notes...",
      pullDetails: "Pull details",
      language: "Language",
      documentDate: "Document date",
      guestName: "Guest name",
      guests: "Guests",
      arrival: "Arrival",
      departure: "Departure",
      nightlyRate: "Nightly rate",
      depositPercent: "Deposit %",
      discountPercent: "Discount %",
      discountReason: "Discount reason",
      discountReasonPlaceholder:
        "Early booking, returning guest, longer stay...",
      address: "Address",
      website: "Website",
      accountName: "Account name",
      accountNumber: "Account number",
      extraNote: "Extra note",
      extraNotePlaceholder:
        "Optional payment, arrival, or guest-specific note...",
      signOff: "Sign-off",
    },
  },
  es: {
    confirmation: "Confirmacion de vuestra reserva",
    greeting: "Hola",
    thanks: "Gracias por vuestra solicitud de reserva.",
    bookingLine: "Confirmamos vuestra reserva con llegada el",
    departure: "y salida el",
    guests: "Para {guests} personas cobramos",
    perNight: "por noche.",
    total: "El total de vuestra estancia es",
    discount:
      "Hemos aplicado un descuento del {percent}% por {reason}. El total despues del descuento es {total}.",
    discountWithoutReason:
      "Hemos aplicado un descuento del {percent}%. El total despues del descuento es {total}.",
    nights: "noches",
    deposit:
      "Pedimos un anticipo del {percent}% del importe total. El importe de {amount} confirma la reserva.",
    balance:
      "El importe restante de {amount} vence 4 semanas antes de la llegada, el {date}.",
    thanksAgain: [
      "Gracias de nuevo por vuestra reserva, tenemos muchas ganas de recibiros.",
      "Si teneis alguna pregunta, no dudeis en escribirnos.",
    ],
    place: "El paraiso os espera",
    prepared: "Preparado el",
    stay: "Estancia",
    guestsLabel: "Huespedes",
    payment: "Pago",
    depositShort: "anticipo",
    bankDetails: "Datos bancarios",
    tool: {
      badge: "PDF de reserva",
      title: "Crear confirmacion",
      intro:
        "Pega una conversacion con el huesped para completar los datos basicos, ajusta los detalles y luego imprime la confirmacion como PDF.",
      print: "Imprimir / guardar PDF",
      conversation: "Conversacion",
      conversationPlaceholder:
        "Pega un email, mensaje de WhatsApp o notas de reserva...",
      pullDetails: "Extraer datos",
      language: "Idioma",
      documentDate: "Fecha del documento",
      guestName: "Nombre del huesped",
      guests: "Huespedes",
      arrival: "Llegada",
      departure: "Salida",
      nightlyRate: "Precio por noche",
      depositPercent: "Anticipo %",
      discountPercent: "Descuento %",
      discountReason: "Motivo del descuento",
      discountReasonPlaceholder:
        "Reserva anticipada, huesped recurrente, estancia larga...",
      address: "Direccion",
      website: "Sitio web",
      accountName: "Nombre de la cuenta",
      accountNumber: "Numero de cuenta",
      extraNote: "Nota extra",
      extraNotePlaceholder: "Nota opcional sobre pago, llegada o el huesped...",
      signOff: "Despedida",
    },
  },
} satisfies Record<ConfirmationLanguage, ConfirmationLabels>;

const fieldClass =
  "min-h-11 rounded-xl border border-border bg-cream px-3.5 text-sm text-foreground caret-foreground placeholder:text-muted [color-scheme:light]";

const textareaClass = `${fieldClass} min-h-28 resize-y py-3 leading-6`;

const toNumber = (value: string | undefined, fallback = 0) => {
  const normalized = (value ?? "").replace(",", ".").replace(/[^\d.]/g, "");
  const number = Number(normalized);

  return Number.isFinite(number) ? number : fallback;
};

const nightsBetween = (arrival: string, departure: string) => {
  if (!arrival || !departure) return 0;

  const start = new Date(`${arrival}T00:00:00Z`).getTime();
  const end = new Date(`${departure}T00:00:00Z`).getTime();

  return Math.max(0, Math.round((end - start) / 86_400_000));
};

const addDays = (date: string, days: number) => {
  if (!date) return "";

  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);

  return value.toISOString().slice(0, 10);
};

const dateLocales: Record<ConfirmationLanguage, string> = {
  nl: "nl-NL",
  en: "en-GB",
  es: "es-ES",
};

const formatDate = (date: string, language: ConfirmationLanguage) => {
  if (!date) return "_____";

  return new Intl.DateTimeFormat(dateLocales[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
};

const formatShortDate = (date: string) => {
  if (!date) return "_____";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
};

const formatMoney = (amount: number, language: ConfirmationLanguage) => {
  return new Intl.NumberFormat(dateLocales[language], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const parseLooseDate = (value: string) => {
  const numeric = value.match(/\b(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})\b/);
  if (numeric) {
    const [, day, month, rawYear] = numeric;
    const year = rawYear.length === 2 ? `20${rawYear}` : rawYear;

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const named = value.toLowerCase().match(/\b(\d{1,2})\s+([a-z]+)\s+(\d{4})\b/);
  if (named) {
    const [, day, month, year] = named;
    const monthIndex = monthIndexes[month];

    if (monthIndex) return `${year}-${monthIndex}-${day.padStart(2, "0")}`;
  }

  return "";
};

const extractDates = (conversation: string) => {
  const lower = conversation.toLowerCase();
  const explicitArrival = lower.match(
    /(?:arrival|aankomst|arrive|check.?in|van|llegada|entrada)\D{0,28}((?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(?:\d{1,2}\s+[a-z]+\s+\d{4}))/,
  );
  const explicitDeparture = lower.match(
    /(?:departure|vertrek|depart|leave|check.?out|tot|salida)\D{0,28}((?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(?:\d{1,2}\s+[a-z]+\s+\d{4}))/,
  );

  if (explicitArrival || explicitDeparture) {
    return {
      arrival: explicitArrival ? parseLooseDate(explicitArrival[1]) : "",
      departure: explicitDeparture ? parseLooseDate(explicitDeparture[1]) : "",
    };
  }

  const allDates = lower.match(
    /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}\s+[a-z]+\s+\d{4})\b/g,
  );

  return {
    arrival: allDates?.[0] ? parseLooseDate(allDates[0]) : "",
    departure: allDates?.[1] ? parseLooseDate(allDates[1]) : "",
  };
};

const extractConversation = (conversation: string) => {
  const { arrival, departure } = extractDates(conversation);
  const name =
    conversation.match(
      /(?:name|naam|beste|dear|nombre|hola)\s*:?\s*([A-Z][a-zA-Z-]+)/,
    )?.[1] ?? "";
  const guestCount =
    conversation.match(
      /(\d+)\s*(?:personen|guests?|people|volwassenen|personas|huespedes)/i,
    )?.[1] ?? "";
  const nightlyRate =
    conversation.match(/(?:eur|euro|€)\s*([0-9]+(?:[,.][0-9]{1,2})?)/i)?.[1] ??
    conversation.match(/([0-9]+(?:[,.][0-9]{1,2})?)\s*(?:eur|euro|€)/i)?.[1] ??
    "";

  return {
    arrival,
    departure,
    guestName: name,
    guests: guestCount,
    nightlyRate,
  };
};

export const BookingConfirmationTool = ({
  initialLanguage = "nl",
}: BookingConfirmationToolProps) => {
  const [form, setForm] = useState<ConfirmationForm>({
    ...defaultForm,
    language: initialLanguage,
  });
  const [conversation, setConversation] = useState("");
  const t = labels[form.language];
  const nights = nightsBetween(form.arrival, form.departure);
  const nightlyRate = toNumber(form.nightlyRate, 0);
  const subtotal = nights * nightlyRate;
  const discountPercent = Math.min(
    Math.max(0, toNumber(form.discountPercent, 0)),
    100,
  );
  const discountAmount = subtotal * (discountPercent / 100);
  const discountReason = (form.discountReason ?? "").trim();
  const depositPercent = toNumber(form.depositPercent, 50);
  const total = Math.max(0, subtotal - discountAmount);
  const deposit = total * (depositPercent / 100);
  const balance = Math.max(0, total - deposit);
  const balanceDueDate = addDays(form.arrival, -28);
  const guestName = form.guestName.trim() || "_____";
  const guestCount = form.guests.trim() || "_____";

  const summaryItems = useMemo(
    () => [
      {
        label: t.stay,
        value: `${formatShortDate(form.arrival)} - ${formatShortDate(
          form.departure,
        )}`,
      },
      {
        label: t.guestsLabel,
        value: guestCount,
      },
      {
        label: t.payment,
        value: `${formatMoney(deposit, form.language)} ${t.depositShort}`,
      },
    ],
    [
      deposit,
      form.arrival,
      form.departure,
      form.language,
      guestCount,
      t.depositShort,
      t.guestsLabel,
      t.payment,
      t.stay,
    ],
  );

  const update = (key: keyof ConfirmationForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const applyConversation = () => {
    const extracted = extractConversation(conversation);

    setForm((current) => ({
      ...current,
      arrival: extracted.arrival || current.arrival,
      departure: extracted.departure || current.departure,
      guestName: extracted.guestName || current.guestName,
      guests: extracted.guests || current.guests,
      nightlyRate: extracted.nightlyRate || current.nightlyRate,
    }));
  };

  const printPdf = () => {
    window.print();
  };

  return (
    <section className="confirmation-admin-page bg-background px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.88fr_1.12fr]">
        <div className="admin-panel grid gap-5 self-start">
          <div className="organic-card rounded-[2rem] p-5 md:p-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-pool/18 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pool-deep">
              <ReceiptText className="h-4 w-4" aria-hidden="true" />
              {t.tool.badge}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              {t.tool.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-muted">
              {t.tool.intro}
            </p>
            <button
              type="button"
              onClick={printPdf}
              className="cta-primary mt-6 w-full sm:w-auto"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t.tool.print}
            </button>
          </div>

          <div className="organic-card rounded-[1.5rem] p-5">
            <label className="grid gap-2 text-sm font-bold">
              <span className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-pool-deep" />
                {t.tool.conversation}
              </span>
              <textarea
                value={conversation}
                onChange={(event) => setConversation(event.target.value)}
                className={textareaClass}
                placeholder={t.tool.conversationPlaceholder}
              />
            </label>
            <button
              type="button"
              onClick={applyConversation}
              className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-pool px-5 text-sm font-black text-cream transition hover:-translate-y-0.5 hover:bg-pool-deep"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t.tool.pullDetails}
            </button>
          </div>

          <div className="organic-card grid gap-5 rounded-[1.5rem] p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.language}
                <select
                  value={form.language}
                  onChange={(event) =>
                    update(
                      "language",
                      event.target.value as ConfirmationLanguage,
                    )
                  }
                  className={fieldClass}
                >
                  <option value="nl">Nederlands</option>
                  <option value="en">English</option>
                  <option value="es">Espanol</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.documentDate}
                <input
                  type="date"
                  value={form.documentDate ?? ""}
                  onChange={(event) =>
                    update("documentDate", event.target.value)
                  }
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.guestName}
                <input
                  value={form.guestName ?? ""}
                  onChange={(event) => update("guestName", event.target.value)}
                  className={fieldClass}
                  placeholder="Fiona"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.guests}
                <input
                  type="number"
                  min="1"
                  value={form.guests ?? ""}
                  onChange={(event) => update("guests", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.arrival}
                <input
                  type="date"
                  value={form.arrival ?? ""}
                  onChange={(event) => update("arrival", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.departure}
                <input
                  type="date"
                  value={form.departure ?? ""}
                  onChange={(event) => update("departure", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.nightlyRate}
                <input
                  inputMode="decimal"
                  value={form.nightlyRate ?? ""}
                  onChange={(event) =>
                    update("nightlyRate", event.target.value)
                  }
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.depositPercent}
                <input
                  inputMode="decimal"
                  value={form.depositPercent ?? ""}
                  onChange={(event) =>
                    update("depositPercent", event.target.value)
                  }
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.discountPercent}
                <input
                  inputMode="decimal"
                  value={form.discountPercent ?? ""}
                  onChange={(event) =>
                    update("discountPercent", event.target.value)
                  }
                  className={fieldClass}
                  placeholder="0"
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-bold">
              {t.tool.discountReason}
              <input
                value={form.discountReason ?? ""}
                onChange={(event) =>
                  update("discountReason", event.target.value)
                }
                className={fieldClass}
                placeholder={t.tool.discountReasonPlaceholder}
              />
            </label>

            <label className="grid gap-1.5 text-sm font-bold">
              {t.tool.address}
              <input
                value={form.address ?? ""}
                onChange={(event) => update("address", event.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-bold">
              {t.tool.website}
              <input
                value={form.website ?? ""}
                onChange={(event) => update("website", event.target.value)}
                className={fieldClass}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.accountName}
                <input
                  value={form.accountName ?? ""}
                  onChange={(event) =>
                    update("accountName", event.target.value)
                  }
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {t.tool.accountNumber}
                <input
                  value={form.accountNumber ?? ""}
                  onChange={(event) =>
                    update("accountNumber", event.target.value)
                  }
                  className={fieldClass}
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-bold">
              {t.tool.extraNote}
              <textarea
                value={form.extraNote ?? ""}
                onChange={(event) => update("extraNote", event.target.value)}
                className={textareaClass}
                placeholder={t.tool.extraNotePlaceholder}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-bold">
              {t.tool.signOff}
              <input
                value={form.signOff ?? ""}
                onChange={(event) => update("signOff", event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>
        </div>

        <article className="confirmation-print overflow-hidden rounded-[2rem] bg-cream shadow-[0_30px_90px_rgba(85,107,47,0.16)]">
          <div className="bg-pool-deep px-7 py-8 text-cream md:px-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-sun text-foreground">
                    <Waves className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-2xl font-black leading-none">
                      Casa la Sorpresa
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-sun">
                      Holiday apartment
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-cream/76">
                  {form.address}
                  <br />
                  {form.website}
                </p>
              </div>
              <div className="rounded-2xl bg-cream/10 px-5 py-4 text-right">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-sun">
                  {t.prepared}
                </p>
                <p className="mt-1 text-lg font-black">
                  {formatDate(form.documentDate, form.language)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-7 py-8 md:px-10 md:py-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-citrus">
                {t.place}
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight">
                {t.confirmation}
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-background/54 px-4 py-3"
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-black leading-5">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 text-[0.98rem] leading-8 text-foreground">
              <p>
                {t.greeting} {guestName},
              </p>
              <p>
                <span className="block">{t.thanks}</span>
                <span className="block">
                  {t.bookingLine} {formatDate(form.arrival, form.language)}{" "}
                  {t.departure} {formatDate(form.departure, form.language)}.
                </span>
              </p>
              <p>
                {t.guests.replace("{guests}", guestCount)}{" "}
                {formatMoney(nightlyRate, form.language)} {t.perNight}
                <br />
                {t.total} {nights || "_____"} {t.nights}.{" "}
                {formatMoney(nightlyRate, form.language)} x {nights || "_____"}{" "}
                = {formatMoney(subtotal, form.language)}
              </p>
              {discountAmount > 0 ? (
                <p>
                  {(discountReason ? t.discount : t.discountWithoutReason)
                    .replace("{percent}", String(discountPercent || "_____"))
                    .replace("{reason}", discountReason)
                    .replace("{total}", formatMoney(total, form.language))}
                </p>
              ) : null}
              <p>
                {t.deposit
                  .replace("{percent}", String(depositPercent || "_____"))
                  .replace("{amount}", formatMoney(deposit, form.language))}
                <br />
                {t.balance
                  .replace("{amount}", formatMoney(balance, form.language))
                  .replace("{date}", formatDate(balanceDueDate, form.language))}
              </p>
              <div className="rounded-2xl border border-pool/25 bg-pool/10 px-5 py-4 leading-7">
                <p className="font-black">{t.bankDetails}</p>
                <p>
                  {t.tool.accountName}: {form.accountName ?? ""}
                </p>
                <p>
                  {t.tool.accountNumber}: {form.accountNumber ?? ""}
                </p>
              </div>
              {form.extraNote ? <p>{form.extraNote}</p> : null}
              <p>
                {t.thanksAgain.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="font-black">{form.signOff}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
