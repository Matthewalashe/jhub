/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          soft: '#D8F3DC',
        },
        accent: {
          DEFAULT: '#F4A261',
          dark: '#E76F51',
        },
        surface: '#FAFAF8',
        card: '#FFFFFF',
        border: '#E8E8E4',
        ink: '#1A1A18',
        muted: '#5C5C58',
        'text-muted': '#9A9A94',
        success: '#52B788',
        warning: '#F4A261',
        error: '#E63946',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.10)',
        cv: '0 8px 32px rgba(0,0,0,0.14)',
        glass: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
        brutal: '4px 4px 0px #1A1A18',
        'brutal-sm': '2px 2px 0px #1A1A18',
        'brutal-accent': '4px 4px 0px #F4A261',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'shake': 'shake 0.4s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(4deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
