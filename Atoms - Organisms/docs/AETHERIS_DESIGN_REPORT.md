# Aetheris.dev Design & Functionality Analysis Report

## Executive Summary

This report provides a comprehensive analysis of the design system, UI components, and functionality of aetheris.dev based on static analysis and manual inspection. The platform appears to be an AI inference service with a focus on security and encryption.

## 1. Design System Overview

### 1.1 Visual Identity
- **Theme**: Dark-themed interface (despite skillui reporting light theme, actual implementation uses dark backgrounds)
- **Primary Accent**: Orange (#FF6901 / #ff691f)
- **Design Philosophy**: Technical, security-focused, developer-centric
- **Motion**: Expressive with animations for terminal demos and interactive elements

### 1.2 Color Palette

#### Primary Colors
- **Background**: #070707, #090909, #0C0C0C (dark grays)
- **Surface**: #161616, #222 (card and panel backgrounds)
- **Foreground**: #F5F5F5, #F2F2F0 (text and light elements)
- **Primary Accent**: #FF6901 (orange - CTAs, highlights)
- **Border**: #ffffff1f (subtle borders with transparency)

#### Semantic Colors
- **Success**: #00bb7f (emerald)
- **Warning**: #f99c00 (amber)
- **Error/Danger**: #ff6568 (red)
- **Info**: #00a5ef (sky blue)

### 1.3 Typography

#### Font Stack
1. **darkerGrotesque** - Display/headings (weights: 500, 700)
2. **archivo** - Body/UI text (weights: 500, 700)
3. **berkeleyMono** - Code/monospace (weights: 400, 700, with oblique variants)
4. **berkeleyMonoNumerals** - Numeric display
5. **berkeleyMonoNumeralsDisplay** - Display numerals

#### Typography Scale
- **Heading 1**: 2.5rem (archivo, weight 700)
- **Heading 2**: 2.375rem (archivo, weight 700)
- **Heading 3**: clamp(2rem,7.1cqw,5rem) (archivo, weight 700)
- **Body**: .6875rem (darkerGrotesque, weight 400)
- **Caption**: 11px (darkerGrotesque, weight 400)
- **Code**: 14px (berkeleyMono, weight 400)

#### Typographic Rules
- Maximum 3 font families per screen
- archivo for body/UI, darkerGrotesque for display
- 3-4 font sizes maximum per screen
- Bold headings (600-700), regular body (400)
- Line height: 1.5 (body), 1.2 (headings)

## 2. Component System

### 2.1 Layout Components

#### Hero Section (`aetheris-hero-sec`)
- Full-width hero with terminal demo
- Minimum height: min(70svh, 36rem)
- Overflow hidden for animations
- Contains dual terminal panes (client decrypted vs wire encrypted)

#### Navigation (`aetheris-desktop-nav`)
- Desktop navigation with dropdown support
- Mobile burger menu (`aetheris-burger`)
- Search trigger (`aetheris-search-trigger`)
- CTA buttons in nav (`aetheris-nav-cta-group`)

#### Footer (`aetheris-foot`)
- Grid layout (`aetheris-footer-grid`)
- Footer links (`aetheris-footlink`)
- Social media integration

#### Section Containers (`aetheris-sec`)
- Standard section container with consistent padding
- Accent surface variant (`aetheris-accent-surface`) with orange background
- Frame constraint (`aetheris-frame`) for max-width content
- Decorative rails (`aetheris-rails`) for visual interest

### 2.2 Card Components

#### Product Cards (`aetheris-prod-card`)
- Grid layout for product showcase
- Dot indicators (`aetheris-prod-dot`)
- Feature highlights (`aetheris-prod-feat`)
- Index markers (`aetheris-prod-index`)

#### Mega Cards (`aetheris-mega-card`)
- Large feature cards
- Split layout (`aetheris-mega-split`)
- Figure/hero art (`aetheris-mega-figure`, `aetheris-mega-hero-art`)
- Descriptions and titles (`aetheris-mega-desc`, `aetheris-mega-title`)

#### Standard Cards (`aetheris-card`)
- Generic card component
- Used across various sections

### 2.3 Interactive Components

#### Buttons
- **CTA Dark** (`aetheris-cta-dark`) - Primary call-to-action
- **CTA Outline** (`aetheris-cta-outline`) - Secondary actions
- **Outline** (`aetheris-outline`) - Generic outlined buttons
- Animated states with hover effects

#### Terminal Demo (`aetheris-heroterm`)
- Dual-pane terminal simulation
- **Client Decrypted** pane - shows readable output
- **Wire Encrypted** pane - shows encrypted traffic
- Animated cursor (`aetheris-heroterm-cursor`)
- Mode switching (`aetheris-heroterm-modes`)
- Shell styling (`aetheris-heroterm-shell`)

#### Search Interface
- Search trigger button
- Mobile search button (`aetheris-search-mbtn`)
- Integration with navigation

#### Navigation Dropdown (`aetheris-navdrop`)
- Panel-based dropdown
- Caret indicator (`aetheris-navdrop-caret`)
- Box container (`aetheris-navdrop-box`)

### 2.4 Data Display Components

#### Stats Grid (`aetheris-stats-grid`)
- Performance metrics display
- Stat cells (`aetheris-stat-cell`)
- Stat values (`aetheris-stat-value`)

#### API Grid (`aetheris-api-grid`)
- API documentation display
- Code examples with syntax highlighting

#### Feature Lists (`aetheris-feat`)
- Feature highlights
- Context columns (`aetheris-col-context`)
- Type indicators (`aetheris-col-type`)

#### Model Display
- Model headers (`aetheris-model-head`)
- Model names (`aetheris-model-name`)
- Model rows (`aetheris-model-row`)

### 2.5 Decorative Components

#### Rail System (`aetheris-rails`)
- Decorative background elements
- Horizontal rails (`aetheris-rail-h`)
- Vertical rails (`aetheris-rail-v`)
- Accent rails (`aetheris-rail-accent`)
- Reveal animations (`data-reveal="1"`)

#### Isolation Ladder (`aetheris-isoladder`)
- Visual representation of security isolation
- Ring components (`aetheris-isoring`)
- Core ring variant (`aetheris-isoring-core`)
- Chip elements (`aetheris-isoring-chip`)

#### Navigation Art
- Animated dashes (`aetheris-navart-dash`)
- Blink effects (`aetheris-navart-blink`)
- Various dash lengths (4, 6, 8, 10)

## 3. Layout Principles

### 3.1 Spacing System
- **Base Unit**: 4px
- **Scale**: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24px
- **Tight**: 4-8px (related items within groups)
- **Medium**: 12-16px (between groups)
- **Wide**: 24-32px (between sections)
- **Vast**: 48px+ (major section breaks)

### 3.2 Border Radius
- **Scale**: .25rem, 6px, 10px, 12px, 999px, 999rem
- **Pill buttons**: 999px/999rem
- **Cards**: 6px-12px
- **Small elements**: .25rem

### 3.3 Max Width
- **Content Frame**: 1024px (via `--ax-frame` CSS variable)
- **Gutter**: Defined via `--ax-gutter` CSS variable

### 3.4 Responsive Breakpoints
- **xs**: 22.5rem (360px)
- **sm**: 40rem (640px)
- **md**: 48rem (768px)
- **lg**: 56.3125rem (900px), 64rem (1024px)
- **xl**: 80rem (1280px), 1200px
- **2xl**: 96rem (1536px), 100rem (1600px)

## 4. Animation & Motion

### 4.1 CSS Animations
- `cellIn` - Cell entrance animation
- `riseIn` - Rise from bottom
- `pulse` - Pulsing effect
- `aetherisFade` - Custom fade
- `blink` - Cursor blinking (1.1s steps)
- `aetherisNavartDash` - Navigation dash animation
- `aetherisNavartBlink` - Navigation blink effect
- `aetherisSearchIn` - Search entrance

### 4.2 Motion Guidelines
- **Micro-interactions**: 150-300ms
- **Page transitions**: 300-500ms
- **Easing**: ease-out (enter), ease-in (exit)
- **Respects**: `prefers-reduced-motion`

### 4.3 Animated Components
- Terminal cursor blinking
- Navigation art dashes
- Reveal animations on scroll
- Button hover states

## 5. Depth & Elevation

### 5.1 Shadow System
- **Flat**: `inset 0 1px 2px #0006`
- **Raised**: 
  - `0 0 #ff690199`
  - `0 0 0 7px #ff690100`
  - `0 0 #ff690100`
- **Overlay**:
  - `0 30px 70px -20px #000c`
  - `0 0 30px #ff690121`
  - `0 24px 60px #00000080`

### 5.2 Z-Index Scale
- Levels: 5, 10, 50, 80, 120, 150, 200

## 6. Technical Implementation

### 6.1 Framework & Stack
- **Framework**: Next.js (detected from `/_next/static/` paths)
- **Styling**: Tailwind CSS (detected from `--tw-*` CSS variables)
- **Build**: Turbopack (detected from chunk names)
- **Font Loading**: Preload with font-display: swap

### 6.2 CSS Architecture
- **CSS Layers**: `@layer properties` for modern CSS organization
- **CSS Variables**: Extensive use of custom properties
- **Utility Classes**: Tailwind-based utility classes
- **Component Classes**: BEM-style naming with `aetheris-` prefix

### 6.3 JavaScript Architecture
- **Code Splitting**: Multiple chunk files
- **Immutable Assets**: Static asset optimization
- **Client-side Rendering**: React/Next.js hydration

## 7. Functionality Analysis

### 7.1 Core Features
1. **AI Inference API**: Enterprise-grade AI model access
2. **Encryption Proxy**: Request/response encryption (demonstrated in terminal)
3. **Model Catalog**: Multiple AI models available (Nvidia Nemotron, etc.)
4. **Documentation**: Comprehensive docs at docs.aetheris.ai
5. **Enterprise Features**: Dedicated enterprise subdomain

### 7.2 API Endpoints
- **Chat Completions**: `https://api.aetheris.dev/chat/completions`
- **Encrypted Streaming**: `https://api.aetheris.dev/enc/{model}/message_stream`
- **Models**: Nvidia Nemotron-3.5-lightning, Nemotron-3-ultra-550b

### 7.3 Security Features
- **End-to-end Encryption**: Demonstrated in terminal demo
- **Request/Response Sealing**: Each token encrypted individually
- **Anonymous Access**: Key alias support
- **Signature Verification**: Cryptographic signatures on responses

### 7.4 User Interface Features
1. **Terminal Demo**: Live encryption demonstration
2. **Model Comparison**: Side-by-side model capabilities
3. **Performance Stats**: Latency and throughput metrics
4. **API Documentation**: Integrated code examples
5. **Responsive Design**: Mobile-first approach

## 8. Design Patterns

### 8.1 Section Structure
```html
<section class="aetheris-sec">
  <div class="aetheris-frame">
    <div class="aetheris-rails"> <!-- decorative -->
      <div class="aetheris-rail">...</div>
    </div>
    <!-- content -->
  </div>
</section>
```

### 8.2 Card Pattern
```html
<div class="aetheris-card aetheris-prod-card">
  <div class="aetheris-prod-dot"></div>
  <div class="aetheris-prod-feat">...</div>
</div>
```

### 8.3 Terminal Demo Pattern
```html
<div class="aetheris-heroterm">
  <div class="aetheris-heroterm-modes">
    <div class="aetheris-heroterm-mode">CLIENT · DECRYPTED</div>
    <div class="aetheris-heroterm-mode">WIRE · ENCRYPTED</div>
  </div>
  <div class="aetheris-heroterm-panes">
    <div class="aetheris-heroterm-pane">...</div>
    <div class="aetheris-heroterm-pane">...</div>
  </div>
</div>
```

## 9. Accessibility

### 9.1 ARIA Labels
- Comprehensive aria-label usage
- Section landmarks with descriptive labels
- Interactive elements properly labeled
- Terminal demo with descriptive aria-labels

### 9.2 Semantic HTML
- Proper heading hierarchy
- Section landmarks
- Navigation landmarks
- Semantic button elements

## 10. Performance Considerations

### 10.1 Asset Optimization
- Font preloading
- CSS/JS code splitting
- Immutable asset caching
- WOFF2 font format

### 10.2 Rendering Strategy
- Client-side rendering with hydration
- Static generation where possible
- Optimized bundle size with code splitting

## 11. Legacy/Old NPM App Analysis

### 11.1 Findings
**No direct evidence of an "old npm app" was found in the current implementation.** The current site appears to be a complete Next.js rewrite with:

- Modern Next.js architecture
- Tailwind CSS styling
- No legacy npm package references in the markup
- No references to old app architecture in the HTML/CSS

### 11.2 Possible Explanations
1. **Complete Rewrite**: The platform may have been completely rebuilt from scratch
2. **Separate Legacy System**: Old npm app may run on a different subdomain or path
3. **Internal Tool**: Legacy app may be internal-only and not publicly accessible
4. **Decommissioned**: Old npm app may have been fully replaced

### 11.3 Recommendations
- Check internal documentation or git history for legacy references
- Look for separate subdomains (e.g., old.aetheris.ai, legacy.aetheris.ai)
- Check npm registry for aetheris-related packages
- Review company blog or changelog for migration announcements

## 12. Design Tokens Summary

### 12.1 CSS Variables
```css
--ax-frame: 1024px
--ax-gutter: [defined value]
--shimmer-angle: 20deg
--tw-translate-x: 0
--tw-translate-y: 0
--tw-border-style: solid
--background: #070707
--foreground: #F5F5F5
--card: #161616
--primary: #FF6901
--primary-foreground: #190f0b
--secondary: #222
--muted: #222
--accent: #222
--destructive: #ff6568
--border: #ffffff1f
```

### 12.2 Font Variables
```css
--font-darker-grotesque: "darkerGrotesque", "darkerGrotesque Fallback"
--font-archivo: "archivo", "archivo Fallback"
--font-berkeley-mono: "berkeleyMono", ui-monospace, SFMono-Regular, Menlo, Monaco
```

## 13. Recommendations for Implementation

### 13.1 Design System Adoption
1. **Use the 4px spacing grid** consistently
2. **Implement the color palette** with CSS variables
3. **Adopt the font stack** with proper fallbacks
4. **Follow the component patterns** for consistency
5. **Implement the animation system** with respect to reduced motion

### 13.2 Component Library
1. Create reusable components based on the identified patterns
2. Implement the card system with variants
3. Build the terminal demo component for security showcases
4. Create the navigation system with dropdown support
5. Implement the rail system for decorative backgrounds

### 13.3 Technical Stack
1. **Next.js** for the framework
2. **Tailwind CSS** for styling
3. **TypeScript** for type safety
4. **CSS Modules** or **CSS-in-JS** for component styling
5. **Framer Motion** or **React Spring** for animations

## 14. Conclusion

Aetheris.dev presents a sophisticated, security-focused AI platform with a well-defined design system. The dark theme, orange accent, and technical typography create a strong developer-centric brand identity. The component system is modular and consistent, with clear patterns for layout, cards, navigation, and interactive elements.

The platform's focus on encryption and security is reflected in both the functionality (terminal demo showing encrypted traffic) and the design (technical aesthetic, code-focused typography). The absence of legacy npm app references suggests either a complete rewrite or that the legacy system is entirely separate from the public-facing website.

For recreating this design system, focus on:
1. The dark color palette with orange accents
2. The three-font typography system
3. The 4px spacing grid
4. The modular component architecture
5. The security-focused interactive elements