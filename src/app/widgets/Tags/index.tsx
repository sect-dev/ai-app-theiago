"use client";

import React, { FC, useMemo } from "react";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import clsx from "clsx";

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
  }, [tags]);

  const handleTagsSelect = (tag:string) => {
    const item = tag === selectedTag ? null : tag
    setSelectedTag(item)
  }

  return (
    <>
      {tags.map((item) => {
        return (
          <li
            key={item}
            className={clsx("rounded-[0.94vw] animate-fadeIn bg-[#1D1F37] border border-transparent transition-border duration-300 hover:border-[#049AEF]",{
              "!border-[#049AEF]": selectedTag === item
            })}
          >
            <button
              onClick={() => handleTagsSelect(item)}
              style={{ color: tagColors[item] }}
              className="block capitalize font-semibold text-[0.94vw] px-[0.94vw] py-[0.47vw]"
            >
              {item}
            </button>
          </li>
        );
      })}
    </>
  );
};

export default Tags;
