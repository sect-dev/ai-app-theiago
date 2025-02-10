import { create } from "zustand";
import {IAvatar} from "@/app/shared/api/types";

interface SelectedCardState {
  selectedCard: IAvatar | null;
  selectedTag: string | null;
  setSelectedCard: (avatar: IAvatar) => void;
  setSelectedTag: (tag: string | null) => void;
}

export const useSelectedCardStore = create<SelectedCardState>((set) => ({
  selectedCard: null,
  selectedTag: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}));
