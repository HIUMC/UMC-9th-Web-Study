/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serifDisplay: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        wideish: '0.02em',
      },
    },
  },
  plugins: [],
};
