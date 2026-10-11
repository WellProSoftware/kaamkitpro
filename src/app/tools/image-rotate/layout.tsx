import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Rotate Tool",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/image-rotate",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
