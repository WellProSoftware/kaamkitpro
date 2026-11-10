import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Excel Merge - Merge Multiple Excel and CSV Files | KaamKitPro",
  description: "Merge multiple Excel and CSV files, align columns, remove totals and duplicates, and export one consolidated workbook.",
  keywords: ["excel merge", "merge excel files", "combine csv files", "excel merger"],
  alternates: { canonical: "https://kaamkitpro.com/tools/excel-combiner" },
};
export default function ExcelCombinerLayout({ children }: { children: React.ReactNode }) { return children; }
