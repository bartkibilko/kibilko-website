---
name: weekly-seo
description: "Run a read-only technical and performance review with 28-day comparisons and 90-day context, including no-data mode."
---

# Weekly SEO review

Read and obey `../seo-contract/SKILL.md` before starting. No push, merge, publication or scheduling is allowed.

This is an on-demand review, not a scheduled task. Do not create a routine or edit public pages.

## Procedure

1. Read the URL inventory, recent Git changes and any owner-supplied change log. Record which changes are merely proposed versus actually published; commit dates alone do not prove publication.
2. Run `python3 scripts/seo-check.py` if present. It arrives separately with https://github.com/bartkibilko/kibilko-website/pull/14. If absent, report unavailable and inspect metadata, canonical, links/assets and listing/sitemap/feed consistency manually. Do not add the script. Report urgent technical/factual defects promptly as review proposals.
3. If analytics are absent, return **no-data mode**: technical findings, known changes, hypotheses and required inputs. Set traffic, query, CTR, position, indexing and lead measurements to `null`. Do not infer them from repository quality.
4. With supplied data, compare the latest complete 28 days with the preceding 28 using identical property, search type and filters; add 90-day context if available. State exact dates, data freshness, coverage, totals and sample sizes. If a window is incomplete, label it and avoid a like-for-like claim. Recalculate aggregate CTR from total clicks/impressions rather than averaging row percentages.
5. Separate name/branded queries from non-branded topical and collaboration queries, documenting classification. Segment country/device only when the sample supports interpretation. Report absolute counts alongside changes; suppress misleading percentage claims for tiny or zero baselines. Treat average position, anonymized/missing queries and API row limits as limitations. Do not combine incompatible sources as if they measured the same population.

   5a. For each page with impressions, compare the query it was written for with the queries it actually receives impressions for. Flag mismatches. Split high-impression/low-click rows by position: 8–15 is a repointing candidate (propose new H1, description and opening paragraph through page-brief, and check the body truly answers the query); 1–3 with falling clicks may be an AI answer above the result — record it, do not propose a title rewrite.

6. Keep citations, referrals, contact clicks and confirmed inquiries distinct. Account for seasonality, new content, search updates and other activity before attributing results to an edit. A week rarely proves an effect; small samples can mean **no decision**. Do not roll back from noise or wait 60 days to propose fixing a broken canonical.

## Review result

Return source/filter/period notes; technical alerts; 28/28 comparison and 90-day context or explicit missing data; change log; interpretation and uncertainty; at most three evidence-backed next actions with target URLs and acceptance criteria. With insufficient evidence, recommend no change. End **report ready for owner review; site diff: none**. Route any authorized follow-up through page-brief and ship-page.
