module.exports = {
  id: 'roster-row', level: 'organism', owner: 'reborn', born: 'reborn',
  title: 'Roster Row', description: 'Reborn-only. Competitive roster strip with rank, tag and live state.',
  render: () => {
    const r = [['01','PHNX','Phoenix','LIVE'],['02','VLTR','Vulture','IDLE'],['03','KRSN','Karasu','LIVE']];
    return `<div class="c-roster">${r.map(([n,tag,name,st]) => `
      <div class="c-roster-row">
        <span class="c-roster-rank">${n}</span>
        <span class="c-roster-tag">${tag}</span>
        <span class="c-roster-name">${name}</span>
        <span class="c-badge ${st === 'LIVE' ? 'c-badge-accent' : ''}">${st}</span>
      </div>`).join('')}</div>`;
  }
};
