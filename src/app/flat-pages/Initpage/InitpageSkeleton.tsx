import React from "react";
import Image from "next/image";
import IconGender from "@/../public/images/icons/icon-gender.svg";
import SectionAdvantages from "@/app/flat-pages/Initpage/components/SectionAdvantages";
import SectionReviews from "@/app/flat-pages/Initpage/components/SectionReviews";
import IconPaypal from "@/../public/images/icons/payment/icon-paypal.svg";

const InitpageSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-[840px] animate-fadeIn pt-[24px] fm:pt-0">
      <div className="flex gap-[16px] fm:flex-col">
        <div className="w-full max-w-[365px] fm:order-[-1] fm:max-w-full">
          <div className="init-page-main relative h-[490px] fm:h-[120vw] sm:h-[120vw]">
            <div className="absolute left-0 top-0 size-full animate-pulse rounded-[12px] bg-[#2B2D44]" />
          </div>
          <div className="relative z-[5] mt-[-100px] fm:hidden">
            <p className="mb-[15px] h-[15px] animate-pulse rounded-[12px] bg-[#2B2D44]" />
            <div className="flex gap-[12px] overflow-hidden fm:!h-[85.87vw]">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="h-[250px] w-[150px] shrink-0 animate-pulse rounded-[12px] bg-[#2B2D44]"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="order-[-1] max-w-[475px] overflow-x-hidden rounded-[32px] bg-[#191B2C] px-[20px] py-[15px] fm:relative fm:z-[10] fm:mt-[-225px] fm:max-w-full fm:bg-transparent">
          <div className="mb-[17px] pt-[20px] fm:mb-[4.36vw] fm:pt-[4.36vw]">
            <div className="h-[30px] w-[70%] animate-pulse rounded-[12px] bg-[#2B2D44] fm:mx-auto fm:max-w-full" />
            <div className="grid grid-cols-[repeat(2,minmax(160px,1fr))] gap-[12px] pt-[25px] fm:gap-[5.13vw] fm:pt-[6.41vw]">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="init-page-select-card relative flex items-center gap-[10px] overflow-hidden rounded-[16px] bg-[#2B2D44] p-[4px] fm:h-[51.28vw] fm:w-full fm:flex-col fm:bg-transparent fm:p-[2.56vw] fm:before:!opacity-100"
                  >
                    <div className="relative size-[84px] shrink-0 animate-pulse overflow-hidden rounded-[16px] bg-[#191B2C] fm:size-full" />
                    <div className="flex w-full flex-col fm:absolute fm:bottom-[10px] fm:left-1/2 fm:z-[12] fm:-translate-x-1/2 fm:flex-row fm:justify-center fm:gap-[3px]">
                      <p className="mb-[4px] h-[15px] w-[80%] animate-pulse rounded-[12px] bg-[#191B2C] font-semibold sm:h-[12px] sm:w-[25%]" />
                      <p className="h-[15px] w-[50%] animate-pulse rounded-[12px] bg-[#191B2C] font-bold sm:h-[12px] sm:w-[40%]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-[12px] fm:space-y-[3.08vw] sm:mb-[20px]">
            <div className="flex items-center gap-[6px] rounded-[12px] bg-[#2B2D44] px-[15px] py-[10px] text-[14px] font-semibold fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
              <Image
                src={IconGender.src}
                width={IconGender.width}
                height={IconGender.height}
                alt="icon gender"
                className="fm:size-[4.15vw]"
              />
              <span className="block h-[15px] w-[80%] animate-pulse rounded-[12px] bg-[#191B2C]" />
            </div>
            <div className="flex items-center gap-[6px] rounded-[12px] bg-[#2B2D44] px-[15px] py-[10px] text-[14px] font-semibold fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
              <Image
                src={IconGender.src}
                width={IconGender.width}
                height={IconGender.height}
                alt="icon gender"
                className="fm:size-[4.15vw]"
              />
              <span className="block h-[15px] w-[80%] animate-pulse rounded-[12px] bg-[#191B2C]" />
            </div>
            <div className="flex items-center gap-[6px] rounded-[12px] bg-[#2B2D44] px-[15px] py-[10px] text-[14px] font-semibold fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
              <Image
                src={IconGender.src}
                width={IconGender.width}
                height={IconGender.height}
                alt="icon gender"
                className="fm:size-[4.15vw]"
              />
              <span className="block h-[15px] w-[80%] animate-pulse rounded-[12px] bg-[#191B2C]" />
            </div>
          </div>
          <SectionAdvantages />
          <SectionReviews />
          <div className="space-y-[20px] pt-[10px] fm:space-y-[5.33vw]">
            {/*<button className="bg-white w-full text-[#121423] h-[50px] text-[20px] font-medium rounded-[8px] flex items-center justify-center gap-[4px] fm:rounded-[2.13vw] fm:text-[5.33vw] fm:h-[13.33vw]">*/}
            {/*  Pay with*/}
            {/*  <span className="text-[23px] font-semibold tracking-[-0.015em]  fm:text-[6.13vw]">Pay</span>*/}
            {/*</button>*/}
            <button className="gap-[4px]l flex h-[50px] w-full items-center justify-center gap-[12px] rounded-full bg-[#FFC43A] text-[14px] font-semibold text-[#121423] fm:h-[13.33vw] fm:gap-[3.20vw] fm:text-[3.73vw]">
              <Image
                src={IconPaypal.src}
                width={IconPaypal.width}
                height={IconPaypal.height}
                alt="paypal icon"
                className="fm:h-[3.73vw] fm:w-[16vw]"
              />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitpageSkeleton;
