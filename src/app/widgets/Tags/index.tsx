'use client'
import React, {FC} from 'react';
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import clsx from "clsx";

interface ComponentProps {
  tags: string[]
}

const Tags: FC<ComponentProps> = ({tags}) => {
  const colors = ["#A9FD42", "#426EFD", "#AC42FD", "#42FDED", "#42FD74", "#FD5242"];
  const { selectedTag,setSelectedTag } = useSelectedCardStore();

  const handleTagsSelect = (tag:string) => {
    const item = tag === selectedTag ? null : tag
    setSelectedTag(item)
  }

  return (
    <>
      {tags.map(item => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <li
            key={item}
            className={clsx("rounded-[0.94vw] animate-fadeIn bg-[#1D1F37] border border-transparent transition-border duration-300 hover:border-[#049AEF]",{
              "border-[#049AEF]": selectedTag === item
            })}
          >
            <button
              onClick={() => handleTagsSelect(item)}
              style={{ color: randomColor }}
              className="block capitalize font-semibold text-[0.94vw] px-[0.94vw] py-[0.47vw]">
              {item}
            </button>
          </li>
        )
      })}
    </>
  );
};

export default Tags;