import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "PDF Page Number Tool",
  description: "Add page numbers to PDF files online for free. Choose a top or bottom position and download the numbered PDF in your browser.",
  keywords: ["PDF page numbers", "add page numbers to PDF", "number PDF pages"],
  alternates: { canonical: "https://kaamkitpro.com/tools/pdf-page-number" },
};

export default function Layout({children}:{children:React.ReactNode}){return <>{children}<ToolSeoContent title="Free PDF Page Number Tool" description="Add simple page numbers to every page of a PDF without uploading the document." howToUse={["Select a PDF.","Choose the page-number position.","Click Add Numbers & Download.","Save the numbered PDF."]} benefits={["Free and browser-based.","No installation required.","Supports top and bottom positions.","Files are processed locally in your browser."]} faq={[{question:"Can I add page numbers to a PDF for free?",answer:"Yes. KaamKitPro adds page numbers and lets you download the result for free."},{question:"Are PDF files uploaded?",answer:"No. Processing happens directly in your browser."},{question:"Can I choose where the number appears?",answer:"Yes. You can choose several top and bottom positions."}]} relatedTools={[{href:"/tools/pdf-rotate",label:"PDF Rotate"},{href:"/tools/pdf-merge",label:"PDF Merge"},{href:"/tools/pdf-split",label:"PDF Split"}]}/></>}