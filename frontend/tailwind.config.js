/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0d0d0d",
          850: "#1f1f1f",
          800: "#262626",
          700: "#404040",
          600: "#595959",
          500: "#737373",
        },
      },
      screens: {
        xs: "576px",
        sm: "920px",
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
