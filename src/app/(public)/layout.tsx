import React from 'react';
import DefaultLayout from "@/app/widgets/Layout/DefaultLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
};

export default Layout;