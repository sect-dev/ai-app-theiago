const TRACKDESK_ACCOUNT = "aigo";

interface TrackdeskConversionData {
    conversionType: string;
    amount: {
      value: number;
    };
  } 
  

export const trackClick = () => {
  if (typeof window !== "undefined" && window.trackdesk) {
    window.trackdesk(TRACKDESK_ACCOUNT, "click");
  }
};

export const trackConversion = (amount: number) => {
  if (typeof window !== "undefined" && window.trackdesk) {
    window.trackdesk(TRACKDESK_ACCOUNT, "conversion", {
      conversionType: "sale",
      amount: {
        value: amount
      }
    });
  }
}; 

export const trackCustomEvent = (eventName: string, data?: TrackdeskConversionData) => {
  if (typeof window !== "undefined" && window.trackdesk) {
    window.trackdesk(TRACKDESK_ACCOUNT, eventName, data);
  }
};