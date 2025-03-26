import { create } from "zustand";

interface PaymentState {
  isPaymentModalActive: boolean
  isSuccessPaymentModalActive: boolean
  tokens: number | null
  setTokens: (tokens: number | null) => void;
  setPaymentModal: (value: boolean ) => void;
  setSuccessPaymentModal: (value: boolean ) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  isPaymentModalActive: false,
  isSuccessPaymentModalActive: false,
  tokens: null,
  setTokens:(tokens) => set({tokens}),
  setPaymentModal: (isPaymentModalActive:boolean) => set({ isPaymentModalActive}),
  setSuccessPaymentModal: (isSuccessPaymentModalActive:boolean) => set({ isSuccessPaymentModalActive}),
}));