import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Vendor Quotation Comparison Tool | KaamKitPro",
  description: "Compare supplier quotations using unit price, discount, GST and freight. Calculate landed unit cost, identify the lowest comparable offer and export a CSV report.",
  keywords: ["vendor quotation comparison", "supplier price comparison", "landed cost calculator", "hospital purchase comparison", "pharmacy vendor comparison"],
  alternates: { canonical: "https://kaamkitpro.com/tools/vendor-quotation-comparison" },
};

export default function VendorQuotationComparisonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <ToolSeoContent
        title="Vendor Quotation Comparison"
        description="Compare supplier offers on a like-for-like basis. Enter the same item and pack description for each supplier, then review discount, GST, freight, estimated landed unit cost and total payable amount. The comparison is a procurement aid and does not replace supplier, quality, tax or purchase approval checks."
        howToUse={[
          "Enter the item name and pack or unit description for each supplier quote.",
          "Add the supplier name, required quantity, quoted unit price, discount, GST rate and freight per unit.",
          "Choose whether the quoted price is GST-exclusive or GST-inclusive.",
          "Add more supplier quotes and keep item and pack descriptions consistent for a fair comparison.",
          "Review the lowest landed unit cost for each matching item and pack.",
          "Export the comparison as a CSV file for your purchase review."
        ]}
        benefits={[
          "Compares supplier prices after discount, GST treatment and freight.",
          "Highlights the lowest estimated landed unit cost for each matching item and pack.",
          "Calculates the total payable amount using the entered quantity.",
          "Supports multiple supplier quotes and CSV export.",
          "Processes quote data in the browser; no quotation file is uploaded to the KaamKitPro application server."
        ]}
        faq={[
          { question: "How is landed unit cost calculated?", answer: "The tool applies the entered discount before GST, applies GST according to the selected inclusive or exclusive treatment, and adds freight per unit. The result is an estimate based on the terms entered." },
          { question: "Does the tool decide which supplier should receive the purchase order?", answer: "No. It highlights the lowest estimated cost only. Review delivery time, expiry, quality, brand or manufacturer, payment terms, availability and vendor compliance before selecting a supplier." },
          { question: "Can I compare different pack sizes?", answer: "For a fair comparison, enter matching item and pack or unit descriptions. The tool groups quotes by the normalised item and pack text." },
          { question: "Does the calculation account for input tax credit?", answer: "No. It compares the estimated payable amount based on the selected GST treatment. Your finance team should confirm input tax credit eligibility and the correct tax treatment." },
          { question: "Where is quotation data processed?", answer: "Calculations run in your browser. The tool does not upload quote entries to a KaamKitPro application server." }
        ]}
        relatedTools={[
          { href: "/tools/item-master-matcher", label: "Item Master Matcher" },
          { href: "/tools/excel-combiner", label: "Excel Combiner" },
          { href: "/tools/gst-calculator", label: "GST Calculator" }
        ]}
      />
    </>
  );
}
