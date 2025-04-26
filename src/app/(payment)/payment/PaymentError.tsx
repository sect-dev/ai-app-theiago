import React from "react";
import Image from "next/image";
import ImageError from "@/../public/images/img/payment/image-payment-error.webp";

const PaymentError = () => {
  return (
    <>
      <Image
        src={ImageError.src}
        width={ImageError.width}
        height={ImageError.height}
        alt="error image"
        className="mx-auto"
      />
      <div className="pt-[32px] text-center space-y-[12px] mb-[34px] max-w-[275px] mx-auto">
        <p className="text-[24px] font-semibold leading-[1.2em]">
          Payment Cancelled
        </p>
        <p className="text-[17px] font-medium">
          We were unable to process this payment, please try again
        </p>
      </div>
      <button className="w-full h-[52px] main-gradient rounded-[12px] text-[15px] font-bold text-center">
        <span className="relative z-[5]">Try again</span>
      </button>
    </>
  );
};

export default PaymentError;
