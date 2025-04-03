import { create } from "zustand";
import {Character, CharacterByConstructor, PreparedAvatar} from "@/app/shared/api/types";

const loadCharactersFromLocalStorage = (): { mainChar: PreparedAvatar[] | null, tempChar: CharacterByConstructor | null } => {
  if (typeof window === "undefined") return { mainChar: null, tempChar: null };
  const storedCharacters = localStorage.getItem("chatStartedCharacters");
  const storedCharFromPaywall = localStorage.getItem('charFromPaywall')
  return {
    mainChar: storedCharacters ? JSON.parse(storedCharacters) : null,
    tempChar: storedCharFromPaywall? JSON.parse(storedCharFromPaywall) : null
  }
};

interface SelectedCardState {
  selectedCard: Character | null;
  selectedTag: string | null;
  characterInfoCollapse: boolean
  charFromPaywall: CharacterByConstructor | null
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
  setPaywallCharacter: (value: CharacterByConstructor | null) => void
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
    characters: initialCharacters.mainChar,
    charFromPaywall: initialCharacters.tempChar,
    setSelectedCard: (card) => set({ selectedCard: card }),
    setSelectedTag: (tag) => set({ selectedTag: tag }),
    setCharacters: (characters) => set({ characters }),
    setInfoCollapse:(characterInfoCollapse) => set({characterInfoCollapse}),
    setMobileChatOpen:(isMobileChatOpen: boolean) => set({isMobileChatOpen}),
    setMobileInfoOpen:(isMobileInfoOpen: boolean) => set({isMobileInfoOpen}),
    setQrModal: (isQrModalActive:boolean) => set({ isQrModalActive}),
    setPaywallCharacter: (charFromPaywall) => set({charFromPaywall})
  };
});
