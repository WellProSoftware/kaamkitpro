import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Brightness Tool",
  alternates: {
    canonical: "https://kaamkitpro.com/tools/image-brightness",
  },
};

export default function ToolCanonicalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
