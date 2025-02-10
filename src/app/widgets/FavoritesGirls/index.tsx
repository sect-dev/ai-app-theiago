'use client'
import React, {FC} from 'react';
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";
import {IAvatar} from "@/app/shared/api/types";
import FavoritesGirlsSkeleton from "@/app/widgets/FavoritesGirls/FavoritesGirlsSkeleton";
import Tags from "@/app/widgets/Tags";
import TagsSkeleton from "@/app/widgets/Tags/TagsSkeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface ComponentProps {
  avatars: IAvatar[]
  tags: string[]
}

const FavoritesGirls:FC<ComponentProps>  = ({avatars,tags}) => {

  return (
    <div className="bg-[#121423] p-[1.88vw] rounded-l-[1.88vw] ">
      <p className="text-[1.56vw] font-semibold tracking-[0.02vw] mb-[0.94vw]">Explore hottest AI Characters</p>
      <ul className="flex gap-[0.31vw] mb-[1.56vw]">
        {(!tags || tags.length === 0)
          ? <TagsSkeleton />
          : <Tags tags={tags} />
        }
      </ul>
      <div className="flex gap-[0.94vw]">
        { (!avatars || avatars.length === 0)
          ? <FavoritesGirlsSkeleton />
          : <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode]}
            >
            {avatars?.map(avatar => {
              return (
                <SwiperSlide key={avatar.id} className="!w-[23.44vw] !h-[25.78vw]">
                  <FavoritesGirlsCard avatar={avatar} />
                </SwiperSlide>
              )
            }) }
          </Swiper>
        }
      </div>
    </div>
  );
};

export default FavoritesGirls;