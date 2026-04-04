import logoUrl from '../assets/logo.webp'

/**
 * Renders the site header.
 * @param {Object} options
 * @param {boolean} options.fixed - If true, header starts with 'scrolled' class (inner pages)
 * @param {boolean} options.full  - If true, render full nav + actions (homepage only)
 */
export function renderHeader({ fixed = false, full = false } = {}) {
  const nav = full ? `
    <nav class="nav-links">
      <a href="#about" data-i18n="nav_about">概要</a>
      <a href="#amenities" data-i18n="nav_facilities">施設</a>
      <a href="#floorplan" data-i18n="nav_floorplans">間取り図</a>
      <a href="#location" data-i18n="nav_location">所在地</a>
    </nav>
    <div class="nav-actions">
      <div class="dropdown">
        <button class="btn btn-outline lang-btn" style="color: inherit; border-color: inherit;">日本語 ▾</button>
        <div class="dropdown-content">
          <a href="#" data-lang="ja">日本語</a>
          <a href="#" data-lang="en">English</a>
        </div>
      </div>
      <button class="btn btn-gold" data-i18n="nav_book">内覧予約</button>
      <button class="btn btn-outline call-btn" style="border-color: var(--gold); color: var(--gold)" data-i18n="nav_call">📞 今すぐ電話</button>
    </div>` : '';

  const logoFilter = fixed ? '' : 'filter: brightness(0) invert(1);';

  return `
    <header id="header"${fixed ? ' class="scrolled"' : ''}>
      <div class="header-container">
        <div class="logo"><a href="/"><img src="${logoUrl}" alt="Pavilion Damansara Heights Logo" style="height: 50px; display: block; ${logoFilter}" class="header-logo-img" /></a></div>
        ${nav}
        <div class="hamburger-menu" id="hamburgerMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>`;
}
