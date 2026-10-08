import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free SEO Tools Online",
  description:
    "Use free SEO tools for meta tags, meta descriptions, keyword density, URL slugs and XML sitemap generation.",
  keywords: [
    "SEO tools",
    "free SEO tools",
    "online SEO tools",
    "meta tag generator",
    "meta description generator",
    "keyword density checker",
    "slug generator",
    "sitemap generator",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/seo",
  },
};

export default function SeoToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
