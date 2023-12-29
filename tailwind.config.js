/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      aspectRatio: {
        "2/1": "2 / 1",
        "7/2": "7 / 2",
        "10/16": "10 / 16",
      },
      boxShadow: {},
    },
    screens: {
      sm: "600px",
      // => @media (min-width: 600px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      xmd: "940px",

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
