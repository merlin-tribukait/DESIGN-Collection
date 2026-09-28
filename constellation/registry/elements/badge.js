module.exports = {
  id: 'badge', level: 'atom', owner: 'shared', born: 'reborn',
  title: 'Badge & Status Dot', description: 'Status vocabulary shared across all three properties.',
  render: () => `
    <div class="c-row">
      <span class="c-badge c-badge-accent">FEATURED</span>
      <span class="c-badge">v2.0.0</span>
      <span class="c-badge"><i class="c-dot c-dot-ok"></i> Operational</span>
      <span class="c-badge"><i class="c-dot c-dot-warn"></i> Degraded</span>
      <span class="c-badge"><i class="c-dot c-dot-err"></i> Offline</span>
    </div>`
};
