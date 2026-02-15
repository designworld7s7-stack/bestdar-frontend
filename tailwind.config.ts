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
      // قمنا بإزالة (theme) واستبدال الألوان بقيم مباشرة لحل الخطأ
      typography: {
        DEFAULT: {
          css: {
            color: "#0A0A0A",
            a: { color: "#1B4332" },
            h1: { color: "#0A0A0A" },
            h2: { color: "#0A0A0A" },
            h3: { color: "#0A0A0A" },
            h4: { color: "#0A0A0A" },
            h5: { color: "#0A0A0A" },
            h6: { color: "#0A0A0A" },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config