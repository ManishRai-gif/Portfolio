/* ═══════════════════════════════════════
   theme.js — Dark / Light Mode Toggle
   ═══════════════════════════════════════ */

(function initTheme() {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const KEY    = 'portfolio-theme';

  /* Read saved preference, default to dark */
  const saved = localStorage.getItem(KEY) || 'dark';
  html.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  });
})();