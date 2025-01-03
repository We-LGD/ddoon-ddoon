/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['GothicA1', 'sans-serif'],
        sub: ['Gaegu', 'cursive'],
        display: ['인천교육자람', 'sans-serif'],
        woodSign: ['Maplestory', 'sans-serif'],
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
        loading: 'loading 2s linear infinite',
        textGlow: 'textGlow 1.5s infinite',
        successLight: 'successLight 2s ease-in-out infinite',
        tooltip: 'tooltip 3s ease-in-out',
      },
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(300%)' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)' },
          '50%': { textShadow: '0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.7)' },
          '100%': { textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)' },
        },
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.text-shadow-glow': {
            textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)',
          },
        },
        ['responsive', 'hover'],
      );
    },
  ],
};
