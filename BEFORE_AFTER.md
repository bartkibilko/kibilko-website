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

## Round 2: owner feedback (coffee, logo, design and frontend)

Values in "Before" are the round 1 result.

| Where | Before | After | Rules |
|---|---|---|---|
| hero lede | AI-native PHP architect. I build backends with coding agents. | AI-native PHP architect. I design and build backends and frontends with coding agents. | 27 |
| hero sub | ...I work freelance B2B, remotely. | ...I work freelance B2B, remotely, with a coffee on the desk. | 27 (a scene, not an aphorism) |
| meta description, og:description | AI-native PHP architect building backends with coding agents since 2026. Blog on working with AI agents and on PHP. Freelance B2B, remote. | AI-native PHP architect. Backends, frontends and the design around them, built with coding agents since 2026. Blog on AI agents and PHP. Freelance B2B, remote. | 27 |
| SEC.02 bullet 1 | I design backends and ways of working where coding agents are the default way to ship software. | I design and build backends, frontends and the design around them, with coding agents as the default way to ship. | 27 (the owner's wording; three real things, so rule 10 does not apply) |
| home empty state | Notes on working with AI agents and on PHP. | Notes on working with AI agents and on PHP, written over coffee. | 27 |
| blog empty state | ...The first post goes up when it is ready. | ...The first post goes up when it is ready. The coffee is already made. | 27 |
| footer fine print (all pages) | ...Po polsku na życzenie. | ...Po polsku na życzenie. Built over coffee. | 27 |
| cookie banner | ...Decline and nothing loads. My ego will survive. | ...Decline and nothing loads. Either way, the coffee is on the house. | 27 |

Logo: the accent square with a letter K is replaced by an SVG mark, a K in the accent colour on a paper tile with a Blueprint frame and two steam wisps above the upper arm. It is used in the header (`img.brand-mark`) and as `favicon.svg`, `favicon.ico` and `apple-touch-icon.png`. `.brand-mark` in `css/site.css` lost its background and letter styles. The mark switches to the dark palette through `prefers-color-scheme`. Variant B (a coffee bean with a paper-coloured K) is only in `screenshots/logo-b.png`.

## Round 3: no PHP in the title, BK monogram

Values in "Before" are the round 2 result.

| Where | Before | After | Rules |
|---|---|---|---|
| home title, og:title | Bartosz Kibiłko, AI-native PHP architect | Bartosz Kibiłko, AI-native software architect | 27 |
| home meta description, og:description | AI-native PHP architect. Backends, frontends... | AI-native software architect. Backends, frontends... | 27 |
| JSON-LD jobTitle | AI-native PHP architect | AI-native software architect | 27 |
| hero lede | AI-native PHP architect. I design and build backends and frontends with coding agents. | AI-native software architect. I design and build backends and frontends with coding agents. | 27 |
| blog title, og:title | Blog \| Bartosz Kibiłko, AI-native PHP architect | Blog \| Bartosz Kibiłko, AI-native software architect | 27 |

PHP stays only as a topic: the blog descriptions, the blog lede, the home empty state, `knowsAbout` in JSON-LD and the `LISTING 01 · PHP` caption in the post template.

Logo: the K mark is replaced by a BK monogram. Variant A (used on the site, as `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` and in the header) is BK in a square frame with two steam wisps above the letters. B and K are drawn as one continuous stroke each, so the joints are closed. Variant B (`screenshots/logo-bk-b.png`) is BK alone with Blueprint corner marks and no coffee. The company name is not added to any text. The previous K variants stay in `screenshots/logo-a.png` and `logo-b.png`.

## Round 4: logo reverted to the plain K

The owner rejected the coffee K and both BK variants. The site, `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` are back to the round 1 mark, an accent square with a letter K, byte for byte as in the base commit. `.brand-mark` in `css/site.css` and the `<span class="brand-mark">K</span>` in the header are restored the same way. This is a placeholder until a proper logo is made in a separate task. All `screenshots/logo-*` files are deleted; `screenshots/header-k.png` shows the header now. Copy from rounds 1 to 3 is unchanged, including the coffee lines and "AI-native software architect".
