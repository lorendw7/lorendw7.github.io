# Shandong He — personal website

A dependency-free bilingual research and engineering portfolio for GitHub Pages.

## Design

The selected default is **C: bento cards** — project-first content, a direct engineering introduction, sage and warm paper colors, and the original coffee/CFD photography. A and B remain available as previews. The original `assets/hero-bg.jpg` and `assets/hero-bg-portrait.jpg` are unchanged.

- `index.html`: complete English content with Chinese translations on individual text elements.
- `styles.css`: responsive layouts, focus states, print styles, reduced-motion support.
- `main.js`: language toggle, mobile navigation, project filters, active-section tracking.
- `project-notes.html` and `project-notes.js`: bilingual implementation notes and source links for the three featured projects.
- `design-preview.html`: three interactive design previews. Alternative layouts use `?design=academic` and `?design=editorial`; `?lang=zh` opens Chinese.
- Hero photography keeps its original landscape and portrait aspect ratios. The three design previews preserve the full image; the default layout has no image caption or dark overlay. The header remains accessible while scrolling, and project filters show a visible result count.
- The default hero states the expected March 2028 graduation and full-time software/AI engineering focus. Inkline, Agent Skills Manager, and PatientFlow Cloud appear first; six other completed projects remain available in an expandable group and through category filters. The three featured cards link to implementation evidence and their known limits.
- `assets/favicon.svg`: site monogram.

No dependencies, external fonts, analytics, or build step. All essential content is readable without JavaScript. Run a static file server in this folder for local preview.

## Content maintenance

Paper 1 is an **accepted CANDAR 2026 / WANC short paper**, not an already-published proceedings article. The embodied-learning manuscript is **under review at the CoRL 2026 Pretrain to Adapt workshop**, not accepted. Keep these statuses distinct.

Sources checked on 2026-10-09:

- Public `lorendw7/not-all-relations-are-equally-reliable` README: title, author order, acceptance and reproducibility scope.
- Local `embodied-intelligence-data-assessment`: manuscript title/results, submission confirmation, and workshop-fit note.
- Public/local PatientFlow-Cloud, Agent-Skills-Manager, Goat-Notes, Life-Preference, Starry-Eyes, and Inkline implementation and completion documentation.
- Supplied Chinese/English resumes: education, GPA, work experience, dates and language scores.

The original completed-project set is preserved alongside the newer work: PatientFlow Cloud, LLM Forge, Gitlet, Life Preference (the merchant-review project previously named LifeSelect), SkyEats, Starry-Eyes, Agent Skills Manager, Goat Notes, and Inkline's shipped PDF-signing MVP. Repository visibility is not a selection criterion; a deployed experience may be linked when source code is not public. Ongoing and documentation-only projects are excluded. Inkline's future signature-library/date-stamp additions are not claimed as completed. The four awards from the original CV are restored. The available embodied manuscript is anonymous; no unverified author order or private repository link is published.

The site retains the previous contact policy: GitHub contact and CV on request, with no public phone, email, or downloadable CV. Updated private resume sources are delivered separately.

## Publishing

GitHub Pages serves the `main` branch. Push changes only after checking both languages, desktop/mobile layouts, filters, navigation, local links, and factual statuses. `.preview/` is ignored and contains only local backups, tooling, and inspection output.
