/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#0056B3',
            light: '#1A73E8',
            dark: '#003E82',
            glow: 'rgba(0, 86, 179, 0.45)',
          },
          red: {
            DEFAULT: '#E63946',
            light: '#FF5A67',
            dark: '#BA1C28',
            glow: 'rgba(230, 57, 70, 0.45)',
          },
          gold: {
            DEFAULT: '#FFD700',
            light: '#FFE55C',
            dark: '#CCAC00',
            glow: 'rgba(255, 215, 0, 0.45)',
          },
          navy: {
            DEFAULT: '#0B0E14',
            light: '#141A24',
            dark: '#05070A',
          },
          black: '#05070A',
          offwhite: '#F8FAFC',
          ink: {
            DEFAULT: '#0B0E14',
            muted: '#334155',
            light: '#64748B',
          },
          surface: {
            light: '#F8FAFC',
            dark: '#0B0E14',
            card: '#111726',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"SF Mono"', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'squircle': '28px',
        'squircle-lg': '36px',
        'ios': '20px',
      },
      boxShadow: {
        'glass-sm': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'glass-md': '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
        'glass-lg': '0 16px 48px 0 rgba(0, 0, 0, 0.18), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        'glass-dark': '0 16px 48px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'blue-glow': '0 0 35px rgba(0, 86, 179, 0.4)',
        'gold-glow': '0 0 35px rgba(255, 215, 0, 0.35)',
        'red-glow': '0 0 35px rgba(230, 57, 70, 0.35)',
      },
      backdropBlur: {
        'ios': '24px',
        'vision': '36px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(0px, -20px) scale(1.03)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(0px, 20px) scale(0.97)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
