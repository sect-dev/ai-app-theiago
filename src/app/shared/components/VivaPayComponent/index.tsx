import { useEffect, useRef } from "react";
import { IS_CLIENT } from "../../consts";
import { Message } from "./types";
import { useTokensStore } from "@/app/shared/store/tokensStore";
import log from "../../lib/logger";

const OPTIONS = {
  redirectUrl: "https://stage.web.theaigo.com",
  paypalButtonStyle: "black",
};

interface Props {
  price: number;
  paymentSuccess: (message: Message) => void;
  isPaywall?: boolean;
}

const VivaPayComponent = (props: Props) => {
  const { price, paymentSuccess, isPaywall = false } = props;
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const { errorId, isError, errorMessage } = useTokensStore();

  const BILLING_INFO = {
    firstName: "John",
    lastName: "Doe",
    email: "",
    phoneNumber: "+1405666777",
    streetAddress: "Your Address",
    city: "LA",
    country: "US",
    region: "Freshwater",
    postalCode: "11111",
    state: "CA",
  };

  useEffect(() => {
    if (!IS_CLIENT || !window.vivapay || !iframeContainerRef.current) {
      return;
    }

    const vivapay = window.vivapay;

    vivapay
      .init(
        "development",
        "pubtest64723d350046b7121c445fd2b446a2867164e311f2-eu",
      )
      .setBillingAddress(BILLING_INFO)
      .addPaymentUI("iframeContainer", price, "USD", OPTIONS);
    log.debug("VivaPayComponent", "Vivapay iframe init");
    vivapay.onSuccess(paymentSuccess);
  }, [price, errorId]);

  useEffect(() => {
    if (window.vivapay) {
      log.debug("VivaPayComponent", "Vivapay iframe price set");
      window.vivapay.setAmount(price);
    }
  }, [price]);

  return (
    <form method="POST" action="/">
      <div
        id="iframeContainer"
        ref={iframeContainerRef}
        className="mb-4 w-full rounded-[6px] bg-white"
      />

      <div className="flex flex-row items-center justify-between gap-4">
        <div className="text-gray-700">
          <strong>Total amount:</strong> ${price.toFixed(2)}
        </div>

        <button
          type="submit"
          className="main-gradient h-[24px] animate-fadeIn rounded-[8px] px-[16px] text-[16px] font-bold"
        >
          <span className="relative z-[5]">Buy</span>
        </button>
      </div>

      {isError && (
        <div className="text-red-500">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </form>
  );
};

export default VivaPayComponent;
