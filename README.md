# Shandong He — Portfolio

Personal research and engineering portfolio: https://lorendw7.github.io/

A static, English-language website with no build step, runtime dependencies, external fonts, or analytics. GitHub Pages publishes the `main` branch.

## Structure

- `index.html`: biography, current research, selected projects, awards, and contact.
- `project-notes.html`: implementation evidence and limitations for the six featured projects.
- `ink.css`: default Night / Ink design with charcoal surfaces, steel-blue lighting, rounded controls, an editorial project layout, an experience timeline, print and reduced-motion support.
- `styles.css` and `simplefolio.css`: shared layout and retained alternative themes. Both still contain active shared styles.
- `main.js`: project filters, mobile navigation, history and section tracking.
- `navigation.js` and `project-notes.js`: navigation between the homepage and project notes, with a decorative reading-progress indicator that follows layout changes.
- `assets/`: illustrations, portrait and responsive project screenshots. See [asset provenance and licenses](THIRD_PARTY_NOTICES.md).
- `tests/`: browser checks for interaction and project navigation.

The older themes remain accessible through `?design=academic`, `editorial`, `bento`, and `simplefolio`. The standalone comparison page has been retired.

## Preview and verify

Serve the repository with any static HTTP server, for example:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

With Playwright available, run:

```sh
node tests/interactions.cjs http://127.0.0.1:8765/
node tests/project-navigation.cjs http://127.0.0.1:8765/
```

`PLAYWRIGHT_MODULE` can point to an existing Playwright installation; `PLAYWRIGHT_CHANNEL` can select an installed browser such as `msedge`. The checks cover desktop and mobile layouts, filters, history, project links, keyboard navigation, reduced motion, and navigation without JavaScript. External project destinations are stubbed in the navigation suite.

Current-project limitations remain available in native expandable sections. Featured projects use a short overview with implementation notes and source links; the archive remains collapsed by default. Experience entries separate dates, roles, organizations, and responsibilities.

The default design gives PatientFlow and Inkline larger visual sections, with four quieter project summaries between them. The summaries become a single column on mobile. A decorative crop of the existing seaside illustration closes the page beside the contact information. No movie stills or additional image downloads are used.

The mobile hero preserves the complete portrait illustration, including the brass nameplate. Low-contrast white-ink landscape accents sit behind the hero and experience sections. Contact information states the search for PhD positions in systems and reliable AI, with expected M.S. completion in March 2028.

Five engineering projects retain original HTML/CSS and SVG concept diagrams for service architecture, order processing, commit history, process sampling, and skill publishing. The default design shows only PatientFlow's diagram; alternative themes retain all five. These illustrate implementation structure, not measured results or product screenshots, and include accessible descriptions.

Before pushing, also inspect both pages on desktop and mobile, check local links and image loading, and verify factual claims.

## Content boundaries

- Kyudai LLM Context Bridge is current RA work at Kyushu University. Its Go health endpoint is implemented; model switching, memory, persistence, authentication and Genkai evaluation remain planned. The project-site demo uses synthetic data; no measured token savings or quality improvements are claimed.
- Cadence has a Flutter Today placeholder and native platform scaffolding. Scheduling, storage and sharing are planned, with no feature-complete release.
- The CANDAR 2026 / WANC paper is accepted and selected for a Best Paper Award, with presentation required and proceedings forthcoming.
- Keep each project's implemented behavior and limitations explicit. Gitlet source is not public; its implementation notes remain available.
- Contact is through GitHub; CVs are available on request. Do not publish private contact details or resume files.

Local previews, resumes, generated output and temporary files are ignored by Git. Keep deployment commits limited to public site files.
