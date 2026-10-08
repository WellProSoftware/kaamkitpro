import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Social Media Tools Online",
  description:
    "Use free online social media tools for hashtags, YouTube titles, video descriptions, Instagram captions and Open Graph previews.",
  keywords: [
    "social media tools",
    "free social media tools",
    "online social media tools",
    "hashtag generator",
    "YouTube title generator",
    "YouTube description generator",
    "Instagram caption generator",
    "OG preview generator",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/social",
  },
};

export default function SocialToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
