import React, {FC} from 'react';
import {StrictTokenPackage} from "@/app/shared/api/types/payment";
import Image from "next/image";
import IconCoins from '@/../public/images/icons/payment/icon-coins.webp';
import IconCoinsPackage from '@/../public/images/icons/payment/icon-coins-package.webp';

interface ComponentProps {
  tokenPackages: StrictTokenPackage[] | null
}

const TokenPackages:FC<ComponentProps> = ({tokenPackages}) => {

  return (
    <div className="flex gap-[10px] ">
      {tokenPackages && tokenPackages?.map(item => {
        return (
          <div key={item.description} className="relative h-[105px] bg-[#21233A] rounded-[16px] p-[12px]">
            <Image
              src={IconCoins.src}
              width={IconCoins.width}
              height={IconCoins.height}
              alt="coins image"
              className="absolute left-[10px] top-[-10px]"
            />
            <p className="font-bai-jamjuree font-bold text-[18px] mb-[5px]">
              {item.description}
            </p>
            <p className="font-asap text-[12px] font-semibold">
              <span>{item.amount} </span>
              <span>{item.currency}</span>
            </p>
          </div>
        )
      })}
    </div>
  );
};

export default TokenPackages;