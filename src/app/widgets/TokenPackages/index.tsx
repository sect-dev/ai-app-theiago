import React, { FC } from "react";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import Image from "next/image";
import IconCoins from "@/../public/images/icons/payment/icon-coins.webp";
import IconCoinsPackage from "@/../public/images/icons/payment/icon-coins-package.webp";
import IconTokenPayWall from "@/../public/images/icons/icon-token-paywall.svg";
// import IconTokenPaywall from ".@/../../../../../public/images/icons/icon-token-paywall.svg"
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Navigation } from "swiper/modules";
import ArrowNav from "@/../public/images/icons/arrow-gradient-blue.svg";
import { Marko_One } from 'next/font/google';

interface ComponentProps {
  tokenPackages: StrictTokenPackage[] | null;
  selectedPackage: string;
  setSelectedPackage: (value: string) => void;
}

// const tokenPackagesTemp = [
//   {
//     id: 1,
//     currency: "USD",
//     plusPerc: 10,
//     lastPrice: 19.99,
//     amount: 9.99,
//     tokens_count: 100,
//     description: "100",
//     places: ["tokens-paywall"],
//   },
//   {
//     id: 2,
//     currency: "USD",
//     plusPerc: 15,
//     lastPrice: 19.99,
//     amount: 49.99,
//     tokens_count: 500,
//     description: "500",
//     places: ["tokens-paywall"],
//   },
//   {
//     id: 3,
//     currency: "USD",
//     plusPerc: 20,
//     lastPrice: 419.99,
//     amount: 9.99,
//     tokens_count: 100,
//     description: "100",
//     places: ["tokens-paywall"],
//   },
//   {
//     id: 4,
//     currency: "USD",
//     plusPerc: 25,
//     lastPrice: 719.99,
//     amount: 49.99,
//     tokens_count: 500,
//     description: "500",
//     places: ["tokens-paywall"],
//   },
// ];

const TokenPackages: FC<ComponentProps> = (props) => {

  const {
    tokenPackages,
    selectedPackage,
    setSelectedPackage,
  } = props;

  return (
    // <Swiper
    //   slidesPerView={"auto"}
    //   spaceBetween={12}
    //   modules={[Navigation]}
    //   navigation={{
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   }}
    //   className="!py-[30px]"
    // >
    //   {tokenPackagesTemp &&
    //     tokenPackagesTemp?.map((item, index) => {
    //       return (
    //         <SwiperSlide
    //           key={item.id}
    //           className="!h-[105px] !w-[145px] sm:!w-[41.89vw]"
    //         >
    //           <button
    //             onClick={() => setSelectedPackage(item.description)}
                // className={clsx(
                //   "relative size-full block text-left  bg-[#21233A] rounded-[16px] p-[12px] pt-[50px]",
                //   {
                //     "gradient-border before:rounded-[16px] before:z-[2]":
                //       item.description === selectedPackage,
                //   },
                // )}
    //           >

    //             <p className="font-bai-jamjuree font-bold text-[18px] mb-[5px]">
    //               {item.description}
    //             </p>
    //             <p className="text-[12px] opacity-50 font-semibold">
    //               <span>{item.currency} </span>
    //               <span>{item.amount} </span>
    //             </p>
    //           </button>
    //         </SwiperSlide>
    //       );
    //     })}
    //   <div
    //     role="button"
    //     aria-label="Next Slide"
    //     className={clsx(
    //       "swiper-button-next flex items-center justify-center gradient-border before:rounded-full shadow-custom-purple !absolute !right-[0] top-1/2 z-10 !size-[30px] rounded-[50%] !bg-[#121423] after:hidden lg:!size-[4.796vw] lg:!right-[30vw] sm:!right-[2vw] sm:!size-[8.11vw]",
    //       {
    //         hidden: tokenPackages && tokenPackages?.length <= 2,
    //       },
    //     )}
    //   >
    //     <Image
    //       src={ArrowNav.src}
    //       width={ArrowNav.width}
    //       height={ArrowNav.height}
    //       alt="next image"
    //     />
    //   </div>
    // </Swiper>

    <div className='mb-[16px]'>
        <div className="w-full grid grid-cols-2 gap-[16px]">
          {tokenPackages && tokenPackages.map((item) => (
            <button onClick={() => setSelectedPackage(item.description)} key={item.description} className={clsx("relative flex align-center justify-center text-center size-full block text-left  bg-[#21233A] rounded-[24px] py-[24px] px-[43px]", {"gradient-border before:rounded-[16px] before:z-[2]": item.description === selectedPackage})}>
              <div className='absolute bg-main-gradient max-h-[16px] font-bold text-[12px] whitespace-nowrap top-0 rounded-b-[13px] px-[8px]'>{item.lable}</div>
              <div className="flex flex-col relative gap-y-[5px]"> 
                <div className="flex items-center justify-start gap-[4px]">
                  <span className="font-bai-jamjuree font-bold text-[24px]">{item.tokens_count}</span>
                  <Image src={IconTokenPayWall.src} alt="tokens alt" width={IconTokenPayWall.width} height={IconTokenPayWall.height} />
                </div>
                <span className="font-asap text-[14px] font-medium leading-1.3">{item.currency} {item.price}</span>
                <span className="font-asap font-medium text-[11px] opacity-50">{item.old_price}</span>
              </div>
            </button>
          ))}
        </div>
    </div>
  );
};

export default TokenPackages;
