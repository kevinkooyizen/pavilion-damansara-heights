// Global client behaviour, ported from the old src/main.js:
// sticky header on scroll, back-to-top button, and IntersectionObserver
// scroll-reveal animations.
function initSite() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrolled = window.scrollY > 50;
    // Fixed headers (article/index pages) stay in the scrolled state; only the
    // transparent homepage header toggles as the user scrolls past the hero.
    if (header && header.dataset.fixed !== 'true') {
      header.classList.toggle('scrolled', scrolled);
    }
    if (backToTop) backToTop.classList.toggle('show', scrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
}

initSite();
