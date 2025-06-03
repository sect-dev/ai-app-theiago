import { create } from "zustand";

interface TokensStore {
  selectedTokensPlan: string | null;
  setSelectedTokensPlan: (selectedTokensPlan: string) => void;
}

export const useTokensStore = create<TokensStore>((set) => ({
  selectedTokensPlan: null,
  setSelectedTokensPlan: (selectedTokensPlan: string) =>
    set({ selectedTokensPlan }),
}));
