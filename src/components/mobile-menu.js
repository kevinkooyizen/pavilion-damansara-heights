/**
 * Renders the mobile menu drawer.
 * @param {Object} options
 * @param {boolean} options.showArticlesLink - Show link to articles page
 */
export function renderMobileMenu({ showArticlesLink = false } = {}) {
  const articlesLink = showArticlesLink
    ? '<a href="/articles.html" class="mobile-nav-link" data-i18n="nav_articles">記事 / Insights</a>'
    : '';

  return `
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-header">
        <div class="logo"><a href="/"><img src="/src/assets/logo.webp" alt="Pavilion Damansara Heights" style="height: 40px; display: block; filter: brightness(0) invert(1);" /></a></div>
        <button class="close-menu" id="closeMenu">✕</button>
      </div>
      <div class="mobile-menu-body">
        <a href="/#about" class="mobile-nav-link" data-i18n="nav_about">概要</a>
        <a href="/#amenities" class="mobile-nav-link" data-i18n="nav_facilities">施設</a>
        <a href="/#floorplan" class="mobile-nav-link" data-i18n="nav_floorplans">間取り図</a>
        ${articlesLink}
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
    </div>`;
}

/** Initialize hamburger toggle behavior. Call after DOM is ready. */
export function initMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');

  if (!hamburgerMenu || !mobileMenu || !closeMenu) return;

  hamburgerMenu.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}
