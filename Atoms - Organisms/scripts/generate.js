/**
 * Aetheris Design System & Documentation Static Site Generator
 * Generates living style guide, animation showroom, device simulator, and documentation portal.
 */

const fs = require('fs');
const path = require('path');
const { parseMarkdown, escapeHtml } = require('./lib/markdown');
const { colors, typographyScale, spacingScale, modelsCatalog } = require('./lib/styleguide-data');
const { keyframesList, showroomEffects } = require('./lib/animation-data');
const { devices } = require('./lib/device-data');

// Base Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const SKILLS_DIR = path.join(ROOT_DIR, 'skills', 'aetheris-design-ultra');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_DOCS_DIR = path.join(DIST_DIR, 'docs');
const DIST_ASSETS_DIR = path.join(DIST_DIR, 'assets');

// Ensure output directories exist
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(DIST_DOCS_DIR, { recursive: true });
fs.mkdirSync(path.join(DIST_ASSETS_DIR, 'screens'), { recursive: true });
fs.mkdirSync(path.join(DIST_ASSETS_DIR, 'screenshots'), { recursive: true });

// Copy screens and screenshots assets
function copyStaticAssets() {
  console.log('📦 Copying visual assets...');
  const srcScreens = path.join(SKILLS_DIR, 'screens');
  const dstScreens = path.join(DIST_ASSETS_DIR, 'screens');
  if (fs.existsSync(srcScreens)) {
    fs.cpSync(srcScreens, dstScreens, { recursive: true });
    console.log('   ✓ Copied screens to dist/assets/screens/');
  }

  const srcScreenshots = path.join(SKILLS_DIR, 'screenshots');
  const dstScreenshots = path.join(DIST_ASSETS_DIR, 'screenshots');
  if (fs.existsSync(srcScreenshots)) {
    fs.cpSync(srcScreenshots, dstScreenshots, { recursive: true });
    console.log('   ✓ Copied screenshots to dist/assets/screenshots/');
  }
}

// Global Navigation Component
function renderHeader(activeNav, isSubdir = false) {
  const rel = isSubdir ? '../' : '';
  const docsUrl = isSubdir ? 'AETHERIS_DESIGN_REPORT.html' : 'docs/AETHERIS_DESIGN_REPORT.html';

  return `
    <header class="ax-header">
      <div class="ax-container ax-header-inner">
        <a href="${rel}index.html" class="ax-brand">
          <div class="ax-logo-icon">B</div>
          <span>aetheris</span>
          <span class="ax-badge ax-badge-accent" style="font-size: 11px; margin-left: 4px;">DESIGN SYSTEM</span>
        </a>

        <nav class="ax-nav-links">
          <a href="${rel}index.html" class="ax-nav-link ${activeNav === 'overview' ? 'active' : ''}">Overview</a>
          <a href="${rel}styleguide.html" class="ax-nav-link ${activeNav === 'styleguide' ? 'active' : ''}">Style Guide</a>
          <a href="${rel}animations.html" class="ax-nav-link ${activeNav === 'animations' ? 'active' : ''}">Animations</a>
          <a href="${rel}devices.html" class="ax-nav-link ${activeNav === 'devices' ? 'active' : ''}">Device Simulator</a>
          <a href="${docsUrl}" class="ax-nav-link ${activeNav === 'docs' ? 'active' : ''}">Docs</a>
        </nav>

        <div class="ax-header-actions">
          <button class="ax-btn ax-btn-secondary ax-btn-sm ax-search-trigger" style="gap: 8px;" title="Quick search (Cmd+K)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span style="font-size: 13px;">Search</span>
            <kbd class="ax-kbd-badge">⌘K</kbd>
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" class="ax-btn ax-btn-primary ax-btn-sm">Get API Key</a>
        </div>
      </div>
    </header>
  `;
}

// Global Footer Component
function renderFooter(isSubdir = false) {
  const rel = isSubdir ? '../' : '';
  const docsUrl = isSubdir ? 'AETHERIS_DESIGN_REPORT.html' : 'docs/AETHERIS_DESIGN_REPORT.html';

  return `
    <footer class="ax-footer">
      <div class="ax-container">
        <div class="ax-footer-grid">
          <div>
            <div class="ax-brand" style="margin-bottom: 12px;">
              <div class="ax-logo-icon">B</div>
              <span>aetheris.dev</span>
            </div>
            <p style="font-size: 14px; color: var(--ax-text-2); max-width: 320px; line-height: 1.6; margin-bottom: 16px;">
              The high-trust, zero-data-retention inference engine and technical design system for frontier AI models.
            </p>
            <div style="display: flex; gap: 8px;">
              <span class="ax-badge ax-badge-success"><span class="ax-status-dot active"></span> 100% Mesh Operational</span>
              <span class="ax-badge">Lighthouse 98/100</span>
            </div>
          </div>

          <div>
            <div class="ax-footer-col-title">System & Design</div>
            <ul class="ax-footer-links">
              <li><a href="${rel}styleguide.html#colors">Color Tokens</a></li>
              <li><a href="${rel}styleguide.html#typography">Typography Scale</a></li>
              <li><a href="${rel}styleguide.html#spacing">4px Spacing Grid</a></li>
              <li><a href="${rel}styleguide.html#buttons">Buttons & Primitives</a></li>
              <li><a href="${rel}styleguide.html#inputs">Form Controls</a></li>
            </ul>
          </div>

          <div>
            <div class="ax-footer-col-title">Tools & Labs</div>
            <ul class="ax-footer-links">
              <li><a href="${rel}animations.html">Keyframe Showroom</a></li>
              <li><a href="${rel}animations.html#effects">Motion Effects Lab</a></li>
              <li><a href="${rel}devices.html">Device Viewport Simulator</a></li>
              <li><a href="${rel}devices.html?dummy=portal">Portal Click Dummy</a></li>
              <li><a href="${rel}devices.html?dummy=cli">CLI TUI Simulator</a></li>
            </ul>
          </div>

          <div>
            <div class="ax-footer-col-title">Documentation</div>
            <ul class="ax-footer-links">
              <li><a href="${docsUrl}">Design Audit Report</a></li>
              <li><a href="${isSubdir ? 'PERFORMANCE_ACCESSIBILITY_REPORT.html' : 'docs/PERFORMANCE_ACCESSIBILITY_REPORT.html'}">Performance & A11y</a></li>
              <li><a href="${isSubdir ? 'COMPLETE_EXTRACTION_SUMMARY.html' : 'docs/COMPLETE_EXTRACTION_SUMMARY.html'}">Extraction Summary</a></li>
              <li><a href="${isSubdir ? 'REF_VISUAL_GUIDE.html' : 'docs/REF_VISUAL_GUIDE.html'}">Visual Specification</a></li>
              <li><a href="${isSubdir ? 'REF_ANIMATIONS.html' : 'docs/REF_ANIMATIONS.html'}">Motion Spec</a></li>
            </ul>
          </div>
        </div>

        <div class="ax-footer-bottom">
          <div>© 2026 Aetheris. High-performance design extraction. Released under MIT license.</div>
          <div style="display: flex; gap: 16px;">
            <span>WCAG 2.1 AA Compliant</span>
            <span>Zero-Retention Enclaves</span>
            <span>v2.4.0-ultra</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Global Search Modal HTML
function renderSearchModal() {
  return `
    <div id="ax-search-modal" class="ax-search-modal" role="dialog" aria-modal="true" aria-label="Search design system and documentation">
      <div class="ax-search-dialog">
        <div style="padding: 16px; border-bottom: 1px solid var(--ax-border); display: flex; align-items: center; gap: 12px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--ax-text-3);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="ax-search-input" class="ax-input" placeholder="Search tokens, components, guides, keyframes... (Esc to close)" style="border: none; background: transparent; padding: 0; box-shadow: none;" autofocus />
          <kbd class="ax-kbd-badge">ESC</kbd>
        </div>
        <div id="ax-search-results" class="ax-search-results"></div>
        <div style="padding: 10px 16px; background: var(--ax-surface-2); border-top: 1px solid var(--ax-border-subdued); display: flex; justify-content: space-between; font-size: 11px; color: var(--ax-text-3);">
          <span>Navigate with <kbd class="ax-kbd-badge">↑</kbd> <kbd class="ax-kbd-badge">↓</kbd></span>
          <span>Press <kbd class="ax-kbd-badge">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
    <div id="ax-global-toast" class="ax-toast"></div>
  `;
}

// HTML Shell Wrap
function wrapHtml({ title, description, activeNav, body, isSubdir = false }) {
  const rel = isSubdir ? '../' : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Aetheris Living Design System</title>
  <meta name="description" content="${escapeHtml(description || 'Aetheris Technical Design System')}">
  <link rel="stylesheet" href="${rel}assets/css/styleguide.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6901'><rect width='24' height='24' rx='4'/><text x='12' y='17' font-family='sans-serif' font-weight='900' font-size='15' fill='white' text-anchor='middle'>B</text></svg>">
</head>
<body class="ax-layout">
  ${renderHeader(activeNav, isSubdir)}
  ${body}
  ${renderFooter(isSubdir)}
  ${renderSearchModal()}
  <script src="${rel}assets/js/app.js"></script>
</body>
</html>`;
}

