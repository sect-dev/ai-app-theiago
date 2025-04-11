import { create } from "zustand";

export type Plan = "3_months_premium_access" | "1_month_premium_access" | "6_months_premium_access" | "12 months_premium _access"
export type PaymentModalType = 'subscription_success' | 'auth_success' | null

const loadCharactersFromLocalStorage = (): { tokens: number } => {
  if (typeof window === "undefined") return { tokens: 0 };
  const tokensStore = localStorage.getItem("tokens");
  return {
    tokens: tokensStore ? JSON.parse(tokensStore) : 0,
  }
};

interface PaymentState {
  isPaymentModalActive: boolean
  isSuccessPaymentModalActive: boolean
  successPaymentModalType: PaymentModalType
  selectedPlan: Plan
  tokens: number
  setTokens: (tokens: number | 0) => void;
  isTokensModalActive: boolean
  setPaymentModal: (value: boolean ) => void;
  setSuccessPaymentModal: (value: {
    isSuccessPaymentModalActive: boolean;
    successPaymentModalType: PaymentModalType;
  }) => void;
  setPlan: (value: Plan ) => void;
  setTokensModal:(value: boolean) => void;
}

export const usePaymentStore = create<PaymentState>((set) => {
  const initialTokens= loadCharactersFromLocalStorage();
  return {
    isPaymentModalActive: false,
    isSuccessPaymentModalActive: false,
    isTokensModalActive: false,
    selectedPlan: '3_months_premium_access',
    successPaymentModalType: 'subscription_success',
    tokens: initialTokens.tokens,
    setTokens: (tokens) => set({tokens}),
    setPaymentModal: (isPaymentModalActive: boolean) => set({isPaymentModalActive}),
    setSuccessPaymentModal: ({isSuccessPaymentModalActive, successPaymentModalType}) =>
      set({isSuccessPaymentModalActive, successPaymentModalType}),
    setPlan: (selectedPlan: Plan) => set({selectedPlan}),
    setTokensModal: (isTokensModalActive: boolean) => set({isTokensModalActive})
  }
});