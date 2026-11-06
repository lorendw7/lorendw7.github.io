# Shandong He — Portfolio

Personal research and engineering portfolio: https://lorendw7.github.io/

A static, English-language website with no application build step, runtime dependencies, external fonts, or analytics. The `Publish portfolio` workflow packages public files from `main` and deploys to GitHub Pages.

## Structure

- `index.html`: biography, current research, selected projects, awards, and contact.
- `project-notes.html`: implementation evidence and limitations for the six featured projects.
- `ink.css`: default Night / Ink design with charcoal surfaces, steel-blue lighting, rounded controls, an editorial project layout, an experience timeline, print and reduced-motion support.
- `styles.css` and `simplefolio.css`: shared layout and retained alternative themes. Both still contain active shared styles.
- `main.js`: project filters, mobile navigation, history and section tracking.
- `navigation.js` and `project-notes.js`: navigation between the homepage and project notes, with a decorative reading-progress indicator that follows layout changes.
- `assets/`: illustrations, portrait and responsive project screenshots. See [asset provenance and licenses](THIRD_PARTY_NOTICES.md).
- `tests/`: browser checks for interaction and project navigation.
- `.github/workflows/pages.yml` and `scripts/`: static packaging, deployment, and verification of the public revision.

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

The default design gives PatientFlow and Inkline larger visual sections, with four quieter project summaries between them. The summaries become a single column on mobile. Honors and experience use aligned date and description columns, inspired by film credits. A wide decorative crop of the existing seaside illustration introduces the closing contact section. No movie stills or additional image downloads are used.

The mobile hero preserves the complete portrait illustration, including the brass nameplate. The ink theme pairs paper-colored serif headings with readable sans-serif body text, small decorative chapter seals, and restrained vermilion accents. Low-contrast white-ink landscape layers appear behind the hero and between projects and honors, with a lightweight SVG paper texture. The PhD contact section separates research interests, expected M.S. completion in March 2028, and links to GitHub and the publication.

Five engineering projects retain original HTML/CSS and SVG concept diagrams for service architecture, order processing, commit history, process sampling, and skill publishing. The default design shows only PatientFlow's diagram; alternative themes retain all five. These illustrate implementation structure, not measured results or product screenshots, and include accessible descriptions.

Before pushing, also inspect both pages on desktop and mobile, check local links and image loading, and verify factual claims.

## Publishing

GitHub Pages must use **GitHub Actions** as its publishing source (`build_type: workflow`). The workflow runs on pushes to `main` and supports a manual **Run workflow**. It serializes deployments without cancelling an active deployment; a newer queued run replaces an older queued run.

`scripts/package_site.py --revision <full-commit-sha>` creates a fresh `_site/` containing only the public HTML, CSS, JavaScript, asset directory, and attribution notice. It adds `.nojekyll` and `version.json`; local previews, private folders, tests, and repository metadata are not published. Run `python -m unittest discover -s tests -p 'test_deployment.py'` to check packaging and stale-content detection.

The final workflow step verifies the deployed commit and hashes of the public homepage, notes, styles, and scripts. To check manually, run `python scripts/verify_deployment.py --url https://lorendw7.github.io/ --revision <full-commit-sha>`. A push or successful package upload alone is not evidence that the live site has updated.

## Content boundaries

- Kyudai LLM Context Bridge is current RA work at Kyushu University. Its Go health endpoint is implemented; model switching, memory, persistence, authentication and Genkai evaluation remain planned. The project-site demo uses synthetic data; no measured token savings or quality improvements are claimed.
- Cadence has a Flutter Today placeholder and native platform scaffolding. Scheduling, storage and sharing are planned, with no feature-complete release.
- The CANDAR 2026 / WANC paper is accepted and selected for a Best Paper Award, with presentation required and proceedings forthcoming.
- Keep each project's implemented behavior and limitations explicit. Gitlet source is not public; its implementation notes remain available.
- Contact is through GitHub; CVs are available on request. Do not publish private contact details or resume files.

Local previews, resumes, generated output and temporary files are ignored by Git. Keep deployment commits limited to public site files.
