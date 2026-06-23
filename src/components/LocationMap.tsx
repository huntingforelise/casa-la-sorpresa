import { contact } from "@/data/site";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contact.mapQuery,
)}&output=embed`;

export const LocationMap = () => (
  <div className="overflow-hidden rounded-[2rem] border-[8px] border-cream bg-cream shadow-[0_18px_54px_rgba(85,107,47,0.16)]">
    <iframe
      title={`Map showing ${contact.location}`}
      src={mapSrc}
      className="h-[22rem] w-full border-0 sm:h-[26rem]"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);
