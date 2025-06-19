import { safeLocalStorage } from "@/app/shared/helpers";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { usePaywallStore } from "@/app/shared/store/paywallStore";
import axios from "axios";
import { Message } from "../types";
import { useTokensStore } from "@/app/shared/store/tokensStore";
import log from "@/app/shared/lib/logger";
import * as Sentry from "@sentry/nextjs";
import { trackVivaPayTokenReceived } from "@/app/shared/lib/amplitude";

export const subscriptionPaymentSuccess = async (message: Message) => {
  const { price } = usePaywallStore.getState();
  const { selectedPlan } = usePaymentStore.getState();
  const { setIsError, setErrorMessage } = useTokensStore.getState();
  const token = message?.token;

  if (token) {
    trackVivaPayTokenReceived(token, "success");

    try {
      log.debug(
        "subscriptionPaymentSuccess.ts",
        "starting /vivapay_pre_subscription_purchase request",
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/vivapay_pre_subscription_purchase?token=${token}&name=${selectedPlan}`,
      );

      if (response.data.error) {
        log.error(
          "subscriptionPaymentSuccess.ts",
          "/vivapay_pre_subscription_purchase error:: ",
          response.data.error,
        );
        setIsError(true);
        setErrorMessage(response.data.error);

        trackVivaPayTokenReceived(token, "error", response.data.error);
        return;
      }

      if (response.status === 200 && !response.data.error) {
        log.debug(
          "subscriptionPaymentSuccess.ts",
          "request /vivapay_pre_subscription_purchase success data:: ",
          response.data,
        );
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

        log.debug(
          "subscriptionPaymentSuccess.ts",
          "setting redirectParams:: ",
          redirectParams.toString(),
        );

        const redirectUrl = `${window.location.origin}/?${redirectParams.toString()}`;

        log.debug(
          "subscriptionPaymentSuccess.ts",
          "redirecting to:: ",
          redirectUrl,
        );
        window.location.href = redirectUrl;
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "unknown error";
      trackVivaPayTokenReceived(token, "error", errorMessage);

      Sentry.captureException(e, {
        tags: {
          payment_system: "vivapay",
        },
        extra: {
          message: message,
        },
      });
      log.error(
        "subscriptionPaymentSuccess.ts",
        "couldn't execute /vivapay_pre_subscription_purchase request:: ",
        e,
      );
    }
  } else {
    trackVivaPayTokenReceived("", "error", "no token");

    log.error(
      "subscriptionPaymentSuccess.ts",
      "an error ocurred when handling token from payment success form:: ",
      message,
    );
  }
};
