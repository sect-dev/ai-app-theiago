"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import ImageArrow from "@/../public/images/icons/icon-payment-arrow.svg";
import IconExpand from "@/../public/images/icons/icon-expand-white.svg";
import { PaymentPlan } from "@/app/shared/api/payment";
import { calculateCostPerDay } from "@/app/shared/helpers";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import Spinner from "@/app/widgets/Spinner";
import * as fbq from "@/app/shared/lib/fbPixel";
import ym from "react-yandex-metrika";
import { trackBuyButtonClick } from "@/app/shared/helpers/clickTracker";
import { usePaywallStore } from "@/app/shared/store/paywallStore";
import * as amplitude from '@amplitude/analytics-browser';

const additionalInfo = [
  "💬 Unlimited dialogues on any topics",
  "🔥 300 photos in any poses",
  "🍓 NSFW support for 18+ users",
  "❤️ Create your own girlfriends",
  "💕️ Video and audio content",
];

interface ComponentProps {
  paymentPlans: PaymentPlan[];
}

const SectionPlans: FC<ComponentProps> = ({ paymentPlans }) => {
  const { setPlan, selectedPlan } = usePaymentStore();
  const { setPrice, price } = usePaywallStore();
  const [selectedPrice, setSelectedPrice] = useState<PaymentPlan | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (paymentPlans && paymentPlans.length > 0) {
      setSelectedPrice(paymentPlans[1]);
      setPlan(paymentPlans[1].id ?? "1_month_premium_access");
    }
  }, []);

  useEffect(() => {
    if (!selectedPlan || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    if (apiBase) {
      const fullUrl = `${apiBase}/pre_subscription_purchase?name=${encodeURIComponent(selectedPlan)}&${params.toString()}`;
      setIframeUrl(fullUrl);
    }
  }, [selectedPlan]);

  console.log(selectedPlan);

  const paymentHandle = async (item: PaymentPlan) => {
    setSelectedPrice(item);
    sendGTMEvent({ event: "switch_plan_click", type: `${selectedPrice?.id}` });
    setPlan(item.id ?? paymentPlans[1].id ?? "1_month_premium_access");
    setPrice(item.amount_recurring);
    ym("reachGoal", "switch_plan_click", {
      placement: "quiz",
      type: `${selectedPrice?.id}`,
    });
    amplitude.track("switch_plan_click", {
      placement: "quiz",
      type: `${selectedPrice?.id}`,
    });
  };

  const handleClickBuy = async () => {
    await trackBuyButtonClick();

    sendGTMEvent({
      event: "paywall_buy",
      placement: "quiz",
      product_name: selectedPrice?.id,
    });
    fbq.event("InitiateCheckout");
    ym("reachGoal", "paywall_buy", {
      placement: "quiz",
      product_name: selectedPrice?.id,
    });
    amplitude.track("paywall_buy", {
      placement: "quiz",
      product_name: selectedPrice?.id,
      domain: window.location.hostname,
    });
  };

  return (
    <div>
      <div className="mb-[24px] space-y-[12px]">
        {paymentPlans.map((item) => {
          const days = item.interval_length * 30;
          const fullPricePerDay = calculateCostPerDay(
            +item.amount_recurring,
            days,
          );
          const discountPricePerDay = calculateCostPerDay(
            +item.amount_initial,
            days,
          );
          const firstLetterDiscountPrice = fullPricePerDay
            .toString()
            .split(".")[0];
          const discountPriceWithoutFirstLetter = discountPricePerDay
            .toString()
            .split(".")[1];
          return (
            <div
              onClick={() => paymentHandle(item)}
              key={item.id}
              className={clsx(
                "init-page-gradient-border relative cursor-pointer rounded-[16px] bg-[#2B2D44] p-[16px] before:z-[1] before:rounded-[16px] before:opacity-0 hover:shadow-card-shadow hover:before:opacity-100 fm:rounded-[4.27vw] fm:p-[4.27vw] fm:before:rounded-[4.27vw]",
                {
                  "shadow-card-shadow before:opacity-100":
                    selectedPrice?.id === item.id,
                },
              )}
            >
              <div
                className={clsx("flex items-center justify-between", {
                  "pt-[12px] fm:pt-[3.20vw]": selectedPrice?.id === item.id,
                })}
              >
                <div>
                  <p className="text-[16px] font-semibold leading-[1.5em] fm:text-[4.27vw]">
                    {item.interval_length} {item.interval_unit}
                  </p>
                  <div className="flex items-center gap-[4px] font-asap text-[12px] fm:gap-[1.07vw] fm:text-[3.20vw]">
                    <p className="relative">
                      <span className="uppercase opacity-40">
                        {item.currency} {item.amount_recurring}
                      </span>
                      <span className="absolute left-0 top-1/2 z-[5] h-[2px] w-full -translate-y-1/2 bg-button-gradient" />
                    </p>
                    <Image
                      src={ImageArrow.src}
                      width={ImageArrow.width}
                      height={ImageArrow.height}
                      alt="arrow"
                    />
                    <p>
                      <span className="uppercase opacity-40">
                        {item.currency} {item.amount_initial}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-[6px] font-asap leading-[1.5em] fm:gap-[1.60vw]">
                  <p className="flex items-center gap-[4px]">
                    <span className="text-[12px] font-semibold uppercase fm:text-[3.20vw]">
                      {item.currency}
                    </span>
                    <span className="relative text-[12px] fm:text-[3.20vw]">
                      <span className="opacity-40">{fullPricePerDay}</span>
                      <span className="absolute left-0 top-1/2 z-[5] h-[2px] w-full -translate-y-1/2 bg-button-gradient" />
                    </span>
                  </p>
                  <p>
                    <span className="text-[12px] font-semibold leading-[1.3em] fm:text-[3.20vw]">
                      <span className="text-[24px] fm:text-[6.40vw]">
                        {firstLetterDiscountPrice}
                      </span>
                      <span>,{discountPriceWithoutFirstLetter}</span>
                    </span>
                    <span className="text-[12px] opacity-40 fm:text-[3.20vw]">
                      {" "}
                      / day
                    </span>
                  </p>
                </div>
              </div>
              <div className="pt-[12px] fm:pt-[3.20vw]">
                <button className="flex w-full items-center justify-between font-asap text-[13px] fm:text-[3.47vw]">
                  Learn more
                  <Image
                    src={IconExpand.src}
                    width={IconExpand.width}
                    height={IconExpand.height}
                    alt="icon arrow"
                    className="fm:h-[3.20vw] fm:w-[6.40vw]"
                  />
                </button>
                {selectedPrice?.id === item.id && (
                  <div className="animate-fadeIn">
                    <ul className="space-y-[6px] py-[12px] fm:space-y-[1.60vw] fm:py-[3.20vw]">
                      {additionalInfo.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="text-[14px] font-medium fm:text-[3.73vw]"
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                    {!iframeUrl ? (
                      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white">
                        <Spinner className="h-8 w-8" />
                      </div>
                    ) : (
                      <Link
                        href={iframeUrl}
                        onClick={handleClickBuy}
                        className="relative flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-button-gradient text-center text-white disabled:opacity-50 fm:h-[16vw] fm:rounded-[6.40vw]"
                      >
                        <span className="font-noto-sans text-[14px] font-bold uppercase fm:text-[3.73vw]">
                          get your girlfriend
                        </span>
                        <span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
                      </Link>
                    )}

                    <p className="pt-[12px] text-center text-[12px] font-bold fm:pt-[3.20vw] fm:text-[3.20vw]">
                      🔥 65,756 people received a girlfriend this week. 🔥
                    </p>
                  </div>
                )}
              </div>
              {item.id === selectedPrice?.id && (
                <div className="absolute left-0 top-0 flex h-[17px] w-full animate-fadeIn items-center justify-center rounded-t-[16px] bg-button-gradient fm:h-[4.53vw] fm:rounded-t-[4.27vw]">
                  <span className="text-[11px] font-bold uppercase fm:text-[2.93vw]">
                    most popular
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionPlans;
