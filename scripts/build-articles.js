import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const articlesDir = path.join(rootDir, 'articles');

const headerHTML = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pavilion Imperial Residences | Insight Guide</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/src/style.css">
    <style>
      .article-page {
        padding: 150px 10%;
        max-width: 900px;
        margin: 0 auto;
        background: #fff;
        line-height: 1.8;
      }
      .article-page h1 {
        font-family: var(--font-serif);
        color: var(--charcoal);
        margin-bottom: 2rem;
        font-size: 2.5rem;
      }
      .article-page h2 {
        font-family: var(--font-serif);
        color: var(--gold);
        margin-top: 3rem;
        margin-bottom: 1.5rem;
      }
      .article-page h3 {
        color: var(--charcoal);
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      .article-page p {
        color: #444;
        margin-bottom: 1.5rem;
        font-size: 1.05rem;
      }
      .article-page ul, .article-page ol {
        margin-bottom: 2rem;
        padding-left: 1.5rem;
        color: #444;
      }
      .article-page li {
        margin-bottom: 0.5rem;
      }
      .article-page blockquote {
        border-left: 4px solid var(--gold);
        padding-left: 20px;
        margin-left: 0;
        font-style: italic;
        color: #666;
      }
      .article-page a {
        color: var(--gold);
        text-decoration: none;
      }
      .article-page a:hover {
        text-decoration: underline;
      }
      .back-link {
        display: inline-block;
        margin-bottom: 30px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <header id="header" class="scrolled">
      <div class="header-container" style="background: rgba(255, 255, 255, 0.95); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);">
        <div class="logo"><a href="/" style="text-decoration: none; color: inherit;">PAVILION<br><span>DAMANSARA HEIGHTS</span><br><span>KUALA LUMPUR</span></a></div>
      </div>
    </header>
    <div class="article-page">
      <a href="/articles.html" class="back-link">← Back to Insights</a>
`;

const footerHTML = `
    </div>
    <footer class="footer" style="margin-top: 100px;">
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 50px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 50px; text-align: left; max-width: 1200px; margin: 0 auto;">
        <div>
          <h3 style="font-size: 1.2rem; color: var(--gold); font-family: var(--font-sans); letter-spacing: 2px; margin-bottom: 15px;">PAVILION</h3>
          <p style="font-size: 0.85rem; color: #888; line-height: 1.8;">The Height of Integrated Living.<br>Damansara Heights, KL.</p>
        </div>
      </div>
    </footer>
  </body>
</html>
`;

function buildArticles() {
  const files = fs.readdirSync(articlesDir);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesDir, file);
      const markdownContent = fs.readFileSync(filePath, 'utf-8');
      
      let htmlContent = marked(markdownContent);
      
      // Auto-append .html to any internal cross-reference that starts with / and has no extension
      htmlContent = htmlContent.replace(/href="(\/[^."]+)"/g, 'href="/articles$1.html"');
      
      // Hide SEO metadata from visual rendering but keep in DOM for crawlers
      htmlContent = htmlContent.replace(/<p><strong>Meta description:<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      htmlContent = htmlContent.replace(/<p><strong>Target keywords:<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      htmlContent = htmlContent.replace(/<p><strong>メタディスクリプション：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      htmlContent = htmlContent.replace(/<p><strong>ターゲットキーワード：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
      
      const finalHTML = headerHTML + htmlContent + footerHTML;
      
      const outFilePath = filePath.replace('.md', '.html');
      fs.writeFileSync(outFilePath, finalHTML, 'utf-8');
      console.log(`Successfully built ${path.basename(outFilePath)}`);
    }
  });
}

buildArticles();
