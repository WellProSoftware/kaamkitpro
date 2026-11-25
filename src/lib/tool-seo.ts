import type { Metadata } from "next";

export type ToolSeo = {
  title: string;
  description: string;
  keywords: string[];
};

const toolSeo: Record<string, ToolSeo> = {  "age-calculator": {
    title: "Age Calculator Online",
    description:
      "Calculate your exact age in years, months and days from your date of birth with this free online age calculator.",
    keywords: ["age calculator", "calculate age", "date of birth calculator"],
  },
  "bmi-calculator": {
    title: "BMI Calculator Online",
    description:
      "Calculate Body Mass Index using height and weight with this free online BMI calculator.",
    keywords: ["BMI calculator", "body mass index calculator", "BMI online"],
  },
  "gst-calculator": {
    title: "GST Calculator Online",
    description:
      "Calculate GST amount, inclusive price and exclusive price quickly with this free GST calculator.",
    keywords: ["GST calculator", "GST calculation", "GST inclusive calculator"],
  },
  "image-compressor": {
    title: "Image Compressor Online",
    description:
      "Compress JPG, PNG and WebP images online to reduce file size while maintaining useful quality.",
    keywords: ["image compressor", "compress image", "reduce image size"],
  },
  "pdf-merge": {
    title: "Merge PDF Files Online",
    description:
      "Merge multiple PDF files into one document online for free with KaamKitPro.",
    keywords: ["merge PDF", "PDF merger", "combine PDF files"],
  },
  "pdf-split": {
    title: "Split PDF Online",
    description:
      "Split a PDF into separate pages online with this free browser-based PDF splitter.",
    keywords: ["split PDF", "PDF splitter", "separate PDF pages"],
  },
  "sip-calculator": {
    title: "SIP Calculator Online",
    description:
      "Estimate SIP investment growth, total investment and potential returns with this free calculator.",
    keywords: ["SIP calculator", "SIP return calculator", "mutual fund SIP calculator"],
  },
  "image-brightness": {
    title: "Image Brightness Tool",
    description: "Adjust the brightness of an image and review the result before downloading it.",
    keywords: ["image brightness tool","brighten image online","adjust photo brightness"],
  },
  "image-flip": {
    title: "Image Flip Tool",
    description: "Mirror an image horizontally or vertically with this free online image utility.",
    keywords: ["image flip tool","flip image online","mirror image"],
  },
  "image-grayscale": {
    title: "Image Grayscale Converter",
    description: "Convert an image to grayscale for monochrome graphics, documents and photo projects.",
    keywords: ["grayscale image converter","black and white image","convert image to grayscale"],
  },
  "image-rotate": {
    title: "Image Rotate Tool",
    description: "Rotate an image to the required orientation and check the result before saving.",
    keywords: ["rotate image online","image rotation tool","turn photo"],
  },
  "pdf-extract-text": {
    title: "PDF Text Extractor",
    description: "Extract selectable text from PDF documents for searching, reviewing and reuse.",
    keywords: ["PDF text extractor","extract text from PDF","PDF to text"],
  },
  "pdf-metadata": {
    title: "PDF Metadata Viewer",
    description: "Review descriptive PDF properties such as title, author and creation details when available.",
    keywords: ["PDF metadata viewer","PDF properties","view PDF metadata"],
  },
  "pdf-page-number": {
    title: "PDF Page Number Tool",
    description: "Add page numbers to a PDF and review placement before using or printing the document.",
    keywords: ["add page numbers to PDF","PDF page numbering","number PDF pages"],
  },
  "pdf-rotate": {
    title: "PDF Rotate Tool",
    description: "Rotate PDF pages to correct sideways or upside-down documents before sharing or printing.",
    keywords: ["rotate PDF","PDF page rotation","turn PDF pages"],
  },
  "pdf-watermark": {
    title: "PDF Watermark Guide",
    description: "Learn how PDF watermarks label drafts, samples and documents for review or distribution.",
    keywords: ["PDF watermark","add watermark to PDF","watermark PDF document"],
  },

};

export function getToolSeo(slug: string): ToolSeo | undefined {
  return toolSeo[slug];
}

export function createToolSeoMetadata(slug: string): Metadata | undefined {
  const seo = getToolSeo(slug);

  if (!seo) {
    return undefined;
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      ...seo.keywords,
      "KaamKitPro",
      "free online tool",
      "online tools",
    ],
    alternates: {
      canonical: `https://kaamkitpro.com/tools/${slug}`,
    },
    openGraph: {
      title: `${seo.title} | KaamKitPro`,
      description: seo.description,
      type: "website",
      siteName: "KaamKitPro",
      url: `https://kaamkitpro.com/tools/${slug}`,
    },
    twitter: {
      card: "summary",
      title: `${seo.title} | KaamKitPro`,
      description: seo.description,
    }
  };
}
