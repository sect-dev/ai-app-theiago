import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider,
  TwitterAuthProvider,
  sendSignInLinkToEmail,
  AuthError,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase";
import {
  EmailLinkAuthResponse,
  FirebaseUser,
  UserSubscriptionInfo,
} from "@/app/shared/api/types/auth";
import { apiClient, getCurrentToken } from "@/app/shared/api/index";
import { useAuthStore } from "@/app/shared/store/authStore";
import axios from "axios";
import { clearAccessTokenCookie } from "@/app/shared/helpers";
import { UserStatus } from "./types";

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<FirebaseUser> => {
  try {
    const currentUser = auth.currentUser;

    if (currentUser && currentUser.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredential = await linkWithCredential(currentUser, credential);

      const user = userCredential.user as FirebaseUser;
      user.accessToken = (
        userCredential.user as FirebaseUser
      ).stsTokenManager.accessToken;

      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.removeItem("uid");
        localStorage.removeItem("tempToken");
      }

      const setUser = useAuthStore.getState().setUser;
      const { setAuthModal } = useAuthStore.getState();

      setAuthModal({ modalType: null, isAuthModalActive: false });
      setUser(user);

      return user;
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user as FirebaseUser;
      user.accessToken = (
        userCredential.user as FirebaseUser
      ).stsTokenManager.accessToken;

      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
      }

      return user;
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const signInWithEmailAndPasswordHandler = async (
  email: string,
  password: string,
): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user as FirebaseUser;
    user.accessToken = (
      userCredential.user as FirebaseUser
    ).stsTokenManager.accessToken;

    if (user.accessToken) {
      localStorage.setItem("accessToken", user.accessToken);
    }

    return user;
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};

export const resetPasswordHandler = async (email: string) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);

    return { success: true, message: "✅ Letter sent! Check your mail." };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tempToken");
    localStorage.removeItem("hasPremium");
    localStorage.removeItem("uid");
    clearAccessTokenCookie();
  } catch (error) {
    console.log(error);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    const user = result.user;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      return user;
    }
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code) {
      return {
        success: false,
        errorCode: firebaseError.code,
        errorMessage: firebaseError.message,
        email: firebaseError.customData?.email || null,
        credential: GoogleAuthProvider.credentialFromError(firebaseError),
      };
    }

    return {
      success: false,
      message: "An error occurred while authorizing by Google",
    };
  }
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return { user, accessToken };
  } catch (error) {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code) {
      return {
        success: false,
        errorCode: firebaseError.code,
        errorMessage: firebaseError.message,
        email: firebaseError.customData?.email || null,
        credential: GoogleAuthProvider.credentialFromError(firebaseError),
      };
    }

    return {
      success: false,
      message: "An error occurred while authorizing by X",
    };
  }
};

export const signInWithX = async () => {
  const provider = new TwitterAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    const user = result.user;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      return user;
    }
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code) {
      return {
        success: false,
        errorCode: firebaseError.code,
        errorMessage: firebaseError.message,
        email: firebaseError.customData?.email || null,
        credential: TwitterAuthProvider.credentialFromError(firebaseError),
      };
    }

    return {
      success: false,
      message: "An error occurred while authorizing by Twitter",
    };
  }
};

export const signInAnonymouslyHandler = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    if (user.uid && user.isAnonymous) {
      const token = await user.getIdToken();
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("tempToken", token);
      await registerAnonymousUser(token);
      return;
    }
  } catch (error) {
    console.error("Anonymous authorization error:", error);
    throw error;
  }
};

export const registerAnonymousUser = async (token: string): Promise<void> => {
  try {
    await apiClient.get(`/register_anonymous_web_user?token=${token}`);
    return;
  } catch (error) {
    console.error("Error registering anonymous user:", error);
    return;
  }
};

export const handleEmailLinkAuth = async (
  email?: string,
  isOrganicAuth?: boolean,
  customSearchParams?: string | null,
): Promise<EmailLinkAuthResponse> => {
  let currentSearchParams;

  if (customSearchParams) {
    currentSearchParams = new URLSearchParams(customSearchParams);

    if (currentSearchParams.get("action") === "subscription_success") {
      currentSearchParams.set("action", "auth_success");
    }
  } else {
    // Иначе используем текущие параметры URL
    currentSearchParams = new URLSearchParams(window.location.search);
    const subscribe = currentSearchParams.get("action");
    if (subscribe && subscribe === "subscription_success") {
      currentSearchParams.set("action", "auth_success");
    }
  }

  if (isOrganicAuth) {
    currentSearchParams.set("action", "auth_organic");
  }

  const redirectUrl = `${window.location.origin}${window.location.pathname}?${currentSearchParams.toString()}`;

  if (!email) throw new Error("Email is required");

  try {
    const response = await apiClient.get(`/send_authorization_email`, {
      params: { email, url: redirectUrl },
    });

    if (response.status !== 200) {
      throw new Error(`Email sending failed with status: ${response.status}`);
    }

    window.localStorage.setItem("emailForSignIn", email);

    return {
      success: true,
      message: "The login link has been sent to your email.",
    };
  } catch (error) {
    console.error("Email link sending error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "error while sending email",
    };
  }
};

export const registerUserAfterPayment = async (
  email: string | null,
  searchParams: string,
  maxRetries = 3,
  retryDelay = 1000,
): Promise<boolean> => {
  const token = await getCurrentToken();
  let retries = 0;

  const attemptRegistration = async () => {
    try {
      const response = await apiClient.get(
        `/register_paid_web_user?token=${token}&${searchParams}&email=${email}`,
      );
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      if (retries < maxRetries) {
        retries++;
        console.warn(
          `Payment registration failed, retry ${retries}/${maxRetries}...`,
        );

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return attemptRegistration();
      }

      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message, error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }

      return false;
    }
  };

  return attemptRegistration();
};

export const getEmailByOrderNumber = async (orderId: string) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/email_by_order_number?order_number=${orderId}`,
    );
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message, error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

// Nikitin
export const getUserSubscriptionInfo =
  async (): Promise<UserSubscriptionInfo | null> => {
    const token = await getCurrentToken();

    try {
      const response = await apiClient.get<UserSubscriptionInfo | null>(
        `/user_status?token=${token}`,
      );
      const data = response.data as UserSubscriptionInfo;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message, error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      return null;
    }
  };

// New. Используется в отмене подписки
export const getUserStatus = async (): Promise<{
  status: UserStatus;
  token: string;
} | null> => {
  const token = await getCurrentToken();
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await apiClient.get(`/user_status`, {
      params: { token },
    });
    if (response.data) {
      return { status: response.data, token: token };
    } else {
      console.error("No data received from user status API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user status:", error);
    return null;
  }
};
