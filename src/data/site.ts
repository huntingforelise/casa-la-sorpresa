import {
  AirVent,
  Bath,
  BedDouble,
  Car,
  Coffee,
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
    alt: "Casa la Sorpresa evening view",
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
    src: "https://static.wixstatic.com/media/e5e27a_b3f5e52eb31d4878b2ecdff0baa4f70c~mv2.jpeg",
    alt: "Orange tree garden at Casa la Sorpresa",
    category: "garden",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_d9133b3689434f1faaa6cc885b3f48e0~mv2.jpg",
    alt: "Living room at Casa la Sorpresa",
    category: "inside",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_ddc64786915e436e9330bd9f0396bfc6~mv2.jpeg",
    alt: "Bathroom at Casa la Sorpresa",
    category: "inside",
  },
  {
    src: "https://static.wixstatic.com/media/e5e27a_543480e6cfda462b9e9eb38938c88cb5~mv2.jpg",
    alt: "Sunrise view from Casa la Sorpresa",
    category: "views",
  },
];

export type GalleryCategory = (typeof galleryImages)[number]["category"];

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
  {
    title: "Kitchen comfort",
    text: "Coffee, relaxed breakfasts, and simple meals at home.",
    icon: Coffee,
  },
];

export const stats = [
  { value: "4", label: "guests" },
  { value: "2", label: "bedrooms" },
  { value: "15", label: "min to airport" },
  { value: "VFT", label: "registered stay" },
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
      detailsEyebrow: "Details",
      detailsTitle: "Built for real holiday decisions",
      detailsText:
        "The design keeps joyful summer energy, while the information stays practical and clear.",
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
      detailsEyebrow: "Details",
      detailsTitle: "Gemaakt voor echte vakantievragen",
      detailsText:
        "Het ontwerp houdt de zonnige zomersfeer vast, terwijl de informatie praktisch en duidelijk blijft.",
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
      {
        title: "Comfortabele keuken",
        text: "Koffie, ontspannen ontbijten en eenvoudige maaltijden thuis.",
        icon: Coffee,
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
      detailsEyebrow: "Detalles",
      detailsTitle: "Pensada para decidir vacaciones reales",
      detailsText:
        "El diseno mantiene una energia alegre de verano, mientras la informacion sigue siendo practica y clara.",
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
      {
        title: "Cocina practica",
        text: "Cafe, desayunos tranquilos y comidas sencillas en casa.",
        icon: Coffee,
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
