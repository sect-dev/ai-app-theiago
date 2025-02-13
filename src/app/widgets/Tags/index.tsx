"use client";

import React, { FC, useMemo } from "react";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import clsx from "clsx";
import {SwiperSlide,Swiper} from "swiper/react";
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface ComponentProps {
  tags: string[];
}

const Tags: FC<ComponentProps> = ({ tags }) => {
  const colors = ["#A9FD42", "#426EFD", "#AC42FD", "#42FDED", "#42FD74", "#FD5242"];
  const { selectedTag, setSelectedTag } = useSelectedCardStore();

  const tagColors = useMemo(() => {
    return tags.reduce<Record<string, string>>((acc, tag, index) => {
      acc[tag] = colors[index % colors.length];
      return acc;
    }, {});
  }, [tags,colors]);

  const handleTagsSelect = (tag:string) => {
    const item = tag === selectedTag ? null : tag
    setSelectedTag(item)
  }

  return (
    <Swiper
      slidesPerView={"auto"}
      freeMode={true}
      modules={[FreeMode]}
      className="w-full"
    >
      {tags.map((item) => {
        return (
          <SwiperSlide key={item} className="!w-fit mr-[0.47vw] sm:mr-[1.07vw]">
            <div
              className={clsx("rounded-[0.94vw] animate-fadeIn bg-[#1D1F37] border border-transparent transition-border duration-300 sm:rounded-[3.20vw] hover:border-[#049AEF]",{
                "!border-[#049AEF]": selectedTag === item
              })}
            >
              <button
                onClick={() => handleTagsSelect(item)}
                style={{ color: tagColors[item] }}
                className="block capitalize font-semibold text-[0.94vw] px-[0.94vw] py-[0.47vw] sm:text-[3.20vw] leading-[1.2em] sm:px-[3.20vw] sm:py-[1.60vw]"
              >
                {item}
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Tags;
