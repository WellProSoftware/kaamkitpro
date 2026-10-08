import type { MetadataRoute } from "next";

const baseUrl = "https://kaamkitpro.com";

const toolRoutes = [
  "/tools/qr-code-generator",
  "/tools/word-counter",
  "/tools/character-counter",
  "/tools/case-converter",
  "/tools/remove-extra-spaces",
  "/tools/password-generator",
  "/tools/json-formatter",
  "/tools/base64",
  "/tools/uuid-generator",
  "/tools/timestamp-converter",
  "/tools/percentage-calculator",
  "/tools/gst-calculator",
  "/tools/emi-calculator",
  "/tools/age-calculator",
  "/tools/bmi-calculator",
  "/tools/sip-calculator",

  "/tools/pdf-merge",
  "/tools/pdf-split",
  "/tools/pdf-to-jpg",
  "/tools/jpg-to-pdf",
  "/tools/pdf-compressor",

  "/tools/image-compressor",
  "/tools/image-resizer",
  "/tools/image-converter",
  "/tools/image-cropper",

  "/tools/meta-tag-generator",
  "/tools/meta-description-generator",
  "/tools/keyword-density-checker",
  "/tools/slug-generator",
  "/tools/sitemap-generator",

  "/tools/hashtag-generator",
  "/tools/youtube-title-generator",
  "/tools/youtube-description-generator",
  "/tools/instagram-caption-generator",
  "/tools/og-preview-generator",

  "/tools/html-formatter",
  "/tools/css-formatter",
  "/tools/js-formatter",
  "/tools/url-encoder-decoder",
  "/tools/hash-generator",
  "/tools/color-converter",
  "/tools/pdf",
  "/tools/image",
  "/tools/calculators",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  "/guides",
  "/guides/pdf-merge",
  "/guides/image-compression",
  "/guides/qr-code",
  ];

  return [...staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  })), ...toolRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))];
}
