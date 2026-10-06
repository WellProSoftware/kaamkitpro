"use client";

import { useState } from "react";

export default function EMICalculatorPage() {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const principal = Number(loan);
  const annualRate = Number(rate);
  const months = Number(years) * 12;

  const monthlyRate = annualRate / 12 / 100;

  const emi =
    principal > 0 && annualRate > 0 && months > 0
      ? (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : principal > 0 && months > 0
        ? principal / months
        : 0;

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            EMI Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Calculate your monthly loan EMI, total interest and total payment.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold">
                Loan Amount (₹)
              </label>

              <input
                type="number"
                value={loan}
                onChange={(e) => setLoan(e.target.value)}
                placeholder="e.g. 1000000"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Interest Rate (%)
              </label>

              <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 8.5"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Loan Tenure (Years)
              </label>

              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g. 20"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-6">
              <p className="text-sm text-slate-500">
                Monthly EMI
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                ₹{emi.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-6">
              <p className="text-sm text-slate-500">
                Total Interest
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-600">
                ₹{Math.max(0, totalInterest).toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-6">
              <p className="text-sm text-slate-500">
                Total Payment
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-600">
                ₹{totalPayment.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use EMI Calculator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Loan amount enter karo.</li>
            <li>Annual interest rate enter karo.</li>
            <li>Loan tenure years mein enter karo.</li>
            <li>Monthly EMI automatically calculate hogi.</li>
          </ol>
        </section>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            ← Back to KaamKitPro
          </a>
        </div>
      </div>
    </main>
  );
}