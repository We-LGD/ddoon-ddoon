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
        textGlow: 'textGlow 1.5s infinite',
      },
      keyframes: {
        textGlow: {
          '0%': { textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)' },
          '50%': { textShadow: '0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.7)' },
          '100%': { textShadow: '0 0 5px rgba(255, 255, 0, 0.7), 0 0 10px rgba(255, 255, 0, 0.6)' },
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
