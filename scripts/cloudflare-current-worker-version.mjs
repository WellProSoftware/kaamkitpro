const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
const worker = process.env.WORKER_NAME || "kaamkitpro-staging";
if (!accountId || !token) throw new Error("Cloudflare account ID and API token are required");

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${worker}/deployments`,
  { headers: { authorization: `Bearer ${token}` } },
);
const payload = await response.json();
if (!response.ok || !payload.success) {
  throw new Error(`Could not read Worker deployments: HTTP ${response.status} ${JSON.stringify(payload.errors || [])}`);
}
const deployments = [...(payload.result || [])].sort(
  (a, b) => new Date(b.created_on || 0).getTime() - new Date(a.created_on || 0).getTime(),
);
const latest = deployments[0];
const active = latest?.versions?.find((version) => Number(version.percentage) === 100) || latest?.versions?.[0];
if (!active?.version_id) throw new Error("No active staging Worker version was returned by Cloudflare");
console.log(active.version_id);
if (process.env.GITHUB_OUTPUT) {
  const fs = await import("node:fs");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${active.version_id}\n`);
}
