/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/index.js",
    "./src/Onboarding.js",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goldenYellow:'#FFD977',
        mustard:'#9D7E2E'
      },
    },
  },
  plugins: [],
}

