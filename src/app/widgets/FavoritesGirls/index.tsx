'use client'
import React, {FC} from 'react';
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";
import {Character} from "@/app/shared/api/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode,Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

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
      modules={[Autoplay,FreeMode]}
      lazy={{
        enabled: true,
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      }}
    >
      {avatars?.map(avatar => {
        return (
          <SwiperSlide key={avatar.id} className="!w-[300px] !h-[330px] mr-[12px]">
            <FavoritesGirlsCard avatar={avatar} />
          </SwiperSlide>
        )
      })}
  </Swiper>
    </div>
  );
};

export default FavoritesGirls;