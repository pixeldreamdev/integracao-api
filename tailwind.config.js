/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/substep/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/autocontratacao/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        large: '0.5rem',
      },
    },
  },
  plugins: [],
};
