'use client'
import React from 'react';
import Image from "next/image";
import IconMoneyback from '@/../public/images/icons/payment/icon-moneyback.svg';
import {usePaymentStore} from "@/app/shared/store/paymentStore";

const SectionForm = () => {
  const {selectedPlan} = usePaymentStore()
  const currentSearchParams = new URLSearchParams(window.location.search);

  return (
    <div id="form" className="py-[20px] space-y-[24px] fm:py-[5.33vw] sm:space-y-[6.40vw]">
      <div className="w-full h-[400px] rounded-[20px] overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://production-payments.theaigo.com:8000/pre_subscription_purchase?name=${encodeURIComponent(selectedPlan)}&${currentSearchParams}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="animate-fadeIn"
        />
      </div>
      <div className="flex items-center gap-[4px] bg-[#2B2D44] px-[14px] py-[8px] rounded-[12px] fm:py-[2.13vw] fm:px-[3.73vw] fm:gap-[1.07vw] fm:rounded-[3.20vw]">
        <Image
          src={IconMoneyback.src}
          width={IconMoneyback.width}
          height={IconMoneyback.height}
          alt="money back icon"
          className="mt-[5px] fm:mt-[1.33vw] fm:size-[6.40vw]"
        />
        <div>
          <p className="font-bold text-[28px] tracking-[-0,01em] fm:text-[7.47vw]">30 DAYS </p>
          <p className="text-[14px] font-bold tracking-[-0,01em] fm:text-[3.73vw]">Money back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;