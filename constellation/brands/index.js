/**
 * BRAND ADAPTERS
 * --------------
 * Each adapter READS the project's own existing token source and maps it into
 * the contract. Nothing is duplicated by hand: edit
 * 02-Merlin-Tribukait/06_design_tokens/brand_tokens.json and the hub follows.
 *
 * This is how you get "dynamic adaptation between all" without merging the
 * three repos into one mush.
 */

const fs = require('fs');
const path = require('path');
const { validate } = require('../contract');

const ROOT = path.resolve(__dirname, '..', '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// --- helpers -------------------------------------------------------------
const v = (node) => (node && node.value) || undefined;
const alpha = (hex, aa) => (hex.startsWith('#') && hex.length === 7 ? hex + aa : hex);

/** Both MT and GR already share a token schema, so one mapper covers them. */
function fromW3CTokens(id, file, extra) {
  const t = readJson(file);
  const c = t.color;
  const primary = v(c.primary);
  const secondary = v(c.secondary);
  return validate({
    id,
    name: t.name,
    source: file,
    slots: {
      bg: v(c.background),
      surface: v(c.surface),
      card: 'rgba(18, 18, 28, 0.85)',
      border: v(c.border),
      borderGlow: alpha(primary, '60'),
      primary,
      primaryGlow: alpha(primary, '40'),
      secondary,
      secondaryGlow: alpha(secondary, '40'),
      metallic: v(c.metallic),
      textPrimary: v(c.textPrimary) || '#f0f2f8',
      textSecondary: v(c.textSecondary) || v(c.metallic),
      fontDisplay: v(t.typography.fontFamily.sans),
      fontSans: v(t.typography.fontFamily.sans),
      fontMono: v(t.typography.fontFamily.mono),
      radiusSm: '8px', radiusMd: '14px', radiusLg: '20px', radiusFull: '9999px',
      shadowGlow: v(t.shadows.glow),
      shadowCard: v(t.shadows.card)
    },
    ...extra
  });
}

/** Aetheris keeps its truth in the living-style-guide data file, not JSON. */
function fromAetheris() {
  const mod = require(path.join(ROOT, 'Atoms - Organisms', 'scripts', 'lib', 'styleguide-data.js'));
  const byToken = Object.fromEntries(mod.colors.map((c) => [c.token, c.hex]));
  const g = (tok, fb) => byToken[tok] || fb;
  return validate({
    id: 'aetheris',
    name: 'Aetheris',
    source: 'Atoms - Organisms/scripts/lib/styleguide-data.js',
    slots: {
      bg: g('--ax-bg'),
      surface: g('--ax-surface-1'),
      card: g('--ax-surface-2'),
      border: g('--ax-border'),
      borderGlow: g('--ax-border-strong'),
      primary: g('--ax-accent'),
      primaryGlow: g('--ax-accent-glow'),
      secondary: g('--ax-info'),
      secondaryGlow: '#0ea5e933',
      metallic: g('--ax-text-3'),
      textPrimary: g('--ax-text-1'),
      textSecondary: g('--ax-text-2'),
      fontDisplay: "'Darker Grotesque', Archivo, sans-serif",
      fontSans: "Archivo, -apple-system, sans-serif",
      fontMono: "'Berkeley Mono', ui-monospace, monospace",
      radiusSm: '6px', radiusMd: '10px', radiusLg: '14px', radiusFull: '9999px',
      shadowGlow: '0 0 0 3px #ff690133',
      shadowCard: '0 12px 32px rgba(0,0,0,.55)'
    },
    // Aetheris = technical, dense, understated motion
    personality: { density: 0.9, glow: 0.6, edge: 'rounded', labelCase: 'upper', labelTracking: '.08em', motion: 'snappy' },
    entrance: '01-Aetheris-Web/index.html',
    blurb: 'Frontier AI inference. Dense, technical, monospace-forward.'
  });
}

const brands = [
  fromAetheris(),
  fromW3CTokens('merlin', '02-Merlin-Tribukait/06_design_tokens/brand_tokens.json', {
    // Merlin = premium, spacious, cinematic slow motion
    personality: { density: 1.15, glow: 1.1, edge: 'rounded', labelCase: 'upper', labelTracking: '.22em', motion: 'dramatic' },
    entrance: '02-Merlin-Tribukait/index.html',
    blurb: 'Personal engineering brand. Cyan chrome, wide air, slow cinematic motion.'
  }),
  fromW3CTokens('reborn', '03-GAMES-Reborn/06_design_tokens/brand_tokens.json', {
    // Reborn = loud, tight, aggressive edges
    personality: { density: 0.95, glow: 1.8, edge: 'cut', labelCase: 'upper', labelTracking: '.14em', motion: 'snappy', grain: true },
    entrance: '03-GAMES-Reborn/index.html',
    blurb: 'Gaming collective. Hot red, cut corners, maximum glow.'
  })
];

module.exports = { brands, byId: Object.fromEntries(brands.map((b) => [b.id, b])) };
