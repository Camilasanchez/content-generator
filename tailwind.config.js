
// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#6366f1", // Indigo-500
          dark: "#4f46e5",   // Indigo-600
        },
        secondary: {
          DEFAULT: "#ec4899", // Pink-500
          dark: "#db2777"     // Pink-600
        },
        background: "#f9fafb",
        surface: "#ffffff",
        muted: "#6b7280"
      },
      borderRadius: {
        xl: "1rem"
      },
      boxShadow: {
        card: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }
    },
  },
  plugins: [],
}