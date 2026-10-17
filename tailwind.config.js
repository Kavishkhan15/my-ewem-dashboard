/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'var(--canvas)',
          light: '#F2F4F2',
          dark: '#0C0F0E',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
          light: '#FCFDFB',
          'light-raised': '#E6EAE7',
          dark: '#141816',
          'dark-raised': '#1B221E',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          light: '#121614',
          'light-muted': '#57635C',
          dark: '#EAEFEB',
          'dark-muted': '#9EA8A2',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: '#D1D9D3',
          dark: '#252B28',
        },
        emerald: {
          accent: 'var(--emerald)',
          light: '#0D7A55',
          dark: '#10B981',
        },
        lime: {
          accent: 'var(--lime)',
          light: '#50663B',
          dark: '#8E9E78',
        },
        cyan: {
          accent: 'var(--cyan)',
          light: '#315954',
          dark: '#5B827E',
        },
        amber: {
          accent: 'var(--amber)',
          light: '#A15509',
          dark: '#D97706',
        },
        danger: {
          accent: 'var(--danger)',
          light: '#B8281E',
          dark: '#DC4C3E',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-hero': ['clamp(3.5rem, 7vw, 5.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'display-h1': ['clamp(2.25rem, 4.5vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-h2': ['clamp(1.5rem, 2.5vw, 2.15rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'display-h3': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        'technical': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.03em',
        tight: '-0.015em',
        tech: '0.08em',
        'tech-wide': '0.12em',
      },
      boxShadow: {
        tactile: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.03), 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        'tactile-hover': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 4px 12px 0 rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
