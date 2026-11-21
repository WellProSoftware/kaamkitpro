import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact KaamKitPro | Support and Feedback",
  description:
    "Contact KaamKitPro to report a tool issue, share feedback, or suggest an improvement. Find the information that helps us understand your request.",
  alternates: { canonical: "https://kaamkitpro.com/contact" },
};
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900"><section className="bg-white">
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

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-bold">What to include in a support request</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              To help us understand the issue, include the tool name, the
              browser and device you are using, the steps you followed, and
              what you expected to happen. If an error message appears, copy
              its wording without including passwords, payment details or
              other sensitive information.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Please do not email confidential source documents or personal
              information unless support has specifically requested it and
              you are authorised to share it.
            </p>
          </div>

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
              <a href="mailto:support@kaamkitpro.com" className="text-blue-600 underline underline-offset-4 hover:text-blue-700">support@kaamkitpro.com</a>
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
      </div></main>
  );
}
export const metadata: Metadata = {
  title: "Contact KaamKitPro | Support and Feedback",
  description:
    "Contact KaamKitPro to report a tool issue, share feedback, or suggest an improvement. Find the information that helps us understand your request.",
  alternates: { canonical: "https://kaamkitpro.com/contact" },
};
