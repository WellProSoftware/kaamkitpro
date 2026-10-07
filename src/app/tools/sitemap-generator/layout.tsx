import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "XML Sitemap Generator",
  "Generate XML sitemaps for websites online for free. Add URLs and download your sitemap.xml file.",
  [
    "sitemap generator",
    "XML sitemap generator",
    "sitemap.xml generator",
    "SEO sitemap tool",
    "website sitemap generator",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
