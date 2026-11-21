import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About KaamKitPro | Practical Online Tools",
  description:
    "Learn what KaamKitPro offers, who its online tools are designed for, how to choose the right utility, and how to share feedback.",
  alternates: { canonical: "https://kaamkitpro.com/about" },
};

const offerings = [
  {
    title: "PDF document tools",
    description:
      "Work with common PDF tasks such as merging documents, splitting pages, rotating files, adding page numbers or watermarks, and converting between PDF and image formats.",
    examples: "PDF Merge, PDF Split, PDF Rotate, PDF Watermark, PDF to JPG",
  },
  {
    title: "Image utilities",
    description:
      "Make everyday image adjustments for sharing and document workflows, including resizing, cropping, rotating, flipping, brightness changes, grayscale conversion and format conversion.",
    examples: "Image Resizer, Image Cropper, Image Rotate, Image Converter",
  },
  {
    title: "Everyday calculators",
    description:
      "Use straightforward calculators for common estimates. Enter your own values, review the assumptions shown by each calculator, and verify important results before relying on them.",
    examples: "GST Calculator, BMI Calculator, Age Calculator, SIP Calculator",
  },
  {
    title: "Business and data utilities",
    description:
      "Use focused utilities for structured work, including matching purchase descriptions against an item master and combining spreadsheet data.",
    examples: "Item Master Matcher, Excel Combiner",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            About KaamKitPro
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Practical tools for the work you do every day.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            KaamKitPro brings useful browser-based utilities and focused
            productivity tools together in one place. The aim is to help people
            complete common document, image, calculation and data tasks without
            having to learn complicated software for every small job.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9">
              <h2 className="text-2xl font-bold">What the platform is for</h2>
              <p className="mt-4 leading-8 text-slate-600">
                Everyday digital work often involves several small steps:
                preparing a PDF, adjusting an image, checking a calculation,
                or organising information in a spreadsheet. KaamKitPro is
                organised around these practical tasks so visitors can find a
                relevant utility, understand what it does, and use it directly
                from a web browser.
              </p>
              <p className="mt-4 leading-8 text-slate-600">
                The platform is intended for students, office teams,
                professionals, creators, developers, small businesses and
                anyone who needs a convenient tool for a specific task. Each
                tool has its own purpose and should be selected according to
                the job and the file or information being handled.
              </p>
            </section>

            <section>
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                  Explore by task
                </p>
                <h2 className="mt-2 text-2xl font-bold">What you can do with KaamKitPro</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  These examples describe the kinds of tasks covered by the
                  current tool collection. Available features can vary by tool.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {offerings.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                  >
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                    <p className="mt-4 border-t border-slate-100 pt-4 text-xs font-medium leading-6 text-slate-500">
                      Examples: {item.examples}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9">
              <h2 className="text-2xl font-bold">How to use a tool responsibly</h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-slate-600">
                <li>Choose a tool that matches the task you need to complete.</li>
                <li>Read the instructions and check supported file types or input limits before starting.</li>
                <li>Review the result before downloading, sharing or using it elsewhere.</li>
                <li>Keep an original copy of important documents and verify critical calculations independently.</li>
              </ol>
              <p className="mt-5 leading-7 text-slate-600">
                Do not upload confidential, sensitive or legally protected
                information unless you have reviewed the relevant tool,
                understand how it processes data, and are authorised to use
                that information. For details, read our{" "}
                <a className="font-semibold text-blue-700 underline underline-offset-4" href="/privacy-policy">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a className="font-semibold text-blue-700 underline underline-offset-4" href="/disclaimer">
                  Disclaimer
                </a>.
              </p>
            </section>

            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9">
              <h2 className="text-2xl font-bold">Accuracy, feedback and improvements</h2>
              <p className="mt-4 leading-8 text-slate-600">
                Tools are designed for specific tasks, and their outputs depend
                on the information supplied, the selected options and the
                supported file format. A successful download does not by
                itself confirm that a document or calculation is suitable for
                a high-stakes decision. Please inspect generated files and
                independently verify important financial, medical, legal or
                business results.
              </p>
              <p className="mt-4 leading-8 text-slate-600">
                Feedback helps identify unclear instructions, unexpected
                results and missing capabilities. If a tool does not behave as
                expected, contact the support team with the tool name, the
                steps you followed and a description of the issue. Do not send
                passwords, payment details or sensitive source files in a
                support message.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Contact Support
              </a>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-lg font-bold">Quick links</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm font-medium text-blue-800">
              <a className="hover:underline" href="/">Explore all tools</a>
              <a className="hover:underline" href="/contact">Contact and feedback</a>
              <a className="hover:underline" href="/privacy-policy">Privacy Policy</a>
              <a className="hover:underline" href="/terms">Terms and Conditions</a>
              <a className="hover:underline" href="/disclaimer">Disclaimer</a>
            </nav>
            <div className="mt-7 border-t border-blue-200 pt-5">
              <p className="text-sm leading-6 text-slate-600">
                Need help with a tool? Email{" "}
                <a className="font-semibold text-blue-800 underline" href="mailto:support@kaamkitpro.com">
                  support@kaamkitpro.com
                </a>.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
