import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "JavaScript Formatter",
  "Format and beautify JavaScript code online for free with a browser-based formatter.",
  [
    "JavaScript formatter",
    "JavaScript beautifier",
    "format JavaScript online",
    "JS formatter",
    "JS beautifier",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
