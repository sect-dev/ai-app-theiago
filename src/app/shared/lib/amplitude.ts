import * as amplitude from "@amplitude/analytics-browser";
import { auth } from "@/firebase";

// Типы для свойств пользователя
interface UserProperties {
    firebase_token?: string;
    user_id?: string;
    is_anonymous?: boolean;
    [key: string]: string | number | boolean | undefined;
  }
  
  // Типы для свойств событий
  interface EventProperties {
    domain?: string;
    timestamp?: string;
    user_agent?: string;
    plan_type?: string;
    payment_system?: string;
    redirect_url?: string;
    result?: "success" | "error";
    error_message?: string;
    token_present?: boolean;
    token_length?: number;
    email?: string;
    placement?: string;
    first_autologin_result?: "success" | "error";
    token_changed?: boolean;
    old_token_length?: number;
    new_token_length?: number;
    search_params?: string;
    [key: string]: string | number | boolean | undefined;
  }

export const setUserProperties = (properties: UserProperties) => {
  const identifyEvent = new amplitude.Identify();

  Object.entries(properties).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
        identifyEvent.set(key, value);
      }
  });

  amplitude.identify(identifyEvent);
};

// Установка Firebase токена как свойство пользователя
export const setFirebaseToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      setUserProperties({
        firebase_token: token,
        user_id: user.uid,
        is_anonymous: user.isAnonymous,
      });
    }
  } catch (error) {
    console.error("Error setting Firebase token:", error);
  }
};

// Трекинг событий с общими свойствами
export const trackEvent = (
    eventName: string, properties: EventProperties = {}
) => {
  const commonProperties: EventProperties = {
    domain: typeof window !== "undefined" ? window.location.hostname : "",
    timestamp: new Date().toISOString(),
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };

  const filteredProperties: EventProperties = {};
  Object.entries({ ...commonProperties, ...properties }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      filteredProperties[key] = value;
    }
  });

  amplitude.track(eventName, { ...commonProperties, ...properties });
};

// Специализированные трекинг функции
export const trackSubscriptionSelection = (
  planType: string,
  paymentSystem: string,
) => {
  trackEvent("subscription_type_selection", {
    plan_type: planType,
    payment_system: paymentSystem,
  });
};

export const trackPayproccRedirect = (
  redirectUrl: string,
  result: "success" | "error",
  error?: string,
) => {
  trackEvent("payprocc_redirect", {
    redirect_url: redirectUrl,
    result: result,
    ...(error && { error_message: error }),
  });
};

export const trackVivaPayTokenReceived = (
  token: string,
  result: "success" | "error",
  error?: string,
) => {
  trackEvent("vivapay_token_received", {
    token_present: !!token,
    token_length: token ? token.length : 0,
    result: result,
    ...(error && { error_message: error }),
  });
};

export const trackFirstAutologin = (
  email: string,
  result: "success" | "error",
  error?: string,
  redirectUrl?: string,
) => {
  trackEvent("first_autologin_call", {
    email: email,
    result: result,
    ...(error && { error_message: error }),
    ...(redirectUrl && { redirect_url: redirectUrl }),
  });
};

export const trackEmailCollectionDisplay = (
  placement: string = "payment_success",
) => {
  trackEvent("email_collection_form_display", {
    placement,
  });
};

export const trackEmailCollectionSubmission = (
  email: string,
  autologinResult: "success" | "error",
  error?: string,
) => {
  trackEvent("email_collection_form_submission", {
    email: email,
    first_autologin_result: autologinResult,
    ...(error && { error_message: error }),
  });
};

export const trackAuthorizationReturn = (
  tokenChanged: boolean,
  oldToken?: string,
  newToken?: string,
) => {
  trackEvent("authorization_return", {
    token_changed: tokenChanged,
    old_token_length: oldToken ? oldToken.length : 0,
    new_token_length: newToken ? newToken.length : 0,
  });
};

export const trackRegisterPaidWebUser = (
  email: string,
  result: "success" | "error",
  error?: string,
  searchParams?: string,
) => {
  trackEvent("register_paid_web_user_call", {
    email: email,
    result: result,
    ...(error && { error_message: error }),
    ...(searchParams && { search_params: searchParams }),
  });
};
