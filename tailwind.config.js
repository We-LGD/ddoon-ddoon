/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['GothicA1', 'sans-serif'],
        sub: ['Gaegu', 'cursive'],
        display: ['인천교육자람', 'sans-serif'],
      },
      colors: {
        main: '#748D70',
        active: '#455C3F',
        highlight: '#0B4203',
        disabled: '#D9D9D9',
        disabledHover: '#999999',
      },
    },
  },
  plugins: [],
};
