/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563eb',
          DEFAULT: '#1d4ed8',
          dark: '#1e40af',
        },
        privacy: {
          light: '#d1fae5',  // soft light green for light mode
          DEFAULT: '#059669', // main green for privacy (dark mode bg or buttons)
          dark: '#065f46',   // dark green for dark mode background
          textLight: '#065f46', // dark green text on light bg
          textDark: '#d1fae5',  // light green text on dark bg
          buttonDarkBg: '#10b981',   // светло-зеленый для кнопки в темной теме
          buttonDarkHover: '#059669', // чуть темнее для hover
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
