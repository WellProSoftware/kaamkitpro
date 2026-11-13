import type { MetadataRoute } from "next";

const baseUrl = "https://kaamkitpro.com";

const toolRoutes = [
  "/tools/age-calculator", "/tools/bmi-calculator", "/tools/calculators",
  "/tools/gst-calculator", "/tools/image", "/tools/image-brightness",
  "/tools/image-compressor", "/tools/image-converter", "/tools/image-cropper", "/tools/image-flip",
  "/tools/image-grayscale", "/tools/image-resizer", "/tools/image-rotate", "/tools/item-master-matcher", "/tools/excel-combiner",
  "/tools/jpg-to-pdf", "/tools/pdf-to-excel", "/tools/pdf-to-word", "/tools/jpg-to-excel", "/tools/jpg-to-word", "/tools/pdf", "/tools/pdf-compressor", "/tools/pdf-extract-text",
  "/tools/pdf-merge", "/tools/pdf-metadata", "/tools/pdf-page-number",
  "/tools/pdf-rotate", "/tools/pdf-split", "/tools/pdf-to-jpg", "/tools/pdf-watermark",
  "/tools/sip-calculator",
];

const staticRoutes = [
  "", "/about", "/contact", "/advertise", "/pricing", "/disclaimer", "/guides", "/guides/image-compression",
  "/guides/pdf-merge", "/guides/pdf-compression", "/guides/gst-calculator", "/privacy-policy", "/terms", "/tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const isStagingBuild =
    process.env.KAAMKITPRO_STAGING === "true" ||
    process.env.VERCEL_ENV === "preview";

  // Do not publish production URLs from a publicly reachable staging sitemap.
  if (isStagingBuild) return [];

  return [
    ...staticRoutes.map((route) => ({
      url: baseUrl + route,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...toolRoutes.map((route) => ({
      url: baseUrl + route,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
