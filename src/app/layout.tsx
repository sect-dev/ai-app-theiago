import type { Metadata } from "next";
import { baiJamjuree, asap, notoSans } from "@/app/fonts/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import FacebookPixel from "./shared/components/FbPixelComponent";
import YandexMetrikaContainer from "./shared/components/YandexMetrikaComponent";

export const metadata: Metadata = {
  title:
    "AiGO - Create AI Companions and Explore Your Digital Fantasy World",
  description: "",
  icons: {
    icon: "/icon.ico",
  },
};

//TODO: make an independent component for analytics

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmToken = process.env.NEXT_PUBLIC_GOOGLE_TAG;
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} ${asap.variable} ${notoSans.variable} antialiased`}
      >
        {gtmToken && <GoogleTagManager gtmId={gtmToken} />}
        <FacebookPixel />
        <YandexMetrikaContainer />
        {children}
      </body>
    </html>
  );
}
