module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: ['main'],
      },
      gridTemplateColumns: {
        layout: '1fr',
      },
      gridTemplateRows: {
        layout: '1fr',
      },
      colors: {
        amazon_blue: {
          light: '#232F3E',
          DEFAULT: '#131921',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
};
