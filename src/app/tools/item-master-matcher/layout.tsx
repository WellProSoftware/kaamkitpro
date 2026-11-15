import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Hospital Item Master Matching & Mapping Tool | KaamKitPro",
  description: "Compare hospital purchase item names with an existing item master, review match confidence, flag possible duplicates and export new-item candidates.",
  keywords: ["hospital item master matching", "medical item mapping", "pharmacy item matching", "hospital purchase item matching", "item master duplicate check"],
  alternates: { canonical: "https://kaamkitpro.com/tools/item-master-matcher" },
};

export default function ItemMasterMatcherLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <ToolSeoContent
        title="Hospital Item Master Matching and Mapping"
        description="Hospital purchase descriptions often differ because of abbreviations, pack details, spelling or manufacturer naming. Item Mapping compares the names you provide with records in an existing item master and ranks the closest candidates. It is a review aid for procurement and master-data teams, not an automatic clinical or purchasing approval."
        howToUse={[
          "Prepare an Excel or CSV item master with an Item Name column. Item No, Item ID, category, sub-category, unit, manufacturer and generic name can also be included.",
          "Upload the master in your browser workspace. Sign in to save a private copy in this browser; guest data is temporary.",
          "Enter item descriptions one per line or import a bulk Excel or CSV list.",
          "Review the suggested MATCH, CHECK and NEW ITEM results. Adjust the confidence thresholds to suit the quality of your source data.",
          "Verify strength, dosage form, pack size, unit, manufacturer and other critical attributes before accepting a match.",
          "Export the workbook to review suggested matches and new-item candidates with your team."
        ]}
        benefits={[
          "Ranks up to three similar item-master records for each input description.",
          "Uses text similarity and applies a penalty when numeric details differ.",
          "Highlights possible duplicate new-item descriptions in the same bulk list.",
          "Exports match details and a separate new-item creation worksheet.",
          "Reads source files in your browser; the item master is not sent to a KaamKitPro application server.",
          "Signed-in item-master data is stored in this browser on the device, so it is not cloud-synchronised or a substitute for your organisation's approved backup."
        ]}
        faq={[
          { question: "Which file formats can I import?", answer: "The tool accepts Excel workbooks and CSV files. The item master must contain a column named Item Name; additional recognised columns can provide item identifiers, categories, units, manufacturer and generic name." },
          { question: "Does a MATCH result mean the products are identical?", answer: "No. It is a similarity result based on item descriptions. A staff member must verify strength, dosage form, pack size, unit, manufacturer, generic name and any other procurement-critical attributes before mapping." },
          { question: "What do MATCH, CHECK and NEW ITEM mean?", answer: "They are confidence bands controlled by the thresholds in the tool. MATCH is above the selected upper threshold, CHECK is between the two thresholds, and NEW ITEM is below the lower threshold. They are review labels, not approval decisions." },
          { question: "Where is my item master stored?", answer: "The file is read in your browser. For a signed-in account, the saved master is kept in browser storage on that device. Guest work is temporary and is not retained after leaving the page. Clearing browser data or changing devices can remove access to locally stored data." },
          { question: "Can I upload a list of purchase items in bulk?", answer: "Yes. You can import an Excel or CSV list or paste one item description per line, then export the ranked results to an Excel workbook." },
          { question: "Should I automatically create new hospital item codes from the export?", answer: "No. Treat the export as a preparation and review report. Follow your hospital's item-master governance process and obtain the required checks and approvals before creating or changing records." }
        ]}
        relatedTools={[
          { href: "/tools/excel-combiner", label: "Excel Merge" },
          { href: "/tools/gst-calculator", label: "GST Calculator" }
        ]}
      />
    </>
  );
}
