/* ═══════════════════════════════════════
   navbar.js
   Handles: scroll-to-top, theme toggle,
   active-section highlight, footer year.
   Mirrors Navbar.tsx behaviour exactly.
   ═══════════════════════════════════════ */

(function initNavbar() {

  /* ── DOM refs ── */
  const html        = document.documentElement;
  const themeBtn    = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTop');
  const sunIcon     = document.querySelector('.icon-sun');
  const moonIcon    = document.querySelector('.icon-moon');

  /* ─────────────────────────────────────
     1. THEME  (mirrors useTheme + resolvedTheme)
     Default = dark, persisted in localStorage.
     Sets data-theme on <html> — CSS vars
     in variables.css read this attribute.
  ───────────────────────────────────────*/
  const THEME_KEY = 'portfolio-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    syncIcons(theme);
    syncNavbarBg(theme);
    syncLogo(theme);
  }

  /* Show Sun when dark (click → go light), Moon when light (click → go dark).
     Matches: isDark ? <Sun> : <Moon> */
  function syncIcons(theme) {
    if (theme === 'dark') {
      sunIcon.style.display  = 'block';   // dark mode shows Sun icon
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display  = 'none';
      moonIcon.style.display = 'block';  // light mode shows Moon icon
    }
  }

  /* bg-zinc-100/80 in light, bg-zinc-950/80 in dark */
  function syncNavbarBg(theme) {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.style.background = theme === 'dark'
      ? 'rgba(9,9,11,0.8)'
      : 'rgba(244,244,245,0.8)';
  }

  /* bg-black text-white in light, bg-white text-black in dark
     shadow changes too — mirrors Tailwind dark: classes */
  function syncLogo(theme) {
    const logo = document.getElementById('scrollTop');
    if (!logo) return;
    if (theme === 'dark') {
      logo.style.background  = '#ffffff';
      logo.style.color       = '#000000';
      logo.style.boxShadow   = '4px 4px 0px 0px rgba(255,255,255,0.4)';
    } else {
      logo.style.background  = '#000000';
      logo.style.color       = '#ffffff';
      logo.style.boxShadow   = '4px 4px 0px 0px rgba(0,0,0,0.3)';
    }
  }

  /* Boot with saved/default theme — equivalent to mounted = true guard */
  applyTheme(getTheme());

  /* Toggle on click */
  themeBtn.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ─────────────────────────────────────
     2. SCROLL-TO-TOP  (mirrors scrollToTop())
  ───────────────────────────────────────*/
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────
     3. GLOBAL scrollTo(id) helper
     Used by hero "CONNECT" / "INVENTORY" buttons
     and palette navigation.
  ───────────────────────────────────────*/
  window.scrollToSection = function (id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ─────────────────────────────────────
     4. FOOTER YEAR
  ───────────────────────────────────────*/
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();