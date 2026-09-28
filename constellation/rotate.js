#!/usr/bin/env node
/**
 * ROUND ROBIN
 * -----------
 *   node constellation/rotate.js "card-stack"           # scaffold for whoever's turn it is
 *   node constellation/rotate.js "card-stack" molecule  # pick the atomic level
 *   node constellation/rotate.js --status
 *   node constellation/rotate.js --promote card-stack   # brand-exclusive -> shared
 *
 * Why rotate at all: left alone, you will invent every new element for whichever
 * brand you happen to be working on that week, and the other two rot. Forcing the
 * rotation means each new idea is born in a different aesthetic — which is exactly
 * the stress test that proves it belongs in the shared layer.
 */
const fs = require('fs');
const path = require('path');
const { brands } = require('./brands');

const ROT = path.join(__dirname, 'rotation.json');
const ELEMENTS = path.join(__dirname, 'registry', 'elements');

const load = () => (fs.existsSync(ROT)
  ? JSON.parse(fs.readFileSync(ROT, 'utf8'))
  : { order: brands.map((b) => b.id), next: 0, log: [] });
const save = (s) => fs.writeFileSync(ROT, JSON.stringify(s, null, 2) + '\n');

const args = process.argv.slice(2);
const state = load();

if (args[0] === '--status' || args.length === 0) {
  const who = state.order[state.next % state.order.length];
  console.log('rotation :', state.order.join(' → '));
  console.log('on deck  :', who);
  console.log('history  :');
  state.log.slice(-10).forEach((e) => console.log(`  ${e.at.slice(0, 10)}  ${e.brand.padEnd(9)} ${e.id}`));
  process.exit(0);
}

if (args[0] === '--promote') {
  const id = args[1];
  const file = path.join(ELEMENTS, `${fileFor(id)}.js`);
  if (!fs.existsSync(file)) throw new Error(`no element file for "${id}"`);
  const src = fs.readFileSync(file, 'utf8').replace(/owner:\s*'[^']+'/, "owner: 'shared'");
  fs.writeFileSync(file, src);
  console.log(`✓ ${id} promoted to shared — it now renders in all three guides. Check matrix.html.`);
  process.exit(0);
}

// --- scaffold ------------------------------------------------------------
const id = args[0].replace(/[^a-z0-9-]/gi, '-').toLowerCase();
const level = args[1] || 'organism';
const brandId = state.order[state.next % state.order.length];
const brand = brands.find((b) => b.id === brandId);
const file = path.join(ELEMENTS, `own-${brandId}-${id}.js`);
if (fs.existsSync(file)) throw new Error(`${file} already exists`);

fs.writeFileSync(file, `module.exports = {
  id: '${id}', level: '${level}', owner: '${brandId}', born: '${brandId}',
  title: '${title(id)}',
  description: 'TODO — invented for ${brand.name}. Promote with: node constellation/rotate.js --promote ${id}',

  // Style it with contract vars only (var(--c-primary), var(--c-space-4), ...).
  // Never hardcode a hex: that is what makes promotion to shared a one-liner.
  render: ({ brand }) => \`
    <div class="c-card">
      <span class="c-label">${title(id)}</span>
      <p style="color:var(--c-text-secondary);font-size:14px">Scaffolded for \${brand.name}. Replace me.</p>
    </div>\`
};
`);

state.log.push({ at: new Date().toISOString(), brand: brandId, id, level });
state.next = (state.next + 1) % state.order.length;
save(state);

console.log(`✓ ${id} (${level}) born in ${brand.name}`);
console.log(`  ${path.relative(process.cwd(), file)}`);
console.log(`  next turn: ${state.order[state.next % state.order.length]}`);

function title(s) { return s.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '); }
function fileFor(x) {
  const hit = fs.readdirSync(ELEMENTS).find((f) => f.endsWith(`${x}.js`) || f === `${x}.js`);
  return hit ? hit.replace(/\.js$/, '') : x;
}
