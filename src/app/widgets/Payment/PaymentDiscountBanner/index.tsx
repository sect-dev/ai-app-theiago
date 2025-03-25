'use client'
import React, {FC, useState} from 'react';
import Image from "next/image";
import IconAlert from '@/../public/images/icons/icon-alert.svg';
import IconCheck from '@/../public/images/icons/icon-check.svg';
import CountDownTimer from "@/app/widgets/CountDownTimer";
import clsx from "clsx";

interface ComponentProps {
  isMobileVersion?: boolean
}

const PaymentDiscountBanner:FC<ComponentProps> = ({isMobileVersion}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={clsx("animate-fadeIn relative bg-[#191B2C] banner-bg w-full py-[5px]", {
      "bg-[#8F59FF4F] rounded-[24px] overflow-hidden !py-[12px] px-[16px] !pb-[16px]": isMobileVersion
    })}>
      <span className={clsx("hidden", {
        "!block bg-[#121423] size-[32px] rounded-full absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2": isMobileVersion
      })} />
      <span className={clsx("hidden", {
        "!block bg-[#121423] size-[32px] rounded-full absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2": isMobileVersion
      })} />
      <div className={clsx("flex justify-center items-center gap-[8px]", {
        "flex-col justify-start": isMobileVersion
      })}>
        <div className="flex items-center gap-[5px]">
          <Image
            src={IconAlert.src}
            width={IconAlert.width}
            height={IconAlert.height}
            alt="icon alert"
            className={clsx("", {"size-[24px] shrink-0": isMobileVersion})}
          />
          <p className={clsx("text-[12px] font-bai-jamjuree font-semibold", {
            "text-[16px] font-semibold leading-[1.5em]": isMobileVersion
          })}>
            Your discount is valid for 5 minutes.
            <span className={clsx("hidden", {"!block": isMobileVersion})}>Then <span className="">your girlfriend will disappear</span></span>
          </p>
        </div>
        <div className={clsx("flex items-center gap-[8px]", {
          "pt-[24px] mt-[12px] border-t border-[#8E59FF]": isMobileVersion
        })}>
          <div className={clsx("flex items-center h-[24px] gap-[4px] bg-[#121423] px-[7px] rounded-[7px]", {
            "order-[2] h-[45px] px-[12px] !bg-[#121423] w-[173px]": isMobileVersion
          })}>
            <Image
              src={IconCheck.src}
              width={IconCheck.width}
              height={IconCheck.height}
              alt="icon check"
              className={clsx("",{"size-[16px]": isMobileVersion})}
            />
            <span className={clsx("uppercase text-[12px] font-bai-jamjuree font-semibold", {
              "text-white text-[16px] font-semibold": isMobileVersion
            })}>code312</span>
          </div>
          <CountDownTimer setIsVisible={setIsVisible} isVisible={isVisible} className="text-white text-[22px] h-[45px] px-[25px] before:opacity-0 !bg-red-gradient" />
        </div>
      </div>
    </div>
  );
};

export default PaymentDiscountBanner;