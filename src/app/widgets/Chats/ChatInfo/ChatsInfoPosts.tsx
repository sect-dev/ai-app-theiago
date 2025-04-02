"use client";
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import ImageLock from "@/../public/images/icons/icon-lock.svg";
import clsx from "clsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {useAuthStore} from "@/app/shared/store/authStore";

interface ComponentProps {
  content: string[] | null;
}

const ChatsInfoPosts: FC<ComponentProps> = ({ content }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounded] = useState(false)
  const [index, setIndex] = useState(2);
  const {setAuthModal} = useAuthStore()

  useEffect(() => {
    setMounded(true)
  }, [])

  if(mounted) {
    return (
      <>
        <div className="photos-container animate-fadeIn flex flex-wrap gap-[8px]">
          {content && content?.map((photo, i) => {
            const isAvailable = i <= 1
            if(i > 1) {
              return (
                <div
                  key={photo}
                  className={clsx("gradient-border relative pointer-events-none animate-fadeIn duration-150 overflow-hidden rounded-[12px] w-full h-[157px] cursor-pointer md:h-[190px] before:rounded-[12px] before:z-[2] before:opacity-0", {
                    "hover:before:opacity-100 pointer-events-auto": !isAvailable
                  })}
                  onClick={() =>  setAuthModal({modalType:"register",isAuthModalActive:true})}
                >
                  <Image
                    src={`${photo}?format=webp&quality=80&width=150`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 134px"
                    alt="image"
                    className={clsx("object-cover ", {"blur-[10px]": i > 1})}
                  />
                </div>
              )
            }
            return (
              <div
                key={photo}
                className={clsx("gradient-border relative pointer-events-none animate-fadeIn duration-150 overflow-hidden rounded-[12px] w-full h-[157px] cursor-pointer md:h-[190px] before:rounded-[12px] before:z-[2] before:opacity-0", {
                  "hover:before:opacity-100 pointer-events-auto": isAvailable
                })}
                onClick={() =>  setOpen(true)}
              >
                <Image
                  src={`${photo}?format=webp&quality=80&width=150`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 134px"
                  alt="image"
                  className={clsx("object-cover ", {"blur-[10px]": i > 1})}
                />
                {i > 1 && (
                  <Image
                    src={ImageLock.src}
                    width={ImageLock.width}
                    height={ImageLock.height}
                    alt="lock image"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] size-[64px]"
                  />
                )}
              </div>
            )
          })}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={content?.slice(0,index).map((src) => ({ src }))}
        />
      </>
    );
  }

  return (
    <div className="flex flex-wrap gap-[8px]">
      {Array.from({length:8}).map((_,index) =>  <div key={index} className="animate-pulse w-[48%] h-[157px] rounded-[12px] bg-[#1F2237] " />)}
    </div>
  );

};

export default ChatsInfoPosts;
