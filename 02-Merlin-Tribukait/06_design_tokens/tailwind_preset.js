// Tailwind CSS Preset for Merlin Tribukait
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00f0ff',
          secondary: '#ff2d55',
          metallic: '#a0a8b8',
          bg: '#08080c',
          surface: '#12121c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 24px #00f0ff60',
        'glow-lg': '0 0 40px #00f0ff90',
      }
    }
  }
};
