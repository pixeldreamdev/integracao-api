/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/substep/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/autocontratacao/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4caf50',
          dark: '#45a049',
          light: '#81c784',
        },
        secondary: {
          DEFAULT: '#ffd700',
          dark: '#ffc400',
          light: '#ffeb3b',
        },
        background: '#000000',
        text: {
          DEFAULT: '#333333',
          light: '#666666',
        },
        error: '#e53935',
        success: '#43a047',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        custom: ['Maison Neue', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        large: '0.5rem',
      },
      zIndex: {
        2: '2',
      },
      screens: {
        'ipad-pro': { raw: '(min-width: 1024px) and (max-width: 1366px) and (min-height: 1024px)' },
        '[375px]': { min: '375px', max: '390px' },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
