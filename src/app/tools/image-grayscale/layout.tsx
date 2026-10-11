import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Grayscale Tool",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/image-grayscale",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
