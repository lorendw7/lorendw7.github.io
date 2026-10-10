# Shandong He — personal website

A dependency-free English-only research and engineering portfolio for GitHub Pages.

## Design

The default is a customized **Simplefolio** layout: a direct introduction, original coffee/CFD photography, generous whitespace, and project rows pairing implementation descriptions with typographic flow illustrations. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for source references and the preserved MIT license.

- `index.html`: English-only content; five featured projects ordered for backend/software engineering roles: PatientFlow Cloud, Life Preference, Gitlet, Agent Skills Manager, and Inkline. More projects follow in the archive: SkyEats, LLM Forge, Goat Notes, Starry-Eyes, and the BalloonBarrage prototype.
- `styles.css` and `simplefolio.css`: shared styles and the scoped template adaptation, including desktop/mobile, keyboard focus, print, and reduced-motion support.
- `main.js`: mobile navigation, project filters, featured-project shortcuts, and active-section tracking.
- `project-notes.html` and `project-notes.js`: English-only implementation evidence and limitations for the five featured projects.
- Original `assets/hero-bg.jpg` and `assets/hero-bg-portrait.jpg` are unchanged and displayed in full at their native aspect ratios.
- `design-preview.html` preserves the earlier comparison layouts, selectable with `?design=academic`, `?design=editorial`, or `?design=bento`. Default is `simplefolio`; all variants use English-only content.
- Career focus remains full-time engineering opportunities in Japan, expected graduation March 2028. Employer-specific interview preparation is private and outside this repository.
- GitHub profile source is maintained in the separate `lorendw7/lorendw7` repository.

No runtime dependencies, external fonts, analytics, or build step. Essential content and mobile navigation remain usable without JavaScript. Run a static file server for local preview.

## Content maintenance

BalloonShooter is included at the user's request as an **in-development prototype**, publicly named BalloonBarrage. Its local README and gameplay scripts confirm mouse aiming, moving projectiles with swept collision, single-hit scoring, audio/particle feedback and randomized single-target spawning. Waves, upgrades and local co-op remain planned. The project archive therefore includes completed projects and this explicitly labeled prototype.

The RA appointment at Kyushu University's Research Institute for Information Technology is **selected, appointment processing**. The planned theme is knowledge graph construction and utilization under an AI for Science research training initiative. Do not claim an active appointment, start date, completed RA duties, or SRA classification until confirmed. This status was confirmed by the user on 2026-10-09.

Paper 1 is an **accepted CANDAR 2026 / WANC short paper**, not an already-published proceedings article. The embodied-learning manuscript is **under review at the CoRL 2026 Pretrain to Adapt workshop**, not accepted. Keep these statuses distinct.

Sources checked on 2026-10-09:

- Public `lorendw7/not-all-relations-are-equally-reliable` README: title, author order, acceptance and reproducibility scope.
- Local `embodied-intelligence-data-assessment`: manuscript title/results, submission confirmation, and workshop-fit note.
- Public/local PatientFlow-Cloud, Agent-Skills-Manager, Goat-Notes, Life-Preference, Starry-Eyes, and Inkline implementation and completion documentation.
- Supplied Chinese/English resumes: education, GPA, work experience, dates and language scores.

The original completed-project set is preserved alongside the newer work: PatientFlow Cloud, LLM Forge, Gitlet, Life Preference (the merchant-review project previously named LifeSelect), SkyEats, Starry-Eyes, Agent Skills Manager, Goat Notes, and Inkline's shipped PDF-signing MVP. Repository visibility is not a selection criterion; a deployed experience may be linked when source code is not public. Other ongoing and documentation-only projects are excluded. Inkline's future signature-library/date-stamp additions are not claimed as completed. The four awards from the original CV are restored. The available embodied manuscript is anonymous; no unverified author order or private repository link is published.

The site retains the previous contact policy: GitHub contact and CV on request, with no public phone, email, or downloadable CV. Updated private resume sources are delivered separately.

## Publishing

GitHub Pages serves the `main` branch. Push changes only after checking English-only content, desktop/mobile layouts, filters, navigation, local links, and factual statuses. `.preview/` is ignored and contains only local backups, tooling, and inspection output.

## Gitlet evidence review (2026-10-09)

Gitlet is a featured project. Its description is based on the local CS61B project source and design document, not inferred from Git's capabilities. Basic initialization, staging, committing, branching and checkout were exercised in an isolated copy. Ordinary merge currently advances the source branch as well as the target; fast-forward currently switches branches without advancing the original target. These remain project limitations, not claimed successes. Remote commands use local filesystem paths. Course helper code is not represented as original work. No private source, resume, contact details, or local filesystem paths are published.

## Project order (2026-10-10)

PatientFlow Cloud leads with microservice architecture, followed by Life Preference for Redis caching and asynchronous coupon orders, Gitlet for Java data structures and persistence, Agent Skills Manager for full-stack development, and Inkline for a shipped browser application. Life Preference is explicitly described as a Heima Dianping course-based practice project, with a matching implementation-notes section based on its README and order-service source. Project numbering, English-only introductions, and evidence navigation follow the same order.

## English-only release (2026-10-10)

Chinese translations and language-switching controls have been removed from all public HTML pages and scripts. Featured-project shortcuts connect the homepage and implementation notes, including on mobile. The design-preview page uses English and identifies Simplefolio as the active layout. Old language query parameters no longer change page content.

## Interaction fixes (2026-10-10)

Project filters use the `filter` query parameter and restore through browser history. Each category retains its own archive expansion state; selecting the current category leaves that state intact. Archive labels and visible counts reflect the matching projects. Fragment navigation reveals hidden projects, focuses the destination heading, and respects reduced-motion preferences. Navigation highlighting tracks section positions and explicitly handles the page bottom.

The mobile menu closes on outside clicks, focus leaving the menu, Escape, section selection, and switching to a desktop viewport. Opening moves focus to the first navigation link; Escape restores focus to the menu button. JavaScript-dependent controls are hidden when scripting is unavailable, while mobile navigation and the native project disclosure remain usable.

Browser regression checks are in `tests/interactions.cjs`. With Playwright available and a local static server running, execute `node tests/interactions.cjs http://127.0.0.1:8765/`. Optional `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_CHANNEL` environment variables select an existing development installation and browser. Checks cover four viewport widths, all design variants, browser history, deep links, disclosure state, keyboard focus, and navigation without JavaScript.
