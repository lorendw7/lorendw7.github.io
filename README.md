# lorendw7.github.io

Personal portfolio / resume website for **ShanDong He** — Software Engineer (Backend & AI/ML), M.S. student at Kyushu University researching CFD, HPC & LLMs.

Live site: https://lorendw7.github.io

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Single-page site: Hero, About, Skills, Education, Work Experience, Projects, Awards, Contact. Also holds SEO / Open Graph meta and an inline SVG favicon. |
| `styles.css` | All styling (layout, timeline, cards, responsive design, dark mode, accessibility). |
| `main.js` | Navbar scroll behavior, mobile menu toggle, scroll-spy nav highlight, on-scroll reveal animations, footer year. |
| `assets/cv.pdf` | Downloadable CV / resume (linked from About and Contact sections) |
| `assets/cv.png` | Profile portrait / avatar (illustrated, comic-style) |
| `assets/hero-bg.jpg`, `assets/hero-bg-portrait.jpg` | Hero background images (desktop / mobile), compressed JPEG |

## Features

- **Zero dependencies / no build step** — plain HTML, CSS, and vanilla JS; deploys as-is on GitHub Pages.
- **Responsive** — adapts from desktop to mobile; hero swaps to a portrait background on narrow / portrait screens.
- **Dark mode** — follows the OS `prefers-color-scheme`; the whole theme is driven by CSS variables in `:root`.
- **Accessible** — keyboard `:focus-visible` rings, honors `prefers-reduced-motion`, semantic landmarks.
- **Themeable** — all colors/sizes live as CSS variables at the top of `styles.css`.

## Editing

- **Content** lives directly in `index.html`; each section is marked with a commented header.
- **Theme:** edit the CSS variables in `:root` at the top of `styles.css`; the dark palette is the `@media (prefers-color-scheme: dark)` block at the bottom.
- **Resume:** replace `assets/cv.pdf` to update the downloadable CV — links in About and Contact point to it.
- **Portrait:** replace `assets/cv.png` (used for both the hero avatar and the About photo).
- **Contact email/phone:** search-and-replace `lorendw7@gmail.com` in `index.html`.

## Deploy

Hosted via GitHub Pages off the `main` branch — pushing to `main` publishes automatically.
