/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vedic: {
          50: '#fffbf0',
          100: '#fef5d6',
          200: '#fde5a8',
          300: '#fbd070',
          400: '#f7b436',
          500: '#ef9412',
          600: '#d5730b',
          700: '#ab510c',
          800: '#8c3f10',
          900: '#753511',
          950: '#431a05',
        },
        maroon: {
          800: '#4a0e17',
          900: '#34080e',
          950: '#200408',
        },
        saffron: {
          light: '#ffb347',
          DEFAULT: '#ff7722',
          dark: '#cc5200',
        },
        gold: {
          light: '#ffd700',
          DEFAULT: '#d4af37',
          dark: '#aa820a',
        },
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', '"Yatra One"', 'sans-serif'],
        heading: ['"Rozha One"', '"Cinzel"', 'serif'],
        sanskrit: ['"Rozha One"', '"Noto Serif Devanagari"', 'serif'],
      },
      animation: {
        'flame-flicker': 'flame 2.5s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentle-glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08, 1.15) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'scale(0.95, 0.98) rotate(-0.5deg)', opacity: '0.85' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 22px rgba(245, 158, 11, 0.85))' },
        },
      },
    },
  },
  plugins: [],
};
