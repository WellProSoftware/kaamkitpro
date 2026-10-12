# Cloudflare Workers Free staging deployment

The staging workflow validates the `cloudflare/vinext-staging` branch and can deploy only to the isolated `kaamkitpro-staging` Worker on `workers.dev`.

## Deployment safeguards

- Keep all work on `cloudflare/vinext-staging`.
- The deploy job verifies the Worker name and rejects custom routes/domains before deploying.
- Staging must keep `KAAMKITPRO_STAGING=true`, free-only access, ads disabled, and staging SEO exclusions.
- Deployment requires the repository's staging Supabase service-role secret. If it is missing, the workflow must fail closed.
- The post-deploy gate checks key tool routes, `/api/access`, `/robots.txt`, and `/ads.txt`, followed by authenticated quota regression checks with a disposable user.
- Never add the production domain, production DNS, Vercel deployment, or live checkout/payment routes to this workflow.
- Do not enable paid Cloudflare add-ons or paid plans as part of staging work.

## Release procedure

1. Review the successful validation job for the exact staging commit.
2. Trigger deployment only after validation succeeds.
3. Confirm the deployment job and all post-deploy checks pass before treating staging as updated.
4. If a deployment check fails, stop and investigate; do not redirect production traffic.

The workflow's push-based deployment trigger requires the commit message to include `[deploy-staging]`; otherwise, a normal push runs validation only. Manual dispatch is also supported when `deploy_to_workers_dev=true`.
