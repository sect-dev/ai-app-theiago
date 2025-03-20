'use client'
import React, {useEffect} from 'react';
import DefaultLayout from "@/app/widgets/Layout/DefaultLayout";
import Header from "@/app/widgets/Header";
import Sidebar from "@/app/widgets/Sidebar";
import SidebarMenu from "@/app/widgets/Sidebar/SidebarMenu";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import AuthModal from "@/app/widgets/Modals/AuthModal";
import {signInAnonymouslyHandler} from "@/app/shared/api/auth";
import PaymentModal from "@/app/widgets/Modals/PaymentModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobileChatOpen } = useSelectedCardStore();
  const pathname = usePathname();
  const isChatPage = pathname?.includes('chats');

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      signInAnonymouslyHandler();
    }
  }, []);

  return (
    <DefaultLayout>
      <Header/>
      <div className="flex flex-1 gap-[14px] h-[calc(100%-46px)] mt-[46px] md:mt-0">
        <div className={clsx("block h-full transition-width duration-300 fixed left-0 top-[46px] z-[10] max-w-[203px] w-full md:hidden",{
          "max-w-[75px]": isChatPage
        })}>
          <Sidebar isChatPage={isChatPage} pathname={pathname} />
        </div>
        <div className={clsx("hidden absolute left-1/2 bottom-[5vw] -translate-x-1/2 z-[10] md:block", {
          "!hidden": isMobileChatOpen
        })}>
          <SidebarMenu pathname={pathname} />
        </div>
        <div className={clsx("ml-auto transition-width duration-300 overflow-y-auto overflow-x-hidden w-[calc(100vw-203px)] md:w-full", {
          "w-[calc(100vw-75px)]": isChatPage
        })}>
         {children}
        </div>
      </div>
      <AuthModal />
      <PaymentModal />
    </DefaultLayout>
  );
};

export default Layout;