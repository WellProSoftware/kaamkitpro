import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://kaamkitpro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "KaamKitPro - Free Online Tools",
    template: "%s | KaamKitPro",
  },

  description:
    "KaamKitPro provides free online tools for PDF, images, calculators, text, SEO, social media, developer utilities and everyday digital work.",

  keywords: [
    "free online tools",
    "online tools",
    "PDF tools",
    "image tools",
    "word counter",
    "character counter",
    "QR code generator",
    "password generator",
    "GST calculator",
    "EMI calculator",
    "SIP calculator",
    "JSON formatter",
    "Base64 encoder decoder",
    "UUID generator",
    "SEO tools",
    "developer tools",
  ],

  authors: [{ name: "KaamKitPro" }],
  creator: "KaamKitPro",
  publisher: "KaamKitPro",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "KaamKitPro - Free Online Tools",
    description:
      "Free online tools for PDF, images, calculators, text, SEO, social media, developer utilities and everyday digital work.",
    url: siteUrl,
    type: "website",
    siteName: "KaamKitPro",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "KaamKitPro - Free Online Tools",
    description:
      "Useful free online tools for everyday digital work.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KaamKitPro",
  url: siteUrl,
  description: "Free online tools for everyday digital work.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KaamKitPro",
  url: siteUrl,
  description:
    "KaamKitPro provides free online tools for everyday digital work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteSchema)}
        </Script>

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(organizationSchema)}
        </Script>

        {/* Google AdSense verification / ad serving script */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6738934686699082"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M9190XP42G"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M9190XP42G');
          `}
        </Script>
      </body>
    </html>
  );
}
