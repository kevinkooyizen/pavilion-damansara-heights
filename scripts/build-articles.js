import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const articlesDir = path.join(rootDir, 'articles');

const getHeaderHTML = (title, metaDesc) => `
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
      <div class="header-container">
        <div class="logo"><a href="/"><img src="/src/assets/logo.webp" alt="Pavilion Damansara Heights Logo" style="height: 50px; display: block;" class="header-logo-img" /></a></div>
        <div class="hamburger-menu" id="hamburgerMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Drawer -->
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-header">
        <div class="logo"><a href="/"><img src="/src/assets/logo.webp" alt="Pavilion Damansara Heights" style="height: 40px; display: block; filter: brightness(0) invert(1);" /></a></div>
        <button class="close-menu" id="closeMenu">✕</button>
      </div>
      <div class="mobile-menu-body">
        <a href="/#about" class="mobile-nav-link" data-i18n="nav_about">概要</a>
        <a href="/#amenities" class="mobile-nav-link" data-i18n="nav_facilities">施設</a>
        <a href="/#floorplan" class="mobile-nav-link" data-i18n="nav_floorplans">間取り図</a>
        <a href="/articles.html" class="mobile-nav-link" data-i18n="nav_articles">記事 / Insights</a>
        <div class="mobile-lang-select">
          <span data-lang="ja" class="mobile-lang-btn active">日本語</span>
          <span data-lang="en" class="mobile-lang-btn">English</span>
        </div>
        <div class="mobile-menu-actions">
          <button class="btn btn-gold w-100" style="padding: 15px 0" data-i18n="nav_book">内覧予約</button>
          <button class="btn btn-dark-outline w-100" style="padding: 15px 0" data-i18n="nav_call">📞 今すぐ電話</button>
          <button class="btn btn-whatsapp w-100" style="padding: 15px 0">WHATSAPP</button>
          <button class="btn btn-line w-100" style="padding: 15px 0">LINE</button>
        </div>
      </div>
    </div>
    <div class="article-page">
      <a href="/articles.html" class="back-link">← Back to Insights</a>
`;

const footerHTML = `
    </div>
    <footer class="footer" style="margin-top: 100px;">
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 50px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 50px; text-align: left; max-width: 1200px; margin: 0 auto;">
        <div>
          <img src="/src/assets/logo.webp" alt="Pavilion Damansara Heights Logo" style="height: 40px; display: block; margin-bottom: 15px; filter: brightness(0) invert(1); opacity: 0.9;" />
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
      let markdownContent = fs.readFileSync(filePath, 'utf-8');
      
      // Extract H1 for document title
      let docTitle = 'Insight Guide';
      const h1Match = markdownContent.match(/^#\s+(.*)$/m);
      if (h1Match) {
         docTitle = h1Match[1];
         // Note: If the user meant the title shouldn't render twice, we could remove it here.
         // But we will keep it visually as H1 unless we find multiple. Let's just remove duplicate H1s.
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
      
      const finalHTML = getHeaderHTML(docTitle, metaDesc) + htmlContent + footerHTML;
      
      const outFilePath = filePath.replace('.md', '.html');
      fs.writeFileSync(outFilePath, finalHTML, 'utf-8');
      console.log(`Successfully built ${path.basename(outFilePath)}`);
    }
  });
}

buildArticles();
