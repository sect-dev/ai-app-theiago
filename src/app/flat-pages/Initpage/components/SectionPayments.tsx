import { usePaywallStore } from "@/app/shared/store/paywallStore";
import { subscriptionPaymentSuccess } from "@/app/shared/components/VivaPayComponent/helpers/subscriptionPaymentSuccess";
import VivaPayComponent from "@/app/shared/components/VivaPayComponent";
import Spinner from "@/app/widgets/Spinner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { trackBuyButtonClick } from "@/app/shared/helpers/clickTracker";
import { sendGTMEvent } from "@next/third-parties/google";
import ym from "react-yandex-metrika";
import * as fbq from "@/app/shared/lib/fbPixel";
import log from "@/app/shared/lib/logger";
import * as amplitude from "@amplitude/analytics-browser";
import { useAuthStore } from "@/app/shared/store/authStore";
import {
  trackPayproccRedirect,
  trackSubscriptionSelection,
} from "@/app/shared/lib/amplitude";

const SectionPayments = () => {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const { price } = usePaywallStore();
  const { setPlan, selectedPlan } = usePaymentStore();
  const { user } = useAuthStore();

  const paymentSystem = new URLSearchParams(window.location.search).get(
    "payment_system",
  );

  log.debug(
    "SectionPayments.tsx",
    "payment system found in url:: ",
    paymentSystem,
  );

  const IS_PAYPROCC = paymentSystem === "payprocc";
  const IS_VIVAPAY = paymentSystem === "vivapay";

  useEffect(() => {
    if (selectedPlan && paymentSystem) {
      trackSubscriptionSelection(selectedPlan, paymentSystem);
    }
  }, [selectedPlan, paymentSystem]);

  useEffect(() => {
    if (!selectedPlan || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    if (apiBase) {
      const fullUrl = `${apiBase}/pre_subscription_purchase?name=${encodeURIComponent(selectedPlan)}&${params.toString()}&user_id=${user?.uid}`;
      setIframeUrl(fullUrl);
    }
  }, [selectedPlan]);

  const handleClickBuy = async () => {
    log.debug(
      "SectionPayments.tsx",
      "sending analytics to paywall_buy:: ",
      selectedPlan,
    );
    await trackBuyButtonClick();

    sendGTMEvent({
      event: "paywall_buy",
      placement: "quiz",
      product_name: selectedPlan,
    });
    fbq.event("InitiateCheckout");
    ym("reachGoal", "paywall_buy", {
      placement: "quiz",
      product_name: selectedPlan,
    });
    amplitude.track("paywall_buy", {
      placement: "quiz",
      product_name: selectedPlan,
      domain: window.location.hostname,
    });

    if (IS_PAYPROCC && iframeUrl) {
      try {
        trackPayproccRedirect(iframeUrl, "success");
      } catch (error) {
        trackPayproccRedirect(
          iframeUrl,
          "error",
          error instanceof Error ? error.message : "unknown error",
        );
      }
    }
  };

  if (IS_PAYPROCC && !IS_VIVAPAY) {
    return (
      <div>
        {!iframeUrl ? (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <Link
            href={iframeUrl}
            onClick={handleClickBuy}
            className="relative flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-button-gradient text-center text-white disabled:opacity-50 fm:h-[16vw] fm:rounded-[6.40vw]"
          >
            <span className="font-noto-sans text-[14px] font-bold uppercase fm:text-[3.73vw]">
              payprocc payment
            </span>
            <span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
          </Link>
        )}
      </div>
    );
  }

  if (IS_VIVAPAY) {
    return (
      <VivaPayComponent
        paymentSuccess={subscriptionPaymentSuccess}
        price={price}
      />
    );
  }

  return null;
};

export default SectionPayments;
