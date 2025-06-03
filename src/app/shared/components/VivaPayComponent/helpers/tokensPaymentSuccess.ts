import { safeLocalStorage } from "@/app/shared/helpers";
import axios from "axios";
import { usePaywallStore } from "@/app/shared/store/paywallStore";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useTokensStore } from "@/app/shared/store/tokensStore";
import { Message } from "../types";

export const tokensPaymentSuccess = async (message: Message) => {
  const { price } = usePaywallStore.getState();
  const { selectedPlan } = usePaymentStore.getState();
  const token = message?.token;
  const { user } = useAuthStore.getState();
  const { selectedCharacterId } = useSelectedCardStore.getState();
  const { selectedTokensPlan } = useTokensStore.getState();

  if (token) {
    console.log("Token:", token);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vivapay_tokens_purchase?token=${token}&name=${selectedTokensPlan}&user_id=${user?.uid}`,
      );

      if (response.status === 200) {
        console.log("response", response);
        const chargeId = response.data.charge_id;

        // Формируем параметры для редиректа на главную страницу
        const redirectParams = new URLSearchParams({
          action: "tokens_success",
          order_number: chargeId,
          product: selectedTokensPlan || "", // используем selectedPlan или дефолтное значение
          user_id: user?.uid || "",
          character_id: selectedCharacterId?.toString() || "",
          price: price?.toString() || "",
          payment_system: "vivapay",
        });

        // Редиректим на главную страницу с параметрами
        const redirectUrl = `${window.location.origin}/?${redirectParams.toString()}`;
        console.log("Redirecting to:", redirectUrl);

        window.location.href = redirectUrl;
      }
    } catch (e) {
      console.log("error", e);
    }
  } else {
    console.warn("Token not found in response:", message);
  }
};
