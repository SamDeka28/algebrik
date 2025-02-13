import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        "plus-jakarta": ["var(--font-plus-jakarta-sans)", "sans-serif"],
        "bebas-neue": ["var(--font-bebas-neue)", "sans-serif"],
        "inter": ["var(--font-inter)", ""],
      },
    },
  },
  plugins: [],
} satisfies Config;
