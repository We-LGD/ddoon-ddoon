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
        input: '#D2D2D2',
        disabled: '#D9D9D9',
        disabledHover: '#999999',
      },
      animation: {
        successLight: 'successLight 2s ease-in-out infinite',
        tooltip: 'tooltip 3s ease-in-out infinite',
      },
      keyframes: {
        successLight: {
          '0%, 100%': {
            boxShadow: '0 0 10px 1px #F8E163, 0 0 15px 1px #F8E163',
          },
          '50%': {
            boxShadow: 'none',
          },
        },
        tooltip: {
          '0%, 100%': {
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};
