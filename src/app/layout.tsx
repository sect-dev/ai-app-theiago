import type { Metadata } from "next";
import { baiJamjuree, asap, notoSans } from "@/app/fonts/fonts";
import { GoogleTagManager } from '@next/third-parties/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "AiGO - Create Your AI Girlfriend and Start Chatting with NSFW Character",
  description: "",
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({children,
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
      {children}
      </body>
    </html>
  );
}
