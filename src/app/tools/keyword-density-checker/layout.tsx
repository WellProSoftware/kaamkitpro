import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Keyword Density Checker",
  "Check keyword frequency and keyword density in your text online for free.",
  [
    "keyword density checker",
    "keyword density tool",
    "SEO keyword checker",
    "keyword frequency checker",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
