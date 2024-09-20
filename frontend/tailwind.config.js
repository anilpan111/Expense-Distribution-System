/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorLevel1: '#141D26', // Replace with your desired color   #00df9a  #302E3B
        colorLevel2: '#243447',
        colorLevel3: '#E2E2D2',
        colorLevel4: '#C51F5D',
        colorLevel5: '#1D4C4F',
      }
    },
    fontFamily:{
      myFont: ["Vollkorn"]
    }
  },
  plugins: [],
}

