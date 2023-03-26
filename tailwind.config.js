/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#699C78',
        'secondary': '#7DC383',
        'light': '#D6E6F2'
      }
    },
  },
  plugins: [],
}
