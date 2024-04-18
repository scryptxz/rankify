/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#16498A",
      light: "#235799",
      dark: "#0C3366",
      darker: "#031935",
      white: "#f5f9ff",
      black: "#00050d",
      green: "#0B8969",
      pink: "#c1507f",
      purple: "#2C1E92",
      cyan: "#34778d",
    },
    animation: {
      progress: "progress 2s ease forwards",
    },
    keyframes: {
      progress: {
        from: { width: "0%" },
        to: { width: "66%" },
      },
    },
  },
  plugins: [],
};
