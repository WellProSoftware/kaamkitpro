import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "CSS Formatter",
  "Format and beautify CSS code online for free with a simple CSS formatter.",
  [
    "CSS formatter",
    "CSS beautifier",
    "format CSS online",
    "CSS code formatter",
    "CSS beautifier online",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
