/* ═══════════════════════════════════════
   palette.js — Ctrl+K Command Palette
   ═══════════════════════════════════════ */

(function initPalette() {
  const backdrop = document.getElementById('paletteBackdrop');
  const input    = document.getElementById('paletteInput');
  const results  = document.getElementById('paletteResults');
  const openBtn  = document.getElementById('openPalette');
  const closeBtn = document.getElementById('closePalette');

  function open() {
    backdrop.classList.add('open');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 50);
  }

  function close() {
    backdrop.classList.remove('open');
    input.value = '';
  }

  function navigate(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    close();
  }

  function renderResults(query) {
    const filtered = DATA.navItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      results.innerHTML = `<p class="palette-no-results">No results found.</p>`;
      return;
    }

    results.innerHTML = filtered.map(item => `
      <button class="palette-item" data-id="${item.id}">
        ${item.name}
        <span class="arrow">↵</span>
      </button>
    `).join('');

    results.querySelectorAll('.palette-item').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.id));
    });
  }

  /* Events */
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  /* Close on backdrop click */
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  /* Input filter */
  input.addEventListener('input', () => renderResults(input.value));

  /* Keyboard shortcuts */
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      backdrop.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && backdrop.classList.contains('open')) {
      const first = results.querySelector('.palette-item');
      if (first) first.click();
    }
  });
})();