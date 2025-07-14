// postcss.config.js
export default {
  plugins: {
    // This is the correct PostCSS plugin for Tailwind CSS
    // The 'tailwindcss' plugin has moved to '@tailwindcss/postcss'
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
