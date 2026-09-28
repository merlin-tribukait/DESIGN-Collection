module.exports = {
  id: 'metric-card', level: 'molecule', owner: 'shared', born: 'aetheris',
  title: 'Metric Card', description: 'Number-first card. Mono numerals, glow on hover.',
  render: () => {
    const data = [['UPTIME','99.98%','+0.04'],['LATENCY','118ms','-12ms'],['ACTIVE','3,842','+210']];
    return `<div class="c-grid-3">${data.map(([l,val,d]) => `
      <div class="c-card c-metric">
        <span class="c-label">${l}</span>
        <span class="c-metric-value">${val}</span>
        <span class="c-metric-delta">${d}</span>
      </div>`).join('')}</div>`;
  }
};
