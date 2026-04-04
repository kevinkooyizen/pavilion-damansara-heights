import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const articlesDir = path.join(rootDir, 'articles');

const getShellHTML = (title, metaDesc) => `
<!doctype html>
<html lang="en">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KQ6CEH0DXS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KQ6CEH0DXS');
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Pavilion Imperial Residences</title>
    <meta name="description" content="${metaDesc}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
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
