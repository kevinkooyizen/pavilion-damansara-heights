import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

const root = resolve(__dirname);
const articlesPath = resolve(root, 'articles');

const getHtmlEntries = () => {
  const entries = {
    main: resolve(root, 'index.html'),
    articlesIndex: resolve(root, 'articles.html')
  };
  
  if (fs.existsSync(articlesPath)) {
    const files = fs.readdirSync(articlesPath);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const name = file.replace('.html', '');
        entries[`article_${name}`] = resolve(articlesPath, file);
      }
    });
  }
  return entries;
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: getHtmlEntries()
    }
  }
});
