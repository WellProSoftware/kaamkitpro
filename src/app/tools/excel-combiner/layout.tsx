import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Excel Merge Tool - Combine Excel and CSV Files Online | KaamKitPro",
  description: "Combine multiple Excel and CSV workbooks, align columns by header or position, remove total and duplicate rows, preview the result and export Excel or CSV.",
  keywords: ["merge Excel files", "combine Excel workbooks", "merge CSV files", "Excel file combiner", "consolidate spreadsheets"],
  alternates: { canonical: "https://kaamkitpro.com/tools/excel-combiner" },
};

export default function ExcelCombinerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <ToolSeoContent
        title="Combine Excel Workbooks and CSV Files"
        description="When reports arrive as separate spreadsheets, consolidating them can take time—especially when column order or headings differ. Excel Merge combines data rows from selected workbooks and CSV files into one output, with options to align columns, keep source details and clean common report rows. Always review the preview before exporting."
        howToUse={[
          "Select two or more Excel or CSV files. Supported formats are XLSX, XLS, XLSM and CSV.",
          "Choose whether to combine every worksheet or only the first worksheet in each workbook.",
          "Use header-name matching to align columns with the same heading, or choose position matching when each file has the same column order.",
          "Choose whether to remove total rows, remove exact duplicate rows, trim extra spaces in headers and add source-file and source-sheet columns.",
          "Keep automatic header detection or select the row containing the column headings.",
          "Select Combine files, inspect the preview and download the consolidated result as Excel or CSV."
        ]}
        benefits={[
          "Combines data from multiple workbooks and CSV files in one browser session.",
          "Can align columns by heading or by their position in the source sheet.",
          "Offers optional removal of detected total rows and exact duplicate rows.",
          "Can add source file and worksheet columns to help trace imported records.",
          "Provides a preview before downloading the consolidated workbook or CSV.",
          "Processes spreadsheet contents in your browser rather than uploading the files to a KaamKitPro application server."
        ]}
        faq={[
          { question: "Which spreadsheet formats are supported?", answer: "The tool supports XLSX, XLS, XLSM and CSV files. Password-protected, corrupted or otherwise unreadable files may fail to import." },
          { question: "How are columns matched between files?", answer: "By default, columns are aligned using their header names, without regard to letter case. You can instead match by column position when the source files use the same layout." },
          { question: "Can I combine every worksheet in a workbook?", answer: "Yes. The default option includes all worksheets. You can turn it off to include only the first worksheet from each selected workbook." },
          { question: "Will the tool remove duplicate records automatically?", answer: "Only if you enable the exact-duplicate option. It compares complete output rows; it does not identify near-duplicates or decide whether two different records represent the same business transaction." },
          { question: "How does total-row removal work?", answer: "The tool looks for cells whose values resemble common total labels. Review the output because unusual subtotal labels or report layouts may need manual checking." },
          { question: "Are my spreadsheets uploaded?", answer: "The files are read and combined in your browser. The Excel processing library is loaded from a public CDN, so an internet connection is needed to initialise the tool. Do not use a shared or untrusted device for confidential work." },
          { question: "Can I download the result in both formats?", answer: "Yes. After the combined preview is generated, you can download an Excel workbook or a CSV file." }
        ]}
        relatedTools={[
          { href: "/tools/item-master-matcher", label: "Item Mapping" },
          { href: "/tools/pdf-to-excel", label: "PDF to Excel" }
        ]}
      />
    </>
  );
}
