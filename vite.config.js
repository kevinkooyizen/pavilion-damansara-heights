import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import { commonHeadTags } from './src/head-common.js';

const root = resolve(__dirname);
const articlesPath = resolve(root, 'articles');

const getHtmlEntries = () => {
  const entries = {};

  // Root level HTML files (index.html, index-en.html, articles.html, articles-en.html, etc.)
  fs.readdirSync(root).forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      entries[name] = resolve(root, file);
    }
  });

  if (fs.existsSync(articlesPath)) {
    const files = fs.readdirSync(articlesPath);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const name = file.replace('.html', '');
        entries[`article_${name}`] = resolve(articlesPath, file);
      }
    });

    const jaPath = resolve(articlesPath, 'ja');
    if (fs.existsSync(jaPath)) {
      fs.readdirSync(jaPath).forEach(file => {
        if (file.endsWith('.html')) {
          entries[`article_ja_${file.replace('.html', '')}`] = resolve(jaPath, file);
        }
      });
    }
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
