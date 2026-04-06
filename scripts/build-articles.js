import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { commonHeadTags } from '../src/head-common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const articlesDir = path.join(rootDir, 'articles');

const SITE_BASE = 'https://pavilion.asianews.blog';

const ARTICLE_PAIRS = {
  'malaysia-property-guide-japanese-buyers': 'malaysia-fudosan-kounyu-kanzen-guide',
  'japanese-buy-property-malaysia-rules': 'nihonjin-malaysia-fudosan-kounyu-rule',
  'mont-kiara-japanese-expat-guide': 'mont-kiara-nihonjin-guide',
  'malaysia-mm2h-property-japanese': 'malaysia-mm2h-fudosan-nihonjin',
  'klang-valley-buy-vs-rent-japanese-expat': 'klang-valley-kounyu-vs-chintai',
  'klang-valley-best-areas-japanese-families': 'klang-valley-nihonjin-kazoku-area',
  'malaysia-property-investment-japanese-buyers': 'malaysia-fudosan-toshi-nihonjin',
  'guaranteed-return-rate-malaysia-property': 'malaysia-fudosan-rimawari-hosho-grr',
};

const JA_TO_EN = Object.fromEntries(
  Object.entries(ARTICLE_PAIRS).map(([en, ja]) => [ja, en])
);

function getHreflangTags(slug, lang) {
  let enSlug, jaSlug;
  if (lang === 'ja') {
    jaSlug = slug;
    enSlug = JA_TO_EN[slug];
  } else {
    enSlug = slug;
    jaSlug = ARTICLE_PAIRS[slug];
  }
  if (!enSlug || !jaSlug) return '';
  const enUrl = `${SITE_BASE}/articles/${enSlug}.html`;
  const jaUrl = `${SITE_BASE}/articles/ja/${jaSlug}.html`;
  return `    <link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="ja" href="${jaUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;
}

const getShellHTML = (title, metaDesc, lang, hreflangTags) => `
<!doctype html>
<html lang="${lang}">
  <head>
${commonHeadTags}
    <title>${title} | Pavilion Imperial Residences</title>
    <meta name="description" content="${metaDesc}" />
${hreflangTags}
  </head>
  <body>
    <div id="header-slot"></div>
    <div class="article-page">
      <a href="/articles.html" class="back-link">${lang === 'ja' ? '← インサイト一覧に戻る' : '← Back to Insights'}</a>
`;

const shellFooterHTML = `
    </div>
    <div id="footer-slot"></div>
    <script type="module" src="/src/subpage.js"></script>
  </body>
</html>
`;

function processArticle(filePath, lang) {
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

  const slug = path.basename(filePath, '.md');
  const hreflangTags = getHreflangTags(slug, lang);
  const finalHTML = getShellHTML(docTitle, metaDesc, lang, hreflangTags) + htmlContent + shellFooterHTML;

  const outFilePath = filePath.replace('.md', '.html');
  fs.writeFileSync(outFilePath, finalHTML, 'utf-8');
  console.log(`Successfully built ${lang === 'ja' ? 'ja/' : ''}${path.basename(outFilePath)}`);
}

function buildArticles() {
  // Build EN articles (flat in articles/)
  fs.readdirSync(articlesDir).forEach(file => {
    if (file.endsWith('.md')) {
      processArticle(path.join(articlesDir, file), 'en');
    }
  });

  // Build JA articles (in articles/ja/)
  const jaDir = path.join(articlesDir, 'ja');
  if (fs.existsSync(jaDir)) {
    fs.readdirSync(jaDir).forEach(file => {
      if (file.endsWith('.md')) {
        processArticle(path.join(jaDir, file), 'ja');
      }
    });
  }
}

buildArticles();
