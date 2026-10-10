import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "How to Calculate GST on a Price",
  description: "Understand GST-inclusive and GST-exclusive prices with simple examples, formulas, and checks before using an online GST calculator.",
  alternates: { canonical: "https://kaamkitpro.com/guides/gst-calculator" },
};

export default function GstCalculatorGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><BrandLogo /><Link href="/guides" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← All Guides</Link></div></header>
      <article className="mx-auto max-w-4xl px-6 py-12"><div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Calculator Guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How to Calculate GST on a Price</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">Goods and Services Tax (GST) calculations commonly start with one of two questions: how much tax should be added to a base price, or how much tax is already included in a final price? Knowing which price you have prevents a common calculation error.</p>
        <div className="mt-8"><Link href="/tools/gst-calculator" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Open GST Calculator</Link></div>
        <AdSlot />
        <div className="mt-12 space-y-9">
          <section><h2 className="text-2xl font-bold">GST added to a base price</h2><p className="mt-3 leading-8 text-slate-600">When the price does not include GST, calculate tax by multiplying the base amount by the applicable GST rate. For example, if a hypothetical taxable amount is ₹1,000 and the applicable rate is 18%, GST is ₹1,000 × 0.18 = ₹180, and the total is ₹1,180. Confirm the correct rate for the specific goods or services before using a result.</p></section>
          <section><h2 className="text-2xl font-bold">GST already included in the total</h2><p className="mt-3 leading-8 text-slate-600">When a total already includes GST, do not simply multiply the total by the rate. Use the inclusive-price formula: tax portion = total × rate ÷ (100 + rate). For a hypothetical total of ₹1,180 at 18%, the tax portion is ₹1,180 × 18 ÷ 118 = ₹180 and the pre-tax value is ₹1,000.</p></section>
          <section><h2 className="text-2xl font-bold">Understanding CGST, SGST and IGST</h2><p className="mt-3 leading-8 text-slate-600">For many intra-state taxable supplies, the applicable GST is split into Central GST (CGST) and State GST (SGST). For many inter-state supplies, Integrated GST (IGST) applies. The correct treatment depends on the transaction and applicable rules, so do not infer the tax treatment solely from the percentage.</p></section>
          <section><h2 className="text-2xl font-bold">Steps to check a calculation</h2><ol className="mt-4 list-decimal space-y-2 pl-6 leading-8 text-slate-600"><li>Decide whether the entered amount is tax-exclusive or tax-inclusive.</li><li>Enter the amount and the applicable rate in the calculator.</li><li>Check the displayed tax and final amount against the formula.</li><li>Keep invoice rounding and any applicable exemptions or special rules in mind.</li></ol></section>
          <section className="rounded-2xl bg-slate-50 p-6"><h2 className="text-2xl font-bold">Important note</h2><p className="mt-3 leading-8 text-slate-600">This guide is educational and is not tax, accounting, or legal advice. GST rates and treatment can vary by supply and may change. For invoices, filings, and business decisions, verify current requirements with official tax guidance or a qualified professional.</p></section>
          <section><h2 className="text-2xl font-bold">Related calculators</h2><p className="mt-3 leading-8 text-slate-600">For other everyday estimates, try the percentage calculator or EMI calculator. Each result depends on the values and assumptions entered.</p><div className="mt-4 flex flex-wrap gap-4"><Link href="/tools/percentage-calculator" className="font-semibold text-blue-600 hover:text-blue-800">Percentage Calculator →</Link><Link href="/tools/emi-calculator" className="font-semibold text-blue-600 hover:text-blue-800">EMI Calculator →</Link></div></section>
        </div>
      </div></article>
    </main>
  );
}
