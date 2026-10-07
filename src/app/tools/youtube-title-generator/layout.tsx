import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "YouTube Title Generator",
  "Generate engaging YouTube title ideas for videos, Shorts and content creators.",
  [
    "YouTube title generator",
    "video title generator",
    "YouTube SEO title",
    "clickable YouTube titles",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
