/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "color-50": "var(--color-50)",
        "color-100": "var(--color-100)",
        "color-200": "var(--color-200)",
        "color-300": "var(--color-300)",
        "color-400": "var(--color-400)",
        "color-500": "var(--color-500)",
        "color-600": "var(--color-600)",
        "color-700": "var(--color-700)",
        "color-800": "var(--color-800)",
        "color-900": "var(--color-900)",

        "purple": "var(--purple)",
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      width: ['group-hover'],
      opacity: ['group-hover'],
      scale: ['group-hover'],
      textColor: ['group-hover'],
    }
  }
};
