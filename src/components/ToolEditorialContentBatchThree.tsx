"use client";

import { usePathname } from "next/navigation";

type Guide = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  steps: string[];
  faqs: { q: string; a: string }[];
};

const guides: Record<string, Guide> = {
  "gst-calculator": {
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
  "emi-calculator": {
    title: "EMI Calculator",
    intro: "An EMI (equated monthly instalment) calculator estimates a fixed monthly loan payment using the principal, interest rate and repayment period. It helps compare possible loan scenarios, but a lender's actual schedule may include fees, insurance, rate changes or other conditions.",
    sections: [
      { heading: "What affects the EMI?", body: "A higher loan amount or interest rate generally increases the EMI, while a longer repayment term generally lowers the monthly payment but can increase total interest paid. Compare both the monthly instalment and total repayment rather than choosing only the smallest EMI." },
      { heading: "Understand the estimate", body: "Many EMI calculators assume a fixed annual interest rate converted to a monthly rate and equal payments over the term. Actual products may use different rate conventions, variable rates, processing charges or repayment rules. Review the lender's official amortisation schedule before committing." },
      { heading: "Borrow within a realistic budget", body: "Consider essential expenses, emergency savings and other debts when assessing affordability. A calculator can compare scenarios but cannot determine whether a loan is suitable for your circumstances." }
    ],
    steps: ["Enter the loan principal, annual interest rate and tenure.", "Check that the tenure unit is months or years as expected.", "Review the estimated EMI and total interest.", "Compare the estimate with the lender's offer and fee schedule."],
    faqs: [
      { q: "Does a longer tenure always save money?", a: "It often reduces the monthly payment but can increase total interest over the life of the loan." },
      { q: "Why is the lender's EMI different?", a: "Fees, rate conventions, dates, insurance or a variable rate can cause differences from a simplified estimate." },
      { q: "Is the calculator a loan approval?", a: "No. It is an estimate and does not assess eligibility or guarantee a lender's terms." }
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
  "password": {
    title: "Password Generator",
    intro: "A password generator creates random character strings that can be used as passwords. Strong, unique passwords help reduce the risk that a password exposed on one service can be reused to access another account.",
    sections: [
      { heading: "Choose length and character options", body: "Longer passwords generally provide more possible combinations. Use the longest password accepted by the service and include a mix of character types when the service supports them. Avoid predictable patterns, personal information, common phrases and simple substitutions." },
      { heading: "Use a password manager", body: "A reputable password manager can generate and store a different password for each account. Do not reuse a generated password across services, and avoid placing passwords in shared documents, chat messages or unprotected notes." },
      { heading: "Protect account access", body: "A strong password is only one part of account security. Enable multifactor authentication where available, keep recovery options current, and never share passwords or one-time codes with someone who contacts you unexpectedly." }
    ],
    steps: ["Choose the password length and supported character options.", "Generate a password and check that it meets the target service's rules.", "Save it directly in a trusted password manager.", "Use a unique password and enable multifactor authentication where possible."],
    faqs: [
      { q: "Should I use the same generated password everywhere?", a: "No. Use a unique password for each account so one exposed password does not unlock other services." },
      { q: "Is a longer password usually stronger?", a: "Length is an important factor when the password is random and not predictable." },
      { q: "Where should I store the password?", a: "Use a trusted password manager rather than an unprotected document or shared note." }
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
