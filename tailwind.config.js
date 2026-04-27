/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Dusty rose — primary accent */
        brand: {
          50:  '#FBF5F3',
          100: '#F5E7E3',
          200: '#ECCDC7',
          300: '#DFAAa0',
          400: '#CE8578',
          500: '#BC6B5E',
          600: '#A05549',   /* primary CTA */
          700: '#7F4239',
          800: '#60312A',
          900: '#42211D',
        },
        /* Warm neutrals — backgrounds, borders */
        warm: {
          50:  '#FAFAF9',   /* page background */
          100: '#F5F3F1',   /* subtle section alt */
          200: '#EDE9E6',   /* borders */
          300: '#D9D3CE',
          400: '#B0A9A3',
          500: '#8A827B',
          600: '#635C56',
          700: '#46403B',
          800: '#2E2A26',
          900: '#1A1714',   /* primary text */
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.97)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        checkDraw: { '0%': { strokeDashoffset: '100' }, '100%': { strokeDashoffset: '0' } },
      },
      animation: {
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':   'fadeIn 0.6s ease both',
        'scale-in':  'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'check-draw':'checkDraw 0.6s ease-out forwards',
      },
      boxShadow: {
        'soft':    '0 2px 16px rgba(26,23,20,0.07)',
        'soft-md': '0 4px 32px rgba(26,23,20,0.09)',
        'soft-lg': '0 8px 48px rgba(26,23,20,0.11)',
        'glow':    '0 0 28px rgba(160,85,73,0.25)',
        'glow-sm': '0 0 14px rgba(160,85,73,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
