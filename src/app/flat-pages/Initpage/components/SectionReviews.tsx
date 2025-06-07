import React from "react";
import Image from "next/image";
import IconRating from "@/../public/images/icons/icon-rating.svg";
import ImageReview1 from "@/../public/images/img/initpage/image-review1.webp";
import ImageReview2 from "@/../public/images/img/initpage/image-review2.webp";
import ImageReview3 from "@/../public/images/img/initpage/image-review3.webp";
import ImageReview4 from "@/../public/images/img/initpage/image-review4.webp";
import ImageEmodji from "@/../public/images/img/initpage/image-emidji.webp";
import { useTranslations } from "next-intl";

const SectionReviews = () => {
  const t = useTranslations("Paywall");
  return (
    <div className="mb-[20px] pt-[24px]">
      <p className="mx-auto mb-[24px] max-w-[300px] text-center text-[28px] font-semibold leading-[1.2em] tracking-[-0.03em] fm:mb-[6.40vw] fm:max-w-[80vw] fm:text-[7.47vw]">
        {t("reviews_title")}
      </p>
      <div className="relative pb-[16px] sm:pb-[4.27vw]">
        <Image
          src={ImageEmodji.src}
          width={ImageEmodji.width}
          height={ImageEmodji.height}
          alt="emodji love"
          className="absolute bottom-0 left-[-20px] z-[5] fm:h-[19vw] fm:w-[15.73vw]"
        />
        <div className="ml-auto flex max-w-[230px] gap-[10px] rounded-[10px] bg-[#2B2D44] p-[10px] shadow-[0.33px_4.29px_9.24px_0px_rgba(0,0,0,0.2)] fm:mr-[-12vw] fm:max-w-[61.33vw] fm:gap-[2.67vw] fm:rounded-[2.67vw] fm:p-[2.67vw]">
          <div className="relative size-[25px] shrink-0 overflow-hidden rounded-full fm:size-[6.67vw]">
            <Image
              src={ImageReview1.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[5px] sm:space-y-[1.33vw]">
            <p className="text-[9px] font-medium leading-[1.2em] text-[#9B50FC] fm:text-[2.40vw]">
              {t("reviews_name_1")}
            </p>
            <p className="text-[11px] leading-[1.2em] tracking-[-0.02em] fm:text-[2.93vw]">
              {t("reviews_text_1")}
            </p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
              className="fm:h-[1.87vw] fm:w-[12vw]"
            />
          </div>
        </div>
        <div className="ml-[-25px] mt-[-50px] flex max-w-[200px] gap-[15px] rounded-[10px] bg-[#2B2D44] p-[10px] shadow-[1.65px_16.84px_16.84px_0px_rgba(0,0,0,0.17)] fm:ml-[-15vw] fm:max-w-[53.33vw] fm:gap-[2.67vw] fm:rounded-[2.67vw] fm:p-[2.67vw]">
          <div className="relative size-[25px] shrink-0 overflow-hidden rounded-full fm:size-[6.67vw]">
            <Image
              src={ImageReview2.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[5px]">
            <p className="text-[9px] font-medium leading-[1.2em] text-[#9B50FC] fm:text-[2.40vw]">
              {t("reviews_name_2")}
            </p>
            <p className="max-w-[120px] max-w-[32vw] text-[11px] leading-[1.2em] tracking-[-0.02em] fm:text-[2.93vw]">
              {t("reviews_text_2")}
            </p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
              className="fm:h-[1.87vw] fm:w-[12vw]"
            />
          </div>
        </div>
        <div className="ml-[-25px] mt-[12px] flex max-w-[350px] gap-[15px] rounded-[10px] bg-[#2B2D44] p-[10px] shadow-[3.96px_37.97px_22.78px_0px_rgba(0,0,0,0.1)] fm:ml-[-22vw] fm:mt-[3.20vw] fm:max-w-[94.67vw] fm:rounded-[2.67vw] fm:p-[2.67vw]">
          <div className="relative size-[44px] shrink-0 overflow-hidden rounded-full fm:size-[11.73vw]">
            <Image
              src={ImageReview3.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[7px] fm:space-y-[1.87vw]">
            <p className="text-[15px] font-medium leading-[1.2em] text-[#9B50FC] fm:text-[4vw]">
              {t("reviews_name_3")}
            </p>
            <p className="text-[15px] leading-[1.2em] tracking-[-0.02em] fm:max-w-[70vw] fm:text-[4vw]">
              {t("reviews_text_3")}
            </p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
              className="h-[12px] w-[75px] fm:h-[3.20vw] fm:w-[21.33vw]"
            />
          </div>
        </div>
        <div className="ml-auto mr-[30px] mt-[12px] flex max-w-[320px] gap-[15px] rounded-[10px] bg-[#2B2D44] p-[10px] shadow-[6.93px_67.35px_27.07px_0px_rgba(0,0,0,0.03)] fm:mr-[-3vw] fm:mt-[3.20vw] fm:max-w-[88vw] fm:gap-[2.67vw] fm:rounded-[2.67vw] fm:p-[2.67vw]">
          <div className="relative size-[44px] shrink-0 overflow-hidden rounded-full fm:size-[9.60vw]">
            <Image
              src={ImageReview4.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[6px] pt-[10px] fm:space-y-[1.60vw] fm:pt-[2.67vw]">
            <p className="text-[12px] font-medium leading-[1.2em] text-[#9B50FC] fm:text-[3.20vw]">
              {t("reviews_name_4")}
            </p>
            <p className="text-[14px] leading-[1.2em] tracking-[-0.02em] fm:text-[3.73vw]">
              {t("reviews_text_4")}
            </p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
              className="h-[10px] w-[63px] fm:h-[2.67vw] fm:w-[16.80vw]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionReviews;
