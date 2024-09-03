/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  plugins: [
    require('preline/plugin'),
  ],
  theme: {
    extend: {
      colors: {
        'defaultBackground': '#191A19',
        'primaryBackground': '#161716',
        'secondaryBackground': '#262726',
        'defaultBodyText': '#FEFEFE',
        'defaultNavbarText': '#A9A7A4',
        'ctaColor': '#577B8D',
        'ctaColor2': '#B6F3FF',
        'ctaColorHover': '#456270',
      },
      fontFamily: {
        defaultText: ['Poppins'],
      },
      fontSize: {
        clamp1: "clamp(1rem, 5vw, 3rem)",
        clamp2: "clamp(1rem, 0.3043rem + 3.4783vw, 3rem)",
      },
      dropShadow: {
        'titleShadow': '0 0 18px rgba(87, 123, 141, 1)',
        'titleShadow2': '0 0 18px rgba(182, 243, 255, 0.4)',
        'buttonShadow': '0 0 18px rgba(87, 123, 141, 0.4)',
        'buttonShadowBlue': '0 0 18px rgba(182, 243, 255, 0.3)',
      }
    }
  }
}