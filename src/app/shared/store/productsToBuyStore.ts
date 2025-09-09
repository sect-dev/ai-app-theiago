

import { create } from "zustand";
import type { PaymentPlan } from "@/app/shared/api/payment";
import { getPaymentPlans } from "@/app/shared/api/payment";

type ProductsToBuyState = {
  plans: PaymentPlan[];
  isLoading: boolean;
  loaded: boolean;
  isError: boolean;
  errorId: number;
  errorMessage: string | null;
  // actions
  fetchPlans: () => Promise<void>;
  init: () => void;
  resetError: () => void;
  subscriptionPlans: () => PaymentPlan[];
  tokenPlans: () => PaymentPlan[];
};

export const useProductsToBuyStore = create<ProductsToBuyState>((set, get) => ({
  plans: [],
  isLoading: false,
  loaded: false,
  isError: false,
  errorId: 0,
  errorMessage: null,

  resetError: () => set({ isError: false, errorMessage: null }),


  subscriptionPlans: () => get().plans.filter((p) => p.kind === 'subscription'),
  tokenPlans: () => get().plans.filter((p) => p.kind === 'tokens'),

  fetchPlans: async () => {
    // prevent concurrent loads
    const { isLoading } = get();
    if (isLoading) return;
    set({ isLoading: true });
    try {
      const plans = await getPaymentPlans();
      set({ plans, isLoading: false, loaded: true });
    } catch (e) {
      set((state) => ({
        isLoading: false,
        isError: true,
        loaded: false,
        errorId: state.errorId + 1,
        errorMessage: e instanceof Error ? e.message : "Failed to load plans",
      }));
    }
  },

  init: () => {
    if (typeof window === "undefined") return; // only run in browser
    const { loaded, isLoading } = get();
    if (!loaded && !isLoading) {
      void get().fetchPlans();
    }
  },
}));

// Auto-fetch once on the client when this module is imported
if (typeof window !== "undefined") {
  const s = useProductsToBuyStore.getState();
  if (!s.loaded && !s.isLoading) {
    void s.fetchPlans();
  }
}
