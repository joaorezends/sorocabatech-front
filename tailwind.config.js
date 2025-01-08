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
        primary: {
          DEFAULT: '#2e93ee',
          dark: '#1f2044',
          light: '#f3f9ff',
        },
        secondary: '#ffcf00',
      }
    },
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.label': {
          display: 'block',
          marginBottom: theme('spacing.[0.5]'),
          color: theme('colors.primary.dark'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.semibold'),
        },

        '.input': {
          display: 'block',
          width: '100%',
          paddingTop: theme('spacing.3'),
          paddingInlineEnd: theme('spacing.3'),
          paddingBottom: theme('spacing.3'),
          paddingInlineStart: theme('spacing.3'),
          fontSize: theme('fontSize.base'),
          borderWidth: theme('borderWidth.DEFAULT'),
          borderColor: theme('colors.neutral.400'),
        },

        '.button': {
          display: 'flex',
          justifyContent: 'center',
          paddingTop: theme('spacing.3'),
          paddingInlineEnd: theme('spacing.6'),
          paddingBottom: theme('spacing.3'),
          paddingInlineStart: theme('spacing.6'),
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.6'),
          borderWidth: theme('borderWidth.DEFAULT'),
          borderColor: theme('colors.transparent'),
        },
        '.button:disabled': {
          opacity: '0.5',
        },
        '.button-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: theme('colors.white'),
          borderColor: theme('colors.primary.DEFAULT'),
        },
        '.button-secondary': {
          backgroundColor: theme('colors.secondary'),
          color: theme('colors.primary.dark'),
          borderColor: theme('colors.secondary'),
        },
        '.button-outline-primary-dark': {
          backgroundColor: theme('colors.white'),
          color: theme('colors.primary.dark'),
          borderColor: theme('colors.primary.dark'),
        },
        '.button-lg': {
          paddingTop: theme('spacing.[3.5]'),
          paddingBottom: theme('spacing.[3.5]'),
          fontSize: theme('fontSize.lg'),
          lineHeight: theme('lineHeight.7'),
        },
        '.button-xl': {
          paddingTop: theme('spacing.4'),
          paddingBottom: theme('spacing.4'),
          fontSize: theme('fontSize.xl'),
          lineHeight: theme('lineHeight.7'),
        },
      })
    })
  ],
}
