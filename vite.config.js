import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { commonHeadTags } from './src/head-common.js';

const root = resolve(__dirname);
const enPath = resolve(root, 'en');
const jaPath = resolve(root, 'ja');
const zhPath = resolve(root, 'zh');

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

  // Japanese pages (ja/index.html, ja/articles.html)
  if (fs.existsSync(jaPath)) {
    fs.readdirSync(jaPath).forEach(file => {
      if (file.endsWith('.html')) {
        entries[`ja_${file.replace('.html', '')}`] = resolve(jaPath, file);
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

  // Chinese pages (zh/index.html, zh/articles.html)
  if (fs.existsSync(zhPath)) {
    fs.readdirSync(zhPath).forEach(file => {
      if (file.endsWith('.html')) {
        entries[`zh_${file.replace('.html', '')}`] = resolve(zhPath, file);
      }
    });
  }

  // Chinese articles (zh/articles/*.html)
  const zhArticlesPath = resolve(zhPath, 'articles');
  if (fs.existsSync(zhArticlesPath)) {
    fs.readdirSync(zhArticlesPath).forEach(file => {
      if (file.endsWith('.html')) {
        entries[`zh_article_${file.replace('.html', '')}`] = resolve(zhArticlesPath, file);
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
