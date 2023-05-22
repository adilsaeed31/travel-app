// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        tc: {
          title: 48,
        },
      },
      fontWeight: {
        tc: {
          normal: '100',
        },
      },
      colors: {
        tc: {
          primary: '#f8d03b',
        },
      },
    },
  },
  plugins: [],
}
