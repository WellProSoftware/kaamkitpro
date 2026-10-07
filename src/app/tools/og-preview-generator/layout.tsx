import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "OG Preview Generator",
  "Preview Open Graph social sharing information and generate basic OG meta tags online.",
  [
    "OG preview generator",
    "Open Graph preview",
    "OG image preview",
    "social media preview",
    "Open Graph generator",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
