import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Most Advanced AI Chats With No Filter | AiGO",
  description: "Explore your deepest desires with AiGO — the #1 free NSFW AI chat. Dive into raw, real, and uncensored adult roleplay today.",
};

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 