import { create } from "zustand";
import {isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink, User} from "firebase/auth";
import { auth } from "@/firebase";
// import notification from "@/app/widgets/Notification";
import {FirebaseUser} from "@/app/shared/api/types/auth";
import {registerUserAfterPayment} from "@/app/shared/api/auth";
import {usePaymentStore} from "@/app/shared/store/paymentStore";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  isAuthModalActive: boolean
  modalType: "login" | "register" | "forgotPass" | null,
  setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAuthModalActive: false,
  modalType: "register",
  setUser: (user: User | null) => set({ user, loading: false }),
  setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => set({modalType: value.modalType, isAuthModalActive:value.isAuthModalActive}),
}));

onAuthStateChanged(auth, async (firebaseUser) => {
  const setUser = useAuthStore.getState().setUser;
  const {setSuccessPaymentModal} = usePaymentStore.getState();
  const { setAuthModal } = useAuthStore.getState();
  const email = localStorage.getItem('emailForSignIn');
  const cleanLocalStorage = () => {
    localStorage.removeItem("tempToken");
    localStorage.removeItem("emailForSignIn");
  }
  if (isSignInWithEmailLink(auth, window.location.href)) {
    try {
      const result = await signInWithEmailLink(auth, email ?? '', window.location.href);
      const user = result.user as FirebaseUser;

      if(result) {
        console.log('user',user)
        await registerUserAfterPayment(email, user.accessToken);
        cleanLocalStorage()
        localStorage.setItem("accessToken", user.accessToken);
        setUser(user);
        return window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    const isSocialLogin = firebaseUser.providerData.some(provider =>
      provider.providerId === 'google.com' ||
      provider.providerId === 'facebook.com' ||
      provider.providerId === 'twitter.com'
    );
    // Если пользователь вошел через Google и есть параметр subscription_success в URL
    if (isSocialLogin && window.location.search.includes('action=subscription_success')) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('action') === 'subscription_success') {
        params.set('action', 'auth_success');
        const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
        await registerUserAfterPayment(email, token);
        setSuccessPaymentModal({isSuccessPaymentModalActive: true, successPaymentModalType: "auth_success"});

        cleanLocalStorage()
        localStorage.setItem("accessToken", token);

        window.history.replaceState({}, document.title, newUrl);
      }
    }

    if (firebaseUser.isAnonymous) {
      localStorage.setItem("tempToken", token);
      setUser(firebaseUser);
    } else {
      cleanLocalStorage()
      localStorage.setItem("accessToken", token);
      setAuthModal({ modalType: null, isAuthModalActive: false });
      setUser(firebaseUser);
    }
  } else {
    cleanLocalStorage()
    localStorage.removeItem("accessToken");
    setUser(null);
  }
});