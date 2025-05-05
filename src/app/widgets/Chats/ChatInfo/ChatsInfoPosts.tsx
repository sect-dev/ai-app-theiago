"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import ImageLock from "@/../public/images/icons/icon-lock.svg";
import clsx from "clsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useRouter } from "next/navigation";

interface ComponentProps {
  content: string[] | null;
}

const ChatsInfoPosts: FC<ComponentProps> = ({ content }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setAuthModal, user, isPremium } = useAuthStore();
  const router = useRouter();
  const handlePhotoClick = (i: number, isLocked: boolean) => {
    if (!isLocked) {
      setSelectedIndex(i);
      setOpen(true);
    } else {
      if (user?.emailVerified && !isPremium) {
        return router.push("https://quiz.theaigo.com/aigoweb");
      }
      setAuthModal({ modalType: "login", isAuthModalActive: true });
    }
  };

  if (!content) {
    return (
      <div className="flex flex-wrap gap-[8px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[157px] w-[48%] animate-pulse rounded-[12px] bg-[#1F2237]"
          />
        ))}
      </div>
    );
  }

  const slidesToShow = isPremium ? content : content.slice(0, 2);

  return (
    <>
      <div className="photos-container flex animate-fadeIn flex-wrap gap-[8px]">
        {content.map((photo, i) => {
          const isLocked = !isPremium && i > 1;
          return (
            <div
              key={photo}
              className={clsx(
                "gradient-border relative h-[157px] w-full animate-fadeIn cursor-pointer overflow-hidden rounded-[12px] duration-150 before:z-[2] before:rounded-[12px] before:opacity-0 md:h-[190px]",
                {
                  "pointer-events-auto hover:before:opacity-100": !isLocked,
                  "pointer-events-none": isLocked,
                },
              )}
              onClick={() => handlePhotoClick(i, isLocked)}
            >
              <Image
                src={`${photo}?format=webp&quality=80&width=150`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 134px"
                alt="image"
                className={clsx("object-cover", { "blur-[10px]": isLocked })}
              />
              {isLocked && (
                <Image
                  src={ImageLock.src}
                  width={ImageLock.width}
                  height={ImageLock.height}
                  alt="lock"
                  className="absolute left-1/2 top-1/2 z-[10] size-[64px] -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
          );
        })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={selectedIndex}
        slides={slidesToShow.map((src) => ({ src }))}
      />
    </>
  );
};

export default ChatsInfoPosts;
