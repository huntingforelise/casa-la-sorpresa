import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
};

export default robots;
