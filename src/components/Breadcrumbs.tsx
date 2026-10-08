import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://kaamkitpro.com/",
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.label,
      ...(item.href
        ? {
            item: `https://kaamkitpro.com${item.href}`,
          }
        : {}),
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 hover:underline"
              >
                Home
              </Link>
            </li>

            {items.map((item, index) => (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                <span aria-hidden="true">/</span>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-slate-700"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
