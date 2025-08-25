/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Inter','sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
