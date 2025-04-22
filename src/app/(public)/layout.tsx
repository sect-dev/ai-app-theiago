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
      <div className="flex flex-1 gap-[14px] h-[calc(100%-46px)] mt-[46px] md:h-[calc(100%-60px)] md:mt-0">
        <div
          className={clsx(
            "block h-full bg-[#191B2C] transition-width duration-300 fixed left-0 top-[46px] z-[10] max-w-[203px] w-full md:translate-x-[-100%]",
            {
              "max-w-[75px] md:max-w-[203px]": isChatPage,
              "!translate-x-0": isMenuOpen,
            }
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
            "hidden animate-fadeIn absolute left-1/2 bottom-[5vw] -translate-x-1/2 z-[10] md:block md:rounded-[24px] md:backdrop-blur-[10px] md:bg-opacity-50 md:bg-[#121423]",
            {
              "!hidden": isMobileChatOpen || isMenuOpen,
            }
          )}
        >
          <MobileNav pathname={pathname} />
        </div>
        <div
          className={clsx(
            "ml-auto transition-width duration-300 w-[calc(100vw-203px)] md:w-full",
            {
              "w-[calc(100vw-75px)]": isChatPage,
            }
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
