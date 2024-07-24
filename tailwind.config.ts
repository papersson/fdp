import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EB3C27', // Red for buttons and important elements
          hover: '#D63622', // Darker red for hover states
        },
        bg: {
          main: '#F0F4F8', // Light blue-gray for main background
          secondary: '#E2E8F0', // Slightly darker for secondary areas
          tertiary: '#D1DAEA', // Even darker for tertiary areas
        },
        text: {
          primary: '#2D3748', // Dark gray for primary text
          secondary: '#4A5568', // Medium gray for secondary text
        },
        border: '#CBD5E0', // Light gray for borders
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'], // Different font for headings
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config