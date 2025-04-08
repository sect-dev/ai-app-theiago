import React, {FC} from 'react';
import {StrictTokenPackage} from "@/app/shared/api/types/payment";
import Image from "next/image";
import IconCoins from '@/../public/images/icons/payment/icon-coins.webp';
import IconCoinsPackage from '@/../public/images/icons/payment/icon-coins-package.webp';
import clsx from "clsx";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from 'swiper/modules';
import ArrowNav from "@/../public/images/icons/arrow-gradient-blue.svg";

interface ComponentProps {
  tokenPackages: StrictTokenPackage[] | null
  selectedPackage: string
  setSelectedPackage: (value:string) => void
}

const TokenPackages:FC<ComponentProps> = ({tokenPackages,selectedPackage,setSelectedPackage}) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={12}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      className="!py-[30px]"
    >
      {tokenPackages && tokenPackages?.map((item,index) => {
        return (
          <SwiperSlide key={item.description} className="!h-[105px] !w-[145px] sm:!w-[41.89vw]">
            <button
              onClick={() => setSelectedPackage(item.description)}
              className={clsx("relative size-full block text-left  bg-[#21233A] rounded-[16px] p-[12px] pt-[50px]",{
                'gradient-border before:rounded-[16px] before:z-[2]': item.description === selectedPackage
              })}
            >
              {index === 0
                ? <Image
                  src={IconCoins.src}
                  width={IconCoins.width}
                  height={IconCoins.height}
                  alt="coins image"
                  className="absolute size-[67px] left-[10px] top-[-20px] z-[5]"
                />
                :  <Image
                  src={IconCoinsPackage.src}
                  width={IconCoinsPackage.width}
                  height={IconCoinsPackage.height}
                  alt="coins image"
                  className="absolute size-[97px] left-[10px] top-[-40px] z-[5]"
                />
              }

              <p className="font-bai-jamjuree font-bold text-[18px] mb-[5px]">
                {item.description}
              </p>
              <p className="font-asap text-[12px] opacity-50 font-semibold">
                <span>{item.currency} </span>
                <span>{item.amount} </span>
              </p>
              {(item.description === selectedPackage && index === 1) &&
                <span className="animate-fadeIn flex absolute right-[0] bottom-0 translate-y-1/2 z-[8]">
                  <span className="font-noto-sans main-gradient font-semibold text-[11px] rounded-[13px] px-[12px] uppercase">
                    Best offer
                  </span>
                </span>
              }
            </button>
          </SwiperSlide>
        )
      })}
      <div
        role="button"
        aria-label="Next Slide"
        className={clsx("swiper-button-next flex items-center justify-center gradient-border before:rounded-full shadow-custom-purple !absolute !right-[0] top-1/2 z-10 !size-[30px] rounded-[50%] !bg-[#121423] after:hidden lg:!size-[4.796vw] lg:!right-[30vw] sm:!right-[2vw] sm:!size-[8.11vw]", {
          "hidden": (tokenPackages && tokenPackages?.length <= 2)
        })}>
        <Image src={ArrowNav.src} width={ArrowNav.width} height={ArrowNav.height} alt="next image"/>
      </div>
    </Swiper>
  );
};

export default TokenPackages;