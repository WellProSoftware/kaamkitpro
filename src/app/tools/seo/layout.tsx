import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";

const howToUse = [
    "Select the SEO tool for your specific task.",
    "Enter your page, keyword or website information.",
    "Generate or analyze the requested SEO information.",
    "Copy the result into your website or SEO workflow."
  ];

const benefits = [
    "Useful SEO utilities for everyday website work.",
    "Helpful for bloggers, marketers and developers.",
    "Quick metadata and URL generation workflows.",
    "Browser-based tools with simple interfaces."
  ];

const faq = [
    { question: "Are these SEO tools free?", answer: "Yes. KaamKitPro provides these SEO utilities as free online tools." },
    { question: "Can these tools improve my Google ranking automatically?", answer: "No tool can guarantee rankings. These utilities help prepare and analyze common SEO elements." },
    { question: "Who can use these SEO tools?", answer: "They are useful for website owners, bloggers, marketers, creators and developers." }
  ];

const relatedTools = [
    { href: "/tools/meta-tag-generator", label: "Meta Tag Generator" },
    { href: "/tools/meta-description-generator", label: "Meta Description Generator" },
    { href: "/tools/keyword-density-checker", label: "Keyword Density Checker" },
    { href: "/tools/slug-generator", label: "Slug Generator" },
    { href: "/tools/sitemap-generator", label: "Sitemap Generator" },
    { href: "/tools/og-preview-generator", label: "OG Preview Generator" }
  ];

export const metadata: Metadata = {
  title: "SEO Tools Online",
  description: "Free SEO tools for meta tags, keywords, slugs, sitemaps and content optimization.",
  keywords: [
    "SEO tools",
    "SEO tools online",
    "free SEO tools"
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/seo",
  },
  openGraph: {
    title: "SEO Tools Online | KaamKitPro",
    description: "Free SEO tools for meta tags, keywords, slugs, sitemaps and content optimization.",
    type: "website",
    siteName: "KaamKitPro",
    url: "https://kaamkitpro.com/tools/seo",
  },
  twitter: {
    card: "summary",
    title: "SEO Tools Online | KaamKitPro",
    description: "Free SEO tools for meta tags, keywords, slugs, sitemaps and content optimization.",
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
        title="SEO Tools Online"
        description="KaamKitPro provides simple SEO utilities for website owners, bloggers, creators and marketers. Generate metadata, check keyword density, create URL slugs and prepare sitemap structures."
        howToUse={howToUse}
        benefits={benefits}
        faq={faq}
        relatedTools={relatedTools}
      />
    </>
  );
}
