"use client";

import React, { FC, useEffect, useMemo } from "react";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import clsx from "clsx";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

interface ComponentProps {
  tags: string[];
}

const Tags: FC<ComponentProps> = ({ tags }) => {
  const colors = [
    "#A9FD42",
    "#426EFD",
    "#AC42FD",
    "#42FDED",
    "#42FD74",
    "#FD5242",
  ];
  const { selectedTag, setSelectedTag } = useSelectedCardStore();

  const tagColors = useMemo(() => {
    return tags.reduce<Record<string, string>>((acc, tag, index) => {
      acc[tag] = colors[index % colors.length];
      return acc;
    }, {});
  }, [tags, colors]);

  const handleTagsSelect = (tag: string) => {
    const item = tag === selectedTag ? null : tag;
    setSelectedTag(item);
  };

  useEffect(() => {
    return () => {
      setSelectedTag(null);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={"auto"}
      freeMode={true}
      modules={[FreeMode]}
      className="w-full"
    >
      {tags.map((item) => {
        return (
          <SwiperSlide key={item} className="mr-[4px] !w-fit">
            <div
              className={clsx(
                "transition-border animate-fadeIn rounded-[12px] border border-transparent bg-[#1D1F37] duration-300 hover:border-[#049AEF]",
                {
                  "!border-[#049AEF]": selectedTag === item,
                },
              )}
            >
              <button
                onClick={() => handleTagsSelect(item)}
                style={{ color: tagColors[item] }}
                className="block px-[12px] py-[6px] text-[12px] font-semibold capitalize leading-[1.2em]"
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
