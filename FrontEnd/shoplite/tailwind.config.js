export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0846ed",
        "primary-container": "#859aff",

        surface: "#f9f5ff",
        "surface-container": "#e9e5ff",
        "surface-container-low": "#f2efff",
        "surface-container-high": "#e2dfff",
        "surface-container-highest": "#dcd9ff",

        "on-background": "#2b2a51",
        "on-surface": "#2b2a51",
        "on-surface-variant": "#585781",

        "outline-variant": "#aba9d7",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        headline: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};