// --------------------------------------------------------------------------
// 1. PAGE: dist/index.html (Main Portal & Overview)
// --------------------------------------------------------------------------
function generateIndexPage(allDocsList) {
  console.log('🔨 Generating dist/index.html...');

  const metricsHtml = `
    <div class="ax-stat-grid" style="margin: 0 0 48px;">
      <div class="ax-stat-card">
        <div class="ax-stat-val" style="color: var(--ax-success);">98<span style="font-size: 20px;">/100</span></div>
        <div class="ax-stat-label">Lighthouse Performance</div>
        <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">FCP 0.5s · A11y 96 · Best 100</div>
      </div>
      <div class="ax-stat-card">
        <div class="ax-stat-val" style="color: var(--ax-accent);">0.5s</div>
        <div class="ax-stat-label">First Contentful Paint</div>
        <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">Zero layout shift (CLS: 0.001)</div>
      </div>
      <div class="ax-stat-card">
        <div class="ax-stat-val">120+</div>
        <div class="ax-stat-label">CSS Atoms & Components</div>
        <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">Strict BEM namespace (.ax-)</div>
      </div>
      <div class="ax-stat-card">
        <div class="ax-stat-val">10</div>
        <div class="ax-stat-label">Motion Keyframes</div>
        <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">Spring physics & CLI pulse</div>
      </div>
      <div class="ax-stat-card">
        <div class="ax-stat-val">8</div>
        <div class="ax-stat-label">Hardware Bezels</div>
        <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">Mobile, Tablet, Laptop, ANSI</div>
      </div>
      <div class="ax-stat-card">
        <div class="ax-stat-val">3.8M</div>
        <div class="ax-stat-label">Tokens / Sec Mesh</div>
        <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">34 Global low-latency clusters</div>
      </div>
    </div>
  `;

  const quickAccessHtml = `
    <div style="margin-bottom: 64px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Design System Pillars</h2>
          <p class="ax-p" style="margin: 4px 0 0;">Interactive toolkits, specs, and simulation environments</p>
        </div>
      </div>

      <div class="ax-mega-grid">
        <a href="styleguide.html" class="ax-mega-item">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="ax-badge ax-badge-accent">ATOMS & MOLECULES</span>
            <span style="color: var(--ax-accent); font-weight: 700;">→</span>
          </div>
          <div class="ax-mega-title" style="margin-top: 12px;">Living Style Guide</div>
          <div class="ax-mega-desc">
            17 semantic color tokens, Darker Grotesque & Archivo typography specimens with live interactive playground, 4px spacing scale, buttons, inputs, chips, and molecules.
          </div>
        </a>

        <a href="animations.html" class="ax-mega-item">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="ax-badge ax-badge-success">MOTION LAB</span>
            <span style="color: var(--ax-accent); font-weight: 700;">→</span>
          </div>
          <div class="ax-mega-title" style="margin-top: 12px;">Animation Showroom</div>
          <div class="ax-mega-desc">
            All 10 extracted Aetheris keyframes (navartBlink, riseIn, cellIn, blink, aetherisSearchIn, etc.) with real-time speed slider, easing curves, and reduced motion tests.
          </div>
        </a>

        <a href="devices.html" class="ax-mega-item">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="ax-badge ax-badge-warning">SIMULATOR</span>
            <span style="color: var(--ax-accent); font-weight: 700;">→</span>
          </div>
          <div class="ax-mega-title" style="margin-top: 12px;">Device Simulator</div>
          <div class="ax-mega-desc">
            Interactive multi-device viewport with hardware bezels (iPhone 15 Pro, Pixel 8, iPad, MacBook Air, ANSI Terminal) and 3 responsive click dummies.
          </div>
        </a>

        <a href="#docs-catalog" class="ax-mega-item">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="ax-badge">7 REPORTS + 6 SPECS</span>
            <span style="color: var(--ax-accent); font-weight: 700;">→</span>
          </div>
          <div class="ax-mega-title" style="margin-top: 12px;">Documentation Portal</div>
          <div class="ax-mega-desc">
            Complete extraction summaries, Lighthouse audits, design specifications, interaction models, and cross-platform architecture guides.
          </div>
        </a>
      </div>
    </div>
  `;

  const terminalHtml = `
    <div style="margin-bottom: 64px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div>
          <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Interactive Terminal CLI Runner</h2>
          <p class="ax-p" style="margin: 4px 0 0;">Experience the Aetheris CLI router directly in the browser</p>
        </div>
        <span class="ax-badge ax-badge-accent">React + Ink TUI</span>
      </div>

      <div class="ax-terminal" style="margin: 16px 0 0;">
        <div class="ax-term-header">
          <div class="ax-term-dots">
            <div class="ax-term-dot" style="background: #EF4444;"></div>
            <div class="ax-term-dot" style="background: #F59E0B;"></div>
            <div class="ax-term-dot" style="background: #10B981;"></div>
          </div>
          <div class="ax-term-title">aetheris-cli — v1.0.2 (interactive)</div>
          <div style="font-size: 11px; color: var(--ax-text-3);">Type "help" below</div>
        </div>
        <div class="ax-term-body">
          <div class="ax-term-line" style="color: var(--ax-accent); font-weight: 700;">┌────────────────────────────────────────────────────────┐</div>
          <div class="ax-term-line" style="color: var(--ax-accent); font-weight: 700;">│              AETHERIS TERMINAL RUNNER                  │</div>
          <div class="ax-term-line" style="color: var(--ax-accent); font-weight: 700;">│        Frontier Multi-Model Router CLI (Ink TUI)       │</div>
          <div class="ax-term-line" style="color: var(--ax-accent); font-weight: 700;">└────────────────────────────────────────────────────────┘</div>
          <div class="ax-term-line" style="color: var(--ax-success);">✓ Connected to Aetheris High-Speed Mesh (34 clusters online)</div>
          <div class="ax-term-line" style="color: var(--ax-text-3);">Available commands: <span style="color:#FF6901">help</span>, <span style="color:#FF6901">models</span>, <span style="color:#FF6901">status</span>, <span style="color:#FF6901">chat &lt;prompt&gt;</span>, <span style="color:#FF6901">clear</span></div>
          <div class="ax-term-prompt">
            <span class="ax-term-ps1">aetheris&gt;</span>
            <input type="text" class="ax-term-input" placeholder="try typing 'models' or 'status'..." autofocus />
            <span class="ax-term-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const matrixHtml = `
    <div style="margin-bottom: 64px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Frontier Model Catalog Matrix</h2>
          <p class="ax-p" style="margin: 4px 0 0;">Unified zero-retention routing across top foundational LLMs</p>
        </div>
        <span class="ax-badge ax-badge-success">34 Nodes Active</span>
      </div>

      <div class="ax-matrix-wrapper">
        <table class="ax-matrix-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Provider</th>
              <th>Context Window</th>
              <th>Throughput</th>
              <th>Benchmark Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${modelsCatalog.map(m => `
              <tr>
                <td style="font-weight: 600; color: var(--ax-text-1);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="ax-status-dot active"></span>
                    <span>${escapeHtml(m.name)}</span>
                  </div>
                </td>
                <td><span class="ax-badge">${escapeHtml(m.provider)}</span></td>
                <td style="font-family: var(--font-mono); font-size: 13px;">${escapeHtml(m.context)}</td>
                <td style="font-family: var(--font-numerals); color: var(--ax-accent); font-weight: 700;">${escapeHtml(m.speed)}</td>
                <td style="font-family: var(--font-numerals); font-weight: 600;">${escapeHtml(m.score)}</td>
                <td><span class="ax-badge ax-badge-success">${escapeHtml(m.status)}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const docsCatalogHtml = `
    <div id="docs-catalog" style="margin-bottom: 64px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Documentation & Audit Catalog</h2>
          <p class="ax-p" style="margin: 4px 0 0;">Comprehensive architectural reports, token extractions, and technical audits</p>
        </div>
        <span class="ax-badge">${allDocsList.length} Documents Available</span>
      </div>

      <div class="ax-mega-grid">
        ${allDocsList.map(doc => `
          <a href="docs/${doc.filename}" class="ax-mega-item">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="ax-badge ${doc.badgeClass || ''}">${doc.badge}</span>
              <span style="font-size: 11px; font-family: var(--font-mono); color: var(--ax-text-3);">${doc.readTime}</span>
            </div>
            <div class="ax-mega-title" style="margin-top: 10px; font-size: 20px;">${escapeHtml(doc.title)}</div>
            <div class="ax-mega-desc" style="font-size: 13px;">${escapeHtml(doc.description)}</div>
            <div style="margin-top: 12px; display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ax-accent); font-weight: 600;">
              Read document →
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  const visualPreviewHtml = `
    <div style="margin-bottom: 64px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Visual Extraction Artifacts</h2>
          <p class="ax-p" style="margin: 4px 0 0;">Captured states, scroll frames, and homepage screenshots</p>
        </div>
        <a href="devices.html" class="ax-btn ax-btn-secondary ax-btn-sm">Launch in Simulator →</a>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <div style="background: var(--ax-surface-1); border: 1px solid var(--ax-border); border-radius: var(--radius-xl); overflow: hidden;">
          <img src="assets/screenshots/homepage.png" alt="Aetheris Homepage" style="width: 100%; height: 200px; object-fit: cover; object-position: top; display: block;" onerror="this.style.display='none'" />
          <div style="padding: 16px;">
            <div style="font-weight: 600; font-size: 15px; color: var(--ax-text-1);">Full Homepage Viewport</div>
            <div style="font-size: 12px; color: var(--ax-text-3); margin-top: 4px;">Desktop 1440x900 viewport capture</div>
          </div>
        </div>

        <div style="background: var(--ax-surface-1); border: 1px solid var(--ax-border); border-radius: var(--radius-xl); overflow: hidden;">
          <img src="assets/screens/pages/home.png" alt="Home Page Screen" style="width: 100%; height: 200px; object-fit: cover; object-position: top; display: block;" onerror="this.style.display='none'" />
          <div style="padding: 16px;">
            <div style="font-weight: 600; font-size: 15px; color: var(--ax-text-1);">Mobile Page Capture</div>
            <div style="font-size: 12px; color: var(--ax-text-3); margin-top: 4px;">Dynamic mobile sheet & responsive cards</div>
          </div>
        </div>

        <div style="background: var(--ax-surface-1); border: 1px solid var(--ax-border); border-radius: var(--radius-xl); overflow: hidden;">
          <img src="assets/screens/sections/home-section-1.png" alt="Section Capture" style="width: 100%; height: 200px; object-fit: cover; object-position: top; display: block;" onerror="this.style.display='none'" />
          <div style="padding: 16px;">
            <div style="font-weight: 600; font-size: 15px; color: var(--ax-text-1);">Section 1 Hero Extraction</div>
            <div style="font-size: 12px; color: var(--ax-text-3); margin-top: 4px;">Keyframes, typography, and accent halos</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const body = `
    <main class="ax-container">
      <!-- Hero -->
      <section class="ax-hero">
        <div class="ax-hero-badge">
          <span class="ax-badge ax-badge-accent" style="padding: 6px 14px; font-size: 13px;">
            <span class="ax-status-dot active"></span> Frontier AI Inference & Living Design System
          </span>
        </div>
        <h1 class="ax-hero-title">
          The Technical Design System for <span>Frontier AI Inference</span>
        </h1>
        <p class="ax-hero-sub">
          A comprehensive design system extraction from Aetheris. Complete with interactive token swatches, specimen playgrounds, 10 motion keyframes, 8 hardware device bezels, and technical audit reports.
        </p>
        <div class="ax-hero-actions">
          <a href="styleguide.html" class="ax-btn ax-btn-primary ax-btn-lg">Explore Style Guide →</a>
          <a href="animations.html" class="ax-btn ax-btn-secondary ax-btn-lg">Motion Lab</a>
          <a href="devices.html" class="ax-btn ax-btn-secondary ax-btn-lg">Device Simulator</a>
          <a href="#docs-catalog" class="ax-btn ax-btn-ghost ax-btn-lg">Read Audits</a>
        </div>
      </section>

      ${metricsHtml}
      ${quickAccessHtml}
      ${terminalHtml}
      ${matrixHtml}
      ${docsCatalogHtml}
      ${visualPreviewHtml}
    </main>
  `;

  const html = wrapHtml({
    title: 'Overview & Design Portal',
    description: 'Aetheris technical design system, living component catalog, motion lab, and multi-device simulator.',
    activeNav: 'overview',
    body,
    isSubdir: false
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html, 'utf8');
  console.log('   ✓ Generated dist/index.html');
}

// --------------------------------------------------------------------------
// 2. PAGE: dist/styleguide.html (Living Style Guide)
// --------------------------------------------------------------------------
function generateStyleguidePage() {
  console.log('🔨 Generating dist/styleguide.html...');

  // 1. Swatches HTML
  const swatchesHtml = colors.map(c => `
    <div class="ax-swatch-card" data-hex="${c.hex}" title="Click to copy ${c.hex}">
      <div class="ax-swatch-color" style="background-color: ${c.hex};"></div>
      <div class="ax-swatch-info">
        <div class="ax-swatch-name">${escapeHtml(c.name)}</div>
        <div class="ax-swatch-hex">${c.hex}</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--ax-text-3); margin-top: 2px;">${c.token}</div>
        <div class="ax-swatch-role">${escapeHtml(c.role)}</div>
      </div>
    </div>
  `).join('');

  // 2. Typography Specimens HTML
  const typographySpecimensHtml = typographyScale.map(t => `
    <div style="padding: 16px; border: 1px solid var(--ax-border); border-radius: var(--radius-lg); background: var(--ax-surface-1); margin-bottom: 12px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 700; font-size: 14px; color: var(--ax-text-1);">${escapeHtml(t.level)}</span>
          <span class="ax-badge">${escapeHtml(t.family)}</span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--ax-text-3);">
          Size: <span style="color:var(--ax-accent)">${t.size}</span> · Weight: ${t.weight} · Line-height: ${t.lineHeight}
        </div>
      </div>
      <div style="font-family: '${t.family}', var(--font-sans); font-size: ${t.size}; font-weight: ${t.weight}; line-height: ${t.lineHeight}; color: var(--ax-text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${escapeHtml(t.sample)}
      </div>
    </div>
  `).join('');

  // 3. Spacing Grid HTML
  const spacingRowsHtml = spacingScale.map(s => `
    <div class="ax-spacing-row">
      <div class="ax-spacing-meta">
        <span style="color: var(--ax-accent); font-weight: 700;">${s.name}</span>
        <span style="color: var(--ax-text-3); margin-left: 8px;">${s.value}</span>
        <div style="font-size: 10px; color: var(--ax-text-3); margin-top: 2px;">${s.token}</div>
      </div>
      <div class="ax-spacing-bar-wrap">
        <div class="ax-spacing-bar" style="width: ${s.value}; min-width: 2px;"></div>
      </div>
    </div>
  `).join('');

  const body = `
    <div class="ax-main-wrap">
      <!-- Sticky Sidebar -->
      <aside class="ax-sidebar">
        <div class="ax-sidebar-group">
          <div class="ax-sidebar-title">ATOMS</div>
          <a href="#colors" class="ax-sidebar-item"><span>Colors & Tokens</span><span class="ax-badge">17</span></a>
          <a href="#typography" class="ax-sidebar-item"><span>Typography & Scale</span><span class="ax-badge">9</span></a>
          <a href="#spacing" class="ax-sidebar-item"><span>Spacing & 4px Grid</span><span class="ax-badge">14</span></a>
          <a href="#buttons" class="ax-sidebar-item"><span>Buttons & States</span><span class="ax-badge">5</span></a>
          <a href="#inputs" class="ax-sidebar-item"><span>Form Controls & Toggles</span><span class="ax-badge">4</span></a>
          <a href="#badges" class="ax-sidebar-item"><span>Badges & Status Dots</span><span class="ax-badge">6</span></a>
        </div>

        <div class="ax-sidebar-group">
          <div class="ax-sidebar-title">MOLECULES</div>
          <a href="#stats" class="ax-sidebar-item"><span>Stat Cards & Metrics</span></a>
          <a href="#megacards" class="ax-sidebar-item"><span>Mega Cards</span></a>
          <a href="#modelrows" class="ax-sidebar-item"><span>Model Selector Rows</span></a>
          <a href="#codetabs" class="ax-sidebar-item"><span>Code Tabs & Copy</span></a>
          <a href="#callouts" class="ax-sidebar-item"><span>Callout Alerts</span></a>
        </div>

        <div class="ax-sidebar-group">
          <div class="ax-sidebar-title">ORGANISMS</div>
          <a href="#topbar-org" class="ax-sidebar-item"><span>Global Topbar</span></a>
          <a href="#hero-org" class="ax-sidebar-item"><span>Hero Section</span></a>
          <a href="#terminal-org" class="ax-sidebar-item"><span>CLI Terminal Runner</span></a>
          <a href="#features-org" class="ax-sidebar-item"><span>Features Grid</span></a>
          <a href="#matrix-org" class="ax-sidebar-item"><span>AI Model Matrix</span></a>
          <a href="#pricing-org" class="ax-sidebar-item"><span>Pricing Plan Cards</span></a>
          <a href="#footer-org" class="ax-sidebar-item"><span>Global Footer</span></a>
        </div>

        <div class="ax-sidebar-group">
          <div class="ax-sidebar-title">TEMPLATES</div>
          <a href="#templates-landing" class="ax-sidebar-item"><span>Landing Page Demo</span></a>
          <a href="#templates-docs" class="ax-sidebar-item"><span>Docs Reader Portal</span></a>
          <a href="#templates-studio" class="ax-sidebar-item"><span>Studio Dashboard</span></a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="ax-content">
        <!-- Breadcrumb -->
        <nav class="ax-breadcrumb">
          <a href="index.html">Overview</a>
          <span class="ax-breadcrumb-sep">/</span>
          <span style="color: var(--ax-accent);">Living Style Guide</span>
        </nav>

        <div style="margin-bottom: 36px;">
          <h1 class="ax-heading ax-h1" style="margin-bottom: 8px;">Living Style Guide & Component Catalog</h1>
          <p class="ax-p" style="font-size: 16px; margin: 0;">
            Atomic design hierarchy for Aetheris. Extracted tokens, interactive states, specimen playground, and enterprise production patterns.
          </p>
        </div>

        <!-- ================================================================ -->
        <!-- ATOMS -->
        <!-- ================================================================ -->
        <div style="border-top: 1px solid var(--ax-border); padding-top: 32px; margin-top: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="ax-badge ax-badge-accent">ATOMS</span>
            <span style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3);">FOUNDATIONAL PRIMITIVES</span>
          </div>

          <!-- 1. COLORS -->
          <section id="colors" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">1. Color Palette & Semantic Tokens</h2>
            <p class="ax-p">
              Click any swatch card below to copy its hexadecimal code to your clipboard. All contrast ratios meet or exceed WCAG 2.1 AA standards for technical dark themes.
            </p>
            <div class="ax-swatch-grid">
              ${swatchesHtml}
            </div>
          </section>

          <!-- 2. TYPOGRAPHY -->
          <section id="typography" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">2. Typography Scale & Font Stack</h2>
            <p class="ax-p">
              Primary font families: <strong>darkerGrotesque</strong> for bold headings and display heroes, <strong>archivo</strong> for clear UI copy, and <strong>berkeleyMono</strong> for code and numeric latency telemetry.
            </p>

            <div style="margin-bottom: 24px;">
              ${typographySpecimensHtml}
            </div>

            <!-- Interactive Typography Playground -->
            <div class="ax-playground">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="font-weight: 700; font-size: 15px; color: var(--ax-text-1);">Interactive Typography Playground</div>
                <span class="ax-badge ax-badge-accent">Live Tester</span>
              </div>
              <div class="ax-playground-controls">
                <div style="flex: 1; min-width: 200px;">
                  <label style="font-size: 11px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 4px;">PLAYGROUND TEXT</label>
                  <input type="text" id="ax-type-input" class="ax-input" value="Frontier AI Multi-Model Inference Mesh" />
                </div>
                <div>
                  <label style="font-size: 11px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 4px;">FONT FAMILY</label>
                  <select id="ax-type-family" class="ax-input" style="width: auto;">
                    <option value="--font-heading">darkerGrotesque (Heading)</option>
                    <option value="--font-sans">archivo (UI / Body)</option>
                    <option value="--font-mono">berkeleyMono (Code)</option>
                    <option value="--font-numerals">berkeleyMonoNumerals (Display)</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 11px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 4px;">
                    FONT SIZE: <span id="ax-type-size-val" style="color:var(--ax-accent);">32px</span>
                  </label>
                  <input type="range" id="ax-type-size" min="12" max="64" value="32" style="width: 120px;" />
                </div>
                <div>
                  <label style="font-size: 11px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 4px;">WEIGHT</label>
                  <select id="ax-type-weight" class="ax-input" style="width: auto;">
                    <option value="400">400 Regular</option>
                    <option value="500">500 Medium</option>
                    <option value="700" selected>700 Bold</option>
                  </select>
                </div>
              </div>
              <div id="ax-type-preview" class="ax-playground-preview" style="font-family: var(--font-heading); font-size: 32px; font-weight: 700; color: var(--ax-text-1);">
                Frontier AI Multi-Model Inference Mesh
              </div>
            </div>
          </section>

          <!-- 3. SPACING -->
          <section id="spacing" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">3. Spacing & 4px Base Grid Scale</h2>
            <p class="ax-p">
              Every layout dimension, margin, and padding in Aetheris adheres strictly to a 4px base unit. Visual bars below depict each multiplier in the design system.
            </p>
            <div style="background: var(--ax-surface-1); border: 1px solid var(--ax-border); border-radius: var(--radius-xl); padding: var(--space-4) var(--space-6);">
              ${spacingRowsHtml}
            </div>
          </section>

          <!-- 4. BUTTONS -->
          <section id="buttons" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">4. Buttons & Interactive States</h2>
            <p class="ax-p">
              Buttons support 5 visual variants (Primary, Secondary, Outline, Ghost, Danger), 3 size scales (Small, Medium, Large), and state variations (Default, Hover, Focus, Disabled).
            </p>

            <div style="display: flex; flex-direction: column; gap: 24px;">
              <!-- Variant showcase -->
              <div>
                <div style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3); margin-bottom: 10px;">VARIANTS (MEDIUM)</div>
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                  <button class="ax-btn ax-btn-primary" onclick="showToast('Primary clicked')">Primary Action</button>
                  <button class="ax-btn ax-btn-secondary" onclick="showToast('Secondary clicked')">Secondary Action</button>
                  <button class="ax-btn ax-btn-outline" onclick="showToast('Outline clicked')">Outline Border</button>
                  <button class="ax-btn ax-btn-ghost" onclick="showToast('Ghost clicked')">Ghost Button</button>
                  <button class="ax-btn ax-btn-danger" onclick="showToast('Danger triggered', '⚠')">Destructive Danger</button>
                </div>
              </div>

              <!-- Sizes showcase -->
              <div>
                <div style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3); margin-bottom: 10px;">SIZES & ICONS</div>
                <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
                  <button class="ax-btn ax-btn-primary ax-btn-sm" style="gap: 6px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Small (sm)
                  </button>
                  <button class="ax-btn ax-btn-primary" style="gap: 8px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4" ry="4"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg> Base (md)
                  </button>
                  <button class="ax-btn ax-btn-primary ax-btn-lg" style="gap: 10px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg> Large (lg)
                  </button>
                  <button class="ax-btn ax-btn-secondary" disabled>Disabled State</button>
                </div>
              </div>
            </div>
          </section>

          <!-- 5. FORM INPUTS -->
          <section id="inputs" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">5. Form Controls & Toggles</h2>
            <p class="ax-p">
              Inputs with focus glow halos, Cmd+K search trigger wrapping, and interactive hardware toggle switches.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
              <div>
                <label style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 6px;">STANDARD TEXT INPUT</label>
                <input type="text" class="ax-input" placeholder="e.g. claude-3-5-sonnet-20241022" />
              </div>

              <div>
                <label style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 6px;">SEARCH INPUT WITH SHORTCUT</label>
                <div class="ax-search-input-wrap">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" class="ax-input ax-search-trigger" placeholder="Quick search..." />
                  <kbd class="ax-kbd-badge">⌘K</kbd>
                </div>
              </div>

              <div>
                <label style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 6px;">TOGGLES & SWITCHES</label>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 6px;">
                  <label class="ax-toggle-wrap">
                    <div class="ax-toggle checked"></div>
                    <span style="font-size: 14px; color: var(--ax-text-1);">Stream Server-Sent Events</span>
                  </label>
                  <label class="ax-toggle-wrap">
                    <div class="ax-toggle"></div>
                    <span style="font-size: 14px; color: var(--ax-text-2);">Zero-Retention Audit Logs</span>
                  </label>
                </div>
              </div>

              <div>
                <label style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3); display: block; margin-bottom: 6px;">CHECKBOXES</label>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer;">
                    <input type="checkbox" class="ax-checkbox" checked />
                    <span>Include reasoning scratchpad tokens</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer;">
                    <input type="checkbox" class="ax-checkbox" />
                    <span>Enable multi-region failover mesh</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- 6. BADGES & STATUS DOTS -->
          <section id="badges" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">6. Badges, Chips & Status Dots</h2>
            <p class="ax-p">
              Status indicators, semantic pill chips, and radar beacon pings.
            </p>

            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 20px;">
              <span class="ax-badge">Default Tag</span>
              <span class="ax-badge ax-badge-accent">Core Accent</span>
              <span class="ax-badge ax-badge-success">Mesh Operational</span>
              <span class="ax-badge ax-badge-warning">High Load</span>
              <span class="ax-badge ax-badge-danger">Outage Alert</span>
              <span class="ax-badge ax-badge-pill ax-badge-accent">Pill Badge</span>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; background: var(--ax-surface-1); padding: 16px 20px; border: 1px solid var(--ax-border); border-radius: var(--radius-lg);">
              <div style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
                <span class="ax-status-dot active"></span>
                <span>US-East-1: Operational</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
                <span class="ax-status-dot warning"></span>
                <span>EU-Central-1: 99.2% Capacity</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 13px;">
                <span class="ax-status-dot danger"></span>
                <span>AP-South-1: Inactive</span>
              </div>
            </div>
          </section>
        </div>

        <!-- ================================================================ -->
        <!-- MOLECULES -->
        <!-- ================================================================ -->
        <div style="border-top: 1px solid var(--ax-border); padding-top: 32px; margin-top: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="ax-badge ax-badge-success">MOLECULES</span>
            <span style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3);">COMPOSED PATTERNS</span>
          </div>

          <!-- 1. STAT CARDS -->
          <section id="stats" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">1. Metric & Stat Cards</h2>
            <div class="ax-stat-grid">
              <div class="ax-stat-card">
                <div class="ax-stat-val" style="color: var(--ax-success);">98/100</div>
                <div class="ax-stat-label">Lighthouse Performance</div>
              </div>
              <div class="ax-stat-card">
                <div class="ax-stat-val" style="color: var(--ax-accent);">0.5s</div>
                <div class="ax-stat-label">First Contentful Paint</div>
              </div>
              <div class="ax-stat-card">
                <div class="ax-stat-val">120+</div>
                <div class="ax-stat-label">Component Classes</div>
              </div>
              <div class="ax-stat-card">
                <div class="ax-stat-val">3.8M</div>
                <div class="ax-stat-label">Tokens / Sec Peak</div>
              </div>
            </div>
          </section>

          <!-- 2. MEGA CARDS -->
          <section id="megacards" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">2. Mega Link Cards</h2>
            <div class="ax-mega-grid">
              <div class="ax-mega-item">
                <span class="ax-badge ax-badge-accent" style="align-self: flex-start;">ROUTING</span>
                <div class="ax-mega-title">Multi-Model Router</div>
                <div class="ax-mega-desc">
                  Dynamically route incoming inference requests to lowest-latency regional GPU clusters with automatic fallback.
                </div>
              </div>
              <div class="ax-mega-item">
                <span class="ax-badge ax-badge-success" style="align-self: flex-start;">PRIVACY</span>
                <div class="ax-mega-title">Zero-Retention API</div>
                <div class="ax-mega-desc">
                  Customer prompts and generated tokens exist strictly in volatile GPU RAM; zero persistence to disk.
                </div>
              </div>
              <div class="ax-mega-item">
                <span class="ax-badge ax-badge-warning" style="align-self: flex-start;">HARDWARE</span>
                <div class="ax-mega-title">Secure Enclaves</div>
                <div class="ax-mega-desc">
                  NVIDIA H100 Hopper confidential compute architectures verified via hardware root of trust.
                </div>
              </div>
            </div>
          </section>

          <!-- 3. MODEL ROWS -->
          <section id="modelrows" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">3. Model Selector Rows</h2>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div class="ax-model-row">
                <div class="ax-model-meta">
                  <span class="ax-status-dot active"></span>
                  <div>
                    <div class="ax-model-name">Claude 3.5 Sonnet</div>
                    <div style="font-size: 12px; color: var(--ax-text-3);">Anthropic · 200k token context window</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="ax-badge ax-badge-accent">72 tok/s</span>
                  <button class="ax-btn ax-btn-secondary ax-btn-sm">Select Model</button>
                </div>
              </div>

              <div class="ax-model-row">
                <div class="ax-model-meta">
                  <span class="ax-status-dot active"></span>
                  <div>
                    <div class="ax-model-name">GPT-4o</div>
                    <div style="font-size: 12px; color: var(--ax-text-3);">OpenAI · 128k token context window</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="ax-badge ax-badge-accent">98 tok/s</span>
                  <button class="ax-btn ax-btn-secondary ax-btn-sm">Select Model</button>
                </div>
              </div>

              <div class="ax-model-row">
                <div class="ax-model-meta">
                  <span class="ax-status-dot active"></span>
                  <div>
                    <div class="ax-model-name">DeepSeek-V3</div>
                    <div style="font-size: 12px; color: var(--ax-text-3);">DeepSeek · 64k token context window</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="ax-badge ax-badge-accent">85 tok/s</span>
                  <button class="ax-btn ax-btn-secondary ax-btn-sm">Select Model</button>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. CODE TABS -->
          <section id="codetabs" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">4. Code Block Tabs with Copy Trigger</h2>
            <div class="ax-code-block" data-lang="bash">
              <div class="ax-code-header">
                <span class="ax-code-lang">BASH / CURL</span>
                <button class="ax-copy-btn" onclick="copyCode(this)" title="Copy snippet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg> Copy
                </button>
              </div>
              <pre><code class="language-bash">curl -X POST https://api.aetheris.dev/v1/chat/completions \\
  -H "Authorization: Bearer $AETHERIS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "messages": [{"role": "user", "content": "Explain frontier model routing."}],
    "stream": true
  }'</code></pre>
            </div>
          </section>

          <!-- 5. CALLOUTS -->
          <section id="callouts" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">5. Callout Alerts</h2>
            <div class="ax-callout ax-callout-note">
              <div class="ax-callout-title">NOTE: Architecture Invariant</div>
              <div class="ax-callout-body">Zero data retention is enforced at the hypervisor level via encrypted ephemeral RAM rings.</div>
            </div>
            <div class="ax-callout ax-callout-tip">
              <div class="ax-callout-title">TIP: Streaming Performance</div>
              <div class="ax-callout-body">Enabling Server-Sent Events (SSE) reduces median time-to-first-token by 38ms.</div>
            </div>
            <div class="ax-callout ax-callout-warning">
              <div class="ax-callout-title">WARNING: Token Rate Limits</div>
              <div class="ax-callout-body">Free-tier keys are limited to 10,000 tokens per minute across frontier models.</div>
            </div>
            <div class="ax-callout ax-callout-caution">
              <div class="ax-callout-title">CAUTION: Hardware Attestation Expiry</div>
              <div class="ax-callout-body">Confidential enclave cryptographic certificates rotate automatically every 24 hours.</div>
            </div>
          </section>
        </div>

        <!-- ================================================================ -->
        <!-- ORGANISMS -->
        <!-- ================================================================ -->
        <div style="border-top: 1px solid var(--ax-border); padding-top: 32px; margin-top: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="ax-badge ax-badge-warning">ORGANISMS</span>
            <span style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3);">COMPLETE FUNCTIONAL SECTIONS</span>
          </div>

          <!-- 1. TOPBAR PREVIEW -->
          <section id="topbar-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">1. Global Topbar Navigation</h2>
            <div style="border: 1px solid var(--ax-border); border-radius: var(--radius-xl); overflow: hidden;">
              ${renderHeader('styleguide', false)}
            </div>
          </section>

          <!-- 2. HERO PREVIEW -->
          <section id="hero-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">2. Hero Section</h2>
            <div style="background: var(--ax-surface-1); border: 1px solid var(--ax-border); border-radius: var(--radius-xl); padding: 48px 24px; text-align: center;">
              <span class="ax-badge ax-badge-accent" style="margin-bottom: 16px;">Frontier Inference Mesh v2.4</span>
              <h2 style="font-family: var(--font-heading); font-size: 48px; font-weight: 700; line-height: 1.1; margin: 12px 0;">
                High-Trust Platform for <span style="color: var(--ax-accent);">Frontier Inference</span>
              </h2>
              <p style="font-size: 16px; color: var(--ax-text-2); max-width: 600px; margin: 0 auto 24px;">
                Unified developer API with zero data retention, automated latency-based multi-cloud routing, and hardware-attested enclaves.
              </p>
              <div style="display: flex; justify-content: center; gap: 12px;">
                <button class="ax-btn ax-btn-primary">Start Building Free</button>
                <button class="ax-btn ax-btn-secondary">Explore Documentation</button>
              </div>
            </div>
          </section>

          <!-- 3. TERMINAL RUNNER -->
          <section id="terminal-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">3. Interactive Terminal / CLI Runner</h2>
            <div class="ax-terminal">
              <div class="ax-term-header">
                <div class="ax-term-dots">
                  <div class="ax-term-dot"></div>
                  <div class="ax-term-dot"></div>
                  <div class="ax-term-dot"></div>
                </div>
                <div class="ax-term-title">aetheris-cli — runner</div>
                <span class="ax-badge" style="font-size: 10px;">ANSI TUI</span>
              </div>
              <div class="ax-term-body">
                <div class="ax-term-line" style="color: var(--ax-success);">● Connected to git.games-reborn.com (SSH / TEA v0.16.0)</div>
                <div class="ax-term-line" style="color: var(--ax-text-3);">Type "help", "models", or "status" to interact:</div>
                <div class="ax-term-prompt">
                  <span class="ax-term-ps1">aetheris&gt;</span>
                  <input type="text" class="ax-term-input" placeholder="type a command..." />
                  <span class="ax-term-cursor"></span>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. FEATURES GRID -->
          <section id="features-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">4. Features Grid</h2>
            <div class="ax-features-grid">
              <div class="ax-feat-card">
                <div class="ax-feat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div class="ax-feat-title">Sub-100ms Routing</div>
                <div class="ax-feat-desc">Automatic regional cluster dispatch delivers median time-to-first-token in under 94ms globally.</div>
              </div>
              <div class="ax-feat-card">
                <div class="ax-feat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div class="ax-feat-title">Zero Data Retention</div>
                <div class="ax-feat-desc">No prompt tokens or completions are ever saved to non-volatile disk. All computation runs in encrypted RAM.</div>
              </div>
              <div class="ax-feat-card">
                <div class="ax-feat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <div class="ax-feat-title">Multi-Cloud Mesh</div>
                <div class="ax-feat-desc">Direct interconnects across AWS, GCP, Azure, and dedicated GPU bare-metal providers worldwide.</div>
              </div>
            </div>
          </section>

          <!-- 5. MODEL MATRIX TABLE -->
          <section id="matrix-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">5. AI Model Matrix Comparison Table</h2>
            <div class="ax-matrix-wrapper">
              <table class="ax-matrix-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Provider</th>
                    <th>Context</th>
                    <th>Speed</th>
                    <th>MMLU Benchmark</th>
                    <th>Cluster Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${modelsCatalog.map(m => `
                    <tr>
                      <td style="font-weight: 600;"><span class="ax-status-dot active" style="margin-right: 6px;"></span>${m.name}</td>
                      <td><span class="ax-badge">${m.provider}</span></td>
                      <td style="font-family: var(--font-mono);">${m.context}</td>
                      <td style="font-family: var(--font-numerals); color: var(--ax-accent); font-weight: 700;">${m.speed}</td>
                      <td style="font-family: var(--font-numerals);">${m.score}</td>
                      <td><span class="ax-badge ax-badge-success">${m.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>

          <!-- 6. PRICING CARDS -->
          <section id="pricing-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">6. Pricing Plan Cards</h2>
            <div class="ax-pricing-grid">
              <div class="ax-pricing-card">
                <div class="ax-pricing-title">Developer</div>
                <div class="ax-pricing-price">$0 <span style="font-size: 16px; color: var(--ax-text-3);">/mo</span></div>
                <p style="font-size: 14px; color: var(--ax-text-2);">Ideal for testing and local prototypes.</p>
                <ul class="ax-pricing-features">
                  <li>✓ 10,000 tokens / min</li>
                  <li>✓ Access to Claude 3.5 & GPT-4o</li>
                  <li>✓ Shared community clusters</li>
                  <li>✓ Community Discord support</li>
                </ul>
                <button class="ax-btn ax-btn-secondary" style="margin-top: auto;">Get Started Free</button>
              </div>

              <div class="ax-pricing-card featured">
                <div style="position: absolute; top: -12px; right: 24px;">
                  <span class="ax-badge ax-badge-accent" style="background: var(--ax-accent); color: #FFF; font-weight: 700;">POPULAR</span>
                </div>
                <div class="ax-pricing-title">Scale Pro</div>
                <div class="ax-pricing-price">$49 <span style="font-size: 16px; color: var(--ax-text-3);">/mo</span></div>
                <p style="font-size: 14px; color: var(--ax-text-2);">For high-throughput production services.</p>
                <ul class="ax-pricing-features">
                  <li>✓ 1,000,000 tokens / min</li>
                  <li>✓ Dedicated low-latency routing mesh</li>
                  <li>✓ Zero data retention guarantee</li>
                  <li>✓ 99.95% Uptime SLA</li>
                  <li>✓ 24/7 Priority engineering support</li>
                </ul>
                <button class="ax-btn ax-btn-primary" style="margin-top: auto;">Upgrade to Scale Pro</button>
              </div>

              <div class="ax-pricing-card">
                <div class="ax-pricing-title">Enterprise</div>
                <div class="ax-pricing-price">Custom</div>
                <p style="font-size: 14px; color: var(--ax-text-2);">Tailored confidential GPU compute rings.</p>
                <ul class="ax-pricing-features">
                  <li>✓ Unlimited throughput & concurrency</li>
                  <li>✓ Isolated NVIDIA H100 GPU clusters</li>
                  <li>✓ Custom BAA, SOC2 & HIPAA audits</li>
                  <li>✓ 99.99% Uptime SLA with financial credit</li>
                  <li>✓ Dedicated account architect</li>
                </ul>
                <button class="ax-btn ax-btn-outline" style="margin-top: auto;">Contact Sales</button>
              </div>
            </div>
          </section>

          <!-- 7. GLOBAL FOOTER PREVIEW -->
          <section id="footer-org" style="margin-bottom: 48px; scroll-margin-top: 80px;">
            <h2 class="ax-heading ax-h2">7. Global Footer</h2>
            <div style="border: 1px solid var(--ax-border); border-radius: var(--radius-xl); overflow: hidden;">
              ${renderFooter(false)}
            </div>
          </section>
        </div>

        <!-- ================================================================ -->
        <!-- TEMPLATES -->
        <!-- ================================================================ -->
        <div style="border-top: 1px solid var(--ax-border); padding-top: 32px; margin-top: 40px; margin-bottom: 64px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="ax-badge ax-badge-danger">TEMPLATES</span>
            <span style="font-size: 12px; font-family: var(--font-mono); color: var(--ax-text-3);">FULL PAGE LAYOUT DEMOS</span>
          </div>

          <div class="ax-mega-grid">
            <div id="templates-landing" class="ax-mega-item">
              <span class="ax-badge ax-badge-accent" style="align-self: flex-start;">LANDING DEMO</span>
              <div class="ax-mega-title">Homepage Portal Template</div>
              <div class="ax-mega-desc">
                High-conversion tech hero, embedded interactive CLI demo, metric counters, feature grids, and model benchmarks.
              </div>
              <div style="margin-top: 16px;">
                <a href="devices.html?dummy=portal" class="ax-btn ax-btn-secondary ax-btn-sm">Launch in Device Simulator →</a>
              </div>
            </div>

            <div id="templates-docs" class="ax-mega-item">
              <span class="ax-badge ax-badge-success" style="align-self: flex-start;">DOCS DEMO</span>
              <div class="ax-mega-title">Docs Reader Portal Template</div>
              <div class="ax-mega-desc">
                Two-column technical documentation browser with sticky category navigation, code copy buttons, callouts, and reading telemetry.
              </div>
              <div style="margin-top: 16px;">
                <a href="devices.html?dummy=docs" class="ax-btn ax-btn-secondary ax-btn-sm">Launch in Device Simulator →</a>
              </div>
            </div>

            <div id="templates-studio" class="ax-mega-item">
              <span class="ax-badge ax-badge-warning" style="align-self: flex-start;">CLI DEMO</span>
              <div class="ax-mega-title">Studio TUI Dashboard Template</div>
              <div class="ax-mega-desc">
                React + Ink terminal dashboard with ANSI color formatting, live chat testing, and node telemetry queries.
              </div>
              <div style="margin-top: 16px;">
                <a href="devices.html?dummy=cli" class="ax-btn ax-btn-secondary ax-btn-sm">Launch in Device Simulator →</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  const html = wrapHtml({
    title: 'Living Style Guide & Component Catalog',
    description: 'Living design system catalog: atoms, molecules, organisms, interactive specimen playground, and templates.',
    activeNav: 'styleguide',
    body,
    isSubdir: false
  });

  fs.writeFileSync(path.join(DIST_DIR, 'styleguide.html'), html, 'utf8');
  console.log('   ✓ Generated dist/styleguide.html');
}

// --------------------------------------------------------------------------
// 3. PAGE: dist/animations.html (Animation Showroom & Motion Lab)
// --------------------------------------------------------------------------
function generateAnimationsPage() {
  console.log('🔨 Generating dist/animations.html...');

  function getDemoInnerHtml(kf) {
    switch (kf.demoType) {
      case 'badge':
        return `<span class="ax-badge ax-badge-accent" style="padding: 8px 18px; font-size: 14px;"><span class="ax-status-dot active" style="margin-right: 8px;"></span> Ambient Pulse Node</span>`;
      case 'card':
        return `<div style="background: var(--ax-surface-2); border: 1px solid var(--ax-border-strong); padding: 18px 26px; border-radius: var(--radius-lg); text-align: center;"><div style="font-weight: 700; color: var(--ax-text-1);">Deceleration Card</div><div style="font-size: 12px; color: var(--ax-text-3); margin-top: 4px;">cubic-bezier(0.22, 1, 0.36, 1)</div></div>`;
      case 'grid':
        return `<div style="display: grid; grid-template-columns: repeat(3, 34px); gap: 8px;"><div style="width: 34px; height: 34px; background: var(--ax-accent); border-radius: 4px;"></div><div style="width: 34px; height: 34px; background: var(--ax-surface-3); border-radius: 4px;"></div><div style="width: 34px; height: 34px; background: var(--ax-info); border-radius: 4px;"></div></div>`;
      case 'cursor':
        return `<div style="display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 18px; color: var(--ax-accent);"><span style="color: var(--ax-text-2);">aetheris&gt;</span> <span>run-mesh</span><span style="display: inline-block; width: 10px; height: 20px; background: var(--ax-accent);"></span></div>`;
      case 'modal':
        return `<div style="background: var(--ax-surface-2); border: 1px solid var(--ax-accent); box-shadow: 0 0 24px var(--ax-accent-glow); padding: 16px 24px; border-radius: var(--radius-lg); width: 220px; text-align: center;"><div style="font-weight: 700; font-size: 13px;">Cmd+K Quick Palette</div></div>`;
      case 'drawer':
        return `<div style="background: var(--ax-surface-3); border-left: 3px solid var(--ax-accent); padding: 14px 24px; border-radius: 4px; font-size: 13px; color: var(--ax-text-1);">Sidebar Panel Slide</div>`;
      case 'dot':
        return `<div style="width: 28px; height: 28px; border-radius: 50%; background: var(--ax-accent); position: relative;"></div>`;
      case 'fade':
        return `<div style="padding: 16px 26px; background: linear-gradient(135deg, var(--ax-accent-subtle), var(--ax-surface-2)); border: 1px solid var(--ax-border); border-radius: var(--radius-lg); font-weight: 600; color: var(--ax-text-1);">Crossfade Element</div>`;
      case 'svg':
        return `<svg width="200" height="40" viewBox="0 0 200 40"><path d="M 10 20 L 70 20 L 90 35 L 140 35 L 150 20 L 190 20" fill="none" stroke="var(--ax-accent)" stroke-width="3" stroke-dasharray="10 5" /></svg>`;
      case 'pop':
        return `<div style="background: var(--ax-surface-3); border: 1px solid var(--ax-border-strong); padding: 10px 16px; border-radius: var(--radius-md); font-size: 13px; color: var(--ax-text-1); box-shadow: var(--shadow-md);">Tooltip Popover</div>`;
      default:
        return `<div style="width: 50px; height: 50px; background: var(--ax-accent); border-radius: 8px;"></div>`;
    }
  }

  const keyframeCardsHtml = keyframesList.map(kf => `
    <div class="ax-anim-card" id="${kf.name}">
      <div class="ax-anim-stage">
        <div class="ax-anim-target" style="animation: ${kf.name} ${kf.duration} ${kf.easing} ${kf.iteration}; --base-duration: ${kf.duration};">
          ${getDemoInnerHtml(kf)}
        </div>
      </div>
      <div class="ax-anim-controls">
        <div class="ax-anim-meta">
          <div>
            <div style="font-weight: 700; font-size: 16px; color: var(--ax-text-1);">${escapeHtml(kf.label)}</div>
            <span class="ax-badge" style="font-size: 11px; margin-top: 4px;">${escapeHtml(kf.category)}</span>
          </div>
          <button class="ax-btn ax-btn-secondary ax-btn-sm ax-replay-anim-btn" title="Replay Animation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg> Replay
          </button>
        </div>
        <p style="font-size: 13px; color: var(--ax-text-2); line-height: 1.5; margin-bottom: 12px;">
          ${escapeHtml(kf.description)}
        </p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          <span class="ax-badge" style="font-family: var(--font-mono); font-size: 11px;">⏱ ${kf.duration}</span>
          <span class="ax-badge" style="font-family: var(--font-mono); font-size: 11px;">📈 ${kf.easing}</span>
          <span class="ax-badge" style="font-family: var(--font-mono); font-size: 11px;">🔄 ${kf.iteration}</span>
        </div>
        <div class="ax-code-block" style="margin: 0;">
          <div class="ax-code-header">
            <span class="ax-code-lang">CSS KEYFRAME</span>
            <button class="ax-copy-btn" onclick="copyCode(this)" style="font-size: 10px; padding: 2px 6px;">Copy</button>
          </div>
          <pre style="font-size: 11px; padding: 10px;"><code>${escapeHtml(kf.css)}</code></pre>
        </div>
      </div>
    </div>
  `).join('');

  const body = `
    <main class="ax-container" style="padding-top: 40px; padding-bottom: 64px;">
      <!-- Showroom Header -->
      <div style="text-align: center; max-width: 800px; margin: 0 auto 36px;">
        <span class="ax-badge ax-badge-accent" style="margin-bottom: 12px;">Motion Engineering</span>
        <h1 class="ax-heading ax-h1" style="margin-bottom: 12px;">Animation Showroom & Motion Lab</h1>
        <p class="ax-p" style="font-size: 16px;">
          Extracted keyframe transitions, spring curves, and ambient effects from Aetheris. Adjust global playback speed, test easing curves, or preview reduced motion overrides.
        </p>
      </div>

      <!-- Interactive Controls Toolbar -->
      <div style="background: var(--ax-surface-1); border: 1px solid var(--ax-border); border-radius: var(--radius-xl); padding: 16px 24px; margin-bottom: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 13px; font-weight: 600; color: var(--ax-text-2);">Playback Speed:</span>
            <input type="range" id="ax-anim-speed" min="0.25" max="3" step="0.25" value="1" style="width: 120px;" />
            <span id="ax-speed-val" class="ax-badge ax-badge-accent" style="font-family: var(--font-mono); font-size: 12px;">1x</span>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 13px; font-weight: 600; color: var(--ax-text-2);">Timing Function:</span>
            <select id="ax-anim-easing" class="ax-input" style="padding: 4px 10px; font-size: 12px; width: auto;">
              <option value="cubic-bezier(0.22, 1, 0.36, 1)">cubic-bezier(0.22, 1, 0.36, 1) [Default Spring]</option>
              <option value="ease-in-out">ease-in-out</option>
              <option value="ease">ease</option>
              <option value="linear">linear</option>
              <option value="step-end">step-end [Terminal]</option>
            </select>
          </div>
        </div>

        <label class="ax-toggle-wrap">
          <input type="checkbox" id="ax-reduced-motion" style="display:none;" />
          <div class="ax-toggle"></div>
          <span style="font-size: 13px; font-weight: 600; color: var(--ax-text-1);">Prefers-Reduced-Motion</span>
        </label>
      </div>

      <!-- 10 Extracted Keyframes Grid -->
      <div style="margin-bottom: 48px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Extracted Aetheris Keyframes</h2>
          <span class="ax-badge ax-badge-success">10 Animations</span>
        </div>
        <div class="ax-anim-grid">
          ${keyframeCardsHtml}
        </div>
      </div>

      <!-- Showroom Effects Section -->
      <div id="effects" style="border-top: 1px solid var(--ax-border); padding-top: 40px; margin-bottom: 48px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div>
            <h2 class="ax-heading ax-h2" style="margin: 0; border: none;">Ambient Showroom Effects</h2>
            <p class="ax-p" style="margin: 4px 0 0;">Specialized atmospheric shaders and loading telemetry shaders</p>
          </div>
          <span class="ax-badge ax-badge-accent">3 Visual Shaders</span>
        </div>

        <div class="ax-anim-grid">
          <!-- Effect 1: Shimmer Border -->
          <div class="ax-anim-card">
            <div class="ax-anim-stage" style="padding: 24px;">
              <div style="background: linear-gradient(60deg, #FF6901, #0EA5E9, #10B981, #FF6901); background-size: 300% 300%; animation: shimmerBorder 4s ease infinite; padding: 2px; border-radius: 12px; width: 100%; max-width: 240px;">
                <div style="background: #0B0D0E; border-radius: 10px; padding: 18px 24px; text-align: center;">
                  <div style="font-weight: 700; color: #FFF; font-size: 14px;">Shimmer Border</div>
                  <div style="font-size: 11px; color: var(--ax-text-3); margin-top: 4px;">Dynamic linear gradient</div>
                </div>
              </div>
            </div>
            <div class="ax-anim-controls">
              <div class="ax-anim-meta">
                <div style="font-weight: 700; font-size: 16px; color: var(--ax-text-1);">Glowing Border Shimmer</div>
                <span class="ax-badge">Atmospheric</span>
              </div>
              <p style="font-size: 13px; color: var(--ax-text-2); margin-bottom: 12px;">
                Multi-color moving gradient border used on featured tier pricing and VIP model selector badges.
              </p>
              <div class="ax-code-block" style="margin: 0;">
                <pre style="font-size: 11px; padding: 10px;"><code>@keyframes shimmerBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- Effect 2: Matrix Scanline -->
          <div class="ax-anim-card">
            <div class="ax-anim-stage" style="background: #000; position: relative;">
              <div style="color: #10B981; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; padding: 16px;">
                01001000 01001001 01000111 01001000<br/>
                INF_ROUTER_ACTIVE: OK<br/>
                ZERO_RETENTION_VERIFIED<br/>
                LATENCY_CHECK: 94ms
              </div>
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 12px; background: linear-gradient(to bottom, rgba(16,185,129,0), rgba(16,185,129,0.7), rgba(16,185,129,0)); animation: matrixScanline 2.5s linear infinite; pointer-events: none;"></div>
            </div>
            <div class="ax-anim-controls">
              <div class="ax-anim-meta">
                <div style="font-weight: 700; font-size: 16px; color: var(--ax-text-1);">Terminal Scanline Sweep</div>
                <span class="ax-badge">Retro CRT</span>
              </div>
              <p style="font-size: 13px; color: var(--ax-text-2); margin-bottom: 12px;">
                CRT phosphor beam sweep running across active code blocks and cluster telemetry views.
              </p>
              <div class="ax-code-block" style="margin: 0;">
                <pre style="font-size: 11px; padding: 10px;"><code>@keyframes matrixScanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- Effect 3: Skeleton Loading -->
          <div class="ax-anim-card">
            <div class="ax-anim-stage" style="padding: 24px;">
              <div style="width: 100%; max-width: 240px; display: flex; flex-direction: column; gap: 10px;">
                <div style="height: 18px; border-radius: 4px; background: linear-gradient(90deg, #1A1E21 25%, #2B3238 50%, #1A1E21 75%); background-size: 200% 100%; animation: skeletonLoading 1.8s infinite;"></div>
                <div style="height: 14px; width: 80%; border-radius: 4px; background: linear-gradient(90deg, #1A1E21 25%, #2B3238 50%, #1A1E21 75%); background-size: 200% 100%; animation: skeletonLoading 1.8s infinite;"></div>
                <div style="height: 14px; width: 60%; border-radius: 4px; background: linear-gradient(90deg, #1A1E21 25%, #2B3238 50%, #1A1E21 75%); background-size: 200% 100%; animation: skeletonLoading 1.8s infinite;"></div>
              </div>
            </div>
            <div class="ax-anim-controls">
              <div class="ax-anim-meta">
                <div style="font-weight: 700; font-size: 16px; color: var(--ax-text-1);">Skeleton Content Shimmer</div>
                <span class="ax-badge">Async Loading</span>
              </div>
              <p style="font-size: 13px; color: var(--ax-text-2); margin-bottom: 12px;">
                Fluid loading wave placeholder shimmer used while model throughput metrics are streaming.
              </p>
              <div class="ax-code-block" style="margin: 0;">
                <pre style="font-size: 11px; padding: 10px;"><code>@keyframes skeletonLoading {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;

  const html = wrapHtml({
    title: 'Animation Showroom & Motion Lab',
    description: 'Interactive motion lab testing 10 extracted Aetheris keyframes, speed controls, easing curves, and shaders.',
    activeNav: 'animations',
    body,
    isSubdir: false
  });

  fs.writeFileSync(path.join(DIST_DIR, 'animations.html'), html, 'utf8');
  console.log('   ✓ Generated dist/animations.html');
}

// --------------------------------------------------------------------------
// 4. PAGE: dist/devices.html (Cross-Platform Device Simulator & Click Dummies)
// --------------------------------------------------------------------------
function generateDevicesPage() {
  console.log('🔨 Generating dist/devices.html...');

  const deviceButtonsHtml = devices.map((d, idx) => `
    <button class="ax-device-btn ${idx === 0 ? 'active' : ''}" 
      data-w="${d.width}" 
      data-h="${d.height}" 
      data-scale="${d.scale}" 
      data-bezel="${d.bezel}" 
      data-name="${escapeHtml(d.name)}">
      ${escapeHtml(d.name)}
    </button>
  `).join('');

  const body = `
    <div class="ax-device-app">
      <!-- Device Simulator Sticky Toolbar -->
      <div class="ax-device-toolbar">
        <!-- Device Preset Switcher -->
        <div class="ax-device-selector-group">
          ${deviceButtonsHtml}
        </div>

        <!-- Viewport Controls -->
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <button id="ax-orient-btn" class="ax-btn ax-btn-secondary ax-btn-sm" title="Toggle Portrait / Landscape">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <path d="M12 18h.01"></path>
            </svg> Rotate
          </button>

          <button id="ax-bezel-toggle-btn" class="ax-btn ax-btn-secondary ax-btn-sm" title="Toggle Hardware Bezel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
              <rect x="7" y="7" width="10" height="10" rx="2" ry="2"></rect>
            </svg> Bezel
          </button>

          <span id="ax-device-dimensions" class="ax-badge" style="font-family: var(--font-mono); font-size: 11px;">
            393 × 852 px (0.46)
          </span>

          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; color: var(--ax-text-3);">Zoom:</span>
            <input type="range" id="ax-device-zoom" min="0.25" max="1.5" step="0.05" value="0.85" style="width: 80px;" />
            <span id="ax-zoom-val" style="font-family: var(--font-mono); font-size: 11px; width: 36px; color: var(--ax-text-2);">85%</span>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; color: var(--ax-text-3);">Click Dummy:</span>
            <select id="ax-dummy-select" class="ax-input" style="padding: 4px 10px; font-size: 12px; width: auto;">
              <option value="portal">Main Portal (Homepage)</option>
              <option value="docs">Documentation Portal</option>
              <option value="cli">Aetheris CLI TUI</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Stage Viewport -->
      <div id="ax-device-stage" class="ax-device-stage-viewport">
        <div id="ax-device-bezel" class="ax-device-bezel phone" style="width: 393px; height: 852px; transform: scale(0.85);">
          <!-- Dynamic Island / Top notch -->
          <div id="ax-device-notch" class="ax-device-notch">
            <span style="width: 8px; height: 8px; background: #111; border-radius: 50%;"></span>
            <span style="width: 12px; height: 12px; background: #0a0a0a; border-radius: 50%; border: 1px solid #222;"></span>
          </div>

          <!-- Screen Frame -->
          <div id="ax-device-frame" style="height: 100%; width: 100%; overflow: hidden;">
            <div id="ax-device-screen" class="ax-device-screen">
              <!-- Populated dynamically by app.js setupDeviceSimulator() -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const html = wrapHtml({
    title: 'Cross-Platform Device Simulator & Click Dummies',
    description: 'Hardware bezel simulator testing mobile, tablet, laptop, and ANSI terminal viewports with 3 interactive click dummies.',
    activeNav: 'devices',
    body,
    isSubdir: false
  });

  fs.writeFileSync(path.join(DIST_DIR, 'devices.html'), html, 'utf8');
  console.log('   ✓ Generated dist/devices.html');
}

// --------------------------------------------------------------------------
// 5. PAGES: dist/docs/*.html (All Documentation & Reference Pages)
// --------------------------------------------------------------------------
function generateDocsPages(docsDefinitions) {
  console.log(`🔨 Generating ${docsDefinitions.length} documentation pages...`);

  // Build sidebar HTML for docs
  function renderDocsSidebar(currentFilename) {
    const categories = [
      { name: 'EXTRACTION REPORTS & AUDITS', filter: d => d.category === 'reports' },
      { name: 'DESIGN SPECIFICATIONS', filter: d => d.category === 'specs' },
      { name: 'SYSTEM & ARCHITECTURE', filter: d => d.category === 'system' }
    ];

    let html = '<aside class="ax-sidebar">';
    categories.forEach(cat => {
      const items = docsDefinitions.filter(cat.filter);
      if (items.length) {
        html += `<div class="ax-sidebar-group">`;
        html += `<div class="ax-sidebar-title">${cat.name}</div>`;
        items.forEach(doc => {
          const isActive = doc.filename === currentFilename;
          html += `
            <a href="${doc.filename}" class="ax-sidebar-item ${isActive ? 'active' : ''}">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(doc.title)}</span>
              ${doc.badge ? `<span class="ax-badge" style="font-size: 10px;">${doc.badge}</span>` : ''}
            </a>
          `;
        });
        html += `</div>`;
      }
    });
    html += '</aside>';
    return html;
  }

  docsDefinitions.forEach((doc, idx) => {
    let rawMd = '';
    try {
      rawMd = fs.readFileSync(doc.sourcePath, 'utf8');
    } catch (err) {
      console.error(`   ✗ Failed to read ${doc.sourcePath}: ${err.message}`);
      return;
    }

    // Word count & reading stats
    const words = rawMd.split(/\s+/).filter(Boolean).length;
    const readMinutes = Math.max(1, Math.ceil(words / 200));

    // Parse Markdown to HTML
    const { contentHtml: parsedHtml, toc } = parseMarkdown(rawMd);

    // Docs pages are served from dist/docs/ while skill media lives under
    // dist/assets/: rewrite screens/ + screenshots/ refs (with or without ../)
    // to the asset location, and map repository docs/*.md links to their
    // generated sibling .html pages.
    const contentHtml = parsedHtml
      .replace(/(src|href)="(?:\.\.\/)?((?:screens|screenshots)\/[^"]*)"/g, '$1="../assets/$2"')
      .replace(/href="docs\/([^"/]+)\.md"/g, 'href="$1.html"')
      // Neutralize links that cannot resolve inside this site: repository-only
      // paths (skills/, raw/) and source-site routes (/api, /models, …). Valid
      // targets (sibling .html pages, top-level pages, assets, anchors,
      // external URLs) stay clickable.
      .replace(/<a ([^>]*?)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (m, pre, href, post, inner) => {
        if (/^(https?:|mailto:|#|data:)/.test(href)) return m;
        if (/^[^/]+\.(html|png|jpg|jpeg|gif|svg|css|js|json|woff2|md)([#?][^/]*)?$/.test(href)) return m;
        if (/^\.\.\/(?:index|styleguide|animations|devices)\.html$/.test(href)) return m;
        if (href.startsWith('../assets/')) return m;
        if (/^\/(?:styleguide|animations|devices)\/?$/.test(href)) return m;
        return `<span title="Repository path or source-site route — not part of this site">${inner}</span>`;
      });

    // Prev / Next docs
    const prevDoc = idx > 0 ? docsDefinitions[idx - 1] : null;
    const nextDoc = idx < docsDefinitions.length - 1 ? docsDefinitions[idx + 1] : null;

    // Sticky Table of Contents Aside
    const tocAsideHtml = `
      <aside class="ax-toc-aside">
        <div class="ax-toc-title">ON THIS PAGE</div>
        <ul class="ax-toc-list">
          ${toc.filter(t => t.level <= 3).map(t => `
            <li class="ax-toc-item ax-toc-l${t.level}">
              <a href="#${t.id}">${escapeHtml(t.title)}</a>
            </li>
          `).join('')}
        </ul>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--ax-border-subdued);">
          <a href="#" style="font-size: 12px; color: var(--ax-text-3); display: flex; align-items: center; gap: 4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg> Back to top
          </a>
        </div>
      </aside>
    `;

    const body = `
      <div class="ax-main-wrap">
        ${renderDocsSidebar(doc.filename)}

        <main class="ax-content">
          <!-- Breadcrumb -->
          <nav class="ax-breadcrumb">
            <a href="../index.html">Overview</a>
            <span class="ax-breadcrumb-sep">/</span>
            <a href="AETHERIS_DESIGN_REPORT.html">Docs</a>
            <span class="ax-breadcrumb-sep">/</span>
            <span style="color: var(--ax-accent);">${escapeHtml(doc.title)}</span>
          </nav>

          <!-- Reading Stats Bar -->
          <div class="ax-doc-stats">
            <span class="ax-doc-stat-pill">📖 ${readMinutes} min read</span>
            <span class="ax-doc-stat-pill">📝 ${words.toLocaleString()} words</span>
            <span class="ax-doc-stat-pill">🔖 ${toc.length} sections</span>
            <span class="ax-doc-stat-pill" style="color: var(--ax-success); border-color: rgba(16,185,129,0.3);">✓ Verified Audit</span>
            <span class="ax-doc-stat-pill">📅 September 2026</span>
          </div>

          <!-- Main Rendered Content -->
          <article class="ax-doc-body">
            ${contentHtml}
          </article>

          <!-- Prev / Next Pagination -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--ax-border-subdued); flex-wrap: wrap; gap: 16px;">
            ${prevDoc ? `
              <a href="${prevDoc.filename}" class="ax-btn ax-btn-secondary ax-btn-sm" style="gap: 6px;">
                ← ${escapeHtml(prevDoc.title)}
              </a>
            ` : '<div></div>'}
            ${nextDoc ? `
              <a href="${nextDoc.filename}" class="ax-btn ax-btn-secondary ax-btn-sm" style="gap: 6px;">
                ${escapeHtml(nextDoc.title)} →
              </a>
            ` : '<div></div>'}
          </div>
        </main>

        ${toc.length > 0 ? tocAsideHtml : ''}
      </div>
    `;

    const html = wrapHtml({
      title: doc.title,
      description: doc.description,
      activeNav: 'docs',
      body,
      isSubdir: true
    });

    fs.writeFileSync(path.join(DIST_DOCS_DIR, doc.filename), html, 'utf8');
  });

  console.log(`   ✓ Rendered all ${docsDefinitions.length} documentation pages into dist/docs/`);
}

// --------------------------------------------------------------------------
// MAIN EXECUTION PIPELINE
// --------------------------------------------------------------------------
function main() {
  console.log('🚀 Starting Aetheris Design System Site Generation...');

  // 1. Copy screens and screenshots
  copyStaticAssets();

  // 2. Build complete list of documentation files
  const docsDefinitions = [
    // Reports in docs/
    {
      sourcePath: path.join(DOCS_DIR, 'AETHERIS_DESIGN_REPORT.md'),
      filename: 'AETHERIS_DESIGN_REPORT.html',
      title: 'Aetheris Design & Functionality Report',
      description: 'Comprehensive architectural breakdown and design system audit.',
      category: 'reports',
      badge: 'Core Report',
      badgeClass: 'ax-badge-accent',
      readTime: '12 min'
    },
    {
      sourcePath: path.join(DOCS_DIR, 'PERFORMANCE_ACCESSIBILITY_REPORT.md'),
      filename: 'PERFORMANCE_ACCESSIBILITY_REPORT.html',
      title: 'Performance & Accessibility Audit',
      description: 'Lighthouse 98/100, FCP 0.5s, WCAG AA compliance benchmarks.',
      category: 'reports',
      badge: 'Audit 98/100',
      badgeClass: 'ax-badge-success',
      readTime: '6 min'
    },
    {
      sourcePath: path.join(DOCS_DIR, 'COMPLETE_EXTRACTION_SUMMARY.md'),
      filename: 'COMPLETE_EXTRACTION_SUMMARY.html',
      title: 'Complete Extraction Summary',
      description: 'Full inventory of extracted tokens, typography, and assets.',
      category: 'reports',
      badge: 'Summary',
      badgeClass: 'ax-badge',
      readTime: '7 min'
    },
    {
      sourcePath: path.join(DOCS_DIR, 'ULTIMATE_EXTRACTION_SUMMARY.md'),
      filename: 'ULTIMATE_EXTRACTION_SUMMARY.html',
      title: 'Ultimate Extraction Summary',
      description: 'High-density token extraction and verification matrix.',
      category: 'reports',
      badge: 'Tokens',
      badgeClass: 'ax-badge-accent',
      readTime: '9 min'
    },
    {
      sourcePath: path.join(DOCS_DIR, 'FINAL_COMPREHENSIVE_ANALYSIS.md'),
      filename: 'FINAL_COMPREHENSIVE_ANALYSIS.html',
      title: 'Final Comprehensive Analysis',
      description: 'Deep multi-page analysis and runtime behavior verification.',
      category: 'reports',
      badge: 'Analysis',
      badgeClass: 'ax-badge',
      readTime: '10 min'
    },
    {
      sourcePath: path.join(DOCS_DIR, 'AETHERIS_EXTENDED_ANALYSIS.md'),
      filename: 'AETHERIS_EXTENDED_ANALYSIS.html',
      title: 'Extended Analysis & Architecture',
      description: 'In-depth investigation of inference mesh and encryption.',
      category: 'reports',
      badge: 'Mesh',
      badgeClass: 'ax-badge',
      readTime: '8 min'
    },
    {
      sourcePath: path.join(DOCS_DIR, 'ADDITIONAL_TOOLS_GUIDE.md'),
      filename: 'ADDITIONAL_TOOLS_GUIDE.html',
      title: 'Additional Tools & Helper Scripts',
      description: 'Tooling recommendations, scripts, and extraction helpers.',
      category: 'reports',
      badge: 'Tools',
      badgeClass: 'ax-badge-warning',
      readTime: '5 min'
    },

    // Specs in skills/aetheris-design-ultra/references/
    {
      sourcePath: path.join(SKILLS_DIR, 'references', 'VISUAL_GUIDE.md'),
      filename: 'REF_VISUAL_GUIDE.html',
      title: 'Visual Guide Specification',
      description: 'Aesthetic rules, colors, surfaces, and contrast guidelines.',
      category: 'specs',
      badge: 'Spec',
      badgeClass: 'ax-badge-accent',
      readTime: '6 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'references', 'LAYOUT.md'),
      filename: 'REF_LAYOUT.html',
      title: 'Layout & 4px Spacing Grid',
      description: 'Container widths, breakpoints, and 4px layout multipliers.',
      category: 'specs',
      badge: 'Spec',
      badgeClass: 'ax-badge',
      readTime: '5 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'references', 'COMPONENTS.md'),
      filename: 'REF_COMPONENTS.html',
      title: 'Components Reference Specification',
      description: 'Atoms, molecules, organisms, buttons, and input states.',
      category: 'specs',
      badge: 'Spec',
      badgeClass: 'ax-badge',
      readTime: '7 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'references', 'ANIMATIONS.md'),
      filename: 'REF_ANIMATIONS.html',
      title: 'Motion & Keyframes Specification',
      description: '10 keyframe curves, durations, and physics transitions.',
      category: 'specs',
      badge: 'Spec',
      badgeClass: 'ax-badge-success',
      readTime: '5 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'references', 'INTERACTIONS.md'),
      filename: 'REF_INTERACTIONS.html',
      title: 'Interactions & Gestures Specification',
      description: 'Hover halos, terminal cursor, modal triggers, and events.',
      category: 'specs',
      badge: 'Spec',
      badgeClass: 'ax-badge',
      readTime: '6 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'references', 'DESIGN.md'),
      filename: 'REF_DESIGN.html',
      title: 'Design Guidelines & Rules',
      description: 'Core design principles, typography, and contrast rules.',
      category: 'specs',
      badge: 'Spec',
      badgeClass: 'ax-badge',
      readTime: '6 min'
    },

    // System & Setup
    {
      sourcePath: path.join(ROOT_DIR, 'README.md'),
      filename: 'README.html',
      title: 'Repository Overview & Quickstart',
      description: 'Project architecture, extraction process, and dev commands.',
      category: 'system',
      badge: 'README',
      badgeClass: 'ax-badge',
      readTime: '4 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'SKILL.md'),
      filename: 'SKILL.html',
      title: 'Ultra Skill Definition',
      description: 'Skill configuration, extraction metadata, and agent rules.',
      category: 'system',
      badge: 'Skill',
      badgeClass: 'ax-badge-accent',
      readTime: '4 min'
    },
    {
      sourcePath: path.join(SKILLS_DIR, 'DESIGN.md'),
      filename: 'SYSTEM_DESIGN.html',
      title: 'Ultra Design Framework',
      description: 'Comprehensive design system token specification.',
      category: 'system',
      badge: 'Ultra',
      badgeClass: 'ax-badge-warning',
      readTime: '5 min'
    }
  ];

  // 3. Generate all HTML pages
  generateIndexPage(docsDefinitions);
  generateStyleguidePage();
  generateAnimationsPage();
  generateDevicesPage();
  generateDocsPages(docsDefinitions);

  console.log('✨ All pages successfully generated in dist/!');
}

main();
