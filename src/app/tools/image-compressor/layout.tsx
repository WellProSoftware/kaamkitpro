import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Image Compressor",
  "Compress JPG, PNG and WebP images online for free. Reduce image file size while keeping good visual quality.",
  [
    "image compressor",
    "compress image online",
    "JPG compressor",
    "PNG compressor",
    "reduce image size",
    "free image compressor",
  ]
);

export default function ImageCompressorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
