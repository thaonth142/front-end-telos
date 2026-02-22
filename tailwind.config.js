/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary:"#8c30f5",
        abc: {
          50: "#ff1122",
          150: "#ff11aa",
        },
        red: {
          500: "#fff567",
        }
      },
      fontSize: {
        abc: ["12px", "20px"],
        H1:["72px","98px"],
        H2:["48px","68px"],
        Lead1:["18px","32px"],
        body1: ["14px","20px"]

      },
      screens: {
        tablet: "900px",
        desktop: "1200px",
      },
      spacing: {
        18: "72px"
      }
    },
  },
  plugins: [],
}