'use client'
import React, {useState} from 'react';
import Image from "next/image";
import IconAlert from '@/../public/images/icons/icon-alert.svg';
import IconCheck from '@/../public/images/icons/icon-check.svg';
import CountDownTimer from "@/app/widgets/CountDownTimer";

const PaymentDiscountBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="animate-fadeIn relative bg-[#191B2C] banner-bg w-full py-[5px] ">
      <div className="flex justify-center items-center gap-[8px]">
        <Image
          src={IconAlert.src}
          width={IconAlert.width}
          height={IconAlert.height}
          alt="icon alert"
        />
        <p className="text-[12px] font-bai-jamjuree font-semibold">
          Your discount is valid for 5 minutes.
        </p>
        <div className="flex items-center h-[24px] gap-[4px] bg-[#121423] px-[7px] rounded-[7px]">
          <Image
            src={IconCheck.src}
            width={IconCheck.width}
            height={IconCheck.height}
            alt="icon check"
          />
          <span className="uppercase text-[12px] font-bai-jamjuree font-semibold">code312</span>
        </div>
        <CountDownTimer setIsVisible={setIsVisible} isVisible={isVisible} />
      </div>
    </div>
  );
};

export default PaymentDiscountBanner;