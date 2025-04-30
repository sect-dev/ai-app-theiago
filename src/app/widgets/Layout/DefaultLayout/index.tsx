import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="font-bai-jamjuree h-[100svh] overflow-visible">
      {children}
    </main>
  );
};

export default DefaultLayout;
