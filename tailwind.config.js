module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {

    colors: {
      'lime': '#BCFE2F',
      'orange': '#EE4802',
      'lightgrey': '#585858',
      'darkgrey': '#141416',
      'grey': '#1A1B1D',
      'white': '#FFFFFF',
    },
  
    extend: {},
    screens: {
      'xs': '445px',
      // => @media (min-width: 640px) { ... }

      'sm': '525px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1736px',
      // => @media (min-width: 1536px) { ... }
    }
  },

  plugins: [require("daisyui")],
}
