/**
 * THE REGISTRY
 * ------------
 * Every design element lives in exactly one file under registry/elements/.
 * A file exports:
 *
 *   {
 *     id:      'hero-split',
 *     level:   'atom' | 'molecule' | 'organism' | 'template',
 *     owner:   'shared' | 'aetheris' | 'merlin' | 'reborn',
 *     born:    'reborn',           // which brand it was invented for (round robin)
 *     title, description,
 *     render(ctx)  -> html string  // ctx = { brand, s (slots), p (personality) }
 *   }
 *
 * owner: 'shared'  -> appears in ALL three style guides, skinned per brand.
 * owner: '<brand>' -> that brand's OWN organism, appears only there.
 *
 * Nobody edits a central list. Drop a file in, it shows up.
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'elements');
const LEVELS = ['atom', 'molecule', 'organism', 'template'];

function loadAll() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => {
      const el = require(path.join(DIR, f));
      el.file = `registry/elements/${f}`;
      return el;
    })
    .sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || a.id.localeCompare(b.id));
}

/** What a given brand's living style guide contains. */
function forBrand(brandId) {
  return loadAll().filter((el) => el.owner === 'shared' || el.owner === brandId);
}

module.exports = { loadAll, forBrand, LEVELS, DIR };
