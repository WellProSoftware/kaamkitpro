import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Hashtag Generator",
  "Generate hashtags for Instagram, YouTube, Reels, Shorts and social media posts.",
  [
    "hashtag generator",
    "Instagram hashtag generator",
    "YouTube hashtag generator",
    "reels hashtags",
    "social media hashtags",
  ]
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
