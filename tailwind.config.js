/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors:{
        varBlue: "#00BFFF",
       
        varRed: "#FF0000",
      }
    },
    fontFamily: {
      head: ["Jersey 15", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
}