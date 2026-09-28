module.exports = {
  id: 'hero', level: 'organism', owner: 'shared', born: 'reborn',
  title: 'Hero', description: 'Eyebrow / headline / sub / actions. Same bones, three completely different temperaments.',
  render: ({ brand }) => `
    <section class="c-hero">
      <span class="c-label">${brand.name}</span>
      <h2 class="c-hero-title">Built once.<br><em>Worn three ways.</em></h2>
      <p class="c-hero-sub">${brand.blurb}</p>
      <div class="c-row">
        <button class="c-btn c-btn-primary">Enter ${brand.name}</button>
        <button class="c-btn c-btn-ghost">Read the guide</button>
      </div>
    </section>`
};
