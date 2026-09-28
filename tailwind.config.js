/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F5F1E8', deep: '#EDE6D8' },
        paper: '#FBF9F4',
        coffee: '#6B4A35',
        ink: '#171512',
        olive: '#59634A',
        muted: '#5B544A',
        alert: '#8A3324',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Playfair', 'Georgia', 'serif'],
        subheading: ['Montserrat', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
