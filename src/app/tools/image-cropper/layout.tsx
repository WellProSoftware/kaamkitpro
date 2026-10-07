import type { Metadata } from "next";
import { createToolMetadata } from "@/lib/seo";

export const metadata: Metadata = createToolMetadata(
  "Image Cropper",
  "Crop JPG, PNG and WebP images online for free. Choose a custom crop area using image coordinates.",
  [
    "image cropper",
    "crop image online",
    "crop JPG",
    "crop PNG",
    "image crop tool",
    "free image cropper",
  ]
);

export default function ImageCropperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
