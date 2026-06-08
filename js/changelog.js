/* ═══════════════════════════════════════
   changelog.js — Renders changelog items
   ═══════════════════════════════════════ */

(function initChangelog() {
  const list = document.getElementById('changelogList');
  if (!list) return;

  DATA.changelog.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cl-item anim-slide-left';
    div.innerHTML = `
      <div class="cl-dot"></div>
      <span class="cl-year">${item.year}</span>
      <h3 class="cl-title">${item.title}</h3>
      <p class="cl-desc">${item.desc}</p>
    `;
    list.appendChild(div);
  });
})();