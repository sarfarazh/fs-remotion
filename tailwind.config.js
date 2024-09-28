module.exports = {
  content: ['./src/**/*.{ts,tsx}'],  // Include all .ts and .tsx files
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster', 'cursive'],  // Adding custom Google fonts
        montserrat: ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
