# Staging navigation and footer QA

The staging preview uses one shared responsive site header and a single preview-specific content section, avoiding duplicate navigation bars. The preview banner identifies the environment as "STAGING PREVIEW" and states that it is not the live website and payments are test-only.

The staging preview includes desktop and mobile navigation, direct links to the major product sections, and a footer with company, support, and legal links. All 29 curated tool links were matched against actual route page files.

Latest full CI validation passed:
- Vinext compatibility and build
- TypeScript, sitemap route coverage, lint, and original Next.js build
- Browser regression checks: 180 checks completed, 2 skipped, 0 failed
- JPG to PDF two-image conversion and resulting two-page PDF verified
- Preview navigation and staging banner assertions passed

Production remains outside the deployment target. The public staging URL is noindex but not password protected. No production domain, DNS, Worker, database, email, analytics, advertising, or live payment configuration is changed by this staging workflow.
