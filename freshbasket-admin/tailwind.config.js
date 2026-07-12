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
          900: '#083344',
          700: '#0b3f4a'
        },
        sand: {
          DEFAULT: '#F5EDE2',
          700: '#D9C9B6'
        },
        gold: {
          600: '#D4A94F'
        },
        green: {
          700: '#0f766e',
          600: '#059669',
          800: '#0b5e56'
        }
      },
      boxShadow: {
        premium: '0 12px 30px rgba(2,6,23,0.12), 0 2px 6px rgba(2,6,23,0.06)'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}
