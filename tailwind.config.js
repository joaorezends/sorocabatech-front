const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2044',
        secondary: '#2e93ee',
        tertiary: '#f3f9ff',
        quaternary: '#ffcf00'
      }
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.btn': {
          display: 'flex',
          justifyContent: 'center',
          paddingTop: theme('spacing.3'),
          paddingInlineEnd: theme('spacing.6'),
          paddingBottom: theme('spacing.3'),
          paddingInlineStart: theme('spacing.6'),
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.6'),
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.secondary'),
          color: theme('colors.white'),
        },
        '.btn-quaternary': {
          backgroundColor: theme('colors.quaternary'),
          color: theme('colors.primary'),
        },
        '.btn-lg': {
          paddingTop: theme('spacing.[3.5]'),
          paddingBottom: theme('spacing.[3.5]'),
          fontSize: theme('fontSize.lg'),
          lineHeight: theme('lineHeight.7'),
        },
        '.btn-xl': {
          paddingTop: theme('spacing.4'),
          paddingBottom: theme('spacing.4'),
          fontSize: theme('fontSize.xl'),
          lineHeight: theme('lineHeight.7'),
        },
      })
    })
  ],
}
