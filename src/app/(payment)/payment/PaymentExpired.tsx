import React from 'react';
import Image from "next/image";
import ImageExpired from "@/../public/images/img/payment/image-payment-expired.webp";

const PaymentExpired = () => {
  return (
    <>
      <Image
        src={ImageExpired.src}
        width={ImageExpired.width}
        height={ImageExpired.height}
        alt="error image"
        className="mx-auto"
      />
      <div className="pt-[32px] text-center space-y-[12px] mb-[34px] max-w-[275px] mx-auto">
        <p className="text-[24px] font-semibold leading-[1.2em]">
          Payment Expired
        </p>
        <p className="text-[17px] font-medium">
          You have not made a payment in the allotted time. Please try again
        </p>
      </div>
      <button className="w-full h-[52px] main-gradient rounded-[12px] text-[15px] font-bold text-center">
        <span className="relative z-[5]">Try again</span>
      </button>
    </>
  );
};

export default PaymentExpired;