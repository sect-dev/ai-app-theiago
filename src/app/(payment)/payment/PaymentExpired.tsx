import React from "react";
import Image from "next/image";
import ImageExpired from "@/../public/images/img/payment/image-payment-expired.webp";
import Link from "next/link";

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
      <div className="mx-auto mb-[34px] max-w-[275px] space-y-[12px] pt-[32px] text-center">
        <p className="text-[24px] font-semibold leading-[1.2em]">
          Payment Expired
        </p>
        <p className="text-[17px] font-medium">
          You have not made a payment in the allotted time. Please try again
        </p>
      </div>
      <Link
        href="/paywall"
        className="main-gradient flex h-[52px] w-full items-center justify-center rounded-[12px] text-center text-[15px] font-bold"
      >
        <span className="relative z-[5]">Try again</span>
      </Link>
    </>
  );
};

export default PaymentExpired;
