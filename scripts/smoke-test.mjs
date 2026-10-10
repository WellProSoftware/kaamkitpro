const baseUrl = (process.env.SMOKE_BASE_URL || "https://kaamkitpro.com").replace(/\/$/, "");

const checks = [
  { path: "/", expected: ["KaamKitPro"] },
  { path: "/tools", expected: ["Tools"] },
  { path: "/tools/pdf", expected: ["PDF"] },
  { path: "/tools/image", expected: ["Image"] },
  { path: "/tools/pdf-merge", expected: ["PDF Merge"] },
  { path: "/tools/percentage-calculator", expected: ["Percentage Calculator"] },
  { path: "/tools/og-preview-generator", expected: ["OG Preview Generator"] },
  { path: "/privacy-policy", expected: ["Privacy Policy"] },
  { path: "/terms", expected: ["Terms"] },
  { path: "/contact", expected: ["Contact"] },
  { path: "/disclaimer", expected: ["Disclaimer"] },
  { path: "/tools/pdf-split", expected: ["PDF Split"] },
  { path: "/tools/pdf-rotate", expected: ["PDF Rotate"] },
  { path: "/tools/pdf-page-number", expected: ["Page Number"] },
  { path: "/tools/pdf-watermark", expected: ["Watermark"] },
  { path: "/tools/pdf-metadata", expected: ["Metadata"] },
  { path: "/tools/pdf-extract-text", expected: ["Extract"] },
  { path: "/tools/image-compressor", expected: ["Image Compressor"] },
  { path: "/tools/image-rotate", expected: ["Image Rotate"] },
  { path: "/tools/image-grayscale", expected: ["Grayscale"] },
  { path: "/tools/image-flip", expected: ["Image Flip"] },
  { path: "/tools/image-brightness", expected: ["Brightness"] },
  { path: "/sitemap.xml", expected: ["<urlset", "https://kaamkitpro.com/tools/percentage-calculator"] },
  { path: "/ads.txt", expected: ["google.com, pub-6738934686699082, DIRECT, f08c47fec0942fa0"] },
  { path: "/robots.txt", expected: ["Sitemap:"] },
];

let failures = 0;

for (const check of checks) {
  const url = `${baseUrl}${check.path}`;

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      headers: { "user-agent": "KaamKitPro-SmokeTests/1.0" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const body = await response.text();
    const missing = check.expected.filter((marker) => !body.toLowerCase().includes(marker.toLowerCase()));

    if (missing.length > 0) {
      throw new Error(`Expected content missing: ${missing.join(", ")}`);
    }

    console.log(`PASS ${check.path} (HTTP ${response.status})`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`\nSmoke tests: ${checks.length - failures}/${checks.length} passed.`);

if (failures > 0) {
  process.exitCode = 1;
}
