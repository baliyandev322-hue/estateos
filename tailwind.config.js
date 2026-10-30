/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        forest: {
          50: "#F2F7F4",
          100: "#E2EDE7",
          200: "#C4DDD0",
          300: "#9ECAA9",
          400: "#6EA981",
          500: "#44875D",
          600: "#2F6E49",
          700: "#225638",
          800: "#18432C",
          900: "#0F2E1E",
          950: "#081A11",
        },
        gold: {
          50: "#FCF9EE",
          100: "#F8F2D5",
          200: "#F0E3A7",
          300: "#E6D173",
          400: "#D9BE45",
          500: "#C5A023",
          600: "#A68019",
          700: "#846016",
          800: "#6E4E18",
          900: "#5E421A",
          accent: "#D4AF37",
          light: "#EAD692",
        },
        charcoal: {
          50: "#F6F7F9",
          100: "#ECEDF1",
          200: "#D4D7DF",
          300: "#B2B8C5",
          400: "#8992A5",
          500: "#6B758B",
          600: "#545C70",
          700: "#444B5B",
          800: "#383E4B",
          900: "#1A1E24",
          950: "#101317",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
