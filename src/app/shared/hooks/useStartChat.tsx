'use client'
import { useRouter } from "next/navigation";
import {useState, useTransition} from 'react';
import { Character } from "@/app/shared/api/types";
import { startConversation } from "@/app/shared/api/mesages";
import { mapBackendMessagesToMessages, saveCharacterToLocalStorage } from "@/app/shared/helpers";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import {useAuthStore} from "@/app/shared/store/authStore";
import {usePaymentStore} from "@/app/shared/store/paymentStore";

export const useStartChat = () => {
  const [isPending, startTransition] = useTransition();
  const { setSelectedCharacterId, setCharacters } = useSelectedCardStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { setTokens } = usePaymentStore();
  const router = useRouter();

  const handleStartChat = async (avatar: Character) => {
    setSelectedCharacterId(avatar.id);
    try {
      const startChat = await startConversation({
        userId: user?.uid ?? 'id',
        characterId: avatar.id.toString()
      });

      const startChatMessages = mapBackendMessagesToMessages(startChat?.response ?? []);
      const tokens = startChat?.tokens_remaining;

      startTransition(() => {
        router.push(`/chats`);
      });

      const preparedCharacters = saveCharacterToLocalStorage(avatar, startChatMessages, tokens ?? 0);
      setCharacters(preparedCharacters ?? null);
      setTokens(tokens ?? 0);
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  const handleClick = async (avatar:Character) => {
    setIsLoading(true);
    await handleStartChat(avatar);
    setIsLoading(false);
  };

  return { handleClick, isLoading };
};