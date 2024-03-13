/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: "Poppins, sans-serif",
    },
    extend: {
      colors: {
        primary: "#4640DE",
        secondary: "#F6F6FD",
        grey: "#ABB3C4",
        dark: "#121F3E",
        page: "#F8F8F8",
        success: "#2ED16C",
        lazismu: "#EE8F07",
      },
    },
  },
  plugins: [],
};
