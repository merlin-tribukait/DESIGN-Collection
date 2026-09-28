# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Aetheris Mega Link** | unknown | 13× | `.aetheris-mega-link` |
| **Aetheris Rails** | unknown | 9× | `.aetheris-rails` |
| **Aetheris Prod Feat** | unknown | 9× | `.aetheris-prod-feat` |
| **Aetheris Rail** | unknown | 7× | `.aetheris-rail` |
| **Aetheris Mega Item** | card | 6× | `.aetheris-mega-item` |
| **Aetheris Mega Item Title** | card | 6× | `.aetheris-mega-item-title` |
| **Aetheris Model Row** | unknown | 6× | `.aetheris-model-row` |
| **Aetheris Model Name** | unknown | 6× | `.aetheris-model-name` |
| **Aetheris Frame** | unknown | 4× | `.aetheris-frame` |
| **Aetheris Stat Cell** | unknown | 4× | `.aetheris-stat-cell` |
| **Aetheris Stat Value** | unknown | 4× | `.aetheris-stat-value` |
| **Aetheris Sec** | unknown | 4× | `.aetheris-sec` |
| **Aetheris Navdrop** | unknown | 3× | `.aetheris-navdrop` |
| **Aetheris Navlink** | unknown | 3× | `.aetheris-navlink` |
| **Aetheris Navdrop Panel** | unknown | 3× | `.aetheris-navdrop-panel` |
| **Aetheris Mega Group** | unknown | 3× | `.aetheris-mega-group` |
| **Aetheris Mega Item Desc** | card | 3× | `.aetheris-mega-item-desc` |
| **Aetheris Card** | card | 3× | `.aetheris-card`, `.aetheris-prod-card` |
| **Aetheris Sec Claim** | unknown | 3× | `.aetheris-sec-claim` |
| **Aetheris Isoring** | unknown | 3× | `.aetheris-isoring` |

## Cards

### Aetheris Mega Item

**Instances found:** 6

**CSS classes:** `.aetheris-mega-item`

**HTML structure:**

```html
<a href="/api" class="aetheris-mega-item"><span class="aetheris-mega-item-title">Aetheris Router</span><span class="aetheris-mega-item-desc">300+ open and closed models through one …</span></a>
```

**Base styles (from design tokens):**

```css
.aetheris-mega-item {
  background: #f2f2f0;
  border: 1px solid #4a4a49;
  border-radius: 12px;
  padding: 8px;
}```

### Aetheris Mega Item Title

**Instances found:** 6

**CSS classes:** `.aetheris-mega-item-title`

**HTML structure:**

```html
<span class="aetheris-mega-item-title">Aetheris Router</span>
```

**Base styles (from design tokens):**

```css
.aetheris-mega-item-title {
  background: #f2f2f0;
  border: 1px solid #4a4a49;
  border-radius: 12px;
  padding: 8px;
}```

### Aetheris Mega Item Desc

**Instances found:** 3

**CSS classes:** `.aetheris-mega-item-desc`

**HTML structure:**

```html
<span class="aetheris-mega-item-desc">300+ open and closed models through one endpoint. The gateway enforces zero data retention and no training, wherever the provider API supports it.</span>
```

**Base styles (from design tokens):**

```css
.aetheris-mega-item-desc {
  background: #f2f2f0;
  border: 1px solid #4a4a49;
  border-radius: 12px;
  padding: 8px;
}```

### Aetheris Card

**Instances found:** 3

**CSS classes:** `.aetheris-card` `.aetheris-prod-card`

**HTML structure:**

```html
<div class="aetheris-card aetheris-prod-card" style="position:relative;padding:34px 32px 30px 32px;border-radius:0;background:#0D0D0D;border:1px solid #1A1A1A;min-height:380px;display:flex;flex-direction:column"><div style="display:flex;align-items:center;justify-content:space-between"><span class="aetheris-prod-index" style="font-family:var(--font-functional, ui-monospace), monospace;font-size:13px;font-weight:700;letter-spacing:0.1em">01</span><div style="display:grid;grid-template-columns:repeat(2, 7px);grid-auto-rows:7px;gap:3px"><span class="aetheris-prod-dot" style="background:#F2F2F0"><
```

