> [!IMPORTANT]
> **Synced Documents**: `CLAUDE.md` and `GEMINI.md` must always be kept in sync. Any updates to project architecture, tech stack, or rules should be reflected in both files to ensure consistency across different AI assistants.

# Pavilion Damansara Heights

A pixel-perfect, premium website of Pavilion Damansara Heights luxury real estate.

## Context
The application leverages an extremely lightweight Vanilla JS + HTML/CSS structure bundled with Vite.

## Tech Stack
- Vanilla HTML/JS/CSS (No framework)
- Vite (fast local development & build tool)

## Key Project Architecture
- `index.html`: The core Japanese homepage (default). 
- `index-en.html`: The English version of the homepage.
- `articles.html`: The Japanese article index.
- `articles-en.html`: The English article index.
- `src/style.css`: Contains the design system tokens (font families `Libre Baskerville`, `Montserrat`), animation classes `.scroll-reveal`, and all responsiveness parameters.
- `src/main.js`: Adds interactivity, primarily managing sticky header classes, mobile hamburger drawer toggling, and initializing `IntersectionObserver` for all scroll transitions.
- `src/components/header.js`: Dynamic component that manages cross-linking between localized versions of pages using `hreflang` tags.
- `public/images/`: Highly optimized, raw static imagery.

## Articles System
The project includes a compilation script that parses Markdown insights into fully-styled standalone HTML pages. 
- **Compilation Engine**: A custom Node.js script (`scripts/build-articles.js`) utilizes `marked` to build pristine `.html` files.
  - **SEO Metatags**: The compiler automatically parses SEO tags into `<div style="display: none;">`.
  - **Internal Linking**: The compiler maps SEO-friendly slugs to the specific output route paths.
  - **Hreflang**: The compiler injects bidirectional `<link rel="alternate" hreflang="en/ja">` tags into each article.
  - **Language Detection**: Articles under `articles/ja/` use `<html lang="ja">`, English articles use `<html lang="en">`.
- **Index UI**: Linked cohesively inside `articles.html` (Japanese) and `articles-en.html` (English).

### Article Slugs
| English (under `/articles/`) | Japanese (under `/articles/ja/`) |
| :--- | :--- |
| `malaysia-property-guide-japanese-buyers` | `malaysia-fudosan-kounyu-kanzen-guide` |
| `japanese-buy-property-malaysia-rules` | `nihonjin-malaysia-fudosan-kounyu-rule` |
| `mont-kiara-japanese-expat-guide` | `mont-kiara-nihonjin-guide` |
| `malaysia-mm2h-property-japanese` | `malaysia-mm2h-fudosan-nihonjin` |
| `klang-valley-buy-vs-rent-japanese-expat` | `klang-valley-kounyu-vs-chintai` |
| `klang-valley-best-areas-japanese-families` | `klang-valley-nihonjin-kazoku-area` |
| `malaysia-property-investment-japanese-buyers` | `malaysia-fudosan-toshi-nihonjin` |
| `guaranteed-return-rate-malaysia-property` | `malaysia-fudosan-rimawari-hosho-grr` |

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # preview production build locally
```
