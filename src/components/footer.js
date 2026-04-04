/**
 * Renders a minimal footer (used on article/subpages).
 */
export function renderFooterMinimal() {
  return `
    <footer class="footer" style="margin-top: 100px;">
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 50px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 50px; text-align: left; max-width: 1200px; margin: 0 auto;">
        <div>
          <img src="/src/assets/logo.webp" alt="Pavilion Damansara Heights Logo" style="height: 40px; display: block; margin-bottom: 15px; filter: brightness(0) invert(1); opacity: 0.9;" />
          <p style="font-size: 0.85rem; color: #888; line-height: 1.8;">The Height of Integrated Living.<br>Damansara Heights, KL.</p>
        </div>
      </div>
    </footer>`;
}
