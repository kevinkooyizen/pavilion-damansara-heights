# Pavilion

A web application built with vanilla JavaScript and Vite.

## Tech Stack

- Vanilla JS (no framework)
- Vite 8 (dev server, bundler)
- Deployed to Cloudflare Pages

## Development

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build (outputs to dist/)
npm run preview    # preview production build locally
```

## Deployment

Deployed via Cloudflare Pages. Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Project Structure

- `index.html` — entry point
- `src/main.js` — app entry, renders into `#app`
- `src/style.css` — global styles (light/dark theme via CSS custom properties)
- `src/counter.js` — counter component
- `public/` — static assets (favicon, icons SVG)
- `src/assets/` — bundled assets (images, logos)
