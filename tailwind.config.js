/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FFF0F0',
          100: '#FFCDD2',
          200: '#FFA8B4',
          300: '#FF7B8A',
          400: '#FF4455',
          500: '#E63946',
          600: '#C8102E',
          700: '#A00024',
          800: '#7A001B',
          900: '#520012',
        },
        cream:        '#FAF7F4',
        'warm-white': '#F5F0EE',
        blush:        '#FFD6E0',
        editorial:    '#111111',
        mid:          '#5C5552',
      },
      fontFamily: {
        editorial: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        display:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:      ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1'   }],
        '11xl': ['12rem', { lineHeight: '1'   }],
        '12xl': ['14rem', { lineHeight: '0.9' }],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { transform: 'translateY(40px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        revealUp:  { '0%': { transform: 'translateY(110%)' }, '100%': { transform: 'translateY(0%)' } },
        scaleIn:   { '0%': { transform: 'scale(0.92)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee:   { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        checkDraw: { '0%': { strokeDashoffset: '100' }, '100%': { strokeDashoffset: '0' } },
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.22,1,0.36,1)',
        'reveal-up':  'revealUp 0.7s cubic-bezier(0.22,1,0.36,1)',
        'scale-in':   'scaleIn 0.4s cubic-bezier(0.22,1,0.36,1)',
        'shimmer':    'shimmer 2s linear infinite',
        'marquee':    'marquee 22s linear infinite',
        'check-draw': 'checkDraw 0.6s ease-out forwards',
      },
      boxShadow: {
        'glow-sm': '0 0 16px rgba(200,16,46,0.22)',
        'glow':    '0 0 32px rgba(200,16,46,0.32)',
        'glow-lg': '0 0 60px rgba(200,16,46,0.38)',
        'card':    '0 4px 24px rgba(17,17,17,0.06)',
        'card-lg': '0 8px 48px rgba(17,17,17,0.10)',
      },
    },
  },
  plugins: [],
}
