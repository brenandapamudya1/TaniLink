import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        soil:    '#1C1A14',
        harvest: '#E8A838',
        cream:   '#F5F0E8',
        leaf:    '#2D5016',
        earth:   '#6B4E2A',
        fog:     '#FAFAF7',
      },
      borderRadius: {
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        pill: '999px',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans:    ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero:    ['36px', { lineHeight: '1.1', fontWeight: '800' }],
        title:   ['26px', { lineHeight: '1.2', fontWeight: '700' }],
        section: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        price:   ['22px', { lineHeight: '1.0', fontWeight: '700' }],
        label:   ['12px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        caption: ['11px', { lineHeight: '1.5' }],
      },
      boxShadow: {
        card:        '0 1px 4px rgba(28, 26, 20, 0.06), 0 2px 8px rgba(28, 26, 20, 0.04)',
        'card-hover': '0 4px 16px rgba(28, 26, 20, 0.10), 0 2px 6px rgba(28, 26, 20, 0.06)',
        cta:         '0 4px 20px rgba(232, 168, 56, 0.30)',
        hero:        '0 8px 40px rgba(28, 26, 20, 0.18)',
      },
    },
  },
  plugins: [],
} satisfies Config
