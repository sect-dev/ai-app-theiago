import React, {FC} from 'react';
import Image from "next/image";
import ImageLock from '@/../public/images/icons/icon-lock.svg';
import clsx from "clsx";

interface ComponentProps {
  content: string[]
}

const ChatsInfoPosts:FC<ComponentProps> = ({content}) => {

  if(!content || content.length === 0) {
    return (
      <div className="animate-fadeIn flex flex-wrap gap-[8px] px-[12px] pt-[20px]">
        <p className="text-[14px] opacity-60">No photos yet</p>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn flex flex-wrap gap-[8px]">
      {content.map((photo,index) => {
        return (
         <div key={photo} className="relative animate-fadeIn duration-150 overflow-hidden rounded-[12px] w-[134px] h-[157px]">
           <Image
             src={photo}
             fill
             sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 134px"
             alt="image"
             className={clsx("object-cover ", {
             "blur-[10px]": index > 1
             })}
           />
           {index > 1 &&
             <Image
               src={ImageLock.src}
               width={ImageLock.width}
               height={ImageLock.height}
               alt="lock image"
               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] size-[64px]"
             />
           }
         </div>
        )
      })}
    </div>
  );
};

export default ChatsInfoPosts;