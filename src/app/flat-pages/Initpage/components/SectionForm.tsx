import React from "react";
import Image from "next/image";
import IconMoneyback from "@/../public/images/icons/payment/icon-moneyback.svg";

const SectionForm = () => {
  return (
    <div
      id="form"
      className="space-y-[24px] py-[20px] fm:py-[5.33vw] sm:space-y-[6.40vw]"
    >
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
