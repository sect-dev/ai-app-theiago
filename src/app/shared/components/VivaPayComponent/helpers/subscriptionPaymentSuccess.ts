import { safeLocalStorage } from "@/app/shared/helpers";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { usePaywallStore } from "@/app/shared/store/paywallStore";
import axios from "axios";
import { Message } from "../types";
import { useTokensStore } from "@/app/shared/store/tokensStore";

export const subscriptionSaymentSuccess = async (message: Message) => {
  const { price } = usePaywallStore.getState();
  const { selectedPlan } = usePaymentStore.getState();
  const { setIsError, setErrorMessage } = useTokensStore.getState();
  const token = message?.token;

  if (token) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vivapay_pre_subscription_purchase?token=${token}&name=${selectedPlan}`,
      );

      if (response.data.error) {
        setIsError(true);
        setErrorMessage(response.data.error);
        return;
      }

      if (response.status === 200 && !response.data.error) {
        setIsError(false);
        const paywallSearchParams = new URLSearchParams(window.location.search);
        const chargeId = response.data.charge_id;

        // Формируем параметры для редиректа на главную страницу
        const redirectParams = new URLSearchParams({
          action: "subscription_success",
          order_number: chargeId,
          product: selectedPlan || "",
          price: price?.toString() || "",
          payment_system: "vivapay",
        });

        paywallSearchParams.forEach((value, key) => {
          redirectParams.append(key, value);
        });

        const redirectUrl = `${window.location.origin}/?${redirectParams.toString()}`;
        window.location.href = redirectUrl;
      }
    } catch (e) {
      console.log("error", e);
    }
  } else {
    console.warn("Token not found in response:", message);
  }
};
