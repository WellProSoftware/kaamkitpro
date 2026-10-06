"use client";

import { useState } from "react";

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const weightValue = Number(weight);
  const heightValue = Number(height);

  const bmi =
    weightValue > 0 && heightValue > 0
      ? weightValue / Math.pow(heightValue / 100, 2)
      : 0;

  let category = "";

  if (bmi > 0 && bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
  } else if (bmi >= 30) {
    category = "Obesity";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            KaamKitPro Calculator
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            BMI Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Calculate Body Mass Index using your height and weight.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">
                Weight (kg)
              </label>

              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Height (cm)
              </label>

              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-blue-50 p-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Your BMI
            </p>

            <p className="mt-2 text-5xl font-bold text-blue-600">
              {bmi > 0 ? bmi.toFixed(1) : "—"}
            </p>

            <p className="mt-4 text-lg font-semibold">
              {category || "Enter your details"}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Underweight</p>
              <p className="mt-1 font-bold">&lt; 18.5</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Normal</p>
              <p className="mt-1 font-bold">18.5–24.9</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Overweight</p>
              <p className="mt-1 font-bold">25–29.9</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Obesity</p>
              <p className="mt-1 font-bold">30+</p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            BMI is a general screening measure and is not a medical diagnosis.
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold">
            How to use BMI Calculator
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Weight kilograms mein enter karo.</li>
            <li>Height centimeters mein enter karo.</li>
            <li>BMI automatically calculate ho jayega.</li>
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