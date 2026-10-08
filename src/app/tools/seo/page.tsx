import Link from "next/link";

const tools = [
  {
    href: "/tools/meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate useful HTML meta tags for your website pages.",
  },
  {
    href: "/tools/meta-description-generator",
    name: "Meta Description Generator",
    description: "Create concise search-friendly meta description ideas.",
  },
  {
    href: "/tools/keyword-density-checker",
    name: "Keyword Density Checker",
    description: "Check keyword frequency and density in your content.",
  },
  {
    href: "/tools/slug-generator",
    name: "Slug Generator",
    description: "Create clean, readable and SEO-friendly URL slugs.",
  },
  {
    href: "/tools/sitemap-generator",
    name: "Sitemap Generator",
    description: "Generate an XML sitemap structure for website URLs.",
  },
];

export default function SeoToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            KaamKitPro SEO Tools
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Free SEO Tools Online
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Free SEO utilities for website owners, bloggers, creators,
            marketers and developers. Generate meta tags, improve URL slugs,
            check keyword density and create sitemap content online.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {tool.name}
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Use tool →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-7">
          <h2 className="text-2xl font-bold">
            Simple SEO tools for website optimization
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Search engine optimization involves many small tasks, from
            preparing page metadata and readable URLs to reviewing keyword
            usage and creating sitemap files. KaamKitPro brings these focused
            utilities together in one place.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Start with the{" "}
            <Link
              href="/tools/meta-tag-generator"
              className="font-semibold text-blue-600 hover:underline"
            >
              Meta Tag Generator
            </Link>{" "}
            for page metadata, use the{" "}
            <Link
              href="/tools/slug-generator"
              className="font-semibold text-blue-600 hover:underline"
            >
              Slug Generator
            </Link>{" "}
            for clean URLs, and check content with the{" "}
            <Link
              href="/tools/keyword-density-checker"
              className="font-semibold text-blue-600 hover:underline"
            >
              Keyword Density Checker
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-7">
          <h2 className="text-2xl font-bold">SEO workflow</h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700">
            <li>Prepare your page title and meta description.</li>
            <li>Create a clean and readable URL slug.</li>
            <li>Review important keyword usage in your content.</li>
            <li>Generate or update your website sitemap.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
