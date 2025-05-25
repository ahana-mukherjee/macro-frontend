/**  @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // violet-500
          hover: '#7C3AED', // violet-600
          light: '#A78BFA', // violet-400
          dark: '#6D28D9', // violet-700
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          hover: '#059669', // emerald-600
          light: '#34D399', // emerald-400
          dark: '#047857', // emerald-700
        },
        dark: {
          DEFAULT: '#1F1F23', // main background
          lighter: '#2D2D35', // lighter background (cards, etc)
          lightest: '#3D3D46', // inputs, highlighted areas
          border: '#4D4D56', // borders
        },
        light: {
          DEFAULT: '#F9FAFB', // main text
          muted: '#D1D5DB', // muted text
          subtle: '#9CA3AF', // very muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}