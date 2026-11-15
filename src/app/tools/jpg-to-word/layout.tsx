import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "JPG to Word OCR Converter - Image Text to DOC | KaamKitPro",
  description: "Recognise printed English text in a JPG image and create an editable Word-compatible document. Proofread OCR output before sharing or editing.",
  alternates: { canonical: "https://kaamkitpro.com/tools/jpg-to-word" },
  keywords: ["JPG to Word", "image to Word", "OCR to DOC", "photo text to document", "extract text from JPG"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolSeoContent
    title="Turn Printed Text in a JPG Image into an Editable Document"
    description="When text exists only in a photograph, it cannot be edited like ordinary document text. This tool applies English-language optical character recognition (OCR) to a JPG image and places the recognised words into a Word-compatible .doc file. It is intended as a starting point for editing, not as an exact copy of the image or a guarantee that every character has been read correctly."
    howToUse={[
      "Select a clear JPG or JPEG image containing printed text.",
      "Choose Convert to Word to start OCR in your browser.",
      "Wait while the recognition engine reads the image; progress is shown on screen.",
      "Download the Word-compatible document and open it in a compatible word processor.",
      "Proofread names, dates, amounts, punctuation and line breaks against the original image before sharing the document."
    ]}
    benefits={[
      "Converts visible printed English text in JPG images into editable text.",
      "Creates a Word-compatible .doc file that can be revised in a word processor.",
      "Shows a short preview of the recognised text before you rely on the output.",
      "Uses browser-based OCR rather than sending the image to a KaamKitPro application server.",
      "Can reduce retyping for clear printed notes, lists and simple document photos."
    ]}
    faq={[
      { question: "Does the output preserve the original image layout?", answer: "No. The tool extracts text into paragraphs. It does not recreate the original page design, tables, columns, pictures, signatures or exact spacing." },
      { question: "Which OCR language is selected?", answer: "The current OCR engine is configured for English. Other languages, mixed-language documents and unusual fonts may produce unreliable results." },
      { question: "Can I use it for handwriting?", answer: "Handwriting recognition is not a supported or guaranteed use. For best results, use a clear image of printed English text." },
      { question: "What affects recognition quality?", answer: "Focus, resolution, lighting, contrast, page angle, shadows and font clarity all affect OCR. A straight, well-lit, high-resolution image generally gives better results." },
      { question: "What format is downloaded?", answer: "The tool creates a Word-compatible .doc file containing the recognised text. You can open it in a compatible word processor and save it in another format." },
      { question: "Should I trust OCR for invoices or medical records?", answer: "No OCR output should be accepted without verification. Carefully compare names, quantities, batch details, dates, amounts and other critical information with the original image before using it for financial, medical or operational decisions." },
      { question: "Is my image uploaded to a server?", answer: "The OCR operation runs in your browser using a library loaded from a public CDN. The image is not uploaded to a KaamKitPro application server. Use a trusted device for confidential documents." }
    ]}
    relatedTools={[
      { href: "/tools/jpg-to-excel", label: "JPG to Excel" },
      { href: "/tools/pdf-to-word", label: "PDF to Word" },
      { href: "/tools/image-cropper", label: "Image Cropper" }
    ]}
  /></>;
}
