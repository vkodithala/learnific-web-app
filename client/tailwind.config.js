/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Home.js",
    "./src/App.js",
    "./src/index.js",
    "./src/Onboarding.js",
    "./src/Personalities.js",
    "./src/components/steps/Complete.jsx",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        md: "600px"
      },
      colors: {
        goldenYellow: '#FFD977',
        mustard: '#9D7E2E',
        highlightColor: '#DAB043',
        buttonColor: '#283C3D'
      },
    },
  },
  plugins: [],
}