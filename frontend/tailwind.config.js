/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
}
