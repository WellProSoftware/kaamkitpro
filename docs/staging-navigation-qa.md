# Staging navigation and footer QA

The staging preview uses one shared responsive site header and a single preview-specific content section, avoiding duplicate navigation bars. The preview banner identifies the environment as "STAGING PREVIEW" and states that it is not the live website and payments are test-only.

The staging preview includes desktop and mobile navigation, direct links to the major product sections, and a footer with company, support, and legal links. All 29 curated tool links were matched against actual route page files.

Latest full CI validation passed:
- Vinext compatibility and build
- TypeScript, sitemap route coverage, lint, and original Next.js build
- Browser regression checks passed on the refreshed preview source
- Preview navigation and staging banner assertions passed

Production remains outside the deployment target. The public staging URL is noindex but not password protected. No production domain, DNS, Worker, database, email, analytics, advertising, or live payment configuration is changed by this staging workflow.

## Visual refresh

- Updated the isolated `/platform-preview` hero, workspace showcase, tool cards and digital product cards with a more distinctive dark navy and cyan visual direction.
- Production homepage, domain, DNS, payment configuration and production data were not changed.
- Visual acceptance still requires browser review on the deployed staging preview.
