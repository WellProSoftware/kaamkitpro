"use client";
import Link from "next/link";

import { useState } from "react";

export default function GSTCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const numericAmount = Number(amount);
  const numericRate = Number(gstRate);

  const valid =
    amount !== "" &&
    Number.isFinite(numericAmount) &&
    Number.isFinite(numericRate);

  const gst =
    valid && mode === "add"
      ? (numericAmount * numericRate) / 100
      : valid
        ? numericAmount - numericAmount / (1 + numericRate / 100)
        : 0;

  const baseAmount =
    valid && mode === "remove"
      ? numericAmount - gst
      : numericAmount;

  const total =
    mode === "add"
      ? numericAmount + gst
      : numericAmount;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            GST Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Calculate GST amount, total price and base price instantly.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">
                Amount
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 10000"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                GST Rate
              </label>

              <select
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode("add")}
              className={`rounded-2xl px-5 py-3 font-semibold ${
                mode === "add"
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-700"
              }`}
            >
              Add GST
            </button>

            <button
              onClick={() => setMode("remove")}
              className={`rounded-2xl px-5 py-3 font-semibold ${
                mode === "remove"
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-700"
              }`}
            >
              Remove GST
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm text-slate-500">
                Base Amount
              </p>
              <p className="mt-2 text-2xl font-bold">
                ₹{valid ? baseAmount.toFixed(2) : "0.00"}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm text-slate-500">
                GST Amount
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                ₹{valid ? gst.toFixed(2) : "0.00"}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-slate-500">
                Total Amount
              </p>
              <p className="mt-2 text-2xl font-bold text-orange-600">
                ₹{valid ? total.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use GST Calculator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Amount enter karo.</li>
            <li>GST rate select karo.</li>
            <li>Add GST ya Remove GST choose karo.</li>
            <li>Result automatically calculate ho jayega.</li>
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