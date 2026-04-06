import './style.css'
import { renderHeader } from './components/header.js'

document.addEventListener('DOMContentLoaded', () => {
  // Inject shared components
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) {
    headerSlot.outerHTML = renderHeader({ fixed: false, full: true });
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when a nav link is tapped
    mobileMenu.querySelectorAll('.mobile-menu-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

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

  // Language Dropdowns (desktop + mobile)
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

});
