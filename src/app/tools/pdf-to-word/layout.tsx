import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "PDF to Word Converter - Extract Editable Text | KaamKitPro",
  description: "Turn selectable PDF text into an editable Word-compatible DOC file. Review the extracted paragraphs because original page formatting is not fully recreated.",
  alternates: { canonical: "https://kaamkitpro.com/tools/pdf-to-word" },
  keywords: ["PDF to Word", "convert PDF to DOC", "editable PDF text", "PDF text extraction", "Word-compatible document"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolSeoContent
    title="Create an Editable Word-Compatible Document from PDF Text"
    description="A PDF preserves how a page looks, but editing its content can be difficult. This tool extracts selectable text from PDF pages and places it into paragraphs in a Word-compatible .doc file. It is useful for reusing text, drafting revisions and making basic edits; it does not recreate the original document pixel for pixel."
    howToUse={[
      "Select a PDF file from your device.",
      "Choose Convert to Word and allow the PDF pages to be read.",
      "Download the Word-compatible .doc document created by the tool.",
      "Open the document in Microsoft Word or another compatible word processor.",
      "Review paragraph order, headings, spacing, symbols and page references, then apply your preferred formatting."
    ]}
    benefits={[
      "Turns selectable PDF text into editable paragraphs.",
      "Creates a Word-compatible document without requiring a desktop PDF converter.",
      "Keeps extracted text in reading order as far as the PDF text positions allow.",
      "Shows a short text preview before you use the downloaded document.",
      "Reads the selected PDF in your browser rather than uploading it to a KaamKitPro application server."
    ]}
    faq={[
      { question: "Will the converted document look exactly like the PDF?", answer: "No. The tool extracts text into paragraphs and does not reproduce the original page design, images, tables, columns, headers, footers or detailed typography." },
      { question: "Can I convert a scanned PDF?", answer: "Not with this PDF converter. It requires selectable text in the PDF. Scanned pages that contain only images are not processed with OCR by this tool." },
      { question: "What file type will I receive?", answer: "The tool downloads a Word-compatible .doc file containing the extracted text. Open it in a compatible word processor and save it in your preferred document format if needed." },
      { question: "Why is the paragraph or reading order different?", answer: "PDFs can position text independently on a page. Multi-column layouts, tables and sidebars may not have a simple reading order, so review and rearrange the text after conversion." },
      { question: "Are images and tables included?", answer: "This tool focuses on selectable text. It does not promise to extract embedded images or reconstruct tables as editable Word tables." },
      { question: "Is my document sent to a server?", answer: "The PDF is processed in your browser. A PDF rendering library may load from a public CDN, so an internet connection is required. Use a trusted device when handling confidential files." }
    ]}
    relatedTools={[
      { href: "/tools/pdf-to-excel", label: "PDF to Excel" },
      { href: "/tools/pdf-extract-text", label: "PDF Text Extractor" },
      { href: "/tools/jpg-to-word", label: "JPG to Word" }
    ]}
  /></>;
}
