import React, { Dispatch, FC, SetStateAction } from "react";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import Image from "next/image";
import IconTokenPayWall from "@/../public/images/icons/icon-token-paywall.svg";
import clsx from "clsx";
import "swiper/css";

interface ComponentProps {
  tokenPackages: StrictTokenPackage[] | null;
  selectedPackage: string;
  setSelectedPackage: Dispatch<SetStateAction<StrictTokenPackage | null>>;
}

const TokenPackages: FC<ComponentProps> = (props) => {
  const { tokenPackages, selectedPackage, setSelectedPackage } = props;

  return (
    <div className="mb-[16px]">
      <div className="grid w-full grid-cols-2 gap-[16px]">
        {tokenPackages &&
          tokenPackages.map((item) => (
            <button
              onClick={() => setSelectedPackage(item)}
              key={item.description}
              className={clsx(
                "align-center relative block flex size-full justify-center rounded-[24px] bg-[#21233A] px-[43px] py-[24px] text-left text-center",
                {
                  "gradient-border choosen-token-shadow before:z-[2] before:rounded-[16px]":
                    item.description === selectedPackage,
                },
              )}
            >
              <div className="absolute top-0 max-h-[16px] whitespace-nowrap rounded-b-[13px] bg-main-gradient px-[8px] text-[12px] font-bold">
                {item.lable}
              </div>
              <div className="relative flex flex-col gap-y-[5px]">
                <div className="flex items-center justify-start gap-[4px]">
                  <span className="font-bai-jamjuree text-[24px] font-bold">
                    {item.tokens_count}
                  </span>
                  <Image
                    src={IconTokenPayWall.src}
                    alt="tokens alt"
                    width={IconTokenPayWall.width}
                    height={IconTokenPayWall.height}
                  />
                </div>
                <span className="leading-1.3 font-asap text-[14px] font-medium">
                  {item.currency} {item.price}
                </span>
                <span className="font-asap text-[11px] font-medium line-through opacity-50">
                  {item.old_price}
                </span>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default TokenPackages;
