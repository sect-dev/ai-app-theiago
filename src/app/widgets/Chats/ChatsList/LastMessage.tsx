import React, { FC } from "react";
import { Message } from "@/app/shared/api/types";
import Image from "next/image";

interface ComponentProps {
  message: Message;
}

const LastMessage: FC<ComponentProps> = ({ message }) => {
  if (message.type === "audio") {
    return (
      <p className="line-clamp-1 text-[12px] font-medium tracking-[-0.04em] text-[#0680E6]">
        Audio
      </p>
    );
  }

  if (message.type === "video" || message.type === "video_paywall") {
    return (
      <p className="line-clamp-1 text-[12px] font-medium tracking-[-0.04em] text-[#0680E6]">
        Video
      </p>
    );
  }

  if (message.type === "image" || message.type === "image_paywall") {
    const src =
      typeof message.url === "string" ? message.url : (message.url?.en ?? "");
    return (
      <>
        <div className="relative size-[16px] overflow-hidden rounded-[4px]">
          <Image
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 16px"
            fill
            src={`${src}?width=50`}
            alt="image"
            className="object-cover object-top"
          />
        </div>
        <p className="line-clamp-1 text-[12px] font-medium tracking-[-0.04em] text-[#0680E6]">
          Picture
        </p>
      </>
    );
  }
  return (
    <p className="line-clamp-1 max-w-[125px] text-[12px] font-medium tracking-[-0.04em] opacity-50">
      {message.text}
    </p>
  );
};

export default LastMessage;
