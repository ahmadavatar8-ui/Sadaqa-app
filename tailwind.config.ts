import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Islamic Color Palette
        emerald: {
          50: '#e8f3ed',
          100: '#d1e7db',
          200: '#a3cfb7',
          300: '#75b793',
          400: '#479f6f',
          500: '#0F3D2E', // Deep Emerald - Primary
          600: '#0c3125',
          700: '#09251c',
          800: '#061913',
          900: '#030c0a',
        },
        gold: {
          50: '#faf8f0',
          100: '#f5f1e1',
          200: '#ebe3c3',
          300: '#e1d5a5',
          400: '#d7c787',
          500: '#C8A951', // Soft Gold - Accent
          600: '#a38741',
          700: '#7e6531',
          800: '#594321',
          900: '#342111',
        },
        pearl: {
          50: '#F8F6F1', // Warm Off White - Background
          100: '#f4f2ed',
          200: '#e9e5db',
          300: '#ded8c9',
          400: '#d3cbb7',
          500: '#c8bea5',
          600: '#9d9584',
          700: '#726c63',
          800: '#474342',
          900: '#1c1a21',
        },
        charcoal: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1E1E1E', // Charcoal - Text
          900: '#0a0a0a',
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-gold': 'glowGold 2.5s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(15, 61, 46, 0.4), 0 0 40px rgba(15, 61, 46, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(15, 61, 46, 0.6), 0 0 60px rgba(15, 61, 46, 0.3)' },
        },
        glowGold: {
          '0%': { boxShadow: '0 8px 30px rgba(200, 169, 81, 0.25)' },
          '100%': { boxShadow: '0 12px 50px rgba(200, 169, 81, 0.45)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F3D2E' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'radial-emerald': 'radial-gradient(circle at center, #0F3D2E 0%, #081C15 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
