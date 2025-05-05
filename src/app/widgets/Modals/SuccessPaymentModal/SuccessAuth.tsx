import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import ImageDefault from "@/../public/images/img/payment/image-no-char-id.webp";
import ImageDecor1 from "@/../public/images/icons/payment/icon-decor1.png";
import ImageDecor2 from "@/../public/images/icons/payment/icon-decor2.png";
import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import { useRouter, useSearchParams } from "next/navigation";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import Spinner from "@/app/widgets/Spinner";
import { startConversation } from "@/app/shared/api/mesages";
import {
  mapBackendMessagesToMessages,
  saveCharacterToLocalStorage,
} from "@/app/shared/helpers";
import { useAuthStore } from "@/app/shared/store/authStore";
import { apiClient } from "@/app/shared/api";
import { Character } from "@/app/shared/api/types";

const SuccessAuth = () => {
  const { charFromPaywall, setCharacters, setSelectedCharacterId } =
    useSelectedCardStore();
  const { setSuccessPaymentModal, setTokens } = usePaymentStore();
  const { user, setIsPremium } = useAuthStore();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isPending, setIsPending] = useTransition();
  const [charInfo, setCharInfo] = useState<Character | null>(null);

  const [characterLoading, setCharacterLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const characterImage = charInfo ? charInfo?.avatar : ImageDefault.src;
  const characterId = charFromPaywall
    ? charFromPaywall.character_id
    : searchParams.get("character_id");

  const getCharacterInfoById = async (id: string) => {
    try {
      setCharacterLoading(true);
      const response = await apiClient.get(`/character_info?id=${id}`);
      const result = JSON.parse(JSON.stringify(response.data));
      return setCharInfo(result);
    } catch (error) {
      console.log(error);
    } finally {
      setCharacterLoading(false);
    }
  };

  useEffect(() => {
    if (characterId) {
      getCharacterInfoById(characterId ?? "");
    }
  }, []);

  const handleStartChat = async () => {
    try {
      setLoading(true);
      const startChat = await startConversation({
        userId: user?.uid ?? "id",
        characterId: charInfo?.id.toString() ?? null,
      });
      const startChatMessages = mapBackendMessagesToMessages(
        startChat?.response ?? [],
      );
      const tokens = startChat?.tokens_remaining || 0;
      const preparedCharacters = saveCharacterToLocalStorage(
        charInfo,
        startChatMessages,
        tokens,
      );
      setSelectedCharacterId(charInfo?.id.toString() ?? "");
      setCharacters(preparedCharacters ?? null);
      setTokens(tokens ?? 0);
      setIsPremium(startChat?.is_premium ?? false);
      setIsPending(() => {
        navigate.push(`/chats`);
      });
      setSuccessPaymentModal({
        isSuccessPaymentModalActive: false,
        successPaymentModalType: null,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between overflow-hidden rounded-[24px] bg-[#121423] sm:h-auto sm:overflow-visible">
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
      <div className="h-hull relative w-full sm:hidden">
        {characterLoading && !charInfo ? (
          <div className="h-[48px] h-full w-full animate-pulse rounded-[12px] bg-[#21233A] px-[16px]" />
        ) : (
          <Image
            src={characterImage}
            fill
            alt="image modal"
            className="animate-fadeIn object-cover"
          />
        )}
        {characterLoading && !charInfo ? (
          <div className="absolute bottom-[20px] left-[20px] w-full space-y-[5px]">
            <p className="h-[25px] w-[60%] rounded-[12px] bg-[#191B2C]" />
            <p className="h-[25px] w-[20%] rounded-[12px] bg-[#191B2C]" />
          </div>
        ) : (
          <p className="absolute bottom-[20px] left-[20px] block max-w-[70%] font-bai-jamjuree text-[20px] font-semibold leading-[1.2em] tracking-[0.01em] sm:text-[5.33vw]">
            {charFromPaywall?.name} is eager to talk with you!
          </p>
        )}
      </div>
      <div className="w-full p-[20px] sm:relative sm:z-[5] sm:mt-[-200px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center">
        <div className="mb-[24px] space-y-[8px] border-b border-b-[#3A3F63] pb-[24px] font-bai-jamjuree sm:w-full">
          <p className="mb-[24px] text-[20px] font-semibold leading-[1.2em]">
            Thanks for your purchase! <br /> Now you have{" "}
          </p>
          <ul className="space-y-[8px] font-medium tracking-[-0,04em]">
            <li>🔥 Photos and video content</li>
            <li>👧 Dialogues like a real girls</li>
            <li>💕 The full experience of a relationship</li>
            <li>⭐ No annoying ads</li>
          </ul>
        </div>
        <div>
          <p className="text-[16px] font-medium text-[#B5B5B5]">Look at me!</p>
          <div className="mb-[24px] max-w-[320px] pt-[12px]">
            {!characterLoading && charInfo ? (
              <SectionWithSwiper
                className="!h-[166px] animate-fadeIn !rounded-[12px] fm:!h-[55.87vw]"
                slidesPerView={2.2}
                character={charFromPaywall ?? null}
                imagesList={charInfo?.listProfilePhoto ?? [""]}
              />
            ) : (
              <div className="flex animate-fadeIn gap-[12px]">
                <div className="!h-[166px] w-[48%] animate-pulse !rounded-[12px] bg-[#21233A] fm:!h-[55.87vw]" />
                <div className="!h-[166px] w-[48%] animate-pulse !rounded-[12px] bg-[#21233A] fm:!h-[55.87vw]" />
              </div>
            )}
          </div>
          <button
            onClick={handleStartChat}
            disabled={isPending || loading || characterLoading || !characterId}
            className="main-gradient flex h-[40px] w-full items-center justify-center gap-[5px] rounded-[12px] text-[15px] disabled:pointer-events-none disabled:opacity-50"
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
