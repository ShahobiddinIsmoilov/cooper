/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#18212e",
        votes_hover: "#cceaff",
      },
      screens: {
        xs: "576px",
        sm: "960px",
        md: "1200px",
        lg: "1400px",
        // sm: { min: "640px", max: "767px" },
        // md: { min: "768px", max: "1023px" },
        // lg: { min: "1024px", max: "1279px" },
        // xl: { min: "1280px", max: "1535px" },
        // "2xl": { min: "1536px" },
      },
    },
  },
  plugins: [],
};
