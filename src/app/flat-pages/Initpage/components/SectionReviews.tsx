import React from 'react';
import Image from "next/image";
import IconRating from '@/../public/images/icons/icon-rating.svg';
import ImageReview1 from '@/../public/images/img/initpage/image-review1.webp';
import ImageReview2 from '@/../public/images/img/initpage/image-review2.webp';
import ImageReview3 from '@/../public/images/img/initpage/image-review3.webp';
import ImageReview4 from '@/../public/images/img/initpage/image-review4.webp';
import ImageEmodji from '@/../public/images/img/initpage/image-emidji.webp';


const SectionReviews = () => {
  return (
    <div className="pt-[24px] mb-[20px]">
      <p className="text-center text-[28px] font-semibold max-w-[300px] leading-[1.2em] mx-auto mb-[24px] tracking-[-0.03em]">
        They have already evaluated
      </p>
      <div className="pb-[16px] relative ">
        <Image
          src={ImageEmodji.src}
          width={ImageEmodji.width}
          height={ImageEmodji.height}
          alt="emodji love"
          className="absolute left-[-20px] bottom-0"
        />
        <div className="rounded-[10px] shadow-[0.33px_4.29px_9.24px_0px_rgba(0,0,0,0.2)] p-[10px] bg-[#2B2D44] max-w-[230px] ml-auto flex gap-[10px]">
          <div className="relative shrink-0 rounded-full overflow-hidden size-[25px]">
            <Image
              src={ImageReview1.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[5px]">
            <p className="text-[#9B50FC] font-medium text-[9px] leading-[1.2em]">Max Knight</p>
            <p className="text-[11px] leading-[1.2em] tracking-[-0.02em]">I love my virtual girlfriend! I don't need real ones anymore! Why waste time and money when I have AiGo!</p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
            />
          </div>
        </div>
        <div className="rounded-[10px] shadow-[1.65px_16.84px_16.84px_0px_rgba(0,0,0,0.17)] ml-[-25px] mt-[-50px] p-[10px] bg-[#2B2D44] max-w-[200px] flex gap-[15px]">
          <div className="relative shrink-0 rounded-full overflow-hidden size-[25px]">
            <Image
              src={ImageReview2.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[5px]">
            <p className="text-[#9B50FC] font-medium text-[9px] leading-[1.2em]">Charles Johnson</p>
            <p className="text-[11px] leading-[1.2em] tracking-[-0.02em] max-w-[120px]">I really enjoy the variety of girls.</p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
            />
          </div>
        </div>
        <div className="rounded-[10px] shadow-[3.96px_37.97px_22.78px_0px_rgba(0,0,0,0.1)] mt-[12px] ml-[-25px] p-[10px] bg-[#2B2D44] max-w-[350px] flex gap-[15px]">
          <div className="relative shrink-0 rounded-full overflow-hidden size-[44px]">
            <Image
              src={ImageReview3.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[7px]">
            <p className="text-[#9B50FC] font-medium text-[15px] leading-[1.2em]">Samuel Lane</p>
            <p className="text-[15px] leading-[1.2em] tracking-[-0.02em] ">This is so cool! I didn't expect such a level of realism! Wow!</p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
              className="h-[12px] w-[75px]"
            />
          </div>
        </div>
        <div className="rounded-[10px] shadow-[6.93px_67.35px_27.07px_0px_rgba(0,0,0,0.03)] mt-[12px] ml-auto mr-[30px] p-[10px] bg-[#2B2D44] max-w-[320px] flex gap-[15px]">
          <div className="relative shrink-0 rounded-full overflow-hidden size-[44px]">
            <Image
              src={ImageReview4.src}
              fill
              alt="image"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-[6px] pt-[10px]">
            <p className="text-[#9B50FC] font-medium text-[12px] leading-[1.2em]">Thomas Smith</p>
            <p className="text-[14px] leading-[1.2em] tracking-[-0.02em] ">I'm constantly chatting with my new AI girlfriend! She's incredibly charming and smart! Thank you, AiGo!</p>
            <Image
              src={IconRating.src}
              width={IconRating.width}
              height={IconRating.height}
              alt="icon star"
              className="h-[10px] w-[63px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionReviews;