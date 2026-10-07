import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Instagram Caption Generator",
  "Generate Instagram captions for lifestyle, business, motivational and social media posts.",
  [
    "Instagram caption generator",
    "Instagram captions",
    "social media caption generator",
    "Instagram post ideas",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
