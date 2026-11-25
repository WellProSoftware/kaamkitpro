import Link from "next/link";
import type { Metadata } from "next";

import BrandLogo from "@/components/BrandLogo";
export const metadata: Metadata = {
  title: "Online Tools Guides",
  description:
    "Practical guides for PDF tasks, image optimization, GST calculations and everyday digital workflows.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides",
  },
};

const guides = [
  {
    title: "How to Merge PDF Files Online",
    description:
      "Learn how to combine multiple PDF files into one document quickly using a free browser-based tool.",
    href: "/guides/pdf-merge",
    tool: "/tools/pdf-merge",
    category: "PDF Tools",
  },
  {
    title: "How to Compress Images Online",
    description:
      "Learn simple ways to reduce image file size while keeping images useful for websites, sharing and uploads.",
    href: "/guides/image-compression",
    tool: "/tools/image-compressor",
    category: "Image Tools",
  },
  {
    title: "How to Compress a PDF Online",
    description: "Compare file sizes, check document quality, and learn practical ways to reduce PDF size.",
    href: "/guides/pdf-compression",
    tool: "/tools/pdf-compressor",
    category: "PDF Tools",
  },
  {
    title: "How to Calculate BMI",
    description: "Understand the adult BMI formula, convert centimetres to metres, follow a worked example and learn the limits of BMI as a screening measure.",
    href: "/guides/bmi-calculator",
    tool: "/tools/bmi-calculator",
    category: "Health Calculators",
  },
  {
    title: "How to Calculate GST on a Price",
    description: "Understand GST-exclusive and GST-inclusive prices with formulas and worked examples.",
    href: "/guides/gst-calculator",
    tool: "/tools/gst-calculator",
    category: "Calculators",
  },
  {
    title: "How to Choose and Use Online Tools",
    description: "Choose a utility, test with a small sample, verify outputs, and protect sensitive information.",
    href: "/guides/choosing-online-tools",
    tool: "/tools",
    category: "Everyday Tools",
  },
