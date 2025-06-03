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

interface FormData {
  email: string;
}


interface Props {
  price: number;
  paymentSuccess: (message: Message) => void;
  isPaywall?: boolean;
}

const VivaPayComponent = (props: Props) => {
  const { price, paymentSuccess, isPaywall = false } = props;
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const { register, handleSubmit } = useForm();
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

  useEffect(() => {
    if (IS_CLIENT && window.vivapay && email) {
      window.vivapay.setBillingAddress({
        email,
      });
    }
  }, [email]);

  return (
    <form method="POST" action="/">
      <div id="iframeContainer" ref={iframeContainerRef} className="mb-4" />

      {isPaywall && (
        <label>
          Email:
          <input
            type="email"
            value={email}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Wrong email" },
              onChange: (e) => {
                const val = e.target.value;
                setEmail(val);
                safeLocalStorage.set("emailForSignIn", val);
              },
            })}
          />
        </label>
      )}

      <div className="text-gray-700 mb-4">
        <strong>Total amount:</strong> ${price.toFixed(2)}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default VivaPayComponent;
