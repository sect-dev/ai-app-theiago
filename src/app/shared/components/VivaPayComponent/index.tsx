import { useEffect, useRef, useState } from 'react';
import { IS_CLIENT, STAGE_URL } from '../../consts';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { safeLocalStorage } from '../../helpers';
import { usePaymentStore } from '../../store/paymentStore';

const OPTIONS = {
	redirectUrl: "http://localhost:3000",
	paypalButtonStyle: "black"
}



interface Props {
	price: number;
}

const VivaPayComponent = (props: Props) => {
const { price } = props;
const iframeContainerRef = useRef<HTMLDivElement>(null);
const router = useRouter();
const formRef = useRef<HTMLFormElement>(null);
const [email, setEmail] = useState("");
const {selectedPlan} = usePaymentStore();

console.log(price)
console.log(selectedPlan)

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
}


const paymentSuccess = async (message: any) => {
	console.log("payment success", message);

	const token = message?.token;

	if (token) {
    console.log("Token:", token);

	try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vivapay_pre_subscription_purchase?token=${token}&name=${selectedPlan}`)

	  if (response.status === 200) {
		const email = safeLocalStorage.get("emailForSignIn");
		const chargeId = response.data.charge_id;

		safeLocalStorage.set("paywallBuyParams", JSON.stringify({order_number: chargeId, price: price}));

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
}

useEffect(() => {
	if (!IS_CLIENT || !window.vivapay || !iframeContainerRef.current) {
		return;
	}

	const vivapay = window.vivapay;



	vivapay
	.init("development", "pubtest64723d350046b7121c445fd2b446a2867164e311f2-eu")
	.setBillingAddress(BILLING_INFO)
	.addPaymentUI("iframeContainer", price, "USD", OPTIONS)
    vivapay.onSuccess(paymentSuccess)
	
}, [price])

useEffect(() => {
	if (window.vivapay) {
		window.vivapay.setAmount(price)
	}		
}, [price])

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

	  <label>
		Email:
		<input type="email" value={email} onChange={(e) => {
    const val = e.target.value;
    setEmail(val);
    safeLocalStorage.set("emailForSignIn", val);
  }} />
	  </label>

      <div className="mb-4 text-gray-700">
        <strong>Total amount:</strong> ${price.toFixed(2)}
      </div>


      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  )
};

export default VivaPayComponent;
