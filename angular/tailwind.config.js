/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/sns/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

