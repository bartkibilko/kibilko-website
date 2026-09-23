# Unslop: before and after

Every changed string, with the /unslop rule number that motivated it.
Screenshots (gitignored): `screenshots/home-before-desktop-light.png`, `screenshots/home-after-desktop-light.png`.

Not changed: the JSON-LD block (`jobTitle`, `knowsAbout` are labels, not prose), `AI-first since 2026` as the SEC.02 heading (it is a concrete date and now the only place it appears on the page), button labels, nav, footer copyright line.

## Homepage (`index.html`)

| Where | Before | After | Rules |
|---|---|---|---|
| title | Bartosz Kibiłko — AI-native PHP architect \| 13+ years of PHP, AI-first since 2026 | Bartosz Kibiłko, AI-native PHP architect | 13, 10 |
| meta description, og:description | AI-native PHP architect. 13+ years of hands-on PHP and backend work, AI-first with coding agents since 2026. Notes on the craft. Freelance B2B, fully remote. | AI-native PHP architect building backends with coding agents since 2026. Blog on working with AI agents and on PHP. Freelance B2B, remote. | 27, 30, 32 |
| og:title | same as title | same as new title | 13 |
| hero label | SEC.01 — PROFILE | SEC.01 · PROFILE | 13 |
| hero lede | AI-native PHP architect. 13+ years of PHP, working AI-first since 2026. | AI-native PHP architect. I build backends with coding agents. | 27 (years count removed) |
| hero sub | I write about what the job looks like once technology stops being the constraint: short, opinionated, with numbers. Freelance B2B, fully remote, good coffee within reach. | I write about what the job looks like once code is cheap to produce. The posts are short, take a side and include numbers. I work freelance B2B, remotely. | 14, 10, 30, 32 |
| SEC.02 label | SEC.02 — AI-FIRST SINCE 2026 | SEC.02 · WORKFLOW | 13 (also stopped repeating the h2) |
| SEC.02 bullets | 3 bullets: "...AI agents are the default way to ship software." / "I split problems into parallel streams, steer the agents and verify what they hand back." / "I close quality with tests, code review and architectural decisions, not with trust." | 2 bullets: "...coding agents are the default way to ship software." / "I run several agents in parallel and check their output with tests and code review." | 10, 9, 32 |
| SEC.03 label | SEC.03 — PILLARS | SEC.03 · TOPICS | 13 |
| SEC.03 heading | Three pillars | What I write about | 10, 26 |
| pillar 1 | Technology is no longer the bottleneck. Code appears faster than anyone can read it. The constraints are now decisions, priorities and judgement. | Decisions are the bottleneck. Code appears faster than anyone can read it. What limits a project now is deciding what to build and in what order. | 10 |
| pillar 2 (removed) | Parallel work with agents. Several streams at once: one agent writes, another tests, a third waits for my call. I guard the boundaries. | Removed. It repeated SEC.02 bullet 2, and it contained a second rule of three. | 10 |
| pillar 3 | Supervision from your phone, and balance. Well-designed oversight lets you step away from the desk. I know when it is safe not to look and when to come back. | Supervising agents from your phone. With the right checks in place you can leave the desk. I write about how to tell when it is safe not to look, and when to come back. | 27, 30 |
| figure labels | FIG.01 — / FIG.02 — / FIG.03 — | FIG.01 / FIG.02 | 13, 10 |
| SEC.04 label | SEC.04 — NOTES | SEC.04 · NOTES | 13 |
| empty state | Notes on working with AI agents, and on PHP that outlived every fashion. | Notes on working with AI agents and on PHP. | 32 |
| footer label | SEC.05 — CONTACT | SEC.05 · CONTACT | 13 |
| footer heading | Let’s talk | Email or LinkedIn | 19, 23 (says what is below) |

The "three pillars" were not three distinct points (one duplicated SEC.02), so the section is now two topics. `css/site.css` changes `.pillar-grid` from 3 columns to 2 so two cards fill the row. That is the only style change.

## Blog index (`blog/index.html`)

| Where | Before | After | Rules |
|---|---|---|---|
| title, og:title | Blog — Bartosz Kibiłko \| AI-native PHP architect | Blog \| Bartosz Kibiłko, AI-native PHP architect | 13 |
| meta description, og:description | Notes on working with AI agents and on PHP: what changes in the job once technology stops being the constraint. Short, opinionated, with numbers. | Notes on working with AI agents and on PHP, and on what the job becomes once code is cheap. Short posts that take a side and show numbers. | 14 |
| page lede | Notes on working with AI agents and on PHP. Short, opinionated, with numbers. | Notes on working with AI agents and on PHP. Short posts that take a side and show numbers. | 10 |
| empty state | It is quiet in here on purpose. I would rather leave the room empty than fill it with filler. | Nothing here yet, and I am not going to pad it. The first post goes up when it is ready. | 32 |
| empty state | Want to know when the first one lands? Email me or find me on LinkedIn. | Want to hear when it is published? Email me or message me on LinkedIn. | 32 |
| footer label, heading | SEC.05 — CONTACT / Let’s talk | SEC.05 · CONTACT / Email or LinkedIn | 13, 19 |

## Post template (`_templates/post/index.html`)

| Where | Before | After | Rules |
|---|---|---|---|
| title | POST TITLE — Bartosz Kibiłko | POST TITLE \| Bartosz Kibiłko | 13 |
| body placeholder | Body text runs at a measure of about 680 px (the `--measure` variable). | Body text is about 680 px wide, set by the `--measure` variable. | 32 |
| TL;DR placeholder | First / Second / Third takeaway | First / Second takeaway | 10 |
| listing caption | LISTING 01 — PHP | LISTING 01 · PHP | 13 |
| footer label, heading | SEC.05 — CONTACT / Let’s talk | SEC.05 · CONTACT / Email or LinkedIn | 13, 19 |

## Cookie banner (`js/consent.js`)

| Where | Before | After | Rules |
|---|---|---|---|
| label | FIG.00 — COOKIES | FIG.00 · COOKIES | 13 |
| text | This site runs on coffee and one analytics cookie. Say yes and Google Analytics tells me which posts actually get read. Say no and nothing loads, no hard feelings. | This site sets one cookie, for Google Analytics, so I can see which posts get read. Decline and nothing loads. My ego will survive. | 30, 27 |
