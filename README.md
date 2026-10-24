# Shandong He — personal website

A dependency-free English-only research and engineering portfolio for GitHub Pages.

## Design

The default is a customized **Simplefolio** layout: a direct introduction, original coffee/CFD photography, generous whitespace, and project rows pairing implementation descriptions with flow illustrations or real deployed-website screenshots. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for source references and the preserved MIT license.

- `index.html`: English-only content. A status-aware “On the workbench” section covers NodePulse, Tinyjson, and Deep Learning for Biology; six implemented projects are featured below it: PatientFlow Cloud, Life Preference, Gitlet, Procmon, Agent Skills Manager, and Inkline. More public work follows in the archive.
- `styles.css` and `simplefolio.css`: shared styles and the scoped template adaptation, including desktop/mobile, keyboard focus, print, and reduced-motion support.
- `main.js`: mobile navigation, project filters, featured-project shortcuts, and active-section tracking.
- `project-notes.html` and `project-notes.js`: English-only implementation evidence and limitations for the six featured projects.
- Original `assets/hero-bg.jpg` and `assets/hero-bg-portrait.jpg` are unchanged and displayed in full at their native aspect ratios.
- `design-preview.html` preserves the earlier comparison layouts, selectable with `?design=academic`, `?design=editorial`, or `?design=bento`. Default is `simplefolio`; all variants use English-only content.
- Current positioning is systems engineering, scientific computing, and reliable AI, with expected M.S. completion in March 2028. The hero and contact section emphasize research collaboration now and full-time software engineering opportunities in Japan after graduation. Employer-specific interview preparation is private and outside this repository.
- GitHub profile source is maintained in the separate `lorendw7/lorendw7` repository.

No runtime dependencies, external fonts, analytics, or build step. Essential content and mobile navigation remain usable without JavaScript. Run a static file server for local preview.

## Content maintenance

BalloonShooter is included at the user's request as an **in-development prototype**, publicly named BalloonBarrage. The earlier local source review confirmed mouse aiming, moving projectiles with swept collision, single-hit scoring, and audio/particle feedback. The English project website checked on 2026-10-15 now describes a rhythm-shooter direction, chart-driven spawning, and rhythm judgement still in progress. No public Windows demo is available; do not present development targets as released features. The project archive therefore includes completed projects and this explicitly labeled prototype.

The RA appointment at Kyushu University's Research Institute for Information Technology is **selected, appointment processing**. The planned theme is knowledge graph construction and utilization under an AI for Science research training initiative. Do not claim an active appointment, start date, completed RA duties, or SRA classification until confirmed. This status was confirmed by the user on 2026-10-09.

Paper 1 is an **accepted CANDAR 2026 / WANC short paper**, not an already-published proceedings article. The embodied-learning manuscript is **under review at the CoRL 2026 Pretrain to Adapt workshop**, not accepted. Keep these statuses distinct.

Sources checked on 2026-10-09:

- Public `lorendw7/not-all-relations-are-equally-reliable` README: title, author order, acceptance and reproducibility scope. The 2026-10-23 WANC award notification supplied by the author is the source for the Best Paper Award selection; the site preserves the notification's presentation requirement.
- Local `embodied-intelligence-data-assessment`: manuscript title/results, submission confirmation, and workshop-fit note.
- Public/local PatientFlow-Cloud, Agent-Skills-Manager, Goat-Notes, Life-Preference, Procmon, Starry-Eyes, and Inkline implementation and completion documentation.
- Supplied Chinese/English resumes: education, GPA, work experience, dates and language scores.

The public project set is reconciled against the current GitHub account before publishing. Gitlet remains in the featured group based on reviewed local source and design evidence, but it has no repository link because its source is not currently public. Procmon is featured alongside it, and MiniKV replaced the removed SkyEats repository in the archive. A deployed experience such as Starry-Eyes may remain linked when its source repository is no longer public, but the site does not imply public source availability. Inkline's future signature-library/date-stamp additions are not claimed as completed. The four awards from the original CV are restored. The available embodied manuscript is anonymous; no unverified author order or private repository link is published.

The site retains the previous contact policy: GitHub contact and CV on request, with no public phone, email, or downloadable CV. Updated bilingual LaTeX sources and compiled PDFs are maintained privately and excluded from website publishing.

## Publishing

GitHub Pages serves the `main` branch. Push changes only after checking English-only content, desktop/mobile layouts, filters, navigation, local links, and factual statuses. `.preview/` is ignored and contains only local backups, tooling, and inspection output.

## Procmon evidence review (2026-10-24)

Procmon is a featured project because its public repository contains a compact, implemented Linux process monitor rather than only a roadmap. The description is limited to the documented behavior: procfs enumeration, two-snapshot CPU calculation, RSS and user reporting, CPU or memory sorting, live refresh, and one-shot output. It is presented as an educational Linux/WSL tool, not a full replacement for `top` or `htop`.

## Gitlet evidence review (2026-10-24)

