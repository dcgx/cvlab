/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        content: '1200px',
      },
      colors: {
        background: '#FAFAFA',
        surface: '#FFFFFF',
        primary: '#6366f1',
        secondary: '#374151',
        border: '#e5e7eb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        200: '200ms',
      },
    },
  },
  plugins: [],
}
