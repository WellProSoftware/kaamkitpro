import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a QR Code Online",
  description:
    "Learn how to create a QR code online for websites, text, contact details and other digital information.",
  alternates: {
    canonical: "https://kaamkitpro.com/guides/qr-code",
  },
};

export default function QrCodeGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            KaamKitPro
          </Link>

          <Link
            href="/guides"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← All Guides
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            QR Code Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            How to Create a QR Code Online
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            QR codes make it easy for people to open digital information using
            a smartphone camera. You can create one for a website, text,
            contact information or another supported piece of content.
          </p>

          <div className="mt-8">
            <Link
              href="/tools/qr-code-generator"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Create a QR Code
            </Link>
          </div>

          <AdSlot />

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">
                1. Open the QR Code Generator
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Open the KaamKitPro QR Code Generator from any modern web
                browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                2. Enter the information
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Enter the website address, text or other information you want
                the QR code to contain. Double-check the content before
                generating the code.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                3. Generate the QR code
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Generate the QR code and check the result. Make sure the code
                is clear enough to scan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                4. Test before sharing
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                Always scan the QR code with a phone before printing it or
                sharing it publicly. This helps confirm that the encoded
                information works as expected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">
                Common uses for QR codes
              </h2>

              <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>Sharing website links</li>
                <li>Restaurant or product information</li>
                <li>Event pages and registration links</li>
                <li>Business contact information</li>
                <li>Printed marketing materials</li>
                <li>Quick access to digital resources</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-2xl font-bold">
                Tip: Keep the destination correct
              </h2>

              <p className="mt-3 leading-8 text-slate-600">
                A QR code normally contains the information you entered when
                generating it. If you are using a website URL, check the URL
                carefully before printing or distributing the QR code.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
