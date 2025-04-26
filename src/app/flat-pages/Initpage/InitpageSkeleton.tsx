import React from "react";
import Image from "next/image";
import IconGender from "@/../public/images/icons/icon-gender.svg";
import SectionAdvantages from "@/app/flat-pages/Initpage/components/SectionAdvantages";
import SectionReviews from "@/app/flat-pages/Initpage/components/SectionReviews";
import IconPaypal from "@/../public/images/icons/payment/icon-paypal.svg";

const InitpageSkeleton = () => {
  return (
    <div className="animate-fadeIn w-full mx-auto max-w-[840px] pt-[24px] fm:pt-0">
      <div className="flex gap-[16px] fm:flex-col">
        <div className="w-full max-w-[365px] fm:order-[-1] fm:max-w-full">
          <div className="relative init-page-main h-[490px] fm:h-[120vw] sm:h-[120vw]">
            <div className="animate-pulse bg-[#2B2D44] rounded-[12px] size-full absolute left-0 top-0" />
          </div>
          <div className="relative mt-[-100px] z-[5] fm:hidden">
            <p className="animate-pulse bg-[#2B2D44] h-[15px] rounded-[12px] mb-[15px]" />
            <div className=" flex gap-[12px] overflow-hidden fm:!h-[85.87vw]">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="w-[150px] shrink-0 h-[250px] rounded-[12px] animate-pulse bg-[#2B2D44]"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-[#191B2C] py-[15px] overflow-x-hidden rounded-[32px] order-[-1] max-w-[475px] px-[20px] fm:relative fm:z-[10] fm:mt-[-225px] fm:bg-transparent fm:max-w-full">
          <div className="mb-[17px] pt-[20px] fm:mb-[4.36vw] fm:pt-[4.36vw]">
            <div className="animate-pulse fm:mx-auto fm:max-w-full w-[70%] rounded-[12px] h-[30px] bg-[#2B2D44]" />
            <div className="grid grid-cols-[repeat(2,minmax(160px,1fr))] gap-[12px] pt-[25px] fm:gap-[5.13vw] fm:pt-[6.41vw]">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="init-page-select-card bg-[#2B2D44] relative overflow-hidden flex gap-[10px] items-center p-[4px] rounded-[16px] fm:p-[2.56vw] fm:flex-col fm:w-full fm:h-[51.28vw] fm:before:!opacity-100 fm:bg-transparent"
                  >
                    <div className="animate-pulse relative shrink-0 bg-[#191B2C] size-[84px] rounded-[16px] overflow-hidden fm:size-full" />
                    <div className="flex flex-col w-full fm:justify-center fm:flex-row fm:gap-[3px] fm:z-[12] fm:absolute fm:left-1/2 fm:bottom-[10px] fm:-translate-x-1/2">
                      <p className="animate-pulse  bg-[#191B2C] rounded-[12px] font-semibold h-[15px] w-[80%] mb-[4px] sm:h-[12px] sm:w-[25%]" />
                      <p className="animate-pulse  bg-[#191B2C] rounded-[12px] h-[15px] w-[50%] font-bold sm:h-[12px] sm:w-[40%]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-[12px] fm:space-y-[3.08vw] sm:mb-[20px]">
            <div className="flex items-center text-[14px] bg-[#2B2D44] rounded-[12px] px-[15px] py-[10px] font-semibold gap-[6px] fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
              <Image
                src={IconGender.src}
                width={IconGender.width}
                height={IconGender.height}
                alt="icon gender"
                className="fm:size-[4.15vw]"
              />
              <span className="animate-pulse block bg-[#191B2C] h-[15px] w-[80%] rounded-[12px]" />
            </div>
            <div className="flex items-center text-[14px] bg-[#2B2D44] rounded-[12px] px-[15px] py-[10px] font-semibold gap-[6px] fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
              <Image
                src={IconGender.src}
                width={IconGender.width}
                height={IconGender.height}
                alt="icon gender"
                className="fm:size-[4.15vw]"
              />
              <span className="animate-pulse block bg-[#191B2C] h-[15px] w-[80%] rounded-[12px]" />
            </div>
            <div className="flex items-center text-[14px] bg-[#2B2D44] rounded-[12px] px-[15px] py-[10px] font-semibold gap-[6px] fm:gap-[1.03vw] fm:rounded-[3.08vw] fm:px-[3.08vw] fm:py-[2.05vw] fm:text-[3.59vw]">
              <Image
                src={IconGender.src}
                width={IconGender.width}
                height={IconGender.height}
                alt="icon gender"
                className="fm:size-[4.15vw]"
              />
              <span className="animate-pulse block bg-[#191B2C] h-[15px] w-[80%] rounded-[12px]" />
            </div>
          </div>
          <SectionAdvantages />
          <SectionReviews />
          <div className="space-y-[20px] pt-[10px] fm:space-y-[5.33vw]">
            {/*<button className="bg-white w-full text-[#121423] h-[50px] text-[20px] font-medium rounded-[8px] flex items-center justify-center gap-[4px] fm:rounded-[2.13vw] fm:text-[5.33vw] fm:h-[13.33vw]">*/}
            {/*  Pay with*/}
            {/*  <span className="text-[23px] font-semibold tracking-[-0.015em]  fm:text-[6.13vw]">Pay</span>*/}
            {/*</button>*/}
            <button className="rounded-full w-full h-[50px] text-[#121423] flex items-center justify-center gap-[12px] gap-[4px]l bg-[#FFC43A] text-[14px] font-semibold fm:gap-[3.20vw] fm:text-[3.73vw]  fm:h-[13.33vw]">
              <Image
                src={IconPaypal.src}
                width={IconPaypal.width}
                height={IconPaypal.height}
                alt="paypal icon"
                className="fm:w-[16vw] fm:h-[3.73vw]"
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
