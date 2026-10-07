import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "HTML Formatter",
  "Format and beautify HTML code online for free with a simple browser-based HTML formatter.",
  [
    "HTML formatter",
    "HTML beautifier",
    "format HTML online",
    "HTML code formatter",
    "HTML beautifier online",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
