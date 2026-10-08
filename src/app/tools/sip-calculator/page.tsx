"use client";
import Link from "next/link";

import { useState } from "react";

export default function SIPCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [years, setYears] = useState("10");

  const investment = Number(monthlyInvestment);
  const yearlyReturn = Number(annualReturn);
  const duration = Number(years);

  const months = duration * 12;
  const monthlyRate = yearlyReturn / 12 / 100;

  const futureValue =
    investment > 0 && months > 0
      ? monthlyRate > 0
        ? investment *
          (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate))
        : investment * months
      : 0;

  const totalInvested = investment * months;
  const estimatedReturns = futureValue - totalInvested;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            SIP Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Estimate your SIP investment value, total investment and
            potential returns.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold">
                Monthly Investment (₹)
              </label>

              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) =>
                  setMonthlyInvestment(e.target.value)
                }
                placeholder="e.g. 5000"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Expected Return (%)
              </label>

              <input
                type="number"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                placeholder="e.g. 12"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Investment Period (Years)
              </label>

              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g. 10"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-6">
              <p className="text-sm text-slate-500">
                Invested Amount
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                ₹{totalInvested.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-6">
              <p className="text-sm text-slate-500">
                Estimated Returns
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-600">
                ₹{Math.max(0, estimatedReturns).toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-6">
              <p className="text-sm text-slate-500">
                Future Value
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-600">
                ₹{futureValue.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <p className="text-sm leading-6 text-slate-600">
              This calculator provides an estimate based on the return rate
              entered. Actual investment returns can vary.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use SIP Calculator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Monthly investment amount enter karo.</li>
            <li>Expected annual return enter karo.</li>
            <li>Investment period years mein enter karo.</li>
            <li>Estimated returns aur future value dekho.</li>
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
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools/calculators"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Browse all Calculator tools
        </Link>
      </div>

    </main>
  );
}