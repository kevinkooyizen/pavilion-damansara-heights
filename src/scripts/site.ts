// Global client behaviour, ported from the old src/main.js:
// sticky header on scroll, back-to-top button, and IntersectionObserver
// scroll-reveal animations.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function initSite() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const leadForm = document.getElementById('leadForm');
  const whatsappBtn = document.getElementById('whatsappBtn');

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

  // The homepage lead form has no backend; we only track submit attempts in
  // GA4 and acknowledge the visitor with a localized thank-you message.
  if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();

      window.gtag?.('event', 'generate_lead', {
        form_location: 'homepage_footer',
        language: leadForm.dataset.lang,
      });

      const message = document.createElement('p');
      message.textContent = leadForm.dataset.thanks ?? 'Thank you.';
      message.style.cssText =
        'color: var(--gold); font-size: 1.1rem; text-align: center; padding: 20px 0; margin: 0;';
      leadForm.replaceWith(message);
    });
  }

  // Track clicks on the floating WhatsApp button (no destination wired up yet;
  // analytics only).
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.gtag?.('event', 'whatsapp_click', {
        button_location: 'floating_action',
      });
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
