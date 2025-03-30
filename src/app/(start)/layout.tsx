import React from 'react';
import './styles.css'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="font-bai-jamjuree bg-[#121423] ">
      {children}
    </main>
  );
};

export default Layout;