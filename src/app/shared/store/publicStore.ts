import { create } from "zustand";

interface Card {
  id: number;
  title: string;
  description: string;
  image?: string
}

interface SelectedCardState {
  selectedCard: Card | null;
  setSelectedCard: (card: Card) => void;
}

export const useSelectedCardStore = create<SelectedCardState>((set) => ({
  selectedCard: null,
  setSelectedCard: (card) => set({ selectedCard: card }),
}));
