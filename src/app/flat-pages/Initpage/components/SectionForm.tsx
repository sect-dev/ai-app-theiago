"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconMoneyback from "@/../public/images/icons/payment/icon-moneyback.svg";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import Spinner from "@/app/widgets/Spinner";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";

const SectionForm = () => {
  const { selectedPlan } = usePaymentStore();
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPlan || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    if (apiBase) {
      const fullUrl = `${apiBase}/pre_subscription_purchase?name=${encodeURIComponent(selectedPlan)}&${params.toString()}`;
      setIframeUrl(fullUrl);
    }
  }, [selectedPlan]);

  // const handleOnLoad = () => {
  //   sendGTMEvent({ event: "iframe_up" });
  // };

  return (
    <div
      id="form"
      className="space-y-[24px] py-[20px] fm:py-[5.33vw] sm:space-y-[6.40vw]"
    >
      <div className="">
        {!iframeUrl ? (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <Link
            href={iframeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-button-gradient text-center text-white disabled:opacity-50 fm:h-[16vw] fm:rounded-[6.40vw]"
          >
            <span className="font-noto-sans text-[14px] font-bold uppercase fm:text-[3.73vw]">
              complete checkout
            </span>
            <span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
          </Link>
        )}
      </div>

      <div className="flex items-center gap-[4px] rounded-[12px] bg-[#2B2D44] px-[14px] py-[8px] fm:gap-[1.07vw] fm:rounded-[3.20vw] fm:px-[3.73vw] fm:py-[2.13vw]">
        <Image
          src={IconMoneyback.src}
          width={IconMoneyback.width}
          height={IconMoneyback.height}
          alt="money back icon"
          className="mt-[5px] fm:mt-[1.33vw] fm:size-[6.40vw]"
        />
        <div>
          <p className="text-[28px] font-bold tracking-[-0,01em] fm:text-[7.47vw]">
            30 DAYS{" "}
          </p>
          <p className="text-[14px] font-bold tracking-[-0,01em] fm:text-[3.73vw]">
            Money back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
