"use client";

import { useAuthStore } from "@/app/shared/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isPremium } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isPremium === false) {
      router.push("/");
    }
  }, [isPremium]);

  return <>{children}</>;
};

export default Layout;
