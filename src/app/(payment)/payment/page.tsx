'use client'
import React from 'react';
import PaymentLoading from "@/app/(payment)/payment/PaymentLoading";
import PaymentError from "@/app/(payment)/payment/PaymentError";
import PaymentExpired from "@/app/(payment)/payment/PaymentExpired";
import {useSearchParams} from "next/navigation";

export type PaymentStatus = 'error' | 'success' | 'expiry' 

const renderContent = (status: PaymentStatus | null) => {
  if (status === null) {
    return <PaymentLoading status={status} />
  }

  switch (status) {
    case "success":
      return <PaymentLoading status={status} />
    case "error":
      return <PaymentError />
    case "expiry":
      return <PaymentExpired />
    default:
      return <PaymentLoading status={status} />
  }
}

const Page = () => {
  const searchParams = useSearchParams()
  const action = searchParams.get('action') as PaymentStatus | null
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#121423] rounded-[24px] py-[25px] px-[25px] w-[370px] mx-auto">
        {renderContent(action)}
      </div>
    </div>
  );
};

export default Page