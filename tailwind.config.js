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
    },
  },
  plugins: [],
};
