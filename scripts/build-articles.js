import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { commonHeadTags } from '../src/head-common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const articlesDir = path.join(rootDir, 'articles');

const getShellHTML = (title, metaDesc) => `
<!doctype html>
<html lang="en">
  <head>
${commonHeadTags}
    <title>${title} | Pavilion Imperial Residences</title>
    <meta name="description" content="${metaDesc}" />
  </head>
  <body>
    <div id="header-slot"></div>
    <div class="article-page">
      <a href="/articles.html" class="back-link">← Back to Insights</a>
`;

const shellFooterHTML = `
    </div>
    <div id="footer-slot"></div>
    <script type="module" src="/src/subpage.js"></script>
  </body>
</html>
`;

function buildArticles() {
  const files = fs.readdirSync(articlesDir);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesDir, file);
      let markdownContent = fs.readFileSync(filePath, 'utf-8');

      // Extract H1 for document title
      let docTitle = 'Insight Guide';
      const h1Match = markdownContent.match(/^#\s+(.*)$/m);
      if (h1Match) {
         docTitle = h1Match[1];
         let h1Count = 0;
         markdownContent = markdownContent.replace(/^#\s+.*$/gm, (match) => {
            h1Count++;
            return h1Count > 1 ? '' : match;
         });
      }

      // Extract Meta Description
      let metaDesc = '';
      const metaDescMatch = markdownContent.match(/^(?:\*\*Meta description:\*\*|\*\*メタディスクリプション：\*\*)\s*(.*)$/m);
      if (metaDescMatch) {
         metaDesc = metaDescMatch[1].trim();
      }

      let htmlContent = marked(markdownContent);

      // Auto-append .html to any internal cross-reference that starts with / and has no extension
      htmlContent = htmlContent.replace(/href="(\/[^."]+)"/g, 'href="/articles$1.html"');

      // Hide SEO metadata from visual rendering but keep in DOM for crawlers
      htmlContent = htmlContent.replace(/<p><strong>Meta description:<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      htmlContent = htmlContent.replace(/<p><strong>Target keywords:<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      htmlContent = htmlContent.replace(/<p><strong>メタディスクリプション：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      htmlContent = htmlContent.replace(/<p><strong>ターゲットキーワード：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);

      const finalHTML = getShellHTML(docTitle, metaDesc) + htmlContent + shellFooterHTML;

      const outFilePath = filePath.replace('.md', '.html');
      fs.writeFileSync(outFilePath, finalHTML, 'utf-8');
      console.log(`Successfully built ${path.basename(outFilePath)}`);
    }
  });
}

buildArticles();
