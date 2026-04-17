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
Every locale lives under its own prefix (`/ja/`, `/en/`, `/zh/`). Root `/` is a language router that auto-redirects by `navigator.language` with a visible fallback picker.
- `index.html`: Language router at `/` (redirects to `/ja/`, `/en/`, or `/zh/`; hreflang `x-default`).
- `ja/index.html`: The Japanese homepage (served at `/ja/`).
- `en/index.html`: The English homepage (served at `/en/`).
- `zh/index.html`: The Simplified Chinese homepage (served at `/zh/`, `<html lang="zh-CN">`).
- `ja/articles.html`: The Japanese article index (served at `/ja/articles.html`).
- `en/articles.html`: The English article index (served at `/en/articles.html`).
- `zh/articles.html`: The Simplified Chinese article index (served at `/zh/articles.html`).
- `articles.html`: Redirect stub → `/ja/articles.html` (preserves old URL for SEO).
- `src/style.css`: Contains the design system tokens (font families `Libre Baskerville`, `Montserrat`), animation classes `.scroll-reveal`, and all responsiveness parameters.
- `src/main.js`: Adds interactivity, primarily managing sticky header classes, mobile hamburger drawer toggling, and initializing `IntersectionObserver` for all scroll transitions.
- `src/components/header.js`: Dynamic component that manages cross-linking between localized versions of pages using `hreflang` tags.
- `public/images/`: Highly optimized, raw static imagery.

## Articles System
The project includes a compilation script that parses Markdown insights into fully-styled standalone HTML pages. 
- **Compilation Engine**: A custom Node.js script (`scripts/build-articles.js`) utilizes `marked` to build pristine `.html` files.
  - **SEO Metatags**: The compiler automatically parses SEO tags into `<div style="display: none;">`.
  - **Internal Linking**: The compiler maps SEO-friendly slugs to the specific output route paths.
  - **Hreflang**: The compiler injects trilingual `<link rel="alternate" hreflang="en/ja/zh-CN">` tags + `x-default` into each article.
  - **Language Detection**: Articles under `ja/articles/` use `<html lang="ja">`, `en/articles/` use `<html lang="en">`, `zh/articles/` use `<html lang="zh-CN">`.
- **Index UI**: Linked cohesively inside `ja/articles.html` (Japanese), `en/articles.html` (English), and `zh/articles.html` (Simplified Chinese).

### Article Slugs
Each row is a single content topic translated across three locales — used by `scripts/build-articles.js` to emit hreflang triplets between topically equivalent pages.

| English (under `/en/articles/`) | Japanese (under `/ja/articles/`) | Simplified Chinese (under `/zh/articles/`) |
| :--- | :--- | :--- |
| `malaysia-property-guide-japanese-buyers` | `malaysia-fudosan-kounyu-kanzen-guide` | `malaixiya-fangdichan-zhinan-zhongguoren` |
| `japanese-buy-property-malaysia-rules` | `nihonjin-malaysia-fudosan-kounyu-rule` | `zhongguoren-malaixiya-goufang-guize` |
| `mont-kiara-japanese-expat-guide` | `mont-kiara-nihonjin-guide` | `mont-kiara-zhongguoren-zhinan` |
| `malaysia-mm2h-property-japanese` | `malaysia-mm2h-fudosan-nihonjin` | `malaixiya-mm2h-zhongguoren-zhinan` |
| `klang-valley-buy-vs-rent-japanese-expat` | `klang-valley-kounyu-vs-chintai` | `baxinggu-goufang-vs-zulin-zhongguoren` |
| `klang-valley-best-areas-japanese-families` | `klang-valley-nihonjin-kazoku-area` | `baxinggu-zhongguo-jiating-quyu` |
| `malaysia-property-investment-japanese-buyers` | `malaysia-fudosan-toshi-nihonjin` | `malaixiya-fangdichan-touzi-zhongguoren` |
| `guaranteed-return-rate-malaysia-property` | `malaysia-fudosan-rimawari-hosho-grr` | `malaixiya-fangdichan-baozheng-huibao` |
| `kuala-lumpur-property-guide-japanese-buyers` | `kuala-lumpur-fudosan-guide-nihonjin` | `jilongpo-fangdichan-zhinan-zhongguoren` |
| `klcc-bukit-bintang-property-japanese-buyers` | `klcc-bukit-bintang-fudosan-nihonjin` | `klcc-bukit-bintang-zhongguoren-zhinan` |
| `mont-kiara-best-condos-japanese-buyers` | `mont-kiara-best-condo-nihonjin` | `mont-kiara-gongyu-bijiao-zhongguoren` |

The Simplified Chinese hub uses **pinyin slugs** (lowercase, hyphenated) for Baidu indexability. Audience-specific angles (SAFE forex, CRS reporting, Mandarin community) live inside the `zh/` articles, not as separate topics.

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # preview production build locally
```
