import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Image Converter",
  "Convert JPG, PNG and WebP images online for free. Change image format directly in your browser.",
  [
    "image converter",
    "JPG converter",
    "PNG converter",
    "WebP converter",
    "convert image format",
    "free image converter",
  ]
);

export default function ImageConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
