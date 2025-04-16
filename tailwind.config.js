/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['"Nunito"', 'sans-serif'],
      },
      zIndex: {
        '100': '100',
      },
      boxShadow: {
        'menu': '0 2px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
