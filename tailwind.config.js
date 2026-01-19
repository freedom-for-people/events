/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Define responsive breakpoints
    // Mobile: < 640px (default, single-column)
    // Tablet: 640px - 1024px (two-column)
    // Desktop: >= 1024px (multi-column)
    screens: {
      'sm': '640px',   // Tablet breakpoint
      'md': '768px',   // Medium tablet
      'lg': '1024px',  // Desktop breakpoint
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large desktop
    },
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#d2dae5',
          300: '#aab9cd',
          400: '#7c93b0',
          500: '#5a7396',
          600: '#475b7d',
          700: '#3a4a66',
          800: '#333f56',
          900: '#2e3749',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
