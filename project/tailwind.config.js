/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006838',
          50: '#e0f2e8',
          100: '#b3e0c2',
          200: '#80cc99',
          300: '#4db870',
          400: '#26a64d',
          500: '#006838', // tamnozelena
          600: '#005a31',
          700: '#004d2a',
          800: '#003f22',
          900: '#00321b',
        },
        secondary: {
          DEFAULT: '#8DC63F', // svijetlozelena
          50: '#f5fae7',
          100: '#e6f4c2',
          200: '#d0ea8a',
          300: '#b8df4d',
          400: '#a3d62a',
          500: '#8DC63F',
          600: '#7bb336',
          700: '#6aa02e',
          800: '#588d25',
          900: '#467a1d',
        },
        accent: {
          DEFAULT: '#FFFFFF', // bijela
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FFFFFF',
          600: '#f2f2f2',
          700: '#e6e6e6',
          800: '#cccccc',
          900: '#b3b3b3',
        },
        gray: {
          DEFAULT: '#231F20', // tamno siva/crna
          50: '#e6e6e6',
          100: '#cccccc',
          200: '#b3b3b3',
          300: '#999999',
          400: '#808080',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#231F20',
          900: '#1a1a1a',
        },
        black: '#231F20',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'badge-pulse': 'badge-pulse 2s infinite',
      },
      keyframes: {
        'badge-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};