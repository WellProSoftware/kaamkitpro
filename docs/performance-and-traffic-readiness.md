# KaamKitPro Performance and Traffic-Readiness Standard

Status: engineering requirements for the isolated staging build. These targets are acceptance criteria, not claims that the current site already meets them.

## Product promise

The site should feel responsive during ordinary use and degrade safely during traffic spikes. No honest engineering plan can promise zero latency or unlimited concurrency: performance depends on the request mix, device/network, Cloudflare plan limits, third-party services, database capacity and actual workload.

## Performance budgets

Measure production-like staging on mobile and desktop. Track p50 and p95 separately; never use a single average to hide slow requests.

- Core Web Vitals target: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile for real-user measurements.
- Initial route: keep client JavaScript and blocking third-party scripts to the minimum; avoid loading analytics/ads in staging.
- Navigation and tool discovery should be static or edge-cacheable wherever possible.
- Every image must have explicit dimensions, responsive sizing and modern formats where supported.
- Avoid global client components for content that can render on the server.
- Tool actions must show immediate progress/feedback and never block navigation unnecessarily.

## Workload separation

1. Static pages, tool directory, help content and product descriptions: prerender where possible and cache at the edge with explicit cache policy.
2. Browser-native tools (text formatting, calculators, QR generation, image transforms and PDF operations where library/device support allows): process locally in the visitor's browser. Do not upload private files unless a tool genuinely requires server processing.
3. Server/API work: keep handlers stateless and short-lived; validate input; enforce payload and execution limits; add request timeouts and bounded concurrency.
4. Database-backed features: use indexed query patterns, pagination, small projections, connection pooling where supported, and strict query timeouts. Never run unbounded table scans or per-item query loops on a page request.
5. Heavy/long-running tasks: use an asynchronous job/queue pattern only when a real server-side workload exists; return a job identifier and progress state rather than holding an HTTP request open.

## Traffic-spike safeguards

- Cache only public, non-personal responses. Never cache account pages, user records, auth responses, private files or personalized output in a shared cache.
- Rate-limit expensive endpoints and authentication-sensitive actions; use clear 429 responses and retry guidance.
- Apply request body size limits, file type validation, page-count/pixel-count limits and execution timeouts.
- Use bounded retries with exponential backoff and jitter only for transient failures and idempotent operations. Do not retry payment, email or mutation actions blindly.
- Protect downstream services with concurrency caps, circuit breakers and graceful fallback responses.
- Return useful error states rather than allowing one failing dependency to take down the whole page.

## Observability and release gates

- Track route status, latency (p50/p95), error rate, cache hit ratio, API latency, database query latency, Worker CPU/duration and throttling.
- Test representative user journeys and actual heavy tools separately.
- Run load tests against the isolated staging Worker only, with explicit request-rate/concurrency caps. Never load-test production without a separately approved plan.
- Test at stepped concurrency (for example 1, 5, 10, 25, 50 concurrent clients), increase only while error rate and latency remain within the budget, and record the first saturation point.
- A passing build is not a passing load test. Publish measured results, test duration, request mix and limits.
- Roll back a staging release automatically when smoke tests fail. Production promotion remains a separate, explicit owner approval.

## Tool-specific performance

- PDF/image operations must avoid unnecessary network uploads and large base64 copies. Prefer File/Blob/ArrayBuffer and release object URLs after use.
- Warn users before processing unusually large files; show progress for long operations; handle memory exhaustion gracefully.
- Lazy-load heavy libraries only on the tool route that needs them.
- Test large-but-supported input sizes on a representative low-memory mobile device.

## Cloudflare Free-tier discipline

Use only capabilities available to the currently configured Free plan. Verify current request, CPU, storage, queue and rate-limit quotas against the account before relying on them. Do not silently add paid services or upgrade plans. If a target exceeds Free-tier limits, document the trade-off and ask before incurring cost.

**Important current Workers Free constraint:** Cloudflare's Workers limits documentation states a 100,000 Worker requests-per-day account limit on the Free plan (resets at midnight UTC); Cloudflare describes Workers as automatically scaling across its global network with no general requests-per-second limit. Once the daily cap is exceeded, requests can receive Error 1027. This is a hard planning constraint for the current zero-budget launch: cache and serve assets efficiently, reduce unnecessary Worker invocations where the deployment architecture permits, monitor daily usage, and do not market the site as unlimited traffic. If measured demand approaches the daily cap, pause and present the free-tier trade-off before any paid upgrade.

## Acceptance checklist

- [ ] Route-level performance baseline on staging (mobile + desktop)
- [ ] Core Web Vitals field measurement plan configured for production only after approval
- [ ] Cache headers verified for public vs private routes
- [ ] Heavy libraries dynamically loaded per tool
- [ ] API input, body-size, timeout and concurrency limits reviewed
- [ ] Database indexes/query plans reviewed for actual hot paths
- [ ] Browser-native tools verified not to upload files unnecessarily
- [ ] Staging-only load test completed and saturation point documented
- [ ] Error/latency/cache metrics and alert thresholds configured
- [ ] Rollback tested on staging
- [ ] No production traffic, DNS, data, auth, email, ads or payments touched

## Honest capacity statement

Do not advertise a maximum number of simultaneous users until measured against a representative workload. "Thousands of visitors" may be easy for cached static pages but very different for PDF conversion, login, database writes or server-side processing. Publish measured capacity by workload type, not one inflated headline number.
