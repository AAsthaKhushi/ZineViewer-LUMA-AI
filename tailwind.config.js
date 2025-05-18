/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          primary: '#a0e6c1',
          dark: '#0a2719',
          darker: '#0f3725',
          light: '#143a27',
          accent: '#bff0d4',
          glow: 'rgba(160, 230, 193, 0.3)',
        },
      },
      fontFamily: {
        'crimson': ['Crimson Pro', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in-out': 'fadeInOut 4s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'butterfly': 'butterfly 15s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'pulse': 'pulse 3s ease-in-out infinite',
        'floating': 'floating 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { 
            transform: 'translateY(0) rotate(0deg) scale(1)',
            opacity: '0',
            filter: 'drop-shadow(0 0 0 rgba(160, 230, 193, 0))'
          },
          '20%': {
            opacity: '0.8',
            filter: 'drop-shadow(0 0 8px rgba(160, 230, 193, 0.4))'
          },
          '80%': {
            opacity: '0.8',
            filter: 'drop-shadow(0 0 8px rgba(160, 230, 193, 0.4))'
          },
          '100%': {
            transform: 'translateY(-100vh) rotate(360deg) scale(0.8)',
            opacity: '0',
            filter: 'drop-shadow(0 0 0 rgba(160, 230, 193, 0))'
          }
        },
        glowPulse: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 5px rgba(160, 230, 193, 0.3))'
          },
          '50%': {
            filter: 'drop-shadow(0 0 15px rgba(160, 230, 193, 0.6))'
          }
        },
        fadeInOut: {
          '0%, 100%': {
            opacity: '0',
            transform: 'scale(0.8) translateY(0)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1) translateY(-10px)'
          }
        },
        sway: {
          '0%, 100%': {
            transform: 'rotate(-5deg) translateX(-5px)'
          },
          '50%': {
            transform: 'rotate(5deg) translateX(5px)'
          }
        },
        butterfly: {
          '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(20px, -15px) rotate(5deg) scale(1.05)' },
          '50%': { transform: 'translate(40px, 0px) rotate(0deg) scale(1)' },
          '75%': { transform: 'translate(20px, 15px) rotate(-5deg) scale(1.05)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.3)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' }
        },
        floating: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      },
      backgroundImage: {
        'nature-gradient': 'linear-gradient(to bottom, #0a2719, #143a27)',
        'nature-glow': 'radial-gradient(circle, rgba(160, 230, 193, 0.8) 0%, rgba(160, 230, 193, 0) 70%)',
        'nature-shimmer': 'linear-gradient(90deg, rgba(160, 230, 193, 0), rgba(160, 230, 193, 0.3) 50%, rgba(160, 230, 193, 0))',
      },
      boxShadow: {
        'nature': '0 15px 35px rgba(0, 0, 0, 0.4), 0 3px 10px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(160, 230, 193, 0.05)',
        'nature-hover': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}
