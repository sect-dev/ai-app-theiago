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
  characters: IAvatar[] | null;
  setSelectedCard: (avatar: IAvatar) => void;
  setSelectedTag: (tag: string | null) => void;
  setCharacters: (characters: IAvatar[] | null) => void;
}

export const useSelectedCardStore = create<SelectedCardState>((set) => {
  const initialCharacters = loadCharactersFromLocalStorage();

  return {
    selectedCard: null,
    selectedTag: null,
    characters: initialCharacters,
    setSelectedCard: (card) => set({ selectedCard: card }),
    setSelectedTag: (tag) => set({ selectedTag: tag }),
    setCharacters: (characters) => set({ characters }),
  };
});