Gitlet is again a featured project at the user's request. Its description is based on previously reviewed local CS61B project source and design notes, not inferred from Git's capabilities. Basic initialization, staging, committing, branching, and checkout were exercised in an isolated copy. Ordinary merge and fast-forward behavior retain known limitations, and remote commands use local filesystem paths rather than Git network protocols. The website links only to its implementation notes because the repository is not currently public.

## Project order (2026-10-10)

PatientFlow Cloud leads with microservice architecture, followed by Life Preference for Redis caching and asynchronous coupon orders, Gitlet for Java persistence and commit graphs, Procmon for Linux process sampling, Agent Skills Manager for full-stack development, and Inkline for a shipped browser application. Life Preference is explicitly described as a Heima Dianping course-based practice project, with a matching implementation-notes section based on its README and order-service source. Project numbering, English-only introductions, and evidence navigation follow the same order.

## English-only release (2026-10-10)

Chinese translations and language-switching controls have been removed from all public HTML pages and scripts. Featured-project shortcuts connect the homepage and implementation notes, including on mobile. The design-preview page uses English and identifies Simplefolio as the active layout. Old language query parameters no longer change page content.

## Interaction fixes (2026-10-10)

Project filters use the `filter` query parameter and restore through browser history. Each category retains its own archive expansion state; selecting the current category leaves that state intact. Archive labels and visible counts reflect the matching projects. Fragment navigation reveals hidden projects, focuses the destination heading, and respects reduced-motion preferences. Navigation highlighting tracks section positions and explicitly handles the page bottom.

The mobile menu closes on outside clicks, focus leaving the menu, Escape, section selection, and switching to a desktop viewport. Opening moves focus to the first navigation link; Escape restores focus to the menu button. JavaScript-dependent controls are hidden when scripting is unavailable, while mobile navigation and the native project disclosure remain usable.

Browser regression checks are in `tests/interactions.cjs`. With Playwright available and a local static server running, execute `node tests/interactions.cjs http://127.0.0.1:8765/`. Optional `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_CHANNEL` environment variables select an existing development installation and browser. Checks cover four viewport widths, all design variants, browser history, deep links, disclosure state, keyboard focus, and navigation without JavaScript.

## Live project navigation (2026-10-15)

The Live websites filter gathers Inkline, Starry-Eyes, and the BalloonBarrage project website. Each has a linked visual panel, title, explicit website button, and visible destination/new-tab hint. BalloonBarrage remains an in-development game; its link opens the project website. Known website URLs were checked for successful HTTP responses and page titles. Source and implementation links remain separate actions.

`navigation.js` preserves supported design and filter parameters between the portfolio and implementation notes. Return links point to the selected project. All links use native browser navigation, including modifier clicks and opening in new tabs. The old stretched title overlay was removed so card descriptions can be selected without accidentally opening a link.

Portfolio and implementation-note links use normal browser navigation and preserve the selected design, project filter, and return target. Website previews and buttons provide hover, focus, and pressed feedback without delaying navigation. Additional regression checks are in `tests/project-navigation.cjs` and use the same browser/server configuration as the existing interaction suite.

## Website screenshots (2026-10-15)

The three deployed projects now use real local WebP captures with browser-style address bars and linked captions. Two image sizes, intrinsic dimensions, and lazy decoding/loading keep the previews lightweight and stable on mobile. See `assets/projects/README.md` for capture sources and states. Inkline uses a synthetic demo document; Starry-Eyes explicitly identifies its access check; BalloonBarrage opens the English project homepage. Portfolio text remains English while screenshots preserve the original interfaces. Navigation tests also verify image decoding, aspect ratio, frame containment, and clickable previews across the design variants.

## PhD focus and artwork preview (2026-10-15)

At the user’s request, the portfolio now states that Shandong He is seeking PhD opportunities. The primary introduction links to research; software projects remain accessible as implementation evidence. No doctoral admission, enrollment, supervisor, location restriction, or start date is claimed. Starry-Eyes now shows the actual artwork rendered from the local project source in an isolated preview, without publishing the access answer or personal closing message. The deployed site still requires its existing access check.

## Public-repository reconciliation (2026-10-24)

The portfolio was reconciled against the account's current public repository list after repositories were removed. Links to Labelforge, PerfusionUDE.jl, SkyEats, and the removed Gitlet repository were removed. Gitlet itself was restored to the website on 2026-10-24 as a source-reviewed project without a public repository link. The workbench reflects recently active public work and records an explicit `Built` / `Next` boundary for each project.

- NodePulse claims only process bootstrap, configuration, health checks, request logging, signal handling, and infrastructure tests; heartbeat delivery, registry state, and timeout classification remain next steps.
- Tinyjson claims only its C++20 value model and project foundation; lexing, parsing, serialization, and broader tests remain roadmap work.
- Deep Learning for Biology is presented as a reproducible study environment with pinned dependencies and notebook tooling, not as original biological research.
- MiniKV remains in the archive with explicit foundation-stage wording; the WAL / memtable / SSTable / compaction loop is not claimed as complete.

The GitHub Profile README uses the same scope language so visitors see one consistent story across GitHub and the portfolio.
