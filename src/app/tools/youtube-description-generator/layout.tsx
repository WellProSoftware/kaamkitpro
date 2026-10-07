import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "YouTube Description Generator",
  "Generate YouTube video descriptions with useful SEO-friendly content and hashtags.",
  [
    "YouTube description generator",
    "video description generator",
    "YouTube SEO description",
    "YouTube content generator",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
