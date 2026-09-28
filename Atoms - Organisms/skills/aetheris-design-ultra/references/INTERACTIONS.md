# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Link | 3 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: border-color 0.2s;
transition: color 0.18s, background 0.18s;
transition: color 0.4s ease-in-out, background-size 0.4s ease-in-out;
transition: background 0.2s;
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `Search`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On focus:**

```css
/* outline: oklab(0.700007 0.148609 0.133834 / 0.5) none 3px → */ outline: rgb(255, 105, 1) solid 1px;
/* outline-color: oklab(0.700007 0.148609 0.133834 / 0.5) → */ outline-color: rgb(255, 105, 1);
```

**Transition:** `border-color 0.2s`

### Button 2 — `ENCRYPTED`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On focus:**

```css
/* outline: oklab(0.700007 0.148609 0.133834 / 0.5) none 3px → */ outline: rgb(255, 105, 1) solid 2px;
/* outline-color: oklab(0.700007 0.148609 0.133834 / 0.5) → */ outline-color: rgb(255, 105, 1);
```

**Transition:** `color 0.18s, background 0.18s`

### Button 3 — `NOT ENCRYPTED`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On hover:**

```css
/* color: rgb(102, 102, 100) → */ color: rgb(242, 242, 240);
/* border-color: rgb(102, 102, 100) → */ border-color: rgb(242, 242, 240);
```

**On focus:**

```css
/* outline: oklab(0.700007 0.148609 0.133834 / 0.5) none 3px → */ outline: rgb(255, 105, 1) solid 2px;
/* outline-color: oklab(0.700007 0.148609 0.133834 / 0.5) → */ outline-color: rgb(255, 105, 1);
```

**Transition:** `color 0.18s, background 0.18s`

## Link Interactions

### Link 1 — `PLATFORM`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On hover:**

```css
/* color: rgb(242, 242, 240) → */ color: rgb(253, 123, 32);
```

**On focus:**

```css
/* outline: oklab(0.700007 0.148609 0.133834 / 0.5) none 3px → */ outline: oklab(0.700007 0.148609 0.133834 / 0.5) auto 1px;
```

**Transition:** `color 0.4s ease-in-out, background-size 0.4s ease-in-out`

### Link 2 — `PROMPT
ZDR
PII STRIPPED
Privacy
We provi`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**Transition:** `background 0.2s`

_No visible style changes detected for this element._

### Link 3 — `a`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**Transition:** `background 0.2s`

_No visible style changes detected for this element._

## Interaction Rules

- Accent color `#ff691f` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.2s`, `0.18s`, `0.4s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

