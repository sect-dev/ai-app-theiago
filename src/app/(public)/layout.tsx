"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/app/widgets/Layout/DefaultLayout";
import Header from "@/app/widgets/Header";
import Sidebar from "@/app/widgets/Sidebar";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
const ModalsProvider = dynamic(() => import("@/app/providers/ModalsProvider"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});
import MobileNav from "@/app/widgets/Sidebar/MobileNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isMobileChatOpen } = useSelectedCardStore();
  const pathname = usePathname();
  const isChatPage = pathname?.includes("chats");

  return (
    <DefaultLayout>
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <div className="mt-[46px] flex h-[calc(100%-46px)] flex-1 gap-[14px] md:mt-0 md:h-[calc(100%-60px)]">
        <div
          className={clsx(
            "transition-width fixed left-0 top-[46px] z-[10] block h-full w-full max-w-[203px] bg-[#191B2C] duration-300 md:translate-x-[-100%]",
            {
              "max-w-[75px] md:max-w-[203px]": isChatPage,
              "!translate-x-0": isMenuOpen,
            },
          )}
        >
          <Sidebar
            setIsMenuOpen={setIsMenuOpen}
            isChatPage={isChatPage}
            pathname={pathname}
          />
        </div>
        <div
          className={clsx(
            "fixed bottom-[5vw] left-1/2 z-[10] hidden -translate-x-1/2 animate-fadeIn md:block md:rounded-[24px] md:bg-[#121423] md:bg-opacity-50 md:backdrop-blur-[10px]",
            {
              "!hidden": isMobileChatOpen || isMenuOpen,
            },
          )}
        >
          <MobileNav pathname={pathname} />
        </div>
        <div
          className={clsx(
            "transition-width ml-auto w-[calc(100vw-203px)] duration-300 md:w-full",
            {
              "w-[calc(100vw-75px)]": isChatPage,
            },
          )}
        >
          {children}
        </div>
      </div>
      <ModalsProvider />
    </DefaultLayout>
  );
};

export default Layout;
