/**
 * Build-time helper (imported by astro.config.mjs).
 *
 * Reads the article frontmatter from disk and groups the three locale versions
 * of each topic by their shared `translationKey`. This replaces the hardcoded
 * ARTICLE_PAIRS map that used to live in scripts/build-articles.js, and lets the
 * sitemap emit correct hreflang alternates for the divergent per-locale slugs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, '..', 'src', 'content', 'articles');
const LOCALES = ['en', 'ja', 'zh'];

function readArticles() {
  const articles = [];
  for (const lang of LOCALES) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'));
      articles.push({
        lang,
        slug: file.replace(/\.md$/, ''),
        translationKey: data.translationKey,
      });
    }
  }
  return articles;
}

/**
 * @returns map of article pathname (no trailing slash) -> { en, ja, zh } URL paths
 *          for whichever locales exist for that topic.
 */
export function articleAlternates() {
  const articles = readArticles();
  const byKey = {};
  for (const a of articles) {
    (byKey[a.translationKey] ||= {})[a.lang] = a.slug;
  }

  const map = {};
  for (const a of articles) {
    const group = byKey[a.translationKey] || {};
    const urls = {};
    for (const lang of LOCALES) {
      if (group[lang]) urls[lang] = `/${lang}/articles/${group[lang]}`;
    }
    map[`/${a.lang}/articles/${a.slug}`] = urls;
  }
  return map;
}
