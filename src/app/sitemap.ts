import type { MetadataRoute } from "next";

const baseUrl = "https://kaamkitpro.com";

const toolRoutes = [
  "/tools/age-calculator", "/tools/base64", "/tools/bmi-calculator", "/tools/calculators",
  "/tools/case-converter", "/tools/character-counter", "/tools/color-converter", "/tools/css-formatter",
  "/tools/developer", "/tools/emi-calculator", "/tools/gst-calculator", "/tools/hash-generator",
  "/tools/hashtag-generator", "/tools/html-formatter", "/tools/image", "/tools/image-brightness",
  "/tools/image-compressor", "/tools/image-converter", "/tools/image-cropper", "/tools/image-flip",
  "/tools/image-grayscale", "/tools/image-resizer", "/tools/image-rotate", "/tools/instagram-caption-generator",
  "/tools/jpg-to-pdf", "/tools/js-formatter", "/tools/json-formatter", "/tools/keyword-density-checker",
  "/tools/meta-description-generator", "/tools/meta-tag-generator", "/tools/og-preview-generator",
  "/tools/password-generator", "/tools/pdf", "/tools/pdf-compressor", "/tools/pdf-extract-text",
  "/tools/pdf-merge", "/tools/pdf-metadata", "/tools/pdf-page-number", "/tools/pdf-protect",
  "/tools/pdf-rotate", "/tools/pdf-split", "/tools/pdf-to-jpg", "/tools/pdf-watermark",
  "/tools/percentage-calculator", "/tools/qr-code-generator", "/tools/seo", "/tools/sip-calculator",
  "/tools/slug-generator", "/tools/sitemap-generator", "/tools/social", "/tools/text",
  "/tools/timestamp-converter", "/tools/url-encoder-decoder", "/tools/uuid-generator",
  "/tools/word-counter", "/tools/youtube-description-generator", "/tools/youtube-title-generator",
  "/tools/remove-extra-spaces", "/tools/line-sorter", "/tools/remove-duplicate-lines", "/tools/csv-to-json", "/tools/json-to-csv", "/tools/text-diff-checker",
];

const staticRoutes = [
  "", "/about", "/contact", "/advertise", "/pricing", "/disclaimer", "/guides", "/guides/image-compression",
  "/guides/pdf-merge", "/guides/qr-code", "/guides/pdf-compression", "/guides/gst-calculator", "/guides/json-formatting", "/privacy-policy", "/terms", "/tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
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
