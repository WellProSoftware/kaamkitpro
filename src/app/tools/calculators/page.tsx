import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const tools = [
  {
    href: "/tools/gst-calculator",
    title: "GST Calculator",
    description: "Calculate GST amounts and final prices online.",
  },
  {
    href: "/tools/age-calculator",
    title: "Age Calculator",
    description: "Calculate age from a date of birth.",
  },
  {
    href: "/tools/bmi-calculator",
    title: "BMI Calculator",
    description: "Calculate Body Mass Index using height and weight.",
  },
  {
    href: "/tools/sip-calculator",
    title: "SIP Calculator",
    description: "Estimate potential SIP investment growth and returns.",
  },
];

export const metadata = {
  title: "Free Online Calculators",
  description:
    "Free online calculators for GST, age, BMI and SIP calculations.",
  keywords: [
    "online calculators",
    "free calculators",
    "GST calculator",
    "age calculator",
    "BMI calculator",
    "SIP calculator",
  ],
  alternates: {
    canonical: "https://kaamkitpro.com/tools/calculators",
  },
};

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <Breadcrumbs
        items={[
        { label: "Tools", href: "/tools" },
        { label: "Calculators" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-slate-800 bg-[#101d3a] text-white">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-100/70 transition hover:text-white"
          >
            ← Back to KaamKitPro
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-sky-300">
            Calculators
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Free Online Calculators
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100/80 sm:text-lg">
            Simple calculators for everyday finance, health and percentage
            calculations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/[0.07]"
            >
              <h2 className="text-lg font-extrabold text-slate-900 transition group-hover:text-blue-700">
                {tool.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-5 inline-flex text-sm font-bold text-blue-700">
                Open calculator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Choose the right calculator
          </h2>

          <div className="mt-6 space-y-5 text-slate-600">
            <p className="leading-7">
              Use the GST Calculator for business pricing and tax calculations.
            </p>

            <p className="leading-7">
              For everyday personal calculations, try the{" "}
              <Link
                href="/tools/age-calculator"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                Age Calculator
              </Link>{" "}
              or{" "}
              <Link
                href="/tools/bmi-calculator"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                BMI Calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
