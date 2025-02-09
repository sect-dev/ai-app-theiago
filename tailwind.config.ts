import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bai-jamjuree': ['var(--font-bai-jamjuree)'],
        'asap': ['var(--font-asap)'],
        'noto-sans': ['var(--font-noto-sans)'],
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(180deg, #049AEF 0%, #0862DC 100%)',
      },
      boxShadow: {
        'card-shadow': '0px 0px 16.1px 0px #086BDF36',
      },
      colors: {
        gray: "#9DB2CE",
        white: "#fff",
        blue: '#075AD4',
        background: '#121423'
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s linear forwards"
      },
    },
  },
  plugins: [],
} satisfies Config;
