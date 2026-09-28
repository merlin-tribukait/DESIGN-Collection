module.exports = {
  id: 'button', level: 'atom', owner: 'shared', born: 'aetheris',
  title: 'Button', description: 'Primary / secondary / ghost. Radius, glow and motion come from the brand personality.',
  render: () => `
    <div class="c-row">
      <button class="c-btn c-btn-primary">Primary action</button>
      <button class="c-btn c-btn-secondary">Secondary</button>
      <button class="c-btn c-btn-ghost">Ghost</button>
      <button class="c-btn c-btn-primary" disabled>Disabled</button>
    </div>`
};
