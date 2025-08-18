import { create } from "zustand";

interface TokensStore {
	selectedTokensPlan: string | null;
	isError: boolean;
	errorId: number;
	errorMessage: string | null;
	setSelectedTokensPlan: (selectedTokensPlan: string) => void;
	setIsError: (isError: boolean) => void;
	setErrorMessage: (errorMessage: string) => void;
}

export const useTokensStore = create<TokensStore>((set) => ({
	selectedTokensPlan: null,
	isError: false,
	errorId: 0,
	errorMessage: null,
	setSelectedTokensPlan: (selectedTokensPlan: string) =>
		set({ selectedTokensPlan }),
	setIsError: (isError: boolean) =>
		set((state) => ({ isError: isError, errorId: state.errorId + 1 })),
	setErrorMessage: (errorMessage: string) => set({ errorMessage })
}));
