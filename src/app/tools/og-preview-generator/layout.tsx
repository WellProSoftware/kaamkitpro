import type { Metadata } from "next";
import ToolSeoContent from "@/components/ToolSeoContent";
import { getToolSeoContent } from "@/lib/tool-seo-content";
import { createToolSeoMetadata } from "@/lib/tool-seo";

export const metadata: Metadata =
  createToolSeoMetadata("og-preview-generator") ?? {};

export default function ToolLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const seoContent = getToolSeoContent("og-preview-generator");

  return (
    <>
      {children}

      {seoContent && (
        <ToolSeoContent
          title={seoContent.title}
          description={seoContent.description}
          howToUse={seoContent.howToUse}
          benefits={seoContent.benefits}
          faq={seoContent.faq}
          relatedTools={seoContent.relatedTools}
        />
      )}
    </>
  );
}
