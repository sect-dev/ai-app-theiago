import { create } from "zustand";
import * as Sentry from "@sentry/nextjs";

export type Plan = string;
export type PaymentModalType =
  | "subscription_success"
  | "auth_success"
  | "auth_organic"
  | "tokens_success"
  | null;

const loadCharactersFromLocalStorage = (): { tokens: number } => {
  if (typeof window === "undefined") return { tokens: 0 };

  const tokensStore = localStorage.getItem("tokens");

  if (!tokensStore || tokensStore === "undefined" || tokensStore === "null") {
    return { tokens: 0 };
  }

  try {
    const parsedTokens = JSON.parse(tokensStore);
    return {
      tokens: parsedTokens.tokens,
    }
  } catch (error) {
    Sentry.captureMessage("Error parsing tokens from localStorage", {
      level: "error",
      extra: {
        tokensStore,
      },
    });
    return { tokens: 0 };
  }
};

interface PaymentState {
  isPaymentModalActive: boolean;
  isSuccessPaymentModalActive: boolean;
  successPaymentModalType: PaymentModalType;
  selectedPlan: Plan;
  tokens: number;
  setTokens: (tokens: number | 0) => void;
  isTokensModalActive: boolean;
  setPaymentModal: (value: boolean) => void;
  setSuccessPaymentModal: (value: {
    isSuccessPaymentModalActive: boolean;
    successPaymentModalType: PaymentModalType;
  }) => void;
  setPlan: (value: Plan) => void;
  setTokensModal: (value: boolean) => void;
}

export const usePaymentStore = create<PaymentState>((set) => {
  const initialTokens = loadCharactersFromLocalStorage();
  return {
    isPaymentModalActive: false,
    isSuccessPaymentModalActive: false,
    isTokensModalActive: false,
    selectedPlan: "3_months_premium_access",
    successPaymentModalType: "subscription_success",
    tokens: initialTokens.tokens,
    setTokens: (tokens) => set({ tokens }),
    setPaymentModal: (isPaymentModalActive: boolean) =>
      set({ isPaymentModalActive }),
    setSuccessPaymentModal: ({
      isSuccessPaymentModalActive,
      successPaymentModalType,
    }) => set({ isSuccessPaymentModalActive, successPaymentModalType }),
    setPlan: (selectedPlan: Plan) => set({ selectedPlan }),
    setTokensModal: (isTokensModalActive: boolean) =>
      set({ isTokensModalActive }),
  };
});
