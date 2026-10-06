"use client";

import { useState } from "react";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    if (birth > today) {
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Age Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Calculate your exact age in years, months and days.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <label
            htmlFor="birth-date"
            className="block text-sm font-semibold"
          >
            Date of Birth
          </label>

          <input
            id="birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="button"
            onClick={calculateAge}
            className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Calculate Age
          </button>

          {age ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-6 text-center">
                <p className="text-sm text-slate-500">Years</p>
                <p className="mt-2 text-4xl font-bold text-blue-600">
                  {age.years}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-6 text-center">
                <p className="text-sm text-slate-500">Months</p>
                <p className="mt-2 text-4xl font-bold text-emerald-600">
                  {age.months}
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-6 text-center">
                <p className="text-sm text-slate-500">Days</p>
                <p className="mt-2 text-4xl font-bold text-orange-600">
                  {age.days}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
              Enter your date of birth to calculate your age.
            </div>
          )}
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use Age Calculator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Date of birth select karo.</li>
            <li>Calculate Age button click karo.</li>
            <li>Exact age years, months aur days mein dekho.</li>
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