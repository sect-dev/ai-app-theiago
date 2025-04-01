'use client'
import React, {FC} from 'react';
import Image from "next/image";
import ArrowNav from '@/../public/images/icons/arrow-gradient.svg';
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import clsx from "clsx";

interface ComponentProps {
  images: string[] | null
  className?: string
  slidesPerView?: number | 'auto'
}

const SectionWithSwiper:FC<ComponentProps> = ({images,className,slidesPerView= 1.2}) => {
  return (
    <Swiper
      slidesPerView={slidesPerView ?? 'auto'}
      spaceBetween={12}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}

    >
      {images && images?.map(item => {
        return (
          <SwiperSlide key={item} className={clsx(" overflow-hidden ",className)}>
            <Image
              src={item}
              fill
              alt="images"
              className="object-cover"
            />
          </SwiperSlide>
        )
      })}
      <div
        role="button"
        aria-label="Prev Slide"
        className={clsx("swiper-button-prev opacity-0 gradient-border-full flex items-center justify-center shadow-custom-purple rotate-[-180deg] !absolute !left-[0] top-1/2 z-10 !w-[40px] !h-[40px] rounded-[50%] !bg-[#121423] after:hidden lg:!w-[4.796vw] lg:!h-[4.796vw] lg:!left-[30vw] sm:!left-[2vw] sm:!w-[11.111vw] sm:!h-[11.111vw]", {})}>
        <Image src={ArrowNav.src} width={ArrowNav.width} height={ArrowNav.height} alt="prev image"/>
      </div>
      <div
        role="button"
        aria-label="Next Slide"
        className={clsx("swiper-button-next flex items-center justify-center gradient-border-full shadow-custom-purple !absolute !right-[0] top-1/2 z-10 !w-[40px] !h-[40px] rounded-[50%] !bg-[#121423] after:hidden lg:!w-[4.796vw] lg:!h-[4.796vw] lg:!right-[30vw] sm:!right-[2vw] sm:!w-[11.111vw] sm:!h-[11.111vw]", {})}>
        <Image src={ArrowNav.src} width={ArrowNav.width} height={ArrowNav.height} alt="next image"/>
      </div>
    </Swiper>
  );
};

export default SectionWithSwiper;