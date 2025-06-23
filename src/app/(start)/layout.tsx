"use client";
import React, { useEffect } from "react";
import "./styles.css";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";
import Script from "next/script";
import { usePaymentStore } from "../shared/store/paymentStore";
import ModalsProvider from "../providers/ModalsProvider";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "../shared/store/authStore";
import { safeLocalStorage } from "../shared/helpers";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setSuccessPaymentModal, isSuccessPaymentModalActive } =
    usePaymentStore();
  const { user, loading } = useAuthStore();
  const searchParams = useSearchParams();

  console.log("test deplot")

  useEffect(() => {
    const newParam = searchParams.get("new");
    const accessToken = safeLocalStorage.get("accessToken");
    const hasAccessToken = accessToken && accessToken !== "null" && accessToken !== "undefined";

    // Не показываем модалку если в URL есть new=way
    if (newParam === "way") {
      return;
    }

    if (hasAccessToken) {
      return;
    }

    setSuccessPaymentModal({
      isSuccessPaymentModalActive: true,
      successPaymentModalType: "subscription_success",
    });
  }, [user, loading]);

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
