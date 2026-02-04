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
        // Islamic Luxury Heritage Color Palette
        emerald: {
          50: '#e8f5f1',
          100: '#d1ebe3',
          200: '#a3d7c7',
          300: '#75c3ab',
          400: '#47af8f',
          500: '#0F6B55', // Deep Emerald Green - Primary (Islamic Luxury)
          600: '#0c5644',
          700: '#094033',
          800: '#062b22',
          900: '#031511',
        },
        olive: {
          50: '#e9ebe7',
          100: '#d3d7cf',
          200: '#a7af9f',
          300: '#7b876f',
          400: '#4f5f3f',
          500: '#1F3D2B', // Dark Olive Green - Secondary
          600: '#193122',
          700: '#13251a',
          800: '#0c1811',
          900: '#060c09',
        },
        gold: {
          50: '#f9f6ed',
          100: '#f3eddb',
          200: '#e7dbb7',
          300: '#dbc993',
          400: '#cfb76f',
          500: '#C7A74A', // Muted Antique Gold - Luxury Accent
          600: '#9f863b',
          700: '#77642c',
          800: '#4f431e',
          900: '#28210f',
        },
        ivory: {
          50: '#F7F5EF', // Warm Ivory / Sand - Primary Background
          100: '#f3f0e8',
          200: '#e7e1d1',
          300: '#dbd2ba',
          400: '#cfc3a3',
          500: '#c3b48c',
          600: '#9c9070',
          700: '#756c54',
          800: '#4e4838',
          900: '#27241c',
        },
        charcoal: {
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#bababa',
          400: '#a3a3a3',
          500: '#6F6F6F', // Warm Gray - Muted Text
          600: '#595959',
          700: '#434343',
          800: '#1C1C1C', // Charcoal Black - Primary Text
          900: '#0e0e0e',
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-in-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
        'glow-gold': 'glowGold 3.5s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(15, 107, 85, 0.2), 0 0 30px rgba(15, 107, 85, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(15, 107, 85, 0.3), 0 0 45px rgba(15, 107, 85, 0.15)' },
        },
        glowGold: {
          '0%': { boxShadow: '0 4px 20px rgba(199, 167, 74, 0.15)' },
          '100%': { boxShadow: '0 6px 30px rgba(199, 167, 74, 0.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F6B55' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'radial-emerald': 'radial-gradient(circle at center, #0F6B55 0%, #1F3D2B 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
