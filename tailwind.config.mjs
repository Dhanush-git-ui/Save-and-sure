/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc6fd',
          400: '#36a7f9',
          500: '#0c8ff0',
          600: '#0071cd',
          700: '#0059a6',
          800: '#044b89',
          900: '#0a3f71',
          950: '#07274a',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#d2dbe3',
          300: '#adbccc',
          400: '#8096b0',
          500: '#5c7897',
          600: '#47617d',
          700: '#3a4e65',
          800: '#324456',
          900: '#2d3b49',
          950: '#1c2530',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdca8',
          300: '#ffc271',
          400: '#ff9c37',
          500: '#ff7b10',
          600: '#ff5c02',
          700: '#cc4102',
          800: '#a1350b',
          900: '#832d0c',
          950: '#461404',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}