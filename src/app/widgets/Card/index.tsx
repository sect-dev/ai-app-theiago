'use client'
import React, {FC} from 'react';
import Image from "next/image";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import IconMessage from '@/../public/images/icons/icon-message.svg';
import clsx from "clsx";
import {Character} from "@/app/shared/api/types";
import {useRouter} from "next/navigation";
import {getMessageSize, mapBackendMessagesToMessages, saveCharacterToLocalStorage} from "@/app/shared/helpers";
import {startConversation} from "@/app/shared/api/mesages";

interface ComponentProps {
  avatar: Character
}

const Card:FC<ComponentProps> = ({avatar}) => {
  const { setSelectedCard, setCharacters } = useSelectedCardStore();
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
    <button
      onClick={() => handleClick(avatar)}
      className={clsx("flex card items-end group text-left relative animate-fadeIn cursor-pointer p-[16px] h-[386px] rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-card-shadow md:p-[12px] sm:h-[270px]", {})}
    >
      <Image
        src={avatar.avatar}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
        alt="image"
        className="object-cover"
      />
      <span className="flex bg-[#3B3E5E59] backdrop-blur-[3px] bg-opacity-20 text-[12px] font-medium px-[4px] rounded-[8px] h-[18px] items-center gap-[4px] absolute right-[20px] top-[16px]">
        <Image
          src={IconMessage.src}
          width={IconMessage.width}
          height={IconMessage.height}
          alt="message icon"
          className="size-[12px]"
        />
        {getMessageSize(5,avatar.position)}
      </span>
      <div className="relative z-[2] transition-all duration-300 group-hover:mb-[45px] md:group-hover:mb-[40px] ">
        {avatar.tags?.length > 0 &&
          <div className="flex items-center gap-[4px] mb-[14px] font-semibold font-semibold ">
            <div className="rounded-[20px] capitalize bg-[#426EFD] font-semibold h-[21px] text-[14px] px-[4px] md:text-[12px]">
              { avatar.tags[0]}
            </div>
          </div>
        }
        <p className="text-[16px] font-semibold md:text-[14px]">{avatar.name}</p>
        <p className="card-description opacity-[60%] text-[14px] leading-[1.2em] line-clamp-2 md:text-[12px]">
          {avatar.description.en}
        </p>
      </div>
      <div className="w-full absolute left-1/2 -bottom-[35px] z-[10] -translate-x-1/2 px-[16px] transition-all duration-300 group-hover:bottom-[14px] md:-bottom-[35px] md:group-hover:bottom-[9px] md:px-[12px]">
        <div
          className="main-gradient w-full text-[14px] rounded-[12px] h-[35px] font-semibold text-white md:h-[30px] md:text-[12px]"
        >
          <span className="relative z-[5] h-full flex items-center justify-center gap-[8px] ">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3332 10.7166C18.3332 12.6249 17.3499 14.3166 15.8332 15.3833L14.7166 17.8416C14.4582 18.3999 13.7082 18.5083 13.3166 18.0333L12.0832 16.5499C10.5332 16.5499 9.10824 16.0249 8.0249 15.1499L8.5249 14.5583C12.3749 14.2666 15.4166 11.2166 15.4166 7.49994C15.4166 6.8666 15.3249 6.2416 15.1582 5.6416C17.0499 6.6416 18.3332 8.5416 18.3332 10.7166Z" fill="#fff"/>
              <path d="M13.5832 5.05841C12.6082 3.05841 10.4332 1.66675 7.9165 1.66675C4.4665 1.66675 1.6665 4.27508 1.6665 7.50008C1.6665 9.40841 2.64984 11.1001 4.1665 12.1667L5.28317 14.6251C5.5415 15.1834 6.2915 15.2834 6.68317 14.8167L7.1415 14.2667L7.9165 13.3334C11.3665 13.3334 14.1665 10.7251 14.1665 7.50008C14.1665 6.62508 13.9582 5.80008 13.5832 5.05841ZM9.99984 8.12508H5.83317C5.4915 8.12508 5.20817 7.84175 5.20817 7.50008C5.20817 7.15841 5.4915 6.87508 5.83317 6.87508H9.99984C10.3415 6.87508 10.6248 7.15841 10.6248 7.50008C10.6248 7.84175 10.3415 8.12508 9.99984 8.12508Z" fill="#fff"/>
            </svg>
            <span >Start chat</span>
          </span>
        </div>
      </div>
    </button>
  );
};

export default Card;