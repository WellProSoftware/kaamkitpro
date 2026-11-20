import type { MetadataRoute } from "next";

// Staging must never be indexed or advertise the production sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
