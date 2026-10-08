import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Choose the social media generator you need.",
    "Enter your topic, content idea or keywords.",
    "Generate content ideas using the available options.",
    "Edit the generated result to match your brand and audience."
  ];

const benefits = [
    "Useful starting points for social media content.",
    "Helps reduce repetitive content preparation work.",
    "Supports common YouTube and Instagram workflows.",
    "Simple browser-based generators."
  ];

const faq = [
    { question: "Are the social media generators free?", answer: "Yes. The available generators can be used as free online tools." },
    { question: "Can generated content be published directly?", answer: "You should review and customize generated content before publishing it." },
    { question: "Which platforms are supported?", answer: "Current tools include Instagram and YouTube-focused content generators." }
  ];

const relatedTools = [
    { href: "/tools/hashtag-generator", label: "Hashtag Generator" },
    { href: "/tools/instagram-caption-generator", label: "Instagram Caption Generator" },
    { href: "/tools/youtube-title-generator", label: "YouTube Title Generator" },
    { href: "/tools/youtube-description-generator", label: "YouTube Description Generator" }
  ];

export const metadata: Metadata = {
  title: "Social Media Tools Online",
  description: "Free social media tools for generating captions, hashtags, YouTube titles and video descriptions.",
  keywords: [
    "social media tools",
    "social media generators",
    "free social media tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/social",
  },
  openGraph: {
    title: "Social Media Tools Online | KaamKitPro",
    description: "Free social media tools for generating captions, hashtags, YouTube titles and video descriptions.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/social",
  },
  twitter: {
    card: "summary",
    title: "Social Media Tools Online | KaamKitPro",
    description: "Free social media tools for generating captions, hashtags, YouTube titles and video descriptions.",
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
        title="Social Media Tools Online"
        description="Create social media content ideas faster with KaamKitPro. Generate captions, hashtags, YouTube titles and descriptions to support your content workflow."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
