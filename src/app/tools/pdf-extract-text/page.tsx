import dynamic from "next/dynamic";

const PDFExtractTextClient = dynamic(
  () => import("./PDFExtractTextClient"),
  { ssr: false }
);

export default function PDFExtractTextPage() {
  return <PDFExtractTextClient />;
}
