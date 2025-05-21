import { create } from "zustand";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailLink,
  User,
} from "firebase/auth";
import { auth } from "@/firebase";
// import notification from "@/app/widgets/Notification";
import { FirebaseUser } from "@/app/shared/api/types/auth";
import {
  getUserSubscriptionInfo,
  registerUserAfterPayment,
} from "@/app/shared/api/auth";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import {
  clearAccessTokenCookie,
  safeLocalStorage,
  setAccessTokenCookie,
} from "@/app/shared/helpers";
import {
  ACTION_AUTH_SUCCESS,
  ACTION_ORGANIC,
  REDIRECT_URL,
} from "@/app/shared/consts";

const loadCharactersFromLocalStorage = (): { premium: boolean | null } => {
  if (typeof window === "undefined") return { premium: null };
  const storedPremium = localStorage.getItem("hasPremium");
  return {
    premium: storedPremium ? JSON.parse(storedPremium) : null,
  };
};
import { IS_CLIENT } from "../consts";
import { FirebaseError } from "firebase/app";

interface AuthState {
  isPremium: boolean | null;
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  isAuthModalActive: boolean;
  modalType: "login" | "register" | "forgotPass" | null;
  setIsPremium: (value: boolean) => void;
  setAuthModal: (value: {
    modalType: "login" | "register" | "forgotPass" | null;
    isAuthModalActive: boolean;
  }) => void;
  isRegistrationComplete: boolean;
  setRegistrationComplete: (isComplete: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const initialCharacters = loadCharactersFromLocalStorage();

  return {
    isPremium: initialCharacters.premium,
    user: null,
    loading: true,
    isAuthModalActive: false,
    modalType: "register",
    setUser: (user: User | null) => set({ user, loading: false }),
    setAuthModal: (value: {
      modalType: "login" | "register" | "forgotPass" | null;
      isAuthModalActive: boolean;
    }) =>
      set({
        modalType: value.modalType,
        isAuthModalActive: value.isAuthModalActive,
      }),
    setIsPremium: (isPremium: boolean) => {
      set({ isPremium });
    },
    isRegistrationComplete: false,
    setRegistrationComplete: (isComplete: boolean) =>
      set({ isRegistrationComplete: isComplete }),
  };
});