**Base styles (from design tokens):**

```css
.aetheris-card {
  background: #f2f2f0;
  border: 1px solid #4a4a49;
  border-radius: 12px;
  padding: 8px;
}```

## Other Components

### Aetheris Mega Link

**Instances found:** 13

**CSS classes:** `.aetheris-mega-link`

**HTML structure:**

```html
<a href="/models" class="aetheris-mega-link">Model catalog</a>
```

**Base styles (from design tokens):**

```css
.aetheris-mega-link {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Rails

**Instances found:** 9

**CSS classes:** `.aetheris-rails`

**HTML structure:**

```html
<div class="aetheris-rails" aria-hidden="true" data-reveal="1" style="position:absolute;inset:0;pointer-events:none;z-index:1;display:flex;justify-content:center" data-shown="1"><div class="aetheris-rail" style="position:relative;width:100%;height:100%;max-width:var(--ax-frame);padding-inline:var(--ax-gutter);box-sizing:border-box"><span class="aetheris-rail-v" style="position:absolute;left:var(--ax-gutter);top:0;bottom:0;width:1px"></span><span class="aetheris-rail-v" style="position:absolute;right:var(--ax-gutter);top:0;bottom:0;width:1px"></span></div></div>
```

**Base styles (from design tokens):**

```css
.aetheris-rails {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Prod Feat

**Instances found:** 9

**CSS classes:** `.aetheris-prod-feat`

**HTML structure:**

```html
<div class="aetheris-prod-feat" style="font-family:var(--font-functional, ui-monospace), monospace;font-size:13px;font-weight:400;letter-spacing:0.02em;color:#585857;padding-top:7px;padding-bottom:7px;border-bottom:1px solid rgba(255,255,255,0.12)">#1 Nemotron 3 Ultra provider · 454 t/s</div>
```

**Base styles (from design tokens):**

```css
.aetheris-prod-feat {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Rail

**Instances found:** 7

**CSS classes:** `.aetheris-rail`

**HTML structure:**

```html
<div class="aetheris-rail" style="position:relative;width:100%;height:100%;max-width:var(--ax-frame);padding-inline:var(--ax-gutter);box-sizing:border-box"><span class="aetheris-rail-v" style="position:absolute;left:var(--ax-gutter);top:0;bottom:0;width:1px"></span><span class="aetheris-rail-v" style="position:absolute;right:var(--ax-gutter);top:0;bottom:0;width:1px"></span><span class="aetheris-rail-h" style="position:absolute;left:var(--ax-gutter);right:var(--ax-gutter);top:0;height:1px"></span></div>
```

**Base styles (from design tokens):**

```css
.aetheris-rail {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Model Row

**Instances found:** 6

**CSS classes:** `.aetheris-model-row`

**HTML structure:**

```html
<a href="/get-started" class="aetheris-model-row" style="position:relative;display:grid;grid-template-columns:2.4fr 1fr 1fr 0.8fr;align-items:center;padding:22px 8px;border-bottom:1px solid rgba(255,255,255,0.12);cursor:pointer;text-decoration:none;transition:background 0.22s ease, padding-left 0.3s cubic-bezier(0.22,1,0.36,1);overflow:hidden"><div data-accent="true" style="position:absolute;left:0;top:0;bottom:0;width:3px;background:#F2F2F0;transform:scaleY(0);transform-origin:center;transition:transform 0.32s cubic-bezier(0.22,1,0.36,1)"></div><div style="display:flex;align-items:center;gap:
```

**Base styles (from design tokens):**

```css
.aetheris-model-row {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Model Name

**Instances found:** 6

**CSS classes:** `.aetheris-model-name`

**HTML structure:**

```html
<span class="aetheris-model-name" style="font-family:var(--font-marketing-display, system-ui), sans-serif;font-weight:700;font-size:24px;color:#F2F2F0;line-height:1">kimi-k3</span>
```

**Base styles (from design tokens):**

```css
.aetheris-model-name {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Frame

**Instances found:** 4

**CSS classes:** `.aetheris-frame`

**HTML structure:**

```html
<div class="aetheris-frame" style="position:relative;z-index:2"><div data-rise-group="true" class="aetheris-stats-grid" style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr))"><div data-rise="true" class="aetheris-stat-cell" style="padding:1.125rem 1.5rem;border-right:1px solid rgba(255,255,255,0.1)"><div class="aetheris-stat-value" style="font-family:var(--font-marketing-display, system-ui), sans-serif;font-weight:400;font-size:clamp(2.5rem, 3.9vw, 3.125rem);line-height:1;color:#F2F2F0;letter-spacing:-0.04em">454 t/s</div><div style="font-family:var(--font-functional, ui-monospac
```

**Base styles (from design tokens):**

```css
.aetheris-frame {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Stat Cell

**Instances found:** 4

**CSS classes:** `.aetheris-stat-cell`

**HTML structure:**

```html
<div data-rise="true" class="aetheris-stat-cell" style="padding:1.125rem 1.5rem;border-right:1px solid rgba(255,255,255,0.1)"><div class="aetheris-stat-value" style="font-family:var(--font-marketing-display, system-ui), sans-serif;font-weight:400;font-size:clamp(2.5rem, 3.9vw, 3.125rem);line-height:1;color:#F2F2F0;letter-spacing:-0.04em">454 t/s</div><div style="font-family:var(--font-functional, ui-monospace), monospace;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;color:#666664;margin-top:0.625rem">NEMOTRON 3 ULTRA · #1 ON ARTIFICIAL ANAL…</div></div>
```

**Base styles (from design tokens):**

```css
.aetheris-stat-cell {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Stat Value

**Instances found:** 4

**CSS classes:** `.aetheris-stat-value`

**HTML structure:**

```html
<div class="aetheris-stat-value" style="font-family:var(--font-marketing-display, system-ui), sans-serif;font-weight:400;font-size:clamp(2.5rem, 3.9vw, 3.125rem);line-height:1;color:#F2F2F0;letter-spacing:-0.04em">454 t/s</div>
```

**Base styles (from design tokens):**

```css
.aetheris-stat-value {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Sec

**Instances found:** 4

**CSS classes:** `.aetheris-sec`

**HTML structure:**

```html
<section id="products" class="aetheris-sec" style="position:relative;padding-top:130px;padding-bottom:110px"><div class="aetheris-rails" aria-hidden="true" data-reveal="1" style="position:absolute;inset:0;pointer-events:none;z-index:1;display:flex;justify-content:center"><div class="aetheris-rail" style="position:relative;width:100%;height:100%;max-width:var(--ax-frame);padding-inline:var(--ax-gutter);box-sizing:border-box"><span class="aetheris-rail-v" style="position:absolute;left:var(--ax-gutter);top:0;bottom:0;width:1px"></span><span class="aetheris-rail-v" style="position:absolute;right:v
```

**Base styles (from design tokens):**

```css
.aetheris-sec {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Navdrop

**Instances found:** 3

**CSS classes:** `.aetheris-navdrop`

**HTML structure:**

```html
<div class="aetheris-navdrop" style="position:relative;display:flex;align-items:center"><a href="/inference" class="aetheris-navlink" aria-haspopup="true" style="font-family:var(--font-functional, ui-monospace), monospace;font-size:0.75rem;font-weight:400;letter-spacing:0.06em;color:#F2F2F0;text-decoration:none;padding-bottom:0.1875rem;border-bottom:2px solid transparent;display:inline-flex;align-items:center;gap:0.375rem">PLATFORM<svg class="aetheris-navdrop-caret" width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"><path d="M1 1L4.5 4.5L8 1" stroke="currentColor" stroke-wid
```

**Base styles (from design tokens):**

```css
.aetheris-navdrop {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Navlink

**Instances found:** 3

**CSS classes:** `.aetheris-navlink`

**HTML structure:**

```html
<a href="/inference" class="aetheris-navlink" aria-haspopup="true" style="font-family:var(--font-functional, ui-monospace), monospace;font-size:0.75rem;font-weight:400;letter-spacing:0.06em;color:#F2F2F0;text-decoration:none;padding-bottom:0.1875rem;border-bottom:2px solid transparent;display:inline-flex;align-items:center;gap:0.375rem">PLATFORM<svg class="aetheris-navdrop-caret" width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"><path d="M1 1L4.5 4.5L8 1" stroke="currentColor" stroke-width="1.4"></path></svg></a>
```

**Base styles (from design tokens):**

```css
.aetheris-navlink {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Navdrop Panel

**Instances found:** 3

**CSS classes:** `.aetheris-navdrop-panel`

**HTML structure:**

```html
<div class="aetheris-navdrop-panel"><div class="aetheris-navdrop-box"><div class="aetheris-mega-cards"><a href="/privacy" class="aetheris-mega-card"><span class="aetheris-mega-figure" aria-hidden="true"><svg viewBox="0 0 120 56" preserveAspectRatio="xMidYMid meet" focusable="false"><g fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1"><path d="M4 4h6M4 4v6"></path><path d="M116 4h-6M116 4v6"></path><path d="M4 52h6M4 52v-6"></path><path d="M116 52h-6M116 52v-6"></path></g><g stroke="rgba(255,255,255,0.22)" stroke-width="1" stroke-dasharray="1 3" fill="none"><path d="M14 12v32"></path
```

**Base styles (from design tokens):**

```css
.aetheris-navdrop-panel {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Mega Group

**Instances found:** 3

**CSS classes:** `.aetheris-mega-group`

**HTML structure:**

```html
<div class="aetheris-mega-group"><div class="aetheris-mega-group-title">MODELS</div><a href="/models" class="aetheris-mega-link">Model catalog</a><a href="/compare" class="aetheris-mega-link">Compare models</a><a href="/api" class="aetheris-mega-link">Aetheris Router</a></div>
```

**Base styles (from design tokens):**

```css
.aetheris-mega-group {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Sec Claim

**Instances found:** 3

**CSS classes:** `.aetheris-sec-claim`

**HTML structure:**

```html
<div class="aetheris-sec-claim" style="display:grid;grid-template-columns:9.5rem minmax(0, 1fr);gap:20px;align-items:baseline;padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.1)"><span style="font-family:var(--font-functional, ui-monospace), monospace;font-size:12px;font-weight:700;letter-spacing:0.12em;color:#585857">END-TO-END</span><span style="font-family:var(--font-reading, system-ui), sans-serif;font-weight:500;font-size:17px;line-height:1.5;color:#666664">We provide end-to-end encryption and ret…</span></div>
```

**Base styles (from design tokens):**

```css
.aetheris-sec-claim {
  background: #f2f2f0;
  padding: 4px;
}```

### Aetheris Isoring

**Instances found:** 3

**CSS classes:** `.aetheris-isoring`

**HTML structure:**

```html
<div class="aetheris-isoring" style="--iso-depth:0;padding:16px 18px 18px 18px"><div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:18px"><span style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-functional, ui-monospace), monospace;font-size:12px;font-weight:700;letter-spacing:0.12em;color:#666664">ENTERPRISE API</span><span style="font-family:var(--font-functional, ui-monospace), monospace;font-size:11px;letter-spacing:0.06em;color:#585857">Our endpoint, our GPUs</span></div><div class="aetheris-isoring" style="--iso-dep
```

**Base styles (from design tokens):**

```css
.aetheris-isoring {
  background: #f2f2f0;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#4a4a49` for all dividers within components
- Use `#ff691f` for all interactive/active states

