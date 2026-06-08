/* ═══════════════════════════════════════
   inventory.js — Renders skills inventory
   ═══════════════════════════════════════ */

(function initInventory() {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;

  DATA.skills.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'inv-item';
    item.innerHTML = `
      ${skill.svg}
      <span class="inv-name">${skill.name}</span>
    `;
    grid.appendChild(item);
  });
})();