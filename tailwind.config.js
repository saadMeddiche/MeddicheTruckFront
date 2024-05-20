/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        my_color: '#4dcb7a',
      },
    },
    colors:{
      my_colore: '#4dcb7a',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
