import { create } from "zustand";
import { IAvatar } from "@/app/shared/api/types";

const loadCharactersFromLocalStorage = (): IAvatar[] | null => {
  if (typeof window === "undefined") return null;
  const storedCharacters = localStorage.getItem("characters");
  return storedCharacters ? JSON.parse(storedCharacters) : null;
};

interface SelectedCardState {
  selectedCard: IAvatar | null;
  selectedTag: string | null;
  characterInfoCollapse: boolean
  characters: IAvatar[] | null;
  tokens: number | null
  isMobileChatOpen: boolean
  isMobileInfoOpen: boolean
  setSelectedCard: (avatar: IAvatar) => void;
  setSelectedTag: (tag: string | null) => void;
  setCharacters: (characters: IAvatar[] | null) => void;
  setTokens: (tokens: number | null) => void;
  setInfoCollapse:(value:boolean) => void
  setMobileChatOpen:(value: boolean) => void
  setMobileInfoOpen:(value: boolean) => void
}

export const useSelectedCardStore = create<SelectedCardState>((set) => {
  const initialCharacters = loadCharactersFromLocalStorage();

  return {
    selectedCard: null,
    selectedTag: null,
    characterInfoCollapse: false,
    isMobileChatOpen: true,
    tokens: null,
    isMobileInfoOpen: false,
    characters: initialCharacters,
    setSelectedCard: (card) => set({ selectedCard: card }),
    setSelectedTag: (tag) => set({ selectedTag: tag }),
    setCharacters: (characters) => set({ characters }),
    setTokens:(tokens) => set({tokens}),
    setInfoCollapse:(characterInfoCollapse) => set({characterInfoCollapse}),
    setMobileChatOpen:(isMobileChatOpen: boolean) => set({isMobileChatOpen}),
    setMobileInfoOpen:(isMobileInfoOpen: boolean) => set({isMobileInfoOpen})
  };
});
