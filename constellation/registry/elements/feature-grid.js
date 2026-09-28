module.exports = {
  id: 'feature-grid', level: 'organism', owner: 'shared', born: 'merlin',
  title: 'Feature Grid', description: 'Three-up capability grid. The archetypal cross-brand organism.',
  render: () => {
    const f = [
      ['01','Unified core','One engine, one contract, three faces. Nothing forks.'],
      ['02','Mesh delivery','Assets resolve from the nearest edge, always versioned.'],
      ['03','Hardened by default','Zero retention, signed builds, reproducible output.']
    ];
    return `<div class="c-grid-3">${f.map(([n,t,d]) => `
      <article class="c-card c-feature">
        <span class="c-feature-num">${n}</span>
        <h4>${t}</h4><p>${d}</p>
      </article>`).join('')}</div>`;
  }
};
