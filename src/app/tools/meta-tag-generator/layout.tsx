import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Meta Tag Generator",
  "Generate SEO meta tags, Open Graph tags and Twitter Card tags online for free.",
  [
    "meta tag generator",
    "SEO meta tags",
    "meta tags generator",
    "Open Graph generator",
    "Twitter card generator",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
