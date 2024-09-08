/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/views/*.pug',
    './src/views/**/*.pug',
    './src/views/**/**/*.pug',
    './src/views/**/**/**/*.pug',
    './src/views/**/**/**/**/*.pug',
    './src/views/**/**/**/**/**/*.pug',
    './src/views/lib/button/button.pug',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0faff',
          100: '#e0f5fe',
          200: '#bae8fd',
          300: '#7dd5fc',
          400: '#38bcf8',
          500: '#0ea5e9',
          600: '#028ac7',
          700: '#0370a1',
          800: '#075e85',
          900: '#0c506e',
          950: '#083549',
        },
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
