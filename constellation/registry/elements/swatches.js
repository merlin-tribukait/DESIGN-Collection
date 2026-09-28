module.exports = {
  id: 'swatches', level: 'atom', owner: 'shared', born: 'merlin',
  title: 'Token Swatches', description: 'Live read-out of this brand\u2019s contract slots. Edit the source token file and this changes.',
  render: ({ brand }) => {
    const keys = ['primary','secondary','metallic','bg','surface','border','textPrimary','textSecondary'];
    return `<div class="c-swatches">${keys.map((k) => `
      <div class="c-swatch">
        <div class="c-swatch-chip" style="background:${brand.slots[k]}"></div>
        <div class="c-swatch-meta"><strong>${k}</strong><code>${brand.slots[k]}</code></div>
      </div>`).join('')}</div>`;
  }
};
