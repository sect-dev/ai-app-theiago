import React,{FC} from 'react';
import PaymentLoading from "@/app/(payment)/payment/PaymentLoading";
import PaymentError from "@/app/(payment)/payment/PaymentError";
import PaymentExpired from "@/app/(payment)/payment/PaymentExpired";

type PaymentStatus = 'error' | 'loading' | 'expired'

interface ComponentProps {
  paymentStatus: PaymentStatus
}

const renderContent = (status: PaymentStatus) => {
  switch (status) {
    case "loading":
      return <PaymentLoading />
    case "error":
      return <PaymentError />
    case "expired":
      return <PaymentExpired />
    default:
      return <PaymentLoading />
  }
}
interface ComponentProps {
  params: Promise<{ paymentStatus: PaymentStatus; }>;
}

export default async function Page({ params }: ComponentProps) {
  const { paymentStatus } = await params;
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#121423] rounded-[24px] py-[25px] px-[25px] w-[370px] mx-auto">
        {renderContent(paymentStatus)}
      </div>
    </div>
  );
};