import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        surface: {
          DEFAULT: '#0a0a0b',
          1: '#111113',
          2: '#18181b',
          3: '#222226',
          4: '#2a2a30',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover:   '#818cf8',
          muted:   '#312e81',
          subtle:  '#1e1b4b',
        },
        border: {
          DEFAULT: '#27272a',
          hover:   '#3f3f46',
          focus:   '#6366f1',
        },
        text: {
          primary:   '#fafafa',
          secondary: '#a1a1aa',
          tertiary:  '#52525b',
          accent:    '#818cf8',
        },
        status: {
          todo:        { bg: '#18181b', text: '#a1a1aa', border: '#3f3f46'  },
          in_progress: { bg: '#1e1b4b', text: '#818cf8', border: '#4338ca' },
          done:        { bg: '#052e16', text: '#4ade80', border: '#166534' },
        },
        priority: {
          low:    { bg: '#18181b', text: '#71717a', border: '#3f3f46'  },
          medium: { bg: '#1c1917', text: '#fb923c', border: '#9a3412' },
          high:   { bg: '#1c0a0a', text: '#f87171', border: '#991b1b' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'slide-up':   'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
        'slide-in':   'slideIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn:   { '0%': { opacity: '0', transform: 'translateX(-8px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'glow':    '0 0 20px rgba(99,102,241,0.15)',
        'glow-sm': '0 0 10px rgba(99,102,241,0.1)',
        'card':    '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'modal':   '0 25px 50px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

export default config
