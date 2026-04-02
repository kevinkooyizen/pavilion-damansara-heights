# Pavilion Imperial Residences - Replica

A pixel-perfect, premium web replication of the Pavilion Imperial Residences luxury real estate website.

## Context
This project was initiated as a frontend replication exercise to capture the sophisticated layout, scroll-reveal micro-animations, and high-end aesthetics (Champagne Gold `#c5a059`, Charcoal `#1f2229`) of the original site. 
The application leverages an extremely lightweight Vanilla JS + HTML/CSS structure bundled with Vite.

## Tech Stack
- Vanilla HTML/JS/CSS (No framework)
- Vite (fast local development & build tool)

## Key Project Architecture
- `index.html`: The core structured document handling the layout grid, image blocks, and semantic containers.
- `src/style.css`: Contains the design system tokens (font families `Libre Baskerville`, `Montserrat`), animation classes `.scroll-reveal`, and all responsiveness parameters.
- `src/main.js`: Adds interactivity, primarily managing sticky header classes, the language dropdown state, and initializing `IntersectionObserver` for all scroll transitions.
- `public/images/`: Highly optimized, raw static imagery replicating the high-end visuals.

## Articles System
The project includes a compilation script that parses Markdown insights into fully-styled standalone HTML pages. 
- **Compilation Engine**: A custom Node.js script (`scripts/build-articles.js`) utilizes `marked` to build pristine `.html` files.
  - **SEO Metatags**: The compiler automatically uses regex to parse SEO tags like `**Meta description:**` and `**Target keywords:**` into `<div style="display: none;">` to keep them invisible to human readers while remaining crawlable.
  - **Internal Linking**: The compiler systematically intercepts SEO-friendly slugs (e.g. `/japanese-buy-property-malaysia-rules`) mapping them to the specific output route paths (e.g. `/articles/01-C1-rules-costs-en.html`).
- **Index UI**: They are all linked cohesively inside `articles.html` and placed in the main navigation.
- **Slugs / URLs**:
  - `00-PILLAR-complete-guide-en.html`
  - `01-C1-rules-costs-en.html`
  - `02-C2-mont-kiara-en.html`
  - `03-C3-mm2h-en.html`
  - `04-C4-buy-vs-rent-en.html`
  - `05-C5-family-areas-en.html`
  - `06-C6-investment-en.html`
  *(Note: Replace `-en.html` with `-jp.html` for localized Japanese versions).*

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # preview production build locally
```
