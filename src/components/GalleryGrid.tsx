"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { copy, galleryImages } from "@/data/site";
import type { GalleryImage } from "@/data/site";
import type { Locale } from "@/lib/i18n";

const filters = ["all", "pool", "inside", "garden", "views"] as const;

type GalleryGridProps = {
  locale: Locale;
  images?: GalleryImage[];
  gridClassName?: string;
  showFilters?: boolean;
};

export const GalleryGrid = ({
  locale,
  gridClassName = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  images: selectedImages,
  showFilters = true,
}: GalleryGridProps) => {
  const t = copy[locale].galleryFilters;
  const [active, setActive] = useState<(typeof filters)[number]>("all");
  const sourceImages = selectedImages ?? galleryImages;
  const images = useMemo(() => {
    return active === "all"
      ? sourceImages
      : sourceImages.filter((image) => image.category === active);
  }, [active, sourceImages]);

  return (
    <div className="grid gap-6">
      {showFilters ? (
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
      ) : null}
      <div className={gridClassName}>
        {images.map((image) => (
          <div
            key={image.src}
            className="overflow-hidden rounded-[2rem] border-[8px] border-cream shadow-[0_18px_54px_rgba(85,107,47,0.12)]"
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
