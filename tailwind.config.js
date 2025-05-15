/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-instrument-sans)', 'sans-serif'],
        title: ['var(--font-koulen)', 'cursive'],
      },
      colors: {
        background: "var(--bg-color)",
        foreground: "var(--text-color)",
      },
      animation: {
        blink: "blink 1s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        }
      },
    },
  },
  plugins: [],
};
