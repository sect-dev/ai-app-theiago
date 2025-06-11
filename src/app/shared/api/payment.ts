import axios from "axios";
import { Plan } from "../store/paymentStore";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import { apiClient, getCurrentToken } from "@/app/shared/api/index";

export interface PaymentPlan {
  currency: string;
  id?: Plan;
  interval_unit: "month" | "year" | "week" | "day";
  interval_length: number;
  amount_initial: number;
  amount_recurring: number;
  description: string;
  places: string[];
  schedule_id: string;
}

interface PaymentPlansResponse {
  "1_month_premium_access": PaymentPlan;
  "3_months_premium_access": PaymentPlan;
  "6_months_premium_access": PaymentPlan;
  "1_year_premium_access": PaymentPlan;
}

export const getPaymentPlans = async (
  locale?: string,
): Promise<PaymentPlan[]> => {
  try {
    const response = await axios.get<PaymentPlansResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/products?place=landing-paywall&locale=${locale}`,
      {
        timeout: 10000,
      },
    );
    return Object.entries(response.data).map(([id, plan]) => ({ id, ...plan }));
  } catch (error) {
    console.error("Error receiving tariff plans:", error);
    throw error;
  }
};

export const getTokenPackageInfo = async (): Promise<
  StrictTokenPackage[] | null
> => {
  try {
    const response = await axios.get<Record<string, StrictTokenPackage>>(
      `${process.env.NEXT_PUBLIC_API_URL}/products?place=tokens-paywall`,
    );
    const data = response.data;
    return Object.values(data);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }
};

export const buyTokens = async (
  name: string,
  userId: string,
  email: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${name}&user_id=${userId}&email=${email}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const activateTokens = async (orderNumber: string) => {
  const token = await getCurrentToken();
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSystem = urlParams.get("payment_system");

  try {
    const resp = await apiClient.get(
      `/activate_tokens?order_number=${orderNumber}&token=${token}&payment_system=${paymentSystem}`,
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
