/**
 * Living Style Guide Component Catalog Data
 * Atomic Design Structure:
 * - Atoms (Tokens, Primitives, Inputs, Buttons, Badges, Status Dots)
 * - Molecules (Search bar, Metric cards, Mega cards, Model rows, Code tabs)
 * - Organisms (Navbar, Hero, Terminal CLI runner, Features grid, Model matrix, Pricing, Footer)
 * - Templates (Landing page, Docs portal, Studio dashboard)
 */

const colors = [
  { name: 'Core Accent', token: '--ax-accent', hex: '#FF6901', rgb: 'rgb(255, 105, 1)', role: 'Primary brand action color, active states, glowing highlights' },
  { name: 'Accent Hover', token: '--ax-accent-hover', hex: '#E05A00', rgb: 'rgb(224, 90, 0)', role: 'Button hover, link hover' },
  { name: 'Accent Glow', token: '--ax-accent-glow', hex: '#ff690133', rgb: 'rgba(255, 105, 1, 0.2)', role: 'Focus rings, shadow glows, active halos' },
  { name: 'Background Base', token: '--ax-bg', hex: '#0B0D0E', rgb: 'rgb(11, 13, 14)', role: 'Global canvas background' },
  { name: 'Surface Low', token: '--ax-surface-1', hex: '#121517', rgb: 'rgb(18, 21, 23)', role: 'Card background, panel background' },
  { name: 'Surface Mid', token: '--ax-surface-2', hex: '#1A1E21', rgb: 'rgb(26, 30, 33)', role: 'Hovered surface, active tabs, inputs' },
  { name: 'Surface High', token: '--ax-surface-3', hex: '#262B2F', rgb: 'rgb(38, 43, 47)', role: 'Elevated popovers, dropdowns, modals' },
  { name: 'Border Subdued', token: '--ax-border-subdued', hex: '#1F2428', rgb: 'rgb(31, 36, 40)', role: 'Dividers, secondary cards' },
  { name: 'Border Base', token: '--ax-border', hex: '#2E353B', rgb: 'rgb(46, 53, 59)', role: 'Primary card borders, input borders' },
  { name: 'Border Strong', token: '--ax-border-strong', hex: '#444E57', rgb: 'rgb(68, 78, 87)', role: 'Hover borders, active rings' },
  { name: 'Text Primary', token: '--ax-text-1', hex: '#F4F5F6', rgb: 'rgb(244, 245, 246)', role: 'Headings, active body copy, primary labels' },
  { name: 'Text Muted', token: '--ax-text-2', hex: '#8B949E', rgb: 'rgb(139, 148, 158)', role: 'Secondary descriptions, captions, placeholders' },
  { name: 'Text Dim', token: '--ax-text-3', hex: '#586069', rgb: 'rgb(88, 96, 105)', role: 'Metadata, shortcuts, disabled labels' },
  { name: 'Success', token: '--ax-success', hex: '#10B981', rgb: 'rgb(16, 185, 129)', role: 'Operational status, verified tags, 100% metrics' },
  { name: 'Warning', token: '--ax-warning', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', role: 'High load status, alerts, notices' },
  { name: 'Danger', token: '--ax-danger', hex: '#EF4444', rgb: 'rgb(239, 68, 68)', role: 'Error states, destructive actions, outages' },
  { name: 'Info / Sky', token: '--ax-info', hex: '#0EA5E9', rgb: 'rgb(14, 165, 233)', role: 'Feature highlights, links, badges' }
];

const typographyScale = [
  { level: 'Display Hero', family: 'Darker Grotesque', size: '56px', weight: '700', lineHeight: '1.05', sample: 'Frontier AI Inference' },
  { level: 'Heading 1', family: 'Darker Grotesque', size: '40px', weight: '700', lineHeight: '1.1', sample: 'High-trust, Zero-data-retention' },
  { level: 'Heading 2', family: 'Darker Grotesque', size: '32px', weight: '700', lineHeight: '1.15', sample: 'Every Frontier Model on One API' },
  { level: 'Heading 3', family: 'Darker Grotesque', size: '24px', weight: '700', lineHeight: '1.2', sample: 'Architecture & Token Routing' },
  { level: 'Body Large', family: 'Archivo', size: '18px', weight: '500', lineHeight: '1.5', sample: 'Deploy unified model pipelines across multi-cloud clusters.' },
  { level: 'Body Base', family: 'Archivo', size: '15px', weight: '500', lineHeight: '1.5', sample: 'Aetheris automatically routes inference calls to optimal regional clusters.' },
  { level: 'Body Small / Caption', family: 'Archivo', size: '13px', weight: '500', lineHeight: '1.4', sample: 'Latency target: < 120ms to first token' },
  { level: 'Code / Mono Display', family: 'Berkeley Mono Numerals', size: '20px', weight: '700', lineHeight: '1.2', sample: '3,842,910 TOKENS/SEC' },
  { level: 'Code Base', family: 'Berkeley Mono', size: '14px', weight: '400', lineHeight: '1.6', sample: 'curl -X POST https://api.aetheris.dev/v1/chat/completions' }
];

const spacingScale = [
  { name: '0.5x', value: '2px', token: '--ax-space-0-5' },
  { name: '1x (Base)', value: '4px', token: '--ax-space-1' },
  { name: '2x', value: '8px', token: '--ax-space-2' },
  { name: '3x', value: '12px', token: '--ax-space-3' },
  { name: '4x', value: '16px', token: '--ax-space-4' },
  { name: '5x', value: '20px', token: '--ax-space-5' },
  { name: '6x', value: '24px', token: '--ax-space-6' },
  { name: '8x', value: '32px', token: '--ax-space-8' },
  { name: '10x', value: '40px', token: '--ax-space-10' },
  { name: '12x', value: '48px', token: '--ax-space-12' },
  { name: '16x', value: '64px', token: '--ax-space-16' },
  { name: '20x', value: '80px', token: '--ax-space-20' },
  { name: '24x', value: '96px', token: '--ax-space-24' }
];

const modelsCatalog = [
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: '200k tokens', speed: '72 tok/s', status: 'Online', score: '93.7%' },
  { name: 'GPT-4o', provider: 'OpenAI', context: '128k tokens', speed: '98 tok/s', status: 'Online', score: '91.8%' },
  { name: 'DeepSeek-V3', provider: 'DeepSeek', context: '64k tokens', speed: '85 tok/s', status: 'Online', score: '90.2%' },
  { name: 'Llama 3.1 405B', provider: 'Meta AI', context: '128k tokens', speed: '46 tok/s', status: 'Online', score: '89.4%' },
  { name: 'Qwen 2.5 72B', provider: 'Alibaba', context: '128k tokens', speed: '112 tok/s', status: 'Online', score: '88.9%' },
  { name: 'Mistral Large 2', provider: 'Mistral', context: '128k tokens', speed: '80 tok/s', status: 'Online', score: '87.5%' }
];

module.exports = {
  colors,
  typographyScale,
  spacingScale,
  modelsCatalog
};
