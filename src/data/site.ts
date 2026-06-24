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
    fullTitle: string;
    intro: string;
    arrival: string;
    departure: string;
    guests: string;
    name: string;
    email: string;
    notes: string;
    submit: string;
    demo: string;
    quoteTitle: string;
    quoteIntro: string;
    quotePrompt: string;
    minimumStayWarning: string;
    nights: string;
    nightlyRate: string;
    subtotal: string;
    discount: string;
    total: string;
    depositDue: string;
    refundableUntil: string;
    balanceAmount: string;
    balanceDue: string;
    selectedDates: string;
    successTitle: string;
    successText: string;
  };
  bookingPolicies: {
    title: string;
    items: Array<{ label: string; text: string }>;
  };
  bookingSummary: {
    title: string;
    items: Array<{ label: string; text: string }>;
  };
  sharedPoolNote: {
    title: string;
    text: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ question: string; answer: string }>;
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
  areaFacilities: {
    eyebrow: string;
    title: string;
    text: string;
    items: Array<{
      title: string;
      text: string;
      icon: IconComponent;
    }>;
  };
  rateSeasons: Array<{
    name: string;
    months: string;
    nightly: number;
  }>;
  areaCallout: string;
  bookingRateSuffix: string;
  bookingNight: string;
  ownerStory: {
    title: string;
    text: string;
  };
  lagosApartment: {
    title: string;
    text: string;
  };
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.casalasorpresa.com";

export const registrationNumber = "VFT/MA/43321";

export const maxGuests = 4;

export const minimumStayNights = 5;

export const depositRefundableUntilDays = 7;

export const extraGuestNightlyRate = 35;

export const stayDiscounts = [
  { nights: 7, label: "1 week", percent: 5 },
  { nights: 14, label: "2 weeks", percent: 10 },
  { nights: 30, label: "1 month", percent: 20 },
];

export const contact = {
  email: "hello@casalasorpresa.com",
  phone: "+34 000 000 000",
  location: "Pinos de Alhaurin, Malaga, Spain",
  mapQuery:
    "Casa La Sorpresa, Pinos de Alhaurin, Alhaurin de la Torre, Malaga, Spain",
};

