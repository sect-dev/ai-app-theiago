import axios from "axios";
import { usePaywallStore } from "@/app/shared/store/paywallStore";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useTokensStore } from "@/app/shared/store/tokensStore";
import { Message } from "../types";
import log from "@/app/shared/lib/logger";
import * as Sentry from "@sentry/nextjs";

export const tokensPaymentSuccess = async (message: Message) => {
  const { price } = usePaywallStore.getState();
  const token = message?.token;
  const { user } = useAuthStore.getState();
  const { selectedCharacterId } = useSelectedCardStore.getState();
  const { selectedTokensPlan } = useTokensStore.getState();
  const { setIsError, setErrorMessage } = useTokensStore.getState();

  if (token) {
    log.debug("tokensPaymentSuccess.ts", "token found in response:: ", token);

    try {
      log.debug(
        "tokensPaymentSuccess.ts",
        "starting /vivapay_tokens_purchase request:: ",
        token,
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vivapay_tokens_purchase?token=${token}&name=${selectedTokensPlan}&user_id=${user?.uid}`,
      );

      if (response.data.error) {
        log.error(
          "tokensPaymentSuccess.ts",
          "/vivapay_tokens_purchase error:: ",
          response.data.error,
        );
        setIsError(true);
        setErrorMessage(response.data.error);
        return;
      }

      if (response.status === 200 && !response.data.error) {
        log.debug(
          "tokensPaymentSuccess.ts",
          "request /vivapay_tokens_purchase success data:: ",
          response.data,
        );
        setIsError(false);
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

        log.debug(
          "tokensPaymentSuccess.ts",
          "setting redirectParams:: ",
          redirectParams.toString(),
        );

        // Редиректим на главную страницу с параметрами
        const redirectUrl = `${window.location.origin}/?${redirectParams.toString()}`;
        log.debug("tokensPaymentSuccess.ts", "redirecting to:: ", redirectUrl);

        window.location.href = redirectUrl;
      }
    } catch (e) {
      Sentry.captureException(e, {
        tags: {
          payment_system: "vivapay",
        },
        extra: {
          message: message,
        },
      });
      log.error(
        "tokensPaymentSuccess.ts",
        "couldn't execute /vivapay_tokens_purchase request:: ",
        e,
      );
    }
  } else {
    log.error(
      "tokensPaymentSuccess.ts",
      "Token not found in response:: ",
      message,
    );
  }
};
