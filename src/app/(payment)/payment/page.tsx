"use client";
import React, { Suspense } from "react";
import PaymentLoading from "@/app/(payment)/payment/PaymentLoading";
import PaymentError from "@/app/(payment)/payment/PaymentError";
import PaymentExpired from "@/app/(payment)/payment/PaymentExpired";
import { useSearchParams } from "next/navigation";

export type PaymentStatus = "error" | "success" | "expiry" | "sale";

const PaymentContent = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const action = params.action;
  const status: PaymentStatus =
    action && ["error", "success", "expiry", "sale"].includes(action)
      ? (action as PaymentStatus)
      : "sale";

  switch (status) {
    case "success":
      return <PaymentLoading status={status} />;
    case "error":
      return <PaymentError />;
    case "expiry":
      return <PaymentExpired />;
    default:
      return <PaymentLoading status="sale" />;
  }
};

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-[370px] rounded-[24px] bg-[#121423] px-[25px] py-[25px]">
        <Suspense fallback={<PaymentLoading status="sale" />}>
          <PaymentContent />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
