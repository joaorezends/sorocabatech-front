/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2044',
        secondary: '#2e93ee',
        tertiary: '#f3f9ff',
        quaternary: '#ffcf00'
      }
    },
  },
  plugins: [],
}
