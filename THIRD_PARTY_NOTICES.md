# Template sources and adaptations

Source and asset attributions for this portfolio.

## Website: Simplefolio

- Source: https://github.com/cobiwave/simplefolio
- Author: Jacobo Martínez
- Source files: `src/index.html`, `src/sass/sections/_hero.scss`, `src/sass/sections/_projects.scss`, `src/sass/components/_buttons.scss`
- Adaptation: introductory hero, paired project description/visual rows, and expanding call-to-action button. Sass converted to plain scoped CSS. Original site photography, English-language content, accessible navigation, filtering, and implementation notes retained. No Bootstrap, Parcel or animation dependency is required.
- Original source remains under its MIT license below. New content describes Shandong He's own work.
## Seaside hero images (2026-11-06)

- `assets/hero-seaside.jpg` and `assets/hero-seaside-portrait.jpg` are AI-generated illustrative study scenes, created from the user's composition instructions and original J.Y. nameplate reference.
- The depicted CS:APP third-edition cover uses the [authors' official cover image](https://csapp.cs.cmu.edu/3e/images/csapp3e-cover.jpg) as a visual reference; see the [book website](https://csapp.cs.cmu.edu/). The cover artwork is not original portfolio artwork.
- The images illustrate a study setting and are not documentary photographs of the author's home or workplace.

## Current design

The current Night / Ink visual design replaces the default Simplefolio appearance while retaining the shared semantic structure and interaction behavior. `simplefolio.css` remains available as an archived layout.

## Ink landscape (2026-11-06)

- `assets/ink-landscape.jpg` is an original AI-generated decorative landscape following the user's request for Chinese xieyi painting: distant mountains, open space, restrained ink washes, and no lettering or seals.
- It is rendered as white brushwork and gray mountain layers on the black background. It does not reproduce an identified painting or claim to be an antique work.
- `assets/paper-grain.svg` is an original procedural SVG texture. Decorative chapter numerals, the landscape label, and the SH mark are styled in HTML/CSS; they are not historical seals or an artist's signature. These ornaments are hidden from assistive technology.

## Project screenshots

Browser-rendered captures from 2026-10-15, exported as WebP at 640 × 400 and 1280 × 800. These are static snapshots; links open the current websites.

| Assets | Source | Captured state |
| --- | --- | --- |
| `assets/projects/inkline-*` | https://lorendw7.github.io/inkline/ | Signature dialog with a synthetic sample PDF and a “Demo” signature; no personal document or real signature. |
| `assets/projects/starry-eyes-*` | https://starry-eyes.vercel.app/ | Starfield rendered from existing local source in an isolated preview. Asset imports were adapted and the local entry response stubbed; artwork and animation were unchanged. The personal closing message is excluded. |
| `assets/projects/balloonbarrage-*` | https://lorendw7.github.io/BalloonBarrage/en/ | English project homepage for an in-development rhythm shooter, not a playable game build. |

Refresh captures at 1280 × 800 and regenerate both WebP sizes. Keep demo inputs synthetic and retain actual interface screenshots rather than generated mockups.

## Interface references

The rounded controls and quieter visual hierarchy draw on the principles discussed in [Linear's interface refresh](https://linear.app/now/behind-the-latest-design-refresh) and [Vercel's button guidance](https://vercel.com/geist/button). No source code or artwork from those references is incorporated.

The cool blue-gray palette and restrained lighting also reference the visual approach discussed in [Janus Films’ Infernal Affairs trilogy press notes](https://s3.amazonaws.com/criterion-production/janus_promo_packages/754-/Press%20Notes_Infernal%20Affairs%20Trilogy_web_original.pdf). The site uses original CSS and existing portfolio assets; no film stills, dialogue, or soundtrack are included.

## Retained Simplefolio MIT license

MIT License

Copyright (c) 2019 Jacobo Martínez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
