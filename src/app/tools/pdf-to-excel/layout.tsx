import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "PDF to Excel Converter - Extract PDF Tables Online | KaamKitPro",
  description: "Extract selectable text and table-like rows from a PDF into an Excel workbook. Review best-effort column grouping and verify figures before use.",
  alternates: { canonical: "https://kaamkitpro.com/tools/pdf-to-excel" },
  keywords: ["PDF to Excel", "extract PDF tables", "convert PDF to XLSX", "PDF text extraction", "online spreadsheet converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}<ToolSeoContent
    title="Convert Selectable PDF Text into an Excel Workbook"
    description="PDF pages are designed for fixed page layouts, while spreadsheets organise information into rows and columns. This converter reads selectable text from each PDF page, groups nearby text using its page position, and writes the extracted content into an Excel workbook. It is a best-effort extraction rather than a guaranteed reconstruction of the original table."
    howToUse={[
      "Choose a PDF file from your device. The document is read in your browser.",
      "Select Convert to Excel and wait while the pages are processed.",
      "Review the on-screen preview of the extracted rows.",
      "Open the downloaded workbook and check column alignment, page breaks, totals and numeric values.",
      "Correct any misplaced cells in Excel before using the data in reports or business decisions."
    ]}
    benefits={[
      "Extracts selectable PDF text without requiring a desktop PDF application.",
      "Uses text positioning to make a best-effort attempt at grouping table columns.",
      "Adds page labels so extracted rows can be traced back to their source page.",
      "Creates an Excel workbook that can be reviewed and edited.",
      "Processes the selected PDF in the browser; the file is not uploaded to a KaamKitPro application server."
    ]}
    faq={[
      { question: "Can it convert every PDF table perfectly?", answer: "No. PDF files do not always store tables as structured rows and columns. The converter estimates columns from text positions, so complex layouts, merged cells and irregular spacing may need manual correction." },
      { question: "Does it support scanned PDFs?", answer: "No. This PDF converter extracts selectable text. If a PDF contains only page images and no selectable text layer, it reports that no text was found. OCR is not included in this PDF tool." },
      { question: "Will formulas and spreadsheet formatting be preserved?", answer: "No. The output is extracted text arranged in worksheet cells. Original PDF formulas, fonts, colours, borders and exact page formatting are not reconstructed." },
      { question: "Why do some values appear in the wrong column?", answer: "PDF text positions can be irregular, especially in multi-column pages or tables with merged cells. Review the workbook against the original PDF and adjust columns before relying on the figures." },
      { question: "Is my PDF uploaded to a server?", answer: "The PDF is processed in your browser. The PDF rendering library may be loaded from a public CDN, so an internet connection is needed. Avoid using a shared device for confidential documents." },
      { question: "What should I verify after conversion?", answer: "Check row and column alignment, decimal points, negative values, dates, page labels, totals and any text split across lines. Keep the original PDF as the source of truth." }
    ]}
    relatedTools={[
      { href: "/tools/pdf-to-word", label: "PDF to Word" },
      { href: "/tools/excel-combiner", label: "Excel Merge" },
      { href: "/tools/pdf-extract-text", label: "PDF Text Extractor" }
    ]}
  /></>;
}
