'use client'
import React, {FC} from 'react';
import Image from "next/image";
import {Character} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import {useRouter} from "next/navigation";
import {mapBackendMessagesToMessages, saveCharacterToLocalStorage} from "@/app/shared/helpers";
import {startConversation} from "@/app/shared/api/mesages";
import {useInView} from "react-intersection-observer";
import FavoritesGirlsSkeleton from "@/app/widgets/FavoritesGirls/FavoritesGirlsSkeleton";

interface ComponentProps {
  avatar: Character
}

const FavoritesGirlsCard:FC<ComponentProps> = ({avatar}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const {setSelectedCard,setCharacters} = useSelectedCardStore();
  const navigate = useRouter()

  const handleClick = async (avatar: Character) => {
    setSelectedCard(avatar);
    try {
      const startChat = await startConversation({userId: 'id', characterId: avatar.id.toString()})
      const startChatMessages = mapBackendMessagesToMessages(startChat?.response ?? [])

      navigate.push(`/chats/${avatar.id}`);
      const preparedCharacters = saveCharacterToLocalStorage(avatar,startChatMessages)
      setCharacters(preparedCharacters ?? null)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div ref={ref} className="size-full">
      {inView
        ? <div className="card-shadow card overflow-hidden cursor-grab group animate-fadeIn flex items-end relative p-[12px] h-full rounded-[20px] md:rounded-[24px]">
          <Image
            src={`${avatar.avatar}?format=webp&quality=80&v=1`}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
            fill
            alt="image"
            className="object-cover"
          />
          <div className="relative z-[2] transition-all duration-300 group-hover:mb-[50px] ">
            <div className="flex items-center gap-[4px] mb-[8px] font-semibold font-semibold ">
              {avatar.tags.map(tag => {
                return (
                  <div key={tag} className="rounded-[8px] capitalize font-semibold h-[21px] text-[14px] px-[4px] backdop-blur-[8px] bg-[#3B3E5E8A] md:text-[12px]">
                    {tag}
                  </div>
                )
              })}
            </div>
            <p className="text-[16px] font-semibold">{avatar.name}</p>
            <p className="opacity-[60%] line-clamp-2 text-[14px] md:text-[12px]">
              {avatar.description?.en}
            </p>
          </div>
          <div className="absolute left-1/2 -bottom-[40px] z-[10] w-full px-[16px] -translate-x-1/2 transition-all duration-300 group-hover:bottom-[12px] ">
            <button
              onClick={() => handleClick(avatar)}
              className="main-gradient cursor-pointer w-full  text-[14px] rounded-[12px] h-[40px] font-semibold text-white"
            >
         <span className="relative z-[5] flex items-center justify-center gap-[8px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3332 10.7166C18.3332 12.6249 17.3499 14.3166 15.8332 15.3833L14.7166 17.8416C14.4582 18.3999 13.7082 18.5083 13.3166 18.0333L12.0832 16.5499C10.5332 16.5499 9.10824 16.0249 8.0249 15.1499L8.5249 14.5583C12.3749 14.2666 15.4166 11.2166 15.4166 7.49994C15.4166 6.8666 15.3249 6.2416 15.1582 5.6416C17.0499 6.6416 18.3332 8.5416 18.3332 10.7166Z" fill="#fff"/>
              <path d="M13.5832 5.05841C12.6082 3.05841 10.4332 1.66675 7.9165 1.66675C4.4665 1.66675 1.6665 4.27508 1.6665 7.50008C1.6665 9.40841 2.64984 11.1001 4.1665 12.1667L5.28317 14.6251C5.5415 15.1834 6.2915 15.2834 6.68317 14.8167L7.1415 14.2667L7.9165 13.3334C11.3665 13.3334 14.1665 10.7251 14.1665 7.50008C14.1665 6.62508 13.9582 5.80008 13.5832 5.05841ZM9.99984 8.12508H5.83317C5.4915 8.12508 5.20817 7.84175 5.20817 7.50008C5.20817 7.15841 5.4915 6.87508 5.83317 6.87508H9.99984C10.3415 6.87508 10.6248 7.15841 10.6248 7.50008C10.6248 7.84175 10.3415 8.12508 9.99984 8.12508Z" fill="#fff"/>
            </svg>
            <span>Start chat</span>
         </span>
            </button>
          </div>
        </div>
        : <FavoritesGirlsSkeleton />
      }
    </div>
  );
};

export default FavoritesGirlsCard;