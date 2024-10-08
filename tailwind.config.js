/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/*.pug', './views/**/*.pug', './views/**/**/*.pug'],
  theme: {
    extend: {
      brightness: {
        75: '.75',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fbf7f1',
          100: '#f6ecde',
          200: '#ecd6bc',
          300: '#e0b891',
          400: '#d69d70',
          500: '#c97b46',
          600: '#bb663b',
          700: '#9c5032',
          800: '#7d412f',
          900: '#663728',
          950: '#361b14',
        },
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
