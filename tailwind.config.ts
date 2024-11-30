import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NanumSquare', 'sans-serif'],
      },
      colors: {
        primary: '#7C3AED',
        'primary-light': '#EDE9FE',
        'slate': {
          900: '#0F172A',
          700: '#1E293B',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
        'rose': {
          500: '#F43F5E',
        },
        'lime': {
          300: '#BEF264',
        },
        'violet':{
          600:'#7C3AED',
          100:'#EDE9FE',

        },
        'amber': {
          700: '#92400E',
        },
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;