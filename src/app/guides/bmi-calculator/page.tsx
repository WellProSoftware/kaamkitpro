import Link from "next/link";
import type { Metadata } from "next";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "How to Calculate BMI: Formula, Example and Limitations",
  description: "Learn the adult BMI formula, how to convert height from centimetres to metres, a worked example, and what BMI can and cannot tell you.",
  alternates: { canonical: "https://kaamkitpro.com/guides/bmi-calculator" },
};

export default function BmiCalculatorGuide() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <BrandLogo />
          <Link href="/guides" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← All Guides</Link>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-7 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Calculator Guide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">How to Calculate BMI</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Body Mass Index (BMI) is a screening measure calculated from a person's weight and height. It can help describe weight relative to height, but it does not directly measure body fat or diagnose a health condition.</p>
          <div className="mt-8">
            <Link href="/tools/bmi-calculator" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Open BMI Calculator</Link>
          </div>

          <div className="mt-12 space-y-9">
            <section>
              <h2 className="text-2xl font-bold">BMI formula</h2>
              <p className="mt-3 leading-8 text-slate-600">For adults using metric units, BMI is weight in kilograms divided by height in metres squared.</p>
              <div className="mt-4 rounded-xl bg-slate-50 p-5 text-center text-lg font-semibold">BMI = weight (kg) ÷ [height (m) × height (m)]</div>
              <p className="mt-3 leading-8 text-slate-600">If your height is entered in centimetres, divide it by 100 before applying the formula. For example, 175 cm is 1.75 m.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Worked example: 70 kg and 175 cm</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-6 leading-8 text-slate-600">
                <li>Convert height: 175 ÷ 100 = 1.75 metres.</li>
                <li>Square the height: 1.75 × 1.75 = 3.0625.</li>
                <li>Divide weight by the squared height: 70 ÷ 3.0625 = 22.86.</li>
              </ol>
              <p className="mt-3 leading-8 text-slate-600">The calculated BMI is approximately 22.9. The KaamKitPro calculator performs this calculation after you enter weight in kilograms and height in centimetres.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Common adult BMI categories</h2>
              <p className="mt-3 leading-8 text-slate-600">The calculator displays these commonly used adult screening ranges:</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead><tr className="border-b"><th className="py-3 pr-4">BMI range</th><th className="py-3">Category shown</th></tr></thead>
                  <tbody>
                    <tr className="border-b"><td className="py-3 pr-4">Below 18.5</td><td className="py-3">Underweight</td></tr>
                    <tr className="border-b"><td className="py-3 pr-4">18.5 to below 25</td><td className="py-3">Normal</td></tr>
                    <tr className="border-b"><td className="py-3 pr-4">25 to below 30</td><td className="py-3">Overweight</td></tr>
                    <tr><td className="py-3 pr-4">30 or above</td><td className="py-3">Obesity</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 leading-8 text-slate-600">These are screening categories, not a personal diagnosis. A BMI value should be interpreted alongside other relevant health information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">What BMI does not tell you</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-8 text-slate-600">
                <li>It does not distinguish muscle from body fat.</li>
                <li>It does not show where body fat is distributed.</li>
                <li>It does not account for every difference related to age, sex, health history or body composition.</li>
                <li>Adult categories should not be applied to children and teenagers; their assessment uses age- and sex-specific methods.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold">How to use the KaamKitPro BMI Calculator</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-6 leading-8 text-slate-600">
                <li>Enter your current weight in kilograms.</li>
                <li>Enter your height in centimetres.</li>
                <li>Review the calculated BMI and the screening category shown.</li>
                <li>Recheck the units and values if the result looks unexpected.</li>
              </ol>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-bold">Health information notice</h2>
              <p className="mt-3 leading-7 text-slate-700">This guide and calculator are for general educational use only. BMI is not a medical diagnosis and should not be used alone to make treatment or nutrition decisions. Speak with a qualified healthcare professional if you have concerns about your health or how to interpret a BMI result.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-4 space-y-4">
                <div><h3 className="font-semibold">Can I enter height in centimetres?</h3><p className="mt-2 leading-7 text-slate-600">Yes. The KaamKitPro BMI Calculator accepts centimetres and uses the equivalent height in metres for the formula.</p></div>
                <div><h3 className="font-semibold">Does BMI measure body fat directly?</h3><p className="mt-2 leading-7 text-slate-600">No. BMI uses weight and height only. It does not directly measure body fat or separate fat mass from muscle mass.</p></div>
                <div><h3 className="font-semibold">Is the adult BMI range suitable for children?</h3><p className="mt-2 leading-7 text-slate-600">No. Children and teenagers need age- and sex-specific BMI interpretation rather than the adult categories listed here.</p></div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
