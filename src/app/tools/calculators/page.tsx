import Link from "next/link";

const tools = [
  {
    href: "/tools/percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate percentages and common percentage problems quickly.",
  },
  {
    href: "/tools/gst-calculator",
    title: "GST Calculator",
    description: "Calculate GST amounts and final prices online.",
  },
  {
    href: "/tools/emi-calculator",
    title: "EMI Calculator",
    description: "Calculate monthly loan EMI, interest and total payment.",
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
    "Free online calculators for percentage, GST, EMI, age, BMI and SIP calculations.",
  keywords: [
    "online calculators",
    "free calculators",
    "percentage calculator",
    "GST calculator",
    "EMI calculator",
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
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back to KaamKitPro
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Calculators
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free Online Calculators
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Simple calculators for everyday finance, health and percentage
            calculations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900 group-hover:underline">
                {tool.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-slate-900">
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
              For loan planning, use the{" "}
              <Link
                href="/tools/emi-calculator"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                EMI Calculator
              </Link>
              . For investments, the{" "}
              <Link
                href="/tools/sip-calculator"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                SIP Calculator
              </Link>{" "}
              can help estimate potential returns.
            </p>

            <p className="leading-7">
              For business pricing and tax calculations, use the{" "}
              <Link
                href="/tools/gst-calculator"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                GST Calculator
              </Link>{" "}
              or{" "}
              <Link
                href="/tools/percentage-calculator"
                className="font-medium text-slate-900 underline underline-offset-4"
              >
                Percentage Calculator
              </Link>
              .
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
