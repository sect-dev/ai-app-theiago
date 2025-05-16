import { create } from "zustand";
import { apiClient } from "../api";

interface Character {
  id: string;
  name: string;
  image: string;
}

export interface SubscriptionData {
  active: boolean;
  cancelled: boolean;
  end: string;
  start: string;
  price: number;
  productId: string;
}

interface SubscriptionStore {
  isSubscriptionModalActive: boolean;
  isCancelConfirmModalActive: boolean;
  subscriptionData: SubscriptionData | null;
  recentChats: Character[] | null | undefined;
  subscriptionToken: string | null;
  isCancelSuccess: boolean | null;

  openSubscriptionModal: (data: SubscriptionData, token: string) => void;
  closeSubscriptionModal: () => void;
  requestCancelSubscription: () => Promise<void>; // Переименовано для ясности
  confirmCancelSubscription: () => Promise<void>;
  declineCancelSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  isSubscriptionModalActive: false,
  isCancelConfirmModalActive: false,
  subscriptionData: null,
  recentChats: null,
  subscriptionToken: null,
  isCancelSuccess: null,

  openSubscriptionModal: (data, token) => {
    set({
      isSubscriptionModalActive: true,
      subscriptionData: data,
      subscriptionToken: token,
    });
  },

  closeSubscriptionModal: () =>
    set({
      isSubscriptionModalActive: false,
      subscriptionData: null,
      subscriptionToken: null,
    }),

  requestCancelSubscription: async () => {
    const { isCancelSuccess, subscriptionData } = get();
    try {
      const recentChats = localStorage.getItem("chatStartedCharacters");
      if (isCancelSuccess || subscriptionData?.cancelled) return;

      const parsed = recentChats ? JSON.parse(recentChats) : [];
      const lastFour = Array.isArray(parsed) ? parsed.slice(-4) : [];
      set({
        isSubscriptionModalActive: false, // Сначала закрываем модалку подписки
        isCancelConfirmModalActive: true, // Затем открываем подтверждение
        recentChats: lastFour,
      });
    } catch (e) {
      console.log("failed to load recent chats", e);
    }
  },

  confirmCancelSubscription: async () => {
    const { subscriptionToken, subscriptionData } = get();
    if (subscriptionData?.cancelled === true) {
      console.log("subscription is already cancelled");
      return;
    }

    if (!subscriptionToken) {
      console.log("net token");
      return;
    }

    try {
      // isTokenExpired(subscriptionToken)
      const response = await apiClient.get(
        `/cancel_subscription?token=${subscriptionToken}`,
      );
      if (response.status === 200) {
        console.log("response data::  ", response.data);
        set({
          isSubscriptionModalActive: true,
          isCancelSuccess: true,
          isCancelConfirmModalActive: false,
          subscriptionToken: null,
          recentChats: null,
        });
      }
    } catch (e) {
      console.log("failed to cancel subscription", e);
      set({
        isSubscriptionModalActive: true,
        isCancelSuccess: false, // Флаг ошибки
      });
    }
  },

  declineCancelSubscription: () => {
    set({
      isCancelConfirmModalActive: false,
      recentChats: null,
    });
  },
}));
