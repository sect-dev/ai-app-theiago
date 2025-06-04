import { useEffect, useRef, useState } from "react";
import { IS_CLIENT, STAGE_URL } from "../../consts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { safeLocalStorage } from "../../helpers";
import { usePaymentStore } from "../../store/paymentStore";
import { Message } from "./types";
import { useForm } from "react-hook-form";

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
    vivapay.onSuccess(paymentSuccess);
  }, [price]);

  useEffect(() => {
    if (window.vivapay) {
      window.vivapay.setAmount(price);
    }
  }, [price]);

  return (
    <form method="POST" action="/">
      <div id="iframeContainer" ref={iframeContainerRef} className="mb-4" />

      <div className="text-gray-700 mb-4">
        <strong>Total amount:</strong> ${price.toFixed(2)}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Submit button
      </button>
    </form>
  );
};

export default VivaPayComponent;
