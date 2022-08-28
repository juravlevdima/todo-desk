/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'modal': 'rgba(0, 0, 0, .5)',
      }
    },
  },
  plugins: [],
}
