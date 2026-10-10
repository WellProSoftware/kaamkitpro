"use client";

import { useState } from "react";

export default function PercentageCalculatorPage() {
  const [percent, setPercent] = useState("15");
  const [number, setNumber] = useState("200");
  const [part, setPart] = useState("30");
  const [whole, setWhole] = useState("200");
  const [oldValue, setOldValue] = useState("100");
  const [newValue, setNewValue] = useState("125");
  const format = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 6 }).format(value);
  const amount = Number(percent) / 100 * Number(number);
  const ratio = Number(whole) !== 0 ? Number(part) / Number(whole) * 100 : null;
  const change = Number(oldValue) !== 0 ? (Number(newValue) - Number(oldValue)) / Math.abs(Number(oldValue)) * 100 : null;
  const field = (label: string, value: string, setValue: (value: string) => void, placeholder: string) => (
    <label className="block text-sm font-medium text-slate-700">{label}
      <input type="number" inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
    </label>
  );
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <a href="/tools/calculators" className="text-sm font-semibold text-blue-600">← All Calculators</a>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Percentage Calculator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Calculate a percentage of a number, find what percentage one value is of another, and calculate percentage increase or decrease.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">What is X% of Y?</h2>
            <div className="mt-5 grid gap-4">{field("Percentage (%)", percent, setPercent, "e.g. 15")}{field("Number", number, setNumber, "e.g. 200")}</div>
            <div className="mt-5 rounded-xl bg-blue-50 p-5"><p className="text-sm font-medium text-blue-800">Result</p><p className="mt-1 break-words text-3xl font-bold text-blue-900">{percent.trim() && number.trim() && Number.isFinite(amount) ? format(amount) : "—"}</p><p className="mt-2 text-sm text-blue-800">Percentage ÷ 100 × number</p></div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">X is what % of Y?</h2>
            <div className="mt-5 grid gap-4">{field("Part (X)", part, setPart, "e.g. 30")}{field("Whole (Y)", whole, setWhole, "e.g. 200")}</div>
            <div className="mt-5 rounded-xl bg-blue-50 p-5"><p className="text-sm font-medium text-blue-800">Result</p><p className="mt-1 break-words text-3xl font-bold text-blue-900">{ratio === null || !Number.isFinite(ratio) ? "—" : format(ratio) + "%"}</p><p className="mt-2 text-sm text-blue-800">{whole.trim() === "" || Number(whole) === 0 ? "Whole must not be zero." : "Part ÷ whole × 100"}</p></div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
            <h2 className="text-xl font-bold">Percentage increase or decrease</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">{field("Original value", oldValue, setOldValue, "e.g. 100")}{field("New value", newValue, setNewValue, "e.g. 125")}</div>
            <div className="mt-5 rounded-xl bg-blue-50 p-5"><p className="text-sm font-medium text-blue-800">Percentage change</p><p className="mt-1 break-words text-3xl font-bold text-blue-900">{change === null || !Number.isFinite(change) ? "—" : (change > 0 ? "+" : "") + format(change) + "%"}</p><p className="mt-2 text-sm text-blue-800">{change === null ? "Original value must not be zero." : change > 0 ? "Increase" : change < 0 ? "Decrease" : "No change"}</p></div>
          </section>
        </div>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Percentage formulas</h2><ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600"><li>Percentage of a number = (percentage ÷ 100) × number</li><li>What percentage = (part ÷ whole) × 100</li><li>Percentage change = ((new value − original value) ÷ |original value|) × 100</li></ul><p className="mt-4 text-sm leading-6 text-slate-500">Check the inputs and independently verify values used for important financial or business decisions.</p></section>
        <nav className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold text-blue-600"><a href="/tools/gst-calculator">GST Calculator</a><a href="/tools/emi-calculator">EMI Calculator</a><a href="/tools/sip-calculator">SIP Calculator</a><a href="/privacy-policy">Privacy Policy</a></nav>
      </div>
    </main>
  );
}
