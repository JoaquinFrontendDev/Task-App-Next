/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ['Open Sans', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
