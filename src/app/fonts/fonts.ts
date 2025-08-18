import { Bai_Jamjuree, Asap, Noto_Sans } from "next/font/google";

export const baiJamjuree = Bai_Jamjuree({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-bai-jamjuree",
	display: "swap"
});

export const asap = Asap({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-asap",
	display: "swap"
});

export const notoSans = Noto_Sans({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-noto-sans",
	display: "swap"
});
