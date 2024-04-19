/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#0B141B",
      light: "#20C161",
      dark: "#0B141B",
      darker: "#010d1c",
      white: "#f5f9ff",
      black: "#00050d",
      green: "#103629",
      lightgreen: "#DAFFD6",
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
