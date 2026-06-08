/* ═══════════════════════════════════════
   projects.js — Renders project cards
   ═══════════════════════════════════════ */

(function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const gitIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`;
  const extIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  DATA.projects.forEach(proj => {
    const card = document.createElement('div');
    card.className = `proj-card anim-slide-up${proj.status === 'upcoming' ? ' proj-upcoming' : ''}`;

    const thumbContent = proj.image
      ? `<img src="${proj.image}" alt="${proj.name}" loading="lazy" />`
      : `<div class="proj-thumb-empty"><span>PROJECT_${proj.id}</span></div>`;

    const upcomingBadge = proj.status === 'upcoming'
      ? `<div class="proj-upcoming-badge">UPCOMING</div>` : '';

    const tagsHTML = proj.tech.map(t =>
      `<span class="proj-tag">${t}</span>`
    ).join('');

    const linksHTML = proj.status === 'upcoming'
      ? `<span class="proj-coming">— IN PROGRESS, COMING SOON —</span>`
      : `
        ${proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener" class="proj-link">${gitIcon} CODE</a>` : ''}
        ${proj.live   ? `<a href="${proj.live}"   target="_blank" rel="noopener" class="proj-link">${extIcon} LIVE</a>` : ''}
      `;

    card.innerHTML = `
      <div class="proj-thumb">
        ${thumbContent}
        <div class="proj-tech-badge">${proj.tech[0]}</div>
        ${upcomingBadge}
      </div>
      <h3 class="proj-title">${proj.name}</h3>
      <p class="proj-desc">${proj.desc}</p>
      <div class="proj-tags">${tagsHTML}</div>
      <div class="proj-links">${linksHTML}</div>
    `;

    grid.appendChild(card);
  });
})();