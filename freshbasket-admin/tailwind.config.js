/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#061226',
          700: '#0b2540',
          800: '#072034',
          900: '#031426'
        },
        gold: {
          DEFAULT: '#D4AF37',
          600: '#c79f2f'
        },
        sand: {
          DEFAULT: '#F7F1E7'
        }
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(2,6,23,0.45)'
      }
    },
  },
  plugins: [],
}
