/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2332',
          50: '#f0f2f5',
          100: '#d4d9e0',
          200: '#a8b3c1',
          300: '#7d8ea2',
          400: '#516883',
          500: '#264364',
          600: '#1f3652',
          700: '#1a2332',
          800: '#131a25',
          900: '#0c1018',
        },
        glacier: {
          DEFAULT: '#4a90d9',
          50: '#f0f7fd',
          100: '#d9ecf9',
          200: '#b3d9f3',
          300: '#8dc6ed',
          400: '#67b3e7',
          500: '#4a90d9',
          600: '#3a73ae',
          700: '#2b5682',
          800: '#1c3a57',
          900: '#0d1d2b',
        },
        forest: {
          DEFAULT: '#2d6a4f',
          50: '#f0f7f4',
          100: '#d9ede4',
          200: '#b3dbc9',
          300: '#8dc9ae',
          400: '#67b793',
          500: '#2d6a4f',
          600: '#24553f',
          700: '#1b402f',
          800: '#122a20',
          900: '#091510',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
