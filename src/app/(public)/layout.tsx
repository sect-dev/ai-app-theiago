import React from 'react';
import DefaultLayout from "@/app/widgets/Layout/DefaultLayout";
import Header from "@/app/widgets/Header";
import Sidebar from "@/app/widgets/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DefaultLayout>
      <Header/>
      <div className="flex flex-1 gap-[0.94vw] h-[calc(100vh-3.59vw)] mt-[3.59vw]">
        <div className="fixed left-0 top-[3.59vw] z-[10] max-w-[15.86vw] w-full ">
          <Sidebar />
        </div>
       <div className="ml-auto overflow-y-auto w-[calc(100vw-15.86vw)] ">
         {children}
       </div>
      </div>

    </DefaultLayout>
  );
};

export default Layout;