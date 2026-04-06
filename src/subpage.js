import './style.css'
import { renderHeader } from './components/header.js'
import { renderFooterMinimal } from './components/footer.js'

document.addEventListener('DOMContentLoaded', () => {
  // Inject header
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) {
    headerSlot.outerHTML = renderHeader({ fixed: true });
  }

  // Inject footer
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    footerSlot.outerHTML = renderFooterMinimal();
  }
});
