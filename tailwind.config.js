/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // state
        primary: colors.slate[700],
        ['primary-light']: colors.slate[100],
        success: colors.emerald[500],
        ['success-light']: colors.emerald[200],
        error: colors.red[500],
        ['error-light']: colors.red[200],
        warning: colors.amber[400],
        ['warning-light']: colors.amber[200],
        disabled: colors.slate[300],
        danger: colors.rose[500],
        ['danger-light']: colors.rose[200],
        // frame
        ['dark']: colors.slate[300],
        ['light']: colors.slate[200],
        // text
        ['emphasized']: colors.slate[900],
        ['deactivated']: colors.slate[400],
        ['deemphasized']: colors.slate[400],
        // foucs
        highlight: colors.indigo[300],
      },
      keyframes: {
        signal: {
          from: {
            ['box-shadow']:
              '0 0 1px 2px rgb(165 180 252),0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
          to: {
            ['box-shadow']:
              '0 0 4px 4px rgb(255, 255, 255, 0),0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
        fadein: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        fadeout: {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        slideup: {
          from: {
            opacity: '0',
            transform: 'translateY(4px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        slidedown: {
          from: {
            opacity: '0',
            transform: 'translateY(-4px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        centeredslideup: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, 4px)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, 0px)',
          },
        },
        centeredslidedown: {
          from: {
            opacity: '0',
            transform: 'translate(-50%,-4px)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%,0px)',
          },
        },
      },
      animation: {
        signal: 'signal 300ms ease forwards',
        ['fade-in']: 'fadein 150ms ease forwards',
        ['fade-out']: 'fadeout 150ms ease forwards',
        ['slide-up']: 'slideup 150ms ease forwards',
        ['slide-down']: 'slidedown 150ms ease forwards',
        ['centered-slide-up']: 'centeredslideup 150ms ease forwards',
        ['centered-slide-down']: 'centeredslidedown 150ms ease forwards',
      },
    },
  },
  plugins: [],
}
