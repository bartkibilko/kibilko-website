---
name: ship-page
description: "Implement a reviewed page brief as a minimal local diff with preservation checks and a publication review gate."
---

# Ship page to review

Read and obey `../seo-contract/SKILL.md` before starting. No push, merge, publication or scheduling is allowed.

## Inputs and scope

Require a brief whose local edit scope the owner has authorized, current source and supporting author material. If scope is not authorized, prepare a proposal without editing public files. Record the starting Git revision and existing worktree changes; preserve unrelated work. Capture original content before editing without committing private snapshots.

## Procedure

1. Read the target pages, template and supporting files. List the intended files and URLs. Implement only the reviewed scope as a minimal local diff, preserving the site's English and understated style.
2. For a new article, check the actual template and maintain the relevant listing, sitemap, RSS and social assets. For an update, preserve URL and dates unless a justified change is explicitly within scope. Do not invent a publication date or set it merely to appear fresh.
3. Review the full diff, including deletions. Compare all original sources, quotes, tables, diagrams, images, links, dates, canonical URLs and public claims. Return a separate before/after ledger for removals, factual changes, title changes, image changes, date changes and canonical changes; record verified unchanged categories too. Restore accidental losses before review.
4. If `scripts/seo-check.py` exists, run `python3 scripts/seo-check.py` from the repository root and record command, exit status and findings. The check arrives separately with https://github.com/bartkibilko/kibilko-website/pull/14; do not copy or create it as part of this skill. If absent, mark that automated check **unavailable**, never passed. Perform the manual checks below and disclose the limitation.
5. Run `git diff --check`. Inspect title/description uniqueness, canonical consistency, language, headings, supported JSON-LD and parseable XML, local links/assets, listing/sitemap/feed agreement and applicable social metadata. Fix issues in scope; report unrelated issues separately. Source checks do not establish live HTTP status, search indexing or real-world performance. Confirm every new public page has at least one inbound link from another public page besides the sitemap and feed.
6. Inspect a local rendered preview of changed pages when available, including narrow and wide layouts and altered diagrams/tables. Use a local preview without connecting analytics accounts or submitting the site to a third-party audit. If preview cannot be performed, report it as unavailable rather than claiming visual validation.

## Review result

Show the exact diff (including new-file contents), revision or diff identifier, changed files/URLs, preservation ledger, preview evidence and check results with limitations. Separate verified facts from expected benefits. End **ready for owner review** only when the scoped checks pass and any unavailable checks are clearly disclosed; otherwise identify the unresolved acceptance criteria. Any subsequent edit needs a new review. Stop here: the name ship-page means shipping a diff for review, not publishing a page.
