import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		screens: {
			xl: { max: "1460px" },
			// => @media (max-width: 1527px) { ... }

			lg: { max: "1280px" },

			lgm: { max: "1279px" },

			md: { max: "1020px" },
			// => @media (max-width: 767px) { ... }

			fm: { max: "770px" },

			sm: { max: "570px" },

			xs: { max: "375px" }
			// => @media (max-width: 639px) { ... }
		},
		extend: {
			fontFamily: {
				"bai-jamjuree": ["var(--font-bai-jamjuree)"],
				asap: ["var(--font-asap)"],
				"noto-sans": ["var(--font-noto-sans)"]
			},
			backgroundImage: {
				"main-gradient": "linear-gradient(180deg, #049AEF 0%, #0862DC 100%)",
				"card-gradient":
					"linear-gradient(180deg, rgba(0, 0, 0, 0) 66.81%, rgba(0, 0, 0, 0.35) 85.47%)",
				"white-gradient":
					"linear-gradient(246.16deg, rgba(217, 217, 217, 0.38) 9.56%, rgba(217, 217, 217, 0) 85.17%)",
				"button-gradient": `linear-gradient(95.62deg, #8E59FF 9.06%, #B659FF 104.43%), linear-gradient(180deg, #9208FF 0%, #B009FF 100%)`,
				"red-gradient": "linear-gradient(180deg, #F80C2B 0%, #D6001C 100%)",
				"light-red-gradient":
					"linear-gradient(95.62deg, #FF595C 9.06%, #FF595C 104.43%)",
				"blue-button-gradient": `linear-gradient(0deg, #007AFF, #007AFF), linear-gradient(180deg, #049AEF 0%, #0862DC 100%)`,
				"pink-card-gradient": `linear-gradient(0deg, rgba(43, 45, 68, 0.3)), linear-gradient(0deg, rgba(43,45,68,0.6), rgba(43,45,68,0.3)), linear-gradient(112.03deg, rgba(155,80,252,0.5) 5.42%, transparent 96.07%)`,
				"blue-card-gradient":
					"linear-gradient(0deg, rgba(43, 45, 68, 0.3)), linear-gradient(112.03deg, rgba(4, 154, 239, 0.3) 5.42%, rgba(8, 98, 220, 0) 96.07%)",
				"menu-separator":
					"linear-gradient(0deg, rgba(142, 89, 255, 1)), linear-gradient(0deg, rgba(182, 89, 255, 1))",
				"purple-text-gradient":
					"linear-gradient(180deg, #9208FF 0%, #B009FF 100%)",
				"blue-text-gradient":
					"linear-gradient(180deg, #049AEF 0%, #0862DC 100%)",
				"multi-purple-gradient":
					"linear-gradient(180deg, #5810FF 0%, #9037F0 100%), linear-gradient(180deg, #049AEF 0%, #0862DC 100%), linear-gradient(180deg, #9208FF 0%, #B009FF 100%)",
				"card-bottom-blue-gradient":
					"linear-gradient(180deg, rgba(44, 51, 85, 0) 0%, rgba(44, 51, 85, 0.02) 28.96%, rgba(44, 51, 85, 0.53) 45%, #2C3355 62.29%)",
				"blue-layered-gradient":
					"linear-gradient(112.03deg, rgba(4, 154, 239, 0.3) 5.42%, rgba(8, 98, 220, 0) 96.07%)",
				"red-text-gradient":
					"linear-gradient(180deg, #FD4F42 0%, #E0160E 100%)",
				"inactive-card-gradient":
					"linear-gradient(180deg, rgba(0, 0, 0, 0) 42.51%, rgba(0, 0, 0, 0.5) 77.39%)"
			},
			boxShadow: {
				"card-shadow": "0px 4px 18.4px 0px rgba(162, 90, 255, 0.42)",
				"text-shadow": "0px 4px 4px 0px #00000070",
				"pink-shadow": "0px 4px 18.4px 0px #A25AFF6B",
				"blue-shadow": "0px 4px 18.4px 0px rgba(5, 142, 235, 0.5)",
				"purple-safe-payment-shadow": "0px 4px 14px 0px #373AF054",
				"white-shadow": "0px 0px 14.9px 0px #FFFFFFEB"
			},
			colors: {
				gray: "#9DB2CE",
				white: "#fff",
				blue: "#075AD4",
				background: "#121423",
				skeleton: "#1D1F37"
			},
			keyframes: {
				fadeIn: {
					"0%": {
						opacity: "0"
					},
					"100%": {
						opacity: "1"
					}
				}
			},
			animation: {
				fadeIn: "fadeIn 0.3s ease-in-out forwards"
			}
		}
	},
	plugins: []
} satisfies Config;
