/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base": {
          "50" : "#fff",
          "100" : "rgb(8,8,8)",
          "200" : "rgb(12,12,12)", 
          "300" : "rgb(15,15,15)", 
          "400" : "rgb(18,18,18)", 
          "500" : "rgb(20,20,20)", 
          "600" : "rgb(23,23,23)", 
          "700" : "rgb(26,26,26)", 
          "800" : "rgb(30,30,30)", 
          "900" : "rgb(40,40,40)", 
        }
      }
    },
  },
  plugins: [],
}

