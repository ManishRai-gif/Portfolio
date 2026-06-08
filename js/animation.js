/* ═══════════════════════════════════════
   animations.js — Scroll-triggered Reveals
   ═══════════════════════════════════════ */

/* ── Add keyframe styles ── */
const style = document.createElement('style');
style.textContent = `
  .anim-slide-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .anim-slide-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .anim-slide-left {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .anim-slide-left.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;
document.head.appendChild(style);

/* ── Observer ── */
(function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeAll() {
    document.querySelectorAll('.anim-slide-up, .anim-slide-left')
      .forEach(el => observer.observe(el));
  }

  /* Run after all dynamic content has been injected */
  if (document.readyState === 'complete') {
    observeAll();
  } else {
    window.addEventListener('load', observeAll);
  }
  setTimeout(observeAll, 300);
})();