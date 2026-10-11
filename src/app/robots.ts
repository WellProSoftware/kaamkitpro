import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isStagingBuild =
    process.env.KAAMKITPRO_STAGING === "true" ||
    process.env.VERCEL_ENV === "preview";

  if (isStagingBuild) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://kaamkitpro.com/sitemap.xml",
  };
}
