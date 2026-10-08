import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Choose the calculator relevant to your calculation.",
    "Enter the required values in the input fields.",
    "Review the calculated result and supporting figures.",
    "Adjust the inputs to compare different scenarios."
  ];

const benefits = [
    "Free calculators for common everyday calculations.",
    "Simple inputs and immediate results.",
    "Useful for quick estimates and comparisons.",
    "Works directly in a modern web browser."
  ];

const faq = [
    { question: "Which calculators are available?", answer: "KaamKitPro includes calculators such as EMI, GST, SIP, BMI, age and percentage calculators." },
    { question: "Are the calculator results free?", answer: "Yes. The calculators are available as free online utilities." },
    { question: "Can I use these calculators on mobile?", answer: "Yes. The calculator pages are designed to work in modern mobile and desktop browsers." }
  ];

const relatedTools = [
    { href: "/tools/emi-calculator", label: "EMI Calculator" },
    { href: "/tools/gst-calculator", label: "GST Calculator" },
    { href: "/tools/sip-calculator", label: "SIP Calculator" },
    { href: "/tools/bmi-calculator", label: "BMI Calculator" },
    { href: "/tools/age-calculator", label: "Age Calculator" },
    { href: "/tools/percentage-calculator", label: "Percentage Calculator" }
  ];

export const metadata: Metadata = {
  title: "Online Calculators",
  description: "Use free online calculators for EMI, GST, SIP, BMI, age and other everyday calculations.",
  keywords: [
    "online calculators",
    "free calculators",
    "calculator tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/calculators",
  },
  openGraph: {
    title: "Online Calculators | KaamKitPro",
    description: "Use free online calculators for EMI, GST, SIP, BMI, age and other everyday calculations.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/calculators",
  },
  twitter: {
    card: "summary",
    title: "Online Calculators | KaamKitPro",
    description: "Use free online calculators for EMI, GST, SIP, BMI, age and other everyday calculations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CategoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}

      <ToolSeoContent
        title="Online Calculators"
        description="KaamKitPro offers practical calculators for financial, health and everyday planning needs. Enter your values and get results instantly without installing a calculator app."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
