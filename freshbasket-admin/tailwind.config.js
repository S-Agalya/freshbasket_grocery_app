/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#071233',
          700: '#0b1730'
        },
        accent: {
          DEFAULT: '#FF7A00'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          100: '#F6F7F9'
        },
        muted: {
          DEFAULT: '#9CA3AF'
        }
      },
      boxShadow: {
        premium: '0 18px 40px rgba(7,18,51,0.08), 0 4px 12px rgba(7,18,51,0.04)'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}
