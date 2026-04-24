/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FFF0F3',
          100: '#FFD6E0',
          200: '#FFB3C1',
          300: '#FF8FA3',
          400: '#FF4D6D',
          500: '#E63262',
          600: '#C9184A',
          700: '#A4133C',
          800: '#800F2F',
          900: '#590D22',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:  { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn:  { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        checkDraw:{ '0%': { strokeDashoffset: '100' }, '100%': { strokeDashoffset: '0' } },
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease-out',
        'slide-up':  'slideUp 0.5s ease-out',
        'scale-in':  'scaleIn 0.3s ease-out',
        'float':     'float 4s ease-in-out infinite',
        'shimmer':   'shimmer 2s linear infinite',
        'check-draw':'checkDraw 0.6s ease-out forwards',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(255,143,163,0.35)',
        'glow':    '0 0 24px rgba(255,143,163,0.45)',
        'glow-lg': '0 0 48px rgba(255,143,163,0.5)',
      },
    },
  },
  plugins: [],
}
