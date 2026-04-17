import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { commonHeadTags } from '../src/head-common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const enArticlesDir = path.join(rootDir, 'en', 'articles');
const jaArticlesDir = path.join(rootDir, 'ja', 'articles');
const zhArticlesDir = path.join(rootDir, 'zh', 'articles');

const SITE_BASE = 'https://pavilion.asianews.blog';

const ARTICLE_PAIRS = {
  'malaysia-property-guide-japanese-buyers':    { ja: 'malaysia-fudosan-kounyu-kanzen-guide', zh: 'malaixiya-fangdichan-zhinan-zhongguoren' },
  'japanese-buy-property-malaysia-rules':       { ja: 'nihonjin-malaysia-fudosan-kounyu-rule', zh: 'zhongguoren-malaixiya-goufang-guize' },
  'mont-kiara-japanese-expat-guide':            { ja: 'mont-kiara-nihonjin-guide', zh: 'mont-kiara-zhongguoren-zhinan' },
  'malaysia-mm2h-property-japanese':            { ja: 'malaysia-mm2h-fudosan-nihonjin', zh: 'malaixiya-mm2h-zhongguoren-zhinan' },
  'klang-valley-buy-vs-rent-japanese-expat':    { ja: 'klang-valley-kounyu-vs-chintai', zh: 'baxinggu-goufang-vs-zulin-zhongguoren' },
  'klang-valley-best-areas-japanese-families':  { ja: 'klang-valley-nihonjin-kazoku-area', zh: 'baxinggu-zhongguo-jiating-quyu' },
  'malaysia-property-investment-japanese-buyers': { ja: 'malaysia-fudosan-toshi-nihonjin', zh: 'malaixiya-fangdichan-touzi-zhongguoren' },
  'guaranteed-return-rate-malaysia-property':   { ja: 'malaysia-fudosan-rimawari-hosho-grr', zh: 'malaixiya-fangdichan-baozheng-huibao' },
  'kuala-lumpur-property-guide-japanese-buyers': { ja: 'kuala-lumpur-fudosan-guide-nihonjin', zh: 'jilongpo-fangdichan-zhinan-zhongguoren' },
  'klcc-bukit-bintang-property-japanese-buyers': { ja: 'klcc-bukit-bintang-fudosan-nihonjin', zh: 'klcc-bukit-bintang-zhongguoren-zhinan' },
  'mont-kiara-best-condos-japanese-buyers':     { ja: 'mont-kiara-best-condo-nihonjin', zh: 'mont-kiara-gongyu-bijiao-zhongguoren' },
};

const JA_TO_EN = Object.fromEntries(
  Object.entries(ARTICLE_PAIRS).map(([en, pair]) => [pair.ja, en])
);
const ZH_TO_EN = Object.fromEntries(
  Object.entries(ARTICLE_PAIRS).map(([en, pair]) => [pair.zh, en])
);

function getHreflangTags(slug, lang) {
  let enSlug;
  if (lang === 'ja')      enSlug = JA_TO_EN[slug];
  else if (lang === 'zh') enSlug = ZH_TO_EN[slug];
  else                    enSlug = slug;
  const pair = ARTICLE_PAIRS[enSlug];
  if (!enSlug || !pair) return '';
  const enUrl = `${SITE_BASE}/en/articles/${enSlug}`;
  const jaUrl = `${SITE_BASE}/ja/articles/${pair.ja}`;
  const zhUrl = `${SITE_BASE}/zh/articles/${pair.zh}`;
  return `    <link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="ja" href="${jaUrl}" />\n    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`;
}

const HTML_LANG = { en: 'en', ja: 'ja', zh: 'zh-CN' };
const ARTICLES_INDEX_PATH = { en: '/en/articles', ja: '/ja/articles', zh: '/zh/articles' };
const BACK_LINK_LABEL = { en: '← Back to Insights', ja: '← インサイト一覧に戻る', zh: '← 返回文章列表' };

const getShellHTML = (title, metaDesc, lang, hreflangTags) => `
<!doctype html>
<html lang="${HTML_LANG[lang] || lang}">
  <head>
${commonHeadTags}
    <title>${title} | Pavilion Imperial Residences</title>
    <meta name="description" content="${metaDesc}" />
${hreflangTags}
  </head>
  <body>
    <div id="header-slot"></div>
    <div class="article-page">
      <a href="${ARTICLES_INDEX_PATH[lang]}" class="back-link">${BACK_LINK_LABEL[lang]}</a>
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
  const metaDescMatch = markdownContent.match(/^(?:\*\*Meta description:\*\*|\*\*メタディスクリプション：\*\*|\*\*元描述：\*\*)\s*(.*)$/m);
  if (metaDescMatch) {
     metaDesc = metaDescMatch[1].trim();
  }

  let htmlContent = marked(markdownContent);

  // Rewrite internal cross-references to clean URLs (no .html extension)
  const articlePrefix = `/${lang}/articles`;
  htmlContent = htmlContent.replace(/href="(\/[^."]+)"/g, `href="${articlePrefix}$1"`);

  // Hide SEO metadata from visual rendering but keep in DOM for crawlers
  htmlContent = htmlContent.replace(/<p><strong>Meta description:<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
  htmlContent = htmlContent.replace(/<p><strong>Target keywords:<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
  htmlContent = htmlContent.replace(/<p><strong>メタディスクリプション：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
  htmlContent = htmlContent.replace(/<p><strong>ターゲットキーワード：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
  htmlContent = htmlContent.replace(/<p><strong>元描述：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);
  htmlContent = htmlContent.replace(/<p><strong>目标关键词：<\/strong>.*?<\/p>/gs, match => `<div style="display: none;">${match}</div>`);

  const slug = path.basename(filePath, '.md');
  const hreflangTags = getHreflangTags(slug, lang);
  const finalHTML = getShellHTML(docTitle, metaDesc, lang, hreflangTags) + htmlContent + shellFooterHTML;

  const langArticlesDir = path.join(rootDir, lang, 'articles');
  if (!fs.existsSync(langArticlesDir)) fs.mkdirSync(langArticlesDir, { recursive: true });
  const outFilePath = path.join(langArticlesDir, path.basename(filePath).replace('.md', '.html'));
  fs.writeFileSync(outFilePath, finalHTML, 'utf-8');
  console.log(`Successfully built ${lang}/${path.basename(outFilePath)}`);
}

function buildArticles() {
  const dirs = [
    { dir: enArticlesDir, lang: 'en' },
    { dir: jaArticlesDir, lang: 'ja' },
    { dir: zhArticlesDir, lang: 'zh' },
  ];
  for (const { dir, lang } of dirs) {
    if (!fs.existsSync(dir)) continue;
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.md')) processArticle(path.join(dir, file), lang);
    });
  }
}

buildArticles();
