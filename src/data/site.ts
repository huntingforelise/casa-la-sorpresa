import {
  AirVent,
  Bath,
  BedDouble,
  Car,
  Mountain,
  Plane,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Waves,
  Wifi,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { Locale } from "@/lib/i18n";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  href: string;
  label: string;
};

export type PageCopy = {
  nav: NavItem[];
  book: string;
  common: {
    brandSubline: string;
    explore: string;
    contact: string;
    registration: string;
    footerText: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    primary: string;
    secondary: string;
  };
  highlights: string[];
  sections: {
    stayTitle: string;
    stayText: string;
    stayEyebrow: string;
    galleryTitle: string;
    galleryEyebrow: string;
    galleryText: string;
    areaTitle: string;
    areaEyebrow: string;
    areaText: string;
    bookingTitle: string;
    bookingEyebrow: string;
    bookingText: string;
    contactTitle: string;
    contactEyebrow: string;
    contactText: string;
    detailsEyebrow: string;
    detailsTitle: string;
    detailsText: string;
  };
  booking: {
    title: string;
    intro: string;
    arrival: string;
    departure: string;
    guests: string;
    name: string;
    email: string;
    notes: string;
    submit: string;
    demo: string;
  };
  contactPrompts: Array<{
    title: string;
    text: string;
  }>;
  galleryFilters: Record<GalleryCategory | "all", string>;
  stats: Array<{ value: string; label: string }>;
  amenities: Array<{
    title: string;
    text: string;
    icon: IconComponent;
  }>;
  stayDetails: Array<{
    title: string;
    text: string;
    icon: IconComponent;
  }>;
  attractions: Array<{
    title: string;
    text: string;
    icon: IconComponent;
  }>;
  rateSeasons: Array<{ name: string; months: string; nightly: number }>;
  areaCallout: string;
  bookingRateSuffix: string;
  bookingNight: string;
  ownerStory: {
    title: string;
    text: string;
  };
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.casalasorpresa.com";

export const registrationNumber = "VFT/MA/43321";

export const maxGuests = 4;

export const contact = {
  email: "hello@casalasorpresa.com",
  phone: "+34 000 000 000",
  location: "Alhaurin de la Torre, Malaga, Spain",
};

export const heroImage = {
  src: "https://static.wixstatic.com/media/e5e27a_39a46ba873ff4f488fdbabeec6f31e69~mv2.jpg",
  alt: "Casa la Sorpresa pool with mountain views",
};

export const galleryImages = [
  {
    src: "https://static.wixstatic.com/media/e5e27a_39a46ba873ff4f488fdbabeec6f31e69~mv2.jpg",
    alt: "Casa la Sorpresa pool",
    category: "pool",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_741e948668624bc3847333576ab3d650~mv2.jpeg",
    alt: "Casa la Sorpresa night view",
    category: "views",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_ab2f9e2af46c4625af25d159ad4f190b~mv2.jpg",
    alt: "Casa la Sorpresa main bedroom",
    category: "inside",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_e917e89258d6485da647d26759269cba~mv2.jpeg",
    alt: "Poolside terrace at Casa la Sorpresa",
    category: "pool",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_b3055a18c15141a68aff6eb37a0a7ebb~mv2.jpeg",
    alt: "Casa la Sorpresa poolside terrace",
    category: "pool",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_b3f5e52eb31d4878b2ecdff0baa4f70c~mv2.jpeg",
    alt: "Orange tree garden at Casa la Sorpresa",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_0e624e50450743b8967c3952b9ed7a89~mv2.jpeg",
    alt: "Orange tree garden dining area",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_606d77f8c4a24860b34fa04d82e3f97e~mv2.jpeg",
    alt: "Orange tree garden poolside",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_d10fc5b99db040a992893e6c874171c5~mv2.jpeg",
    alt: "South-facing terrace at Casa la Sorpresa",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_224908dc28b14a93a7b041738ffedc01~mv2.jpeg",
    alt: "Sunny terrace at Casa la Sorpresa",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_a726766881aa45019583495e2a1f3862~mv2.jpeg",
    alt: "Casa la Sorpresa sunset poolside",
    category: "pool",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_305fec1c4ce74b7ab5c06b8dcc771b5c~mv2.jpeg",
    alt: "Casa la Sorpresa sunset view",
    category: "views",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_36937d19251e4312ba47c41193c342f8~mv2.jpeg",
    alt: "Casa la Sorpresa pool and terrace",
    category: "pool",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_defaf331c4a24e3c9cf8235a69df0033~mv2.jpeg",
    alt: "Casa la Sorpresa mountain view",
    category: "views",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_4d64aec643df4f75a49bcd47f427a7ea~mv2.jpg",
    alt: "Oranges in the Casa la Sorpresa garden",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_4849520dfa5b4a3c8bf1f5bd62626d52~mv2.jpeg",
    alt: "Casa la Sorpresa valley view",
    category: "views",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_d9133b3689434f1faaa6cc885b3f48e0~mv2.jpg",
    alt: "Living room at Casa la Sorpresa",
    category: "inside",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_543480e6cfda462b9e9eb38938c88cb5~mv2.jpg",
    alt: "Sunrise view from Casa la Sorpresa",
    category: "views",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_ddc64786915e436e9330bd9f0396bfc6~mv2.jpeg",
    alt: "Bathroom at Casa la Sorpresa",
    category: "inside",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_6d80705d5b5d4bbf8744b5e02a6a1578~mv2.jpg",
    alt: "Casa la Sorpresa terrace and pool view",
    category: "pool",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_cbda9ac16a2b4197bd3f72b1871c4421~mv2.jpg",
    alt: "Wide mountain view from Casa la Sorpresa",
    category: "views",
  },
];

export const areaImages = [
  {
    src: "https://static.wixstatic.com/media/e5e27a_e47f0fd3cc704a5bbfb63f9e44f1235b~mv2.jpg",
    alt: "Alhaurin de la Torre near Casa la Sorpresa",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_0c089aff69924d06a2d4b39364fd4242~mv2.jpg",
    alt: "Nearby Andalusian village",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_23e28d366ff745638f7a7a459252c73f~mv2.jpg",
    alt: "Nearby Costa del Sol beach",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_2b9e78a8e27b4ce6a9fa3bbdc86ecc5a~mv2.jpg",
    alt: "Nearby coastal town",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_35b36310a80f468381548980129b4fa1~mv2.jpg",
    alt: "Nearby mountain landscape",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_3bb08398bff94cbfac4740788ce19029~mv2.jpg",
    alt: "Nearby Andalusian street",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_702e6bd54e1c4cf7ba613b84a12a15c8~mv2.jpg",
    alt: "Nearby Costa del Sol scenery",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_843c25ad8bb04a928b216f181f1507d4~mv2.jpg",
    alt: "Nearby white village view",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_a3223b6d307f4c42891776e4732216fd~mv2.jpg",
    alt: "Nearby beach and sea view",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_d7568fb4f8544dbba104c5f55c674c61~mv2.jpg",
    alt: "Nearby Andalusian landscape",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_6fd6cc4619a14ecc8d602bc13a5c522e~mv2.jpg",
    alt: "Malaga City",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_be5cdd2df3e1483486f231c5de7f670c~mv2.jpg",
    alt: "Fuengirola promenade",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_d57eeb31d991411b955f06b0a20ec1ec~mv2.jpg",
    alt: "Mijas Pueblo",
  },
];

export type GalleryCategory = (typeof galleryImages)[number]["category"];
export type GalleryImage = (typeof galleryImages)[number];

// Edit this list to choose which images appear on the homepage.
// The first 4 appear in the grid; the next 2 appear as larger feature images.
export const homeGalleryImages = [
  galleryImages[0],
  galleryImages[2],
  galleryImages[4],
  galleryImages[6],
  galleryImages[11],
  galleryImages[17],
] satisfies GalleryImage[];

export const amenities: Array<{
  title: string;
  text: string;
  icon: IconComponent;
}> = [
  {
    title: "Sleeps 4",
    text: "Two comfortable bedrooms for couples, small families or friends.",
    icon: Users,
  },
  {
    title: "Pool",
    text: "Sunny poolside days with mountain views.",
    icon: Waves,
  },
  {
    title: "Terraces and garden",
    text: "Warm outdoor spaces for breakfast, reading, swimming, and golden-hour drinks.",
    icon: Sun,
  },
  {
    title: "Air conditioning",
    text: "Cool, comfortable rooms during Andalusian summers.",
    icon: AirVent,
  },
  {
    title: "Fast WiFi",
    text: "Stay connected when you want to.",
    icon: Wifi,
  },
  {
    title: "Free parking",
    text: "Easy arrival by car and day trips along the coast.",
    icon: Car,
  },
];

export const stats = [
  { value: "4", label: "guests" },
  { value: "2", label: "bedrooms" },
  { value: "15", label: "min to airport" },
  { value: "3", label: "hosts" },
];

export const stayDetails = [
  {
    title: "Two easy bedrooms",
    text: "A practical layout for couples, small families, or friends travelling together.",
    icon: BedDouble,
  },
  {
    title: "Fresh bathrooms",
    text: "Simple, comfortable facilities with the essentials guests expect.",
    icon: Bath,
  },
  {
    title: "Terraces and garden",
    text: "Warm outdoor spaces for breakfast, reading, swimming, and golden-hour drinks.",
    icon: Sun,
  },
  {
    title: "Licensed rental",
    text: `Registered tourist accommodation: ${registrationNumber}.`,
    icon: ShieldCheck,
  },
];

export const attractions = [
  {
    title: "Malaga",
    text: "Culture, food markets, museums, shopping, beach walks, and evenings in the old town.",
    icon: Sparkles,
  },
  {
    title: "Mijas Pueblo",
    text: "Whitewashed streets, viewpoints, ceramics, and a classic Andalusian day trip.",
    icon: Mountain,
  },
  {
    title: "Costa del Sol beaches",
    text: "Beach days around Torremolinos, Benalmadena, Fuengirola, and beyond.",
    icon: Waves,
  },
  {
    title: "Malaga Airport",
    text: "A short, convenient transfer that keeps arrival and departure days relaxed.",
    icon: Plane,
  },
];

export const rateSeasons = [
  { name: "Spring sunshine", months: "Mar-May", nightly: 135 },
  { name: "Summer glow", months: "Jun-Sep", nightly: 185 },
  { name: "Golden calm", months: "Oct-Feb", nightly: 115 },
];

export const copy: Record<Locale, PageCopy> = {
  en: {
    nav: [
      { href: "/stay", label: "Stay" },
      { href: "/gallery", label: "Gallery" },
      { href: "/area", label: "Area" },
      { href: "/booking", label: "Booking" },
      { href: "/contact", label: "Contact" },
    ],
    book: "Book your stay",
    common: {
      brandSubline: "Malaga sunshine",
      explore: "Explore",
      contact: "Contact",
      registration: "Registration",
      footerText:
        "A sunny holiday apartment with pool, garden corners and mountain views in Alhaurin de la Torre near Malaga.",
    },
    hero: {
      eyebrow: "Sunny holiday apartment near Malaga",
      title: "An Andalusian escape with pool, citrus trees and mountain views.",
      text: "Casa la Sorpresa is made for slow breakfasts, warm pool days and easy trips across the Costa del Sol.",
      primary: "Check availability",
      secondary: "Explore the house",
    },
    highlights: ["Pool and terraces", "Sleeps 4", "Near Malaga airport"],
    sections: {
      stayEyebrow: "Stay",
      stayTitle: "Everything for an easy summer stay",
      stayText:
        "Relaxed indoor spaces, sunny outdoor corners and practical comforts for families and friends.",
      galleryEyebrow: "Gallery",
      galleryTitle: "Real views, real sunshine",
      galleryText:
        "A photo-first view of the pool, interiors, terraces, garden and mountain light.",
      areaEyebrow: "Area",
      areaTitle: "Close to Malaga, beaches and white villages",
      areaText:
        "A calm base in Alhaurin de la Torre with easy routes to Malaga, beaches, white villages and airport transfers.",
      bookingEyebrow: "Booking",
      bookingTitle: "Reserve sunny dates",
      bookingText:
        "Pick your dates to start the direct booking flow. In demo mode the form validates locally; with Stripe and Supabase configured, it creates a hold and sends guests to deposit checkout.",
      contactEyebrow: "Contact",
      contactTitle: "Ask us anything",
      contactText:
        "Questions about dates, longer stays, accessibility, arrival times or the future handover? Send a note.",
      detailsEyebrow: "Still deciding?",
      detailsTitle: "Ask a quick question before you book",
      detailsText:
        "If you are checking dates, arrival plans or a longer stay, send us the details and we will help you choose the next step.",
    },
    booking: {
      title: "Start a booking",
      intro:
        "Choose dates and guests. We will validate availability before creating a deposit checkout.",
      arrival: "Arrival",
      departure: "Departure",
      guests: "Guests",
      name: "Name",
      email: "Email",
      notes: "Notes",
      submit: "Continue to deposit",
      demo: "Demo mode: add Supabase and Stripe environment variables to activate live deposits.",
    },
    contactPrompts: [
      {
        title: "Dates and availability",
        text: "Tell us your ideal arrival window and how flexible you are.",
      },
      {
        title: "Arrival details",
        text: "Ask about check-in, airport timing or getting settled after a late flight.",
      },
      {
        title: "Longer stays",
        text: "Share the length of stay you have in mind and what would make it comfortable.",
      },
    ],
    galleryFilters: {
      all: "All",
      pool: "Pool",
      inside: "Inside",
      garden: "Garden",
      views: "Views",
    },
    stats,
    amenities,
    stayDetails,
    attractions,
    rateSeasons,
    areaCallout:
      "Alhaurin de la Torre gives guests the useful mix: calm evenings, easy airport transfers, and quick access to the coast.",
    bookingRateSuffix: "from EUR",
    bookingNight: "night",
    ownerStory: {
      title: "Owner story placeholder",
      text: "This section is ready for the new ownership story, updated host photo and more personal welcome copy before launch.",
    },
  },
  nl: {
    nav: [
      { href: "/stay", label: "Verblijf" },
      { href: "/gallery", label: "Galerij" },
      { href: "/area", label: "Omgeving" },
      { href: "/booking", label: "Boeken" },
      { href: "/contact", label: "Contact" },
    ],
    book: "Boek je verblijf",
    common: {
      brandSubline: "Zon bij Malaga",
      explore: "Ontdek",
      contact: "Contact",
      registration: "Registratie",
      footerText:
        "Een zonnig vakantieappartement met zwembad, tuinplekjes en bergzicht in Alhaurin de la Torre bij Malaga.",
    },
    hero: {
      eyebrow: "Zonnig vakantieappartement bij Malaga",
      title: "Een Andalusisch verblijf met zwembad, citrusbomen en bergzicht.",
      text: "Casa la Sorpresa is gemaakt voor trage ontbijten, warme zwembaddagen en makkelijke uitstappen aan de Costa del Sol.",
      primary: "Bekijk beschikbaarheid",
      secondary: "Ontdek het huis",
    },
    highlights: [
      "Zwembad en terrassen",
      "Voor 4 gasten",
      "Dicht bij Malaga airport",
    ],
    sections: {
      stayEyebrow: "Verblijf",
      stayTitle: "Alles voor een ontspannen zomerverblijf",
      stayText:
        "Gezellige binnenruimtes, zonnige buitenhoekjes en praktisch comfort voor families en vrienden.",
      galleryEyebrow: "Galerij",
      galleryTitle: "Echte uitzichten, echte zon",
      galleryText:
        "Een fotogerichte blik op het zwembad, interieur, de terrassen, tuin en het berglicht.",
      areaEyebrow: "Omgeving",
      areaTitle: "Dicht bij Malaga, stranden en witte dorpen",
      areaText:
        "Gebruik het huis als rustige zonnige uitvalsbasis voor Malaga stad, kustplaatsen, stranden en uitzichtpunten in de bergen.",
      bookingEyebrow: "Boeken",
      bookingTitle: "Reserveer zonnige data",
      bookingText:
        "Kies je data om de directe boeking te starten. In demomodus valideert het formulier lokaal; met Stripe en Supabase maakt het een tijdelijke reservering aan en stuurt het gasten naar de aanbetaling.",
      contactEyebrow: "Contact",
      contactTitle: "Vraag ons alles",
      contactText:
        "Vragen over data, langere verblijven, toegankelijkheid, aankomsttijden of de toekomstige overdracht? Stuur gerust een bericht.",
      detailsEyebrow: "Twijfel je nog?",
      detailsTitle: "Stel een korte vraag voor je boekt",
      detailsText:
        "Controleer je data, aankomstplannen of een langer verblijf? Stuur de details door en we helpen je met de volgende stap.",
    },
    booking: {
      title: "Start je boeking",
      intro:
        "Kies data en gasten. We controleren beschikbaarheid voordat de aanbetaling wordt aangemaakt.",
      arrival: "Aankomst",
      departure: "Vertrek",
      guests: "Gasten",
      name: "Naam",
      email: "E-mail",
      notes: "Opmerkingen",
      submit: "Ga naar aanbetaling",
      demo: "Demomodus: voeg Supabase- en Stripe-omgevingsvariabelen toe voor live betalingen.",
    },
    contactPrompts: [
      {
        title: "Data en beschikbaarheid",
        text: "Vertel ons je ideale aankomstperiode en hoe flexibel je bent.",
      },
      {
        title: "Aankomstdetails",
        text: "Vraag naar inchecken, timing vanaf de luchthaven of aankomen na een late vlucht.",
      },
      {
        title: "Langere verblijven",
        text: "Deel hoe lang je wilt blijven en wat het verblijf comfortabel maakt.",
      },
    ],
    galleryFilters: {
      all: "Alles",
      pool: "Zwembad",
      inside: "Binnen",
      garden: "Tuin",
      views: "Uitzicht",
    },
    stats: [
      { value: "4", label: "gasten" },
      { value: "2", label: "slaapkamers" },
      { value: "15", label: "min naar luchthaven" },
      { value: "VFT", label: "geregistreerd verblijf" },
    ],
    amenities: [
      {
        title: "Voor 4 gasten",
        text: "Twee comfortabele slaapkamers voor koppels, kleine gezinnen of vrienden.",
        icon: Users,
      },
      {
        title: "Zwembad",
        text: "Zonnige dagen aan het zwembad met bergzicht.",
        icon: Waves,
      },
      {
        title: "Terrassen en tuin",
        text: "Warme buitenruimtes voor ontbijt, lezen, zwemmen en drankjes bij zonsondergang.",
        icon: Sun,
      },
      {
        title: "Airconditioning",
        text: "Koele, comfortabele kamers tijdens Andalusische zomers.",
        icon: AirVent,
      },
      {
        title: "Snelle wifi",
        text: "Blijf verbonden wanneer je dat wilt.",
        icon: Wifi,
      },
      {
        title: "Gratis parkeren",
        text: "Makkelijk aankomen met de auto en eenvoudig op daguitstap.",
        icon: Car,
      },
    ],
    stayDetails: [
      {
        title: "Twee fijne slaapkamers",
        text: "Een praktische indeling voor koppels, kleine gezinnen of vrienden die samen reizen.",
        icon: BedDouble,
      },
      {
        title: "Frisse badkamers",
        text: "Eenvoudige, comfortabele voorzieningen met alles wat gasten verwachten.",
        icon: Bath,
      },
      {
        title: "Terrassen en tuin",
        text: "Warme buitenruimtes voor ontbijt, lezen, zwemmen en drankjes bij zonsondergang.",
        icon: Sun,
      },
      {
        title: "Vergunde verhuur",
        text: `Geregistreerde toeristische accommodatie: ${registrationNumber}.`,
        icon: ShieldCheck,
      },
    ],
    attractions: [
      {
        title: "Malaga",
        text: "Cultuur, markten, musea, winkels, strandwandelingen en avonden in de oude stad.",
        icon: Sparkles,
      },
      {
        title: "Mijas Pueblo",
        text: "Witte straatjes, uitzichtpunten, keramiek en een klassieke Andalusische daguitstap.",
        icon: Mountain,
      },
      {
        title: "Stranden van de Costa del Sol",
        text: "Stranddagen rond Torremolinos, Benalmadena, Fuengirola en verder.",
        icon: Waves,
      },
      {
        title: "Luchthaven Malaga",
        text: "Een korte, makkelijke transfer zodat aankomst en vertrek ontspannen blijven.",
        icon: Plane,
      },
    ],
    rateSeasons: [
      { name: "Lentezon", months: "mrt-mei", nightly: 135 },
      { name: "Zomergloed", months: "jun-sep", nightly: 185 },
      { name: "Gouden rust", months: "okt-feb", nightly: 115 },
    ],
    areaCallout:
      "Alhaurin de la Torre geeft gasten een handige mix: rustige avonden, makkelijke luchthaventransfers en snelle toegang tot de kust.",
    bookingRateSuffix: "vanaf EUR",
    bookingNight: "nacht",
    ownerStory: {
      title: "Placeholder voor eigenaarsverhaal",
      text: "Deze sectie is klaar voor het nieuwe eigenaarsverhaal, een bijgewerkte hostfoto en persoonlijkere welkomsttekst voor de lancering.",
    },
  },
  es: {
    nav: [
      { href: "/stay", label: "Estancia" },
      { href: "/gallery", label: "Galeria" },
      { href: "/area", label: "Zona" },
      { href: "/booking", label: "Reservar" },
      { href: "/contact", label: "Contacto" },
    ],
    book: "Reservar estancia",
    common: {
      brandSubline: "Sol de Malaga",
      explore: "Explorar",
      contact: "Contacto",
      registration: "Registro",
      footerText:
        "Un apartamento vacacional soleado con piscina, rincones de jardin y vistas a la montana en Alhaurin de la Torre, cerca de Malaga.",
    },
    hero: {
      eyebrow: "Apartamento soleado cerca de Malaga",
      title: "Un refugio andaluz con piscina, citricos y vistas a la montana.",
      text: "Casa la Sorpresa invita a desayunos tranquilos, dias de piscina y escapadas faciles por la Costa del Sol.",
      primary: "Ver disponibilidad",
      secondary: "Explorar la casa",
    },
    highlights: [
      "Piscina y terrazas",
      "Hasta 4 personas",
      "Cerca del aeropuerto",
    ],
    sections: {
      stayEyebrow: "Estancia",
      stayTitle: "Todo para una estancia de verano facil",
      stayText:
        "Espacios interiores comodos, rincones soleados y detalles practicos para familias y amigos.",
      galleryEyebrow: "Galeria",
      galleryTitle: "Vistas reales, sol real",
      galleryText:
        "Una vista centrada en fotos de la piscina, interiores, terrazas, jardin y luz de montana.",
      areaEyebrow: "Zona",
      areaTitle: "Cerca de Malaga, playas y pueblos blancos",
      areaText:
        "Usa la casa como una base tranquila y soleada para Malaga ciudad, pueblos costeros, playas y miradores de montana.",
      bookingEyebrow: "Reservar",
      bookingTitle: "Reserva fechas soleadas",
      bookingText:
        "Elige tus fechas para iniciar la reserva directa. En modo demo el formulario valida localmente; con Stripe y Supabase crea una reserva temporal y envia a los huespedes al pago del deposito.",
      contactEyebrow: "Contacto",
      contactTitle: "Preguntanos lo que quieras",
      contactText:
        "Preguntas sobre fechas, estancias largas, accesibilidad, horarios de llegada o el futuro traspaso? Envia un mensaje.",
      detailsEyebrow: "Aun tienes dudas?",
      detailsTitle: "Haz una pregunta antes de reservar",
      detailsText:
        "Si quieres consultar fechas, planes de llegada o una estancia mas larga, envia los detalles y te ayudamos con el siguiente paso.",
    },
    booking: {
      title: "Iniciar reserva",
      intro:
        "Elige fechas y huespedes. Validaremos disponibilidad antes de crear el pago del deposito.",
      arrival: "Llegada",
      departure: "Salida",
      guests: "Huespedes",
      name: "Nombre",
      email: "Email",
      notes: "Notas",
      submit: "Continuar al deposito",
      demo: "Modo demo: anade variables de entorno de Supabase y Stripe para activar depositos reales.",
    },
    contactPrompts: [
      {
        title: "Fechas y disponibilidad",
        text: "Cuentanos tu ventana ideal de llegada y cuanta flexibilidad tienes.",
      },
      {
        title: "Detalles de llegada",
        text: "Pregunta por el check-in, los tiempos desde el aeropuerto o una llegada tarde.",
      },
      {
        title: "Estancias largas",
        text: "Comparte la duracion que tienes en mente y que haria comoda la estancia.",
      },
    ],
    galleryFilters: {
      all: "Todo",
      pool: "Piscina",
      inside: "Interior",
      garden: "Jardin",
      views: "Vistas",
    },
    stats: [
      { value: "4", label: "personas" },
      { value: "2", label: "dormitorios" },
      { value: "15", label: "min al aeropuerto" },
      { value: "VFT", label: "alojamiento registrado" },
    ],
    amenities: [
      {
        title: "Hasta 4 personas",
        text: "Dos dormitorios comodos para parejas, familias pequenas o amigos.",
        icon: Users,
      },
      {
        title: "Piscina",
        text: "Dias soleados junto a la piscina con vistas a la montana.",
        icon: Waves,
      },
      {
        title: "Terrazas y jardin",
        text: "Espacios exteriores calidos para desayunar, leer, nadar y tomar algo al atardecer.",
        icon: Sun,
      },
      {
        title: "Aire acondicionado",
        text: "Habitaciones frescas y comodas durante los veranos andaluces.",
        icon: AirVent,
      },
      {
        title: "Wifi rapido",
        text: "Mantente conectado cuando quieras.",
        icon: Wifi,
      },
      {
        title: "Parking gratuito",
        text: "Llegada facil en coche y excursiones sencillas por la costa.",
        icon: Car,
      },
    ],
    stayDetails: [
      {
        title: "Dos dormitorios comodos",
        text: "Una distribucion practica para parejas, familias pequenas o amigos que viajan juntos.",
        icon: BedDouble,
      },
      {
        title: "Banos frescos",
        text: "Instalaciones sencillas y comodas con lo esencial que esperan los huespedes.",
        icon: Bath,
      },
      {
        title: "Terrazas y jardin",
        text: "Espacios exteriores calidos para desayunar, leer, nadar y tomar algo al atardecer.",
        icon: Sun,
      },
      {
        title: "Alquiler con licencia",
        text: `Alojamiento turistico registrado: ${registrationNumber}.`,
        icon: ShieldCheck,
      },
    ],
    attractions: [
      {
        title: "Malaga",
        text: "Cultura, mercados, museos, compras, paseos por la playa y noches en el centro historico.",
        icon: Sparkles,
      },
      {
        title: "Mijas Pueblo",
        text: "Calles blancas, miradores, ceramica y una excursion andaluza clasica.",
        icon: Mountain,
      },
      {
        title: "Playas de la Costa del Sol",
        text: "Dias de playa en Torremolinos, Benalmadena, Fuengirola y mas alla.",
        icon: Waves,
      },
      {
        title: "Aeropuerto de Malaga",
        text: "Un traslado corto y comodo para que llegada y salida sean relajadas.",
        icon: Plane,
      },
    ],
    rateSeasons: [
      { name: "Sol de primavera", months: "mar-may", nightly: 135 },
      { name: "Brillo de verano", months: "jun-sep", nightly: 185 },
      { name: "Calma dorada", months: "oct-feb", nightly: 115 },
    ],
    areaCallout:
      "Alhaurin de la Torre ofrece una mezcla muy practica: noches tranquilas, traslados faciles al aeropuerto y acceso rapido a la costa.",
    bookingRateSuffix: "desde EUR",
    bookingNight: "noche",
    ownerStory: {
      title: "Texto provisional sobre los propietarios",
      text: "Esta seccion esta lista para la nueva historia de propietarios, una foto actualizada del anfitrion y una bienvenida mas personal antes del lanzamiento.",
    },
  },
};

export const pageMeta: Record<
  Locale,
  Record<string, { title: string; description: string }>
> = {
  en: {
    home: {
      title: "Casa la Sorpresa | Sunny holiday apartment near Malaga",
      description:
        "A sunny 4-person holiday apartment with pool, terraces and mountain views in Alhaurin de la Torre near Malaga.",
    },
    stay: {
      title: "The stay",
      description:
        "Bedrooms, amenities, pool, terraces and practical guest details for Casa la Sorpresa.",
    },
    gallery: {
      title: "Gallery",
      description:
        "See the pool, terrace, garden, two bedrooms and mountain views at Casa la Sorpresa.",
    },
    area: {
      title: "Area",
      description:
        "Explore Malaga, beaches, Mijas, Fuengirola and Alhaurin de la Torre from Casa la Sorpresa.",
    },
    booking: {
      title: "Booking",
      description:
        "Check dates and reserve Casa la Sorpresa with a secure deposit flow.",
    },
    contact: {
      title: "Contact",
      description:
        "Contact Casa la Sorpresa for questions, special stays and booking help.",
    },
  },
  nl: {
    home: {
      title: "Casa la Sorpresa | Zonnig vakantieappartement bij Malaga",
      description:
        "Een zonnig vakantieappartement voor 4 gasten met zwembad, terrassen en bergzicht in Alhaurin de la Torre.",
    },
    stay: {
      title: "Verblijf",
      description: "Kamers, voorzieningen en praktische info.",
    },
    gallery: {
      title: "Galerij",
      description: "Bekijk zwembad, terras, tuin en uitzichten.",
    },
    area: {
      title: "Omgeving",
      description: "Ontdek Malaga, stranden en witte dorpen.",
    },
    booking: {
      title: "Boeken",
      description: "Controleer data en reserveer met aanbetaling.",
    },
    contact: {
      title: "Contact",
      description: "Neem contact op met Casa la Sorpresa.",
    },
  },
  es: {
    home: {
      title: "Casa la Sorpresa | Apartamento soleado cerca de Malaga",
      description:
        "Apartamento vacacional para 4 personas con piscina, terrazas y vistas en Alhaurin de la Torre.",
    },
    stay: {
      title: "Estancia",
      description: "Habitaciones, servicios e informacion practica.",
    },
    gallery: {
      title: "Galeria",
      description: "Piscina, terraza, jardin y vistas.",
    },
    area: {
      title: "Zona",
      description: "Malaga, playas y pueblos blancos desde la casa.",
    },
    booking: {
      title: "Reservar",
      description: "Consulta fechas y reserva con deposito.",
    },
    contact: {
      title: "Contacto",
      description: "Contacta con Casa la Sorpresa.",
    },
  },
};
