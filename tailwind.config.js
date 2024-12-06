/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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