import type { Metadata } from "next";
import { baiJamjuree, asap, notoSans } from "@/app/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "AiGO - Create Your AI Girlfriend and Start Chatting with NSFW Character",
  description: "",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baiJamjuree.variable} ${asap.variable} ${notoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
