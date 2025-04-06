import { create } from "zustand";
import {isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink, User} from "firebase/auth";
import { auth } from "@/firebase";
// import notification from "@/app/widgets/Notification";
import {FirebaseUser} from "@/app/shared/api/types/auth";
import {registerUserAfterPayment} from "@/app/shared/api/auth";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import {deleteCookie, setCookie} from "cookies-next";

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
  if (isSignInWithEmailLink(auth, window.location.href)) {
    try {
      const result = await signInWithEmailLink(auth, email ?? '', window.location.href);
      const user = result.user as FirebaseUser
      console.log('resul signInwithEmailLink',result)
      if(result) {
        await registerUserAfterPayment(email, user.accessToken)
        localStorage.removeItem("uid");
        localStorage.removeItem("tempToken");
        localStorage.removeItem("emailForSignIn");
        deleteCookie('tempToken')
        localStorage.setItem("accessToken", user.accessToken);
        setCookie('accessToken',user.accessToken)
        setUser(user);
        return window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      // notification.open({
      //   title: 'Error',
      //   description: 'Your account is already registered',
      //   type: 'error',
      // });
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
      const newUrl = window.location.href.replace(
        'action=subscription_success',
        'action=auth_success'
      );
      setSuccessPaymentModal({isSuccessPaymentModalActive:true, successPaymentModalType:"auth_success"})
      localStorage.setItem("accessToken", token);
      localStorage.removeItem("emailForSignIn");

      return window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (firebaseUser.isAnonymous) {
      localStorage.setItem("uid", firebaseUser.uid);
      localStorage.setItem("tempToken", token);
      setCookie('tempToken',token)
      setUser(firebaseUser);
    } else {
      localStorage.removeItem("uid");
      localStorage.removeItem("tempToken");
      localStorage.removeItem("emailForSignIn");
      deleteCookie('tempToken')
      localStorage.setItem("accessToken", token);
      setCookie('accessToken',token)
      setAuthModal({ modalType: null, isAuthModalActive: false });
      setUser(firebaseUser);
    }
  } else {
    localStorage.removeItem("uid");
    localStorage.removeItem("tempToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("emailForSignIn");
    deleteCookie('accessToken')
    setUser(null);
  }
});