import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { articleAlternates } from './scripts/article-map.mjs';

const SITE = 'https://pavilion.asianews.blog';
const HREFLANG = { en: 'en', ja: 'ja', zh: 'zh-CN' };

// Static pages share the same path across locales, so their alternates are fixed.
// (x-default mirrors the historical behaviour: home & article index -> site root.)
const STATIC_ALTERNATES = {
  '/en': { urls: { en: '/en/', ja: '/ja/', zh: '/zh/' }, xDefault: '/' },
  '/ja': { urls: { en: '/en/', ja: '/ja/', zh: '/zh/' }, xDefault: '/' },
  '/zh': { urls: { en: '/en/', ja: '/ja/', zh: '/zh/' }, xDefault: '/' },
  '/en/articles': { urls: { en: '/en/articles', ja: '/ja/articles', zh: '/zh/articles' }, xDefault: '/' },
  '/ja/articles': { urls: { en: '/en/articles', ja: '/ja/articles', zh: '/zh/articles' }, xDefault: '/' },
  '/zh/articles': { urls: { en: '/en/articles', ja: '/ja/articles', zh: '/zh/articles' }, xDefault: '/' },
};

const ARTICLE_ALTERNATES = articleAlternates();

function toLinks(urls, xDefault) {
  const links = [];
  for (const lang of ['en', 'ja', 'zh']) {
    if (urls[lang]) links.push({ lang: HREFLANG[lang], url: SITE + urls[lang] });
  }
  links.push({ lang: 'x-default', url: SITE + xDefault });
  return links;
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // We assign hreflang alternates manually (not via the i18n option) because
      // article slugs differ per locale and the i18n option assumes identical paths.
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const staticAlt = STATIC_ALTERNATES[pathname];
        if (staticAlt) {
          item.links = toLinks(staticAlt.urls, staticAlt.xDefault);
          return item;
        }
        const articleAlt = ARTICLE_ALTERNATES[pathname];
        if (articleAlt) {
          item.links = toLinks(articleAlt, articleAlt.en);
        }
        return item;
      },
    }),
  ],
});
