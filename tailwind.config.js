/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mumbai: {
          orange: '#FF6B35',
          yellow: '#F7931E',
          red: '#DC2626',
          green: '#059669',
          blue: '#0EA5E9',
        }
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}