import axios  from "axios";
import { Plan } from "../store/paymentStore";

export interface PaymentPlan {
  currency: string;
  id?: Plan
  interval_unit: 'month' | 'year' | 'week' | 'day';
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

export const getPaymentPlans = async (): Promise<PaymentPlan[]> => {
  try {
    const response = await axios.get<PaymentPlansResponse>(
      'https://production-payments.theaigo.com:8000/products?place=landing-paywall'
    );
    return Object.entries(response.data).map(([id, plan]) => ({id, ...plan}));
  } catch(error) {
    console.error("Error receiving tariff plans:", error);
    throw error;
  }
}