import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Select the image tool that matches your requirement.",
    "Upload your image using the tool interface.",
    "Choose the required settings such as size, format or crop area.",
    "Process and download the final image."
  ];

const benefits = [
    "Useful browser-based image utilities for everyday work.",
    "Quick image compression and resizing workflows.",
    "Support for common image conversion tasks.",
    "Simple tools without requiring desktop image software."
  ];

const faq = [
    { question: "Are the image tools free?", answer: "Yes. KaamKitPro provides these image utilities as free online tools." },
    { question: "Can I compress images online?", answer: "Yes. Use the Image Compressor to reduce supported image file sizes." },
    { question: "Can I resize and crop images?", answer: "Yes. KaamKitPro includes separate image resizing and cropping tools." }
  ];

const relatedTools = [
    { href: "/tools/image-compressor", label: "Image Compressor" },
    { href: "/tools/image-resizer", label: "Image Resizer" },
    { href: "/tools/image-cropper", label: "Image Cropper" },
    { href: "/tools/image-converter", label: "Image Converter" },
    { href: "/tools/jpg-to-pdf", label: "JPG to PDF" }
  ];

export const metadata: Metadata = {
  title: "Image Tools Online",
  description: "Free online image tools for compressing, resizing, cropping and converting images directly in your browser.",
  keywords: [
    "image tools",
    "image tools online",
    "free image tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/image",
  },
  openGraph: {
    title: "Image Tools Online | KaamKitPro",
    description: "Free online image tools for compressing, resizing, cropping and converting images directly in your browser.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/image",
  },
  twitter: {
    card: "summary",
    title: "Image Tools Online | KaamKitPro",
    description: "Free online image tools for compressing, resizing, cropping and converting images directly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}

      <ToolSeoContent
        title="Image Tools Online"
        description="KaamKitPro image tools help you handle common image editing and optimization tasks quickly. Compress large images, resize dimensions, crop photos and convert between supported formats."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
