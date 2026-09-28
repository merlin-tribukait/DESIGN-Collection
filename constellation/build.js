#!/usr/bin/env node
/**
 * BUILD
 * -----
 * 1 entrance          -> dist/index.html
 * 3 living guides     -> dist/<brand>/index.html   (shared + own organisms)
 * 1 adaptation matrix -> dist/matrix.html          (every shared element x 3 brands)
 */
const fs = require('fs');
const path = require('path');
const { brands } = require('./brands');
const { loadAll, forBrand, LEVELS } = require('./registry');
const { buildCss } = require('./theme');

const OUT = path.join(__dirname, 'dist');
const rot = readRotation();

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'theme.css'), buildCss(brands));

function readRotation() {
  const p = path.join(__dirname, 'rotation.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : { order: brands.map((b) => b.id), next: 0, log: [] };
}

const page = (brandId, title, body, depth = 0) => `<!doctype html>
<html lang="en" data-brand="${brandId}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="stylesheet" href="${'../'.repeat(depth)}theme.css">
</head><body>${body}</body></html>`;

const switcher = (active, depth) => `
  <nav class="c-switch">
    ${brands.map((b) => `<a class="${b.id === active ? 'on' : ''}" href="${'../'.repeat(depth)}${b.id}/index.html">${b.id}</a>`).join('')}
  </nav>`;

const topbar = (brand, depth) => `
  <header class="c-topbar"><div class="c-shell c-topbar-in">
    <a class="c-brandmark" href="${'../'.repeat(depth)}index.html">◇ Constellation</a>
    <span class="c-label">${brand.name}</span>
    <span class="c-spacer"></span>
    ${switcher(brand.id, depth)}
    <a class="c-btn c-btn-secondary" href="${'../'.repeat(depth)}matrix.html">Matrix</a>
  </div></header>`;

// ---------------------------------------------------------------- guides
for (const brand of brands) {
  const els = forBrand(brand.id);
  const ctx = { brand, s: brand.slots, p: brand.personality };
  const sections = LEVELS.map((lvl) => {
    const group = els.filter((e) => e.level === lvl);
    if (!group.length) return '';
    return `<section class="c-sec"><div class="c-shell">
      <div class="c-sec-head"><h3>${lvl[0].toUpperCase() + lvl.slice(1)}s</h3>
        <span class="c-badge">${group.length}</span></div>
      ${group.map((el) => `
        <div style="margin-bottom:var(--c-space-8)">
          <div class="c-sec-head">
            <h3 style="font-size:19px">${el.title}</h3>
            ${el.owner === 'shared' ? '<span class="c-badge">shared</span>' : `<span class="c-badge c-badge-accent">${el.owner} only</span>`}
            <span class="c-badge">born: ${el.born}</span>
            <p>${el.description} <span class="c-src">— ${el.file}</span></p>
          </div>
          <div class="c-stage">${el.render(ctx)}</div>
        </div>`).join('')}
    </div></section>`;
  }).join('');

  const body = `${topbar(brand, 1)}
    <main class="c-shell">
      <section class="c-hero">
        <span class="c-label">Living style guide</span>
        <h2 class="c-hero-title">${brand.name}</h2>
        <p class="c-hero-sub">${brand.blurb}</p>
        <div class="c-row">
          <span class="c-badge">${els.filter((e) => e.owner === 'shared').length} shared</span>
          <span class="c-badge c-badge-accent">${els.filter((e) => e.owner !== 'shared').length} own organisms</span>
          <span class="c-badge">tokens: ${brand.source.split('/').pop()}</span>
          <span class="c-badge">density ${brand.personality.density} · glow ${brand.personality.glow} · ${brand.personality.motion}</span>
        </div>
      </section>
    </main>${sections}`;

  fs.mkdirSync(path.join(OUT, brand.id), { recursive: true });
  fs.writeFileSync(path.join(OUT, brand.id, 'index.html'), page(brand.id, `${brand.name} — Style Guide`, body, 1));
}

// ---------------------------------------------------------------- matrix
const shared = loadAll().filter((e) => e.owner === 'shared');
const matrixBody = `${topbar(brands[0], 0)}
  <main class="c-shell">
    <section class="c-hero">
      <span class="c-label">Adaptation matrix</span>
      <h2 class="c-hero-title">One recipe.<br><em>Three temperaments.</em></h2>
      <p class="c-hero-sub">Each row is a single shared element file rendered once per brand. If a change here looks wrong in any column, the element is over-specified — push the difference into a personality knob instead.</p>
    </section>
  </main>
  ${shared.map((el) => `
    <section class="c-sec"><div class="c-shell">
      <div class="c-sec-head"><h3>${el.title}</h3><span class="c-badge">${el.level}</span>
        <span class="c-badge">born: ${el.born}</span><p>${el.description} <span class="c-src">— ${el.file}</span></p></div>
      <div class="c-lvl">
        ${brands.map((b) => `
          <div data-brand="${b.id}" style="background:var(--c-bg);border:1px solid var(--c-border);border-radius:var(--c-radius-lg);padding:var(--c-space-6)">
            <span class="c-label">${b.name}</span>
            <div style="margin-top:var(--c-space-4)">${el.render({ brand: b, s: b.slots, p: b.personality })}</div>
          </div>`).join('')}
      </div>
    </div></section>`).join('')}`;
fs.writeFileSync(path.join(OUT, 'matrix.html'), page('aetheris', 'Adaptation Matrix', matrixBody, 0));

// ---------------------------------------------------------------- entrance
const all = loadAll();
const nextBrand = brands.find((b) => b.id === rot.order[rot.next % rot.order.length]);
const entranceBody = `
  <header class="c-topbar"><div class="c-shell c-topbar-in">
    <a class="c-brandmark" href="index.html">◇ Constellation</a>
    <span class="c-label">One entrance · three living style guides</span>
    <span class="c-spacer"></span>
    <a class="c-btn c-btn-secondary" href="matrix.html">Adaptation matrix</a>
  </div></header>
  <main class="c-shell">
    <section class="c-hero">
      <span class="c-label">DESIGN-Collection</span>
      <h2 class="c-hero-title">Three brands.<br><em>One contract.</em></h2>
      <p class="c-hero-sub">Every element below is written once against a shared token contract. Each brand fills the contract from its own token file and bends the result with personality knobs — so the three style guides stay structurally identical while looking nothing alike.</p>
      <div class="c-row">
        <span class="c-badge">${all.length} elements</span>
        <span class="c-badge">${shared.length} shared</span>
        <span class="c-badge">${all.length - shared.length} brand-exclusive</span>
      </div>
    </section>

    <section style="padding-bottom:var(--c-space-16)">
      <div class="c-lvl">
        ${brands.map((b) => {
          const els = forBrand(b.id);
          return `<a href="${b.id}/index.html" data-brand="${b.id}" style="text-decoration:none;display:block;background:var(--c-bg);border:1px solid var(--c-border);border-radius:var(--c-radius-lg);padding:var(--c-space-8);color:var(--c-text-primary)" class="c-card">
            <span class="c-label">${b.id}</span>
            <h3 style="font-family:var(--c-font-display);font-size:26px;margin:var(--c-space-3) 0">${b.name}</h3>
            <p style="color:var(--c-text-secondary);font-size:14px;line-height:1.6;margin:0 0 var(--c-space-4)">${b.blurb}</p>
            <div class="c-row">
              ${['primary', 'secondary', 'metallic'].map((k) => `<i style="width:22px;height:22px;border-radius:var(--c-radius-full);background:${b.slots[k]};display:inline-block"></i>`).join('')}
              <span class="c-badge c-badge-accent">${els.filter((e) => e.owner !== 'shared').length} own</span>
              <span class="c-badge">${els.length} total</span>
            </div>
          </a>`;
        }).join('')}
      </div>
    </section>

    <section class="c-sec">
      <div class="c-sec-head"><h3>Round-robin authoring</h3>
        <span class="c-badge c-badge-accent">next: ${nextBrand.name}</span>
        <p>New elements are invented for one brand at a time, in rotation, then promoted to shared once they survive the matrix. Run <code class="c-src">node constellation/rotate.js "card-stack"</code> to scaffold the next one.</p></div>
      <div class="c-lvl">
        ${rot.order.map((id, i) => {
          const b = brands.find((x) => x.id === id);
          const turn = i === rot.next % rot.order.length;
          return `<div class="c-card" style="${turn ? 'border-color:var(--c-primary)' : ''}">
            <span class="c-label">turn ${i + 1}</span>
            <h4 style="font-family:var(--c-font-display);margin:var(--c-space-2) 0">${b.name}</h4>
            <p style="color:var(--c-text-secondary);font-size:13px;margin:0">${all.filter((e) => e.born === id).length} elements originated here</p>
            ${turn ? '<div style="margin-top:var(--c-space-3)"><span class="c-badge c-badge-accent">ON DECK</span></div>' : ''}
          </div>`;
        }).join('')}
      </div>
    </section>

    <section class="c-sec" style="padding-bottom:var(--c-space-16)">
      <div class="c-sec-head"><h3>How to extend</h3>
        <p>Add a file to <code class="c-src">constellation/registry/elements/</code>. Set <code class="c-src">owner:'shared'</code> for all three guides, or <code class="c-src">owner:'reborn'</code> for a brand-exclusive organism. Rebuild. Nothing else to wire.</p></div>
    </section>
  </main>`;
fs.writeFileSync(path.join(OUT, 'index.html'), page('merlin', 'Constellation — DESIGN-Collection', entranceBody, 0));

console.log(`✓ ${all.length} elements · ${brands.length} guides · dist/`);
for (const b of brands) console.log(`  ${b.id.padEnd(9)} ${forBrand(b.id).length} elements (${forBrand(b.id).filter((e) => e.owner !== 'shared').length} own)`);
console.log(`  next in rotation: ${nextBrand.name}`);
