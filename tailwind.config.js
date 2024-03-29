// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'tc-light': ['Co Text Light'],
        'tc-regular': ['Co Text'],
        'tc-bold': ['Co Text Bold'],
      },

      fontSize: {
        'tc-sub-title': 14,
        'tc-title': 24,
        'tc-ios-base': 13,
      },
      fontWeight: {
        'tc-normal': '100',
      },
      colors: {
        tc: {
          primary: '#FFD900',
          secondary: '#3f3d36',
          black: '#131109',
          gray: '#4f4f4f',
          'dark-gray': '#1c1c1c',
          'black-btn': '#352D0F',
          'tab-text': '#343D45',
          'text-black': '#0E1215',
          'bg-primary': '#ffc800',
          tab: '#d2d5d7',
          card: '#f5f5f5',
          'bottom-tab': '#fcfcfa',
          'bottom-tab-text': '#393939',
          'bottom-tab-text-inactive': '#646464',
          'quick-text': '#464E56',
          dot: '#D7D7D7',
          'dot-active': '#4CD964',
          'quick-text-color': '#2C343B',
          'account-card-border': '#f1f1f1',
          'load-card-text': '#72788E',
          'load-card': '#F8F9FD',
          'load-input-card': '#FAF9F8',
          'sub-text': '#7F858A',
          danger: '#f54d3f',
        },
      },
    },
  },
  plugins: [],
}
