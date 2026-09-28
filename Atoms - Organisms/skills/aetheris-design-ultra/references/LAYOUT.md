# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `body.min-h-full.flex` | column | — | — | — | 10 |
| `nav.aetheris-desktop-nav` | row | — | center | 25.2px | 5 |
| `div.aetheris-card.aetheris-prod-card` | column | — | — | — | 5 |
| `div.aetheris-card.aetheris-prod-card` | column | — | — | — | 5 |
| `div.aetheris-card.aetheris-prod-card` | column | — | — | — | 5 |
| `a.aetheris-card` | column | — | — | — | 4 |
| `a.aetheris-card` | column | — | — | — | 4 |
| `a.aetheris-card` | column | — | — | — | 4 |
| `div.aetheris-heroterm-shell` | column | — | — | 10px | 2 |
| `div.aetheris-mega-cards` | row | — | — | 1px | 2 |
| `a.aetheris-mega-hero` | column | — | — | — | 3 |
| `a.aetheris-mega-hero` | column | — | — | — | 3 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `section#top.aetheris-hero-sec` | `1440px` | — | 3 |
| `div.aetheris-footer-grid` | `368px 184px 184px 184px 184px` | 40px | 5 |
| `div.aetheris-products-grid` | `409.328px 409.328px 409.344px` | 18px | 3 |
| `div.aetheris-perf-grid` | `503.188px 680.812px` | 80px | 2 |
| `div.aetheris-sec-grid` | `685.391px 506.594px` | 72px | 2 |
| `div.aetheris-api-grid` | `537.297px 656.703px` | 70px | 2 |
| `div.aetheris-products-grid` | `409.328px 409.328px 409.344px` | 18px | 3 |
| `div.aetheris-stats-grid` | `316px 316px 316px 316px` | — | 4 |
| `a.aetheris-model-row` | `576px 239.984px 240px 192px` | — | 5 |
| `a.aetheris-model-row` | `576px 239.984px 240px 192px` | — | 5 |

## Structural Containers

### `<header>` (`header.aetheris-pad-x`)

```
display:          block
padding:          14px 0px
children:         1
```

### `<main>` 

```
display:          block
children:         7
```

### `<footer>` (`footer.aetheris-foot`)

```
display:          block
padding:          90px 0px 44px
children:         2
```

### `<section>` (`section#products.aetheris-sec`)

```
display:          block
padding:          130px 0px 110px
children:         2
```

### `<section>` (`section.aetheris-sec`)

```
display:          block
padding:          120px 0px
children:         3
```

### `<section>` (`section#security.aetheris-sec`)

```
display:          block
padding:          120px 0px
children:         2
```

### `<section>` (`section#models.aetheris-sec`)

```
display:          block
padding:          130px 0px 120px
children:         2
```

### `<section>` (`section.aetheris-sec`)

```
display:          block
padding:          110px 0px
children:         2
```

### `<section>` (`section#build.aetheris-sec.aetheris-accent-surface`)

```
display:          block
padding:          130px 0px
children:         3
```

### `<nav>` (`nav.aetheris-desktop-nav`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
gap:              25.2px
children:         5
```

### `<section>` (`section#top.aetheris-hero-sec`)

```
display:          grid
grid-template-columns: 1440px
padding:          65px 0px 0px
children:         3
```

### `<section>` 

```
display:          block
children:         2
```

## Layout Rules

- **Container max-width:** `1536px` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