onAuthStateChanged(auth, async (firebaseUser) => {
  // Получаем методы управления состоянием из стора
  const { setSuccessPaymentModal, setTokens } = usePaymentStore.getState();
  const { setAuthModal, setUser, setIsPremium, setRegistrationComplete } =
    useAuthStore.getState();

  // Удаляет временные значения из localStorage
  const cleanLocalStorage = () => {
    safeLocalStorage.remove("tempToken");
    safeLocalStorage.remove("emailForSignIn");
  };

  // Проверка, является ли вход социальным (Google, Facebook, Twitter)
  const isSocialLogin = (user: User) =>
    user.providerData.some((p) =>
      ["google.com", "facebook.com", "twitter.com"].includes(p.providerId),
    );

  // Получаем данные из URL и localStorage
  const email = safeLocalStorage.get("emailForSignIn");
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const authSuccess = searchParams?.get("action") === ACTION_AUTH_SUCCESS;
  const organicAuth = searchParams?.get("action") === ACTION_ORGANIC;

  // Обработка входа через email-ссылку
  if (
    typeof window !== "undefined" &&
    isSignInWithEmailLink(auth, window.location.href)
  ) {
    try {
      const result = await signInWithEmailLink(
        auth,
        email ?? "",
        window.location.href,
      );
      const user = result.user as FirebaseUser;
      if (result) {
        cleanLocalStorage();
        safeLocalStorage.set("accessToken", user.accessToken);
        setUser(user);

        // Регистрация после успешной оплаты
        if (authSuccess) {
          const success = await registerUserAfterPayment(
            email,
            searchParams?.toString() ?? "",
            5,
            1500,
          );
          if (success) {
            safeLocalStorage.remove("pendingSubscriptionActivation");
          }
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }

        // Загружаем данные о подписке и токенах
        const userInfo = await getUserSubscriptionInfo();
        if (authSuccess && !userInfo?.subscription?.active) {
          console.warn("Payment was successful but subscription is not active");
        }

        setIsPremium(userInfo?.subscription?.active ?? false);
        setTokens(userInfo?.tokens ?? 0);

        setRegistrationComplete(true);

        // Органическая регистрация — редирект на квиз ( если нет платной пописки )
        if (organicAuth && !userInfo?.subscription?.active) {
          return (window.location.href =
            process.env.NEXT_PUBLIC_QUIZ_URL ?? "");
        }
      }
    } catch (error) {
      console.error("Email link sign-in error:", error);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    return;
  }

  // Если пользователь не авторизован
  if (!firebaseUser) {
    clearAccessTokenCookie();
    setUser(null);
    setIsPremium(false);
    setTokens(0);
    setRegistrationComplete(false);
    safeLocalStorage.remove("pendingSubscriptionActivation");
    safeLocalStorage.remove("emailForSignIn");
    return;
  }

  const token = await firebaseUser.getIdToken();

  // Обработка входа через социальные сети
  if (isSocialLogin(firebaseUser)) {
    const userInfo = await getUserSubscriptionInfo();

    const pendingActivation = safeLocalStorage.get(
      "pendingSubscriptionActivation",
    );

    if (pendingActivation) {
      try {
        const activationData = JSON.parse(pendingActivation);
        if (activationData.searchParams) {
          console.log(
            "Found pendingSubscriptionActivation, activating subscription...",
          );

          // Получаем email пользователя из Firebase
          const userEmail = firebaseUser.email;

          if (userEmail) {
            // Регистрируем пользователя после оплаты
            const success = await registerUserAfterPayment(
              userEmail,
              activationData.searchParams,
              5,
              1500,
            );

            if (success) {
              console.log("Subscription activated successfully");

              // Обновляем информацию о подписке
              const updatedUserInfo = await getUserSubscriptionInfo();
              setIsPremium(updatedUserInfo?.subscription?.active ?? false);
              setTokens(updatedUserInfo?.tokens ?? 0);

              // Если подписка активирована, не делаем редирект на квиз
              if (updatedUserInfo?.subscription?.active) {
                // Очищаем localStorage и устанавливаем токен
                cleanLocalStorage();
                safeLocalStorage.set("accessToken", token);
                setUser(firebaseUser);
                setAuthModal({ modalType: null, isAuthModalActive: false });
                return;
              }
            } else {
              console.warn("Failed to activate subscription");
            }
          } else {
            console.warn("User email is missing, cannot activate subscription");
          }
        }
      } catch (error) {
        console.error("Error processing pendingSubscriptionActivation:", error);
      }
    }

    cleanLocalStorage();
    safeLocalStorage.set("accessToken", token);
    setIsPremium(userInfo?.subscription?.active ?? false);
    setUser(firebaseUser);
    setTokens(userInfo?.tokens ?? 0);
    setAuthModal({ modalType: null, isAuthModalActive: false });
    setRegistrationComplete(true);
    // Если зашел через соц.сети и нет премиума то редиректим на квиз
    if (!userInfo?.subscription?.active) {
      return (window.location.href = process.env.NEXT_PUBLIC_QUIZ_URL ?? "");
    }
    return;
  }

  // Сохраняем данные о подписке в localStorage
  if (searchParams?.get("action") === "subscription_success") {
    safeLocalStorage.set(
      "pendingSubscriptionActivation",
      JSON.stringify({
        searchParams: searchParams.toString(),
      }),
    );
  }

  // Анонимный вход — сохраняем временный токен
  if (firebaseUser.isAnonymous) {
    safeLocalStorage.set("tempToken", token);
    setUser(firebaseUser);
    return;
  }

  // Стандартный вход зарегистрированного пользователя
  const userInfo = await getUserSubscriptionInfo();
  setIsPremium(userInfo?.subscription?.active ?? false);
  setTokens(userInfo?.tokens ?? 0);
  cleanLocalStorage();
  safeLocalStorage.set("accessToken", token);
  setAuthModal({ modalType: null, isAuthModalActive: false });
  setUser(firebaseUser);
});

onIdTokenChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const token = await firebaseUser.getIdToken(true);
    setAccessTokenCookie(token);
  } else {
    clearAccessTokenCookie();
  }
});
