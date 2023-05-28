// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'tc-light': ['Co Text Light'],
        'tc-regular': ['Co Text'],
        'tc-bold': ['Co Text'],
      },
      bg: {
        tc: {
          primary: '#ffc800',
        },
      },
      fontSize: {
        'tc-title': 24,
      },
      fontWeight: {
        'tc-normal': '100',
      },
      colors: {
        tc: {
          primary: '#f8d03b',
          secondary: '#3f3d36',
          black: '#131109',
          'black-btn': '#352D0F',
        },
      },
    },
  },
  plugins: [],
}
