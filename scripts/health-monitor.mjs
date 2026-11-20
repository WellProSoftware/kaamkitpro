import fs from "node:fs";

const scope = process.env.SCOPE || "all";
const stagingBase = (process.env.STAGING_BASE_URL || "").replace(/\/$/, "");
const productionUrl = process.env.PRODUCTION_URL || "https://kaamkitpro.com/";

if (!stagingBase) throw new Error("STAGING_BASE_URL is required");

async function probe(url, expectedText) {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; KaamKitProHealthMonitor/1.0)" },
      signal: AbortSignal.timeout(12000),
    });
    const body = await response.text();
    const status = response.status;
    const inconclusive = status === 403 || status === 429;
    const ok = inconclusive || (status >= 200 && status < 400 && (!expectedText || body.includes(expectedText)));
    return { url, status, ok, inconclusive, ms: Date.now() - started };
  } catch (error) {
    return { url, status: 0, ok: false, inconclusive: false, ms: Date.now() - started, error: String(error) };
  }
}

const stagingTargets = [
  [`${stagingBase}/`, "KaamKitPro"],
  [`${stagingBase}/platform-preview`, "Vendor Quotation Comparison"],
  [`${stagingBase}/robots.txt`, "Disallow: /"],
  [`${stagingBase}/pricing`, null],
];
const stagingResults = await Promise.all(stagingTargets.map(([url, expected]) => probe(url, expected)));
const stagingHealthy = stagingResults.every((result) => result.ok);

let productionResults = [];
let productionHealthy = true;
if (scope === "all") {
  productionResults = [await probe(productionUrl, null)];
  productionHealthy = productionResults.every((result) => result.ok);
}

const format = (result) =>
  `${result.url} => ${result.status || "ERR"} (${result.ms}ms)${result.inconclusive ? " [inconclusive: edge challenge/rate limit]" : ""}${result.error ? ` [${result.error}]` : ""}`;
const summary = [
  ...productionResults.map(format),
  ...stagingResults.map(format),
].join(" | ");

const output = process.env.GITHUB_OUTPUT;
if (output) {
  fs.appendFileSync(output, `production_healthy=${productionHealthy}\n`);
  fs.appendFileSync(output, `staging_healthy=${stagingHealthy}\n`);
  fs.appendFileSync(output, `summary=${summary.replace(/\n/g, " ")}\n`);
}
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `## KaamKitPro health check\n\n- Production: ${productionHealthy ? "Healthy / no 5xx detected" : "UNHEALTHY"}\n- Staging: ${stagingHealthy ? "Healthy" : "UNHEALTHY"}\n\n${[...productionResults, ...stagingResults].map((result) => `- ${format(result)}`).join("\n")}\n`,
  );
}
console.log(summary);
