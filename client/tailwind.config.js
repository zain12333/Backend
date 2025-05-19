module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: 'rgb(var(--primary-dark))', 
      },
      fontFamily: {
        sans: ["Source Sans 3", "sans-serif"],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        robotoSlab: ['var(--font-roboto-slab)', 'serif'],
        sourceSans: ['var(--font-source-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};