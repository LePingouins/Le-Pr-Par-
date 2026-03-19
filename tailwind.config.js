/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          50:  '#f2f8f4',
          100: '#deeee4',
          200: '#bedecb',
          300: '#93c6a9',
          400: '#63a882',
          500: '#418b62',
          600: '#31704e',
          700: '#275940',
          800: '#214734',
          900: '#1b3a2b',
          950: '#0e2118',
        },
        wheat: {
          50:  '#fdf9ee',
          100: '#faf0d2',
          200: '#f3dfa0',
          300: '#e9c86a',
          400: '#dfb344',
          500: '#d49a2b',
          600: '#ba7b21',
          700: '#9a5c1e',
          800: '#7e491f',
          900: '#693c1d',
        },
        cream: '#fdf9f3',
        bark:  '#5c4033',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'leaf-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q45 20 30 35 Q15 20 30 5Z' fill='%23418b62' fill-opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
