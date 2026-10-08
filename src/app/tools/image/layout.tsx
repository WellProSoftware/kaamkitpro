import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Tools Online",
  description:
    "Free online tools for compressing, resizing, converting and cropping images.",
};

export default function ImageToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
