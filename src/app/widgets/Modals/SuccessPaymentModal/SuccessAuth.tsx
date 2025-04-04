import React from 'react';
import Image from "next/image";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import ImageDefault from "@/../public/images/img/payment/image-no-char-id.webp";
import ImageDecor1 from '@/../public/images/icons/payment/icon-decor1.png';
import ImageDecor2 from '@/../public/images/icons/payment/icon-decor2.png';
import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import {startConversation} from "@/app/shared/api/mesages";
import {mapBackendMessagesToMessages, saveCharacterToLocalStorage} from "@/app/shared/helpers";
import {useRouter} from "next/navigation";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import {useAuthStore} from "@/app/shared/store/authStore";
import {useForm} from "react-hook-form";

const SuccessAuth = () => {
  const {charFromPaywall,setCharacters} = useSelectedCardStore();
  const baseUrl = 'https://aigo.b-cdn.net/web/paywall_precreated';
  const {user} = useAuthStore();
  const {setSuccessPaymentModal} = usePaymentStore();
  const navigate = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const characterImage = charFromPaywall ? `${baseUrl}/${charFromPaywall?.style}/${charFromPaywall?.ethnicity}/${charFromPaywall?.body_type}/1.png` : ImageDefault;

  // const handleStartChat = async () => {
  //   try {
  //     if(charFromPaywall) {
  //       const startChat = await startConversation({userId: user.uid ?? 'id', characterId: charFromPaywall?.id.toString() ?? null})
  //       const startChatMessages = mapBackendMessagesToMessages(startChat?.response ?? [])
  //
  //       navigate.replace(`/chats/${charFromPaywall?.id}`);
  //       const preparedCharacters = saveCharacterToLocalStorage(selectedCard,startChatMessages)
  //       setCharacters(preparedCharacters ?? null)
  //     }
  //     setSuccessPaymentModal({isSuccessPaymentModalActive:false,successPaymentModalType: null})
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
        <Image
          src={characterImage}
          fill
          alt="image modal"
          className="object-cover"
        />
        <p className="font-semibold font-bai-jamjuree block leading-[1.2em] text-[20px] max-w-[70%] tracking-[0.01em] sm:text-[5.33vw] absolute left-[20px] bottom-[20px]">
          {charFromPaywall?.name} is eager to talk with you!
        </p>
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
          <div className="pt-[12px] mb-[24px] max-w-[300px]">
            <SectionWithSwiper
              className="!h-[166px] fm:!h-[55.87vw] !rounded-[12px]"
              slidesPerView={2.2}
              character={charFromPaywall ?? null}
            />
          </div>
          <button
            // onClick={handleStartChat}
            className="main-gradient w-=ull text-[15px] h-[40px] rounded-[12px]"
          >
            <span className="relative z-[5]">Start chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessAuth;