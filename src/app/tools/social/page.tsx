import Link from "next/link";

const tools = [
  {
    href: "/tools/hashtag-generator",
    title: "Hashtag Generator",
    description: "Generate relevant hashtag ideas for social media posts and campaigns.",
  },
  {
    href: "/tools/youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Create catchy YouTube title ideas for videos, channels and content.",
  },
  {
    href: "/tools/youtube-description-generator",
    title: "YouTube Description Generator",
    description: "Create structured YouTube video descriptions quickly.",
  },
  {
    href: "/tools/instagram-caption-generator",
    title: "Instagram Caption Generator",
    description: "Generate caption ideas for Instagram posts and social content.",
  },
  {
    href: "/tools/og-preview-generator",
    title: "OG Preview Generator",
    description: "Preview Open Graph title, description and image information for shared pages.",
  },
];

export default function SocialToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            KaamKitPro Social Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Free Social Media Tools Online
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Use free online tools to create social media captions, hashtags,
            YouTube titles, video descriptions and Open Graph previews.
            KaamKitPro tools are designed to make everyday content work faster.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {tool.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Free tools for social media creators
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Creating content for YouTube, Instagram and other social platforms
            often involves repetitive tasks such as writing titles, preparing
            descriptions, finding hashtag ideas and checking how links may
            appear when shared. These online utilities help simplify those
            tasks without requiring complicated software.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-slate-900">
            A simple content workflow
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-600">
            <li>Start with a clear topic or content idea.</li>
            <li>Create a title or caption that matches the content.</li>
            <li>Generate relevant hashtags or supporting description text.</li>
            <li>Check your social sharing preview before publishing.</li>
          </ol>

          <p className="mt-6 leading-7 text-slate-600">
            For example, you can use the{" "}
            <Link
              href="/tools/youtube-title-generator"
              className="font-medium text-blue-600 hover:underline"
            >
              YouTube Title Generator
            </Link>{" "}
            for title ideas and the{" "}
            <Link
              href="/tools/hashtag-generator"
              className="font-medium text-blue-600 hover:underline"
            >
              Hashtag Generator
            </Link>{" "}
            to create hashtag suggestions.
          </p>
        </div>
      </section>
    </main>
  );
}
