"use client";
import React, { useEffect } from "react";
import "./styles.css";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";
import Script from "next/script";
import { usePaymentStore } from "../shared/store/paymentStore";
import ModalsProvider from "../providers/ModalsProvider";
import { useSearchParams } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setSuccessPaymentModal, isSuccessPaymentModalActive } =
    usePaymentStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newParam = searchParams.get("new");

    // Не показываем модалку если в URL есть new=way
    if (newParam === "way") {
      return;
    }

    setSuccessPaymentModal({
      isSuccessPaymentModalActive: true,
      successPaymentModalType: "subscription_success",
    });
  }, []);

  return (
    <main className="bg-[#121423] font-bai-jamjuree">
      {/* <div className="fm:hidden">
        <PaymentDiscountBanner />
      </div> */}
      {children}
      <Script
        src="https://assets.vivapay.me/v1.0.7/js/vivapay.js"
        strategy="afterInteractive"
      />
      <ModalsProvider />
    </main>
  );
};

export default Layout;
