import './style.css'
import { renderHeader, initHeaderInteractions } from './components/header.js'

document.addEventListener('DOMContentLoaded', () => {
  // Inject shared components
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) {
    headerSlot.outerHTML = renderHeader({ fixed: false, full: true });
  }

  initHeaderInteractions();

  // Sticky header
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after revealing so it doesn't replay on every scroll up/down
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
  });

});
