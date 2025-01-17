/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        "xss": "320px",
        "xs": "425px"
      },
      colors: {
        "white": "#FFFDFA",
        "blue": "#ADD8E6",
        "sky-blue": "#A3C8D9",
        "aqua": "#4CB0C1",
        "dark-aqua": "#204641",
        "dark-blue": "#075983",
        "black": "#2C2C2C"
      }
    },
  },
  plugins: [],
}
