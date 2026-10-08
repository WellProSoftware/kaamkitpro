import BrandLogo from "@/components/BrandLogo";
export default function AboutPage() {
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
            About KaamKitPro
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Har Digital Kaam, Ek Jagah.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            KaamKitPro is a collection of simple, useful and easy-to-use
            online tools designed to make everyday digital work faster.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold">
            What is KaamKitPro?
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            KaamKitPro is an online tools platform created to bring useful
            digital utilities together in one place. Instead of searching
            for different websites for different small tasks, users can
            find commonly needed tools through one simple platform.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Our tools are designed for students, professionals, creators,
            developers, business owners and everyday internet users who
            need quick solutions for digital tasks.
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold">
            What We Offer
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-bold">Text Tools</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Word counting, character counting, case conversion and
                other text utilities.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-bold">Developer Tools</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                JSON, Base64, UUID, timestamp and other development
                utilities.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-bold">Calculators</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Percentage, GST, EMI, age, BMI, SIP and other useful
                calculators.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-bold">Everyday Utilities</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                QR generation, password generation and more practical
                online tools.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Our Goal
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Our goal is simple: make useful digital tools easy to discover
            and easy to use. We want KaamKitPro to become a reliable
            toolkit for everyday online work.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            We plan to continuously improve existing tools and gradually
            add new tools based on what users need.
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-bold">
            Simple, Fast and Accessible
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <div className="text-3xl">⚡</div>
              <h3 className="mt-3 font-bold">Fast</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tools are designed to complete common tasks quickly.
              </p>
            </div>

            <div>
              <div className="text-3xl">🧰</div>
              <h3 className="mt-3 font-bold">Useful</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Practical tools for real digital work.
              </p>
            </div>

            <div>
              <div className="text-3xl">🌐</div>
              <h3 className="mt-3 font-bold">Online</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Access tools directly through your web browser.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Keep in Touch
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Have a suggestion, feedback or an idea for a useful tool?
            We would love to hear from you.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Contact Us
          </a>
        </section>

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
          <p className="mt-2">Har Digital Kaam, Ek Jagah.</p>
        </div>
      </footer>
    </main>
  );
}