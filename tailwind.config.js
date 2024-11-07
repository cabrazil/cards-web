/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-custom': '#5B767B',
        'bg-custom2': '#5C5751',
        'bg-custom3': '#CED7E4',
        'text-label1': '#6F5594'
      }
    },
  },
  plugins: [],
}

