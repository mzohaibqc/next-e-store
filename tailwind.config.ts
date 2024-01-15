import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        grey: 'var(--grey)',
        'dark-grey': 'var(--dark-grey)',
        'soft-grey': 'var(--soft-grey)',
      },
    },
  },
  plugins: [],
};
export default config;
