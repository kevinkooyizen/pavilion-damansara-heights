import logoUrl from '../assets/logo.webp'

/**
 * Renders the site header.
 * @param {Object} options
 * @param {boolean} options.fixed - If true, header starts with 'scrolled' class (inner pages)
 * @param {boolean} options.full  - If true, render full nav + actions (homepage only)
 */
export function renderHeader({ fixed = false, full = false } = {}) {
  const htmlLang = (document.documentElement.lang || 'en').toLowerCase();
  const lang = htmlLang.startsWith('zh') ? 'zh'
             : htmlLang.startsWith('ja') ? 'ja'
             : 'en';

  const dicts = {
    en: {
      about: "Overview", facilities: "Facilities", floorplans: "Floor Plans", location: "Location",
      book: "Book Viewing", call: "📞 Call Now", articles: "Insights", langText: "English",
      home: "/en/", homeLink: "/en/", articlesLink: "/en/articles.html", homeLabel: "Home"
    },
    ja: {
      about: "概要", facilities: "施設", floorplans: "間取り図", location: "所在地",
      book: "内覧予約", call: "📞 今すぐ電話", articles: "記事", langText: "日本語",
      home: "/ja/", homeLink: "/ja/", articlesLink: "/ja/articles.html", homeLabel: "ホーム"
    },
    zh: {
      about: "概览", facilities: "设施", floorplans: "户型图", location: "位置",
      book: "预约看房", call: "📞 立即致电", articles: "文章", langText: "中文",
      home: "/zh/", homeLink: "/zh/", articlesLink: "/zh/articles.html", homeLabel: "首页"
    }
  };
  const dict = dicts[lang];

  // Detect other language URLs from hreflang or fallback
  const jaHref = document.querySelector('link[hreflang="ja"]')?.getAttribute('href') || '/ja/';
  const enHref = document.querySelector('link[hreflang="en"]')?.getAttribute('href') || '/en/';
  const zhHref = document.querySelector('link[hreflang="zh-CN"]')?.getAttribute('href') || '/zh/';

  const bookHref = `${dict.homeLink}#contact`;
  const telHref = 'tel:+60312345678';

  const navLinks = full ? `
    <nav class="nav-links">
      <a href="${dict.homeLink}#about">${dict.about}</a>
      <a href="${dict.homeLink}#amenities">${dict.facilities}</a>
      <a href="${dict.homeLink}#floorplan">${dict.floorplans}</a>
      <a href="${dict.homeLink}#location">${dict.location}</a>
    </nav>` : `
    <nav class="nav-links">
      <a href="${dict.homeLink}">${dict.homeLabel}</a>
      <a href="${dict.articlesLink}">${dict.articles}</a>
    </nav>`;

  const navActions = `
    <div class="nav-actions">
      <div class="dropdown">
        <button class="btn btn-outline lang-btn" style="color: inherit; border-color: inherit;">${dict.langText} ▾</button>
        <div class="dropdown-content">
          <a href="${jaHref}">日本語</a>
          <a href="${enHref}">English</a>
          <a href="${zhHref}">中文</a>
        </div>
      </div>
      <a href="${bookHref}" class="btn btn-gold">${dict.book}</a>
      <a href="${telHref}" class="btn btn-outline call-btn" style="border-color: var(--gold); color: var(--gold)">${dict.call}</a>
    </div>`;

  const hamburger = `
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>`;

  const mobileMenu = `
    <div class="mobile-menu" id="mobile-menu">
      <nav class="mobile-menu-links">
        <a href="${dict.homeLink}">${dict.homeLabel}</a>
        <a href="${dict.articlesLink}">${dict.articles}</a>
        <a href="${dict.homeLink}#about">${dict.about}</a>
        <a href="${dict.homeLink}#amenities">${dict.facilities}</a>
        <a href="${dict.homeLink}#floorplan">${dict.floorplans}</a>
        <a href="${dict.homeLink}#location">${dict.location}</a>
      </nav>
      <div class="mobile-menu-actions">
        <div class="dropdown mobile-dropdown">
          <button class="btn btn-outline lang-btn" style="color: var(--charcoal); border-color: #ddd;">${dict.langText} ▾</button>
          <div class="dropdown-content">
            <a href="${jaHref}">日本語</a>
            <a href="${enHref}">English</a>
            <a href="${zhHref}">中文</a>
          </div>
        </div>
        <a href="${bookHref}" class="btn btn-gold btn-large" style="width: 100%;">${dict.book}</a>
        <a href="${telHref}" class="btn btn-outline btn-large" style="width: 100%; border-color: var(--gold); color: var(--gold);">${dict.call}</a>
      </div>
    </div>`;

  const logoFilter = fixed ? '' : 'filter: brightness(0) invert(1);';

  return `
    <header id="header"${fixed ? ' class="scrolled"' : ''}>
      <div class="header-container">
        <div class="logo"><a href="${dict.homeLink}"><img src="${logoUrl}" alt="Pavilion Damansara Heights Logo" style="height: 50px; display: block; ${logoFilter}" class="header-logo-img" /></a></div>
        ${navLinks}
        <div class="nav-right">
          ${navActions}
          ${hamburger}
        </div>
      </div>
      ${mobileMenu}
    </header>`;
}

/**
 * Wires up hamburger + language dropdown interactions.
 * Safe to call on any page that renders the header.
 */
export function initHeaderInteractions() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('.mobile-menu-links a, .mobile-menu-actions a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  const dropdowns = document.querySelectorAll('.dropdown');
  const langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.closest('.dropdown');
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });
  });

  window.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('show'));
  });
}
