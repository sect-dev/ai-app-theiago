// @ts-nocheck
const TRACKDESK_ACCOUNT = "aigo";
const REVENUE_ORIGIN_ID = "5bd848fb-e5ce-4443-8dd4-9ebaf3f9c97a";

interface TrackdeskConversionData {
	conversionType: string;
	amount: {
		value: string;
	};
	externalCid?: string;
	revenueOriginId?: string;
}

export const trackClick = () => {
	if (typeof window !== "undefined" && window.trackdesk) {
		window.trackdesk(TRACKDESK_ACCOUNT, "click");
	}
};

export const trackConversion = (amount: string) => {
	if (typeof window !== "undefined" && window.trackdesk) {
		console.log("trackConversion", amount);
		window.trackdesk(TRACKDESK_ACCOUNT, "conversion", {
			conversionType: "sale",
			amount: {
				value: amount
			}
		});
		console.log("trackConversion done");
	}
};

export const trackCustomEvent = (
	eventName: string,
	data?: TrackdeskConversionData
) => {
	if (typeof window !== "undefined" && window.trackdesk) {
		window.trackdesk(TRACKDESK_ACCOUNT, eventName, data);
	}
};

export const trackExternalCid = (externalCid: string) => {
	if (typeof window !== "undefined" && window.trackdesk) {
		window.trackdesk(TRACKDESK_ACCOUNT, "externalCid", {
			externalCid: externalCid,
			revenueOriginId: REVENUE_ORIGIN_ID
		});
	}
};
