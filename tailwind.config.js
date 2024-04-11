/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          dark: '#000', // Add your dark color here
          light: '#f7fafc', // Add your light color here
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
}

