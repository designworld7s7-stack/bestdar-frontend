import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#0A0A0A",
        premium: {
          green: "#1B4332",
        },
      },
      boxShadow: {
        soft: "0 2px 12px 0 rgba(27, 67, 50, 0.08)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black'),
            a: { color: theme('colors.premium.green') },
            h1: { color: theme('colors.black') },
            h2: { color: theme('colors.black') },
            h3: { color: theme('colors.black') },
            h4: { color: theme('colors.black') },
            h5: { color: theme('colors.black') },
            h6: { color: theme('colors.black') },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
