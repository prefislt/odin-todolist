/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide"), require('@tailwindcss/line-clamp')],
  daisyui: {
    styled: true,
    themes: ["dark", "light", "halloween"],
  },
};
