"use client";
import React, { FC } from "react";
import Image from "next/image";
import ArrowNav from "@/../public/images/icons/arrow-gradient.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import clsx from "clsx";
import { CharacterByConstructor } from "@/app/shared/api/types";

interface ComponentProps {
  character: CharacterByConstructor | null;
  className?: string;
  slidesPerView?: number | "auto";
  imagesList?: string[];
}

const SectionWithSwiper: FC<ComponentProps> = ({
  character,
  className,
  slidesPerView = 1.2,
  imagesList,
}) => {
  const baseUrl = "https://aigo.b-cdn.net/web/paywall_precreated";
  const images = [
    `${baseUrl}/${character?.style}/${character?.ethnicity}/${character?.body_type}/2.png`,
    `${baseUrl}/${character?.style}/${character?.ethnicity}/${character?.body_type}/3.png`,
    `${baseUrl}/${character?.style}/${character?.ethnicity}/${character?.body_type}/4.png`,
  ];

  const characterImages = imagesList ? imagesList : images;

  return (
    <Swiper
      slidesPerView={slidesPerView ?? "auto"}
      spaceBetween={12}
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
    >
      {characterImages &&
        characterImages?.map((item) => {
          return (
            <SwiperSlide
              key={item}
              className={clsx("overflow-hidden", className)}
            >
              <Image src={item} fill alt="images" className="object-cover" />
            </SwiperSlide>
          );
        })}
      <div
        role="button"
        aria-label="Prev Slide"
        className={clsx(
          "swiper-button-prev gradient-border-full shadow-custom-purple lg:!w-[4.796vw] lg:!h-[4.796vw] lg:!left-[30vw] !absolute !left-[0] top-1/2 z-10 flex !h-[40px] !w-[40px] rotate-[-180deg] items-center justify-center rounded-[50%] !bg-[#121423] opacity-0 after:hidden sm:!left-[2vw] sm:!h-[11.111vw] sm:!w-[11.111vw]",
          {},
        )}
      >
        <Image
          src={ArrowNav.src}
          width={ArrowNav.width}
          height={ArrowNav.height}
          alt="prev image"
        />
      </div>
      <div
        role="button"
        aria-label="Next Slide"
        className={clsx(
          "swiper-button-next gradient-border-full shadow-custom-purple lg:!w-[4.796vw] lg:!h-[4.796vw] lg:!right-[30vw] !absolute !right-[0] top-1/2 z-10 flex !h-[40px] !w-[40px] items-center justify-center rounded-[50%] !bg-[#121423] after:hidden sm:!right-[2vw] sm:!h-[11.111vw] sm:!w-[11.111vw]",
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
  );
};

export default SectionWithSwiper;
