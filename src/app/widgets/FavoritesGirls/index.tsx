'use client'
import React, {FC} from 'react';
import Image from "next/image";
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";
import {Character} from "@/app/shared/api/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode,Autoplay,Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import clsx from "clsx";
import ArrowNav from "@/../public/images/icons/arrow-gradient-blue.svg";

interface ComponentProps {
  avatars: Character[]
}

const FavoritesGirls:FC<ComponentProps>  = ({avatars}) => {

  return (
    <div className="bg-[#121423] p-[24px] rounded-l-[24px] md:p-[16px] md:rounded-none">
      <p className="text-[20px] font-semibold tracking-[0.02vw] mb-[16px] sm:hidden">They crave to chat with you!</p>
     <Swiper
      slidesPerView={"auto"}
      freeMode={true}
      autoplay={{
        delay: 5500,
        disableOnInteraction: true,
      }}
      modules={[Autoplay,FreeMode,Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
    >
      {avatars?.map(avatar => {
        return (
          <SwiperSlide key={avatar.id} className="!w-[300px] !h-[330px] mr-[12px]">
            <FavoritesGirlsCard avatar={avatar} />
          </SwiperSlide>
        )
      })}
       <div
         role="button"
         aria-label="Next Slide"
         className={clsx("swiper-button-next gradient-border before:rounded-full flex items-center justify-center shadow-custom-purple !absolute !right-[20px] -translate-y-1/2 top-1/2 z-10 !w-[40px] !h-[40px] rounded-[50%] !bg-[#121423] after:hidden lg:!w-[4.796vw] lg:!h-[4.796vw] lg:!right-[30vw] sm:!right-[2vw] sm:!w-[11.111vw] sm:!h-[11.111vw]", {})}>
         <Image src={ArrowNav.src} width={ArrowNav.width} height={ArrowNav.height} alt="next image"/>
       </div>
  </Swiper>
    </div>
  );
};

export default FavoritesGirls;