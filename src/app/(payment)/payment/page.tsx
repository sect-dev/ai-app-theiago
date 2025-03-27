import React from 'react';
import PaymentLoading from "@/app/(payment)/payment/PaymentLoading";
import PaymentError from "@/app/(payment)/payment/PaymentError";
import PaymentExpired from "@/app/(payment)/payment/PaymentExpired";

export type PaymentStatus = 'error' | 'success' | 'expiry'

interface SearchParams {
  action?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const renderContent = (status: PaymentStatus) => {
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
interface ComponentProps {
  searchParams: Promise<{ searchParams: SearchParams; }>;
}

export default async function Page({ searchParams }: ComponentProps) {
  const { action } = await searchParams;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#121423] rounded-[24px] py-[25px] px-[25px] w-[370px] mx-auto">
        {renderContent(action)}
      </div>
    </div>
  );
};