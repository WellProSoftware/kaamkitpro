import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Meta Description Generator",
  "Generate SEO-friendly meta descriptions online for free.",
  [
    "meta description generator",
    "SEO description generator",
    "meta description tool",
    "SEO meta description",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
