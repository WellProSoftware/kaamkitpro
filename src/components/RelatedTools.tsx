import Link from "next/link";

type RelatedTool = {
  href: string;
  label: string;
  description: string;
};

type RelatedToolsProps = {
  title?: string;
  tools: RelatedTool[];
};

export default function RelatedTools({
  title = "Related Tools",
  tools,
}: RelatedToolsProps) {
  if (!tools.length) {
    return null;
  }

  return (
    <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm"
            >
              <h3 className="font-medium text-slate-900 group-hover:underline">
                {tool.label}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
