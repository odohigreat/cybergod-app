/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Funnel Display"', 'sans-serif'],
      }
    },
  },
  plugins: [],

  darkMode: 'class',
}