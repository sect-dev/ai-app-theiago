import axios from "axios";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import { apiClient, getCurrentToken } from "@/app/shared/api/index";
import { getTrustPayProducts } from "@/app/shared/api/trustPay";

export interface PaymentPlan {
	currency: string;
	id: number;
	interval_unit: string;
	interval_length: number;
	amount_initial: number;
	amount_recurring: number;
	kind: string | undefined;
	places: string[];
	schedule_id: string;
  description: string;
}

export const getPaymentPlans = async (): Promise<PaymentPlan[]> => {
	const products = await getTrustPayProducts();

  return products.map((p) => {
    const [interval_length, interval_unit] = p.type ? p.type.split("_") : [p.tokens_amount, 'tokens'];
    return {
      id: p.product_id,
      currency: "USD",
      amount_initial: Number(p.price),
      amount_recurring: Number(p.price),
      interval_unit: interval_unit as string,
      interval_length: interval_length as number,
      kind: p.kind,
      tokens_included: p.tokens_amount ?? 0,
      places: [],
      schedule_id: "",
      description: p.kind === "subscription" ? p.type as string : p.description as string,
    }
  })
};

export const activateTokens = async (orderNumber: string) => {
	const token = await getCurrentToken();
	const urlParams = new URLSearchParams(window.location.search);
	const paymentSystem = urlParams.get("payment_system");

	try {
		const resp = await apiClient.get(
			`/activate_tokens?order_number=${orderNumber}&token=${token}&payment_system=${paymentSystem}`
		);
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
