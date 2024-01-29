/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      // helvetica: 'Helvetica Neue',
      montserrat: 'Montserrat',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    colors: {
      'light-branded': '#0cbe6f',
      // 'main-brand': '#09ad64',
      'dark-branded': '#029554',
      'light-accent': '#ffde54',
      accent: '#fdcc00',
      'dark-accent': '#ecbe00',
      black: '#000',
      'grey-text': '#888d97',
      'light-blue': '#4985f9',
      blue: '#3875ea',
      'dark-blue': '#2d68db',
      'light-red': '#e56453',
      red: '#cc5849',
      'dark-red': '#b84b3d',
      'hover-gray': '#F8F9FF',
      // 'light-gray': '#f0f1f5',
      'medium-gray': '#e9ecf9',
      'dark-gray': '#e1e2e5',
      'text-gray': '#888d97',
      // white: '#fff',
      facebock: '#435894',
      apple: '#222',
      'facebock-hover': '#5169ae',
      'google-hover': '#DF6959',
      'apple-hover': '#222',
      backdrop: 'rgba(34, 37, 49, 0.70)',
      bodyOverlay: 'rgba(0, 0, 0, 0.10)',

      dark: '#202020',
      gray: '#797979',
      'light-gray': '#F0F1F5',
      'main-green': '#143A2F',
      'green-light': '#4E6C50',
      white: '#FFF',
      gold: '#C5975B',
      'main-brand': '#09ad64',
    },
    boxShadow: {
      sortShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.25)',
      accShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.25)',
    },
    extend: {
      screens: {
        '2xl': { raw: 'only screen and (max-width: 1200px)' },
        xs: { raw: 'only screen and (max-width: 600px)' },
      },
      transitionDuration: {
        250: '250ms',
        150: '150ms',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        fillCode: {
          from: {
            width: '0%',
          },
          to: {
            width: '100%',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        'animate-in': 'animate-in 0.25s ease-out',
        fillCode: 'fillCode 180s linear',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
