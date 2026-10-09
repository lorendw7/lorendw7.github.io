# Shandong He — personal website

A dependency-free bilingual research and engineering portfolio for GitHub Pages.

## Design

The default is a customized **Simplefolio** layout: a direct introduction, original coffee/CFD photography, generous whitespace, and project rows pairing implementation descriptions with typographic flow illustrations. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for source references and the preserved MIT license.

- `index.html`: English-first content with Chinese translations; backend microservices, full-stack applications, then a shipped browser product.
- `styles.css` and `simplefolio.css`: shared styles and the scoped template adaptation, including desktop/mobile, keyboard focus, print, and reduced-motion support.
- `main.js`: bilingual toggle, mobile navigation, project filters, active-section tracking.
- `project-notes.html` and `project-notes.js`: bilingual implementation evidence and limitations for the three featured projects.
- Original `assets/hero-bg.jpg` and `assets/hero-bg-portrait.jpg` are unchanged and displayed in full at their native aspect ratios.
- `design-preview.html` preserves the earlier comparison layouts, selectable with `?design=academic`, `?design=editorial`, or `?design=bento`. Default is `simplefolio`; `?lang=zh` opens Chinese.
- Career focus remains full-time engineering opportunities in Japan, expected graduation March 2028. Employer-specific interview preparation is private and outside this repository.
- GitHub profile source is maintained in the separate `lorendw7/lorendw7` repository.

No dependencies, external fonts, analytics, or build step. Essential content remains readable without JavaScript. Run a static file server for local preview.

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

GitHub Pages serves the `main` branch. Push changes only after checking both languages, desktop/mobile layouts, filters, navigation, local links, and factual statuses. `.preview/` is ignored and contains only local backups, tooling, and inspection output.
