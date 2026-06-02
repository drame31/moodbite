import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    { DEFAULT: '#FDF8F0', warm: '#FAF3E4', card: '#FFFFFF', muted: '#F2EBD9' },
        ink:      { DEFAULT: '#1C1410', soft: '#5C4A38', muted: '#9C7F65', inverse: '#FDF8F0' },
        // Dark surfaces: deeper near-black with just a whisper of warmth (not brown)
        espresso: { DEFAULT: '#0C0B0A', warm: '#131211', card: '#171514', muted: '#221F1D' },
        sand:     { DEFAULT: '#E8D9C0', muted: '#F0E6D3' },
        bark:     { DEFAULT: '#2C2926', muted: '#1F1D1B' },
        parchment: { DEFAULT: '#F5EDD8', soft: '#C4A882', muted: '#8B6F52' },
        tomato:   { DEFAULT: '#C84030', dark: '#E8604E', light: '#FFF0EE', dim: '#3D1410' },
        mango:    { DEFAULT: '#F5A623', dark: '#F7B53A', light: '#FFFBE8', dim: '#3D2A00' },
        basil:    { DEFAULT: '#3A7D44', dark: '#4E9E5A' },
        caramel:  { DEFAULT: '#C47B2B', dark: '#D4924A', light: '#FFF6E8', dim: '#3A2200' },
        berry:    { DEFAULT: '#7B3F6E', dark: '#9B5490', light: '#F9F0F8', dim: '#2D1028' },
        matcha:   { DEFAULT: '#8BA888', dark: '#A0C49D', light: '#F0F5F0', dim: '#1A2A1A' },
        rose:     { DEFAULT: '#E8736B', dark: '#F08B84', light: '#FFF2F1', dim: '#3D1814' },
      },
      fontFamily: {
        display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        sans:    ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        mono:    ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'xs':   ['11px', { lineHeight: '1.5',  letterSpacing: '0.04em'  }],
        'sm':   ['13px', { lineHeight: '1.5',  letterSpacing: '0.01em'  }],
        'base': ['15px', { lineHeight: '1.6',  letterSpacing: '0'       }],
        'md':   ['17px', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        'lg':   ['20px', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
        'xl':   ['24px', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        '2xl':  ['32px', { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        '3xl':  ['44px', { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        '4xl':  ['60px', { lineHeight: '1.0',  letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        'none': '0px',
        'sm':   '4px',
        'md':   '8px',
        'lg':   '14px',
        'xl':   '20px',
        '2xl':  '28px',
        'full': '9999px',
      },
      boxShadow: {
        'sm':           '0 1px 3px rgba(28,20,16,0.08)',
        'md':           '0 4px 12px rgba(28,20,16,0.12)',
        'lg':           '0 8px 24px rgba(28,20,16,0.16)',
        'xl':           '0 16px 48px rgba(28,20,16,0.20)',
        'glow-tomato':  '0 0 20px rgba(217,79,61,0.25)',
        'glow-mango':   '0 0 20px rgba(245,166,35,0.25)',
        'glow-caramel': '0 0 20px rgba(196,123,43,0.25)',
        'glow-berry':   '0 0 20px rgba(123,63,110,0.25)',
        'glow-matcha':  '0 0 20px rgba(139,168,136,0.25)',
        'glow-rose':    '0 0 20px rgba(232,115,107,0.25)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
