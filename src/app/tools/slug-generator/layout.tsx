import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "SEO Slug Generator",
  "Generate clean, readable and SEO-friendly URL slugs from titles and text.",
  [
    "slug generator",
    "SEO slug generator",
    "URL slug generator",
    "SEO friendly URL",
    "permalink generator",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
