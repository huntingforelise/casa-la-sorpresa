"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { copy, galleryImages } from "@/data/site";
import type { Locale } from "@/lib/i18n";

const filters = ["all", "pool", "inside", "garden", "views"] as const;

export const GalleryGrid = ({ locale }: { locale: Locale }) => {
  const t = copy[locale].galleryFilters;
  const [active, setActive] = useState<(typeof filters)[number]>("all");
  const images = useMemo(() => {
    return active === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === active);
  }, [active]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-full px-4 py-2 text-sm font-black capitalize transition ${
              active === filter
                ? "bg-citrus text-cream"
                : "border border-border bg-cream text-foreground hover:border-pool"
            }`}
          >
            {t[filter]}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`overflow-hidden border-[8px] border-cream shadow-[0_18px_54px_rgba(85,107,47,0.12)] ${
              index % 3 === 0 ? "rounded-[2rem]" : "arch-mask"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={700}
              className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
