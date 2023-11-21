/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'miraplayHeaderBackground': '#1c1c1c',
      'miraplayMainBg': '#181818',
      'miraplayMainText': '#eaeaea',
      'miraplayGreen': '#3f9c14',
      'miraplayError': '#df1332',
    },
  },
  plugins: [],
}

