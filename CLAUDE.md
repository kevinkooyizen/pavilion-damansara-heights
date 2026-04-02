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
  - `malaysia-property-guide-japanese-buyers.html`
  - `japanese-buy-property-malaysia-rules.html`
  - `mont-kiara-japanese-expat-guide.html`
  - `malaysia-mm2h-property-japanese.html`
  - `klang-valley-buy-vs-rent-japanese-expat.html`
  - `klang-valley-best-areas-japanese-families.html`
  - `malaysia-property-investment-japanese-buyers.html`
  - `guaranteed-return-rate-malaysia-property.html`
  *(Note: See the `/articles` folder for their Japanese-named counterparts).*

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # preview production build locally
```
