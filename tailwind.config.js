// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // Specify files to scan for Tailwind classes
  content: [
    "./index.html", // Crucial for Vite's main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS, TS, JSX, TSX files in src folder
  ],
  darkMode: 'class', // Enable dark mode based on 'dark' class on the HTML element
  theme: {
    extend: {
      // Define custom keyframes for animations
      keyframes: {
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-in-right': {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        }
      },
      // Map keyframes to animation utility classes
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 4s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

