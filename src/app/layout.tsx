import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KaamKitPro - Free Online Tools",
    template: "%s | KaamKitPro",
  },
  description:
    "KaamKitPro provides free online tools for text, calculators, developer utilities, QR codes, passwords and everyday digital work.",
  keywords: [
    "free online tools",
    "online tools",
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
    "timestamp converter",
  ],
  authors: [{ name: "KaamKitPro" }],
  creator: "KaamKitPro",
  metadataBase: new URL("https://kaamkitpro.com"),
  openGraph: {
    title: "KaamKitPro - Free Online Tools",
    description:
      "Useful free online tools for everyday digital work.",
    type: "website",
    siteName: "KaamKitPro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

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