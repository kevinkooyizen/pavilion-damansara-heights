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

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # preview production build locally
```
