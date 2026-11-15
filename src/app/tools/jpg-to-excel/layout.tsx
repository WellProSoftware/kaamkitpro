import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "JPG to Excel OCR Converter - Image Text to XLSX | KaamKitPro",
  description: "Use English OCR to read text from a JPG image and export the recognised lines to Excel. Check OCR results and spreadsheet columns before use.",
  alternates: { canonical: "https://kaamkitpro.com/tools/jpg-to-excel" },
  keywords: ["JPG to Excel", "image to Excel", "OCR to XLSX", "extract text from image", "photo to spreadsheet"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolSeoContent
    title="Extract Text from a JPG Image and Export It to Excel"
    description="A photo of a printed list, form or report contains pixels rather than editable spreadsheet cells. This tool uses English-language optical character recognition (OCR) to identify visible text in a JPG image, then places recognised lines into an Excel workbook. OCR is an estimate: it does not reliably understand every table structure or determine the meaning of each column."
    howToUse={[
      "Choose a JPG or JPEG image with clear, readable text.",
      "Select Convert to Excel to start English-language OCR in your browser.",
      "Wait for the recognition progress to finish; larger or more detailed images can take longer.",
      "Review the recognised text preview and download the Excel workbook.",
      "Check spelling, numbers, decimal points, dates and column placement against the original image before using the data."
    ]}
    benefits={[
      "Reads printed English text from JPG and JPEG images using OCR.",
      "Exports recognised content to an editable Excel workbook.",
      "Displays a short preview so obvious recognition errors can be spotted.",
      "Runs OCR in the browser using a library loaded when needed.",
      "Can help turn simple photographed lists into editable starting data, subject to manual review."
    ]}
    faq={[
      { question: "Does JPG to Excel recognise every table correctly?", answer: "No. OCR identifies text and this tool separates lines using tabs or wider spaces where available. It does not guarantee accurate table detection, column headings or cell alignment. Check the workbook against the source image." },
      { question: "Which languages are supported?", answer: "The current OCR configuration uses English. Text in other languages may be recognised incorrectly or not recognised at all." },
      { question: "How can I improve OCR accuracy?", answer: "Use a sharp, well-lit image with the page straight, text in focus and minimal shadows. Crop unnecessary background, avoid glare and use a higher-resolution image when possible." },
      { question: "Can it read handwritten notes?", answer: "Handwriting recognition is not a supported or guaranteed use. Results are intended for clear printed English text and must be proofread." },
      { question: "Will the Excel file contain formulas or the original formatting?", answer: "No. The workbook contains recognised text arranged into rows. It does not infer formulas or reproduce the original image's fonts, colours, borders or layout." },
      { question: "Is my JPG uploaded to KaamKitPro?", answer: "OCR is performed in your browser using a library loaded from a public CDN. The selected image is not uploaded to a KaamKitPro application server, but an internet connection is needed to load the OCR library." }
    ]}
    relatedTools={[
      { href: "/tools/jpg-to-word", label: "JPG to Word" },
      { href: "/tools/pdf-to-excel", label: "PDF to Excel" },
      { href: "/tools/image-compressor", label: "Image Compressor" }
    ]}
  /></>;
}
