import React from "react";
import "./styles.css";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";
import Script from 'next/script';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-[#121423] font-bai-jamjuree">
      <div className="fm:hidden">
        <PaymentDiscountBanner />
      </div>
      {children}
      <Script src="https://assets.vivapay.me/v1.0.7/js/vivapay.js" strategy="afterInteractive" />
    </main>
  );
};

export default Layout;
