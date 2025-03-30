import { create } from "zustand";
import {Character, PreparedAvatar} from "@/app/shared/api/types";

const loadCharactersFromLocalStorage = (): PreparedAvatar[] | null => {
  if (typeof window === "undefined") return null;
  const storedCharacters = localStorage.getItem("chatStartedCharacters");
  return storedCharacters ? JSON.parse(storedCharacters) : null;
};

interface SelectedCardState {
  selectedCard: Character | null;
  selectedTag: string | null;
  characterInfoCollapse: boolean
  isQrModalActive: boolean
  characters: PreparedAvatar[] | null;
  isMobileChatOpen: boolean
  isMobileInfoOpen: boolean
  setSelectedCard: (avatar: Character | null) => void;
  setSelectedTag: (tag: string | null) => void;
  setCharacters: (characters: PreparedAvatar[] | null) => void;
  setInfoCollapse:(value:boolean) => void
  setMobileChatOpen:(value: boolean) => void
  setMobileInfoOpen:(value: boolean) => void
  setQrModal: (isQrModalActive:boolean) => void,
}

export const useSelectedCardStore = create<SelectedCardState>((set) => {
  const initialCharacters = loadCharactersFromLocalStorage();

  return {
    selectedCard: null,
    selectedTag: null,
    characterInfoCollapse: false,
    isMobileChatOpen: false,
    isMobileInfoOpen: false,
    isQrModalActive: false,
    characters: initialCharacters,
    setSelectedCard: (card) => set({ selectedCard: card }),
    setSelectedTag: (tag) => set({ selectedTag: tag }),
    setCharacters: (characters) => set({ characters }),
    setInfoCollapse:(characterInfoCollapse) => set({characterInfoCollapse}),
    setMobileChatOpen:(isMobileChatOpen: boolean) => set({isMobileChatOpen}),
    setMobileInfoOpen:(isMobileInfoOpen: boolean) => set({isMobileInfoOpen}),
    setQrModal: (isQrModalActive:boolean) => set({ isQrModalActive}),
  };
});
