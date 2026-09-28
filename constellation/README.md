# Constellation

One entrance, three living style guides, shared structure, round-robin authoring.

```
node constellation/build.js        # build dist/
node constellation/rotate.js       # whose turn is it?
```

## The idea in one paragraph

Don't try to merge the three projects. Merge only the **contract** — a fixed list of
token slots (`primary`, `surface`, `radiusMd`, …). Each brand fills those slots from
**its own existing token file**, and bends the result with a handful of **personality
knobs** (density, glow, edge, motion, label casing). A design element is written once
against the contract, so it renders in all three brands automatically. Anything that
genuinely doesn't belong everywhere stays a **brand-exclusive organism**.

## Layout

| File | Role |
|---|---|
| `contract.js` | The slot list + personality knobs. The only thing all 3 must agree on. |
| `brands/index.js` | Adapters that read each project's real token source into the contract. |
| `registry/elements/*.js` | One file per design element. Drop-in, no central list. |
| `theme.js` | One stylesheet, scoped `[data-brand="…"]`, written in contract vars only. |
| `build.js` | Emits the entrance, 3 guides, and the adaptation matrix. |
| `rotate.js` | Round-robin scaffolder + promotion tool. |

## Output

- `dist/index.html` — the single entrance
- `dist/<brand>/index.html` — that brand's living style guide (shared + its own organisms)
- `dist/matrix.html` — every shared element rendered ×3, side by side

## The three rules that keep it alive

1. **No hex literals in element files.** Only `var(--c-…)`. This is what makes
   "promote to shared" a one-line change instead of a rewrite.
2. **Differences go into personality knobs, not forks.** If Reborn needs sharper
   corners, that's `edge: 'cut'` — not a second copy of the card.
3. **New elements are born in rotation.** Left alone you'd invent everything for
   whichever brand you're working on that week and let the other two rot. Being
   forced to birth the next idea in a different aesthetic *is* the stress test.

## Authoring a new element

```bash
node constellation/rotate.js "card-stack" molecule   # scaffolds for whoever's turn it is
# ...build it, check it in that brand's guide...
node constellation/rotate.js --promote card-stack    # now it renders in all three
node constellation/build.js
```

Open `matrix.html` after promoting. If it looks wrong in any column, the element is
over-specified — push the difference into a personality knob.

## Sources of truth (nothing is duplicated)

| Brand | Reads from |
|---|---|
| Aetheris | `Atoms - Organisms/scripts/lib/styleguide-data.js` |
| Merlin Tribukait | `02-Merlin-Tribukait/06_design_tokens/brand_tokens.json` |
| GAMES Reborn | `03-GAMES-Reborn/06_design_tokens/brand_tokens.json` |

Edit a project's token file, rebuild, and its guide follows — including derived
values like glows and border tints. `contract.js` throws if a brand drifts out of
the contract, so drift fails the build instead of silently degrading a guide.
