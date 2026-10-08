import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "PDF Rotate Tool",
  description: "Rotate PDF pages online for free by 90, 180 or 270 degrees directly in your browser.",
  keywords: ["PDF rotate", "rotate PDF online", "PDF page rotation", "free PDF rotator"],
  alternates: { canonical: "https://kaamkitpro.com/tools/pdf-rotate" },
};

export default function PDFRotateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <ToolSeoContent
        title="Free PDF Rotate Tool"
        description="Rotate PDF pages directly in your browser. Choose 90°, 180° or 270° rotation and download the updated PDF."
        howToUse={["Select the PDF.", "Choose 90°, 180° or 270° clockwise rotation.", "Click Rotate & Download PDF.", "Save the rotated PDF."]}
        benefits={["Free browser-based PDF rotation.", "No installation required.", "PDF processing happens locally in your browser.", "Useful for incorrectly oriented scanned documents."]}
        faq={[
          { question: "Can I rotate a PDF online for free?", answer: "Yes. KaamKitPro lets you rotate PDF pages in your browser and download the result for free." },
          { question: "Does the tool upload my PDF?", answer: "No. The rotation is performed directly in your browser." },
          { question: "Can I rotate a PDF by 180 degrees?", answer: "Yes. Choose 180° from the rotation menu." },
          { question: "Which rotation angles are supported?", answer: "The tool supports 90°, 180° and 270° clockwise rotation." },
        ]}
        relatedTools={[
          { href: "/tools/pdf-merge", label: "PDF Merge" },
          { href: "/tools/pdf-split", label: "PDF Split" },
          { href: "/tools/pdf-compressor", label: "PDF Compressor" },
          { href: "/tools/pdf-to-jpg", label: "PDF to JPG" },
        ]}
      />
    </>
  );
}
