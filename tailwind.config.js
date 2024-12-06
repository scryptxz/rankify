/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B141B",
        light: "#20C161",
        dark: "#010d1c",
        white: "#f5f9ff",
        black: "#081118",
        green: "#103629",
        lightgreen: "#DAFFD6",
      },
      fontFamily: {
        mono: ["Dosis"],
      },
      animation: {
        progress: "progress 1.5s ease forwards",
      },
      keyframes: {
        progress: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
