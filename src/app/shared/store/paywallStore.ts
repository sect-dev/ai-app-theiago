import { create } from "zustand";

interface PaywallStore {
	price: number;
	setPrice: (price: number) => void;
}

export const usePaywallStore = create<PaywallStore>((set) => ({
	price: 14.99,
	setPrice: (price: number) => set({ price })
}));
