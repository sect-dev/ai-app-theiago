import { safeLocalStorage } from "@/app/shared/helpers";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { usePaywallStore } from "@/app/shared/store/paywallStore";
import axios from "axios";
import { Message } from "../types";

export const subscriptionSaymentSuccess = async (message: Message) => {
  const { price } = usePaywallStore.getState();
  const { selectedPlan } = usePaymentStore.getState();
  const token = message?.token;

  if (token) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vivapay_pre_subscription_purchase?token=${token}&name=${selectedPlan}`,
      );

      if (response.status === 200) {
        const paywallSearchParams = new URLSearchParams(window.location.search);
        const email = safeLocalStorage.get("emailForSignIn");
        const chargeId = response.data.charge_id;

        safeLocalStorage.set(
          "paywallBuyParams",
          JSON.stringify({
            order_number: chargeId,
            price: price,
            payment_system: "vivapay",
            paywallSearchParams: paywallSearchParams.toString(),
          }),
        );

        if (email) {
          // Формируем URL для перенаправления
          const autologinUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/first_autologin?email=${encodeURIComponent(email)}`;

          window.location.href = autologinUrl;
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  } else {
    console.warn("Token not found in response:", message);
  }
};
