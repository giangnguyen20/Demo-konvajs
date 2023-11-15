/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#da6624',
        primaryDark: '#ae521d',
        primaryLight: '#FDECD2',
        dark: '#292524',
        darkLight: '#2c2e32',
        light: '#f8fafc',
        lightDark: '#c6c8ca',
        red2: '#ff7675',
        redDark: '#cc5e5e',
        blue2: '#38bdf8',
        yellow2: '#fbbf24',
        green2: '#38d399',
        stone: '#78716c',
      }
    },
  },
  plugins: [],
}

