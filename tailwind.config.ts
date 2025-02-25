import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: '1460px' },
      // => @media (max-width: 1527px) { ... }

      md: { max: '1020px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '570px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      fontFamily: {
        'bai-jamjuree': ['var(--font-bai-jamjuree)'],
        'asap': ['var(--font-asap)'],
        'noto-sans': ['var(--font-noto-sans)'],
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(180deg, #049AEF 0%, #0862DC 100%)',
        "card-gradient": "linear-gradient(180deg, rgba(0, 0, 0, 0) 66.81%, rgba(0, 0, 0, 0.35) 85.47%)",
      },
      boxShadow: {
        'card-shadow': '0px 0px 16.1px 0px #086BDF36',
        'text-shadow': '0px 4px 4px 0px #00000070'
     },
      colors: {
        gray: "#9DB2CE",
        white: "#fff",
        blue: '#075AD4',
        background: '#121423',
        skeleton: '#1D1F37'
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
        fadeIn: "fadeIn 0.3s ease-in-out forwards"
      },
    },
  },
  plugins: [],
} satisfies Config;
