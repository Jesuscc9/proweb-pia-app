/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#38444D',
          800: '#15202B',
        },
      },
    },
  },
  plugins: [],
}
