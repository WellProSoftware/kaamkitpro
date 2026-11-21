import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how KaamKitPro handles information, cookies, analytics, advertising, privacy choices and user data.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900"><section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm text-slate-500">
            Last updated: November 21, 2026
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            At KaamKitPro, we respect your privacy and aim to be transparent
            about how our website and online tools may handle information.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              1. Information We Collect
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro provides many browser-based tools that can work
              without requiring users to create an account.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Depending on how you use the website, information may be
              collected automatically by standard website technologies,
              analytics services or advertising services.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We do not intentionally ask users to submit sensitive personal
              information through our ordinary online tools.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              2. Information You Enter Into Tools
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Some KaamKitPro tools process information directly in your
              browser. Examples may include text entered into text tools,
              calculator values and data used by browser-based utilities.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              When a tool is designed to process information locally in the
              browser, that information may not need to be sent to our
              servers.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              However, users should avoid entering passwords, financial
              account information, government identification numbers or
              other highly sensitive information into any online service
              unless specifically required and trusted.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">Accounts and Support Messages</h2>
            <p className="mt-4 leading-7 text-slate-600">
              If you create an account, our authentication service processes account identifiers and the email address associated with your account so that sign-in and account-related features can work. If you use the signed-in support chat, the message you submit, your account identifier, the conversation subject and message timestamps are stored so that the support conversation can be displayed and answered.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Do not include passwords, payment-card details, government identification numbers, confidential business records or sensitive health information in support messages. Access to support conversations should be limited to authorised support personnel and the account holder.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              3. Cookies and Similar Technologies
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro or third-party services used on the website may use
              cookies, local storage, pixels or similar technologies to
              provide functionality, understand website usage, improve
              performance or support advertising.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Your browser may provide controls that allow you to manage or
              block certain cookies.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              4. Privacy Choices and Consent
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              On supported pages, you can choose “Essential only” or accept
              analytics and advertising technologies using the privacy choices
              prompt. Optional analytics and advertising scripts are not loaded
              unless you opt in. If browser storage is unavailable, optional
              tracking remains disabled. Use the persistent “Privacy choices”
              control on the website to reopen this prompt and change your choice.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              5. Analytics
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              When you accept analytics and advertising technologies through our privacy choices, we load Google Analytics to measure website traffic, understand which pages are used and improve the site. Google
              Analytics may process technical and usage information such as
              pages viewed, browser and device details, referral information
              and approximate location, subject to Google&apos;s settings and
              policies.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Analytics information may include browser type, device type,
              approximate location, pages visited, referral information and
              similar technical information.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              6. Advertising
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              On eligible production pages, KaamKitPro may load the Google AdSense
              script only after consent and an access check permit advertising.
              Staging, account and administrative pages keep advertising disabled.
              Whether ads are actually served depends on the site&apos;s advertising
              configuration and provider eligibility or approval; loading the
              script does not guarantee that ads will appear.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Advertising providers may use cookies or similar technologies
              according to their own privacy policies and applicable
              settings.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              7. Third-Party Services
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro uses Supabase for account authentication and the
              database functions used by signed-in features, Cloudflare for
              website hosting and delivery, Google Analytics for usage
              measurement when you opt in, and Google AdSense for advertising
              where enabled and permitted. These providers may process
              information needed to deliver their services under their own
              terms and privacy policies.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Some browser-based document and spreadsheet tools also load
              third-party processing libraries from public content delivery
              networks, including cdnjs.cloudflare.com and cdn.jsdelivr.net.
              Those providers may receive ordinary connection and request
              metadata when your browser downloads a library. In the code
              paths reviewed for PDF Merge, PDF Text Extractor, PDF Compressor,
              PDF/ image document conversion and Excel Combiner, the selected
              file contents are processed in the browser rather than uploaded
              to a KaamKitPro file-processing endpoint. This finding is limited
              to the reviewed tools and does not establish that every current
              or future tool works the same way. Please check each tool&apos;s own
              instructions before using it with confidential files.

              These services may process information according to their own
              terms and privacy policies.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              8. Data Security
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We take reasonable steps to maintain the security of the
              website and protect information handled through our services.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              However, no website or internet transmission can be guaranteed
              to be completely secure.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              9. Children&apos;s Privacy
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro is a general-purpose online tools website. We do
              not intentionally collect personal information from children
              through our ordinary tools.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              10. Changes to This Privacy Policy
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We may update this Privacy Policy when our website, tools,
              services or legal requirements change.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Any updated version will be published on this page with a
              revised update date.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">Data Requests and Retention</h2>
            <p className="mt-4 leading-7 text-slate-600">
              You can contact us to ask about personal information associated with your account or support conversation, or to request correction or deletion. We may need to verify your request and retain limited information where required for security, legal, dispute-resolution or service-integrity purposes. Retention periods depend on the type of record and applicable requirements; we do not currently publish a fixed schedule for every data category.
            </p>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">
              11. Contact
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              If you have questions about this Privacy Policy or how
              KaamKitPro handles information, please visit our Contact Us
              page.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Contact Us
            </a>
          </section>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to KaamKitPro
          </a>
        </div>
      </div></main>
  );
}
