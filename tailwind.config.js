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
        showModal: 'showModal 0.3s ease-in-out',
      },
      keyframes: {
        showModal: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.9)',
          },
        },
      },
    },
  },
  plugins: [],
};
