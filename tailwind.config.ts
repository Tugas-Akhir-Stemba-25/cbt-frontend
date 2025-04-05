import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsla(var(--primary))',
          foreground: 'hsla(var(--primary-foreground))',
          bg: 'hsla(var(--primary-bg))',
          border: 'hsla(var(--primary-border))',
          icon: 'hsla(var(--primary-icon))',
          surface: 'hsla(var(--primary-surface))'
        },
        success: {
          DEFAULT: 'hsla(var(--success))',
          surface: 'hsla(var(--success-surface))'
          // foreground: 'hsla(var(--success-foreground))',
          // bg: 'hsla(var(--success-bg))',
          // border: 'hsla(var(--success-border))',
          // icon: 'hsla(var(--success-icon))'
        },
        secondary: {
          DEFAULT: 'hsla(var(--secondary))',
          foreground: 'hsla(var(--secondary-foreground))',
          bg: 'hsla(var(--secondary-bg))',
          border: 'hsla(var(--secondary-border))',
          icon: 'hsla(var(--secondary-icon))',
          surface: 'hsla(var(--secondary-surface))'
        },
        tableColour: {
          DEFAULT: 'hsla(var(--th-colour))',
          selected: 'hsla(var(--td-selected))'
        },
        muted: {
          DEFAULT: 'hsla(var(--muted))',
          foreground: 'hsla(var(--muted-foreground))',
          border: 'hsla(var(--muted-border))'
        },
        accent: {
          DEFAULT: 'hsla(var(--accent))',
          foreground: 'hsla(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsla(var(--destructive))',
          foreground: 'hsla(var(--destructive-foreground))',
          bg: 'hsla(var(--destructive-bg))',
          border: 'hsla(var(--destructive-border))',
          icon: 'hsla(var(--destructive-icon))',
          surface: 'hsla(var(--destructive-surface))'
        },
        disabled: {
          DEFAULT: 'hsla(var(--disabled))',
          foreground: 'hsla(var(--disabled-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      animation: {
        blink: 'blink 1s step-start infinite'
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries')]
} satisfies Config
