import { apiClient, getCurrentToken } from "@/app/shared/api/index";

export type TPProduct = {
    "product_id": number,
    "price": string,
    "kind": string,
    "tokens_amount"?: number,
    "type"?: string
}

export const getTrustPayProducts = async (): Promise<TPProduct[]> => {
    try {
        const response = await apiClient.get(`/trustpay/products`);
        console.log('response: ', response);
        return response.data;
    } catch (error) {
        console.error("Error fetching TrustPay products:", error);
        return [];
    }
};

export const getTrustPayGatewayUrl = async (productId: number): Promise<string> => {
    try {

        const token = await getCurrentToken();

        const response = await apiClient.post(`/trustpay/gateway-url`, {
            token,
            product_id: productId,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
