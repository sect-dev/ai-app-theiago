"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import IconAlert from "@/../public/images/icons/icon-alert.svg";
import IconCheck from "@/../public/images/icons/icon-check.svg";
import CountDownTimer from "@/app/widgets/CountDownTimer";
import clsx from "clsx";

interface ComponentProps {
  isMobileVersion?: boolean;
}

const PaymentDiscountBanner: FC<ComponentProps> = ({ isMobileVersion }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "animate-fadeIn relative bg-[#191B2C] banner-bg w-full py-[5px]",
        {
          "bg-[#8F59FF4F] rounded-[6.40vw] overflow-hidden !py-[3.20vw] px-[4.27vw] !pb-[4.27vw]":
            isMobileVersion,
        },
      )}
    >
      <span
        className={clsx("hidden", {
          "!block bg-[#121423] size-[8.53vw] rounded-full absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2":
            isMobileVersion,
        })}
      />
      <span
        className={clsx("hidden", {
          "!block bg-[#121423] size-[8.53vw] rounded-full absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2":
            isMobileVersion,
        })}
      />
      <div
        className={clsx("flex justify-center items-center gap-[8px]", {
          "flex-col justify-start gap-[2.13vw]": isMobileVersion,
        })}
      >
        <div className="flex items-center gap-[5px]">
          <Image
            src={IconAlert.src}
            width={IconAlert.width}
            height={IconAlert.height}
            alt="icon alert"
            className={clsx("", { "size-[6.40vw] shrink-0": isMobileVersion })}
          />
          <p
            className={clsx("text-[12px] font-bai-jamjuree font-semibold", {
              "text-[4.27vw] font-semibold leading-[1.5em]": isMobileVersion,
            })}
          >
            Your discount is valid for 5 minutes.
            <span className={clsx("hidden", { "!block": isMobileVersion })}>
              Then <span className="">your girlfriend will disappear</span>
            </span>
          </p>
        </div>
        <div
          className={clsx("flex items-center gap-[8px]", {
            "pt-[6.40vw] mt-[3.20vw] gap-[2.13vw] border-t border-[#8E59FF]":
              isMobileVersion,
          })}
        >
          <div
            className={clsx(
              "flex items-center h-[24px] gap-[4px] bg-[#121423] px-[7px] rounded-[7px]",
              {
                "order-[2] !h-[12vw] px-[3.20vw] !bg-[#121423] !rounded-[1.87vw] w-[46.13vw]":
                  isMobileVersion,
              },
            )}
          >
            <Image
              src={IconCheck.src}
              width={IconCheck.width}
              height={IconCheck.height}
              alt="icon check"
              className={clsx("", { "size-[4.27vw]": isMobileVersion })}
            />
            <span
              className={clsx(
                "uppercase text-[12px] font-bai-jamjuree font-semibold",
                {
                  "text-white text-[4.27vw] font-semibold": isMobileVersion,
                },
              )}
            >
              code312
            </span>
          </div>
          <CountDownTimer
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            className="text-white fm:text-[5.87vw] fm:h-[12vw] fm:px-[6.67vw] fm:rounded-[1.87vw] fm:before:opacity-0 fm:!bg-red-gradient"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDiscountBanner;
