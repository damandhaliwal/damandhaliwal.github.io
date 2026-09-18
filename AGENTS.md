# AGENTS.md

Personal academic website for damandhaliwal.me, built with Hugo and a customized PaperMod theme. Deployed to GitHub Pages via GitHub Actions.

## Commands

```bash
hugo server
hugo --minify
hugo --minify --destination /tmp/website-render-check --cleanDestinationDir
```

- `hugo server` starts local development with live reload at `http://localhost:1313`.
- `hugo --minify` writes the production build to `public/`.
- Prefer the `/tmp/website-render-check` build command when verifying render output without repopulating the repository's ignored `public/` directory.

## Architecture

### Content

- `content/_index.md` is the homepage content stub; the custom homepage is primarily driven by `config.yml` under `params.homepage`.
- `content/research/` contains research page bundles. Each research item is a directory containing `index.md` plus associated PDFs or other files.
- `content/projects/` contains the ML simulation and Sundai Mars project case studies. `/projects/` is now a real section.
- Old `/projects/<research-slug>/` detail URLs remain aliases to `/research/<slug>/`. Do not restore a `/projects/` alias on the Research index.

### Config

- `config.yml` is the single site config file. It controls nav menu entries, social icons, profile mode, theme params, markup settings, and the custom homepage data.
- `params.homepage` drives the current custom homepage experience.
- `params.profileMode` is older backup homepage data; `layouts/_default/list.html` checks `params.homepage.enabled` first and only falls back to `index_profile.html`.
- Nav items and homepage buttons may be commented out in `config.yml` to hide pages without deleting content.

### Layout Overrides

- `layouts/_default/` overrides PaperMod's default list, single, baseof, and related templates.
- `layouts/_default/baseof.html` renders the shared portfolio navigation and footer on all routes and gives Home, About, Research, and Projects the full-width portfolio shell.
- `layouts/partials/portfolio-nav.html` provides Home, current-section state, and external Writing links that open in a new tab.
- `layouts/partials/portfolio-footer.html` provides contact, social, and CV links.
- `layouts/_default/list.html` routes the homepage to `layouts/partials/homepage.html` when `params.homepage.enabled` is true.
- `layouts/research/list.html` renders the Research index.
- `layouts/research/single.html` renders individual Research detail pages.
- `layouts/partials/homepage.html` controls the custom visual homepage.
- `layouts/partials/index_profile.html` is the older profile-mode fallback.
- `layouts/projects/` renders the Projects index and case studies.
- `layouts/partials/intersection.html` provides the homepage vector illustration.
- The portfolio uses native links and CSS; `extend_footer.html` does not load homepage JavaScript.
- Hugo's lookup order means local files in `layouts/` take precedence over `themes/PaperMod/layouts/`.

### CSS

- `assets/css/core/theme-vars.css` defines shared CSS custom properties for colors, spacing, and fonts.
- `assets/css/common/` contains per-component stylesheets.
- `assets/css/common/homepage.css` contains the shared portfolio shell, typography, navigation, footer, and homepage styles.
- `assets/css/extended/{about,projects,research}.css` contains the respective page styles, scoped to their page wrappers.
- Cormorant Garamond and Inter are self-hosted under `static/fonts/` with their open font licenses. Preserve the existing paper, ink, cyan, and clay palette.
- Changes in `assets/css/` override the theme. Inspect `themes/PaperMod/assets/css/` for the original PaperMod styles when needed.

### JavaScript

- No homepage JavaScript is loaded. Navigation and timeline links work without JavaScript; CSS respects reduced-motion preferences.

### Static Assets

- `static/cv.pdf` is linked from the CV social icon.
- `static/picture.jpg` is the profile image referenced in `config.yml`.
- `static/favicon.ico` is the site favicon.

## Build And Generated Files

- `public/` is generated Hugo output and is ignored by git.
- GitHub Actions builds Hugo and uploads `./public`, so source commits should include files such as `config.yml`, `layouts/`, `assets/`, `content/`, `static/`, and workflow files, not generated `public/` output.
- Do not hand-edit files under `public/`; change the source templates, content, assets, or config instead.

## Research Section Notes

- The public label for the former Projects section is now Research.
- Canonical URLs are `/research/` and `/research/<slug>/`.
- Old `/projects/<research-slug>/` detail URLs should remain supported with Hugo aliases; `/projects/` itself belongs to the Projects section.
- Research cards and detail pages share the About/homepage visual language: Cormorant display headings, Inter body text, paper background, muted copy colors, light artifact cards, and the shared sticky navigation.
- `displayTitle`, `displaySummary`, `topic`, and `illustration` front matter drive visual cards; full titles and original abstracts remain on detail pages.
- SVG artwork is conceptual, not an empirical result. Keep synthetic/local/prototype limits explicit in project case studies.

## Visual QA Notes

- Use the in-app browser at `http://localhost:1313/` for quick inspection.
- Check desktop, tablet, and mobile viewports when typography or layout changes are risky.
- For source-only verification, run:

```bash
hugo --minify --destination /tmp/website-render-check --cleanDestinationDir
```

## Notes

- Theme source lives in `themes/PaperMod/`; prefer overriding in `layouts/` and `assets/css/` over editing the theme directly.
- Math rendering is enabled with `params.math: true` through `layouts/partials/math.html`.
