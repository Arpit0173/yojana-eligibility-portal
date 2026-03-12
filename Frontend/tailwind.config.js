/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        'saffron-dark': '#E88A2D',
        trigreen: '#138808',
        'trigreen-dark': '#0F6B06',
        navy: '#000080',
        chakra: '#000080',
      },
      fontFamily: {
        heading: ['"Noto Sans"', 'sans-serif'],
        body: ['"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}