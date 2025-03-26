'use client'
import React from 'react';
import Image from "next/image";
import ImageGirl from '../../../../../public/images/img/initpage/image-init1.webp';
import ArrowNav from '@/../public/images/icons/arrow-gradient.svg';
import ImageGirl2 from '../../../../../public/images/img/initpage/image-init2.webp';
import {Swiper, SwiperSlide} from "swiper/react";
import { Swiper as SwiperRef } from "swiper";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import clsx from "clsx";


const SectionWithSwiper = () => {
  return (
    <Swiper
      slidesPerView={1.2}
      spaceBetween={12}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}

    >
      <SwiperSlide className="rounded-[24px] !h-[320px] overflow-hidden fm:!h-[85.87vw]">
        <Image
          src={ImageGirl.src}
          width={ImageGirl.width}
          height={ImageGirl.height}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="rounded-[24px] !h-[320px] overflow-hidden fm:!h-[85.87vw]">
        <Image
          src={ImageGirl2.src}
          width={ImageGirl2.width}
          height={ImageGirl2.height}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="rounded-[24px] !h-[320px] overflow-hidden fm:!h-[85.87vw]">
        <Image
          src={ImageGirl.src}
          width={ImageGirl.width}
          height={ImageGirl.height}
          alt=""
        />
      </SwiperSlide>
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