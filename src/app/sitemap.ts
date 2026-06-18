import type { MetadataRoute } from "next";
import { galleryImages, siteUrl } from "@/data/site";
import { locales } from "@/lib/i18n";

const routes = ["", "/stay", "/gallery", "/area", "/booking", "/contact"];

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.75,
      images: route === "" || route === "/gallery" ? galleryImages.map((image) => image.src) : undefined,
    })),
  );
};

export default sitemap;
