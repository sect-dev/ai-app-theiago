const TRACKDESK_ACCOUNT = "aigo";

interface TrackdeskConversionData {
    conversionType: string;
    amount: {
      value: string;
    };
  } 
  

export const trackClick = () => {
  if (typeof window !== "undefined" && window.trackdesk) {
    window.trackdesk(TRACKDESK_ACCOUNT, "click");
  }
};

export const trackConversion = (amount: string) => {
  if (typeof window !== "undefined" && window.trackdesk) {
    console.log("trackConversion", amount)
    window.trackdesk(TRACKDESK_ACCOUNT, "conversion", {
      conversionType: "sale",
      amount: {
        value: amount
      }
    });
    console.log("trackConversion done")
  }
}; 

export const trackCustomEvent = (eventName: string, data?: TrackdeskConversionData) => {
  if (typeof window !== "undefined" && window.trackdesk) {
    window.trackdesk(TRACKDESK_ACCOUNT, eventName, data);
  }
};