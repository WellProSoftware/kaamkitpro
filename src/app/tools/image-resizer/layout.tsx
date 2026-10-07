import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Image Resizer",
  "Resize JPG, PNG and WebP images online for free. Set custom image width and height in pixels.",
  [
    "image resizer",
    "resize image online",
    "resize JPG",
    "resize PNG",
    "change image dimensions",
    "free image resizer",
  ]
);

export default function ImageResizerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
