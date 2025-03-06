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
  characters: PreparedAvatar[] | null;
  tokens: number | null
  isMobileChatOpen: boolean
  isMobileInfoOpen: boolean
  isAuthModalActive: boolean
  modalType: "login" | "register" | "forgotPass" | null,
  setSelectedCard: (avatar: Character) => void;
  setSelectedTag: (tag: string | null) => void;
  setCharacters: (characters: PreparedAvatar[] | null) => void;
  setTokens: (tokens: number | null) => void;
  setInfoCollapse:(value:boolean) => void
  setMobileChatOpen:(value: boolean) => void
  setMobileInfoOpen:(value: boolean) => void
  setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => void;
}

export const useSelectedCardStore = create<SelectedCardState>((set) => {
  const initialCharacters = loadCharactersFromLocalStorage();

  return {
    selectedCard: null,
    selectedTag: null,
    characterInfoCollapse: false,
    isMobileChatOpen: false,
    tokens: null,
    isMobileInfoOpen: false,
    isAuthModalActive: false,
    modalType: "login",
    characters: initialCharacters,
    setSelectedCard: (card) => set({ selectedCard: card }),
    setSelectedTag: (tag) => set({ selectedTag: tag }),
    setCharacters: (characters) => set({ characters }),
    setTokens:(tokens) => set({tokens}),
    setInfoCollapse:(characterInfoCollapse) => set({characterInfoCollapse}),
    setMobileChatOpen:(isMobileChatOpen: boolean) => set({isMobileChatOpen}),
    setMobileInfoOpen:(isMobileInfoOpen: boolean) => set({isMobileInfoOpen}),
    setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => set({modalType: value.modalType, isAuthModalActive:value.isAuthModalActive}),
  };
});
