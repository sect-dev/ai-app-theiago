import type { Metadata } from "next";
import { baiJamjuree, asap, notoSans } from "@/app/fonts/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import FacebookPixel from "./shared/components/FbPixelComponent";
import YandexMetrikaContainer from "./shared/components/YandexMetrikaComponent";
import AmplitudeAnalytics from "./shared/components/AmplitudeComponent";
import { I18nProvider } from "@/i18n/provider";
import { getLocale } from "next-intl/server";
import TrackdeskComponent from "./shared/components/TrackDeskComponent";

export const metadata: Metadata = {
  title: "AiGO - Create AI Companions and Explore Your Digital Fantasy World",
  description:
    "AiGO - Create AI Companions and Explore Your Digital Fantasy World",
  icons: {
    icon: "/icon.ico",
  },
};

//TODO: make an independent component for analytics

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmToken = process.env.NEXT_PUBLIC_GOOGLE_TAG;
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body
        className={`${baiJamjuree.variable} ${asap.variable} ${notoSans.variable} antialiased`}
      >
        <AmplitudeAnalytics />
        {gtmToken && <GoogleTagManager gtmId={gtmToken} />}
        <FacebookPixel />
        <YandexMetrikaContainer />
        <TrackdeskComponent />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
