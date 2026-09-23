# Site content

All visible copy and meta text, in display order. Source of truth is the HTML/JS files; this file mirrors them.

## Homepage (`/`)

**Meta**
- Title: Bartosz Kibiłko, AI-native software architect
- Description and og:description: AI-native software architect. Backends, frontends and the design around them, built with coding agents since 2026. Blog on AI agents and PHP. Freelance B2B, remote.
- og:title: Bartosz Kibiłko, AI-native software architect
- JSON-LD: jobTitle "AI-native software architect"; knowsAbout PHP, Backend architecture, AI agents, AI-assisted software development

**Skip link and header**
- Skip to content
- Brand: [BK logo] Bartosz Kibiłko
- Nav: Blog, About, Contact

**SEC.01 · PROFILE (hero)**
- Heading: Bartosz Kibiłko
- Lede: AI-native software architect. I design and build backends and frontends with coding agents.
- Sub: I write about what the job looks like once code is cheap to produce. The posts are short, take a side and include numbers. I work freelance B2B, remotely, with a coffee on the desk.
- Buttons: Read the blog, Get in touch

**SEC.02 · WORKFLOW**
- Heading: AI-first since 2026
- I design and build backends, frontends and the design around them, with coding agents as the default way to ship.
- I run several agents in parallel and check their output with tests and code review.

**SEC.03 · TOPICS**
- Heading: What I write about
- FIG.01 Decisions are the bottleneck. Code appears faster than anyone can read it. What limits a project now is deciding what to build and in what order.
- FIG.02 Supervising agents from your phone. With the right checks in place you can leave the desk. I write about how to tell when it is safe not to look, and when to come back.

**SEC.04 · NOTES**
- Heading: Latest posts
- Empty state: First post coming soon. Notes on working with AI agents and on PHP, written over coffee.
- Link: All posts →

**SEC.05 · CONTACT (footer)**
- Heading: Email or LinkedIn
- E-mail: bartosz@kibilko.pl
- LinkedIn: linkedin.com/in/bartkibilko
- Fine print: © 2026 Bartosz Kibiłko. Po polsku na życzenie. Built over coffee. [Cookie settings]

**Cookie banner (shown on first visit, `js/consent.js`)**
- FIG.00 · COOKIES
- This site sets one cookie, for Google Analytics, so I can see which posts get read. Decline and nothing loads. Either way, the coffee is on the house.
- Buttons: Accept, Decline

## Blog index (`/blog/`)

**Meta**
- Title and og:title: Blog | Bartosz Kibiłko, AI-native software architect
- Description and og:description: Notes on working with AI agents and on PHP, and on what the job becomes once code is cheap. Short posts that take a side and show numbers.

**Page**
- Header and nav: same as homepage
- Label: NOTES
- Heading: Blog
- Lede: Notes on working with AI agents and on PHP. Short posts that take a side and show numbers.
- Empty state heading: First post coming soon
- Nothing here yet, and I am not going to pad it. The first post goes up when it is ready. The coffee is already made.
- Want to hear when it is published? Email me or message me on LinkedIn.
- Footer and cookie banner: same as homepage

## Post template (`_templates/post/index.html`, not published)

- Title: POST TITLE | Bartosz Kibiłko (noindex)
- Meta description: ONE-SENTENCE SUMMARY (up to 160 characters).
- Label: NOTES · #NO
- Heading: POST TITLE
- Dek: One sentence on why this is worth reading.
- Byline: Bartosz Kibiłko, D Month YYYY, N min read
- TL;DR: First takeaway. Second takeaway.
- Body: Opening paragraph. Body text is about 680 px wide, set by the --measure variable. Subheading. Text with a footnote.
- LISTING 01 · PHP (code block)
- Pull quote: Pull quote.
- FOOTNOTE: Footnote text.
- Footer and cookie banner: same as homepage
