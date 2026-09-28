/**
 * THE CONTRACT
 * ------------
 * The single thing all three projects must agree on. Nothing else.
 *
 * A brand is NOT a folder of CSS. A brand is an object that fills these slots.
 * An organism is NOT markup. An organism is a function (slots) => html.
 *
 * Because every brand fills the same slots, every organism renders in every
 * brand for free. That is the "dynamic adaptation".
 */

// Colour + surface slots. Every brand MUST provide all of these.
const COLOR_SLOTS = [
  'bg', 'surface', 'card', 'border', 'borderGlow',
  'primary', 'primaryGlow', 'secondary', 'secondaryGlow',
  'metallic', 'textPrimary', 'textSecondary'
];

// Typography slots.
const TYPE_SLOTS = ['fontDisplay', 'fontSans', 'fontMono'];

// Shape / depth slots.
const FORM_SLOTS = ['radiusSm', 'radiusMd', 'radiusLg', 'radiusFull', 'shadowGlow', 'shadowCard'];

/**
 * PERSONALITY knobs. This is the important part.
 * Same organism + same slots would give three identical-feeling pages.
 * These knobs let a brand bend a shared recipe without forking it.
 */
const PERSONALITY_DEFAULTS = {
  density: 1,            // 0.8 tight ... 1.25 airy — multiplies all spacing
  glow: 1,               // 0 flat ... 2 neon — multiplies every glow shadow
  edge: 'rounded',       // 'rounded' | 'cut' | 'sharp' — corner treatment
  labelCase: 'normal',   // 'normal' | 'upper' — eyebrow/label casing
  labelTracking: '0em',  // letter-spacing for labels
  motion: 'calm',        // 'calm' | 'snappy' | 'dramatic' — transition curve/duration
  grain: false           // decorative noise overlay
};

const MOTION = {
  calm:     { dur: '420ms', ease: 'cubic-bezier(.22,.61,.36,1)', lift: '-2px' },
  snappy:   { dur: '160ms', ease: 'cubic-bezier(.2,.9,.3,1.2)',  lift: '-4px' },
  dramatic: { dur: '700ms', ease: 'cubic-bezier(.16,1,.3,1)',    lift: '-8px' }
};

const REQUIRED = [...COLOR_SLOTS, ...TYPE_SLOTS, ...FORM_SLOTS];

/** Fail loudly the moment a brand drifts out of the contract. */
function validate(brand) {
  const missing = REQUIRED.filter((k) => !brand.slots[k]);
  if (missing.length) {
    throw new Error(`Brand "${brand.id}" is missing contract slots: ${missing.join(', ')}`);
  }
  return { ...brand, personality: { ...PERSONALITY_DEFAULTS, ...(brand.personality || {}) } };
}

/** Slots -> CSS custom properties, scoped so all 3 brands can coexist on one page. */
function toCssVars(brand) {
  const p = brand.personality;
  const m = MOTION[p.motion] || MOTION.calm;
  const lines = REQUIRED.map((k) => `  --c-${kebab(k)}: ${brand.slots[k]};`);
  lines.push(`  --c-density: ${p.density};`);
  lines.push(`  --c-glow-mult: ${p.glow};`);
  lines.push(`  --c-label-case: ${p.labelCase === 'upper' ? 'uppercase' : 'none'};`);
  lines.push(`  --c-label-tracking: ${p.labelTracking};`);
  lines.push(`  --c-dur: ${m.dur};`);
  lines.push(`  --c-ease: ${m.ease};`);
  lines.push(`  --c-lift: ${m.lift};`);
  // edge treatment collapses the radius scale
  if (p.edge === 'sharp') {
    lines.push('  --c-radius-sm: 0px;', '  --c-radius-md: 0px;', '  --c-radius-lg: 0px;');
  } else if (p.edge === 'cut') {
    lines.push('  --c-radius-sm: 2px;', '  --c-radius-md: 3px;', '  --c-radius-lg: 4px;');
  }
  // spacing scale derived from density
  for (const n of [1, 2, 3, 4, 6, 8, 12, 16, 24]) {
    lines.push(`  --c-space-${n}: calc(${n * 4}px * var(--c-density));`);
  }
  return lines.join('\n');
}

const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

module.exports = { COLOR_SLOTS, TYPE_SLOTS, FORM_SLOTS, REQUIRED, PERSONALITY_DEFAULTS, MOTION, validate, toCssVars, kebab };
