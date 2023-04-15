/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },

    container: {
      center: true,
      padding: "2px",
    },
    extend: {
      spacing: {},

      fontFamily: {
        tnr: ["Times", "Times New Roman", "Poppins", "serif"],
      },
      colors: {
        primary: "#FFC800",
        secondary: "#F6F6F6",

        listBar: "#F8F5F5",
        borderColor: "#DADADA",
        mygrey: "#9C9C9C",
        lightgreen: "rgb(67, 160, 71)", //delivery status
        lightorange: "rgb(255, 130, 54)", //delivery status
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        secondary: "#F6F6F6",
        lightblack: "#9C9C9C",
      },

      backgroundColor: {
        lightgreen: "rgba(67, 160, 71, 0.12)", //delivery status
        lightorange: "rgba(255, 130, 54, 0.12)", //delivery status
      },
      boxShadow: {
        myshadow: "0 1px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      fontSize: {
        toosm: "12px",
      },
      gridTemplateColumns: {
        dashboard: "repeat(3, 210px)",
      },
    },
  },
  plugins: [],
};
