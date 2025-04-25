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
import {FirebaseUser} from "@/app/shared/api/types/auth";
import {getUserSubscriptionInfo, registerUserAfterPayment} from "@/app/shared/api/auth";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import {clearAccessTokenCookie, safeLocalStorage, setAccessTokenCookie} from "@/app/shared/helpers";
import {ACTION_AUTH_SUCCESS, ACTION_ORGANIC, REDIRECT_URL} from "@/app/shared/conts";

const loadCharactersFromLocalStorage = (): {premium: boolean | null } => {
  if (typeof window === "undefined") return { premium: null };
  const storedPremium = localStorage.getItem('hasPremium');
  return {
    premium: storedPremium ? JSON.parse(storedPremium) : null
  }
};
import { IS_CLIENT } from '../consts';

interface AuthState {
  isPremium: boolean | null
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  isAuthModalActive: boolean
  modalType: "login" | "register" | "forgotPass" | null,
  setIsPremium: (value: boolean) => void
  setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => void;
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
    setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => set({modalType: value.modalType, isAuthModalActive:value.isAuthModalActive}),
    setIsPremium: (isPremium: boolean) => set({isPremium}),
  }
});

onAuthStateChanged(auth, async (firebaseUser) => {
  // Получаем методы управления состоянием из стора
  const { setSuccessPaymentModal, setTokens } = usePaymentStore.getState();
  const { setAuthModal, setUser, setIsPremium } = useAuthStore.getState();

  // Удаляет временные значения из localStorage
  const cleanLocalStorage = () => {
    safeLocalStorage.remove("tempToken");
    safeLocalStorage.remove("emailForSignIn");
  };

  // Проверка, является ли вход социальным (Google, Facebook, Twitter)
  const isSocialLogin = (user: User) =>
    user.providerData.some(p =>
      ['google.com', 'facebook.com', 'twitter.com'].includes(p.providerId)
    );

  // Получаем данные из URL и localStorage
  const email = safeLocalStorage.get('emailForSignIn');
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const authSuccess = searchParams?.get('action') === ACTION_AUTH_SUCCESS;
  const organicAuth = searchParams?.get('action') === ACTION_ORGANIC;

  // Обработка входа через email-ссылку
  if (isSignInWithEmailLink(auth, window.location.href)) {
    try {
      const result = await signInWithEmailLink(
        auth,
        email ?? "",
        window.location.href
      );
      const user = result.user as FirebaseUser;
      if (result) {
        cleanLocalStorage();
        safeLocalStorage.set("accessToken", user.accessToken);
        setUser(user);

        // Загружаем данные о подписке и токенах
        const userInfo = await getUserSubscriptionInfo();
        console.log('userInfo',userInfo)
        setIsPremium(userInfo?.subscription?.active ?? false);
        setTokens(userInfo?.tokens ?? 0);

        // Органическая регистрация — редирект на квиз ( если нет платной пописки )
        if (organicAuth && !userInfo?.subscription?.active) {
          return (window.location.href = REDIRECT_URL);
        }

        // Регистрация после успешной оплаты
        if (authSuccess) {
          await registerUserAfterPayment(email,searchParams?.toString() ?? '');
          return window.history.replaceState({}, document.title, window.location.pathname);
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
    cleanLocalStorage();
    clearAccessTokenCookie();
    setUser(null);
    setIsPremium(false);
    setTokens(0);
    return;
  }

  const token = await firebaseUser.getIdToken();

  // Обработка входа через социальные сети
  if (isSocialLogin(firebaseUser)) {
    if (searchParams?.get('action') === 'subscription_success') {
      // Если пользователь пришёл после оплаты, регистрируем и показываем модалку
      searchParams.set('action', ACTION_AUTH_SUCCESS);
      const newUrl = `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
      await registerUserAfterPayment(firebaseUser.email,searchParams.toString());
      setSuccessPaymentModal({ isSuccessPaymentModalActive: true, successPaymentModalType: ACTION_AUTH_SUCCESS });
      window.history.replaceState({}, document.title, newUrl);
    }

    const userInfo = await getUserSubscriptionInfo();
    console.log('userInfo',userInfo)
    cleanLocalStorage();
    safeLocalStorage.set("accessToken", token);
    setIsPremium(userInfo?.subscription?.active ?? false);
    setUser(firebaseUser);
    setTokens(userInfo?.tokens ?? 0);
    setAuthModal({ modalType: null, isAuthModalActive: false });
    // Если зашел через соц.сети и нет премиума то редиректим на квиз
    if (!userInfo?.subscription?.active) {
      return (window.location.href = REDIRECT_URL);
    }
    return;
  }

  // Анонимный вход — сохраняем временный токен
  if (firebaseUser.isAnonymous) {
    safeLocalStorage.set("tempToken", token);
    setUser(firebaseUser);
    return;
  }

  // Стандартный вход зарегистрированного пользователя
  const userInfo = await getUserSubscriptionInfo();
  console.log('userInfo',userInfo)
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
