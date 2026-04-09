import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { commonHeadTags } from './src/head-common.js';

const root = resolve(__dirname);
const enPath = resolve(root, 'en');

const getHtmlEntries = () => {
  const entries = {};

  // Root level HTML files (index.html, articles.html, etc.)
  fs.readdirSync(root).forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      entries[name] = resolve(root, file);
    }
  });

  // English pages (en/index.html, en/articles.html)
  if (fs.existsSync(enPath)) {
    fs.readdirSync(enPath).forEach(file => {
      if (file.endsWith('.html')) {
        entries[`en_${file.replace('.html', '')}`] = resolve(enPath, file);
      }
    });

  }

  // English articles (en/articles/*.html)
  const enArticlesPath = resolve(enPath, 'articles');
  if (fs.existsSync(enArticlesPath)) {
    fs.readdirSync(enArticlesPath).forEach(file => {
      if (file.endsWith('.html')) {
        entries[`en_article_${file.replace('.html', '')}`] = resolve(enArticlesPath, file);
      }
    });
  }

  // Japanese articles (ja/articles/*.html)
  const jaArticlesPath = resolve(root, 'ja', 'articles');
  if (fs.existsSync(jaArticlesPath)) {
    fs.readdirSync(jaArticlesPath).forEach(file => {
      if (file.endsWith('.html')) {
        entries[`ja_article_${file.replace('.html', '')}`] = resolve(jaArticlesPath, file);
      }
    });
  }
  return entries;
};

/** Injects common head tags into every HTML page */
function commonHeadPlugin() {
  return {
    name: 'inject-common-head',
    transformIndexHtml(html) {
      return html.replace('<!--common-head-->', commonHeadTags);
    }
  };
}

export default defineConfig({
  plugins: [commonHeadPlugin()],
  build: {
    rollupOptions: {
      input: getHtmlEntries()
    }
  }
});
