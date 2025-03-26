import React from 'react';
import PaymentLoading from "@/app/(payment)/payment/PaymentLoading";
import PaymentError from "@/app/(payment)/payment/PaymentError";
import PaymentExpired from "@/app/(payment)/payment/PaymentExpired";

type PaymentStatus = 'error' | 'loading' | 'expired'

const Page = () => {

  const paymentStatus: PaymentStatus = 'loading'

 const renderContent = () => {
   switch (paymentStatus) {
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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#121423] rounded-[24px] py-[25px] px-[25px] w-[370px] mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Page;