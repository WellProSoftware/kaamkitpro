"use client";

import { usePathname } from "next/navigation";

type Guide = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  steps: string[];
  faqs: { q: string; a: string }[];
};

const guides: Record<string, Guide> = {  "gst-calculator": {
    title: "GST Calculator",
    intro: "A GST calculator estimates the Goods and Services Tax amount from a base price or helps separate the tax portion from a price that already includes GST. It is useful for quick estimates, but the correct tax treatment depends on the product or service, applicable rules and transaction details.",
    sections: [
      { heading: "GST added to a base amount", body: "When tax is added, multiply the base amount by the GST rate to find the tax amount, then add that tax to the base amount. For example, 5% of ₹1,000 is ₹50, making the illustrative total ₹1,050. This arithmetic example does not determine which GST rate legally applies to a transaction." },
      { heading: "GST included in a total price", body: "When the entered price already includes GST, the tax portion is not calculated by simply multiplying the total by the rate. The tax component is total price × rate ÷ (100 + rate). Check whether you are entering an inclusive or exclusive price before using the result." },
      { heading: "Use for estimates, not tax classification", body: "GST rates and compliance requirements can depend on the nature of supply and other facts. Keep invoices and records, check applicable official guidance, and consult a qualified professional when a calculation affects filing or a business decision." }
    ],
    steps: ["Enter the amount and choose the intended GST rate.", "Choose whether GST should be added to or removed from the entered amount.", "Review the base amount, tax amount and total.", "Confirm the applicable rate and invoice treatment before relying on the estimate."],
    faqs: [
      { q: "What is the difference between adding and removing GST?", a: "Adding GST calculates tax on a base price; removing GST estimates the tax portion already included in a total price." },
      { q: "Does this calculator decide the correct GST rate?", a: "No. It performs arithmetic for the selected rate; the applicable rate must be established separately." },
      { q: "Why may invoice totals differ by a few paise?", a: "Rounding rules and line-by-line versus invoice-level calculations can affect the final amount." }
    ]
  },
  "age-calculator": {
    title: "Age Calculator",
    intro: "An age calculator works out the elapsed time between a date of birth and a selected date, usually expressed in years, months and days. It can help with personal records, forms and date-based planning, provided the dates are entered correctly.",
    sections: [
      { heading: "Enter dates carefully", body: "Check the day, month and year and make sure the date format is clear. If you are calculating age on a date other than today, use the intended reference date rather than assuming the current date." },
      { heading: "Calendar dates matter", body: "Months have different lengths and leap years add an extra day in February, so age in years, months and days is not the same as dividing a total number of days by a fixed number. Results can also differ depending on the convention used for a leap-day birthday." },
      { heading: "Use the right standard for official purposes", body: "For eligibility, legal documents or official applications, follow the rules specified by the relevant authority. A general calculator may not match a specialised legal or administrative definition." }
    ],
    steps: ["Enter the date of birth using the displayed date format.", "Choose a reference date if the tool supports it.", "Run the calculation and review the years, months and days.", "Verify dates against source records when the result is used on an official form."],
    faqs: [
      { q: "Can I calculate age on a past date?", a: "If the tool supports a reference date, enter the date you want to calculate age on." },
      { q: "Why is the result not the same as days divided by 365?", a: "Calendar years and months have different lengths, and leap years affect elapsed days." },
      { q: "Can this result determine official eligibility?", a: "Use the relevant authority's date and eligibility rules for official decisions." }
    ]
  },
  "pdf-split": {
    title: "PDF Splitter",
    intro: "Splitting a PDF separates a document into smaller files or extracts selected pages. It can help share only relevant sections, divide a large document into parts or organise scanned records.",
    sections: [
      { heading: "Choose page ranges deliberately", body: "Confirm whether page numbers refer to the PDF viewer's page index or printed labels shown on the page. Covers, Roman-numeral front matter and inserted pages can make those numbers differ. Review the intended start and end pages before exporting." },
      { heading: "Check the output files", body: "Open each resulting PDF and verify page order, orientation, readability and completeness. If a page contains a form, annotation, bookmark or digital signature, check whether the feature remains available and valid after extraction." },
      { heading: "Respect document privacy", body: "Before processing sensitive files, check the service's privacy and retention practices and make sure you are authorised to upload the content. Keep the original document until every extracted file has been verified." }
    ],
    steps: ["Select the source PDF.", "Choose the page range or split method supported by the tool.", "Create the output files.", "Open the outputs and confirm page ranges, order and readability."],
    faqs: [
      { q: "Can I extract just one page?", a: "If page selection is supported, choose the required page as a single-page range." },
      { q: "Why do the page numbers seem different?", a: "Printed page labels may not match the PDF viewer's page index." },
      { q: "Will splitting preserve digital signatures?", a: "Extracting pages can affect signature validity. Verify signatures with a suitable PDF application." }
    ]
  }
};

export default function ToolEditorialContentBatchThree() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/tools/")) return null;
  const slug = pathname.split("/")[2] || "";
  const guide = guides[slug];
  if (!guide) return null;

  return (
    <section aria-labelledby="tool-guide-three-heading" className="mx-auto mt-8 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="tool-guide-three-heading" className="text-2xl font-bold text-slate-900">{guide.title}: practical guide</h2>
        <p className="mt-4 leading-7 text-slate-700">{guide.intro}</p>
        {guide.sections.map((section) => (
          <div key={section.heading} className="mt-7">
            <h3 className="text-xl font-semibold text-slate-900">{section.heading}</h3>
            <p className="mt-3 leading-7 text-slate-700">{section.body}</p>
          </div>
        ))}
        <h3 className="mt-7 text-xl font-semibold text-slate-900">How to use this tool</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-700">{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <h3 className="mt-7 text-xl font-semibold text-slate-900">Frequently asked questions</h3>
        <div className="mt-3 space-y-5">{guide.faqs.map((faq) => <div key={faq.q}><h4 className="font-semibold text-slate-900">{faq.q}</h4><p className="mt-1 leading-7 text-slate-700">{faq.a}</p></div>)}</div>
        <p className="mt-6 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500">Use these results as general information. Confirm important financial, tax or document requirements with the relevant official source or qualified professional.</p>
      </div>
    </section>
  );
}
