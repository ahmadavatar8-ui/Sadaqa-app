import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Emerald Green
        primary: {
          50: '#e8f5f1',
          100: '#d1ebe3',
          200: '#a3d7c7',
          300: '#75c3ab',
          400: '#47af8f',
          500: '#0F6B55', // Main Primary
          600: '#0c5644',
          700: '#094033',
          800: '#062b22',
          900: '#031511',
        },
        // Accent - Muted Gold
        accent: {
          50: '#f9f6ed',
          100: '#f3eddb',
          200: '#e7dbb7',
          300: '#dbc993',
          400: '#cfb76f',
          500: '#C7A74A', // Main Accent
          600: '#9f863b',
          700: '#77642c',
          800: '#4f431e',
          900: '#28210f',
        },
        // Background - Soft Warm Off-White
        background: '#F7F5EF',
        // Text Colors
        text: {
          primary: '#1C1C1C', // Charcoal
          muted: '#6F6F6F',   // Muted Gray
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      borderRadius: {
        'btn': '14px',
        'card': '16px',
        'lg': '12px',
      },
      boxShadow: {
        'btn': '0 4px 14px rgba(15, 107, 85, 0.25)',
        'btn-hover': '0 6px 20px rgba(15, 107, 85, 0.35)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F6B55' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
