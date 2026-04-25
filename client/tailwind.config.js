/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "9999px",
      md: "10000px",
      lg: "10001px",
      xl: "10002px",
      "2xl": "10003px",
    },
    extend: {},
  },
  plugins: [],
};
