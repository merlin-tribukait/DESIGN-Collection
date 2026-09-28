/**
 * Cross-Platform Device Viewport Presets and Click Dummy Specifications
 */

const devices = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'Mobile',
    width: 393,
    height: 852,
    bezel: 'phone',
    notch: 'dynamic-island',
    scale: 0.85,
    pixelRatio: 3,
    userAgent: 'iOS / Safari Mobile'
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE (Compact)',
    category: 'Mobile',
    width: 375,
    height: 667,
    bezel: 'phone-classic',
    notch: 'top-bar',
    scale: 0.9,
    pixelRatio: 2,
    userAgent: 'iOS / Compact Mobile'
  },
  {
    id: 'pixel-8',
    name: 'Google Pixel 8',
    category: 'Mobile',
    width: 412,
    height: 915,
    bezel: 'phone-android',
    notch: 'punch-hole',
    scale: 0.8,
    pixelRatio: 2.6,
    userAgent: 'Android / Chrome Mobile'
  },
  {
    id: 'ipad-pro-11',
    name: 'iPad Pro 11"',
    category: 'Tablet',
    width: 834,
    height: 1194,
    bezel: 'tablet',
    notch: 'none',
    scale: 0.65,
    pixelRatio: 2,
    userAgent: 'iPadOS / Safari'
  },
  {
    id: 'ipad-mini',
    name: 'iPad Mini',
    category: 'Tablet',
    width: 744,
    height: 1133,
    bezel: 'tablet',
    notch: 'none',
    scale: 0.7,
    pixelRatio: 2,
    userAgent: 'iPadOS / Tablet'
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air 13"',
    category: 'Laptop',
    width: 1280,
    height: 800,
    bezel: 'laptop',
    notch: 'camera-notch',
    scale: 0.6,
    pixelRatio: 2,
    userAgent: 'macOS / Safari Desktop'
  },
  {
    id: 'desktop-1080p',
    name: 'Desktop Display',
    category: 'Desktop',
    width: 1440,
    height: 900,
    bezel: 'monitor',
    notch: 'none',
    scale: 0.55,
    pixelRatio: 1,
    userAgent: 'Windows 11 / Chrome Desktop'
  },
  {
    id: 'terminal-cli',
    name: 'Terminal 80x24 (ANSI)',
    category: 'CLI / TUI',
    width: 820,
    height: 520,
    bezel: 'terminal-window',
    notch: 'traffic-lights',
    scale: 0.9,
    pixelRatio: 1,
    userAgent: 'CLI / React Ink Engine'
  }
];

module.exports = {
  devices
};
