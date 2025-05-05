"use client";
import React, { FC } from "react";
import Image from "next/image";
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";
import { Character } from "@/app/shared/api/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import clsx from "clsx";
import ArrowNav from "@/../public/images/icons/arrow-gradient-blue.svg";

interface ComponentProps {
  avatars: Character[] | null;
}

const FavoritesGirls: FC<ComponentProps> = ({ avatars }) => {
  return (
    <div className="rounded-l-[24px] bg-[#121423] p-[24px] md:rounded-none md:p-[16px]">
      <p className="mb-[16px] text-[20px] font-semibold tracking-[0.02vw] sm:hidden">
        They crave to chat with you!
      </p>
      <Swiper
        slidesPerView={"auto"}
        freeMode={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, FreeMode, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {avatars?.map((avatar, index) => {
          return (
            <SwiperSlide
              key={avatar.id}
              className="mr-[12px] !h-[330px] !w-[300px]"
            >
              <FavoritesGirlsCard avatar={avatar} />
            </SwiperSlide>
          );
        })}

        <div
          role="button"
          aria-label="Next Slide"
          className={clsx(
            "swiper-button-next gradient-border shadow-custom-purple lg:!w-[4.796vw] lg:!h-[4.796vw] lg:!right-[30vw] !absolute !right-[20px] top-1/2 z-10 flex !h-[40px] !w-[40px] -translate-y-1/2 items-center justify-center rounded-[50%] !bg-[#121423] before:rounded-full after:hidden sm:!right-[2vw] sm:!h-[11.111vw] sm:!w-[11.111vw]",
            {},
          )}
        >
          <Image
            src={ArrowNav.src}
            width={ArrowNav.width}
            height={ArrowNav.height}
            alt="next image"
          />
        </div>
      </Swiper>
    </div>
  );
};

export default FavoritesGirls;
