export const authErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "Invalid email or password. Please try again.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/too-many-requests": "Too many login attempts. Please try again later.",
  "auth/network-request-failed":
    "Network error. Check your internet connection.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/invalid-email": "Invalid email format. Please check your input.",
  "auth/missing-password": "Please enter a password.",
};

export const registerErrorMessages: Record<string, string> = {
  "auth/email-already-in-use":
    "This email is already registered. Try logging in instead.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/invalid-email": "Invalid email format. Please check your input.",
  "auth/missing-password": "Please enter a password.",
  "auth/missing-email": "Please enter an email address.",
  "auth/operation-not-allowed":
    "Registration is currently disabled. Please contact support.",
  "auth/network-request-failed":
    "Network error. Check your internet connection.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/internal-error": "An internal error occurred. Please try again later.",
};

export const paidTypesOfMessages = [
  "image_paywall",
  "audio_paywall",
  "video_paywall",
  "text_paywall",
];

export const OriginalTypesOfMessages = ["image", "audio", "video", "text"];

export const IS_CLIENT = typeof window !== "undefined";

export const REDIRECT_URL = "https://quiz.theaigo.com/aigoweb";
export const ACTION_AUTH_SUCCESS = "auth_success";
export const ACTION_ORGANIC = "auth_organic";
export const STAGE_URL = "https://stage.web.theaigo.com";
export const BASE_URL_PRECREATED_TYPES =
  "https://aigo.b-cdn.net/web/paywall_precreated_types";
export const BASE_URL_PAYWALL_PRECREATED =
  "https://aigo.b-cdn.net/web/paywall_precreated";

export const TOKENS = [
  {
    name: "70_tokens",
    price: 3.99,
    tokens: 70,
  },
  {
    name: "200_tokens",
    price: 9.99,
    tokens: 200,
  },
  {
    name: "750_tokens",
    price: 34.99,
    tokens: 750,
  },
  {
    name: "1100_tokens",
    price: 49.99,
    tokens: 1100,
  },
  {
    name: "2300_tokens",
    price: 99.99,
    tokens: 2300,
  },
  {
    name: "4800_tokens",
    price: 199.99,
    tokens: 4800,
  },
];