export const heroImage = {
  src: "https://static.wixstatic.com/media/e5e27a_cbda9ac16a2b4197bd3f72b1871c4421~mv2.jpg",
  alt: "Wide mountain view from Casa la Sorpresa",
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
  galleryImages[3],
  galleryImages[2],
  galleryImages[9],
  galleryImages[7],
  galleryImages[10],
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
    text: "Fast fibre connection for planning days out, streaming, and the occasional work call.",
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
  { name: "Spring sunshine", months: "Mar-May", nightly: 145 },
  { name: "Summer glow", months: "Jun-Sep", nightly: 185 },
  { name: "Golden calm", months: "Oct-Feb", nightly: 125 },
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
    highlights: [
      "Pool and terraces",
      "Sleeps 4",
      "Fast WiFi",
      "Near Malaga airport",
    ],
    sections: {
      stayEyebrow: "Stay",
      stayTitle: "Everything for an easy stay",
      stayText:
        "Relaxed indoor spaces, sunny outdoor corners and practical comforts for holidays, family time and longer stays.",
      galleryEyebrow: "Gallery",
      galleryTitle: "Real views, real sunshine",
      galleryText:
        "A photo-first view of the pool, interiors, terraces, garden and mountain light.",
      areaEyebrow: "Area",
      areaTitle: "Close to Malaga, beaches and white villages",
      areaText:
        "Our apartment is in the quiet residential area of Pinos de Alhaurin, on the outskirts of lively Alhaurin de la Torre, with easy routes to Malaga, beaches, white villages and the airport.",
      bookingEyebrow: "Booking",
      bookingTitle: "Reserve sunny dates",
      bookingText:
        "Pick your dates to start the direct booking flow and see the practical stay details at a glance.",
      contactEyebrow: "Contact",
      contactTitle: "Ask us anything",
      contactText:
        "Questions about dates, longer stays, accessibility, arrival times or check-in details? Send a note.",
      detailsEyebrow: "Still deciding?",
      detailsTitle: "Ask a quick question before you book",
      detailsText:
        "If you are checking dates, arrival plans or a longer stay, send us the details and we will help you choose the next step.",
    },
    booking: {
      title: "Start a booking",
      fullTitle: "Make a booking",
      intro:
        "Choose dates and guests. Stays start at 5 nights, prices at 2 guests.",
      arrival: "Arrival",
      departure: "Departure",
      guests: "Guests",
      name: "Name",
      email: "Email",
      notes: "Notes",
      submit: "Continue to deposit",
      demo: "Demo mode: add Supabase and Stripe environment variables to activate live deposits.",
      quoteTitle: "Your stay price",
      quoteIntro: "This estimate updates from your dates and guest count.",
      quotePrompt:
        "Choose arrival and departure dates to see the price before you continue.",
      minimumStayWarning:
        "Minimum stay: {minimum} nights. Your selected stay: {selected} nights.",
      nights: "Nights",
      nightlyRate: "Nightly rate",
      subtotal: "Subtotal",
      discount: "Stay discount",
      total: "Total stay",
      depositDue: "Deposit due today",
      refundableUntil: "Deposit refundable until",
      balanceAmount: "Balance due 7 days before arrival",
      balanceDue: "After this date, paid amounts are no longer refundable",
      selectedDates: "Selected dates",
      successTitle: "Your deposit was received",
      successText:
        "Thank you. Your booking request is confirmed, and a confirmation email is on its way.",
    },
    bookingPolicies: {
      title: "Booking notes",
      items: [
        {
          label: "Minimum stay",
          text: "Casa la Sorpresa has a 5-night minimum stay.",
        },
        {
          label: "Check-in/out",
          text: "Check-in is from 3 p.m. and check-out is by 11 a.m. Different times can be discussed.",
        },
        {
          label: "Payment",
          text: "A 50% deposit is due at the time of booking. The remaining 50% is due 7 days before arrival.",
        },
        {
          label: "Extra guests",
          text: `Seasonal rates are for up to 2 guests. Guests 3 and 4 aged over 12 are charged EUR ${extraGuestNightlyRate} per person per night.`,
        },
        {
          label: "Longer stays",
          text: "Longer stays receive automatic discounts: 1 week 5%, 2 weeks 10%, and 1 month 20%.",
        },
        {
          label: "Cancellation",
          text: "Cancellations must be made in writing or by email. The deposit is refundable until 7 days before arrival. From 7 days before arrival, paid amounts are no longer refundable; on arrival day or no-show we charge 100%.",
        },
      ],
    },
    bookingSummary: {
      title: "Rate information",
      items: [
        {
          label: "Minimum stay",
          text: "5 nights.",
        },
        {
          label: "Discounts",
          text: "1 week 5%, 2 weeks 10%, 1 month 20%.",
        },
        {
          label: "Extra guests",
          text: `Guests 3 and 4 aged over 12: EUR ${extraGuestNightlyRate} per person per night.`,
        },
      ],
    },
    sharedPoolNote: {
      title: "A note about the pool",
      text: "The pool is shared with the owners, who will always do their best to respect guests' personal space.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Good to know",
      intro: "A few practical details guests often want clear before booking.",
      items: [
        {
          question: "Is the pool private?",
          answer:
            "The pool is shared with the owners. They will always do their best to respect guests' personal space, but it is a shared outdoor space.",
        },
        {
          question: "What time are check-in and check-out?",
          answer:
            "Check-in is from 3 p.m. and check-out is by 11 a.m. Different times can be discussed with us.",
        },
        {
          question:
            "Is the apartment suitable for babies, toddlers or wheelchair users?",
          answer:
            "Baby and toddler facilities are available on request. The apartment is not wheelchair accessible.",
        },
        {
          question: "Are there house rules?",
          answer:
            "Yes. Please do not cause noise disturbance after 11 p.m., dispose of waste in the correct containers, do not smoke inside, and do not let third parties use the apartment without permission.",
        },
        {
          question: "Is the apartment set up to work from here?",
          answer:
            "Yes. The apartment has very fast fibre WiFi and comfortable indoor and outdoor spots, so guests can work from here when they need to.",
        },
        {
          question: "Is there noise from airplanes?",
          answer:
            "No. Casa la Sorpresa is close to Malaga Airport for easy arrivals, but it is not on the flight route.",
        },
        {
          question: "Are there supermarkets nearby?",
          answer:
            "Yes. There is a brand-new Lidl around 2 minutes away by car, and more supermarkets and shops in the centre of Alhaurin de la Torre about 5 minutes away.",
        },
      ],
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
    areaFacilities: {
      eyebrow: "Facilities",
      title: "Everyday essentials nearby",
      text: "Quiet residential surroundings, simple groceries and town amenities are all close enough to keep arrival days and longer stays easy.",
      items: [
        {
          title: "Brand-new Lidl",
          text: "A handy new Lidl supermarket is around 2 minutes away by car for quick groceries and arrival-day supplies.",
          icon: Car,
        },
        {
          title: "Town centre",
          text: "The centre of Alhaurin de la Torre is about 5 minutes away by car for groceries, shops, Spanish restaurants, coffee bars and cafes.",
          icon: Sparkles,
        },
        {
          title: "Easy by car",
          text: "Free parking at the apartment makes supermarket runs, beach days and day trips straightforward.",
          icon: Car,
        },
      ],
    },
    rateSeasons,
    areaCallout:
      "Pinos de Alhaurin gives guests the useful mix: calm residential evenings, practical facilities nearby, easy airport transfers and plenty of day-trip options.",
    bookingRateSuffix: "from EUR",
    bookingNight: "night",
    ownerStory: {
      title: "Meet your hosts",
      text: "We are Elise and Julien, a Belgian couple in our thirties who met in Sydney, Australia. These days, life with our one-year-old son Noah is a mix of remote work, little family adventures, exploring new corners of Andalusia and making the most of days under the sun. Casa la Sorpresa is our place to share that slower Andalusian rhythm with guests.",
    },
    lagosApartment: {
      title: "Also in Lagos",
      text: "We also have a 2-bed, 2-bath apartment in Lagos, Portugal available for rent. More details and a separate website are coming soon.",
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
      "Snelle wifi",
      "Dicht bij Malaga airport",
    ],
    sections: {
      stayEyebrow: "Verblijf",
      stayTitle: "Alles voor een ontspannen verblijf",
      stayText:
        "Gezellige binnenruimtes, zonnige buitenhoekjes en praktisch comfort voor vakantie, familietijd en langere verblijven.",
      galleryEyebrow: "Galerij",
      galleryTitle: "Echte uitzichten, echte zon",
      galleryText:
        "Een fotogerichte blik op het zwembad, interieur, de terrassen, tuin en het berglicht.",
      areaEyebrow: "Omgeving",
      areaTitle: "Dicht bij Malaga, stranden en witte dorpen",
      areaText:
        "Het appartement ligt in de rustige residentiele wijk Pinos de Alhaurin, net buiten levendig Alhaurin de la Torre, met makkelijke routes naar Malaga, stranden, witte dorpen en de luchthaven.",
      bookingEyebrow: "Boeken",
      bookingTitle: "Reserveer zonnige data",
      bookingText:
        "Kies je data om de directe boeking te starten en bekijk de praktische verblijfsdetails in een oogopslag.",
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
      fullTitle: "Maak een boeking",
      intro:
        "Kies data en gasten. Verblijven starten vanaf 5 nachten, prijzen op basis van 2 gasten.",
      arrival: "Aankomst",
      departure: "Vertrek",
      guests: "Gasten",
      name: "Naam",
      email: "E-mail",
      notes: "Opmerkingen",
      submit: "Ga naar aanbetaling",
      demo: "Demomodus: voeg Supabase- en Stripe-omgevingsvariabelen toe voor live betalingen.",
      quoteTitle: "Prijs van je verblijf",
      quoteIntro: "Deze schatting past zich aan je data en aantal gasten aan.",
      quotePrompt:
        "Kies aankomst- en vertrekdata om de prijs te zien voor je doorgaat.",
      minimumStayWarning:
        "Minimumverblijf: {minimum} nachten. Je gekozen verblijf: {selected} nachten.",
      nights: "Nachten",
      nightlyRate: "Prijs per nacht",
      subtotal: "Subtotaal",
      discount: "Verblijfskorting",
      total: "Totaal verblijf",
      depositDue: "Aanbetaling vandaag",
      refundableUntil: "Aanbetaling terugbetaalbaar tot",
      balanceAmount: "Saldo verschuldigd 7 dagen voor aankomst",
      balanceDue:
        "Na deze datum zijn betaalde bedragen niet meer terugbetaalbaar",
      selectedDates: "Gekozen data",
      successTitle: "Je aanbetaling is ontvangen",
      successText:
        "Dank je. Je boekingsaanvraag is bevestigd en er is een bevestigingsmail onderweg.",
    },
    bookingPolicies: {
      title: "Boekingsinfo",
      items: [
        {
          label: "Minimumverblijf",
          text: "Casa la Sorpresa heeft een minimumverblijf van 5 nachten.",
        },
        {
          label: "In- en uitchecken",
          text: "Inchecken kan vanaf 15.00 uur en uitchecken kan tot 11.00 uur. Andere tijden kunnen in overleg.",
        },
        {
          label: "Betaling",
          text: "Een aanbetaling van 50% is verschuldigd op het moment van boeken. De resterende 50% is 7 dagen voor aankomst verschuldigd.",
        },
        {
          label: "Extra gasten",
          text: `Seizoenstarieven gelden tot 2 gasten. Gast 3 en 4 ouder dan 12 jaar betalen EUR ${extraGuestNightlyRate} per persoon per nacht.`,
        },
        {
          label: "Langere verblijven",
          text: "Langere verblijven krijgen automatisch korting: 1 week 5%, 2 weken 10% en 1 maand 20%.",
        },
        {
          label: "Annulering",
          text: "Annuleren kan alleen schriftelijk of per e-mail. De aanbetaling is terugbetaalbaar tot 7 dagen voor aankomst. Vanaf 7 dagen voor aankomst zijn betaalde bedragen niet meer terugbetaalbaar; op de aankomstdag of bij no-show rekenen we 100%.",
        },
      ],
    },
    bookingSummary: {
      title: "Tarieven",
      items: [
        {
          label: "Minimumverblijf",
          text: "5 nachten.",
        },
        {
          label: "Kortingen",
          text: "1 week 5%, 2 weken 10%, 1 maand 20%.",
        },
        {
          label: "Extra gasten",
          text: `Gast 3 en 4 ouder dan 12 jaar: EUR ${extraGuestNightlyRate} per persoon per nacht.`,
        },
      ],
    },
    sharedPoolNote: {
      title: "Een nota over het zwembad",
      text: "Het zwembad wordt gedeeld met de eigenaars, die de persoonlijke ruimte van gasten altijd zo veel mogelijk respecteren.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Goed om te weten",
      intro:
        "Een paar praktische details die gasten vaak graag duidelijk hebben voor ze boeken.",
      items: [
        {
          question: "Is het zwembad prive?",
          answer:
            "Het zwembad wordt gedeeld met de eigenaars. Zij respecteren de persoonlijke ruimte van gasten zo veel mogelijk, maar het blijft een gedeelde buitenruimte.",
        },
        {
          question: "Wat is het minimumverblijf?",
          answer: "Het minimumverblijf is 5 nachten.",
        },
        {
          question: "Hoe werken de tarieven?",
          answer: `Seizoenstarieven gelden tot 2 gasten. Gast 3 en 4 ouder dan 12 jaar betalen EUR ${extraGuestNightlyRate} per persoon per nacht. De maximale bezetting is 4 gasten.`,
        },
        {
          question: "Wat zijn de in- en uitchecktijden?",
          answer:
            "Inchecken kan vanaf 15.00 uur en uitchecken kan tot 11.00 uur. Andere tijden kunnen met ons besproken worden.",
        },
        {
          question:
            "Is het appartement geschikt voor baby's, peuters of rolstoelgebruikers?",
          answer:
            "Voorzieningen voor baby's en peuters zijn beschikbaar op aanvraag. Het appartement is niet rolstoeltoegankelijk.",
        },
        {
          question: "Zijn er huisregels?",
          answer:
            "Ja. Veroorzaak geen geluidsoverlast na 23.00 uur, deponeer afval in de juiste containers, rook niet binnen en laat derden het appartement niet gebruiken zonder toestemming.",
        },
        {
          question: "Is het appartement geschikt om van hieruit te werken?",
          answer:
            "Ja. Het appartement heeft erg snelle glasvezelwifi en comfortabele plekken binnen en buiten, zodat gasten van hieruit kunnen werken wanneer dat nodig is.",
        },
        {
          question: "Is er lawaai van vliegtuigen?",
          answer:
            "Nee. Casa la Sorpresa ligt dicht bij de luchthaven van Malaga voor makkelijke aankomst, maar niet op de vliegroute.",
        },
        {
          question: "Zijn er supermarkten in de buurt?",
          answer:
            "Ja. Er is een gloednieuwe Lidl op ongeveer 2 minuten rijden, en in het centrum van Alhaurin de la Torre vind je meer supermarkten en winkels op ongeveer 5 minuten rijden.",
        },
        {
          question: "Kunnen we iets vragen voor we boeken?",
          answer:
            "Ja. Stuur je data, groepsgrootte en eventuele aankomstinfo, dan helpen we je met de beste volgende stap.",
        },
      ],
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
        text: "Een snelle glasvezelverbinding voor uitstappen plannen, streamen en af en toe een werkgesprek.",
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
    areaFacilities: {
      eyebrow: "Faciliteiten",
      title: "Dagelijkse benodigdheden dichtbij",
      text: "De rustige residentiele omgeving combineert makkelijk met boodschappen en voorzieningen dichtbij, handig bij aankomst en voor langere verblijven.",
      items: [
        {
          title: "Gloednieuwe Lidl",
          text: "Een handige nieuwe Lidl-supermarkt ligt op ongeveer 2 minuten rijden voor snelle boodschappen en aankopen bij aankomst.",
          icon: Car,
        },
        {
          title: "Stadscentrum",
          text: "Het centrum van Alhaurin de la Torre ligt op ongeveer 5 minuten rijden voor boodschappen, winkels, Spaanse restaurants, koffiebars en cafes.",
          icon: Sparkles,
        },
        {
          title: "Makkelijk met de auto",
          text: "Gratis parkeren aan het appartement maakt supermarktbezoekjes, stranddagen en daguitstappen eenvoudig.",
          icon: Car,
        },
      ],
    },
    rateSeasons: [
      { name: "Lentezon", months: "mrt-mei", nightly: 145 },
      { name: "Zomergloed", months: "jun-sep", nightly: 185 },
      { name: "Gouden rust", months: "okt-feb", nightly: 125 },
    ],
    areaCallout:
      "Pinos de Alhaurin geeft gasten een handige mix: rustige avonden in een residentiele buurt, praktische voorzieningen vlakbij, makkelijke luchthaventransfers en veel opties voor daguitstappen.",
    bookingRateSuffix: "vanaf EUR",
    bookingNight: "nacht",
    ownerStory: {
      title: "Maak kennis met je hosts",
      text: "Wij zijn Elise en Julien, een Belgisch koppel in de dertig dat elkaar leerde kennen in Sydney, Australie. Vandaag is het leven met onze eenjarige zoon Noah een mix van remote werken, kleine familieavonturen, nieuwe plekken in Andalusie ontdekken en genieten van dagen onder de zon. Casa la Sorpresa is onze plek om dat tragere Andalusische ritme met gasten te delen.",
    },
    lagosApartment: {
      title: "Ook in Lagos",
      text: "We hebben ook een appartement met 2 slaapkamers en 2 badkamers in Lagos, Portugal. Meer details en een aparte website volgen binnenkort.",
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
      "Wifi rapido",
      "Cerca del aeropuerto",
    ],
    sections: {
      stayEyebrow: "Estancia",
      stayTitle: "Todo para una estancia facil",
      stayText:
        "Espacios interiores comodos, rincones soleados y detalles practicos para vacaciones, tiempo en familia y estancias mas largas.",
      galleryEyebrow: "Galeria",
      galleryTitle: "Vistas reales, sol real",
      galleryText:
        "Una vista centrada en fotos de la piscina, interiores, terrazas, jardin y luz de montana.",
      areaEyebrow: "Zona",
      areaTitle: "Cerca de Malaga, playas y pueblos blancos",
      areaText:
        "El apartamento esta en la tranquila zona residencial de Pinos de Alhaurin, a las afueras del animado Alhaurin de la Torre, con rutas faciles a Malaga, playas, pueblos blancos y el aeropuerto.",
      bookingEyebrow: "Reservar",
      bookingTitle: "Reserva fechas soleadas",
      bookingText:
        "Elige tus fechas para iniciar la reserva directa y consulta los detalles practicos de la estancia de un vistazo.",
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
      fullTitle: "Haz una reserva",
      intro:
        "Elige fechas y huespedes. Las estancias empiezan en 5 noches, precios para 2 huespedes.",
      arrival: "Llegada",
      departure: "Salida",
      guests: "Huespedes",
      name: "Nombre",
      email: "Email",
      notes: "Notas",
      submit: "Continuar al deposito",
      demo: "Modo demo: anade variables de entorno de Supabase y Stripe para activar depositos reales.",
      quoteTitle: "Precio de tu estancia",
      quoteIntro: "Esta estimacion se actualiza con tus fechas y huespedes.",
      quotePrompt:
        "Elige llegada y salida para ver el precio antes de continuar.",
      minimumStayWarning:
        "Estancia minima: {minimum} noches. Estancia elegida: {selected} noches.",
      nights: "Noches",
      nightlyRate: "Precio por noche",
      subtotal: "Subtotal",
      discount: "Descuento por estancia",
      total: "Total estancia",
      depositDue: "Deposito hoy",
      refundableUntil: "Deposito reembolsable hasta",
      balanceAmount: "Saldo 7 dias antes de la llegada",
      balanceDue:
        "Despues de esta fecha, los importes pagados ya no son reembolsables",
      selectedDates: "Fechas elegidas",
      successTitle: "Hemos recibido tu deposito",
      successText:
        "Gracias. Tu solicitud de reserva esta confirmada y te enviaremos un email de confirmacion.",
    },
    bookingPolicies: {
      title: "Notas de reserva",
      items: [
        {
          label: "Estancia minima",
          text: "Casa la Sorpresa tiene una estancia minima de 5 noches.",
        },
        {
          label: "Check-in/out",
          text: "El check-in es desde las 15:00 y el check-out hasta las 11:00. Otros horarios se pueden consultar.",
        },
        {
          label: "Pago",
          text: "Se debe pagar un deposito del 50% en el momento de la reserva. El 50% restante vence 7 dias antes de la llegada.",
        },
        {
          label: "Huespedes extra",
          text: `Las tarifas de temporada son para hasta 2 huespedes. Los huespedes 3 y 4 mayores de 12 anos pagan EUR ${extraGuestNightlyRate} por persona y noche.`,
        },
        {
          label: "Estancias largas",
          text: "Las estancias largas tienen descuentos automaticos: 1 semana 5%, 2 semanas 10% y 1 mes 20%.",
        },
        {
          label: "Cancelacion",
          text: "Las cancelaciones deben hacerse por escrito o por email. El deposito es reembolsable hasta 7 dias antes de la llegada. Desde 7 dias antes de la llegada, los importes pagados ya no son reembolsables; el dia de llegada o no-show cobramos el 100%.",
        },
      ],
    },
    bookingSummary: {
      title: "Tarifas",
      items: [
        {
          label: "Estancia minima",
          text: "5 noches.",
        },
        {
          label: "Descuentos",
          text: "1 semana 5%, 2 semanas 10%, 1 mes 20%.",
        },
        {
          label: "Huespedes extra",
          text: `Huespedes 3 y 4 mayores de 12 anos: EUR ${extraGuestNightlyRate} por persona y noche.`,
        },
      ],
    },
    sharedPoolNote: {
      title: "Una nota sobre la piscina",
      text: "La piscina se comparte con los propietarios, que siempre intentaran respetar al maximo el espacio personal de los huespedes.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Conviene saber",
      intro:
        "Algunos detalles practicos que los huespedes suelen querer claros antes de reservar.",
      items: [
        {
          question: "La piscina es privada?",
          answer:
            "La piscina se comparte con los propietarios. Ellos intentaran respetar al maximo el espacio personal de los huespedes, pero es una zona exterior compartida.",
        },
        {
          question: "Cual es la estancia minima?",
          answer: "La estancia minima es de 5 noches.",
        },
        {
          question: "Como funcionan las tarifas?",
          answer: `Las tarifas de temporada son para hasta 2 huespedes. Los huespedes 3 y 4 mayores de 12 anos pagan EUR ${extraGuestNightlyRate} por persona y noche. La ocupacion maxima es de 4 huespedes.`,
        },
        {
          question: "Cuales son los horarios de check-in y check-out?",
          answer:
            "El check-in es desde las 15:00 y el check-out hasta las 11:00. Otros horarios se pueden consultar con nosotros.",
        },
        {
          question:
            "El apartamento es apto para bebes, ninos pequenos o usuarios de silla de ruedas?",
          answer:
            "Hay instalaciones para bebes y ninos pequenos disponibles bajo peticion. El apartamento no es accesible para sillas de ruedas.",
        },
        {
          question: "Hay normas de la casa?",
          answer:
            "Si. No causes molestias por ruido despues de las 23:00, deposita la basura en los contenedores adecuados, no fumes dentro y no permitas que terceros usen el apartamento sin permiso.",
        },
        {
          question: "El apartamento esta preparado para trabajar desde aqui?",
          answer:
            "Si. El apartamento tiene wifi de fibra muy rapido y espacios comodos dentro y fuera, para que los huespedes puedan trabajar desde aqui cuando lo necesiten.",
        },
        {
          question: "Hay ruido de aviones?",
          answer:
            "No. Casa la Sorpresa esta cerca del aeropuerto de Malaga para llegar facilmente, pero no esta en la ruta de vuelo.",
        },
        {
          question: "Hay supermercados cerca?",
          answer:
            "Si. Hay un Lidl nuevo a unos 2 minutos en coche, y mas supermercados y tiendas en el centro de Alhaurin de la Torre a unos 5 minutos.",
        },
        {
          question: "Podemos hacer una pregunta antes de reservar?",
          answer:
            "Si. Envia tus fechas, numero de personas y cualquier detalle de llegada, y te ayudamos con el siguiente paso.",
        },
      ],
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
        text: "Conexion rapida de fibra para planear excursiones, ver contenido y hacer alguna llamada de trabajo.",
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
    areaFacilities: {
      eyebrow: "Servicios",
      title: "Lo esencial del dia a dia cerca",
      text: "El entorno residencial tranquilo se combina con compras y servicios cercanos, comodo al llegar y para estancias mas largas.",
      items: [
        {
          title: "Lidl nuevo",
          text: "Un Lidl nuevo y practico esta a unos 2 minutos en coche para compras rapidas y lo necesario al llegar.",
          icon: Car,
        },
        {
          title: "Centro del pueblo",
          text: "El centro de Alhaurin de la Torre esta a unos 5 minutos en coche para supermercados, tiendas, restaurantes espanoles, cafeterias y cafes.",
          icon: Sparkles,
        },
        {
          title: "Facil en coche",
          text: "El parking gratuito en el apartamento hace sencillas las compras, los dias de playa y las excursiones.",
          icon: Car,
        },
      ],
    },
    rateSeasons: [
      { name: "Sol de primavera", months: "mar-may", nightly: 145 },
      { name: "Brillo de verano", months: "jun-sep", nightly: 185 },
      { name: "Calma dorada", months: "oct-feb", nightly: 125 },
    ],
    areaCallout:
      "Pinos de Alhaurin ofrece una mezcla muy practica: noches tranquilas en una zona residencial, servicios cercanos, traslados faciles al aeropuerto y muchas opciones de excursiones.",
    bookingRateSuffix: "desde EUR",
    bookingNight: "noche",
    ownerStory: {
      title: "Conoce a tus anfitriones",
      text: "Somos Elise y Julien, una pareja belga de treinta y tantos que se conocio en Sydney, Australia. Hoy, la vida con nuestro hijo Noah, de un ano, mezcla trabajo en remoto, pequenas aventuras en familia, descubrir nuevos rincones de Andalucia y disfrutar de dias bajo el sol. Casa la Sorpresa es nuestro lugar para compartir ese ritmo andaluz mas pausado con los huespedes.",
    },
    lagosApartment: {
      title: "Tambien en Lagos",
      text: "Tambien tenemos un apartamento de 2 dormitorios y 2 banos en Lagos, Portugal. Pronto compartiremos mas detalles y una web aparte.",
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
        "A sunny 4-person holiday apartment with pool, terraces, fast WiFi and mountain views in Alhaurin de la Torre near Malaga.",
    },
    stay: {
      title: "The stay",
      description:
        "Bedrooms, amenities, pool, terraces, WiFi and practical guest details for Casa la Sorpresa.",
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
        "Een zonnig vakantieappartement voor 4 gasten met zwembad, terrassen, snelle wifi en bergzicht in Alhaurin de la Torre.",
    },
    stay: {
      title: "Verblijf",
      description: "Kamers, voorzieningen, wifi en praktische info.",
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
        "Apartamento vacacional para 4 personas con piscina, terrazas, wifi rapido y vistas en Alhaurin de la Torre.",
    },
    stay: {
      title: "Estancia",
      description: "Habitaciones, servicios, wifi e informacion practica.",
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
