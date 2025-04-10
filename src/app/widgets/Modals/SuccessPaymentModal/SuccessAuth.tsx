import React, {useEffect, useState, useTransition} from 'react';
import Image from "next/image";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import ImageDefault from "@/../public/images/img/payment/image-no-char-id.webp";
import ImageDecor1 from '@/../public/images/icons/payment/icon-decor1.png';
import ImageDecor2 from '@/../public/images/icons/payment/icon-decor2.png';
import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import {useRouter, useSearchParams} from "next/navigation";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import Spinner from "@/app/widgets/Spinner";
import {startConversation} from "@/app/shared/api/mesages";
import {mapBackendMessagesToMessages, saveCharacterToLocalStorage} from "@/app/shared/helpers";
import {useAuthStore} from "@/app/shared/store/authStore";
import {apiClient} from "@/app/shared/api";
import {Character} from "@/app/shared/api/types";

const SuccessAuth = () => {
  const {charFromPaywall,setCharacters, setSelectedCharacterId} = useSelectedCardStore();
  const searchParams = useSearchParams()
  const characterId = searchParams.get('character_id')
  const {user} = useAuthStore()
  const [loading,setLoading] = useState(false)
  const [isPending,setIsPending] = useTransition()
  const [charInfo,setCharInfo] = useState<Character | null>(null)
  const {setSuccessPaymentModal,setTokens} = usePaymentStore();
  const [characterLoading, setCharacterLoading] = useState<boolean>(false)
  const navigate = useRouter();
  const characterImage = charInfo ? charInfo?.avatar : ImageDefault.src;

  const getCharacterInfoById = async (id: string) => {
    try {
      setCharacterLoading(true)
      const response = await apiClient.get(`/character_info?id=${id}`);
      const result = JSON.parse(JSON.stringify(response.data))
      return setCharInfo(result)
    } catch (error) {
      console.log(error)
    } finally {
      setCharacterLoading(false)
    }
  }

  useEffect(() => {
    if(characterId) {
      getCharacterInfoById(characterId ?? '')
    }
  }, [])

  const handleStartChat = async () => {
    try {
      setLoading(true)
      const startChat = await startConversation({userId: user?.uid ?? 'id', characterId: characterId ?? null})
      const startChatMessages = mapBackendMessagesToMessages(startChat?.response ?? [])
      const tokens = startChat?.tokens_remaining || 0
      const preparedCharacters = saveCharacterToLocalStorage(charInfo,startChatMessages,tokens)
      setSelectedCharacterId(characterId)
      setCharacters(preparedCharacters ?? null)
      setTokens(tokens ?? 0)
      setIsPending(() => {
        navigate.push(`/chats`);
      })
      setSuccessPaymentModal({isSuccessPaymentModalActive:false,successPaymentModalType: null})
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-between bg-[#121423] rounded-[24px] overflow-hidden  sm:overflow-visible sm:h-auto">
      <Image
        src={ImageDecor1.src}
        width={ImageDecor1.width}
        height={ImageDecor1.height}
        alt="icon"
        className="absolute left-[-50px] top-[-50px] z-[10]"
      />
      <Image
        src={ImageDecor2.src}
        width={ImageDecor2.width}
        height={ImageDecor2.height}
        alt="icon"
        className="absolute right-[-50px] top-[30%] z-[10]"
      />
      <div className="w-full h-hull relative sm:hidden">
        {(characterLoading && !charInfo)
          ? <div className="animate-pulse w-full h-full bg-[#21233A] px-[16px] rounded-[12px] h-[48px]"/>
          : <Image
            src={characterImage}
            fill
            alt="image modal"
            className="animate-fadeIn object-cover"
          />
        }
        {(characterLoading && !charInfo)
          ? <div className="absolute w-full left-[20px] bottom-[20px] space-y-[5px]">
            <p className="w-[60%] bg-[#191B2C] h-[25px] rounded-[12px]" />
            <p className="w-[20%] bg-[#191B2C] h-[25px] rounded-[12px]" />
          </div>
          : <p className="font-semibold font-bai-jamjuree block leading-[1.2em] text-[20px] max-w-[70%] tracking-[0.01em] sm:text-[5.33vw] absolute left-[20px] bottom-[20px]">
            {charFromPaywall?.name} is eager to talk with you!
          </p>
        }

      </div>
      <div className="w-full  p-[20px] sm:relative sm:z-[5] sm:flex sm:flex-col sm:items-center sm:mt-[-200px] sm:justify-center sm:h-full">
        <div className="font-bai-jamjuree mb-[24px] pb-[24px] border-b border-b-[#3A3F63] space-y-[8px] sm:w-full">
          <p className="leading-[1.2em] font-semibold text-[20px] mb-[24px]">Thanks for your purchase! <br/> Now you have </p>
          <ul className="space-y-[8px] font-medium tracking-[-0,04em]">
            <li>🔥 Photos and video content</li>
            <li>👧 Dialogues like a real girls</li>
            <li>💕 The full experience of a relationship</li>
            <li>⭐ No annoying ads</li>
          </ul>
        </div>
        <div>
          <p className="text-[#B5B5B5] font-medium text-[16px]">Look at me!</p>
          <div className="pt-[12px] mb-[24px] max-w-[320px]">
            {(!characterLoading && charInfo)
              ? <SectionWithSwiper
                  className="animate-fadeIn !h-[166px] fm:!h-[55.87vw] !rounded-[12px]"
                  slidesPerView={2.2}
                  character={charFromPaywall ?? null}
                  imagesList={charInfo?.listProfilePhoto ?? ['']}
                />
              : <div className="animate-fadeIn flex gap-[12px]">
                  <div className="animate-pulse bg-[#21233A] !h-[166px] w-[48%] fm:!h-[55.87vw] !rounded-[12px]" />
                  <div className="animate-pulse bg-[#21233A] !h-[166px] w-[48%] fm:!h-[55.87vw] !rounded-[12px]"  />
                </div>
            }
          </div>
          <button
            onClick={handleStartChat}
            disabled={isPending || loading || characterLoading || !characterId}
            className="main-gradient flex justify-center items-center gap-[5px] w-full text-[15px] h-[40px] rounded-[12px] disabled:opacity-50 disabled:pointer-events-none"
          >
            <span className="relative z-[5]">Start chat</span>
            {(isPending || loading || characterLoading) && <Spinner />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAuth;