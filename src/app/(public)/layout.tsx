import React from 'react';
import DefaultLayout from "@/app/widgets/Layout/DefaultLayout";
import Header from "@/app/widgets/Header";
import Sidebar from "@/app/widgets/Sidebar";
import SidebarMenu from "@/app/widgets/Sidebar/SidebarMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DefaultLayout>
      <Header/>
      <div className="flex flex-1 gap-[0.94vw] h-[calc(100vh-3.59vw)] mt-[3.59vw] sm:mt-0">
        <div className="block fixed left-0 top-[3.59vw] z-[10] max-w-[15.86vw] w-full sm:hidden">
          <Sidebar />
        </div>
        <div className="hidden absolute left-1/2 bottom-[5vw] -translate-x-1/2 z-[10] sm:block">
          <SidebarMenu />
        </div>
        <div className="ml-auto overflow-y-auto w-[calc(100vw-15.86vw)] sm:w-full">
         {children}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Layout;