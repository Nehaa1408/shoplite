/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core
        background: "#f8f9ff",
        surface: "#f8f9ff",

        primary: "#0040e0",
        secondary: "#5e41d0",
        tertiary: "#005d73",

        // Containers
        "primary-container": "#2e5bff",
        "secondary-container": "#775ceb",
        "tertiary-container": "#007792",

        // Surface system
        "surface-container": "#e5eeff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-container-lowest": "#ffffff",

        // Text
        "on-background": "#0b1c30",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#434656",

        // States
        error: "#ba1a1a",
        "error-container": "#ffdad6",

        // Utility
        "outline-variant": "#c4c5d9",
      },

      spacing: {
        base: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        gutter: "24px",
        "container-max": "1440px",
      },

      borderRadius: {
        DEFAULT: "4px",
        lg: "8px",
        xl: "12px",
        xxl: "16px",
        full: "9999px",
      },

      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Manrope", "sans-serif"],
        metric: ["Manrope", "sans-serif"],
      },

      fontSize: {
        h1: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px" }],
        bodySm: ["14px", { lineHeight: "20px" }],
        metric: ["36px", { lineHeight: "44px", fontWeight: "800" }],
        label: ["12px", { lineHeight: "16px", fontWeight: "600" }],
      },

      boxShadow: {
        soft: "0 20px 40px rgba(0,0,0,0.05)",
        glass: "0 40px 60px -15px rgba(46, 91, 255, 0.04)",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};