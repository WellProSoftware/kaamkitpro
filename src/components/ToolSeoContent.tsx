import Link from "next/link";

type ToolSeoContentProps = {
  title: string;
  description: string;
  howToUse: string[];
  benefits: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedTools?: Array<{
    href: string;
    label: string;
  }>;
};

export default function ToolSeoContent({
  title,
  description,
  howToUse,
  benefits,
  faq,
  relatedTools = [],
}: ToolSeoContentProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="mx-auto mt-10 max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          How to Use This Tool
        </h2>

        <ol className="mt-4 space-y-3">
          {howToUse.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Why Use KaamKitPro?
        </h2>

        <ul className="mt-4 space-y-3">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {relatedTools.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Related Tools
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <summary className="cursor-pointer font-medium text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </section>
  );
}
