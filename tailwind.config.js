/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '500' }],
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '500' }],
        'h3': ['1.75rem', { lineHeight: '1.4', fontWeight: '500' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
        'h5': ['1.25rem', { lineHeight: '1.5', fontWeight: '500' }],
        'h6': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      colors: {
        'PRIMARY': '#1F3B4D',      // Azul-marinho profundo
        'SECUNDARY': '#d1d5db',    // Cinza-300
        'HIGHLIGHT': '#FFD700',    // Dourado
        'BACKGROUND': '#F5F5F5',   // Cinza-claro
        'TEXT_PRIMARY': '#333333', // Cinza-escuro
        'TEXT_SECONDARY': '#666666' // Cinza-médio
      }
    },
  },
  plugins: [],
}