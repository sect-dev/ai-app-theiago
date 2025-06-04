"use client";

import { useAuthStore } from "@/app/shared/store/authStore";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPremium } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isPremium === false || isPremium === null) {
      router.push("/");
    }
  }, [isPremium]);

  return (
    <>
      {children}
      <Script
        src="https://assets.vivapay.me/v1.0.7/js/vivapay.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default Layout;
