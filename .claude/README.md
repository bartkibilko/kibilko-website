# SEO manager

Original, model-agnostic skills for preparing reviewable SEO work on a personal site. No subscription, account connection or automatic publishing is required. Read `skills/seo-contract/SKILL.md` with every skill. All repository artifacts and public copy use English. These instructions adapt a described process; they are not copies of the article's unseen skill files.

## Rollout and use

1. Start with **seo-contract**, **page-brief**, **ship-page** and **weekly-seo** in no-data mode. Ask for a brief, authorize its local scope, then inspect the exact diff and validation results. Weekly review is on demand and read-only.
2. Add **topic-opportunities** (adapted from money-keywords) and **editorial-queue** (adapted from pattern-drip) to select useful topics with original material. Neither produces automatic pages.
3. Supply Search Console CSV exports first. Consider an API adapter only if manual exports become burdensome.
4. **citation-presence** and ChatSEO are optional. Citation observations do not measure a global rank or business outcome.

The offline check `scripts/seo-check.py` arrives separately with https://github.com/bartkibilko/kibilko-website/pull/14. This change does not copy it. Ship-page and weekly-seo run it when present; otherwise they disclose the missing automated check and perform source checks.

Every run ends at owner review. Skills never push, merge, publish or schedule anything. Merging to `main` publishes the site; approval covers only the exact reviewed version.

## Owner-managed data options

Agents connect nothing. Keep tokens, exports, private reports and drafts outside the repository. Read-only adapters must restrict both property and operations; if restrictions cannot be enforced, use exports.

| Option | What the owner supplies or connects | What access it grants |
| --- | --- | --- |
| Search Console exports — first choice | CSV exports from the verified domain property or existing URL-prefix property, with dates and filters | Access only to the supplied files; no Google token or new provider grant. Shows own-site data, not all market demand. |
| Optional Search Console API | Owner-configured Google Cloud project, enabled API and OAuth client; consent from an account with property access using `webmasters.readonly` | Read analytics and supported indexing diagnostics within account permissions. The scope is not restricted to one domain: the adapter must allowlist the intended property. No site editing. |
| Optional ChatSEO | Owner-selected Pro or higher plan, site/property selection, Google consent and separate MCP OAuth consent | Own-site analytics and provider market estimates. MCP also exposes mutation tools, so a property/tool allowlist must block publishing, deletion, sharing and integration changes. Fall back to exports if this cannot be enforced. No GitHub, DNS or CMS access is needed. |
| Optional GA4 | Supplied export or owner-configured read-only adapter, preferably Viewer access | Behavior/referral measurements; not required for SEO. A contact click is not a sent inquiry. Verify the actual OAuth grants before any third-party integration. |
| Optional Bing | Supplied export or owner-configured Webmaster Tools API access | Bing metrics and diagnostics. Verify grants and enforce read-only operations; do not assume every API action is read-only. |

ChatSEO's published monthly pricing checked on October 2, 2026 lists Pro at **€49/month** as the entry plan for MCP (200 credits; Starter at €29 does not include MCP). Model usage costs are separate. Trials are not ongoing free access; verify current prices, credits, taxes, consent and data handling before purchase. See [pricing](https://chatseo.app/pricing) and [MCP capabilities](https://chatseo.app/mcp). A provider's transient-metrics claim does not mean all conversations, tokens or derived data remain local. No purchase is needed for the baseline workflow.

## Pages exclusion

The repository uses GitHub Pages' default legacy Jekyll build from `main` at `/`. There is no `.nojekyll` or configuration explicitly including `.claude`. Jekyll skips dot-directories, so `.claude` is not served in this setup. Do not add `.nojekyll` or include `.claude` in a future build without reassessing exclusion. This does not make committed files confidential.

See [GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) and [Jekyll directory rules](https://jekyllrb.com/docs/structure/).
