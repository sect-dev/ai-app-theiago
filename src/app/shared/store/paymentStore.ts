import { create } from "zustand";

export type Plan = "3_months_premium_access" | "1_month_premium_access" | "6_months_premium_access" | "12 months_premium _access"

interface PaymentState {
  isPaymentModalActive: boolean
  isSuccessPaymentModalActive: boolean
  selectedPlan: Plan
  tokens: number | null
  setTokens: (tokens: number | null) => void;
  setPaymentModal: (value: boolean ) => void;
  setSuccessPaymentModal: (value: boolean ) => void;
  setPlan: (value: Plan ) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  isPaymentModalActive: false,
  isSuccessPaymentModalActive: false,
  selectedPlan: '3_months_premium_access',
  tokens: null,
  setTokens:(tokens) => set({tokens}),
  setPaymentModal: (isPaymentModalActive:boolean) => set({ isPaymentModalActive}),
  setSuccessPaymentModal: (isSuccessPaymentModalActive:boolean) => set({ isSuccessPaymentModalActive}),
  setPlan: (selectedPlan:Plan) => set({ selectedPlan}),
}));