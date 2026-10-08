import BrandLogo from "@/components/BrandLogo";
export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <BrandLogo />

          <a
            href="/"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Home
          </a>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Disclaimer
          </h1>

          <p className="mt-5 text-sm text-slate-500">
            Last updated: October 7, 2026
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            The information and tools provided by KaamKitPro are intended
            for general informational and productivity purposes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              1. General Information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro provides online tools, calculators and utilities
              designed to help users complete common digital tasks.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Although we aim to keep our tools useful and accurate, we do
              not guarantee that all information, calculations or results
              will always be complete, current or error-free.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              2. Financial Disclaimer
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Financial calculators available on KaamKitPro, including EMI,
              GST, SIP and percentage-related tools, provide estimates based
              on user-provided information and mathematical formulas.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              These results are not financial, investment, tax, accounting
              or professional advice. Always verify important financial
              information with a qualified professional or the relevant
              official source before making financial decisions.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              3. Health Disclaimer
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Health-related calculators, such as the BMI Calculator, are
              provided for general informational purposes only.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              They are not a substitute for medical advice, diagnosis or
              treatment from a qualified healthcare professional.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              4. No Guarantee
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro does not guarantee that the website, tools or
              information will always be available, uninterrupted,
              completely secure or free from errors.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Users should independently verify important results before
              relying on them.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              5. External Links and Third-Party Services
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              KaamKitPro may eventually contain links to third-party
              websites or use third-party services.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              We are not responsible for the content, availability,
              security, privacy practices or policies of third-party
              websites and services.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-2xl font-bold">
              6. User Responsibility
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Users are responsible for how they use the information and
              results provided by KaamKitPro.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Important decisions should not be based solely on results
              generated by an online calculator or utility.
            </p>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">
              7. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              If you have questions about this Disclaimer or any KaamKitPro
              tool, please visit our Contact Us page.
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
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-slate-500">
          <p>© 2026 KaamKitPro. All rights reserved.</p>

          <p className="mt-2">
            Har Digital Kaam, Ek Jagah.
          </p>
        </div>
      </footer>
    </main>
  );
}