import BrandLogo from "@/components/BrandLogo";
export default function ContactPage() {
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
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Get in Touch
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Have feedback, a suggestion or an idea for a new tool?
            We would love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold">
            We&apos;d Love to Hear From You
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            If you have feedback about KaamKitPro, found an issue with a
            tool, or have a suggestion for a useful new tool, please get
            in touch with us.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-6">
              <div className="text-3xl">💡</div>

              <h3 className="mt-4 text-lg font-bold">
                Tool Suggestions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tell us which online tool you would like to see on
                KaamKitPro.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-3xl">🐞</div>

              <h3 className="mt-4 text-lg font-bold">
                Report an Issue
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Found a problem or something that does not work as
                expected? Let us know.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Contact Information
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            For general questions, feedback and suggestions, you can
            contact the KaamKitPro team by email.
          </p>

          <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-blue-100">
            <p className="text-sm font-semibold text-slate-500">
              Email
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
              Email address will be added soon.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We are currently setting up the official KaamKitPro contact
              email.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold">
            Before Contacting Us
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-600">
            <li>
              Please describe the issue or suggestion clearly.
            </li>

            <li>
              If reporting a tool problem, mention the tool name.
            </li>

            <li>
              Avoid sending passwords, payment information or other
              sensitive personal information.
            </li>

            <li>
              For tool suggestions, tell us what problem the tool would
              solve for you.
            </li>
          </ul>
        </section>

        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
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